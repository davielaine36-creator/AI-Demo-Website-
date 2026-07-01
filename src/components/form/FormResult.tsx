import { useState } from 'react'
import { Button } from '../Button'
import { IconClipboard, IconMail, IconCheck } from '../Icons'
import { buildMailto, copyToClipboard, type SubmitResult } from '../../utils/formSubmit'

interface FormResultProps {
  title: string
  summary: string
  mailSubject: string
  result: SubmitResult
  onReset: () => void
}

/**
 * Shown after a form submit. Always offers copy + email fallbacks so the form
 * is useful even with no backend configured. If the webhook succeeded, we say
 * so; if it failed or wasn't configured, we guide the user to copy/email.
 */
export function FormResult({
  title,
  summary,
  mailSubject,
  result,
  onReset,
}: FormResultProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const ok = await copyToClipboard(summary)
    setCopied(ok)
    if (ok) window.setTimeout(() => setCopied(false), 2500)
  }

  const webhookSucceeded = result.channel === 'webhook' && result.ok

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
          <IconCheck className="h-6 w-6" aria-hidden />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-ink">{title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            {webhookSucceeded
              ? "Your details were sent to us — we'll be in touch shortly. You can also keep a copy below."
              : 'Your summary is ready below. Send it to us in one click by email, or copy it wherever you like.'}
          </p>
          {result.channel === 'webhook' && !result.ok && (
            <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
              We couldn't reach the submission service, so please use the email
              or copy option below — nothing was lost.
            </p>
          )}
        </div>
      </div>

      <pre className="mt-6 max-h-80 overflow-auto whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-700">
        {summary}
      </pre>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button href={buildMailto(mailSubject, summary)} size="md">
          <IconMail className="h-4 w-4" aria-hidden />
          Open email draft
        </Button>
        <Button onClick={handleCopy} variant="secondary" size="md">
          <IconClipboard className="h-4 w-4" aria-hidden />
          {copied ? 'Copied!' : 'Copy summary'}
        </Button>
        <Button onClick={onReset} variant="ghost" size="md">
          Start over
        </Button>
      </div>
    </div>
  )
}
