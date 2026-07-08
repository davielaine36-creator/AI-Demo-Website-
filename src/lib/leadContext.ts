// Lead context + lead scoring.
//
// Two concerns live here, both used only inside the form-submission payload —
// NEVER in analytics events (analytics stays PII-free):
//
//   1. getLeadSource(): non-PII marketing attribution (UTM tags, referrer,
//      first-touch landing page, timestamp, form type). These help David see
//      where a lead came from once submissions are routed to n8n/CRM.
//   2. computeLeadScore(): a simple heuristic score so leads can be triaged
//      (New / Needs Review / Qualified ...) without reading every field.

import { getUtmParams, getReferrer } from './analytics'

const LANDING_KEY = 'li_landing_page'
const LANDING_REF_KEY = 'li_landing_referrer'

/**
 * Record the first page + referrer of the session (first-touch attribution).
 * Safe to call repeatedly — it only writes once per session.
 */
export function captureFirstTouch(): void {
  if (typeof window === 'undefined') return
  try {
    if (!sessionStorage.getItem(LANDING_KEY)) {
      sessionStorage.setItem(
        LANDING_KEY,
        window.location.pathname + window.location.search,
      )
      sessionStorage.setItem(LANDING_REF_KEY, document.referrer || '')
    }
  } catch {
    // sessionStorage can throw in private modes — attribution is best-effort.
  }
}

/** Hidden source/attribution fields to attach to a form payload. */
export function getLeadSource(formType: string): Record<string, string> {
  if (typeof window === 'undefined') return { form_type: formType }
  let landing = ''
  let landingReferrer = ''
  try {
    landing = sessionStorage.getItem(LANDING_KEY) || ''
    landingReferrer = sessionStorage.getItem(LANDING_REF_KEY) || ''
  } catch {
    // ignore
  }

  const utm = getUtmParams()
  const source: Record<string, string> = {
    form_type: formType,
    submitted_at: new Date().toISOString(),
    landing_page: landing || window.location.pathname,
    referrer: landingReferrer || getReferrer() || '',
  }
  for (const key of [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
  ] as const) {
    const v = utm[key]
    if (typeof v === 'string' && v) source[key] = v
  }
  return source
}

// ---------------------------------------------------------------------------
// Lead scoring
// ---------------------------------------------------------------------------

/** Normalized inputs the scorer understands (all optional / best-effort). */
export interface LeadScoreInput {
  name?: string
  business?: string
  email?: string
  phone?: string
  website?: string
  businessType?: string
  /** Free-text pain point(s). */
  painPoint?: string
  /** Selected "what do you need" options. */
  needs?: string[]
  /** Budget comfort range label. */
  budget?: string
  /** Timeline / urgency / readiness label. */
  timeline?: string
}

const QUALIFYING_INDUSTRIES = [
  'contractor',
  'remodel',
  'roof',
  'hvac',
  'window',
  'construction',
  'home service',
  'home services',
  'training',
  'security',
  'requalification',
  'plumb',
  'electric',
  'landscap',
  'cleaning',
  'local',
]

const QUALIFYING_NEEDS = [
  'lead',
  'crm',
  'follow-up',
  'follow up',
  'customer intake',
  'website',
]

const STRONG_BUDGETS = ['mid-range', 'larger', 'prefer to discuss', 'complete']
const STRONG_TIMELINES = ['ready', 'urgent', 'high', 'this month', 'soon']

function has(text: string | undefined, needles: string[]): boolean {
  if (!text) return false
  const t = text.toLowerCase()
  return needles.some((n) => t.includes(n))
}

/**
 * Compute a coarse lead score. Higher = more qualified. This is a heuristic to
 * help triage, not a gate — every real submission still reaches David.
 */
export function computeLeadScore(input: LeadScoreInput): number {
  let score = 0

  // Missing basics reads as spam / not-actionable.
  const missingBasics =
    !input.name?.trim() || !input.email?.trim() || !input.business?.trim()
  if (missingBasics) score -= 50

  if (input.business?.trim()) score += 10
  if (input.website?.trim()) score += 10
  if (input.phone?.trim()) score += 10
  if (has(input.businessType, QUALIFYING_INDUSTRIES)) score += 15
  if (input.painPoint && input.painPoint.trim().length >= 12) score += 15
  if (input.needs && input.needs.some((n) => has(n, QUALIFYING_NEEDS)))
    score += 15
  if (has(input.budget, STRONG_BUDGETS)) score += 10
  if (has(input.timeline, STRONG_TIMELINES)) score += 15

  return score
}

/** Map a numeric score to a suggested triage status (for docs/future CRM). */
export function leadStatusFromScore(score: number): string {
  if (score < 0) return 'Spam'
  if (score < 20) return 'Needs Review'
  if (score < 50) return 'New'
  return 'Qualified'
}
