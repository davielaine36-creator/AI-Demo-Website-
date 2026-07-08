import { PageHero } from '../components/PageHero'
import { SEO } from '../components/SEO'
import { Section, SectionHeading } from '../components/Section'
import { ProcessStep } from '../components/ProcessStep'
import { Card } from '../components/Card'
import { CTASection } from '../components/CTASection'
import { CTA } from '../data/site'

const STEPS = [
  {
    title: 'Tell us about your business',
    description:
      'The business owner fills out the intake form or sends over basic details. No prep needed — just how things work today.',
  },
  {
    title: 'We map the problem',
    description:
      'Laine Industries identifies where leads, follow-ups, website gaps, or manual work are causing friction.',
  },
  {
    title: 'We recommend a simple system',
    description:
      'We suggest the lightest useful version first. No overbuilding, no software you don’t need.',
  },
  {
    title: 'We build and test',
    description:
      'We build the website, dashboard, form, workflow, or AI-assisted follow-up system and test it end-to-end.',
  },
  {
    title: 'We hand it off clearly',
    description:
      'We provide a walkthrough, simple instructions, and optional ongoing support.',
  },
]

export default function HowItWorks() {
  return (
    <>
      <SEO
        title="How It Works | Demo-First AI Websites & Lead Systems | Laine Industries"
        description="A calm, five-step process from first conversation to a working website, dashboard, or follow-up system you actually understand — no jargon, no overbuilding."
      />
      <PageHero
        eyebrow="How it works"
        title="A calm, five-step process."
        subtitle="From first conversation to a working system you actually understand — no jargon, no overbuilding."
      />

      <Section trackName="process">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="The process"
              title="Simple by design, useful from day one."
              description="Each step is meant to keep things clear for the business owner — you always know what's happening and why."
            />
          </div>
          <div>
            {STEPS.map((step, i) => (
              <ProcessStep
                key={step.title}
                step={i + 1}
                title={step.title}
                description={step.description}
                last={i === STEPS.length - 1}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Principle */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <Card className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              Our principle
            </p>
            <p className="mt-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              We build systems that are useful first, fancy second.
            </p>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600">
              Most version-1 systems should be simple. The goal is to solve the
              real problem without adding unnecessary software or complexity —
              then grow from there only if it earns its place.
            </p>
          </Card>
        </div>
      </Section>

      <CTASection
        headline="Ready to see where you'd start?"
        text="The intake form is the fastest way for us to understand your business and recommend a simple first system."
        buttonLabel="Start With the Intake Form"
        buttonTo={CTA.intake.to}
        secondaryLabel="Contact us"
        secondaryTo="/contact"
      />
    </>
  )
}
