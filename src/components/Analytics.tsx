import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'
import { trackPageView } from '../lib/analytics'

/**
 * Fires a first-party `page_view` event on every SPA route change.
 * Kept separate from the Vercel <Analytics/> component (which records its
 * own automatic pageviews) so our custom event stream stays complete even
 * if we swap analytics providers later.
 */
function usePageViews() {
  const location = useLocation()
  useEffect(() => {
    trackPageView(location.pathname + location.search)
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
