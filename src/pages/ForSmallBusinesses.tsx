import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Section, SectionHeading } from '../components/Section'
import { Card } from '../components/Card'
import { FeatureList } from '../components/FeatureList'
import { CTASection } from '../components/CTASection'
import { CTA } from '../data/site'

interface Flow {
  title: string
  subtitle: string
  steps: string[]
}

const FLOWS: Flow[] = [
  {
    title: 'Window cleaning / construction / home service',
    subtitle: 'A quote request turns into an organized, followed-up lead.',
    steps: [
      'Customer fills out a quote request',
      'Info goes into the dashboard',
      'Owner gets an alert',
      'AI drafts a follow-up message',
      'Job status can be tracked',
      'Past customers can be followed up with later',
    ],
  },
  {
    title: 'Training business',
    subtitle: 'A course question becomes a tracked lead with a clear next step.',
    steps: [
      'Student asks about a course',
      'Website explains basic information',
      'Lead goes into the dashboard',
      'Follow-up email gets drafted',
      'Reminder is created for the next step',
    ],
  },
  {
    title: 'Shopify business',
    subtitle: 'A customer issue becomes a clear task that gets resolved.',
    steps: [
      'Product or customer issue comes in',
      'Info is categorized',
      'Owner gets a clear task',
      'Draft reply or action is created',
      'The issue is tracked until resolved',
    ],
  },
]

const HELPS = [
  'Respond to leads faster',
  'Look more professional online',
  'Stop losing customer info',
  'Keep track of follow-ups',
  'Reduce repetitive writing',
  'Organize jobs and customer requests',
  'Make the business easier to manage',
  'Give owners one place to see what needs attention',
]

export default function ForSmallBusinesses() {
  return (
    <>
      <PageHero
        eyebrow="For small businesses"
        title="A simple system for businesses tired of doing everything manually."
        subtitle="You do not need a complicated software stack. You need a clean way to capture leads, organize customer info, follow up faster, and know what needs attention."
      />

      {/* Real-life flows */}
      <Section>
        <SectionHeading
          eyebrow="What this looks like in real life"
          title="Same simple idea, shaped around your business."
          description="Here's how the pieces fit together for a few common types of business."
          className="mb-12"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {FLOWS.map((flow) => (
            <Card key={flow.title} className="flex h-full flex-col">
              <h3 className="text-lg font-semibold text-ink">{flow.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {flow.subtitle}
              </p>
              <ol className="mt-6 space-y-3">
                {flow.steps.map((step, i) => (
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
          ))}
        </div>
      </Section>

      {/* What this can help with */}
      <Section muted>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="What this can help with"
            title="Less manual chaos. More things handled."
            description="A good system quietly takes care of the small stuff so you can focus on the work."
          />
          <Card>
            <FeatureList items={HELPS} className="sm:grid sm:grid-cols-2 sm:gap-x-6 sm:space-y-0 sm:[&>li]:mb-3" />
          </Card>
        </div>
      </Section>

      <CTASection
        headline="If this sounds like something your business needs, start with the short intake form."
        text="A few minutes now helps us understand your business and suggest the simplest useful place to start."
        buttonLabel="Start the Intake"
        buttonTo={CTA.intake.to}
        secondaryLabel="See example systems"
        secondaryTo="/demos"
      />
      <div className="container-content pb-16 text-center">
        <p className="text-sm text-slate-500">
          Want to give us the full picture?{' '}
          <Link to="/full-intake" className="font-semibold text-brand-700 hover:text-brand-800">
            Open the full intake questionnaire
          </Link>
          .
        </p>
      </div>
    </>
  )
}
