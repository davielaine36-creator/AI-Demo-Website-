# Lane Industries — Managed Client Systems Playbook

How Lane Industries handles the technical side so non-technical clients don't have
to. Most small-business clients do not want to manage GitHub, Vercel, Supabase,
n8n, domains, DNS, or deployments. They want a working system and someone they
trust to run it. This playbook is our default operating model.

> One-line principle: **the client owns the outcome; Lane Industries owns the
> plumbing.** Unless they specifically ask to own the infrastructure, we manage it.

---

## The three models

### 1. Lane Managed Build (DEFAULT)

Lane Industries builds **and** runs the technical system. The client gets a live
link/system and a walkthrough — nothing technical to manage.

- **How it works:** We build on our infrastructure (our GitHub, Vercel, Supabase,
  n8n, etc.), host it, maintain it, and support it.
- **Client pays:** a one-time build fee, and (optionally) a monthly managed
  hosting/support/maintenance fee.
- **Client gets:** the live system, a walkthrough (Loom + simple instructions),
  and a single point of contact for changes.
- **Best for:** almost every small-business client who "just wants it to work."

### 2. Client-Owned Build

We build the system, but on the **client's own accounts** from the start (their
GitHub, their Vercel, their domain, their Supabase, etc.).

- **How it works:** Client sets up / owns the accounts; we build inside them and
  hand over full control.
- **Client pays:** a (usually higher) build fee reflecting setup + documentation;
  they cover their own tool costs directly.
- **Best for:** clients with in-house technical help, or who firmly want to own
  everything from day one.

### 3. Transfer Later

Start as a Managed Build, then transfer ownership to the client if/when they ask.

- **How it works:** We build and run it managed; later we migrate repos, projects,
  data, and the domain to the client and document the handoff.
- **Client pays:** the normal managed model, plus a one-time **transfer/migration
  fee** when they choose to take it over.
- **Best for:** clients who want simplicity now but the option to own it later.

---

## When to use each

| Situation | Recommended model |
|---|---|
| Non-technical owner, wants it handled | **Lane Managed Build** |
| Wants low ongoing cost, has tech help | Client-Owned Build |
| Unsure, wants flexibility | **Lane Managed Build** → Transfer Later if asked |
| Bigger business with IT/agency | Client-Owned Build |
| Quick pilot / first build | **Lane Managed Build** |

Default to **Lane Managed Build** unless the client has a clear reason to own the
infrastructure.

---

## Pros / cons

**Lane Managed Build**
- ➕ Easiest for the client; nothing technical to learn.
- ➕ Recurring monthly revenue; we control quality and uptime.
- ➕ Faster to launch (our accounts are already set up).
- ➖ Lane carries the tool costs and responsibility (cover via monthly fee).
- ➖ "What if you disappear?" concern — answer it with the Transfer Later option.

**Client-Owned Build**
- ➕ Client owns everything; less dependency on us.
- ➕ No ongoing obligation for Lane if they don't want support.
- ➖ More setup friction; client must manage accounts and costs.
- ➖ Slower, more support questions, easier for them to break things.

**Transfer Later**
- ➕ Best of both: simple now, ownership optional later.
- ➖ Migration takes real work — always charge a transfer fee.

---

## What clients should NOT have to understand

Keep these entirely on our side. Never make a client learn:

- GitHub, repos, branches, commits, or pull requests.
- Vercel, builds, deployments, or environment variables.
- Supabase, databases, tables, or migrations.
- n8n workflows, webhooks, or automations.
- DNS records, nameservers, or SSL certificates.
- Hosting, servers, or anything with the word "config" in it.

If a client is being asked to understand any of the above, we've made it too
complicated.

---

## What Lane Industries manages behind the scenes

- Source code and version control (GitHub).
- Hosting and deployments (Vercel).
- Databases / data storage (Supabase or similar), backups where relevant.
- Automations and integrations (n8n, email, alerts).
- Domain/DNS setup and SSL (or coordinating with the client's registrar).
- Updates, small fixes, monitoring, and support.
- Keeping credentials secure (see `access-and-security-rules.md`).

---

## How to explain it to a non-technical client

Keep it about outcomes and peace of mind:

> "You don't need to touch any of the technical stuff. We build it, we host it,
> and we keep it running. You just get a link that works and someone to call when
> you want a change. There's a one-time fee to build it, and an optional monthly
> fee if you'd like us to keep hosting, supporting, and improving it. If you ever
> want to take full ownership yourself, we can set that up separately."

Avoid the words GitHub, Vercel, Supabase, DNS, deploy. Say "we host it and keep it
running."

---

## What happens if they stop paying monthly

Be upfront about this **before** they sign, so it's never a surprise.

- The monthly fee covers hosting, support, and maintenance. If it stops, active
  hosting/support stops too.
- Standard sequence: reminder → grace period (e.g. 7–14 days) → pause/suspend the
  hosted system → after a longer window, it may go offline.
- Their **data and work are not held hostage**: once invoices are paid in full,
  we'll provide an export or arrange a transfer (transfer fee may apply).
- One-time builds they paid for in full remain theirs to take (via transfer);
  the *managed hosting/running* is what the monthly fee keeps alive.

See `managed-support-billing-model.md` for exact pause/suspend wording.

---

## What should be in the proposal / contract

- Which model applies (Managed / Client-Owned / Transfer Later).
- Build fee, and monthly fee (if any) with what it covers.
- Clear statement that hosting/support depends on the monthly fee staying active.
- Pass-through tool costs, if any, and how they're handled.
- Data ownership + export/transfer terms once invoices are paid.
- Pause/suspend policy for nonpayment.
- That we manage infrastructure on the client's behalf (not legal advice; a plain
  working agreement).

---

## What to avoid

- Don't over-explain the tech — it scares non-technical clients.
- Don't promise "you'll own everything" while running it managed — offer Transfer
  Later instead.
- Don't hold data hostage; that destroys trust and referrals.
- Don't run many unrelated clients in one shared project without a plan (see
  `access-and-security-rules.md`).
- Don't start managed hosting you're not being paid to maintain.
- Don't guarantee uptime, revenue, or results.
