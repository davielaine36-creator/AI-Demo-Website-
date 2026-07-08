/*
 * Intake proxy — serverless endpoint (Vercel Function).
 *
 * POST /api/intake
 *   body:    the JSON payload built by src/utils/formSubmit.ts
 *            ({ formType, submittedAt, summary, source, leadScore, leadStatus, data })
 *   returns: { ok: true }                         — forwarded to n8n successfully
 *            { ok: false, configured: false }     — no webhook set (client falls back)
 *            { ok: false, error }                  — forward attempted but failed
 *
 * The n8n webhook URL lives ONLY here, server-side, as the N8N_INTAKE_WEBHOOK_URL
 * environment variable (NO "VITE_" prefix, so it is never bundled into the public
 * client). This keeps the real endpoint off the public site where it could be
 * scraped or spammed. Without the env var the endpoint degrades gracefully
 * (configured: false) so the form's copy/email fallback still works.
 *
 * Form content is never logged — only request outcomes.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'

// Guard against oversized bodies (the full intake summary is a few KB at most).
const MAX_BODY_BYTES = 64 * 1024
// Don't let a slow/hanging n8n instance hold the function open to maxDuration.
const FORWARD_TIMEOUT_MS = 10_000

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ ok: false, error: 'Method not allowed' })
    return
  }

  const webhookUrl = process.env.N8N_INTAKE_WEBHOOK_URL
  if (!webhookUrl) {
    // Not an error: the site works fine with the copy/email fallback. The client
    // treats this as `channel: 'fallback'` and shows the manual options.
    res.status(503).json({ ok: false, configured: false })
    return
  }

  // Vercel parses JSON bodies automatically; be defensive about shape + size.
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

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), FORWARD_TIMEOUT_MS)
  try {
    const forwarded = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: serialized,
      signal: controller.signal,
    })

    if (!forwarded.ok) {
      // Log status only — never the submission contents.
      console.error(`[intake] n8n webhook responded ${forwarded.status}`)
      res
        .status(502)
        .json({ ok: false, error: `Webhook responded with ${forwarded.status}` })
      return
    }

    res.status(200).json({ ok: true })
  } catch (err) {
    const message =
      err instanceof Error && err.name === 'AbortError'
        ? 'Webhook timed out'
        : 'Failed to reach webhook'
    console.error(`[intake] ${message}`)
    res.status(502).json({ ok: false, error: message })
  } finally {
    clearTimeout(timeout)
  }
}
