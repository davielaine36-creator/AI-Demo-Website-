import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'
import { DemoCard } from '../components/DemoCard'
import { DemoDisclaimer } from '../components/demo/DemoDisclaimer'
import { CTASection } from '../components/CTASection'
import { DEMOS } from '../data/demos'
import { CTA } from '../data/site'

export default function Demos() {
  return (
    <>
      <PageHero
        eyebrow="Demos / Proof Hub"
        title="See the kinds of systems we build."
        subtitle="These demos show how a small business can capture leads, organize information, draft follow-ups, and manage next steps from one simple system."
      />

      <Section>
        <DemoDisclaimer className="mb-10">
          These are static proof-of-concept demos built with example data — no
          real client information and no live automation. They show the kinds
          of systems Lane Industries can build, not client results.
        </DemoDisclaimer>

        <div className="grid gap-6 sm:grid-cols-2">
          {DEMOS.map((demo) => (
            <DemoCard key={demo.id} demo={demo} />
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
          Demos are simplified on purpose. An actual system is shaped around
          the business it's built for.
        </p>
      </Section>

      <CTASection
        headline="Want something like this for your business?"
        text="Start with the intake form and we'll recommend the simplest version that solves your real problem first."
        buttonLabel="Start With the Intake Form"
        buttonTo={CTA.intake.to}
        secondaryLabel="See pilot builds"
        secondaryTo="/case-studies"
      />
    </>
  )
}
