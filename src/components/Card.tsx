import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  /** Adds a subtle hover lift for interactive cards. */
  interactive?: boolean
}

export function Card({ children, className = '', interactive }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-7 ${
        interactive
          ? 'transition-shadow duration-200 hover:shadow-lift'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
