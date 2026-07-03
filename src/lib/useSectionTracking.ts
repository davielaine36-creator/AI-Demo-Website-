import { useEffect, useRef } from 'react'
import { trackEvent, getDeviceInfo } from './analytics'

// Section views and scroll-depth milestones are deduplicated so we never spam
// the event stream (Vercel counts custom events toward usage). Section views
// are keyed by `path|name`, so each section fires at most once per path per
// session (and different pages that reuse a name — e.g. `hero` — never collide).
const seenSections = new Set<string>()

/** Friendly page label derived from a path (`/` → `home`). */
function pageLabel(path: string): string {
  if (path === '/' || path === '') return 'home'
  return path.replace(/^\//, '')
}

// Fine-grained thresholds so the observer callback fires repeatedly as a
// section scrolls through — needed to catch sections taller than the viewport.
const THRESHOLDS = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]

/**
 * Track when a meaningful section scrolls into view. Attach the returned ref to
 * the section element. Fires `section_view` once per section (per path, per
 * session) when either ~50% of the section is visible OR the section fills at
 * least half the viewport (so sections taller than the screen still register).
 *
 * No-op when `name` is falsy, so callers can pass an optional prop through.
 */
export function useSectionView<T extends Element = HTMLElement>(name?: string) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !name) return
    if (typeof IntersectionObserver === 'undefined') return

    const key = `${window.location.pathname}|${name}`
    if (seenSections.has(key)) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const vh = window.innerHeight || 1
          const rect = entry.boundingClientRect
          const visiblePx = Math.min(rect.bottom, vh) - Math.max(rect.top, 0)
          const viewportCoverage = visiblePx / vh
          if (entry.intersectionRatio >= 0.5 || viewportCoverage >= 0.5) {
            observer.disconnect()
            if (seenSections.has(key)) return
            seenSections.add(key)
            trackEvent('section_view', {
              section: name,
              path: window.location.pathname,
              page: pageLabel(window.location.pathname),
              timestamp: new Date().toISOString(),
              ...getDeviceInfo(),
            })
            return
          }
        }
      },
      { threshold: THRESHOLDS },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [name])

  return ref
}

/**
 * Fire `scroll_depth` at 25/50/75/100% milestones, once each per page view.
 * Listener is rAF-throttled and only fires on real scrolling (short pages that
 * never scroll produce no events). Call from a per-route effect; the returned
 * cleanup removes the listener. A fresh call re-arms the milestones, so each
 * route change gets its own set of scroll-depth events.
 */
export function initScrollDepth(path: string): () => void {
  if (typeof window === 'undefined') return () => {}

  const page = pageLabel(path)
  const milestones = [25, 50, 75, 100]
  const fired = new Set<number>()
  let ticking = false

  const check = () => {
    ticking = false
    const doc = document.documentElement
    const scrollable = doc.scrollHeight - window.innerHeight
    if (scrollable <= 0) return
    const pct = Math.min(100, Math.round((window.scrollY / scrollable) * 100))
    for (const m of milestones) {
      if (pct >= m && !fired.has(m)) {
        fired.add(m)
        trackEvent('scroll_depth', { depth: m, path, page })
      }
    }
  }

  const onScroll = () => {
    if (ticking) return
    ticking = true
    window.requestAnimationFrame(check)
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}
