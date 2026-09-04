/*
 * Intake → Factory HQ inbound (no n8n).
 *
 * POST /api/intake
 * body: payload from src/utils/formSubmit.ts
 *   { formType, submittedAt, summary, source, leadScore, leadStatus, hp, data }
 *
 * Maps to Factory WebsiteIntakeSubmission and POSTs to FACTORY_INTAKE_URL
 * with header x-radar-secret (FACTORY_INBOUND_SECRET or RADAR_INBOUND_SECRET).
 * Form content is never logged — only request outcomes.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { randomUUID } from 'crypto'

const MAX_BODY_BYTES = 64 * 1024
const FORWARD_TIMEOUT_MS = 10_000
const DEFAULT_FACTORY_URL =
  'https://laine-industries-factory-hq.vercel.app/api/radar/inbound/website-intake'

type Json = Record<string, unknown>

function pick(...vals: unknown[]): string | null {
  for (const v of vals) {
    if (v !== undefined && v !== null && String(v).trim() !== '') {
      return String(v).trim()
    }
  }
  return null
}

function normalizeFormType(raw: string): string {
  const t = raw.toLowerCase().trim()
  if (t === 'contact') return 'contact'
  if (['intake', 'short-intake', 'short_intake'].includes(t)) return 'short-intake'
  if (['full-intake', 'full_intake', 'fullintake'].includes(t)) return 'full-intake'
  return t || 'unknown'
}

function mapToFactory(
  p: Json,
): { ok: true; body: Json } | { ok: false; reason: string } {
  const data = (
    p.data && typeof p.data === 'object' ? (p.data as Json) : {}
  ) as Json
  const formType = normalizeFormType(String(p.formType || ''))

  const business_name = pick(data.business, data.businessName, data.company)
  if (!business_name) {
    return { ok: false, reason: 'missing_business_name' }
  }

  let problem: string | null = null
  if (formType === 'contact') problem = pick(data.message)
  else if (formType === 'short-intake')
    problem = pick(data.messyThings, data.valuable)
  else if (formType === 'full-intake') {
    problem = pick(
      data.topPriority,
      data.websiteNotWorking,
      data.stopDoingManually,
      data.highestValueOutcome,
    )
  }
  if (!problem) problem = pick(p.summary)

  const src = (
    p.source && typeof p.source === 'object' ? (p.source as Json) : {}
  ) as Json
  const routeByForm: Record<string, string> = {
    contact: '/contact',
    'short-intake': '/intake',
    'full-intake': '/full-intake',
  }
  const landing = pick(src.landing_page)
  const source_page = landing
    ? `https://laineindustries.co${landing.startsWith('/') ? landing : `/${landing}`}`
    : `https://laineindustries.co${routeByForm[formType] || ''}`

  const message = pick(p.summary, data.message)

  return {
    ok: true,
    body: {
      business_name,
      contact_name: pick(data.name),
      email: pick(data.email),
      phone: pick(data.phone),
      website: pick(data.website),
      niche: pick(data.businessType),
      city: pick(data.serviceArea),
      problem,
      leads_per_week: pick(data.leadsPerWeek, data.leads_per_week),
      message: message ? message.slice(0, 1900) : null,
      source_page,
      dedupe_key: [
        formType,
        pick(data.email) || '',
        business_name,
        pick(p.submittedAt) || '',
      ].join('|'),
    },
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ ok: false, error: 'Method not allowed' })
    return
  }

  const factoryUrl = process.env.FACTORY_INTAKE_URL || DEFAULT_FACTORY_URL
  const secret =
    process.env.FACTORY_INBOUND_SECRET || process.env.RADAR_INBOUND_SECRET
  if (!secret) {
    res.status(503).json({ ok: false, configured: false })
    return
  }

  const body = req.body as unknown
  if (!body || typeof body !== 'object') {
    res.status(400).json({ ok: false, error: 'Invalid payload' })
    return
  }

  let serialized: string
  try {
    serialized = JSON.stringify(body)
  } catch {
    res.status(400).json({ ok: false, error: 'Invalid payload' })
    return
  }
  if (Buffer.byteLength(serialized, 'utf8') > MAX_BODY_BYTES) {
    res.status(413).json({ ok: false, error: 'Payload too large' })
    return
  }

  const payload = body as Json

  // Silent honeypot drop (bots that fill hidden fields).
  if (pick(payload.hp)) {
    res.status(200).json({ ok: true })
    return
  }

  const mapped = mapToFactory(payload)
  if (!mapped.ok) {
    res.status(400).json({ ok: false, error: 'invalid_submission' })
    return
  }

  const correlationId = randomUUID()
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), FORWARD_TIMEOUT_MS)

  try {
    const forwarded = await fetch(factoryUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-radar-secret': secret,
        'x-correlation-id': correlationId,
      },
      body: JSON.stringify(mapped.body),
      signal: controller.signal,
    })

    if (!forwarded.ok) {
      console.error(`[intake] factory inbound responded ${forwarded.status}`)
      res
        .status(502)
        .json({ ok: false, error: `Factory responded with ${forwarded.status}` })
      return
    }

    res.status(200).json({ ok: true, correlation_id: correlationId })
  } catch (err) {
    const message =
      err instanceof Error && err.name === 'AbortError'
        ? 'Factory timed out'
        : 'Failed to reach Factory'
    console.error(`[intake] ${message}`)
    res.status(502).json({ ok: false, error: message })
  } finally {
    clearTimeout(timeout)
  }
}
