import type { ReactNode } from 'react'

/**
 * Honest framing for the static demo pages: everything shown uses example
 * data, and nothing is live, saved, or sent. Pass children to override the
 * default copy. White background so it reads the same on plain and muted
 * sections.
 */
export function DemoDisclaimer({
  children,
  className = '',
}: {
  children?: ReactNode
  className?: string
}) {
  return (
    <div
      className={`mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-4 text-center text-sm leading-relaxed text-slate-600 ${className}`}
    >
      {children ?? (
        <>
          This is a front-end demo built with example data. Everything runs in
          your browser — no real customers, no messages sent, nothing saved or
          sent anywhere. It shows what a system like this looks like for a small
          business.
        </>
      )}
    </div>
  )
}
