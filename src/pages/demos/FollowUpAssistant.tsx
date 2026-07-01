import { Link } from 'react-router-dom'
import { PageHero } from '../../components/PageHero'
import { Section, SectionHeading } from '../../components/Section'
import { Card } from '../../components/Card'
import { CTASection } from '../../components/CTASection'
import { DemoDisclaimer } from '../../components/demo/DemoDisclaimer'
import { StatusPill } from '../../components/demo/StatusPill'
import { CTA } from '../../data/site'

// Example scenario only — the customer and owner are fictional.
const SCENARIO = [
  { label: 'Customer', value: 'Jordan Ellis (example customer)' },
  { label: 'Request', value: 'Fence repair quote — back yard, two leaning posts' },
  { label: 'Came in', value: 'Tuesday, 8:42 AM' },
  { label: 'Status', value: 'No reply sent yet' },
]

const DRAFTS = [
  {
    title: 'Friendly first reply',
    timing: 'Suggested for the same day',
    message:
      "Hi Jordan — thanks for reaching out about your fence repair. I'd like to take a quick look at the two posts so I can give you an accurate quote. Would tomorrow morning or Thursday afternoon work for a short visit? — Sam",
  },
  {
    title: 'Next-day follow-up',
    timing: 'Suggested if there is no response',
    message:
      "Hi Jordan — just checking in on your fence repair request. If it's easier, a photo of the leaning posts is usually enough for me to give you a rough price range the same day. No rush if plans have changed. — Sam",
  },
  {
    title: 'Estimate reminder',
    timing: 'Suggested after the estimate goes out',
    message:
      "Hi Jordan — wanted to make sure the estimate I sent over came through okay. Happy to answer questions or adjust the scope if you'd like. And if now isn't the right time, that's completely fine too. — Sam",
  },
]

const WHY_DRAFTS = [
  {
    title: 'Your name is on every message.',
    text: 'Customers think they are texting you — because they are. A person should decide what goes out under your name.',
  },
  {
    title: 'AI writes a strong first draft, not a reliable final word.',
    text: 'It gets tone, pricing, and small details wrong just often enough to matter. A quick human read catches that.',
  },
  {
    title: 'Editing is faster than writing.',
    text: 'Reviewing and sending a draft should take under a minute. The real time savings come from never starting from a blank page.',
  },
  {
    title: 'Trust is earned in stages.',
    text: 'Once the drafts consistently sound like you, automating the simple, low-risk ones can be a later conversation — it is never the default.',
  },
]

export default function FollowUpAssistantDemo() {
  return (
    <>
      <PageHero
        eyebrow="Demo · Follow-up assistant"
        title="AI-assisted follow-up, without letting AI message your customers."
        subtitle="A static preview of how AI can draft follow-up messages for a business owner to review, edit, and send. Drafts only — a human approves everything."
      >
        <StatusPill tone="info">Static demo</StatusPill>
        <StatusPill>Example data only</StatusPill>
        <StatusPill>No messages are sent</StatusPill>
      </PageHero>

      {/* The scenario */}
      <Section>
        <SectionHeading
          eyebrow="The scenario"
          title="A quote request is waiting on a reply."
          description="It's the most common way small businesses lose work: someone asks for a quote, the day gets busy, and the reply never happens."
          align="center"
          className="mb-10"
        />
        <Card className="mx-auto max-w-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-ink">
              Open quote request
            </h3>
            <div className="flex flex-wrap gap-2">
              <StatusPill tone="warn">Waiting 2 days</StatusPill>
              <StatusPill tone="info">Follow-up suggested</StatusPill>
            </div>
          </div>
          <dl className="mt-5 space-y-3 border-t border-slate-100 pt-5">
            {SCENARIO.map((row) => (
              <div key={row.label} className="flex gap-4 text-sm">
                <dt className="w-24 flex-shrink-0 font-semibold text-slate-500">
                  {row.label}
                </dt>
                <dd className="leading-relaxed text-slate-700">{row.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 rounded-xl bg-brand-50 px-4 py-3 text-sm leading-relaxed text-brand-800">
            <span className="font-semibold">System suggestion:</span> it has
            been two days with no reply. Here are three drafts — review, edit,
            and send the one that fits, or ignore them all.
          </p>
        </Card>
      </Section>

      {/* The drafts */}
      <Section muted>
        <SectionHeading
          eyebrow="The drafts"
          title="AI writes the first draft. The owner has the final say."
          description="Each draft is a starting point, written in a plain, friendly voice. Nothing goes out until the owner reads it and hits send."
          align="center"
          className="mb-10"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {DRAFTS.map((draft) => (
            <Card key={draft.title} className="flex h-full flex-col">
              <div className="flex flex-wrap gap-2">
                <StatusPill>Draft only</StatusPill>
                <StatusPill tone="warn">Human review required</StatusPill>
                <StatusPill>Not auto-sent</StatusPill>
              </div>
              <h3 className="mt-4 text-base font-semibold text-ink">
                {draft.title}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {draft.timing}
              </p>
              <p className="mt-4 flex-1 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
                {draft.message}
              </p>
              <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  disabled
                  className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-500 disabled:cursor-not-allowed"
                >
                  Edit draft
                </button>
                <button
                  type="button"
                  disabled
                  className="rounded-full bg-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-500 disabled:cursor-not-allowed"
                >
                  Approve &amp; send
                </button>
              </div>
            </Card>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
          The buttons are part of the illustration — nothing can be sent from
          this page. In a real build, the owner reviews and sends from wherever
          they already work.
        </p>
      </Section>

      {/* Why drafts first */}
      <Section>
        <SectionHeading
          eyebrow="Our approach"
          title="Why we start with drafts instead of automatic messages."
          description="Plenty of tools will happily message your customers for you. We think that's the wrong place to start."
          align="center"
          className="mb-10"
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {WHY_DRAFTS.map((item) => (
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
        headline="Want follow-ups that stop slipping through the cracks?"
        text="Start with the short intake form and tell us where follow-up breaks down today. We'll suggest a simple, owner-approved way to fix it."
        buttonLabel={CTA.intake.label}
        buttonTo={CTA.intake.to}
        secondaryLabel="How we help small businesses"
        secondaryTo="/for-small-businesses"
      />
      <div className="container-content pb-16 text-center">
        <p className="text-sm text-slate-500">
          Prefer to just ask a question?{' '}
          <Link
            to="/contact"
            className="font-semibold text-brand-700 hover:text-brand-800"
          >
            Contact us
          </Link>
          {' '}·{' '}
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
