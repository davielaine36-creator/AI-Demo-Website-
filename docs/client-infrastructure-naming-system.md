# Laine Industries — Client Infrastructure Naming System

One consistent way to name everything for a client, everywhere. When names match
across GitHub, Vercel, Supabase, n8n, Drive, and paperwork, nothing gets lost and
anyone can find anything in seconds.

---

## The core pattern: ID + readable name

```
LI-<0000>-<readable-kebab-name>
```

Examples:

```
LI-0001-brown-academy-site
LI-0002-window-service-dashboard
LI-0003-shopify-store-automation
```

- **`LI`** — Laine Industries prefix (constant).
- **`0001`** — zero-padded client/project number, assigned in order, never reused.
- **`readable-kebab-name`** — lowercase, hyphenated: `client-thing` describing the
  business + what the system is.

> One client can have multiple systems. Keep the same client number and vary the
> readable part, or give each system its own sequential ID — pick one rule and be
> consistent. Recommended: **one ID per system**, and record which client it
> belongs to in the registry.

---

## Why ID + readable name beats numbers only

- **Human-readable:** `LI-0002-window-service-dashboard` tells you the client and
  the system at a glance. `LI-0002` alone tells you nothing.
- **Sortable + stable:** the numeric ID keeps everything in a predictable order
  and never changes, even if the business renames itself.
- **Searchable:** typing "window" or "brown" finds it instantly across tools.
- **Collision-proof:** two clients named similarly still have unique IDs.
- **Rename-safe:** if a business rebrands, the ID stays constant; only the readable
  part changes, so links and history don't break.
- **Fewer mistakes:** you won't email the wrong client's invoice because two files
  were both called "dashboard final v2."

Numbers-only is unreadable; names-only collide and get messy. ID + name gives you
both machine order and human clarity.

---

## How to apply it per system

Assign the client/system an ID once, then reuse the **same base** everywhere:

| Thing | Naming rule | Example |
|---|---|---|
| **Client ID** | `LI-<0000>` | `LI-0002` |
| **GitHub repo** | `LI-<0000>-<name>` | `LI-0002-window-service-dashboard` |
| **Vercel project** | match the repo name | `LI-0002-window-service-dashboard` |
| **Supabase project** | `LI-<0000>-<name>` (short if needed) | `LI-0002-window-service-db` |
| **n8n workflow(s)** | `LI-<0000>-<name>-<purpose>` | `LI-0002-window-service-lead-intake` |
| **Google Drive folder** | `LI-<0000> <Readable Business Name>` | `LI-0002 Window Service` |
| **Proposal file** | `LI-<0000>-proposal-<yyyy-mm-dd>` | `LI-0002-proposal-2026-02-14` |
| **Contract file** | `LI-<0000>-contract-<yyyy-mm-dd>` | `LI-0002-contract-2026-02-18` |
| **Invoice file** | `LI-<0000>-invoice-<nnn>-<yyyy-mm-dd>` | `LI-0002-invoice-001-2026-02-18` |
| **Internal notes** | `LI-<0000>-notes` | `LI-0002-notes` |

Rules of thumb:
- Always lowercase kebab-case for tech names (repos, projects, workflows).
- Drive folders can use a readable business name after the ID for skimming.
- Multiple n8n workflows: keep the base, add a `-purpose` suffix.
- Never reuse a retired ID number. Once `LI-0002`, always `LI-0002`.

---

## Folder layout inside a client's Drive folder

```
LI-0002 Window Service/
  proposals/      LI-0002-proposal-2026-02-14.pdf
  contracts/      LI-0002-contract-2026-02-18.pdf
  invoices/       LI-0002-invoice-001-2026-02-18.pdf
  assets/         (logo, photos, brand)
  notes/          LI-0002-notes.md
```

Do **not** store passwords, API keys, or secrets in these folders (see
`access-and-security-rules.md`).

---

## Assigning a new ID

1. Take the next unused number from the client registry (`client-registry-template.md`).
2. Zero-pad to 4 digits (`LI-0007`).
3. Pick a short readable name (`client-system`).
4. Record it in the registry **before** creating any repos/projects, so everything
   matches from the start.
