// Lightweight, privacy-conscious analytics layer for laineindustries.co.
//
// Design goals (V1):
//   - No cookies, no cross-site tracking, no PII. We never send names, emails,
//     or message contents — only anonymous interaction signals.
//   - Provider-agnostic: events fan out to whichever sinks are configured.
//     Today that's Vercel Web Analytics (cookieless) + a dev console logger.
//     Swapping/adding a provider later means editing only `dispatch()` below.
//   - Simple surface: `trackEvent(name, properties)` and `trackPageView(path)`.
//
// Vercel custom events require the site to be deployed on Vercel with Web
// Analytics enabled (Project → Analytics). Locally there is no Vercel endpoint,
// so events are logged to the console instead — see ANALYTICS.md.

import { track as vercelTrack } from '@vercel/analytics'

/** Flat, primitive-only properties (Vercel custom events accept these). */
export type AnalyticsProperties = Record<
  string,
  string | number | boolean | null | undefined
>

const isBrowser = typeof window !== 'undefined'
const isDev = import.meta.env.DEV

/**
 * Coerce arbitrary props into the flat primitive shape Vercel expects,
 * dropping empty/undefined values and truncating long strings so we never
 * accidentally ship a message body or other bulky/PII-ish content.
 */
function clean(
  props?: AnalyticsProperties,
): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {}
  if (!props) return out
  for (const [key, value] of Object.entries(props)) {
    if (value === null || value === undefined || value === '') continue
    out[key] = typeof value === 'string' ? value.slice(0, 200) : value
  }
  return out
}

/** Send a cleaned event to every configured sink. */
function dispatch(name: string, props: Record<string, string | number | boolean>) {
  if (isDev) {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', name, props)
  }
  try {
    vercelTrack(name, props)
  } catch {
    // Analytics must never break the app. Swallow any sink error.
  }
}

/**
 * Track a named interaction event.
 *
 * @example trackEvent('cta_click', { text: 'Start Intake', destination: '/intake' })
 */
export function trackEvent(name: string, properties?: AnalyticsProperties): void {
  if (!isBrowser) return
  const enriched: AnalyticsProperties = {
    path: window.location.pathname,
    ...properties,
  }
  dispatch(name, clean(enriched))
}

/** Read UTM parameters from the current URL, if present. */
export function getUtmParams(): AnalyticsProperties {
  if (!isBrowser) return {}
  const params = new URLSearchParams(window.location.search)
  const utm: AnalyticsProperties = {}
  for (const key of [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
  ] as const) {
    const value = params.get(key)
    if (value) utm[key] = value
  }
  return utm
}

/** The referring URL for this visit, if the browser exposes one. */
export function getReferrer(): string | undefined {
  if (!isBrowser) return undefined
  return document.referrer || undefined
}

/**
 * Coarse, non-fingerprinting device/browser hints. We deliberately avoid the
 * full user-agent string and only bucket by viewport so this stays privacy
 * friendly. Vercel Analytics already captures richer device data server-side.
 */
export function getDeviceInfo(): AnalyticsProperties {
  if (!isBrowser) return {}
  const width = window.innerWidth
  const device_type = width < 640 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop'
  return {
    device_type,
    language: navigator.language,
  }
}

/**
 * Track a page view / route change. Enriches the first-party `page_view`
 * event with referrer, UTM tags, and coarse device info where available.
 * (Vercel Analytics also records its own automatic pageview via <Analytics/>.)
 */
export function trackPageView(path: string): void {
  if (!isBrowser) return
  trackEvent('page_view', {
    path,
    referrer: getReferrer(),
    ...getUtmParams(),
    ...getDeviceInfo(),
  })
}
