# Laine Industries — Access & Security Rules

Simple, non-negotiable rules for handling client access and data. These protect
the client, protect Laine Industries, and keep us looking professional. Not legal
boilerplate — just how we operate.

> One-line principle: **least access, for the least time, with no secrets ever
> stored in docs or code.**

---

## Getting access from clients

- **Never ask clients to text or email passwords.** It's insecure and looks
  unprofessional. If a client offers, redirect them politely.
- **Prefer collaborator invites / role-based access** (e.g. "add us as a
  collaborator/admin") over sharing a login.
- **Prefer temporary access.** Get in, do the work, get out.
- **Use the least access necessary** to do the job — not blanket admin "just in
  case."
- **Request access only when a task actually needs it**, not at kickoff by default.
- **Log what access was granted** (in notes, not the credentials themselves) so
  it can be revoked later.

### If a client insists on sending a password
> "For your security, please don't text or email that. Instead, add us as a
> collaborator on [tool] — I'll send a 30-second guide. That way you never have to
> share your password and you can remove our access anytime."

---

## After the project

- **Revoke or downgrade our access after the project if there's no support plan.**
- If there **is** a managed/support plan, keep only the access that plan requires.
- Remove any temporary credentials we were holding.
- Confirm the client still fully owns their accounts.

---

## Secrets, keys, and code

- **Store no secrets in docs.** The client registry and all docs hold pointers and
  status only — never passwords, keys, or tokens.
- **Never commit API keys, tokens, or passwords to git.** Not even temporarily,
  not even in a private repo.
- **Use environment variables** for all keys/config in hosting platforms (e.g.
  `VITE_*` on the frontend, server-side env vars for anything sensitive).
- Keep client-facing/public frontend free of any secret that shouldn't be public —
  assume anything shipped to the browser is visible.
- Use a real password manager / secrets vault for credentials; share via the vault,
  not chat.
- If a secret is ever exposed, rotate it immediately and note it.

---

## Customer data

- **Treat customer data carefully.** It's the client's business and their
  customers' trust — handle it like it's our own.
- Collect and keep only the data the system actually needs.
- Don't move customer data into random spreadsheets or personal drives.
- Follow the client's reasonable wishes about their data, and honor deletion
  requests (mirrors the site's `/privacy` note).

---

## AI and customer-facing messages

- **AI drafts, it does not auto-send** — unless the client has explicitly approved
  automatic sending for a specific, well-understood workflow.
- **The client must approve any system that sends customer-facing messages** before
  it goes live. No surprise emails/texts to their customers.
- Default every follow-up/automation to **owner-approval-before-send**, then loosen
  only with clear, written client sign-off.
- Be honest about AI limits — it can be wrong; keep a human in the loop.

---

## Separation between clients

- **Use separate projects/repos per client** when data or access could otherwise
  mix. Follow the naming system so it's obvious what belongs to whom.
- **Do not mix unrelated client data** in one shared database, sheet, or workflow
  without a deliberate, isolated design.
- One client should never be able to see another client's data, links, or
  credentials.
- Shared/internal tooling is fine; **shared client data stores are not** unless
  intentionally designed and isolated.

---

## Quick do / don't

**Do**
- Invites over passwords · temporary over permanent · least access · env vars ·
  separate per client · human approval before customer messages.

**Don't**
- Texted passwords · secrets in docs/git · blanket admin · mixed client data ·
  auto-sending without approval · holding data after full payment.
