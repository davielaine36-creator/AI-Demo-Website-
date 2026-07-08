import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SEO } from '../components/SEO'
import { Section, SectionHeading } from '../components/Section'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { FeatureList } from '../components/FeatureList'
import { CTASection } from '../components/CTASection'
import { trackEvent } from '../lib/analytics'
import { CTA } from '../data/site'

const PROBLEMS = [
  'Customers ask for quotes but the details are missing.',
  'Leads come from calls, texts, and emails — and get scattered.',
  'Slow response loses jobs to whoever answered first.',
  'The website does not explain services clearly.',
  'There is no quote form and no follow-up reminders.',
  'There is no status pipeline, so leads slip through the cracks.',
]

const QUOTE_FIELDS = [
  'Name',
  'Phone',
  'Email',
  'Zip code / service area',
  'Project type',
  'Budget range',
  'Timeline',
  'Owns home / business?',
  'Best time to contact',
  'Notes / photos (optional)',
]

const SYSTEM = [
  {
    title: 'Contractor website',
    text: 'A clear site that explains your services, service area, and how to request a quote.',
  },
  {
    title: 'Quote request flow',
    text: 'A form that collects project type, location, budget, and timeline so quotes start with real detail.',
  },
  {
    title: 'Lead dashboard',
    text: 'Every request in one place with status, notes, and the next follow-up date.',
  },
  {
    title: 'Follow-up flow',
    text: 'AI-drafted follow-ups and reminders so no lead goes cold while you are on a job.',
  },
]

export default function Contractors() {
  useEffect(() => {
    trackEvent('contractor_page_view')
  }, [])

  return (
    <>
      <SEO
        title="AI Websites & Lead Systems for Contractors | Laine Industries"
        description="Laine Industries builds contractor websites, quote forms, lead dashboards, and follow-up systems that help organize project requests."
      />
      <PageHero
        eyebrow="For contractors"
        title="Websites and lead systems for contractors who need more organized quote requests."
        subtitle="Laine Industries builds contractor websites, quote forms, lead dashboards, and follow-up flows that help turn interest into organized project opportunities."
      >
        <Button to={CTA.intake.to} size="lg" trackAs="request_demo_click">
          Request a Demo
        </Button>
        <Button to="/lead-systems" variant="secondary" size="lg">
          How lead systems work
        </Button>
      </PageHero>

      {/* Problems */}
      <Section trackName="contractor-problems">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Problems contractors face"
            title="The jobs are out there. The intake is the leak."
            description="If any of these sound familiar, the fix is usually a clearer quote flow — not a bigger software stack."
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

      {/* Quote flow + fields */}
      <Section muted>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <Card>
            <h3 className="text-lg font-semibold text-ink">
              The quote request flow
            </h3>
            <ol className="mt-5 space-y-3">
              {[
                'A homeowner lands on your site and taps "Request a quote."',
                'They answer a few focused questions about the project.',
                'The request is saved and you get an instant alert.',
                'A follow-up is drafted for you to review and send.',
                'You move the lead through simple stages to won.',
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
            <h3 className="text-lg font-semibold text-ink">
              Example quote form fields
            </h3>
            <FeatureList items={QUOTE_FIELDS} className="mt-5" />
            <p className="mt-6 border-t border-slate-100 pt-5 text-sm leading-relaxed text-slate-600">
              We tune the fields to your trade so every quote request arrives
              ready to act on.
            </p>
          </Card>
        </div>
      </Section>

      {/* The full system */}
      <Section>
        <SectionHeading
          eyebrow="Website + CRM + follow-up"
          title="One connected system, shaped around your trade."
          align="center"
          className="mb-12"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SYSTEM.map((item) => (
            <Card key={item.title} className="flex h-full flex-col">
              <h3 className="text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.text}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section muted>
        <SectionHeading
          eyebrow="FAQ"
          title="Common contractor questions."
          align="center"
          className="mb-12"
        />
        <div className="mx-auto max-w-3xl space-y-4">
          {[
            {
              q: 'Can I keep my current website?',
              a: 'Often yes. We can add a quote flow and lead tracker to what you have, or build a fresh site if the current one is holding you back.',
            },
            {
              q: 'Will this text or email leads without me?',
              a: 'Only if you want it to. By default follow-ups are drafted for your approval so you stay in control of what goes out.',
            },
            {
              q: 'Do you guarantee more jobs?',
              a: 'No. We build the system that captures and organizes the quote requests you earn and helps you follow up faster. That is the part you control.',
            },
          ].map((item) => (
            <Card key={item.q}>
              <h3 className="text-base font-semibold text-ink">{item.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.a}
              </p>
            </Card>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate-500">
          Not a contractor?{' '}
          <Link
            to="/industries"
            className="font-semibold text-brand-700 hover:text-brand-800"
          >
            See other industries we build for
          </Link>
          .
        </p>
      </Section>

      <CTASection
        headline="Get more organized quote requests."
        text="Start with the intake form. We'll map a contractor lead system for your trade and show you a demo direction before you commit."
        buttonLabel="Request a Demo"
        buttonTo={CTA.intake.to}
        secondaryLabel="See example systems"
        secondaryTo="/demos"
      />
    </>
  )
}
