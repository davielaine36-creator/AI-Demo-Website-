import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Section, SectionHeading } from '../components/Section'
import { ServiceCard } from '../components/ServiceCard'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { CTASection } from '../components/CTASection'
import {
  IconGlobe,
  IconLayout,
  IconSparkles,
  IconBell,
  IconCart,
} from '../components/Icons'
import { SERVICES, STARTER_PACKAGES } from '../data/services'
import { CTA } from '../data/site'

const ICONS: Record<string, JSX.Element> = {
  'website-starter': <IconGlobe />,
  'crm-lead-tracker': <IconLayout />,
  'ai-follow-up': <IconSparkles />,
  'alerts-reminders': <IconBell />,
  'shopify-ops': <IconCart />,
}

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Systems that fit how your business actually works."
        subtitle="Each service solves a specific, everyday problem — capturing leads, staying organized, following up, and looking more professional. Mix and match, or start with one."
      >
        <Button to={CTA.intake.to} size="lg">
          Start With the Intake Form
        </Button>
        <Button to="/contact" variant="secondary" size="lg">
          Ask a question
        </Button>
      </PageHero>

      <Section trackName="services">
        <div className="grid gap-6 lg:grid-cols-2">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              icon={ICONS[service.id]}
            />
          ))}
        </div>
      </Section>

      {/* Starter build / packages */}
      <Section muted trackName="starter-builds">
        <SectionHeading
          eyebrow="Starter builds"
          title="Simple ways to get started."
          description="Flexible starting points rather than rigid packages. Pilot pricing is available — we'll recommend the smallest useful build first."
          align="center"
          className="mb-12"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STARTER_PACKAGES.map((pkg) => (
            <Card key={pkg.name} interactive className="flex h-full flex-col">
              <h3 className="text-base font-semibold text-ink">{pkg.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {pkg.description}
              </p>
              <p className="mt-4 text-xs font-medium text-brand-600">
                Pilot pricing available
              </p>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          No hard prices here on purpose — every business is different. We'll
          give you a clear starting point after the intake.
        </p>
        <p className="mt-2 text-center text-sm text-slate-500">
          Ready to go deeper?{' '}
          <Link to="/full-intake" className="font-semibold text-brand-700 hover:text-brand-800">
            Fill out the full intake questionnaire
          </Link>
          .
        </p>
      </Section>

      <CTASection
        headline="Tell us where it's messy. We'll suggest where to start."
        text="The intake form takes a few minutes and helps us recommend the simplest system that fits your business."
        buttonLabel="Fill Out the Intake Form"
        buttonTo={CTA.intake.to}
        secondaryLabel="See what we build"
        secondaryTo="/demos"
      />
    </>
  )
}
