# Ask Lane — Concierge & Knowledge Source

How the "Ask Lane" helper on the public website works, and where its answers
come from. This is a reference doc, not shipped code.

## What Ask Lane is (today)

Ask Lane is a **lightweight guided concierge**, not a live AI chat. It:

1. Asks a few short questions (business type, what feels messy, what to improve,
   timing).
2. Maps the answer to a **recommended starting point**.
3. Shows an honest **timeline range, rough investment range, and what a build
   usually includes**.
4. Lets the owner open **Common questions** (cost, timeline, ownership, support,
   guarantees, "what do you need from me?").

It runs entirely in the browser. **No backend, no API keys, no database, no
analytics, and no data leaves the browser.** The on-screen note makes clear it
"is not a live AI chat yet."

Component: `src/components/AskLane.tsx`.

## Where the answers come from

Ask Lane draws from a curated **knowledge brain**:

- `src/data/askLaneKnowledge.ts` — the knowledge module, which exports:
  - `STARTING_POINTS` — per-starting-system timeline, rough investment, and
    "usually includes" (used to enrich the recommendation).
  - `ASK_LANE_FAQ` — the common questions shown in the concierge.
  - `ASK_LANE_KNOWLEDGE` — the broader set of knowledge chunks (a superset of the
    FAQ), grouped by topic.

The **source of truth** for all of that content is
[`docs/client-decision-guide.md`](./client-decision-guide.md). When the decision
guide changes (prices, timelines, scope, ownership, etc.), update
`src/data/askLaneKnowledge.ts` to match.

## Honesty rules (must stay true)

- All prices and timelines are **rough ranges and starting points**, confirmed in
  writing — never quotes or guarantees.
- **No guaranteed results** (revenue, sales, lead counts).
- **AI drafts, a human approves** — nothing auto-sends to customers without
  explicit written approval.
- **Not legal advice** — formal terms are confirmed in the proposal/contract.

## Future upgrade path (not built yet)

If Ask Lane ever becomes a real AI chat, reuse this same knowledge brain as its
source, and add a backend/serverless route so no AI keys are exposed in the
browser (plus cost limits and safety rules). Until then, it stays a static,
safe, guided concierge.
