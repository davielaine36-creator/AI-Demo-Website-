# n8n Website Intake → Factory HQ (integration)

**Status:** reconstructed & ready to import — **not yet live** (webhook not yet
built in the paid n8n account; `N8N_INTAKE_WEBHOOK_URL` not yet set).
**Last verified against source:** 2026-07-12.

This is the authoritative document for the inbound-intake integration that
carries a Laine Industries website submission into Factory HQ as a warm-inbound
opportunity. The prior n8n workflow was **deleted when the old n8n trial account
expired**; this rebuilds it from the two code endpoints that already exist on
both ends.

It covers **inbound intake capture only**. It is *not* involved in the Ask Laine
chatbot (`ANTHROPIC_API_KEY` → `/api/ask-lane`), lead discovery, cold sourcing,
audits, scoring, demo generation, outreach, billing, e-sign, or project starts.
**Do not add Anthropic to this workflow** — nothing in the current code requires it.

## Architecture

```
Laine Industries website form (contact / short intake / full intake)
        │  browser POST (same-origin)
        ▼
AI-Demo-Website  POST /api/intake          (Vercel serverless proxy)
        │  reads server-only N8N_INTAKE_WEBHOOK_URL, forwards the JSON payload
        ▼
n8n workflow "Laine Industries — Website Intake → Factory HQ"
        │  validate → normalize form type → map to Factory contract
        │  POST with x-radar-secret (Header Auth credential)
        ▼
Factory HQ  POST /api/radar/inbound/website-intake   (secret-gated, 201)
        │  processWebsiteIntake() — DB writes only
        ▼
Supabase (service-role, RLS)
  · manual_opportunities   → source_channel=website, stage=warm_inbound
  · opportunity_activities → raw payload + intake_analysis
  · factory_events         → website_intake_received (learning loop)
  · owner_alerts           → "New website intake: …"
        ▼
Owner review in /ops/first-10  — nothing is ever sent back to the submitter.
```

### Repository roles

| Repo | Role in this integration | Key files |
|------|--------------------------|-----------|
| `davielaine36-creator/AI-Demo-Website-` | Entry point + proxy + fallback. Holds `N8N_INTAKE_WEBHOOK_URL`. | `api/intake.ts`, `src/utils/formSubmit.ts`, the 3 form components, `src/data/site.ts` |
| *(n8n)* | The middle: normalize + map + auth + POST. | `automation/n8n/laine-industries-website-intake-to-factory-hq.json` (in this repo) |
| `davielaine36-creator/laine-industries-factory-hq` | System of record. Receiver + analysis + owner alert. Holds `RADAR_INBOUND_SECRET`. | `src/app/api/radar/inbound/website-intake/route.ts`, `src/lib/radar/first10/website-intake.ts`, `src/lib/radar/auth.ts` |

## The n8n workflow

**Name:** `Laine Industries — Website Intake → Factory HQ`
**Webhook path (production):** `/webhook/laine-industries-website-intake`
**Export:** `automation/n8n/laine-industries-website-intake-to-factory-hq.json`

### Nodes

| # | Node | Type | Purpose |
|---|------|------|---------|
| 1 | **Receive Website Intake** | Webhook (POST, `responseNode`) | Receives the payload forwarded by `/api/intake`. Returns controlled JSON via the Respond nodes. |
| 2 | **Validate & Map to Factory** | Code | Validates the payload, normalizes the form type, and builds the exact Factory body. Rejects only malformed/empty submissions (missing `business_name`, oversized). Emits `{ valid, formType, dedupe_key, factoryBody }` or `{ valid:false, error:'invalid_submission' }`. No secrets. |
| 3 | **Valid Submission?** | IF (`{{ $json.valid }}`) | Routes valid → Factory; invalid → validation response. |
| 4 | **Send to Factory HQ** | HTTP Request (POST) | POSTs `factoryBody` to the Factory receiver with `x-radar-secret` (Header Auth credential). 10s timeout, **no automatic retries**, `onError: continueErrorOutput`. |
| 5 | **Respond: Success** | Respond to Webhook (200) | `{"ok":true}` on Factory 2xx (201). |
| 6 | **Respond: Factory Unavailable** | Respond to Webhook (502) | `{"ok":false,"error":"factory_unavailable"}` on Factory 401/400/5xx/timeout/network error. |
| 7 | **Respond: Invalid Submission** | Respond to Webhook (400) | `{"ok":false,"error":"invalid_submission"}` on malformed payload. |

## Authentication

- **n8n → Factory:** header `x-radar-secret: <RADAR_INBOUND_SECRET>`, stored in an
  n8n **Header Auth** credential named `Factory Inbound Secret`. The Factory
  `authorizeInbound()` also accepts `Authorization: Bearer <secret>` or `?secret=`;
  the header form is used here so the secret never appears in a URL or log.
- The secret is **never** in the workflow JSON, node parameters, workflow name,
  GitHub, or any webhook response.
- **Website → n8n:** the webhook URL itself is the capability. It is held only in
  the server-only `N8N_INTAKE_WEBHOOK_URL` env var on the website; the browser
  never sees it (it POSTs same-origin to `/api/intake`).

## Payload mapping

The website proxy forwards this shape (built in `src/utils/formSubmit.ts`):

```jsonc
{ "formType": "...", "submittedAt": "...", "summary": "...",
  "source": { "landing_page": "...", "referrer": "...", "utm_*": "..." },
  "leadScore": 0, "leadStatus": "...", "data": { /* form-specific fields */ } }
```

Only the fields below are forwarded to Factory HQ (its
`WebsiteIntakeSubmission` interface). `leadScore`, `leadStatus`, `submittedAt`,
and the raw `source` object are **not** sent downstream (unknown/unnecessary).
`business_name` is the only required field; everything else is left `null` when
absent — never invented.

| Factory field | `contact` | `intake` (short) | `full-intake` |
|---------------|-----------|------------------|---------------|
| `business_name` **(required)** | `data.business` | `data.business` | `data.business` |
| `contact_name` | `data.name` | `data.name` | `data.name` |
| `email` | `data.email` | `data.email` | `data.email` |
| `phone` | — | `data.phone` | `data.phone` |
| `website` | — | `data.website` | `data.website` |
| `niche` | — | `data.businessType` | `data.businessType` |
| `city` | — | `data.serviceArea` | `data.serviceArea` |
| `problem` | `data.message` | `data.messyThings` ‖ `data.valuable` | `data.topPriority` ‖ `data.websiteNotWorking` ‖ `data.stopDoingManually` ‖ `data.highestValueOutcome` |
| `leads_per_week` | — | — | — *(no current form asks; stays null)* |
| `message` | full `summary` | full `summary` | full `summary` *(≤1900 chars)* |
| `source_page` | `source.landing_page` → else `https://laineindustries.co/contact` | → else `…/intake` | → else `…/full-intake` |

`‖` = first non-empty wins (fallback order), then `summary`. No field is
fabricated; unmatched fields are `null`.

**Form-type normalization:** `contact` → `contact`; `intake`/`short-intake`/
`short_intake` → `short-intake`; `full-intake`/`full_intake`/`fullintake` →
`full-intake`; anything else passes through unchanged (a valid `business_name`
is still accepted).

## Success response

n8n returns `{"ok":true}` (200) to `/api/intake`, which returns 200 to the
browser → the form shows its success state. Safe operational values from the
Factory 201 (`opportunity_id`, `stage`, `fit_score`, `recommended_offer`,
`missing_info`) are visible in the n8n execution log but are **not** exposed to
the browser (the website contract only needs `{ ok: true }`).

## Failure behavior & fallback

Every failure path returns a non-2xx to `/api/intake`. The proxy treats any
non-2xx (other than its own 503 "not configured") as a webhook failure and, in
turn, the website form falls back to **copy-to-clipboard + a prefilled email
draft** — so a submission is never silently lost.

| Condition | n8n response | Browser result |
|-----------|--------------|----------------|
| Malformed / missing `business_name` | 400 `invalid_submission` | copy/email fallback |
| Factory 401 (bad/missing secret) | 502 `factory_unavailable` | copy/email fallback |
| Factory 400 / 500 / timeout / DNS | 502 `factory_unavailable` | copy/email fallback |
| `N8N_INTAKE_WEBHOOK_URL` unset | proxy returns 503 (never reaches n8n) | copy/email fallback |

No stack traces, webhook URLs, credentials, DB ids, or env values are ever
returned to the browser.

## Duplicate / replay protection

Conservative-by-design (no extra infrastructure): the website form disables its
submit button while in-flight and issues **one** `fetch`; the n8n HTTP node has
**no automatic retries**; so one submission → one POST → one opportunity. A
`dedupe_key` (`formType|email|business_name|submittedAt`) is computed inside n8n
for debugging and is available if durable dedupe is added later (e.g. an n8n
Data Table lookup, or Factory-side idempotency). **Limitation:** there is no
durable idempotency store today — a deliberate manual double-submit could create
two opportunities. Accepted for this low-volume warm-inbound path.

## Owner notification

Factory HQ already creates an `owner_alerts` row on every successful intake, so
the workflow adds **no** duplicate success notification. (Optional, not included
by default: an n8n *Error Trigger* workflow that emails David on n8n execution
failures only — never the prospect.)

## Environment variables

| Where | Name | Notes |
|-------|------|-------|
| `ai-demo-website` (Vercel) | `N8N_INTAKE_WEBHOOK_URL` | **Set this** to the n8n production webhook URL. Server-only, **no `VITE_`**, Production env. Redeploy after change. |
| n8n | `Factory Inbound Secret` (Header Auth credential) | header `x-radar-secret` = Factory's `RADAR_INBOUND_SECRET`. Not an env var — an n8n credential. |
| `laine-industries-factory-hq` (Vercel) | `RADAR_INBOUND_SECRET` | Must be present in Production (the receiver fails closed without it). Do **not** rotate unless necessary. |

Do **not** change `FACTORY_PAUSED` or the DB pause flag — inbound capture works
while paused.

## How to test (run in order; use an unmistakable `[TEST]` business name)

1. **n8n isolated** — with the workflow open, use the *Test* webhook URL and POST
   a synthetic payload (`business_name: "[TEST] Laine Intake Integration"`).
   Confirm validate + mapping look right in the execution view and no secret
   appears. (Keep the Factory node disabled until the credential is set.)
2. **Factory auth** — enable the Factory node; send one `[TEST]` submission.
   Expect **201**; confirm in `/ops/first-10` a `warm_inbound` opportunity, the
   raw-payload + `intake_analysis` activities, an owner alert, and a
   `website_intake_received` learning event. Confirm **no** email/proposal/
   payment-link/project, and that Factory is still paused.
3. **Website proxy** — after `N8N_INTAKE_WEBHOOK_URL` is set and the site
   redeployed, submit a `[TEST]` form on the live site. Confirm success (no
   fallback shown), exactly **one** opportunity, correct field mapping, and no
   webhook URL/secret in the browser network tab or bundle.
4. **Failure fallback** — temporarily point the Header Auth credential at a wrong
   value (or disable the workflow); submit once. Confirm the site shows the
   copy/email fallback and no opportunity is created. **Restore immediately.**
5. **Real owner test** — David submits one real test he owns. Confirm it lands in
   `/ops/first-10` with correct details, `source_channel=website`,
   `stage=warm_inbound`, and an owner alert. Remove `[TEST]` records afterward.

## Rotating `RADAR_INBOUND_SECRET`

1. Set the new value in the Factory HQ Vercel project (Production) and redeploy.
2. Update the n8n `Factory Inbound Secret` credential to the new value.
3. Send one `[TEST]` submission (test step 2) to confirm 201.
4. Because the Factory checks a single secret, update both sides close together;
   there is no overlap window unless you temporarily accept both (not supported
   by the current single-secret check). Never print the value anywhere.

## Recovery (if the n8n workflow is deleted again)

1. Re-import `automation/n8n/laine-industries-website-intake-to-factory-hq.json`.
2. Recreate the `Factory Inbound Secret` Header Auth credential (see
   `automation/n8n/README.md`).
3. Activate, copy the new production webhook URL, update
   `N8N_INTAKE_WEBHOOK_URL` on the website, redeploy, re-run the tests.

## Cross-reference

Factory-side contract & owner-approval gates:
`laine-industries-factory-hq/docs/website-intake-flow.md`.
