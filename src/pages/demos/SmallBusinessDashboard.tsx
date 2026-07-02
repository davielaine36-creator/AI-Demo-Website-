import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../../components/PageHero'
import { Section, SectionHeading } from '../../components/Section'
import { Card } from '../../components/Card'
import { CTASection } from '../../components/CTASection'
import { FeatureList } from '../../components/FeatureList'
import { DemoDisclaimer } from '../../components/demo/DemoDisclaimer'
import { StatusPill } from '../../components/demo/StatusPill'
import { IconCheck } from '../../components/Icons'
import { CTA } from '../../data/site'

// All example data — the people, jobs, and numbers below are fictional.
const METRICS = [
  { label: 'New leads this week', value: '6', caption: '3 still need a first call' },
  { label: 'Follow-ups due', value: '4', caption: '2 are due today' },
  { label: 'Estimates sent', value: '3', caption: '1 waiting on an answer' },
  { label: 'Jobs scheduled', value: '2', caption: 'Next one is Thursday morning' },
]

type LeadStatus = 'New' | 'Contacted' | 'Estimate sent' | 'Scheduled'

const STATUS_TONES: Record<LeadStatus, 'neutral' | 'info' | 'success' | 'warn'> = {
  New: 'warn',
  Contacted: 'info',
  'Estimate sent': 'neutral',
  Scheduled: 'success',
}

interface Lead {
  name: string
  service: string
  received: string
  status: LeadStatus
  next: string
  detail: string
}

const LEADS: Lead[] = [
  {
    name: 'Jamie Carter',
    service: 'Gutter cleaning',
    received: 'Today',
    status: 'New',
    next: 'Call back today',
    detail:
      'Came in this morning and has not been contacted yet. Call back before end of day, then move to Contacted.',
  },
  {
    name: 'Priya Nair',
    service: 'Window cleaning — storefront',
    received: 'Yesterday',
    status: 'Contacted',
    next: 'Send estimate',
    detail:
      'Spoke yesterday and confirmed access from the front. Next step is to send a written estimate for the storefront windows.',
  },
  {
    name: 'Marcus Webb',
    service: 'Deck repair',
    received: 'Monday',
    status: 'Estimate sent',
    next: 'Follow up Friday',
    detail:
      'Estimate went out Monday for four boards plus a re-stain. Gone quiet — a low-pressure check-in is suggested for Friday.',
  },
  {
    name: 'Dana Ortiz',
    service: 'Fence repair',
    received: 'Last week',
    status: 'Scheduled',
    next: 'Confirm Thursday appointment',
    detail:
      'Booked for Thursday morning. Send a quick confirmation text the day before so nobody is surprised.',
  },
  {
    name: 'Sam Fuller',
    service: 'Pressure washing',
    received: 'Last week',
    status: 'Contacted',
    next: 'Waiting on photos',
    detail:
      'Asked for a couple of photos of the driveway to quote accurately. Waiting to hear back before sending a price.',
  },
]

const FILTERS: ('All' | LeadStatus)[] = [
  'All',
  'New',
  'Contacted',
  'Estimate sent',
  'Scheduled',
]

const INITIAL_TASKS = [
  { task: 'Call back new lead — Jamie Carter', due: 'Today', done: false },
  { task: 'Send estimate — storefront window cleaning', due: 'Today', done: false },
  { task: 'Confirm Thursday appointment — Dana Ortiz', due: 'Tomorrow', done: false },
  { task: 'Follow up after last week’s pressure washing', due: 'This week', done: true },
]

const OWNER_POINTS = [
  'Plain words — leads, estimates, jobs — instead of software terms.',
  'One screen shows what needs attention today, not forty menus.',
  'Updating a lead takes a tap, not a training course.',
  'If something takes more than a few seconds to understand, we simplify it.',
]

export default function SmallBusinessDashboardDemo() {
  const [filter, setFilter] = useState<'All' | LeadStatus>('All')
  const [selectedName, setSelectedName] = useState<string | null>(null)
  const [tasks, setTasks] = useState(INITIAL_TASKS)

  const visibleLeads = useMemo(
    () => (filter === 'All' ? LEADS : LEADS.filter((l) => l.status === filter)),
    [filter],
  )

  const selectedLead = LEADS.find((l) => l.name === selectedName) ?? null
  const doneCount = tasks.filter((t) => t.done).length

  const toggleTask = (index: number) =>
    setTasks((prev) =>
      prev.map((t, i) => (i === index ? { ...t, done: !t.done } : t)),
    )

  return (
    <>
      <PageHero
        eyebrow="Demo · Owner dashboard"
        title="A simple place to see leads, tasks, and follow-ups."
        subtitle="An interactive preview of the kind of dashboard we build for small business owners. Filter the leads, tick off tasks, and tap a lead to see its next step — one screen that answers: what needs my attention today?"
      >
        <StatusPill tone="info">Interactive demo</StatusPill>
        <StatusPill>Example data only</StatusPill>
        <StatusPill>Not a live system</StatusPill>
      </PageHero>

      {/* This week at a glance */}
      <Section>
        <SectionHeading
          eyebrow="At a glance"
          title="This week's numbers, without the spreadsheet."
          description="Four numbers tell an owner most of what they need to know. Everything below them explains where those numbers come from."
          align="center"
          className="mb-10"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((metric) => (
            <Card key={metric.label}>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {metric.label}
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-ink">
                {metric.value}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                {metric.caption}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Lead table */}
      <Section muted>
        <SectionHeading
          eyebrow="Leads"
          title="Every lead, its status, and its next step."
          description="Filter by status, then tap a lead to see what happens next. No lead sits in a text thread waiting to be remembered."
          align="center"
          className="mb-10"
        />

        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => {
            const active = f === filter
            return (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? 'border-brand-300 bg-brand-50 text-brand-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {f}
              </button>
            )
          })}
        </div>

        <Card padded={false} className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-6 py-4">
            <h3 className="text-base font-semibold text-ink">
              {filter === 'All' ? 'Recent leads' : `Leads · ${filter}`}
            </h3>
            <StatusPill>Example data</StatusPill>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th scope="col" className="px-6 py-3 font-semibold">Name</th>
                  <th scope="col" className="px-6 py-3 font-semibold">Service requested</th>
                  <th scope="col" className="px-6 py-3 font-semibold">Received</th>
                  <th scope="col" className="px-6 py-3 font-semibold">Status</th>
                  <th scope="col" className="px-6 py-3 font-semibold">Next step</th>
                </tr>
              </thead>
              <tbody>
                {visibleLeads.map((lead) => {
                  const selected = lead.name === selectedName
                  return (
                    <tr
                      key={lead.name}
                      className={`border-b border-slate-100 last:border-b-0 ${
                        selected ? 'bg-brand-50/50' : ''
                      }`}
                    >
                      <td className="px-6 py-3.5">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedName(selected ? null : lead.name)
                          }
                          aria-pressed={selected}
                          className="text-left font-semibold text-brand-700 hover:text-brand-800 hover:underline"
                        >
                          {lead.name}
                        </button>
                      </td>
                      <td className="px-6 py-3.5 text-slate-600">{lead.service}</td>
                      <td className="px-6 py-3.5 text-slate-600">{lead.received}</td>
                      <td className="px-6 py-3.5">
                        <StatusPill tone={STATUS_TONES[lead.status]}>
                          {lead.status}
                        </StatusPill>
                      </td>
                      <td className="px-6 py-3.5 text-slate-600">{lead.next}</td>
                    </tr>
                  )
                })}
                {visibleLeads.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-sm text-slate-500"
                    >
                      No leads in this status right now.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {selectedLead && (
          <Card className="mx-auto mt-6 max-w-2xl">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
                  Lead detail
                </p>
                <h3 className="mt-1 text-lg font-semibold text-ink">
                  {selectedLead.name}
                </h3>
                <p className="mt-0.5 text-sm text-slate-500">
                  {selectedLead.service} · received {selectedLead.received.toLowerCase()}
                </p>
              </div>
              <StatusPill tone={STATUS_TONES[selectedLead.status]}>
                {selectedLead.status}
              </StatusPill>
            </div>
            <p className="mt-4 rounded-xl bg-brand-50 px-4 py-3 text-sm leading-relaxed text-brand-800">
              <span className="font-semibold">Next step:</span> {selectedLead.next}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {selectedLead.detail}
            </p>
            <button
              type="button"
              onClick={() => setSelectedName(null)}
              className="mt-4 text-xs font-semibold text-slate-500 hover:text-ink"
            >
              Close detail
            </button>
          </Card>
        )}
      </Section>

      {/* Task list */}
      <Section>
        <SectionHeading
          eyebrow="Tasks"
          title="A short list of what to do next."
          description="The dashboard turns leads and jobs into plain to-dos, so nothing depends on the owner's memory. Tick one off — it updates right here in your browser."
          align="center"
          className="mb-10"
        />
        <Card className="mx-auto max-w-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <h3 className="text-base font-semibold text-ink">This week's tasks</h3>
            <StatusPill tone={doneCount === tasks.length ? 'success' : 'neutral'}>
              {doneCount} of {tasks.length} done
            </StatusPill>
          </div>
          <ul className="mt-4 space-y-1">
            {tasks.map((item, index) => (
              <li key={item.task}>
                <button
                  type="button"
                  onClick={() => toggleTask(index)}
                  aria-pressed={item.done}
                  className="flex w-full items-start gap-3 rounded-lg px-2 py-2 text-left hover:bg-slate-50"
                >
                  <span
                    aria-hidden
                    className={`mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full border ${
                      item.done
                        ? 'border-brand-600 bg-brand-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {item.done && <IconCheck className="h-3.5 w-3.5" />}
                  </span>
                  <span className="flex-1 text-sm leading-relaxed">
                    <span
                      className={
                        item.done
                          ? 'text-slate-400 line-through'
                          : 'text-slate-700'
                      }
                    >
                      {item.task}
                    </span>
                    <span className="ml-2 text-xs font-semibold text-slate-500">
                      {item.due}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      {/* Designed for owners */}
      <Section muted>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow="Who it's for"
            title="Designed for owners, not developers."
            description="If you can read a text message, you can use this. There is nothing to install, configure, or learn beyond what you see here."
          />
          <Card>
            <FeatureList items={OWNER_POINTS} />
          </Card>
        </div>
        <DemoDisclaimer className="mt-12" />
      </Section>

      <CTASection
        headline="Want one simple screen for your business?"
        text="Start with the short intake form and tell us how you keep track of things today. We'll suggest the simplest dashboard that would help."
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
