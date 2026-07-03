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
| `src/components/Analytics.tsx` | `AnalyticsProvider`: mounts Vercel `<Analytics />` and fires `page_view` on every route change. |
| `src/App.tsx` | Mounts `<AnalyticsProvider />` once, inside the Router. |
| `src/components/Button.tsx` | Auto-emits `cta_click` / `external_link_click`. Opt out with `trackAs={false}`. |
| `src/components/Header.tsx`, `Footer.tsx` | `nav_click` on navigation links. |
| `src/components/ServiceCard.tsx` | `service_click` on service cards. |
| `src/components/ContactForm.tsx`, `IntakeForm.tsx`, `FullIntakeForm.tsx` | Form funnel events. |

## Events tracked

| Event | When it fires | Key properties |
| --- | --- | --- |
| `page_view` | Every route change (SPA nav + first load) | `path`, `referrer`, `utm_*`, `device_type`, `language` |
| `cta_click` | Any `Button` rendered as a link/button is clicked | `text`, `destination`, `section` |
| `nav_click` | Header / mobile-menu / footer navigation link | `text`, `destination`, `section` |
| `service_click` | A service card is clicked (first click per view) | `text`, `service_id`, `section` |
| `external_link_click` | External anchor (`mailto:`, `tel:`, off-site `http`) | `text`, `destination`, `section` |
| `contact_form_start` | First interaction with a form (once) | `form` (`contact` \| `intake` \| `full-intake`) |
| `contact_form_submit` | Submit attempt that passes validation | `form` |
| `contact_form_submit_success` | Submission confirmed sent (webhook `200`) | `form`, `channel` |

All events also carry `path` automatically.

> **Note on form success:** `contact_form_submit_success` only fires when the
> optional n8n webhook (`VITE_N8N_INTAKE_WEBHOOK_URL`) is configured and returns
> OK. Without a webhook the forms fall back to copy/email, which the browser
> cannot confirm, so success is not detectable in that mode.

## Environment variables

**None are required for analytics.** Vercel Web Analytics is zero-config once
enabled in the Vercel dashboard — no key, no `.env` entry.

The only related (and optional) variable is the pre-existing
`VITE_N8N_INTAKE_WEBHOOK_URL`, which — when set — makes
`contact_form_submit_success` detectable. See `.env.example`.

## Verify it works locally

1. `npm install`
2. `npm run dev`
3. Open the site, then open your browser devtools **Console**.
4. Click around — you should see lines like:

   ```
   [analytics] page_view { path: '/', device_type: 'desktop', ... }
   [analytics] cta_click { text: 'Start Intake', destination: '/intake', ... }
   [analytics] nav_click { text: 'Services', destination: '/services', section: 'header' }
   ```

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
- Track scroll depth / section visibility (IntersectionObserver) for "what
  sections do people look at."
- Track AskLane concierge opens/messages and demo interactions.
- Server-side conversion events from the n8n webhook for ad-block-resistant
  lead tracking.
- A typed event registry (union of event names + property shapes) to prevent
  drift as events grow.
