# Analytics (V1)

Lightweight, privacy-conscious analytics for **laineindustries.co**. The goal
of V1 is a clean, working baseline we can grow later — not a full analytics
platform.

## What was added

- **[Vercel Web Analytics](https://vercel.com/docs/analytics)** for automatic,
  cookieless pageview tracking. Mounted via `<Analytics />` from
  `@vercel/analytics/react`.
- **A small first-party event layer** (`src/lib/analytics.ts`) that sends named
  custom events (CTA clicks, nav clicks, form funnel, etc.) through the same
  Vercel Analytics pipe, plus a dev-console logger so you can watch events
  locally.

### Privacy posture

- **No cookies.** Vercel Web Analytics is cookieless and does not use
  cross-site identifiers.
- **No PII.** We never send names, emails, or message contents — only anonymous
  interaction signals (event name, page path, button text, destination).
- Long strings are truncated and empty values dropped before an event is sent.
- Device info is coarse (viewport bucket + language only) — no fingerprinting.

## Where the code lives

| File | Purpose |
| --- | --- |
| `src/lib/analytics.ts` | Core: `trackEvent`, `trackPageView`, context helpers (UTM / referrer / device). Provider-agnostic — swap sinks in `dispatch()`. |
| `src/lib/useFormTracking.ts` | `useFormTracking(form)` hook → `trackStart` / `trackSubmit` / `trackSuccess` for form funnels. |
| `src/lib/useSectionTracking.ts` | `useSectionView(name)` (IntersectionObserver → `section_view`) + `initScrollDepth(path)` (`scroll_depth` milestones). |
| `src/components/Analytics.tsx` | `AnalyticsProvider`: mounts Vercel `<Analytics />`, fires `page_view`, and arms scroll-depth on every route change. |
| `src/components/Section.tsx`, `PageHero.tsx`, `CTASection.tsx` | Accept a `trackName` prop that wires `section_view` (defaults: `PageHero`→`hero`, `CTASection`→`cta`). |
| `src/App.tsx` | Mounts `<AnalyticsProvider />` once, inside the Router. |
| `src/components/Button.tsx` | Auto-emits `cta_click` / `external_link_click`. Opt out with `trackAs={false}`. |
| `src/components/Header.tsx`, `Footer.tsx` | `nav_click` on navigation links. |
| `src/components/ServiceCard.tsx` | `service_click` on service cards. |
| `src/components/ContactForm.tsx`, `IntakeForm.tsx`, `FullIntakeForm.tsx` | Form funnel events. |

## Events tracked

| Event | When it fires | Key properties |
| --- | --- | --- |
| `page_view` | Every route change (SPA nav + first load) | `path`, `referrer`, `utm_*`, `device_type`, `language` |
| `section_view` | A tracked section scrolls into view (deduped — see below) | `section`, `path`, `page`, `timestamp`, `device_type` |
| `scroll_depth` | Page scrolled past a 25 / 50 / 75 / 100% milestone (once each per page view) | `depth`, `path`, `page` |
| `cta_click` | Any `Button` rendered as a link/button is clicked | `text`, `destination`, `section` |
| `request_demo_click` | Primary "Request a Demo" CTA (hero + niche pages) | `text`, `destination` |
| `see_demos_click` | "See What We Build" CTA | `text`, `destination` |
| `nav_click` | Header / mobile-menu / footer navigation link | `text`, `destination`, `section` |
| `service_click` | A service card is clicked (first click per view) | `text`, `service_id`, `section` |
| `service_page_view` | `/services` mounts | — |
| `lead_system_page_view` | `/lead-systems` mounts | — |
| `contractor_page_view` | `/contractors` mounts | — |
| `demo_page_view` | `/demos` mounts | — |
| `external_link_click` | External anchor (`mailto:`, `tel:`, off-site `http`) | `text`, `destination`, `section` |
| `intake_form_start` / `_submit` / `_submit_success` | Short intake funnel | `form`, `channel` (success) |
| `full_intake_form_start` / `_submit` / `_submit_success` | Full intake funnel | `form`, `channel` (success) |
| `contact_form_start` / `_submit` / `_submit_success` | Contact funnel | `form`, `channel` (success) |

All events also carry `path` automatically. Form events are namespaced by form
type (`intake_form_*`, `full_intake_form_*`, `contact_form_*`) so the marketing
funnel is legible per form. Marketing attribution (UTM, referrer, landing page)
and heuristic lead scores are attached to the **form-submission payload only** —
never to analytics events, which stay PII-free.

> **Note on form success:** `*_form_submit_success` only fires when the optional
> n8n webhook (server-only `N8N_INTAKE_WEBHOOK_URL`, reached via the `/api/intake`
> proxy) is configured and returns OK. Without a webhook the forms fall back to
> copy/email, which the browser cannot confirm, so success is not detectable in
> that mode.

### Section views: which sections & how they're deduplicated

`section_view` fires via an `IntersectionObserver` when a section is
"meaningfully" on screen — either **≥ 50% of the section is visible**, or the
section **fills ≥ 50% of the viewport** (the second rule covers sections taller
than the screen, where the ratio can never reach 50%).

**Deduplication:** each section fires **at most once per section per path, per
session**. The observer disconnects itself after firing, and a module-level
`Set` keyed by `` `${path}|${name}` `` guards against re-firing (including React
StrictMode's double-invoke in dev). Reusing a name like `hero` on different
pages does not collide because the path is part of the key.
`scroll_depth` milestones are likewise deduped and are **re-armed on each route
change**, so every page view gets its own set of milestone events.

Tracked section names:

| Page | `section` values |
| --- | --- |
| Home (`/`) | `hero`, `problem`, `services`, `audience`, `cta` |
| Services (`/services`) | `hero`, `services`, `starter-builds`, `cta` |
| How It Works (`/how-it-works`) | `hero`, `process`, `cta` |
| Case Studies (`/case-studies`) | `hero`, `case-studies`, `cta` |
| Contact (`/contact`) | `hero`, `contact` |
| Other pages using `PageHero` / `CTASection` | `hero`, `cta` |

## Environment variables

**None are required for analytics.** Vercel Web Analytics is zero-config once
enabled in the Vercel dashboard — no key, no `.env` entry.

The only related (and optional) variable is the server-only
`N8N_INTAKE_WEBHOOK_URL`, which — when set — makes
`contact_form_submit_success` detectable. See `.env.example`.

## Verify it works locally

1. `npm install`
2. `npm run dev`
3. Open the site, then open your browser devtools **Console**.
4. Click around — you should see lines like:

   ```
   [analytics] page_view { path: '/', device_type: 'desktop', ... }
   [analytics] section_view { section: 'hero', page: 'home', timestamp: ... }
   [analytics] scroll_depth { depth: 25, page: 'home' }
   [analytics] section_view { section: 'services', page: 'home', ... }
   [analytics] cta_click { text: 'Start Intake', destination: '/intake', ... }
   [analytics] nav_click { text: 'Services', destination: '/services', section: 'header' }
   ```

   Scroll down a page to see `section_view` (once per section) and `scroll_depth`
   (at 25 / 50 / 75 / 100%) — each fires only once, not on every scroll tick.

   (Locally there is no Vercel endpoint, so events are logged to the console
   instead of being sent. That's expected.)

## Verify it works after deploying on Vercel

1. In the Vercel dashboard, open the project → **Analytics** tab → enable
   **Web Analytics** if it isn't already.
2. Deploy the branch/PR.
3. Visit the deployed URL and click around (CTAs, nav, submit a form).
4. In devtools **Network**, confirm requests to `/_vercel/insights/*` (a
   `view` request on load and `event` requests on custom events).
5. Data appears in the Vercel **Analytics** dashboard within a minute or two.
   Custom events show under the **Events** section there.

## Where to check the metrics

**Vercel dashboard → your project → Analytics.**
- *Pages / Visitors / Referrers / Devices* → automatic pageview data.
- *Events* → the custom events above (`cta_click`, `contact_form_submit`, …).

## V1 limitations

- Custom events rely on Vercel Web Analytics being enabled; free-tier plans cap
  event volume and retention.
- No server-side events — everything is client-side, so ad-blockers can drop
  some events.
- Form-success tracking needs the n8n webhook (see note above).
- Coarse device bucketing only; no session stitching or funnel visualization
  beyond what Vercel provides.

## Recommended V2 improvements

- Add a second, self-hosted/privacy sink (e.g. Plausible or PostHog) behind an
  env var — `dispatch()` in `analytics.ts` is already the single swap point.
- Track AskLane concierge opens/messages and demo interactions.
- Server-side conversion events from the n8n webhook for ad-block-resistant
  lead tracking.
- A typed event registry (union of event names + property shapes) to prevent
  drift as events grow.
