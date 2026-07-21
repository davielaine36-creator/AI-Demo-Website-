import { CONTACT_EMAIL, INTAKE_ENDPOINT } from '../data/site'

export type FieldValue = string | string[]

/**
 * A labeled section of a form, used to build a clean human-readable summary
 * regardless of which form (intake or contact) produced it.
 */
export interface SummarySection {
  heading: string
  fields: { label: string; value: FieldValue }[]
}

function formatValue(value: FieldValue): string {
  if (Array.isArray(value)) {
    return value.length ? value.join(', ') : '—'
  }
  const trimmed = value.trim()
  return trimmed.length ? trimmed : '—'
}

/**
 * Turn labeled sections into a clean, copy/paste-friendly plain-text summary.
 */
export function buildSummary(
  title: string,
  sections: SummarySection[],
): string {
  const lines: string[] = [title, '='.repeat(title.length), '']

  for (const section of sections) {
    lines.push(section.heading.toUpperCase())
    lines.push('-'.repeat(section.heading.length))
    for (const field of section.fields) {
      lines.push(`${field.label}: ${formatValue(field.value)}`)
    }
    lines.push('')
  }

  lines.push('— Sent from laineindustries.co')
  return lines.join('\n')
}

/**
 * Build a mailto: link with a prefilled subject and body.
 * Uses VITE_CONTACT_EMAIL (falls back to hello@laineindustries.co).
 */
export function buildMailto(subject: string, body: string): string {
  const params = new URLSearchParams({ subject, body })
  return `mailto:${CONTACT_EMAIL}?${params.toString()}`
}

export type SubmitChannel = 'webhook' | 'fallback'

export interface SubmitResult {
  channel: SubmitChannel
  ok: boolean
  error?: string
}

/**
 * Submit form data.
 *
 * The browser always POSTs to the same-origin proxy at INTAKE_ENDPOINT
 * (/api/intake). That serverless function holds the real n8n webhook URL as a
 * server-only secret and forwards the payload — the URL is never exposed in the
 * client bundle. The server decides whether a webhook is configured:
 *   - 503 { configured: false } → no webhook set; caller shows the copy/email
 *     fallback (channel: 'fallback', no error note).
 *   - non-OK otherwise          → forward failed (channel: 'webhook', shows note
 *     + fallback).
 *   - OK                        → forwarded (channel: 'webhook', ok).
 */
export async function submitForm(
  payload: Record<string, FieldValue>,
  meta: {
    formType: string
    summary: string
    /** Non-PII attribution fields (UTM, referrer, landing page, timestamp). */
    source?: Record<string, string>
    /** Heuristic lead score + suggested triage status, when computed. */
    leadScore?: number
    leadStatus?: string
    /** Honeypot value (should be empty for humans). Sent as top-level `hp`. */
    honeypot?: string
  },
): Promise<SubmitResult> {
  try {
    const res = await fetch(INTAKE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: meta.formType,
        submittedAt: new Date().toISOString(),
        summary: meta.summary,
        source: meta.source,
        leadScore: meta.leadScore,
        leadStatus: meta.leadStatus,
        // Anti-bot honeypot. n8n's "Honeypot?" node rejects non-empty values.
        hp: meta.honeypot ?? '',
        data: payload,
      }),
    })

    if (res.ok) {
      return { channel: 'webhook', ok: true }
    }

    // 503 means the proxy has no webhook configured — treat as a clean fallback
    // (copy/email), not a delivery error.
    if (res.status === 503) {
      return { channel: 'fallback', ok: false }
    }

    return {
      channel: 'webhook',
      ok: false,
      error: `Submission failed (${res.status})`,
    }
  } catch (err) {
    return {
      channel: 'webhook',
      ok: false,
      error: err instanceof Error ? err.message : 'Network error',
    }
  }
}

/** Copy text to the clipboard, with a legacy fallback for older browsers. */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // fall through to legacy approach
  }

  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(textarea)
    return ok
  } catch {
    return false
  }
}

/** Basic email shape validation. */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}
