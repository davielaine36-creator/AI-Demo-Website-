/*
 * Ask Laine — serverless chat endpoint (Vercel Function).
 *
 * POST /api/ask-lane
 *   body:    { messages: [{ role: 'user' | 'assistant', content: string }, ...] }
 *   returns: { reply: string, links: { label, to }[], fallback: boolean }
 *
 * The Anthropic API key lives ONLY here, server-side, as the ANTHROPIC_API_KEY
 * environment variable. Without it the endpoint degrades gracefully
 * (fallback: true) so the widget never breaks. User content is never logged.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import Anthropic from '@anthropic-ai/sdk'
// Explicit .js extensions: the Vercel function is compiled as ESM (package.json
// "type": "module"), and Node ESM requires them on relative imports at runtime.
import { retrieveKnowledge, collectLinks } from '../src/lib/askLaneRetrieval.js'
import type { KnowledgeChunk, KnowledgeLink } from '../src/data/askLaneKnowledge.js'

// One clear default model; override with the optional ASK_LANE_MODEL env var
// (e.g. "claude-haiku-4-5" for faster/cheaper replies).
const DEFAULT_MODEL = 'claude-opus-4-8'

// Payload limits. User turns are untrusted input and are rejected when over
// the cap; assistant turns are our OWN prior replies echoed back by the client,
// so we truncate them (a reply near MAX_REPLY_TOKENS can exceed a tight cap)
// rather than 400 the whole conversation.
const MAX_MESSAGES = 12
const MAX_USER_MESSAGE_CHARS = 2000
const MAX_ASSISTANT_MESSAGE_CHARS = 4000
const MAX_TOTAL_CHARS = 24000
const MAX_REPLY_TOKENS = 600

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const FALLBACK_LINKS: KnowledgeLink[] = [
  { label: 'Start the short intake', to: '/intake' },
  { label: 'Contact us', to: '/contact' },
]

const NOT_CONFIGURED_REPLY =
  'Live AI chat is not configured yet, but you are not stuck: the guided ' +
  'quick-start below can point you to the right starting place, or you can ' +
  'use the short intake form and we will follow up personally.'

/** Validate the request body into a clean message list, or return null. */
function parseMessages(body: unknown): ChatMessage[] | null {
  let data = body
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch {
      return null
    }
  }
  if (typeof data !== 'object' || data === null) return null

  const raw = (data as { messages?: unknown }).messages
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_MESSAGES) {
    return null
  }

  const messages: ChatMessage[] = []
  for (const entry of raw) {
    if (typeof entry !== 'object' || entry === null) return null
    const { role, content } = entry as { role?: unknown; content?: unknown }
    if (role !== 'user' && role !== 'assistant') return null
    if (typeof content !== 'string') return null
    const trimmed = content.trim()
    if (trimmed.length === 0) return null
    if (role === 'user') {
      if (trimmed.length > MAX_USER_MESSAGE_CHARS) return null
      messages.push({ role, content: trimmed })
    } else {
      // Our own prior reply — truncate rather than reject.
      messages.push({ role, content: trimmed.slice(0, MAX_ASSISTANT_MESSAGE_CHARS) })
    }
  }

  // The Messages API requires a user-first sequence; a trimmed client history
  // window can begin with an assistant turn, so drop any leading ones.
  while (messages.length > 0 && messages[0].role === 'assistant') messages.shift()

  // Must be non-empty and end with the user's current question.
  if (messages.length === 0) return null
  if (messages[messages.length - 1].role !== 'user') return null

  // Bound the forwarded history: drop oldest turns (keeping the final user
  // message and a user-first sequence) until under the ceiling. Truncation
  // above means a lone final user message is always within the ceiling.
  let total = messages.reduce((sum, m) => sum + m.content.length, 0)
  while (total > MAX_TOTAL_CHARS && messages.length > 1) {
    total -= messages[0].content.length
    messages.shift()
    while (messages.length > 1 && messages[0].role === 'assistant') {
      total -= messages[0].content.length
      messages.shift()
    }
  }

  return messages
}

function buildSystemPrompt(chunks: KnowledgeChunk[]): string {
  const knowledge = chunks
    .map((c) => `### ${c.title} (${c.category})\n${c.content}`)
    .join('\n\n')

  return `You are "Ask Laine", the website assistant for Laine Industries — a small studio that builds simple websites, lead-tracking dashboards, and AI-assisted follow-up systems for small businesses.

Personality: calm, practical, small-business friendly, honest, plain English. Not hypey, not overly technical, protective of Laine Industries' reputation.

Hard rules:
- Answer ONLY from the knowledge below. If it does not cover the question, say so plainly and recommend the short intake form (/intake) or the contact page (/contact) instead of guessing.
- Keep answers short: 2–5 plain sentences, website-chat length. Plain text only — no markdown, headers, or bullet lists.
- Never guarantee revenue, leads, rankings, or any business outcome, and never invent client results, numbers, or case studies.
- The demos are static examples with example data — never describe them as live client systems.
- Never ask for passwords, API keys, payment information, private customer lists, or sensitive customer data. If the visitor shares something sensitive, gently tell them not to send it through this chat.
- Do not give legal, tax, compliance, or security guarantees or advice.
- You can describe Laine's general business process — proposals, written agreements, deposits, kickoff, and handoff — but never interpret contract terms, state what a contract "guarantees" or "protects", or opine on ownership, liability, cancellation, or transfer rights. For final terms, recommend the client review them with a qualified attorney.
- Do not make binding commitments the knowledge does not support: no promises of free work, unlimited support, unconditional cancellation, or guaranteed uptime.
- If asked about price, give the rough range from the knowledge and recommend the short intake for a scoped, specific quote. Rough ranges are starting points, not final prices. Third-party tool costs (hosting, email, etc.) can be separate — never quote an exact final total.
- If asked about ownership or hosting, explain the three models: Laine Managed Build (default), Client-Owned Build, and Transfer Later.
- If asked whether AI can message customers, explain that Laine starts with "AI drafts, a human approves" — nothing auto-sends by default.
- Stay on topic: Laine Industries and small-business websites/systems. For anything else (general coding help, essays, other companies), politely say it is outside what this chat covers and steer back.
- When it fits, end with one useful next step in prose, e.g. the short intake at /intake, the contact page at /contact, the demos at /demos, or /for-small-businesses. Only mention paths that exist: /intake, /full-intake, /contact, /demos, /services, /how-it-works, /for-small-businesses, /case-studies, /privacy.

Knowledge:

${knowledge}`
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ error: 'method_not_allowed' })
    return
  }

  const messages = parseMessages(req.body)
  if (!messages) {
    res.status(400).json({
      error: 'invalid_request',
      message:
        'Expected { messages: [{ role, content }, ...] } ending with a user message, within size limits.',
    })
    return
  }

  const question = messages[messages.length - 1].content
  const chunks = retrieveKnowledge(question)
  const links = collectLinks(chunks)

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    // No key configured — never break the widget; hand back the guided path.
    res.status(200).json({
      reply: NOT_CONFIGURED_REPLY,
      links: FALLBACK_LINKS,
      fallback: true,
    })
    return
  }

  try {
    const anthropic = new Anthropic({ apiKey })
    const response = await anthropic.messages.create({
      model: process.env.ASK_LANE_MODEL || DEFAULT_MODEL,
      max_tokens: MAX_REPLY_TOKENS,
      system: buildSystemPrompt(chunks),
      messages,
    })

    const reply = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map((block) => block.text)
      .join('\n')
      .trim()

    if (!reply) {
      // Refusal or empty output — steer to a human instead of guessing.
      res.status(200).json({
        reply:
          "I can't help with that one here. For anything about Laine Industries, ask away — otherwise the contact page is the best route.",
        links: FALLBACK_LINKS,
        fallback: false,
      })
      return
    }

    res.status(200).json({ reply, links, fallback: false })
  } catch (error) {
    // Log the error class/status only — never user content or prompt text.
    if (error instanceof Anthropic.APIError) {
      console.error(`ask-lane upstream error: ${error.name} (${error.status})`)
    } else {
      console.error(
        `ask-lane error: ${error instanceof Error ? error.name : 'unknown'}`,
      )
    }
    res.status(502).json({ error: 'upstream_error' })
  }
}
