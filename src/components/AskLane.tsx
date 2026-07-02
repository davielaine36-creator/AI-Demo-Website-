import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from './Button'
import { IconSparkles, IconClose, IconArrowRight, IconCheck } from './Icons'
import type { KnowledgeLink } from '../data/askLaneKnowledge'

/*
 * "Ask Laine" — hybrid website concierge.
 *
 * Two modes:
 *   - Chat: a real AI assistant. Messages go to /api/ask-lane (a serverless
 *     function) which retrieves curated knowledge (src/data/askLaneKnowledge)
 *     and asks Claude to answer in Laine's voice. No AI keys in the browser.
 *   - Guided: the original 4-question quick-start, kept as a safe fallback
 *     that works entirely in the browser (and when live chat isn't
 *     configured).
 */

type MessyKey =
  | 'Website'
  | 'Leads'
  | 'Follow-up'
  | 'Customer tracking'
  | 'Scheduling'
  | 'Shopify / store operations'
  | 'Not sure yet'

const MESSY_OPTIONS: MessyKey[] = [
  'Website',
  'Leads',
  'Follow-up',
  'Customer tracking',
  'Scheduling',
  'Shopify / store operations',
  'Not sure yet',
]

const TIMING_OPTIONS = ['Just exploring', 'Soon', 'This month', 'Urgent']

interface Recommendation {
  title: string
  detail: string
}

// Result logic: map the "what feels messy" answer to a recommended starting point.
const RECOMMENDATIONS: Record<MessyKey, Recommendation> = {
  Website: {
    title: 'Start with a Website Starter System.',
    detail:
      'A clean, mobile-friendly site that explains what you do and gives customers a clear way to reach out.',
  },
  Leads: {
    title: 'Start with lead capture + a CRM dashboard.',
    detail:
      'Capture every new lead in one place, get alerted quickly, and stop letting opportunities slip.',
  },
  'Follow-up': {
    title: 'Start with AI-assisted follow-up drafts and reminders.',
    detail:
      'Draft follow-up messages automatically and get reminders so nobody falls through the cracks.',
  },
  'Customer tracking': {
    title: 'Start with a CRM / lead dashboard.',
    detail:
      'One organized place for names, jobs, notes, statuses, and follow-ups — instead of texts and memory.',
  },
  Scheduling: {
    title: 'Start with alerts, reminders, and scheduling support.',
    detail:
      'Automated reminders and alerts so the right next step happens at the right time.',
  },
  'Shopify / store operations': {
    title: 'Start with Shopify operations support.',
    detail:
      'Organize products, track customer issues, and tidy up day-to-day store operations.',
  },
  'Not sure yet': {
    title: 'Start with the short intake form.',
    detail:
      "Not sure yet is normal. Answer a few quick questions and we'll recommend the simplest place to start.",
  },
}

const TOTAL_STEPS = 4 // Q1–Q4, then the result view.

// ── Chat mode ──────────────────────────────────────────────────────────────

interface ChatEntry {
  role: 'user' | 'assistant'
  content: string
  links?: KnowledgeLink[]
}

const INTRO_MESSAGE: ChatEntry = {
  role: 'assistant',
  content:
    "Hi — I'm Ask Laine. Ask me anything about what we build, pricing, hosting, or where to start. Or tap a question below.",
}

const QUICK_QUESTIONS = [
  'What does Laine Industries do?',
  'Do I need a website or a system?',
  'How much does this usually cost?',
  'Do I need to manage GitHub or hosting?',
  'Can AI follow up with my leads?',
  'What happens if I stop monthly support?',
  'What should I start with?',
]

// How much recent conversation to send with each question.
const HISTORY_LIMIT = 8

interface AskLaneResponse {
  reply?: string
  links?: KnowledgeLink[]
  fallback?: boolean
}

export function AskLane() {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<'chat' | 'guided'>('chat')

  // Chat state.
  const [chat, setChat] = useState<ChatEntry[]>([INTRO_MESSAGE])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [chatError, setChatError] = useState(false)
  const [aiUnavailable, setAiUnavailable] = useState(false)
  const transcriptRef = useRef<HTMLDivElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  // Bumped on every send and on reset; a resolving fetch whose id is stale is
  // ignored, so a superseded or reset conversation never absorbs its reply.
  const requestIdRef = useRef(0)

  // Guided-flow state.
  const [step, setStep] = useState(0)
  const [businessType, setBusinessType] = useState('')
  const [messy, setMessy] = useState<MessyKey | ''>('')
  const [improve, setImprove] = useState('')
  const [timing, setTiming] = useState('')

  const location = useLocation()

  // Close whenever the route changes — e.g. after a result CTA nav.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // While open: lock background scroll, close on Esc, trap Tab within the
  // panel, and restore focus to the launcher on close.
  useEffect(() => {
    if (!open) return
    const launcher = launcherRef.current
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key !== 'Tab') return
      const panel = panelRef.current
      if (!panel) return
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement as HTMLElement | null
      if (e.shiftKey) {
        if (active === first || !panel.contains(active)) {
          last.focus()
          e.preventDefault()
        }
      } else if (active === last || !panel.contains(active)) {
        first.focus()
        e.preventDefault()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      launcher?.focus()
    }
  }, [open])

  // Abort any in-flight request if the widget unmounts.
  useEffect(() => () => abortRef.current?.abort(), [])

  // Keep the newest chat message in view.
  useEffect(() => {
    const el = transcriptRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [chat, sending, chatError])

  const resetGuided = () => {
    setStep(0)
    setBusinessType('')
    setMessy('')
    setImprove('')
    setTiming('')
  }

  const openAssistant = () => {
    // Discard any in-flight request so its reply can't land in the new session.
    abortRef.current?.abort()
    requestIdRef.current += 1
    resetGuided()
    setChat([INTRO_MESSAGE])
    setInput('')
    setChatError(false)
    setSending(false)
    setMode('chat')
    setOpen(true)
  }

  const sendQuestion = async (raw: string) => {
    const text = raw.trim()
    if (!text || text.length > 1000 || sending) return

    const nextChat: ChatEntry[] = [...chat, { role: 'user', content: text }]
    setChat(nextChat)
    setInput('')
    setChatError(false)
    setSending(true)
    // Move focus off a quick-question button (it unmounts) onto the input.
    inputRef.current?.focus()

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    const reqId = (requestIdRef.current += 1)
    const isStale = () => requestIdRef.current !== reqId

    try {
      // Skip the static intro bubble; send only real conversation turns, and
      // drop any leading assistant turn so the API sees a user-first sequence.
      const payload = nextChat
        .slice(1)
        .slice(-HISTORY_LIMIT)
        .map(({ role, content }) => ({ role, content }))
      while (payload.length > 0 && payload[0].role === 'assistant') payload.shift()

      const res = await fetch('/api/ask-lane', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payload }),
        signal: controller.signal,
      })
      if (!res.ok) throw new Error(`ask-lane status ${res.status}`)

      const data = (await res.json()) as AskLaneResponse
      if (typeof data.reply !== 'string') throw new Error('malformed reply')
      if (isStale()) return // conversation was reset or superseded — ignore.

      setChat((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply as string, links: data.links },
      ])
      if (data.fallback) setAiUnavailable(true)
    } catch {
      if (controller.signal.aborted || isStale()) return
      setChatError(true)
    } finally {
      if (!isStale()) setSending(false)
    }
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    void sendQuestion(input)
  }

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const recommendation = messy ? RECOMMENDATIONS[messy] : null
  const showQuickQuestions = chat.length === 1 && !sending

  return (
    <>
      {/* Floating launcher */}
      <button
        ref={launcherRef}
        type="button"
        onClick={openAssistant}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white shadow-lift transition-transform hover:scale-[1.03] active:scale-95 sm:bottom-6 sm:right-6"
      >
        <IconSparkles className="h-5 w-5 text-brand-300" aria-hidden />
        Ask Laine
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Ask Laine — website assistant"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />

          {/* Panel */}
          <div
            ref={panelRef}
            className="relative flex max-h-[88dvh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-lift sm:max-w-md sm:rounded-2xl"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <IconSparkles className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">Ask Laine</p>
                  <p className="text-xs text-slate-500">
                    {mode === 'chat'
                      ? 'AI assistant — services, pricing, next steps'
                      : 'A quick guide to your next step'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-50 hover:text-ink"
              >
                <IconClose className="h-5 w-5" />
              </button>
            </div>

            {/* ── Chat mode ── */}
            {mode === 'chat' && (
              <>
                <div
                  ref={transcriptRef}
                  role="log"
                  aria-label="Ask Laine conversation"
                  className="min-h-0 flex-1 space-y-3 overflow-y-auto px-5 py-4 sm:min-h-[16rem]"
                >
                  {chat.map((entry, i) =>
                    entry.role === 'user' ? (
                      <div key={i} className="flex justify-end">
                        <p className="max-w-[85%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-sm leading-relaxed text-white">
                          {entry.content}
                        </p>
                      </div>
                    ) : (
                      <div key={i} className="flex flex-col items-start gap-2">
                        <p className="max-w-[85%] whitespace-pre-line rounded-2xl rounded-bl-md bg-slate-100 px-4 py-2.5 text-sm leading-relaxed text-ink">
                          {entry.content}
                        </p>
                        {entry.links && entry.links.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {entry.links.map((link) => (
                              <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setOpen(false)}
                                className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 hover:border-brand-300 hover:bg-brand-100"
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ),
                  )}

                  {sending && (
                    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-slate-100 px-4 py-3 w-fit">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:0ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                      <span className="sr-only">Ask Laine is thinking</span>
                    </div>
                  )}

                  {chatError && (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
                      Sorry — something went wrong answering that. You can try
                      again, or head straight to the{' '}
                      <Link
                        to="/intake"
                        onClick={() => setOpen(false)}
                        className="font-semibold underline"
                      >
                        short intake
                      </Link>{' '}
                      or{' '}
                      <Link
                        to="/contact"
                        onClick={() => setOpen(false)}
                        className="font-semibold underline"
                      >
                        contact page
                      </Link>{' '}
                      and we'll follow up personally.
                    </div>
                  )}

                  {aiUnavailable && (
                    <div className="rounded-xl bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-600">
                      Live AI chat isn't configured yet.{' '}
                      <button
                        type="button"
                        onClick={() => setMode('guided')}
                        className="font-semibold text-brand-700 hover:text-brand-800"
                      >
                        Use the guided quick-start instead →
                      </button>
                    </div>
                  )}

                  {showQuickQuestions && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {QUICK_QUESTIONS.map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => void sendQuestion(q)}
                          className="rounded-full border border-slate-200 px-3 py-1.5 text-left text-xs text-slate-600 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-ink"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Composer */}
                <div className="shrink-0 border-t border-slate-100 px-5 py-3">
                  <form onSubmit={onSubmit} className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      autoFocus
                      maxLength={1000}
                      placeholder="Ask a question…"
                      aria-label="Ask Laine a question"
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-ink placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                    />
                    <Button type="submit" size="sm" disabled={sending || !input.trim()}>
                      Send
                    </Button>
                  </form>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <p className="text-[11px] leading-snug text-slate-500">
                      AI assistant — answers can contain mistakes. Please do not
                      send passwords, payment information, API keys, or
                      sensitive customer data.
                    </p>
                    <button
                      type="button"
                      onClick={() => setMode('guided')}
                      className="shrink-0 text-[11px] font-semibold text-slate-500 hover:text-ink"
                    >
                      Guided quick-start
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* ── Guided mode ── */}
            {mode === 'guided' && (
              <>
                {/* Progress */}
                {step < TOTAL_STEPS && (
                  <div className="flex gap-1.5 px-5 pt-4" aria-hidden>
                    {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 flex-1 rounded-full ${
                          i <= step ? 'bg-brand-500' : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-5 py-6">
                  {/* Q1 */}
                  {step === 0 && (
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold text-ink">
                        What kind of business do you run?
                      </h3>
                      <input
                        type="text"
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        autoFocus
                        placeholder="e.g. window cleaning, training, Shopify store"
                        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-ink placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') next()
                        }}
                      />
                      <p className="text-xs text-slate-500">
                        Optional — a rough idea is fine.
                      </p>
                    </div>
                  )}

                  {/* Q2 */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold text-ink">
                        What feels messy right now?
                      </h3>
                      <div className="grid gap-2">
                        {MESSY_OPTIONS.map((opt) => {
                          const active = messy === opt
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                setMessy(opt)
                                next()
                              }}
                              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                                active
                                  ? 'border-brand-300 bg-brand-50 text-ink'
                                  : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              {opt}
                              <IconArrowRight
                                className="h-4 w-4 text-slate-400"
                                aria-hidden
                              />
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Q3 */}
                  {step === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold text-ink">
                        What do you want to improve first?
                      </h3>
                      <textarea
                        value={improve}
                        onChange={(e) => setImprove(e.target.value)}
                        autoFocus
                        rows={3}
                        placeholder="e.g. respond to leads faster, look more professional, stop losing info"
                        className="w-full resize-y rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-ink placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                      />
                      <p className="text-xs text-slate-500">
                        Optional — in your own words.
                      </p>
                    </div>
                  )}

                  {/* Q4 */}
                  {step === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-base font-semibold text-ink">
                        How soon are you looking to fix it?
                      </h3>
                      <div className="grid gap-2">
                        {TIMING_OPTIONS.map((opt) => {
                          const active = timing === opt
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                setTiming(opt)
                                next()
                              }}
                              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                                active
                                  ? 'border-brand-300 bg-brand-50 text-ink'
                                  : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              {opt}
                              <IconArrowRight
                                className="h-4 w-4 text-slate-400"
                                aria-hidden
                              />
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Result */}
                  {step === TOTAL_STEPS && recommendation && (
                    <div className="space-y-5">
                      <div className="flex items-start gap-3">
                        <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                          <IconCheck className="h-5 w-5" aria-hidden />
                        </span>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
                            Recommended starting point
                          </p>
                          <h3 className="mt-1 text-base font-semibold text-ink">
                            {recommendation.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-600">
                        {recommendation.detail}
                      </p>

                      <div className="flex flex-col gap-2">
                        <Button to="/intake" className="w-full">
                          Start Short Intake
                        </Button>
                        <Button to="/full-intake" variant="secondary" className="w-full">
                          Fill Full Intake
                        </Button>
                        <Button to="/contact" variant="ghost" className="w-full">
                          Contact Us
                        </Button>
                      </div>

                      <button
                        type="button"
                        onClick={resetGuided}
                        className="text-xs font-medium text-slate-500 hover:text-ink"
                      >
                        Start over
                      </button>

                      <p className="rounded-xl bg-slate-50 px-3 py-2.5 text-xs leading-relaxed text-slate-500">
                        Have a more specific question? Switch back to chat and
                        ask it in your own words.
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer nav */}
                <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
                  {step < TOTAL_STEPS ? (
                    <button
                      type="button"
                      onClick={back}
                      disabled={step === 0}
                      className="text-sm font-medium text-slate-500 hover:text-ink disabled:opacity-40"
                    >
                      Back
                    </button>
                  ) : (
                    <span />
                  )}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setMode('chat')}
                      className="text-sm font-medium text-slate-500 hover:text-ink"
                    >
                      Back to chat
                    </button>
                    {/* Free-text steps (Q1, Q3) advance with Next; choice steps auto-advance. */}
                    {(step === 0 || step === 2) && (
                      <Button onClick={next} size="sm">
                        Next
                        <IconArrowRight className="h-4 w-4" aria-hidden />
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
