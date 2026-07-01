import type { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  className?: string
  /** Adds the subtle neutral background used to separate sections. */
  muted?: boolean
  /** Optional id for in-page anchor links. */
  id?: string
}

export function Section({ children, className = '', muted, id }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 sm:py-20 lg:py-24 ${muted ? 'bg-slate-50' : ''} ${className}`}
    >
      <div className="container-content">{children}</div>
    </section>
  )
}

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <div className={`max-w-2xl ${alignment} ${className}`}>
      {eyebrow && (
        <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
