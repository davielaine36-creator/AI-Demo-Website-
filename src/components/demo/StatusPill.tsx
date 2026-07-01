import type { ReactNode } from 'react'

type Tone = 'neutral' | 'info' | 'success' | 'warn'

const tones: Record<Tone, string> = {
  neutral: 'bg-slate-100 text-slate-600',
  info: 'bg-brand-50 text-brand-700',
  success: 'bg-emerald-50 text-emerald-700',
  warn: 'bg-amber-50 text-amber-700',
}

interface StatusPillProps {
  children: ReactNode
  tone?: Tone
  className?: string
}

/** Small rounded label used across the demo pages for statuses and honest framing. */
export function StatusPill({
  children,
  tone = 'neutral',
  className = '',
}: StatusPillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
