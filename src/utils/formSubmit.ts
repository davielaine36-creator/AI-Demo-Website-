import { CONTACT_EMAIL, N8N_INTAKE_WEBHOOK_URL } from '../data/site'

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

  lines.push('— Sent from laneindustries.dev')
  return lines.join('\n')
}

/**
 * Build a mailto: link with a prefilled subject and body.
 * Uses VITE_CONTACT_EMAIL (falls back to hello@laneindustries.dev).
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
 * - If VITE_N8N_INTAKE_WEBHOOK_URL is configured, POST the payload there.
 * - Otherwise (or if the webhook fails), the caller should fall back to the
 *   copy/email options that are always rendered in the confirmation view.
 *
 * TODO (future integrations):
 *   - Wire the live n8n intake webhook and confirm the workflow handles CORS.
 *   - Consider a lightweight serverless proxy if you'd rather not expose the
 *     webhook URL client-side.
 *   - Add analytics event on successful submit.
 */
export async function submitForm(
  payload: Record<string, FieldValue>,
  meta: { formType: string; summary: string },
): Promise<SubmitResult> {
  if (!N8N_INTAKE_WEBHOOK_URL) {
    return { channel: 'fallback', ok: false }
  }

  try {
    const res = await fetch(N8N_INTAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: meta.formType,
        submittedAt: new Date().toISOString(),
        summary: meta.summary,
        data: payload,
      }),
    })

    if (!res.ok) {
      return {
        channel: 'webhook',
        ok: false,
        error: `Webhook responded with ${res.status}`,
      }
    }

    return { channel: 'webhook', ok: true }
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
