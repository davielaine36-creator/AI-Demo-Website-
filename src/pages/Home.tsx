import { Button } from '../components/Button'
import { SEO } from '../components/SEO'
import { Section, SectionHeading } from '../components/Section'
import { Card } from '../components/Card'
import { CTASection } from '../components/CTASection'
import { useSectionView } from '../lib/useSectionTracking'
import {
  IconGlobe,
  IconLayout,
  IconSparkles,
  IconBell,
  IconClipboard,
  IconUsers,
  IconCheck,
  IconArrowRight,
} from '../components/Icons'
import { CTA } from '../data/site'

const PROBLEMS = [
  'A customer fills out a form and nobody follows up fast enough.',
  'A lead texts, calls, or emails — and the details get lost.',
  'Job notes are scattered across phones, notebooks, email, and memory.',
  'The website does not explain the business clearly.',
  'There is no quote form, no pipeline, and no reminder to follow up.',
  'The owner knows they need better systems but does not know where to start.',
]

const BUILDS = [
  {
    icon: <IconGlobe />,
    title: 'Business websites',
    text: 'Clean websites that explain what you do and make the next step obvious.',
  },
  {
    icon: <IconClipboard />,
    title: 'Lead capture landing pages',
    text: 'Focused pages built to turn visitors into organized quote requests.',
  },
  {
    icon: <IconClipboard />,
    title: 'Quote / request forms',
    text: 'Forms that ask for the right details so leads arrive ready to act on.',
  },
  {
    icon: <IconLayout />,
    title: 'CRM / lead dashboards',
    text: 'One place for names, numbers, job details, status, notes, and follow-ups.',
  },
  {
    icon: <IconSparkles />,
    title: 'AI follow-up assistants',
    text: 'Drafted follow-up messages so owners respond faster — with owner approval.',
  },
  {
    icon: <IconBell />,
    title: 'Alerts & reminders',
    text: 'Notifications when a lead comes in or a customer needs attention.',
  },
  {
    icon: <IconGlobe />,
    title: 'Demo websites',
    text: 'A practical demo direction so you can see the idea before committing.',
  },
  {
    icon: <IconUsers />,
    title: 'Local lead-generation systems',
    text: 'The foundation to capture, qualify, route, and follow up with local leads.',
  },
]

const STEPS = [
  {
    title: 'Tell us about your business.',
    text: 'Start with a short intake so we understand your business, website, customers, goals, and current workflow.',
  },
  {
    title: 'We map the simplest useful system.',
    text: 'We identify whether you need a website, landing page, intake form, dashboard, follow-up flow, or full lead system.',
  },
  {
    title: 'We build a demo direction.',
    text: 'You see a practical direction before committing to a full build.',
  },
  {
    title: 'We connect the workflow.',
    text: 'Forms, notifications, CRM tracking, follow-up drafts, and launch support can be connected around the build.',
  },
]

const AUDIENCE = [
  'Contractors',
  'Remodelers',
  'Roofers',
  'HVAC companies',
  'Home service businesses',
  'Window cleaning companies',
  'Training companies',
  'Local service operators',
  'Shopify stores',
  'Small businesses with outdated websites',
  'Owners doing too much manually',
]

export default function Home() {
  const heroRef = useSectionView<HTMLElement>('hero')
  return (
    <>
      <SEO
        title="Laine Industries | AI Websites & Lead Systems for Small Businesses"
        description="Laine Industries builds AI-powered websites, intake forms, lead dashboards, and follow-up systems for small businesses and local service operators."
        path="/"
      />

      {/* Hero */}
      <section
        ref={heroRef}
        className="surface-gradient border-b border-slate-100"
      >
        <div className="container-content py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              />
              AI websites + lead systems for small businesses
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              Turn your business website into a simple lead system.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              Laine Industries builds websites, intake forms, CRM dashboards, and
              follow-up automations that help small businesses capture leads,
              organize customer info, and respond faster.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button to={CTA.intake.to} size="lg" trackAs="request_demo_click">
                Request a Demo
              </Button>
              <Button
                to={CTA.demos.to}
                variant="secondary"
                size="lg"
                trackAs="see_demos_click"
              >
                See What We Build
              </Button>
            </div>
            <p className="mx-auto mt-5 max-w-xl text-sm text-slate-500">
              Demo-first: you see a practical direction before you commit to a
              full build.
            </p>
          </div>
        </div>
      </section>

      {/* Problem */}
      <Section trackName="problem">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="The real problem"
            title="Most small businesses don't lose customers for lack of software."
            description="They lose them because the next step is unclear, the form is weak, follow-up is slow, or the details are scattered. Here's what it usually looks like today:"
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
      <Section muted trackName="services">
        <SectionHeading
          eyebrow="What Laine Industries builds"
          title="Websites and lead systems, built around how you actually work."
          description="We start with the smallest useful system and only add what earns its place."
          align="center"
          className="mb-12"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BUILDS.map((b) => (
            <Card key={b.title} interactive className="flex h-full flex-col">
              <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                {b.icon}
              </div>
              <h3 className="text-base font-semibold text-ink">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {b.text}
              </p>
            </Card>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button to="/services" variant="ghost" size="sm">
            See all services <IconArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </Section>

      {/* How the system works */}
      <Section trackName="how-it-works">
        <SectionHeading
          eyebrow="How the system works"
          title="A demo-first path from intake to a working system."
          description="You do not need to understand AI to benefit. You need a clear path from customer interest to organized follow-up."
          align="center"
          className="mb-12"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
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

      {/* Who it's for */}
      <Section muted trackName="audience">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <SectionHeading
            eyebrow="Who it's for"
            title="Built for local service businesses and owners doing too much by hand."
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

      {/* Trust / guardrails */}
      <Section trackName="guardrails">
        <div className="mx-auto max-w-3xl">
          <Card className="surface-gradient">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <IconCheck />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-ink">
              Real systems, not hype.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              We do not build fake engagement, fake reviews, or spam systems.
              Laine Industries focuses on real websites, real intake, real
              follow-up, and practical automation. We don't promise guaranteed
              rankings, leads, or revenue — we build the system that helps you
              capture and manage the interest you earn.
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                'Start with the smallest useful system',
                'Owner approval before anything sends',
                'Built around your actual workflow',
                'No fake reviews or spam',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 text-brand-600">
                    <IconCheck className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-sm text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* CTA */}
      <CTASection
        headline="Not sure what you need yet? That's normal."
        text="Start with the intake form. We'll use your answers to map the simplest system that fits your business — and show you a demo direction first."
        buttonLabel="Request a Demo"
        buttonTo={CTA.intake.to}
        secondaryLabel="Talk to us first"
        secondaryTo="/contact"
      />

      {/* Quiet secondary link row */}
      <div className="container-content pb-16">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
          <span>Explore:</span>
          <Button to="/lead-systems" variant="ghost" size="sm">
            Lead systems <IconArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          <Button to="/contractors" variant="ghost" size="sm">
            For contractors <IconArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          <Button to="/industries" variant="ghost" size="sm">
            Industries <IconArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </div>
    </>
  )
}
