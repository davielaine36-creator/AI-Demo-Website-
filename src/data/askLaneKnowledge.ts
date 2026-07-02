/**
 * Ask Lane — knowledge brain.
 *
 * Curated, plain-English knowledge chunks that help the "Ask Lane" concierge
 * point a small-business owner toward the right starting system and answer the
 * common "what/how much/how long/do I own it" questions.
 *
 * Source of truth: docs/client-decision-guide.md. When that guide changes,
 * update these chunks to match. All prices/timelines are ROUGH RANGES and
 * starting points — never quotes or guarantees.
 *
 * Note: Ask Lane is a guided concierge, not a live AI chat. This module is the
 * static knowledge it draws from (and a ready-made knowledge base for a future
 * AI upgrade). No backend, no API, no data leaves the browser.
 */

// ---------------------------------------------------------------------------
// Starting points — used to enrich the concierge's recommendation with an
// honest timeline, rough investment range, and what a build typically includes.
// ---------------------------------------------------------------------------

export type StartingPointId =
  | 'website'
  | 'lead-tracker'
  | 'follow-up'
  | 'dashboard'
  | 'scheduling'
  | 'shopify'
  | 'not-sure'

export interface StartingPoint {
  id: StartingPointId
  /** Short label for the recommended starting system. */
  label: string
  /** Rough, honest delivery range once we've started. */
  timeline: string
  /** Rough, honest investment range — a starting point, not a quote. */
  investment: string
  /** A few things a build like this typically includes. */
  includes: string[]
}

export const STARTING_POINTS: Record<StartingPointId, StartingPoint> = {
  website: {
    id: 'website',
    label: 'Website / landing page',
    timeline: 'About 1–3 weeks',
    investment: 'Roughly $500–$2,000 to build (depends on pages)',
    includes: [
      'Clean, mobile-friendly site or landing page',
      'Clear services section',
      'Contact / quote form that lands somewhere organized',
      'Basic SEO structure',
    ],
  },
  'lead-tracker': {
    id: 'lead-tracker',
    label: 'Lead capture + CRM dashboard',
    timeline: 'About 1–3 weeks',
    investment: 'Roughly $750–$2,500 to build (depends on fields & alerts)',
    includes: [
      'One place for names, jobs, notes, and statuses',
      'Follow-up fields and reminders',
      'New-lead alerts so you respond faster',
      'A clear next step for every lead',
    ],
  },
  'follow-up': {
    id: 'follow-up',
    label: 'AI-assisted follow-up drafts',
    timeline: 'About 1–2 weeks (faster paired with a dashboard)',
    investment: 'Roughly $500–$2,000, often added onto a dashboard',
    includes: [
      'Follow-up messages drafted from customer status',
      'Reusable reply templates',
      'Owner approval before anything sends',
      'Same-day, few-day, and later reminders',
    ],
  },
  dashboard: {
    id: 'dashboard',
    label: 'Small business dashboard (CRM)',
    timeline: 'About 1–3 weeks',
    investment: 'Roughly $750–$2,500 to build (depends on scope)',
    includes: [
      'One owner screen: what’s new, due, and needs attention',
      'Lead and job statuses',
      'Notes and follow-up fields',
      'Simple, plain-English layout',
    ],
  },
  scheduling: {
    id: 'scheduling',
    label: 'Alerts & reminders',
    timeline: 'Usually built alongside a dashboard',
    investment: 'Often bundled into a build; automation support ~$200–$500/mo',
    includes: [
      'New-lead alerts',
      'Follow-up and next-step reminders',
      'Job / customer status alerts',
      'Optional automation to connect the pieces',
    ],
  },
  shopify: {
    id: 'shopify',
    label: 'Shopify / store operations support',
    timeline: 'Depends on scope — we map the store first',
    investment: 'Scoped after a quick look at your store',
    includes: [
      'Product organization and basic cleanup',
      'Customer-issue tracking',
      'Simple operations dashboard',
      'Small, practical automations',
    ],
  },
  'not-sure': {
    id: 'not-sure',
    label: 'Short intake → Automation Audit',
    timeline: 'About 3–5 days for the audit',
    investment: '~$150–$400 (often free or credited for early pilots)',
    includes: [
      'A short intake and one call',
      'A written map of where leads & follow-ups slip',
      'A prioritized list of 3–5 practical fixes',
      'A recommended smallest-useful first build',
    ],
  },
}

// ---------------------------------------------------------------------------
// FAQ — the common questions Ask Lane can answer directly, in plain English.
// Kept honest: rough ranges, no guarantees, not legal advice.
// ---------------------------------------------------------------------------

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export const ASK_LANE_FAQ: FaqItem[] = [
  {
    id: 'what-should-i-pick',
    question: 'What should I pick if I’m not sure?',
    answer:
      'Start with the short intake or a quick Automation Audit. We look at how your business runs today and recommend the single smallest system that fixes your most painful problem first — instead of building everything at once.',
  },
  {
    id: 'cost',
    question: 'How much does it cost?',
    answer:
      'Rough starting ranges: a website/landing page is about $500–$2,000, a lead-capture + dashboard about $750–$2,500, and AI follow-up drafting about $500–$2,000 (often added onto a dashboard). These are starting points, not quotes — the final price depends on scope and is confirmed in a short proposal.',
  },
  {
    id: 'timeline',
    question: 'How long does it take?',
    answer:
      'Most first builds land in about 1–3 weeks once we’ve started; a quick audit is 3–5 days. Timelines assume feedback and info arrive within a couple of business days — if we’re waiting on you, the date moves by the delay.',
  },
  {
    id: 'monthly-support',
    question: 'Do I need monthly support?',
    answer:
      'It’s optional. Monthly support covers hosting, keeping things running, and small tweaks — roughly $100–$500/mo depending on what was built. It’s month-to-month and you can start, pause, or cancel anytime.',
  },
  {
    id: 'ownership',
    question: 'Do I own the system and my content?',
    answer:
      'You always own your business content and customer relationships. Technical ownership (code, hosting, accounts) depends on the model in your proposal: Lane Managed Build (we host and run it — the default), Client-Owned Build (built on your accounts), or Transfer Later (start managed, take ownership later for a one-time transfer fee).',
  },
  {
    id: 'guarantees',
    question: 'Can you guarantee more sales or results?',
    answer:
      'No — and we’ll always be honest about that. We build useful systems that help you respond faster and stay organized, but we don’t promise specific revenue, sales, or lead numbers.',
  },
  {
    id: 'ai-auto-messages',
    question: 'Will AI message my customers automatically?',
    answer:
      'No. AI drafts the message and you approve before anything sends. Nothing goes out to your customers automatically unless you specifically approve that in writing for a well-understood workflow.',
  },
  {
    id: 'what-you-need',
    question: 'What do you need from me to start?',
    answer:
      'Usually your business name and contact info, your services, any logo/photos you have, your current website/domain (if any), a quick description of what happens when a lead comes in, and who should get alerts. Rough answers are fine — we can work from those.',
  },
  {
    id: 'data-safety',
    question: 'Is my data safe? What about passwords?',
    answer:
      'We never ask you to text or email passwords — we use secure invites and the least access needed, and you can remove access anytime. We collect only the data a system needs, handle it carefully, and honor reasonable data and deletion requests.',
  },
  {
    id: 'cancel',
    question: 'What happens if I want to stop?',
    answer:
      'Monthly support is month-to-month — cancel anytime. If it stops, active hosting/support stops too, but your data and paid-for work are never held hostage: once invoices are paid in full we provide an export or arrange a transfer.',
  },
  {
    id: 'contractor',
    question: 'What should a contractor or home-service business start with?',
    answer:
      'Usually lead capture + a CRM dashboard with fast new-lead alerts, so quote requests stop scattering across calls, texts, and email. Add AI follow-up drafts once leads are landing in one place. Avoid starting with complex scheduling or invoicing.',
  },
  {
    id: 'shopify-start',
    question: 'What should a Shopify store start with?',
    answer:
      'Store operations support — tidy up products, track customer issues, and set up a simple operations dashboard. Avoid chasing complex custom app development before the day-to-day basics are organized.',
  },
]

// ---------------------------------------------------------------------------
// Knowledge chunks — the broader "brain" (a superset of the FAQ), grouped by
// topic. Useful for the concierge today and as a knowledge base for a future
// AI upgrade. Each chunk maps a few likely questions to one plain answer.
// ---------------------------------------------------------------------------

export type KnowledgeCategory =
  | 'choosing'
  | 'pricing'
  | 'timeline'
  | 'scope'
  | 'ownership'
  | 'legal-trust'
  | 'readiness'
  | 'industry'

export interface KnowledgeChunk {
  id: string
  category: KnowledgeCategory
  title: string
  /** Example questions this chunk answers. */
  questions: string[]
  answer: string
}

export const ASK_LANE_KNOWLEDGE: KnowledgeChunk[] = [
  {
    id: 'choosing-start-small',
    category: 'choosing',
    title: 'Start with the smallest useful system',
    questions: [
      'What should I pick?',
      'Where do I start?',
      'What if I don’t know what I need?',
    ],
    answer:
      'Start with the smallest system that fixes your most painful problem first. If people can’t find or contact you, start with a website. If leads get lost, start with an intake form + lead tracker. If you forget to follow up, start with AI-assisted follow-up drafts. If your process is messy, start with a dashboard. Not sure? Start with the short intake or an Automation Audit and we’ll recommend one starting point.',
  },
  {
    id: 'choosing-managed',
    category: 'choosing',
    title: 'When you just want it handled',
    questions: [
      'What if I don’t want to manage the tech?',
      'Can you just run it for me?',
    ],
    answer:
      'If you’d rather not touch the technical side at all, a Lane Managed Build with optional monthly support is the fit: we build it, host it, keep it running, and you get one point of contact for changes.',
  },
  {
    id: 'pricing-builds',
    category: 'pricing',
    title: 'Rough build pricing',
    questions: [
      'How much does it cost?',
      'What are your prices?',
      'What’s the price range?',
    ],
    answer:
      'Rough starting ranges for early builds: Automation Audit ~$150–$400 (often free/credited for pilots); website/landing page ~$500–$2,000; lead capture + CRM dashboard ~$750–$2,500; AI follow-up drafting ~$500–$2,000 (often added to a dashboard). Bigger or custom systems are scoped separately. These are starting points, confirmed by scope in a proposal — not guarantees.',
  },
  {
    id: 'pricing-monthly',
    category: 'pricing',
    title: 'Monthly support pricing',
    questions: [
      'How much is monthly support?',
      'What does ongoing support cost?',
    ],
    answer:
      'Optional monthly support runs roughly $100–$500/mo depending on what was built — from Basic Website Care (~$50–$150/mo) up to a higher-touch managed system (~$400–$1,000+/mo). It’s month-to-month and you can cancel anytime.',
  },
  {
    id: 'pricing-payment',
    category: 'pricing',
    title: 'How payment works',
    questions: [
      'How do I pay?',
      'Do you take a deposit?',
      'What’s the payment schedule?',
    ],
    answer:
      'There’s a one-time build fee (typically 50% deposit to start, 50% on delivery) and an optional monthly fee if you want us to keep hosting and supporting it. Work starts after the deposit clears. Any larger third-party tool costs are flagged clearly in advance — never a surprise.',
  },
  {
    id: 'timeline-ranges',
    category: 'timeline',
    title: 'How long builds take',
    questions: [
      'How long does it take?',
      'What’s the timeline?',
      'When would it be ready?',
    ],
    answer:
      'Rough timelines once we’ve started: audit 3–5 days; simple website ~1–2 weeks; website + intake or a dashboard ~1–3 weeks; follow-up drafting ~1–2 weeks. Larger custom projects are scoped separately and take longer. Client delays move the date — we assume feedback within about 2–3 business days.',
  },
  {
    id: 'scope-included',
    category: 'scope',
    title: 'What’s included in a build',
    questions: [
      'What’s included?',
      'What do I get?',
      'How many revisions?',
    ],
    answer:
      'A build includes the agreed pages/features, basic setup, testing, a clear handoff, a short walkthrough, up to two rounds of revisions per deliverable, and a short settling-in window (about 7–14 days) for fixes to what we delivered.',
  },
  {
    id: 'scope-excluded',
    category: 'scope',
    title: 'What’s not included unless scoped',
    questions: [
      'What’s not included?',
      'What costs extra?',
      'Do you do unlimited edits?',
    ],
    answer:
      'Not included unless it’s specifically scoped: unlimited revisions, guaranteed sales/revenue, legal/tax/compliance advice, paid ads, unlimited or 24/7 support, complex custom software beyond scope, automatic AI messages without approval, work before a deposit, and third-party tool subscription costs (unless stated). New requests are a small add-on or a phase 2, quoted separately.',
  },
  {
    id: 'ownership-models',
    category: 'ownership',
    title: 'Who owns and runs the system',
    questions: [
      'Do I own the system?',
      'Do I own the code?',
      'Can I transfer it later?',
    ],
    answer:
      'You always own your business content and customer relationships. For the technical side there are three models: Lane Managed Build (we host and run it — the default), Client-Owned Build (built on your accounts, you own it from day one), and Transfer Later (start managed, take full ownership later for a one-time transfer fee). Which one applies is written into your proposal.',
  },
  {
    id: 'ownership-stop-paying',
    category: 'ownership',
    title: 'What happens if support stops',
    questions: [
      'What if I cancel?',
      'What happens if I stop paying monthly?',
      'Will I lose my data?',
    ],
    answer:
      'Monthly support is month-to-month. If it stops, active hosting/support stops too — usually a reminder, then a short grace period, then the hosted system pauses, and after a longer window it may go offline. Your data and paid-for work are never held hostage: once invoices are paid in full, we provide an export or arrange a transfer (a transfer fee may apply).',
  },
  {
    id: 'legal-guarantees',
    category: 'legal-trust',
    title: 'No guaranteed results',
    questions: [
      'Can you guarantee sales?',
      'Will this make me more money?',
      'Do you guarantee results?',
    ],
    answer:
      'No. We build useful systems that help you respond faster and stay organized, but we don’t guarantee revenue, sales, lead counts, or specific outcomes. We’ll always be honest about what a system can and can’t reasonably do.',
  },
  {
    id: 'legal-ai-approval',
    category: 'legal-trust',
    title: 'AI drafts, a human approves',
    questions: [
      'Will AI message my customers automatically?',
      'Does AI send messages on its own?',
    ],
    answer:
      'No. AI drafts the message and you approve before anything sends. Nothing reaches your customers automatically unless you’ve explicitly approved that, in writing, for a specific well-understood workflow.',
  },
  {
    id: 'legal-access-security',
    category: 'legal-trust',
    title: 'Access, passwords, and data safety',
    questions: [
      'Do you need my passwords?',
      'Is my data safe?',
      'How do you get access?',
    ],
    answer:
      'We never ask you to text or email passwords — we use secure collaborator invites and the least access needed, for the least time, and you can remove access anytime. Please don’t send secret keys, payment details, or sensitive customer data over chat. We collect only what a system needs and honor reasonable data and deletion requests. This isn’t legal advice — formal terms are confirmed in writing.',
  },
  {
    id: 'legal-contract',
    category: 'legal-trust',
    title: 'Contracts and legal advice',
    questions: [
      'Do I need a contract?',
      'Do you give legal advice?',
      'What am I agreeing to?',
    ],
    answer:
      'Every build is written up as a plain proposal covering scope, timeline, price, and terms. We provide plain working agreements, not legal advice — for anything formal or high-value, an attorney’s review is recommended and final terms should always be confirmed in writing.',
  },
  {
    id: 'readiness-checklist',
    category: 'readiness',
    title: 'What to prepare to start',
    questions: [
      'What do you need from me?',
      'How do I get ready?',
      'What info should I bring?',
    ],
    answer:
      'Handy to have: your business name and contact info, your services, any logo/photos, your current website/domain (if any), a quick note on what happens when a lead comes in, examples of your current messages or forms, who should receive alerts, and what success would look like. Rough answers are fine — and one main point of contact keeps things moving.',
  },
  {
    id: 'industry-contractor',
    category: 'industry',
    title: 'Contractor / home-service business',
    questions: [
      'What should a contractor start with?',
      'I run a fence company, what do I need?',
    ],
    answer:
      'Start with lead capture + a CRM dashboard and fast new-lead alerts, so quote requests stop scattering across calls, texts, and email. Add AI follow-up drafts once leads land in one place. Avoid starting with complex scheduling or invoicing integrations.',
  },
  {
    id: 'industry-training',
    category: 'industry',
    title: 'Training / education business',
    questions: [
      'What should a training school start with?',
      'I run a training or certification business.',
    ],
    answer:
      'Start with a clear website for course info plus an inquiry intake, then follow-up reminders for renewals or requalification. Avoid building a full learning-management platform up front — start with clear info and captured inquiries.',
  },
  {
    id: 'industry-cleaning',
    category: 'industry',
    title: 'Cleaning / window service',
    questions: [
      'What should a cleaning business start with?',
      'I run a window cleaning company.',
    ],
    answer:
      'Start with an intake form + lead tracker with fast alerts so you can respond quickly, then add follow-up drafting to re-engage past customers. Avoid over-automating messaging early — keep owner approval on follow-ups.',
  },
  {
    id: 'industry-shopify',
    category: 'industry',
    title: 'Shopify / ecommerce store',
    questions: [
      'What should a Shopify store start with?',
      'I run an online store.',
    ],
    answer:
      'Start with store operations support — product organization, customer-issue tracking, and a simple operations dashboard. Avoid chasing complex custom app development before the day-to-day basics are tidy.',
  },
  {
    id: 'industry-solo',
    category: 'industry',
    title: 'Solo service provider',
    questions: [
      'I’m a one-person business, what should I start with?',
      'What works for a solo provider?',
    ],
    answer:
      'Start with a simple website + contact form, or a light lead tracker — whichever pain is bigger. Keep it to one screen and one workflow; a solo owner needs simple, not a full CRM suite.',
  },
]
