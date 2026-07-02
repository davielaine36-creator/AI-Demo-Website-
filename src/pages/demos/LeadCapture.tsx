import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../../components/PageHero'
import { Section, SectionHeading } from '../../components/Section'
import { Card } from '../../components/Card'
import { Button } from '../../components/Button'
import { CTASection } from '../../components/CTASection'
import { DemoDisclaimer } from '../../components/demo/DemoDisclaimer'
import { StatusPill } from '../../components/demo/StatusPill'
import { CTA } from '../../data/site'

interface LeadForm {
  name: string
  phone: string
  service: string
  preferredDate: string
  urgency: string
  notes: string
}

const EMPTY_FORM: LeadForm = {
  name: '',
  phone: '',
  service: '',
  preferredDate: '',
  urgency: '',
  notes: '',
}

// Obviously fictional sample — no real customer.
const SAMPLE_LEAD: LeadForm = {
  name: 'Jamie Carter',
  phone: '(555) 201-0119',
  service: 'Gutter cleaning — two-story house',
  preferredDate: 'Next week, flexible',
  urgency: 'Soon, but not an emergency',
  notes: 'Back gutters overflow when it rains. Please call after 3pm.',
}

const FIELDS: {
  key: keyof LeadForm
  label: string
  placeholder: string
  wide?: boolean
  textarea?: boolean
}[] = [
  { key: 'name', label: 'Name', placeholder: 'e.g. Jamie Carter' },
  { key: 'phone', label: 'Phone', placeholder: 'e.g. (555) 201-0119' },
  {
    key: 'service',
    label: 'Service needed',
    placeholder: 'e.g. Gutter cleaning — two-story house',
    wide: true,
  },
  { key: 'preferredDate', label: 'Preferred date', placeholder: 'e.g. Next week' },
  { key: 'urgency', label: 'Urgency', placeholder: 'e.g. Not an emergency' },
  {
    key: 'notes',
    label: 'Notes',
    placeholder: 'Anything useful for the callback',
    wide: true,
    textarea: true,
  },
]

const STAGES = ['New', 'Contacted', 'Estimate sent', 'Scheduled', 'Won'] as const
type Stage = (typeof STAGES)[number]

const STAGE_CAPTION: Record<Stage, string> = {
  New: 'The request just came in.',
  Contacted: 'The owner has called or replied.',
  'Estimate sent': 'A price is in front of the customer.',
  Scheduled: 'The job is on the calendar.',
  Won: 'Work done and paid.',
}

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

const inputClass =
  'mt-1 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-ink placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30'

export default function LeadCaptureDemo() {
  const [form, setForm] = useState<LeadForm>(EMPTY_FORM)
  const [lead, setLead] = useState<LeadForm | null>(null)
  const [stage, setStage] = useState<Stage>('New')

  const update = (key: keyof LeadForm, value: string) =>
    setForm((f) => ({ ...f, [key]: value }))

  const submit = (e: FormEvent) => {
    e.preventDefault()
    // Gentle: need at least a name or a service to make a summary worth showing.
    if (!form.name.trim() && !form.service.trim()) return
    setLead(form)
    setStage('New')
  }

  const resetDemo = () => {
    setForm(EMPTY_FORM)
    setLead(null)
    setStage('New')
  }

  const summaryRows: { label: string; value: string }[] = lead
    ? [
        { label: 'Phone', value: lead.phone },
        { label: 'Service', value: lead.service },
        { label: 'Preferred date', value: lead.preferredDate },
        { label: 'Urgency', value: lead.urgency },
        { label: 'Notes', value: lead.notes },
      ].filter((row) => row.value.trim().length > 0)
    : []

  return (
    <>
      <PageHero
        eyebrow="Demo · Lead capture"
        title="See how a lead moves from inquiry to organized follow-up."
        subtitle="An interactive, front-end demo of a simple lead system for a small service business. Fill in the form (or tap “Use sample lead”), submit it, and watch it land as a clean summary and move through a pipeline."
      >
        <StatusPill tone="info">Interactive demo</StatusPill>
        <StatusPill>Mock data only</StatusPill>
        <StatusPill>Nothing is saved or sent</StatusPill>
      </PageHero>

      {/* Step 1 — the inquiry form */}
      <Section>
        <SectionHeading
          eyebrow="Step 1 — The inquiry"
          title="A customer asks for a quote."
          description="Instead of a voicemail or a text that gets buried, the request comes in through a short form that captures exactly what the owner needs to know."
          align="center"
          className="mb-10"
        />
        <Card className="mx-auto max-w-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <h3 className="text-base font-semibold text-ink">Request a quote</h3>
            <StatusPill>Demo form — nothing is sent</StatusPill>
          </div>
          <form onSubmit={submit} className="mt-5 grid gap-4 sm:grid-cols-2">
            {FIELDS.map((field) => (
              <div key={field.key} className={field.wide ? 'sm:col-span-2' : ''}>
                <label
                  htmlFor={`lead-${field.key}`}
                  className="text-xs font-semibold text-slate-500"
                >
                  {field.label}
                </label>
                {field.textarea ? (
                  <textarea
                    id={`lead-${field.key}`}
                    value={form[field.key]}
                    onChange={(e) => update(field.key, e.target.value)}
                    rows={3}
                    placeholder={field.placeholder}
                    className={`${inputClass} resize-y`}
                  />
                ) : (
                  <input
                    id={`lead-${field.key}`}
                    type="text"
                    value={form[field.key]}
                    onChange={(e) => update(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className={inputClass}
                  />
                )}
              </div>
            ))}
            <div className="flex flex-wrap gap-2 sm:col-span-2">
              <Button type="submit" size="sm">
                Submit lead
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setForm(SAMPLE_LEAD)}
              >
                Use sample lead
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={resetDemo}
              >
                Reset demo
              </Button>
            </div>
          </form>
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
        {lead ? (
          <Card className="mx-auto max-w-xl">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
                  New lead
                </p>
                <h3 className="mt-1 text-lg font-semibold text-ink">
                  {lead.name.trim() || 'New lead'}
                </h3>
                <p className="mt-0.5 text-sm text-slate-500">Received just now</p>
              </div>
              <StatusPill tone="warn">Needs a call back</StatusPill>
            </div>
            {summaryRows.length > 0 && (
              <dl className="mt-5 space-y-3 border-t border-slate-100 pt-5">
                {summaryRows.map((row) => (
                  <div key={row.label} className="flex gap-4 text-sm">
                    <dt className="w-28 flex-shrink-0 font-semibold text-slate-500">
                      {row.label}
                    </dt>
                    <dd className="leading-relaxed text-slate-700">{row.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <p className="mt-5 rounded-xl bg-brand-50 px-4 py-3 text-sm leading-relaxed text-brand-800">
              <span className="font-semibold">Suggested next step:</span> call
              back before the end of the day, then move the lead to
              &ldquo;Contacted&rdquo; below.
            </p>
          </Card>
        ) : (
          <Card className="mx-auto max-w-xl text-center">
            <p className="text-sm leading-relaxed text-slate-500">
              Submit the form above — or tap{' '}
              <span className="font-semibold text-slate-700">Use sample lead</span>{' '}
              — and the request will land here as a clean summary card.
            </p>
          </Card>
        )}
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
          {STAGES.map((s, i) => {
            const current = lead !== null && s === stage
            return (
              <button
                key={s}
                type="button"
                disabled={lead === null}
                onClick={() => setStage(s)}
                aria-pressed={current}
                className={`rounded-2xl border p-5 text-left transition-colors ${
                  current
                    ? 'border-brand-300 bg-brand-50/60'
                    : 'border-slate-200 bg-white'
                } ${
                  lead === null
                    ? 'cursor-not-allowed opacity-70'
                    : 'hover:border-slate-300'
                }`}
              >
                <span
                  className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${
                    current ? 'bg-brand-600 text-white' : 'bg-ink text-white'
                  }`}
                >
                  {i + 1}
                </span>
                <h3 className="mt-3 text-sm font-semibold text-ink">{s}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                  {STAGE_CAPTION[s]}
                </p>
                {current && (
                  <StatusPill tone="info" className="mt-3">
                    Lead is here
                  </StatusPill>
                )}
              </button>
            )
          })}
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
          {lead === null ? (
            <>Submit a lead above to move it through the pipeline.</>
          ) : (
            <>
              Tap a stage to move{' '}
              <span className="font-semibold text-slate-700">
                {lead.name.trim() || 'this lead'}
              </span>{' '}
              along. This is mock state in your browser — nothing is saved or
              sent.
            </>
          )}
        </p>
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
