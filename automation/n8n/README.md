# n8n automation backups

This directory holds **sanitized, importable n8n workflow exports** for Laine
Industries. They contain **no credentials and no secret values** — every secret
is referenced by a credential *name* you attach after import.

> Why this exists: the original Website-Intake workflow was lost when a prior
> n8n trial account expired. Committing a sanitized export here means an account
> deletion can never erase the design again — you re-import in one click.

## Files

| File | Purpose |
|------|---------|
| `laine-industries-website-intake-to-factory-hq.json` | Website form → `/api/intake` → **n8n** → Factory HQ warm-inbound opportunity |

## Import & reconnect (one time)

1. **Import** — in n8n: *Workflows → ⋯ → Import from File* → pick the JSON.
   It imports **inactive** (`active: false`) by design.
2. **Create the Factory secret credential** (this is the only secret step):
   - *Credentials → New → Header Auth*.
   - Name it exactly **`Factory Inbound Secret`**.
   - **Header Name:** `x-radar-secret`
   - **Header Value:** the Factory HQ `RADAR_INBOUND_SECRET` value (paste it in
     the n8n credential UI — never into this file or the workflow JSON).
3. **Attach it** — open the **Send to Factory HQ** node → Credentials → select
   `Factory Inbound Secret`. (On import the node shows a placeholder credential
   id `REPLACE_WITH_YOUR_CREDENTIAL_ID`; selecting the real credential replaces it.)
4. **Verify the Factory URL** in the same node:
   `https://laine-industries-factory-hq.vercel.app/api/radar/inbound/website-intake`
5. **Activate** the workflow (top-right toggle).
6. **Copy the Production webhook URL** from the *Receive Website Intake* node
   (the `/webhook/laine-industries-website-intake` URL — **not** the `/webhook-test/` one).
7. **Wire the website:** set `N8N_INTAKE_WEBHOOK_URL` = that Production URL in the
   **ai-demo-website** Vercel project (Production, server-only — **no `VITE_`
   prefix**), then redeploy.

Full architecture, payload mapping, test plan, secret-rotation, and recovery
steps live in [`docs/n8n-website-intake-factory-hq.md`](../../docs/n8n-website-intake-factory-hq.md).

## Re-exporting after you change the workflow

After editing in n8n: *Workflows → ⋯ → Download*, then **remove any credential
ids/values** before committing (the `credentials` block should reference only a
name + the `REPLACE_WITH_YOUR_CREDENTIAL_ID` placeholder). Keep `active: false`.
Never commit a real webhook host if you consider it sensitive — the Factory
production host here is already public.

## Safety invariants baked into this workflow

- Inbound capture only: it **never** emails the prospect, sends outreach, creates
  a payment link, or starts a project. Factory HQ can stay **paused**.
- On any validation or Factory failure it returns a non-2xx to `/api/intake`, so
  the website's existing copy-to-clipboard + email-draft fallback kicks in —
  nothing a prospect types is ever lost.
