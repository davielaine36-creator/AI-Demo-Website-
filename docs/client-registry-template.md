# Lane Industries — Client Registry

The single source of truth for who our clients are and where their systems live.
Copy the table, add a row per client/system, and keep it current. Use the ID from
`client-infrastructure-naming-system.md`.

> ⚠️ **DO NOT store passwords, API keys, payment/card info, private customer
> lists, or any sensitive client secrets in this file.** This registry is for
> pointers and status only (names, IDs, which project, what stage). Secrets live
> in a proper secrets manager / password manager — never in docs or git. See
> `access-and-security-rules.md`.

---

## Registry table

| Client ID | Business name | Contact person | Email | Phone | Website / domain | Offer sold | Build fee | Monthly fee | Billing status | Contract status | Deposit status | GitHub repo | Vercel project | Supabase project | n8n workflows | Domain / DNS status | Support plan | Renewal / review date | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| LI-0001 | Brown Academy | [name] | [email] | [phone] | [domain] | Starter Website + Intake | $[x] | $[x]/mo | Current / Overdue / — | Sent / Signed / — | Pending / Paid / — | LI-0001-brown-academy-site | LI-0001-brown-academy-site | LI-0001-brown-academy-db | LI-0001-brown-academy-inquiry | Managed / Client / — | [tier] | [YYYY-MM-DD] | Pilot / internal build |
| LI-0002 | Window Service | [name] | [email] | [phone] | [domain] | Lead Capture + CRM Dashboard | $[x] | $[x]/mo | Current | Signed | Paid | LI-0002-window-service-dashboard | LI-0002-window-service-dashboard | LI-0002-window-service-db | LI-0002-window-service-lead-intake | Pending / Live / — | [tier] | [YYYY-MM-DD] | Pilot / discovery |
| LI-0003 | [Business] | [name] | [email] | [phone] | [domain] | [offer] | $[x] | $[x]/mo | — | — | — | LI-0003-... | LI-0003-... | LI-0003-... | LI-0003-... | — | — | [YYYY-MM-DD] | [notes] |

*(Rows above are illustrative placeholders — replace with real clients as they come in.)*

---

## Column definitions

- **Client ID** — `LI-0000` from the naming system. Assign before building.
- **Business name / Contact / Email / Phone** — primary point of contact only.
- **Website / domain** — live URL or the domain being used.
- **Offer sold** — the package from `offer-sheet.md`.
- **Build fee / Monthly fee** — agreed amounts (not card details).
- **Billing status** — `Current`, `Overdue`, `Paused`, or `—`.
- **Contract status** — `Sent`, `Signed`, or `—`.
- **Deposit status** — `Pending`, `Paid`, or `—`. (No build starts until Paid.)
- **GitHub repo / Vercel project / Supabase project / n8n workflows** — the
  matching names from the naming system (pointers, not credentials).
- **Domain / DNS status** — `Pending`, `Live`, `Client-managed`, or `—`.
- **Support plan** — tier from `managed-support-billing-model.md`, or `—`.
- **Renewal / review date** — next check-in / renewal date.
- **Notes** — short status; never secrets.

---

## Suggested status values (keep them consistent)

- Billing: `Current` · `Overdue` · `Paused` · `—`
- Contract: `Sent` · `Signed` · `—`
- Deposit: `Pending` · `Paid` · `—`
- Domain/DNS: `Pending` · `Live` · `Client-managed` · `—`
- Model: `Managed` · `Client-Owned` · `Transfer-Later`

---

## Where the secrets go instead

- Passwords / logins → a dedicated password manager (e.g. shared vault).
- API keys / tokens → environment variables in the hosting platform, never in docs
  or git.
- Payment info → the payment processor only; never recorded here.
- Customer data → inside the client's own system/database, handled per
  `access-and-security-rules.md`.
