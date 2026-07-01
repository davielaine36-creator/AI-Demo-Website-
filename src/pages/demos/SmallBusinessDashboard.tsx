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

const LEADS: {
  name: string
  service: string
  received: string
  status: LeadStatus
  next: string
}[] = [
  {
    name: 'Jamie Carter',
    service: 'Gutter cleaning',
    received: 'Today',
    status: 'New',
    next: 'Call back today',
  },
  {
    name: 'Priya Nair',
    service: 'Window cleaning — storefront',
    received: 'Yesterday',
    status: 'Contacted',
    next: 'Send estimate',
  },
  {
    name: 'Marcus Webb',
    service: 'Deck repair',
    received: 'Monday',
    status: 'Estimate sent',
    next: 'Follow up Friday',
  },
  {
    name: 'Dana Ortiz',
    service: 'Fence repair',
    received: 'Last week',
    status: 'Scheduled',
    next: 'Confirm Thursday appointment',
  },
  {
    name: 'Sam Fuller',
    service: 'Pressure washing',
    received: 'Last week',
    status: 'Contacted',
    next: 'Waiting on photos',
  },
]

const TASKS = [
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
  return (
    <>
      <PageHero
        eyebrow="Demo · Owner dashboard"
        title="A simple place to see leads, tasks, and follow-ups."
        subtitle="A static preview of the kind of dashboard we build for small business owners — one screen that answers the question: what needs my attention today?"
      >
        <StatusPill tone="info">Static demo</StatusPill>
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
          description="No lead sits in a text thread waiting to be remembered. Each one has a status and a clear next move."
          align="center"
          className="mb-10"
        />
        <Card padded={false} className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-6 py-4">
            <h3 className="text-base font-semibold text-ink">Recent leads</h3>
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
                {LEADS.map((lead) => (
                  <tr
                    key={lead.name}
                    className="border-b border-slate-100 last:border-b-0"
                  >
                    <td className="px-6 py-3.5 font-semibold text-ink">
                      {lead.name}
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
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Section>

      {/* Task list */}
      <Section>
        <SectionHeading
          eyebrow="Tasks"
          title="A short list of what to do next."
          description="The dashboard turns leads and jobs into plain to-dos, so nothing depends on the owner's memory."
          align="center"
          className="mb-10"
        />
        <Card className="mx-auto max-w-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <h3 className="text-base font-semibold text-ink">
              This week's tasks
            </h3>
            <StatusPill>Example data</StatusPill>
          </div>
          <ul className="mt-4 space-y-3">
            {TASKS.map((item) => (
              <li key={item.task} className="flex items-start gap-3">
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
                      item.done ? 'text-slate-400 line-through' : 'text-slate-700'
                    }
                  >
                    {item.task}
                  </span>
                  <span className="ml-2 text-xs font-semibold text-slate-500">
                    {item.due}
                  </span>
                </span>
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
