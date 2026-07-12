# CLAUDE.md

Guidance for Claude Code (and humans) working in this repository.

## What this is

**Laine Industries — Website**: the public marketing site for Laine Industries
("Simple websites, CRM dashboards, and AI follow-up systems for small
businesses"). A clean, mobile-first, SEO-conscious SPA whose job is to explain
the offer, show demos, and capture qualified leads through intake/contact forms.

It is a **frontend-first** site: everything works with **zero configuration**.
The intake and contact forms fall back to copy-to-clipboard + a prefilled email
draft when no backend is wired, and there are exactly **two serverless
functions** (`api/`) — the Ask Laine AI chatbot and an intake proxy. Keep it
that way: don't add a heavy backend where a graceful fallback already works.

> This is the outward-facing marketing site. The autonomous back-office that
> finds leads, sends outreach, and delivers projects lives in the separate
> **laine-industries-factory-hq** repo. This repo is just the storefront.

## Commands

```bash
npm install         # install deps (Node 18+)
npm run dev         # Vite dev server → http://localhost:5173
npm run build       # tsc -b (typecheck all projects) + vite build → dist/
npm run preview     # serve the production build locally
npm run lint        # tsc -b --noEmit (type-check only; no ESLint configured)
```

There is no separate typecheck or test script — **`npm run build` is the gate**:
it runs `tsc -b` across every tsconfig project before bundling, so a build
failure is your type error. Run it before committing anything.

## Stack

- **Vite** — build tooling / dev server (SPA, output to `dist/`)
- **React 18** + **TypeScript** (strict)
- **React Router v6** — client-side routing (`src/App.tsx` is the route table)
- **Tailwind CSS** — styling
- **@anthropic-ai/sdk** — used only inside the `api/ask-lane.ts` function
- **@vercel/analytics** — cookieless Web Analytics

TypeScript is split into project references (`tsconfig.json` → `app`, `node`,
`api`) so the browser app and the serverless functions type-check under their
own configs. The `api/` functions are compiled as ESM (`"type": "module"` in
`package.json`), so relative imports into `src/` **must use explicit `.js`
extensions** at runtime (see the imports in `api/ask-lane.ts`).

## Architecture map

```
api/
  ask-lane.ts      Serverless: the Ask Laine AI chatbot (Anthropic Messages API)
  intake.ts        Serverless: intake/contact proxy → forwards to n8n webhook
src/
  App.tsx          Route table (all pages) + site-wide chrome
  main.tsx         App entry
  index.css        Tailwind layers + base styles
  components/      Reusable UI (Header, Footer, Button, Card, forms, AskLane, …)
    form/          Shared form controls + result view
    demo/          Demo-page chrome (DemoDisclaimer, StatusPill)
  pages/           One file per route (Home, Services, Intake, Demos, …)
    demos/         Static demo showcase pages (example data only — nothing live)
  data/            Site config + content: site.ts, services.ts, demos.ts,
                   caseStudies.ts, askLaneKnowledge.ts (Ask Laine's knowledge base)
  lib/             askLaneRetrieval.ts (keyword retrieval), analytics.ts,
                   leadContext.ts, useFormTracking.ts, useSectionTracking.ts
  utils/           formSubmit.ts (builds the summary + submits the payload)
public/            favicons, manifest, robots.txt, sitemap.xml, og-image, and
                   resources/ (the downloadable intake PDF)
```

Adding a page = a component in `src/pages/` + a `<Route>` in `src/App.tsx`
(add nav links in `src/components/Header.tsx`/`Footer.tsx` as needed). Content
that changes often (services, demos, case studies, Ask Laine knowledge) is
data-driven — edit the files in `src/data/`, not the page components.

## The two serverless functions

Both live in `api/`, run as Vercel Functions, keep their secrets **server-side
only**, and degrade gracefully so the site never breaks without them.

- **`POST /api/ask-lane`** — the Ask Laine chatbot. Retrieves relevant chunks
  from `src/data/askLaneKnowledge.ts` via deterministic keyword scoring
  (`src/lib/askLaneRetrieval.ts` — no embeddings, no external vector store),
  then calls the Anthropic Messages API. Needs `ANTHROPIC_API_KEY`; without it
  the widget falls back to a guided quick-start (`fallback: true`). Has built-in
  per-browser usage/spam limits on an HttpOnly cookie. User content is never
  logged. Default model `claude-opus-4-8`, override with `ASK_LANE_MODEL`.
- **`POST /api/intake`** — a same-origin proxy that forwards intake/contact
  submissions to an n8n webhook (`N8N_INTAKE_WEBHOOK_URL`). The webhook URL is
  kept off the client so it can't be scraped/spammed. Without the env var it
  returns `configured: false` and the client falls back to copy/email.

## Forms & intake

The site offers three ways for a prospect to share details — the short intake
(`/intake`), the full 12-section intake (`/full-intake`, aliased `/intake/full`),
and a downloadable PDF. All forms share one path (`src/utils/formSubmit.ts`):
build a clean formatted summary, `POST` it to `/api/intake`, and **fall back to
copy-to-clipboard + a prefilled email draft** if the webhook is unset or fails —
nothing a prospect types is ever lost.

## Conventions

- **Client-exposed env vars must be prefixed `VITE_`.** Anything without the
  prefix (`ANTHROPIC_API_KEY`, `N8N_INTAKE_WEBHOOK_URL`, `ASK_LANE_MODEL`) is
  server-only and must never be bundled into the client. See `.env.example`.
- **Never hardcode a personal email** — use `VITE_CONTACT_EMAIL` (defaults to
  `hello@laineindustries.co`).
- Every feature must have a **zero-config fallback**. The site builds and works
  with no env vars set; a missing backend degrades, never breaks (a missing
  intake PDF just 404s the download button, etc.).
- Content lives in `src/data/`; keep pages thin and data-driven.
- Analytics is cookieless and PII-free (Vercel Web Analytics + a small
  first-party event layer in `src/lib/analytics.ts`). See `ANALYTICS.md`.

## Deployment (Vercel)

Static SPA; Vercel auto-detects Vite. `vercel.json` sets the framework, output
`dist/`, function `maxDuration` limits, and an SPA rewrite so deep links resolve
to `index.html` on refresh. Set env vars in Vercel → Settings → Environment
Variables for the features you're enabling (all optional).

## Docs

- `README.md` — the fuller getting-started + env/deploy guide.
- `ANALYTICS.md` — the full analytics event list and how to verify it.
- `docs/` — sales & operations playbooks (offer sheet, outreach kit, discovery
  script, proposal template, client handoff, etc.) plus `ask-lane-ai-chatbot.md`
  which documents the chatbot function in depth.
