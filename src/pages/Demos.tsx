import { useEffect } from 'react'
import { PageHero } from '../components/PageHero'
import { SEO } from '../components/SEO'
import { Section } from '../components/Section'
import { DemoCard } from '../components/DemoCard'
import { DemoDisclaimer } from '../components/demo/DemoDisclaimer'
import { CTASection } from '../components/CTASection'
import { DEMOS } from '../data/demos'
import { CTA } from '../data/site'
import { trackEvent } from '../lib/analytics'

const readyDemos = DEMOS.filter((demo) => demo.to || demo.href)
const upcomingDemos = DEMOS.filter((demo) => !demo.to && !demo.href)

export default function Demos() {
  useEffect(() => {
    trackEvent('demo_page_view')
  }, [])
  return (
    <>
      <SEO
        title="Interactive Demos | AI Websites & Lead Systems | Laine Industries"
        description="Explore clickable example systems Laine Industries builds for small businesses: lead capture, AI follow-up drafting, and a small-business dashboard."
      />
      <PageHero
        eyebrow="Interactive demos"
        title="Explore the example systems we build."
        subtitle="Real, clickable, front-end demos of the kind of systems Laine Industries builds for small businesses. Open any one and try it."
      />

      <Section>
        <DemoDisclaimer className="mb-10">
          These are front-end example demos built with example data. They show
          the kind of systems Laine Industries can build — they are not live
          client systems, and no data is saved or sent.
        </DemoDisclaimer>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {readyDemos.map((demo) => (
            <DemoCard key={demo.id} demo={demo} />
          ))}
        </div>

        {upcomingDemos.length > 0 && (
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-500">
            More on the way:{' '}
            <span className="font-medium text-slate-600">
              {upcomingDemos.map((demo) => demo.title).join(', ')}
            </span>{' '}
            — coming soon.
          </p>
        )}

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
          Demos are simplified on purpose. An actual system is shaped around the
          business it's built for.
        </p>
      </Section>

      <CTASection
        headline="Want something like this for your business?"
        text="Start with the intake form and we'll recommend the simplest version that solves your real problem first."
        buttonLabel="Start With the Intake Form"
        buttonTo={CTA.intake.to}
        secondaryLabel="Contact us"
        secondaryTo="/contact"
      />
    </>
  )
}
