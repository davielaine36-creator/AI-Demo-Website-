import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  /** Adds a subtle hover lift for interactive cards. */
  interactive?: boolean
  /**
   * Set to false for full-bleed content (tables, lists with their own
   * padding). Conflicting p-* utilities in className can't reliably
   * override the default padding, so opt out here instead.
   */
  padded?: boolean
}

export function Card({
  children,
  className = '',
  interactive,
  padded = true,
}: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white shadow-soft ${
        padded ? 'p-6 sm:p-7' : ''
      } ${
        interactive
          ? 'transition-shadow duration-200 hover:shadow-lift'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
