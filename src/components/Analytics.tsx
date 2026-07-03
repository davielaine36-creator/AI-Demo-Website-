import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import { trackPageView } from '../lib/analytics'
import { initScrollDepth } from '../lib/useSectionTracking'

/**
 * On every SPA route change: fire a first-party `page_view` and (re)arm
 * scroll-depth milestone tracking. Kept separate from the Vercel <Analytics/>
 * component (which records its own automatic pageviews) so our custom event
 * stream stays complete even if we swap analytics providers later.
 */
function usePageViews() {
  const location = useLocation()
  useEffect(() => {
    trackPageView(location.pathname + location.search)
    const cleanup = initScrollDepth(location.pathname)
    return cleanup
  }, [location.pathname, location.search])
}

/**
 * Site-wide analytics wiring. Mount once, inside the Router.
 * Renders Vercel Web Analytics (cookieless) and tracks route changes.
 */
export function AnalyticsProvider() {
  usePageViews()
  return <VercelAnalytics />
}
