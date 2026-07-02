# Ask Lane — AI Chatbot (v1)

Ask Lane is the site-wide assistant in the bottom-right corner. As of this
version it is a **real AI chatbot** with a curated knowledge brain and a
serverless API — plus the original guided quick-start kept as a built-in
fallback.

This doc explains how it works, how to configure it, how to update its
knowledge, and what the upgrade path looks like.

---

## Architecture

```
Browser (AskLane.tsx)
  │  POST { messages: [...] }          ← no AI keys in the browser, ever
  ▼
/api/ask-lane  (Vercel Function, server-side)
  1. Validates the payload (shape, roles, size limits)
  2. Retrieves the most relevant knowledge chunks   ← src/lib/askLaneRetrieval.ts
     from the curated brain                         ← src/data/askLaneKnowledge.ts
  3. Builds a system prompt: personality + guardrails + those chunks only
  4. Calls the Anthropic Messages API with ANTHROPIC_API_KEY (server env var)
  5. Returns { reply, links, fallback }
  ▼
Browser renders the reply + recommended page links
```

This is **curated retrieval, not vector RAG**: the knowledge base is small
(~30 hand-written chunks), so deterministic keyword scoring is faster, cheaper,
easier to review, and has no external dependencies. There is **no database, no
Supabase, no Pinecone, no pgvector, no n8n, no auth, no analytics, and no lead
logging** in this feature.

### The pieces

| File | Role |
| --- | --- |
| `src/data/askLaneKnowledge.ts` | The brain: curated chunks (`id`, `title`, `category`, `keywords`, `content`, `relatedLinks`) distilled from site copy and `docs/` |
| `src/lib/askLaneRetrieval.ts` | Deterministic scoring (keyword phrases > keyword words > title words > content overlap), returns top 5 chunks; falls back to intro chunks when nothing matches |
| `api/ask-lane.ts` | POST-only Vercel Function; validation, retrieval, Anthropic call, graceful fallback |
| `src/components/AskLane.tsx` | Hybrid widget: chat transcript + input + quick questions, and the original guided 4-question flow |

### Request / response

```
POST /api/ask-lane
{ "messages": [{ "role": "user", "content": "How much does this cost?" }] }

200 → { "reply": "…plain-English answer…", "links": [{ "label": "Start the short intake", "to": "/intake" }], "fallback": false }
200 → { "reply": "…live chat not configured…", "links": [...], "fallback": true }   (no API key set)
400 → { "error": "invalid_request", "message": "…" }   (bad shape / too long / >12 messages)
405 → { "error": "method_not_allowed" }
502 → { "error": "upstream_error" }                    (Anthropic call failed)
```

Recommended links are derived **server-side from the retrieved chunks** (not
parsed out of model output), so they are deterministic and always point to
real routes.

---

## Environment variables

Set these in **Vercel → Project → Settings → Environment Variables**. Env-var
changes apply to **new deployments** — redeploy after adding them.

| Variable | Required | Notes |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | Yes, for live chat | Server-side only. **No `VITE_` prefix** — that would expose it to the browser. Without it the widget still works and shows the guided fallback. |
| `ASK_LANE_MODEL` | No | Overrides the model. Default is `claude-opus-4-8`; set `claude-haiku-4-5` for faster/cheaper replies if desired. |

Local testing of the function requires `vercel dev` (plain `npm run dev` serves
only the SPA; the widget will show its error state for chat, and the guided
flow still works).

---

## Fallback behavior (no key, or errors)

- **`ANTHROPIC_API_KEY` missing:** the endpoint returns `200` with
  `fallback: true` and a friendly message. The widget shows a note that live
  chat isn't configured and offers the guided quick-start plus `/intake` and
  `/contact` links. Nothing breaks.
- **Anthropic call fails (outage, bad key, rate limit):** the endpoint returns
  `502`; the widget shows an inline error with links to `/intake` and
  `/contact`, and the user can retry.
- **Guided quick-start** runs entirely in the browser and never makes a network
  call, so it always works.

---

## Updating the knowledge brain

Edit `src/data/askLaneKnowledge.ts` — that's it. Each chunk:

```ts
{
  id: 'pricing',                      // stable, kebab-case
  title: 'Rough pricing ranges',      // shown to the model as a heading
  category: 'Pricing',                // one of the KnowledgeChunk categories
  keywords: ['cost', 'how much'],     // drive retrieval — be generous, think like a visitor
  content: '…',                       // 50–120 words, plain English, chat-bubble length
  relatedLinks: [LINKS.intake],       // real routes only; become the reply's link chips
}
```

Guidelines:

- **Keep it honest.** Rough ranges with `~`, no guarantees, no invented client
  results. If the offer sheet changes, update the chunk — the bot only knows
  what's written here.
- **Keywords matter most.** Retrieval scores whole keyword phrases highest, so
  include the phrasings customers actually use ("stop paying", "do you need my
  passwords").
- After editing, sanity-check locally: `npm run build` (typecheck) and ask the
  deployed bot a few questions that should hit the new chunk.

---

## Safety guardrails

Enforced in the system prompt (`api/ask-lane.ts` → `buildSystemPrompt`):

- Answers **only** from the retrieved knowledge; recommends `/intake` or
  `/contact` instead of guessing.
- Never guarantees revenue, leads, rankings, or outcomes; never invents client
  results; presents demos as static examples, never live client systems.
- Never asks for passwords, API keys, payment info, or sensitive customer
  data — and tells users not to send them.
- No legal, tax, compliance, or security guarantees.
- Pricing answers give rough ranges + intake for a scoped quote; ownership
  answers explain Lane Managed Build / Client-Owned Build / Transfer Later;
  AI-messaging answers lead with "AI drafts, a human approves".
- Stays on topic (Lane Industries) and politely declines everything else.

Enforced in code:

- POST-only; strict payload validation (≤12 messages, ≤1,500 chars each,
  ≤8,000 total, must end with a user message).
- The API key is read from `process.env` server-side only; the frontend bundle
  contains no Anthropic references (verified in QA).
- User chat content is never logged — only error class/status on failure.
- Reply links come from the curated chunks, not from model output.
- The UI shows a permanent note: it's an AI assistant, answers can contain
  mistakes, don't send sensitive data. The `/privacy` page describes the chat
  honestly.

Residual risks to keep in mind: the model can still word things imperfectly
(hallucination risk is reduced by the curated-chunks-only rule, not zero), and
each chat turn costs API tokens. Review behavior after setting the key, before
telling clients about it.

---

## Future upgrade path (when the knowledge outgrows this)

Curated retrieval is right while the brain is a few dozen chunks. Move to real
vector RAG when you have lots of changing content (many case studies, blog
posts, support docs, uploaded PDFs). The seams are already in place:

1. **Storage:** move chunks from the TS file into a database with an
   embeddings column (e.g. Supabase + pgvector).
2. **Retrieval:** swap `retrieveKnowledge()`'s internals for an embedding
   similarity query — the function signature (`question → chunks`) stays the
   same, so `api/ask-lane.ts` barely changes.
3. **Ingestion:** add a small pipeline that chunks + embeds new docs.
4. Later, optionally: streaming replies, lead capture from chat (with
   consent), rate limiting / abuse protection, analytics.

None of that is needed for launch.
