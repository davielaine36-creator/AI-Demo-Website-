# Laine Industries — Marketing OS

The operating system for turning the Laine Industries website into a marketing
and lead-generation engine. This is the front-facing distribution layer for the
broader autonomous business factory.

- **Website** = storefront + intake layer (this repo)
- **Factory HQ** = backend execution engine (`laine-industries-factory-hq`)
- **AI Work Radar** = outbound / acquisition module (inside the factory)
- **Intake forms** = inbound qualification module (this repo)
- **Demos** = proof / examples
- **Analytics** = learning layer
- **Marketing docs** = this file

The factory flow: `lead finding → demos → outreach → replies → intake →
project build → delivery → support`. The website is the friendly, trustworthy
sales layer in front of it. It should never expose owner-only routes, internal
endpoints, or secrets.

---

## 1. Positioning

**Primary promise**

> Laine Industries builds AI-powered websites and lead systems that help small
> businesses capture leads, organize customer info, and follow up faster.

**Core positioning line**

> AI websites and lead systems for small businesses.

**Homepage hero (shipped)**

- Eyebrow: *AI websites + lead systems for small businesses*
- Headline: *Turn your business website into a simple lead system.*
- Sub: *Laine Industries builds websites, intake forms, CRM dashboards, and
  follow-up automations that help small businesses capture leads, organize
  customer info, and respond faster.*
- Primary CTA: **Request a Demo** → `/intake`
- Secondary CTA: **See What We Build** → `/demos`

**What the site must make clear**

- The website is not just a brochure — the intake form is the start of a build.
- The system can create a **demo direction** before full commitment (demo-first).
- The factory can support lead finding, demos, outreach, replies, intake,
  delivery, and support.
- The offer is practical, not hype-based.
- The buyer does not need to understand AI to benefit.

**Language guardrails**

- Use: *simple, practical, organized, lead capture, follow-up, demo-first, owner
  approval, smallest useful build, built around your actual workflow.*
- Avoid: *revolutionary, guaranteed, 10x, fully autonomous business, set it and
  forget it, we guarantee leads / rankings / revenue.*
- Recurring phrases used on the site:
  - "Start with the smallest useful system."
  - "You do not need a complicated software stack. You need a clear path from
    customer interest to organized follow-up."
  - "Most small businesses do not need more tools. They need their website,
    intake, customer info, and follow-up to work together."
  - "Laine Industries builds the system around the real workflow — not the
    other way around."

---

## 2. Target customers

Small businesses and local service businesses that have: outdated websites, weak
lead capture, slow follow-up, scattered customer info, no CRM, no quote/request
workflow, no clear intake process, no automation, and owners doing too much
manually.

**Strongest early niches:** contractors, remodelers, roofers, HVAC, window
cleaning, construction / home service, training companies, security /
requalification, Shopify stores with operational chaos, small local operators.

---

## 3. Offers

| Offer | What it is | Page |
|---|---|---|
| Website Starter System | Business website / landing page with clear next step | `/services` |
| Lead Capture System | Page + form flow that turns visitors into organized quote requests | `/services`, `/lead-systems` |
| CRM / Lead Tracker | One organized place for lead details, status, notes, follow-ups | `/services` |
| AI Follow-Up Assistant | AI-drafted follow-ups (owner approval) | `/services` |
| Alerts & Automations | New-lead alerts, reminders, n8n / email | `/services` |
| Local Growth / Lead System | Practical lead-gen foundation for local businesses | `/services`, `/lead-systems` |
| Shopify / Store Operations | Store cleanup, task/issue tracking, draft replies | `/services` |

Never imply guaranteed leads from SEO or ads. Say "builds the system needed to
capture and manage leads," not "guarantees leads."

**Pricing:** no hard prices on the site on purpose. Recommend the smallest
useful build after intake. Pilot pricing available.

---

## 4. Funnel

```
Traffic (SEO / outreach / referrals / ads-ready)
   → Landing page or homepage
   → Request a Demo / See What We Build
   → Short intake (qualification)  OR  Full intake (deep discovery)
   → Lead scored + attributed → n8n / CRM (or email/copy fallback)
   → Demo direction → proposal → build → delivery → support
```

The intake is the conversion event. Demos are proof. Contact is the low-pressure
side door.

---

## 5. SEO page map

| Path | Title | Intent |
|---|---|---|
| `/` | AI Websites & Lead Systems for Small Businesses | Primary positioning |
| `/services` | Websites, CRM Dashboards & AI Follow-Up Systems | Offer detail |
| `/lead-systems` | Automated Lead Systems for Small Businesses | Core concept + FAQ |
| `/contractors` | AI Websites & Lead Systems for Contractors | Niche #1 landing |
| `/industries` | Industries We Build For | Niche hub (no thin spam) |
| `/for-small-businesses` | AI Websites & Systems for Small Businesses | Audience framing |
| `/how-it-works` | How It Works — Demo-First | Process |
| `/intake` | Request a Demo / Start Your Intake | Conversion |
| `/full-intake` | Full Intake Questionnaire | Deep discovery |
| `/demos` | Interactive Demos | Proof |
| `/contact`, `/about`, `/privacy` | — | Trust |

**Implemented:** per-page `<SEO>` component (`src/components/SEO.tsx`) sets
title, description, canonical, OG, and Twitter tags. Static `Organization` +
`WebSite` JSON-LD in `index.html`. `public/robots.txt` + `public/sitemap.xml`.
OG image is still a **TODO** (add `/og-image.png`, 1200×630).

Future pages — only build if they can carry real content, not thin SEO pages:
`/ai-websites-for-small-businesses`, `/ai-websites-for-contractors`,
`/website-intake-automation`, `/crm-follow-up-systems`.

---

## 6. Tracking events

Analytics stays **PII-free** — never send names, emails, phones, or message
bodies. PII only flows through the form-submission payload.

**Form funnel** (namespaced by form): `intake_form_start/submit/submit_success`,
`full_intake_form_start/submit/submit_success`,
`contact_form_start/submit/submit_success`.

**CTA / intent:** `request_demo_click`, `see_demos_click`, `cta_click`
(with label + destination + path), `nav_click`, `service_click`,
`external_link_click`.

**Page signals:** `page_view`, `service_page_view`, `lead_system_page_view`,
`contractor_page_view`, `demo_page_view`, `section_view`, `scroll_depth`.

---

## 7. Intake fields

**Short intake (`/intake`) — required:** name, business name, email.
**Recommended:** phone, website URL, business type / industry, city/state or
service area, what you need (multi-select), biggest problem, timeline,
exploring-vs-ready, budget comfort range, preferred contact method, consent.

**Full intake (`/full-intake`)** — unchanged deep questionnaire (business info,
overview, website, lead capture, CRM, follow-up, alerts, tools, Shopify, success
criteria, budget/timeline, final notes).

**Hidden source fields** (added to payload, never analytics) via
`src/lib/leadContext.ts` → `getLeadSource()`: `form_type`, `submitted_at`,
`landing_page`, `referrer`, `utm_source`, `utm_medium`, `utm_campaign`,
`utm_term`, `utm_content`.

---

## 8. Lead scoring

`src/lib/leadContext.ts` → `computeLeadScore()`:

| Signal | Points |
|---|---|
| Business name provided | +10 |
| Website URL provided | +10 |
| Phone provided | +10 |
| Business type is contractor / home service / training / local service | +15 |
| Clear pain point | +15 |
| Selected lead capture / CRM / follow-up need | +15 |
| Budget mid-range / larger / prefer to discuss | +10 |
| Timeline ready / high urgency | +15 |
| Missing basics (spam) | −50 |

The score + suggested status ride along in the webhook payload (`leadScore`,
`leadStatus`). `leadStatusFromScore()` maps to a coarse triage bucket.

**Lead statuses (for docs / future CRM):** New, Needs Review, Qualified, Demo
Direction Needed, Demo In Progress, Demo Sent, Follow-Up Needed, Proposal Sent,
Won, Lost, Not Fit, Spam.

---

## 9. Contractor niche test

`/contractors` is the first niche landing page. Hero: *"Websites and lead
systems for contractors who need more organized quote requests."* Covers
contractor problems, the quote request flow, example quote-form fields (name,
phone, email, zip/service area, project type, budget range, timeline,
owns-home/business, best time to contact, notes/photos), the website + CRM +
follow-up system, and a contractor-specific FAQ.

Run the test: point outreach + any ads at `/contractors`, watch
`contractor_page_view` → `request_demo_click` → `intake_form_submit_success`.

---

## 10. Outreach scripts

**Cold call (general)**
> Hey, my name is David with Laine Industries. Quick question — are you
> currently trying to get more quote requests or improve how your website
> handles new customers?

*If yes:*
> I build AI-powered websites and intake systems for small businesses. The idea
> is to help your site capture better information, notify you faster, and keep
> leads organized instead of scattered across calls, texts, and email. I can
> usually show a demo direction before a full build. Would it be useful if I
> sent over an example?

**Cold call (contractor)**
> Hey, my name is David with Laine Industries. Quick question — are you
> currently taking new projects in your area?

*If yes:*
> I'm building systems for contractors that turn website visitors into organized
> quote requests. The system can ask for project type, location, timeline,
> budget range, and contact info, then alert you and keep everything in a simple
> lead tracker. Would that be useful for your business?

**Cold email**
Subject: `Quick website idea for {{business_name}}`
> Hey {{first_name}}, I'm David with Laine Industries. I build AI-powered
> websites and lead systems for small businesses.
>
> I noticed {{business_name}} could potentially improve how the website captures
> quote requests or organizes new customer inquiries.
>
> This is not a generic redesign pitch. The idea is to show how your site could
> capture better information, notify you faster, and keep leads organized in one
> simple workflow.
>
> Would you be open to me sending a quick demo direction?

**Follow-up**
> Just checking back. If improving quote requests or customer intake is not a
> priority right now, no worries. If it is, I can send a simple demo direction
> for {{business_name}}.

---

## 11. 30-day plan

**Week 1 — foundation (shipped in this repo)**
- Update homepage positioning ✅
- Add lead systems page ✅
- Add contractors page ✅
- Improve SEO metadata ✅
- Confirm sitemap / robots ✅
- Confirm intake tracking ✅
- Build the first outreach list (manually or with Factory HQ / AI Work Radar)

**Week 2 — first contact**
- Send first 25 targeted outreach messages
- Talk to 5 real businesses
- Test the demo-first pitch
- Record objections
- Adjust offer language

**Week 3 — sharpen**
- Create 2–3 niche-specific landing pages or sections
- Improve contractor / service-business copy
- Add FAQ based on real objections
- Connect better lead scoring if needed

**Week 4 — decide**
- Review analytics + form submissions + replies
- Identify the best niche
- Define the first paid offer
- Decide: website build, lead system build, monthly maintenance, or pilot
  lead-gen system

---

## 12. Factory alignment (customer-friendly)

**What we tell customers:**
> Your intake becomes a clear build direction. From there, Laine Industries can
> create the website, lead form, dashboard, follow-up workflow, and delivery
> path.

**What runs behind it (internal):**
> Factory HQ handles lead finding, audits, demos, outreach, replies, intake,
> project build, delivery, and support.

Do not link public users into `/ops`, expose owner-only routes, or surface
internal endpoints/secrets from the website.
