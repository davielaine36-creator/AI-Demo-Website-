import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SEO } from '../components/SEO'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { CTASection } from '../components/CTASection'
import { IconArrowRight } from '../components/Icons'
import { CTA } from '../data/site'

interface Industry {
  name: string
  blurb: string
  to: string
  linkLabel: string
}

const INDUSTRIES: Industry[] = [
  {
    name: 'Contractors',
    blurb:
      'Websites and quote flows that turn scattered calls and texts into organized project requests.',
    to: '/contractors',
    linkLabel: 'Contractor lead systems',
  },
  {
    name: 'Remodelers',
    blurb:
      'Project intake forms that capture scope, budget, and timeline so estimates start with real detail.',
    to: '/contractors',
    linkLabel: 'See the contractor build',
  },
  {
    name: 'Roofers',
    blurb:
      'Fast quote capture and instant alerts so storm-season leads never wait on a callback.',
    to: '/lead-systems',
    linkLabel: 'How lead systems work',
  },
  {
    name: 'Home services',
    blurb:
      'HVAC, plumbing, electrical, cleaning, landscaping — one place for leads, status, and follow-up.',
    to: '/lead-systems',
    linkLabel: 'How lead systems work',
  },
  {
    name: 'Training companies',
    blurb:
      'Course and enrollment intake with tracked leads and drafted follow-ups for every inquiry.',
    to: '/for-small-businesses',
    linkLabel: 'For small businesses',
  },
  {
    name: 'Shopify stores',
    blurb:
      'Store operations support: organized tasks, customer issue tracking, and draft replies.',
    to: '/services',
    linkLabel: 'Store operations support',
  },
  {
    name: 'Local service businesses',
    blurb:
      'A practical lead-generation foundation for any local operator doing too much by hand.',
    to: '/lead-systems',
    linkLabel: 'How lead systems work',
  },
]

export default function Industries() {
  return (
    <>
      <SEO
        title="Industries We Build For | AI Websites & Lead Systems | Laine Industries"
        description="Laine Industries builds websites, lead systems, and follow-up automation for contractors, remodelers, roofers, home services, training companies, and Shopify stores."
      />
      <PageHero
        eyebrow="Industries"
        title="Built for local service businesses and small operators."
        subtitle="The same simple idea — capture leads, organize customer info, follow up faster — shaped around how each type of business actually works."
      />

      <Section trackName="industries">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry) => (
            <Card key={industry.name} interactive className="flex h-full flex-col">
              <h3 className="text-lg font-semibold text-ink">{industry.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                {industry.blurb}
              </p>
              <Link
                to={industry.to}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                {industry.linkLabel}
                <IconArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Card>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
          Don't see your business? The system is built around your workflow, not
          a template — most local service businesses fit.
        </p>
      </Section>

      <CTASection
        headline="Find the simplest useful place to start."
        text="Tell us how your business works today and we'll recommend a first system that fits — with a demo direction before you commit."
        buttonLabel="Request a Demo"
        buttonTo={CTA.intake.to}
        secondaryLabel="See what we build"
        secondaryTo="/services"
      />
    </>
  )
}
