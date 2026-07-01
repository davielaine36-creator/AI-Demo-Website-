import { Button } from '../components/Button'
import { Section, SectionHeading } from '../components/Section'
import { Card } from '../components/Card'
import { CTASection } from '../components/CTASection'
import {
  IconGlobe,
  IconLayout,
  IconSparkles,
  IconBell,
  IconArrowRight,
} from '../components/Icons'
import { CTA } from '../data/site'

const PROBLEMS = [
  'A customer fills out a form and nobody follows up fast enough.',
  'A lead texts, calls, or emails — and the details get lost.',
  'Job notes are scattered across phones, notebooks, email, and memory.',
  'The website does not explain the business clearly.',
  'The owner knows they need better systems but does not know where to start.',
]

const BUILDS = [
  {
    icon: <IconGlobe />,
    title: 'Websites',
    text: 'Clean landing pages and business websites that explain what you do and make it easy for customers to contact you.',
  },
  {
    icon: <IconLayout />,
    title: 'CRM / Lead Dashboards',
    text: 'Simple dashboards for names, phone numbers, job details, lead status, notes, and follow-up reminders.',
  },
  {
    icon: <IconSparkles />,
    title: 'AI Follow-Up Assistants',
    text: 'Systems that draft follow-up emails or messages so business owners are not starting from scratch every time.',
  },
  {
    icon: <IconBell />,
    title: 'Alerts & Automations',
    text: 'Notifications when a new lead comes in, when someone needs a response, or when a job or customer needs attention.',
  },
]

const AUDIENCE = [
  'Contractors',
  'Window cleaning companies',
  'Service businesses',
  'Training companies',
  'Local operators',
  'Shopify stores',
  'Small teams',
  'Owners doing too much manually',
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="surface-gradient border-b border-slate-100">
        <div className="container-content py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-slate-600">
              Small-business AI systems studio
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              Simple websites, lead tracking, and AI follow-up systems for small
              businesses.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              Lane Industries builds lightweight systems that help business
              owners capture leads, organize customer information, draft
              follow-ups, and stop letting opportunities fall through the cracks.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button to={CTA.intake.to} size="lg">
                Start With the Intake Form
              </Button>
              <Button to={CTA.demos.to} variant="secondary" size="lg">
                See What We Build
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="The real problem"
            title="Most small businesses don't need complicated software."
            description="They need a simple system that keeps leads, customer info, follow-ups, and alerts in one place. Here's what it usually looks like today:"
          />
          <ul className="space-y-3">
            {PROBLEMS.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-soft"
              >
                <span
                  aria-hidden
                  className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-brand-500"
                />
                <span className="text-sm leading-relaxed text-slate-700">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* What we build */}
      <Section muted>
        <SectionHeading
          eyebrow="What Lane Industries builds"
          title="Four building blocks. One simple system."
          description="We start with the lightest useful version and only add what earns its place."
          align="center"
          className="mb-12"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BUILDS.map((b) => (
            <Card key={b.title} interactive className="flex h-full flex-col">
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                {b.icon}
              </div>
              <h3 className="text-lg font-semibold text-ink">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {b.text}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Who it's for */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <SectionHeading
            eyebrow="Who it's for"
            title="Built for owners doing too much by hand."
            description="If your leads and customer info live in your phone, your memory, and a few notebooks, you're exactly who we build for."
          />
          <div className="flex flex-wrap gap-2.5">
            {AUDIENCE.map((a) => (
              <span
                key={a}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-soft"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <CTASection
        headline="Not sure what you need yet? That's normal."
        text="Start with the intake form. We'll use your answers to understand your business and recommend a simple system that actually fits."
        buttonLabel="Fill Out the Intake Form"
        buttonTo={CTA.intake.to}
        secondaryLabel="Talk to us first"
        secondaryTo="/contact"
      />

      {/* Quiet secondary link row */}
      <div className="container-content pb-16">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
          <span>Explore:</span>
          <Button to="/services" variant="ghost" size="sm">
            Services <IconArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          <Button to="/how-it-works" variant="ghost" size="sm">
            How it works <IconArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          <Button to="/for-small-businesses" variant="ghost" size="sm">
            For small businesses <IconArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </div>
    </>
  )
}
