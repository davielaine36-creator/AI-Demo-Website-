import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from './Button'
import { IconSparkles, IconClose, IconArrowRight, IconCheck } from './Icons'

/*
 * "Ask Lane" — a lightweight, guided website concierge.
 *
 * This is intentionally NOT a real AI chatbot. It asks a few simple questions
 * and maps the answers to a recommended starting point. No backend, no API
 * keys, no data leaves the browser.
 *
 * TODO (future upgrade — after launch):
 *   - Replace this guided assistant with a real AI chatbot.
 *   - Use site content / FAQ / service data (src/data/*) as the knowledge base.
 *   - Add a backend / serverless API route so no AI API keys are exposed
 *     client-side.
 *   - Add cost limits, safety rules, and lead-capture logging.
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

export function AskLane() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [businessType, setBusinessType] = useState('')
  const [messy, setMessy] = useState<MessyKey | ''>('')
  const [improve, setImprove] = useState('')
  const [timing, setTiming] = useState('')
  const location = useLocation()

  // Close (and reset) whenever the route changes — e.g. after a result CTA nav.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Lock background scroll + allow Esc to close while open.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const reset = () => {
    setStep(0)
    setBusinessType('')
    setMessy('')
    setImprove('')
    setTiming('')
  }

  const openAssistant = () => {
    reset()
    setOpen(true)
  }

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const recommendation = messy ? RECOMMENDATIONS[messy] : null

  return (
    <>
      {/* Floating launcher */}
      <button
        type="button"
        onClick={openAssistant}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white shadow-lift transition-transform hover:scale-[1.03] active:scale-95 sm:bottom-6 sm:right-6"
      >
        <IconSparkles className="h-5 w-5 text-brand-300" aria-hidden />
        Ask Lane
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Ask Lane — guided assistant"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />

          {/* Panel */}
          <div className="relative flex max-h-[88vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-lift sm:max-w-md sm:rounded-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <IconSparkles className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">Ask Lane</p>
                  <p className="text-xs text-slate-500">A quick guide to your next step</p>
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
                  <p className="text-xs text-slate-500">Optional — a rough idea is fine.</p>
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
                          <IconArrowRight className="h-4 w-4 text-slate-400" aria-hidden />
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
                  <p className="text-xs text-slate-500">Optional — in your own words.</p>
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
                          <IconArrowRight className="h-4 w-4 text-slate-400" aria-hidden />
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
                    onClick={reset}
                    className="text-xs font-medium text-slate-500 hover:text-ink"
                  >
                    Start over
                  </button>

                  <p className="rounded-xl bg-slate-50 px-3 py-2.5 text-xs leading-relaxed text-slate-500">
                    This guide is not a live AI chat yet. It helps point you
                    toward the right starting place.
                  </p>
                </div>
              )}
            </div>

            {/* Footer nav (question steps only) */}
            {step < TOTAL_STEPS && (
              <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className="text-sm font-medium text-slate-500 hover:text-ink disabled:opacity-40"
                >
                  Back
                </button>
                {/* Free-text steps (Q1, Q3) advance with Next; choice steps auto-advance. */}
                {(step === 0 || step === 2) && (
                  <Button onClick={next} size="sm">
                    Next
                    <IconArrowRight className="h-4 w-4" aria-hidden />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
