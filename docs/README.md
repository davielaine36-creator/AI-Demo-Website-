# Lane Industries — Docs Index

The playbook for running Lane Industries. Everything here is an **internal working
doc** (business, sales, delivery, and operations) unless marked
**client-facing**. Nothing in this folder is code or part of the public website.

> New here? Read this index top to bottom once, then jump to whatever you need.
> The full client lifecycle runs: **outreach → call → proposal → start → build →
> handoff → support/referrals.**

---

## How the docs map to the job

### 1. Sales / Outreach
| Doc | What it's for | Who uses it | When | Internal / Client-facing |
|---|---|---|---|---|
| `outreach-kit.md` | Ready-to-send messages (cold, warm, text, follow-up) by audience | David / Elysio | Prospecting, first contact | Internal (messages sent to clients) |
| `offer-sheet.md` | The 5 offers with scope, rough price ranges, timelines | David / Elysio | Deciding what to pitch; quoting | Internal (can adapt parts for clients) |
| `first-10-clients-plan.md` | Who to contact first, daily/weekly targets, task split | David + Elysio | Early growth, weekly planning | Internal |

### 2. Discovery / Calls
| Doc | What it's for | Who uses it | When | Internal / Client-facing |
|---|---|---|---|---|
| `discovery-call-script.md` | Opening, questions, framing, closing, objections | Whoever runs the call | During/before a discovery call | Internal |
| `client-question-answer-bank.md` | Plain-English answers to ~30 common questions + pitches | David / Elysio | Call prep + founder training | Internal |
| `one-page-call-cheat-sheet.md` | Compressed glance-before-a-call quick reference | David / Elysio | Right before / during a call | Internal (print it) |

### 3. Proposal / Client Start
| Doc | What it's for | Who uses it | When | Internal / Client-facing |
|---|---|---|---|---|
| `proposal-template.md` | Reusable copy/paste proposal + sign-off | David / Elysio | After a call, to send a quote | Client-facing (filled in) |
| `project-start-checklist.md` | The "after they say yes" kickoff sequence | Whoever owns the client | Right after a yes, before building | Internal |

### 4. Scope / Boundaries
| Doc | What it's for | Who uses it | When | Internal / Client-facing |
|---|---|---|---|---|
| `scope-boundaries.md` | Included vs. extra, revisions, delays, limits, no-deposit-no-work | Both | Setting expectations; mid-project asks | Internal (share relevant parts) |

### 5. Delivery / Handoff
| Doc | What it's for | Who uses it | When | Internal / Client-facing |
|---|---|---|---|---|
| `client-handoff-checklist.md` | Finish clean: walkthrough, access, invoice, testimonial, follow-up | Whoever built it | At project completion | Internal (produces client-facing handoff) |

### 6. Managed Client Systems
| Doc | What it's for | Who uses it | When | Internal / Client-facing |
|---|---|---|---|---|
| `managed-client-systems-playbook.md` | Managed vs. Client-Owned vs. Transfer-Later; how to explain it | Both | Deciding the model; explaining to clients | Internal (explanations are client-facing) |
| `client-infrastructure-naming-system.md` | `LI-0001-...` naming across all tools + files | Whoever sets up projects | Before creating any repo/project | Internal |
| `client-registry-template.md` | Master client tracker (status + pointers, **no secrets**) | Both | Ongoing, updated per client | Internal |

### 7. Access / Security
| Doc | What it's for | Who uses it | When | Internal / Client-facing |
|---|---|---|---|---|
| `access-and-security-rules.md` | Invites over passwords, least access, no secrets in docs/git, AI approval | Both | Any time you touch access or data | Internal |

### 8. Billing / Support
| Doc | What it's for | Who uses it | When | Internal / Client-facing |
|---|---|---|---|---|
| `managed-support-billing-model.md` | Build fee vs. monthly, support tiers, pause rules, transfer/export | Both | Quoting monthly; nonpayment; transfers | Internal (wording is client-facing) |

### 9. Client-Facing Materials
Documents (or parts of them) meant to be shared **with** clients:
- `proposal-template.md` — the proposal you send them.
- `managed-client-systems-playbook.md` — the plain-English model explanations.
- `managed-support-billing-model.md` — the client-friendly wording + tier descriptions.
- Handoff output from `client-handoff-checklist.md` — walkthrough + instructions.
- Selected answers from `client-question-answer-bank.md` — reuse in emails/texts.

> Rule: never hand a client an internal doc raw. Pull the relevant plain-English
> parts into a clean message, proposal, or email.

### 10. Attorney-Review Materials
None yet — everything here is a **plain working agreement, not legal advice.**
Before anything high-value or unusual, have a real contract reviewed by an
attorney. Candidates to formalize later: `proposal-template.md` (sign-off),
`scope-boundaries.md`, and the pause/suspend + transfer terms in
`managed-support-billing-model.md`. Mark any lawyer-reviewed versions clearly
(e.g. `-legal` suffix) so they're not confused with the working drafts.

---

## Use these, in this order

### Before a client call, review these
- `one-page-call-cheat-sheet.md` (quick glance)
- `discovery-call-script.md` (questions + flow)
- `client-question-answer-bank.md` (if you want deeper prep)

### After a client says yes, use these
- `proposal-template.md` (send the quote + get sign-off)
- `project-start-checklist.md` (run the kickoff)
- `managed-client-systems-playbook.md` (confirm the model)

### Before starting work, confirm these
- `scope-boundaries.md` (agreed scope in writing)
- `access-and-security-rules.md` (how you'll get access)
- `client-infrastructure-naming-system.md` (assign the client ID)
- `client-registry-template.md` (log the client)

### Before handoff, use these
- `client-handoff-checklist.md` (walkthrough, access returned, final invoice)
- `managed-support-billing-model.md` (offer the right support tier)

---

## "Do not skip" checklist

Non-negotiables for every paid client, in order. If one isn't done, don't move on.

- [ ] **Scope** — written and agreed (`scope-boundaries.md` + proposal).
- [ ] **Contract** — proposal approved / signed in writing (`proposal-template.md`).
- [ ] **Deposit** — collected and cleared **before** any build starts.
- [ ] **Access rules** — invites over passwords, least access (`access-and-security-rules.md`).
- [ ] **Client ID** — assigned and everything named consistently (`client-infrastructure-naming-system.md`).
- [ ] **Support / hosting decision** — Managed, Client-Owned, or Transfer-Later chosen and written down (`managed-client-systems-playbook.md` + `managed-support-billing-model.md`).

---

## Two ground rules for these docs

1. **No secrets in here, ever.** No passwords, API keys, payment info, or customer
   data in any doc or in git. Pointers and status only. (See
   `access-and-security-rules.md`.)
2. **These are working guides, not legal contracts.** Keep them practical, update
   them as you learn, and get real legal review before anything high-stakes.
