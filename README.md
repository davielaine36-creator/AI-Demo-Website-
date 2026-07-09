# Laine Industries — Website

Simple websites, CRM dashboards, and AI follow-up systems for small businesses.

A clean, mobile-first marketing site built with **Vite + React + TypeScript +
Tailwind CSS**. The intake and contact forms work out of the box using
copy-to-clipboard and email-draft fallbacks, and can post to an
[n8n](https://n8n.io) webhook when one is configured. The only backend is a
single serverless function powering the **Ask Laine AI chatbot** — see
[`docs/ask-lane-ai-chatbot.md`](docs/ask-lane-ai-chatbot.md).

---

## Tech stack

- [Vite](https://vitejs.dev/) — build tooling / dev server
- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/) — client-side routing
- [Tailwind CSS](https://tailwindcss.com/) — styling

## Project structure

```
api/
  ask-lane.ts      Serverless endpoint for the Ask Laine AI chatbot (Vercel Function)
src/
  components/      Reusable UI (Header, Footer, Button, Card, forms, etc.)
    form/          Form controls + shared result view
  pages/           One file per route (Home, Services, Intake, …)
  data/            Site config + content (services, demos, Ask Laine knowledge)
  lib/             Ask Laine retrieval + analytics layer (trackEvent / trackPageView)
  utils/           Form summary building + submission logic
  App.tsx          Routes
  main.tsx         App entry
  index.css        Tailwind layers + base styles
public/
  resources/       Place the intake PDF here (see its README)
  brand/           Brand mark source (laine-icon-source.png)
  favicon.ico, favicon-16.png, favicon-32.png, apple-touch-icon.png
  icon-192.png, icon-512.png, icon-maskable-512.png, site.webmanifest
```

---

## Getting started

Requires **Node 18+**.

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server (http://localhost:5173)
npm run dev

# 3. Type-check + production build (outputs to dist/)
npm run build

# 4. Preview the production build locally
npm run preview
```

---

## Environment variables

Copy `.env.example` to `.env` (or set these in Vercel → Settings → Environment
Variables). All client-exposed vars **must** be prefixed with `VITE_`.

| Variable                      | Required | Description                                                                 |
| ----------------------------- | -------- | --------------------------------------------------------------------------- |
| `VITE_CONTACT_EMAIL`          | No       | Email used for `mailto:` fallbacks. Defaults to `hello@laineindustries.co`. |
| `N8N_INTAKE_WEBHOOK_URL`      | No       | **Server-side only — never `VITE_`-prefixed.** If set, the `/api/intake` proxy forwards intake + contact submissions to this n8n webhook. |
| `ANTHROPIC_API_KEY`           | For live AI chat | **Server-side only — never `VITE_`-prefixed.** Powers the Ask Laine chatbot. Without it, Ask Laine falls back to the guided quick-start. |
| `ASK_LANE_MODEL`              | No       | Optional model override for Ask Laine (default `claude-opus-4-8`).           |

**Form behavior:**

- Submissions always `POST` (as JSON:
  `{ formType, submittedAt, summary, source, leadScore, leadStatus, data }`) to
  the same-origin proxy `/api/intake`, which forwards to `N8N_INTAKE_WEBHOOK_URL`
  server-side (the webhook URL is never exposed in the client bundle).
- If the webhook is unset **or the request fails**, the form gracefully falls
  back to a clean, copy-able summary plus a prefilled email draft — nothing is
  ever lost.

> We intentionally never hardcode a personal email in the codebase — set
> `VITE_CONTACT_EMAIL` instead.

---

## Intake experience

The site offers three ways for a prospect to share details — all frontend-only,
all using the same webhook / copy / email logic:

1. **Short intake form** (`/intake`) — a few key questions, fastest way to start.
2. **Full intake form** (`/full-intake`, also reachable at `/intake/full`) — the
   complete discovery questionnaire recreated as a clean, grouped web form (12
   sections). Only name, business, and email are required; everything else is
   optional. Not a fillable PDF — it's a real web form.
3. **Download Full Intake PDF** — offline / backup option (see below).

On submit, both forms build a clean formatted summary and:

- `POST` it to the `/api/intake` proxy, which forwards to
  `N8N_INTAKE_WEBHOOK_URL` when that server-side env var is set;
- otherwise (or if the webhook fails) fall back to **copy-to-clipboard** and a
  **prefilled email draft** to `VITE_CONTACT_EMAIL` (default
  `hello@laineindustries.co`). Nothing is ever lost.

## Adding the intake PDF

The Intake page links to `/resources/client-ai-systems-intake-questionnaire.pdf`.

1. Drop your PDF in `public/resources/`.
2. Name it exactly `client-ai-systems-intake-questionnaire.pdf`.

A starter copy is already included. See `public/resources/README.md` for details.
If the file is ever missing, the site still builds — only the download button 404s.

---

## Analytics

Privacy-conscious, cookieless analytics via **Vercel Web Analytics** plus a
small first-party event layer (CTA clicks, nav clicks, form funnel, etc.).
No cookies, no PII, no required environment variables.

See **[`ANALYTICS.md`](ANALYTICS.md)** for the full event list, where the code
lives, and how to verify it locally and on Vercel. Quick version: enable **Web
Analytics** in the Vercel project dashboard, then watch data land in the
**Analytics** tab. Locally, events log to the browser console.

---

## Deploying to Vercel

This is a static SPA — Vercel auto-detects Vite.

1. Push this repo to GitHub.
2. In Vercel, **Add New → Project** and import the repo.
3. Framework preset: **Vite** (Build command `npm run build`, output `dist`).
4. Add any environment variables (see above).
5. Deploy.

`vercel.json` includes an SPA rewrite so deep links (e.g. `/services`) resolve to
`index.html` and client-side routing works on refresh.

You can also deploy from the CLI:

```bash
npm i -g vercel
vercel        # preview deploy
vercel --prod # production deploy
```

---

## Roadmap / TODOs for future upgrades

These are marked with `TODO` comments in the code where relevant:

- [ ] Wire the **live n8n intake webhook** (set the server-only
      `N8N_INTAKE_WEBHOOK_URL`; the `/api/intake` proxy forwards to it server-side,
      so no client-side CORS config is needed).
- [ ] **CRM dashboard integration** — connect real lead storage / dashboard.
- [ ] **Demo embeds** — replace "Demo coming soon" placeholders with live links
      or embeds (`src/data/demos.ts`).
- [ ] **Case study updates** — add measured before/after results as pilots
      complete (`src/data/caseStudies.ts`).
- [x] **Analytics** — privacy-friendly analytics + event layer added. See
      [`ANALYTICS.md`](ANALYTICS.md). (V2 ideas listed there.)
- [ ] **Scheduling link** — add a booking/scheduling link (e.g. Cal.com) to
      Contact / How It Works.
- [ ] **OG image** — add a `1200×630` social preview image and reference it in
      `index.html`.

---

Built with care — useful first, fancy second.
