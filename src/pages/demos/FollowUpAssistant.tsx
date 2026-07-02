import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../../components/PageHero'
import { Section, SectionHeading } from '../../components/Section'
import { Card } from '../../components/Card'
import { CTASection } from '../../components/CTASection'
import { DemoDisclaimer } from '../../components/demo/DemoDisclaimer'
import { StatusPill } from '../../components/demo/StatusPill'
import { CTA } from '../../data/site'

interface Draft {
  title: string
  timing: string
  message: string
}

interface Scenario {
  id: string
  label: string
  customer: string
  request: string
  waiting: string
  drafts: Draft[]
}

// Every scenario, customer, and draft below is fictional and pre-written.
// There is no AI call here — the "drafts" are curated example text.
const SCENARIOS: Scenario[] = [
  {
    id: 'fence-no-reply',
    label: 'Fence repair · no reply (2 days)',
    customer: 'Jordan Ellis',
    request: 'Fence repair quote — back yard, two leaning posts',
    waiting: 'Waiting 2 days',
    drafts: [
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
    ],
  },
  {
    id: 'gutter-new',
    label: 'Gutter cleaning · brand-new inquiry',
    customer: 'Priya Nair',
    request: 'Gutter cleaning — single-story, storefront',
    waiting: 'Came in 20 minutes ago',
    drafts: [
      {
        title: 'Fast acknowledgement',
        timing: 'Suggested right away',
        message:
          "Hi Priya — thanks for the gutter cleaning request for your storefront. I can usually get single-story jobs scheduled within the week. Is the storefront easy to access from the front, or is there a back alley? — Sam",
      },
      {
        title: 'Quick quote + scheduling',
        timing: 'Suggested once you have the details',
        message:
          "Hi Priya — for a single-story storefront that's typically in the $X–$Y range depending on buildup and access. If that sounds fine, I have Wednesday or Friday morning open this week. Want me to hold one? — Sam",
      },
    ],
  },
  {
    id: 'deck-estimate-sent',
    label: 'Deck repair · estimate sent, gone quiet',
    customer: 'Marcus Webb',
    request: 'Deck repair — replace 4 boards, re-stain',
    waiting: 'Estimate sent 5 days ago',
    drafts: [
      {
        title: 'Low-pressure check-in',
        timing: 'Suggested 4–6 days after the estimate',
        message:
          "Hi Marcus — just circling back on the deck estimate. No pressure at all — I know these decisions take time. If it helps, I'm happy to walk through the line items or adjust the scope. — Sam",
      },
      {
        title: 'Offer a smaller first step',
        timing: 'Suggested if budget might be the holdup',
        message:
          "Hi Marcus — if the full deck repair is more than you want to take on right now, we could start with just the four boards and leave the re-stain for later. Want me to put together a smaller option? — Sam",
      },
    ],
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
  const [scenarioId, setScenarioId] = useState<string>(SCENARIOS[0].id)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const scenario = SCENARIOS.find((s) => s.id === scenarioId) ?? SCENARIOS[0]

  const copyDraft = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(key)
      window.setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 2000)
    } catch {
      // Clipboard may be unavailable (e.g. insecure context) — fail quietly;
      // this is a demo and nothing depends on the copy succeeding.
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Demo · Follow-up assistant"
        title="AI-assisted follow-up, without letting AI message your customers."
        subtitle="An interactive preview: pick a lead scenario and see the follow-up drafts an assistant might suggest. Drafts only — you review, edit, and send. Nothing is generated live and nothing is sent."
      >
        <StatusPill tone="info">Interactive demo</StatusPill>
        <StatusPill>Mock drafts — no live AI</StatusPill>
        <StatusPill>No messages are sent</StatusPill>
      </PageHero>

      {/* Pick a scenario */}
      <Section>
        <SectionHeading
          eyebrow="Step 1 — Pick a scenario"
          title="Choose a lead that's waiting on a reply."
          description="These are common ways small businesses lose work: someone asks for a quote, the day gets busy, and the follow-up never happens. Pick one to see suggested drafts."
          align="center"
          className="mb-10"
        />
        <div className="mx-auto mb-8 flex max-w-3xl flex-wrap justify-center gap-2">
          {SCENARIOS.map((s) => {
            const active = s.id === scenarioId
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setScenarioId(s.id)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'border-brand-300 bg-brand-50 text-brand-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {s.label}
              </button>
            )
          })}
        </div>
        <Card className="mx-auto max-w-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-ink">Open quote request</h3>
            <div className="flex flex-wrap gap-2">
              <StatusPill tone="warn">{scenario.waiting}</StatusPill>
              <StatusPill tone="info">Follow-up suggested</StatusPill>
            </div>
          </div>
          <dl className="mt-5 space-y-3 border-t border-slate-100 pt-5">
            <div className="flex gap-4 text-sm">
              <dt className="w-24 flex-shrink-0 font-semibold text-slate-500">
                Customer
              </dt>
              <dd className="leading-relaxed text-slate-700">
                {scenario.customer}{' '}
                <span className="text-slate-400">(example customer)</span>
              </dd>
            </div>
            <div className="flex gap-4 text-sm">
              <dt className="w-24 flex-shrink-0 font-semibold text-slate-500">
                Request
              </dt>
              <dd className="leading-relaxed text-slate-700">
                {scenario.request}
              </dd>
            </div>
          </dl>
          <p className="mt-5 rounded-xl bg-brand-50 px-4 py-3 text-sm leading-relaxed text-brand-800">
            <span className="font-semibold">System suggestion:</span> here are a
            few drafts — copy the one that fits, edit it wherever you already
            message customers, and send it yourself. Or ignore them all.
          </p>
        </Card>
      </Section>

      {/* The drafts */}
      <Section muted>
        <SectionHeading
          eyebrow="Step 2 — The drafts"
          title="AI writes the first draft. You have the final say."
          description="Each draft is a starting point in a plain, friendly voice. Copy one to use it — then read it, make it yours, and send it when you're ready."
          align="center"
          className="mb-10"
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {scenario.drafts.map((draft, i) => {
            const key = `${scenario.id}-${i}`
            const copied = copiedKey === key
            return (
              <Card key={key} className="flex h-full flex-col">
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
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() => copyDraft(key, draft.message)}
                    aria-live="polite"
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                      copied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-ink text-white hover:bg-ink-soft'
                    }`}
                  >
                    {copied ? 'Copied ✓' : 'Copy draft'}
                  </button>
                </div>
              </Card>
            )
          })}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
          Copy places the draft on your clipboard so you can paste it wherever
          you already talk to customers. Nothing is generated live and nothing
          is sent from this page.
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
          </Link>{' '}
          ·{' '}
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
