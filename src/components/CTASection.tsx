import { Button } from './Button'
import { useSectionView } from '../lib/useSectionTracking'

interface CTASectionProps {
  headline: string
  text: string
  buttonLabel: string
  buttonTo: string
  secondaryLabel?: string
  secondaryTo?: string
  /** When set, emits a deduplicated `section_view` analytics event on scroll-in. */
  trackName?: string
}

export function CTASection({
  headline,
  text,
  buttonLabel,
  buttonTo,
  secondaryLabel,
  secondaryTo,
  trackName = 'cta',
}: CTASectionProps) {
  const ref = useSectionView<HTMLElement>(trackName)
  return (
    <section ref={ref} className="py-16 sm:py-20">
      <div className="container-content">
        <div className="surface-gradient overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-soft sm:px-12 sm:py-16">
          <h2 className="mx-auto max-w-2xl text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {headline}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {text}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to={buttonTo} size="lg">
              {buttonLabel}
            </Button>
            {secondaryLabel && secondaryTo && (
              <Button to={secondaryTo} variant="secondary" size="lg">
                {secondaryLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
