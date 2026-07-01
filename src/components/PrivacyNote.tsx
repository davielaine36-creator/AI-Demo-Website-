import { Link } from 'react-router-dom'

interface PrivacyNoteProps {
  className?: string
}

/**
 * Short, plain-English privacy note shown near each form. Links to /privacy.
 * Reused by the contact, short intake, and full intake forms.
 */
export function PrivacyNote({ className = '' }: PrivacyNoteProps) {
  return (
    <p
      className={`rounded-xl bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-500 ${className}`}
    >
      Please do not include passwords, payment information, API keys, or
      sensitive customer data. We use your answers only to understand your
      business and respond with a useful recommendation.{' '}
      <Link
        to="/privacy"
        className="font-semibold text-brand-700 hover:text-brand-800"
      >
        How we handle your information
      </Link>
      .
    </p>
  )
}
