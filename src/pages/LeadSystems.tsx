import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SEO } from '../components/SEO'
import { Section, SectionHeading } from '../components/Section'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { FeatureList } from '../components/FeatureList'
import { CTASection } from '../components/CTASection'
import { IconArrowRight } from '../components/Icons'
import { trackEvent } from '../lib/analytics'
import { CTA } from '../data/site'

const WHY_LOST = [
  'The next step is unclear once someone lands on the site.',
  'The form is weak, or there is no quote form at all.',
  'Follow-up is slow, so the lead cools off or hires someone else.',
  'Details are scattered across calls, texts, email, and memory.',
  'There is no pipeline, so leads are forgotten instead of worked.',
]

const SYSTEM_STEPS = [
  {
    title: 'Capture',
    text: 'A focused landing page and quote form that ask for the right details up front.',
  },
  {
    title: 'Qualify',
    text: 'Service area, project type, budget range, and timeline fields help sort serious requests.',
  },
  {
    title: 'Route',
    text: 'New leads land in one organized place and notify you the moment they arrive.',
  },
  {
    title: 'Follow up',
    text: 'AI-drafted follow-ups (with your approval) and reminders keep leads from going cold.',
  },
  {
    title: 'Report',
    text: 'See where leads come from and what is working, so targeting can be tuned over time.',
  },
]

const INCLUDED = [
  'Service landing page(s)',
  'Quote / request form',
  'Service-area and project fields',
  'Budget and timeline fields',
  'Lead source tracking',
  'Admin notifications',
  'CRM-style lead tracker',
  'Follow-up drafts + reminders',
  'Simple reporting',
]

const FAQ = [
  {
    q: 'Do you guarantee leads?',
    a: 'No — and be careful of anyone who does. We build the system that captures, organizes, and follows up on the interest your business earns. That is what you control; the rest depends on your market, offer, and outreach.',
  },
  {
    q: 'Do I need to replace my whole website?',
    a: 'Usually not. Many businesses start with a single lead capture page and form connected to a simple tracker, then grow from there.',
  },
  {
    q: 'Does this send messages automatically?',
    a: 'Only if you want it to. By default, follow-ups are drafted for your approval — you stay in control of what goes out.',
  },
  {
    q: 'What do I need to get started?',
    a: 'A short intake about your business and how customers reach you today. From there we map the simplest useful system and show a demo direction first.',
  },
]

export default function LeadSystems() {
  useEffect(() => {
    trackEvent('lead_system_page_view')
  }, [])

  return (
    <>
      <SEO
        title="Automated Lead Systems for Small Businesses | Laine Industries"
        description="Capture, qualify, route, and follow up with leads using website forms, CRM-style tracking, alerts, and practical automation."
      />
      <PageHero
        eyebrow="Lead systems"
        title="Automated lead systems for small businesses."
        subtitle="Capture, qualify, route, and follow up with leads using website forms, CRM-style tracking, alerts, and practical automation — built around how your business actually works."
      >
        <Button to={CTA.intake.to} size="lg" trackAs="request_demo_click">
          Request a Demo
        </Button>
        <Button to="/services" variant="secondary" size="lg">
          See services
        </Button>
      </PageHero>

      {/* What a lead system is */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-slate-700">
            Most businesses do not lose customers because they lack software.
            They lose customers because the next step is unclear, the form is
            weak, follow-up is slow, or the details are scattered.{' '}
            <span className="font-semibold text-ink">
              A lead system fixes the path from visitor to conversation.
            </span>
          </p>
        </div>
      </Section>

      {/* Why websites lose leads */}
      <Section muted>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Why websites lose leads"
            title="A nice-looking site is not the same as a working one."
            description="These are the gaps we see most often when a business is not converting the traffic it already has."
          />
          <ul className="space-y-3">
            {WHY_LOST.map((p) => (
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

      {/* The Laine Industries lead system */}
      <Section>
        <SectionHeading
          eyebrow="The Laine Industries lead system"
          title="Five stages, one simple flow."
          align="center"
          className="mb-12"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {SYSTEM_STEPS.map((step, i) => (
            <Card key={step.title} className="flex h-full flex-col">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {step.text}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Example flow + what's included */}
      <Section muted>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <Card>
            <h3 className="text-lg font-semibold text-ink">Example flow</h3>
            <ol className="mt-5 space-y-3">
              {[
                'A homeowner searches and lands on your quote page.',
                'They submit name, service area, project type, budget, and timeline.',
                'The lead is saved and you get an instant notification.',
                'An AI-drafted follow-up is ready for you to review and send.',
                'The lead moves through simple stages until it is won or closed.',
              ].map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-slate-700">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-ink">What's included</h3>
            <FeatureList items={INCLUDED} className="mt-5" />
            <p className="mt-6 border-t border-slate-100 pt-5 text-sm leading-relaxed text-slate-600">
              We start with the smallest useful version and grow it only when
              there's a clear reason to.
            </p>
          </Card>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeading
          eyebrow="FAQ"
          title="Straight answers."
          align="center"
          className="mb-12"
        />
        <div className="mx-auto max-w-3xl space-y-4">
          {FAQ.map((item) => (
            <Card key={item.q}>
              <h3 className="text-base font-semibold text-ink">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.a}
              </p>
            </Card>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-500">
          Run a service business?{' '}
          <Link
            to="/contractors"
            className="font-semibold text-brand-700 hover:text-brand-800"
          >
            See the contractor lead system
          </Link>
          <IconArrowRight className="ml-1 inline h-4 w-4 align-text-bottom" aria-hidden />
        </p>
      </Section>

      <CTASection
        headline="Ready to fix the path from visitor to conversation?"
        text="Start with the intake form. We'll map the simplest lead system for your business and show you a demo direction before you commit."
        buttonLabel="Request a Demo"
        buttonTo={CTA.intake.to}
        secondaryLabel="See what we build"
        secondaryTo="/demos"
      />
    </>
  )
}
