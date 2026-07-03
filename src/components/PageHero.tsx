import type { ReactNode } from 'react'
import { useSectionView } from '../lib/useSectionTracking'

interface PageHeroProps {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  children?: ReactNode
  /** Center the text (used on interior pages). */
  center?: boolean
  /** When set, emits a deduplicated `section_view` analytics event on scroll-in. */
  trackName?: string
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  center = true,
  trackName = 'hero',
}: PageHeroProps) {
  const ref = useSectionView<HTMLElement>(trackName)
  return (
    <section ref={ref} className="surface-gradient border-b border-slate-100">
      <div className="container-content py-16 sm:py-20 lg:py-24">
        <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
          {eyebrow && (
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              {subtitle}
            </p>
          )}
          {children && (
            <div
              className={`mt-8 flex flex-wrap gap-3 ${
                center ? 'justify-center' : ''
              }`}
            >
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
