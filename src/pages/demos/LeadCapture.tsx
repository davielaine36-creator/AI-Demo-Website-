import { Link } from 'react-router-dom'
import { PageHero } from '../../components/PageHero'
import { Section, SectionHeading } from '../../components/Section'
import { Card } from '../../components/Card'
import { CTASection } from '../../components/CTASection'
import { DemoDisclaimer } from '../../components/demo/DemoDisclaimer'
import { StatusPill } from '../../components/demo/StatusPill'
import { CTA } from '../../data/site'

// Example data only — no real customers. Kept obviously fictional.
const FORM_FIELDS = [
  { label: 'Name', value: 'Jamie Carter' },
  { label: 'Phone', value: '(555) 201-0119' },
  { label: 'Service needed', value: 'Gutter cleaning — two-story house' },
  { label: 'Preferred date', value: 'Next week, flexible' },
  { label: 'Urgency', value: 'Soon, but not an emergency' },
  {
    label: 'Notes',
    value: 'Back gutters overflow when it rains. Please call after 3pm.',
    wide: true,
  },
]

const LEAD_SUMMARY = [
  { label: 'Phone', value: '(555) 201-0119' },
  { label: 'Service', value: 'Gutter cleaning — two-story house' },
  { label: 'Preferred date', value: 'Next week, flexible' },
  { label: 'Urgency', value: 'Soon, but not an emergency' },
  {
    label: 'Notes',
    value: 'Back gutters overflow when it rains. Please call after 3pm.',
  },
]

const PIPELINE = [
  { stage: 'New', caption: 'The request just came in.' },
  {
    stage: 'Contacted',
    caption: 'The owner has called or replied.',
    current: true,
  },
  { stage: 'Estimate Sent', caption: 'A price is in front of the customer.' },
  { stage: 'Scheduled', caption: 'The job is on the calendar.' },
  { stage: 'Won', caption: 'Work done and paid.' },
]

const PREVENTS = [
  {
    title: 'Missed calls',
    text: 'A request that comes in while you are on a ladder still lands somewhere safe, with everything you need to call back.',
  },
  {
    title: 'Forgotten follow-ups',
    text: 'Every lead keeps a next step attached to it, so no one quietly slips through the cracks.',
  },
  {
    title: 'Scattered customer info',
    text: 'Name, number, and job details live in one place — not spread across texts, voicemail, and sticky notes.',
  },
  {
    title: 'Unclear next steps',
    text: 'At a glance you know what happens next for each lead: call, quote, schedule, or follow up.',
  },
]

export default function LeadCaptureDemo() {
  return (
    <>
      <PageHero
        eyebrow="Demo · Lead capture"
        title="See how a lead moves from inquiry to organized follow-up."
        subtitle="A static walkthrough of a simple lead system for a small service business — from the moment a customer asks for a quote to the moment the job is won."
      >
        <StatusPill tone="info">Static demo</StatusPill>
        <StatusPill>Example data only</StatusPill>
        <StatusPill>Nothing is saved or sent</StatusPill>
      </PageHero>

      {/* Step 1 — the inquiry */}
      <Section>
        <SectionHeading
          eyebrow="Step 1 — The inquiry"
          title="A customer asks for a quote."
          description="Instead of a voicemail or a text that gets buried, the request comes in through a short form that asks for exactly what the owner needs to know."
          align="center"
          className="mb-10"
        />
        <Card className="mx-auto max-w-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <h3 className="text-base font-semibold text-ink">
              Request a quote
            </h3>
            <StatusPill>Preview only — this form does not submit</StatusPill>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {FORM_FIELDS.map((field) => (
              <div key={field.label} className={field.wide ? 'sm:col-span-2' : ''}>
                <p className="text-xs font-semibold text-slate-500">
                  {field.label}
                </p>
                <p className="mt-1 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm leading-relaxed text-slate-700">
                  {field.value}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </Section>

      {/* Step 2 — the owner's view */}
      <Section muted>
        <SectionHeading
          eyebrow="Step 2 — The owner's view"
          title="The business owner sees a clean summary."
          description="No digging through an inbox. The lead shows up as one tidy card with everything needed to act on it."
          align="center"
          className="mb-10"
        />
        <Card className="mx-auto max-w-xl">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
                New lead
              </p>
              <h3 className="mt-1 text-lg font-semibold text-ink">
                Jamie Carter
              </h3>
              <p className="mt-0.5 text-sm text-slate-500">
                Received today, 9:14 AM
              </p>
            </div>
            <StatusPill tone="warn">Needs a call back</StatusPill>
          </div>
          <dl className="mt-5 space-y-3 border-t border-slate-100 pt-5">
            {LEAD_SUMMARY.map((row) => (
              <div key={row.label} className="flex gap-4 text-sm">
                <dt className="w-28 flex-shrink-0 font-semibold text-slate-500">
                  {row.label}
                </dt>
                <dd className="leading-relaxed text-slate-700">{row.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 rounded-xl bg-brand-50 px-4 py-3 text-sm leading-relaxed text-brand-800">
            <span className="font-semibold">Suggested next step:</span> call
            back before the end of the day, then mark the lead
            &ldquo;Contacted.&rdquo;
          </p>
        </Card>
      </Section>

      {/* Step 3 — the pipeline */}
      <Section>
        <SectionHeading
          eyebrow="Step 3 — The pipeline"
          title="The lead moves through simple stages."
          description="Five stages are enough for most small service businesses. Each lead sits in exactly one, so nothing is ever in limbo."
          align="center"
          className="mb-10"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PIPELINE.map((step, i) => (
            <div
              key={step.stage}
              className={`rounded-2xl border p-5 ${
                step.current
                  ? 'border-brand-300 bg-brand-50/60'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <span
                className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${
                  step.current ? 'bg-brand-600 text-white' : 'bg-ink text-white'
                }`}
              >
                {i + 1}
              </span>
              <h3 className="mt-3 text-sm font-semibold text-ink">
                {step.stage}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                {step.caption}
              </p>
              {step.current && (
                <StatusPill tone="info" className="mt-3">
                  Example lead is here
                </StatusPill>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* What this helps prevent */}
      <Section muted>
        <SectionHeading
          eyebrow="Why it matters"
          title="What this helps prevent."
          description="A lead system is less about software and more about the small losses that stop happening once things are organized."
          align="center"
          className="mb-10"
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {PREVENTS.map((item) => (
            <Card key={item.title}>
              <h3 className="text-base font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.text}
              </p>
            </Card>
          ))}
        </div>
        <DemoDisclaimer className="mt-12" />
      </Section>

      <CTASection
        headline="Want a lead system like this for your business?"
        text="Start with the short intake form and tell us how leads reach you today. We'll suggest the simplest version that would actually help."
        buttonLabel={CTA.intake.label}
        buttonTo={CTA.intake.to}
        secondaryLabel="Contact us"
        secondaryTo="/contact"
      />
      <div className="container-content pb-16 text-center">
        <p className="text-sm text-slate-500">
          <Link
            to="/demos"
            className="font-semibold text-brand-700 hover:text-brand-800"
          >
            Back to all demos
          </Link>
        </p>
      </div>
    </>
  )
}
