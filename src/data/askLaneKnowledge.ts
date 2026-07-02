/*
 * Ask Lane knowledge brain.
 *
 * Curated, plain-English knowledge chunks the Ask Lane chatbot answers from.
 * Content is distilled from the site copy (src/data, src/pages) and the
 * business playbook (docs/). Keep it honest: rough price ranges only, no
 * guarantees, no invented client results.
 *
 * To update Ask Lane's answers: edit or add chunks here, keep `keywords`
 * generous (they drive retrieval), and keep `content` short enough to read
 * in a chat bubble. No rebuild of anything else is required.
 */

export interface KnowledgeLink {
  label: string
  to: string
}

export interface KnowledgeChunk {
  id: string
  title: string
  category:
    | 'About'
    | 'Services'
    | 'Pricing'
    | 'Ownership & Hosting'
    | 'Monthly Support'
    | 'AI & Automation'
    | 'Working Together'
    | 'Privacy & Security'
    | 'Demos & Examples'
    | 'Next Steps'
  keywords: string[]
  content: string
  relatedLinks: KnowledgeLink[]
}

const LINKS = {
  intake: { label: 'Start the short intake', to: '/intake' },
  fullIntake: { label: 'Fill the full intake', to: '/full-intake' },
  contact: { label: 'Contact us', to: '/contact' },
  services: { label: 'See services', to: '/services' },
  demos: { label: 'Explore demos', to: '/demos' },
  howItWorks: { label: 'How it works', to: '/how-it-works' },
  smallBusinesses: { label: 'For small businesses', to: '/for-small-businesses' },
  privacy: { label: 'Privacy / data use', to: '/privacy' },
  caseStudies: { label: 'Case studies', to: '/case-studies' },
  followUpDemo: { label: 'Follow-up assistant demo', to: '/demos/follow-up-assistant' },
} satisfies Record<string, KnowledgeLink>

export const ASK_LANE_KNOWLEDGE: KnowledgeChunk[] = [
  // ── About ──────────────────────────────────────────────────────────────
  {
    id: 'what-lane-does',
    title: 'What Lane Industries does',
    category: 'About',
    keywords: [
      'what do you do',
      'what is lane',
      'about',
      'company',
      'who are you',
      'services',
      'help small business',
      'automation',
    ],
    content:
      'We help small businesses stop losing leads and time. A lot of owners have customer info scattered across texts, calls, notebooks, and memory — and follow-up slips when they are busy. We build simple systems that fix that: a clean website, one organized place for leads and customers, and follow-up messages that get drafted for you so nobody falls through the cracks. We handle the technical side so you do not have to, and we start with the smallest useful version first.',
    relatedLinks: [LINKS.services, LINKS.smallBusinesses],
  },
  {
    id: 'who-lane-is',
    title: 'Where Lane Industries is based',
    category: 'About',
    keywords: ['where', 'located', 'location', 'san diego', 'california', 'remote', 'local'],
    content:
      'Lane Industries is based in San Diego / Southern California and works remote-friendly, so location is rarely a blocker. The easiest way to reach us is the contact page or the short intake form.',
    relatedLinks: [LINKS.contact, LINKS.intake],
  },
  {
    id: 'how-it-works',
    title: 'How working with Lane works',
    category: 'About',
    keywords: [
      'how does this work',
      'process',
      'steps',
      'get started',
      'timeline',
      'what happens next',
      'onboarding',
    ],
    content:
      'The process is simple: a short intake to understand your business, then we recommend the smallest useful system with a clear price, we build and test it, and we hand it off with a walkthrough video and simple instructions. Most starter builds take from a few days to a few weeks depending on scope, and timelines assume we get your info and feedback along the way.',
    relatedLinks: [LINKS.howItWorks, LINKS.intake],
  },
  {
    id: 'why-lane',
    title: 'Why hire Lane instead of DIY or a traditional web designer',
    category: 'About',
    keywords: [
      'why you',
      'chatgpt myself',
      'do it myself',
      'web designer',
      'agency',
      'different',
      'competitors',
      'wix myself',
    ],
    content:
      'A tool is not a system. You could stitch things together yourself with ChatGPT or a site builder, but we figure out what you actually need, build the pieces so they work together, keep your data organized, and keep it running. Compared to a traditional web designer, we focus on the whole system — the site, capturing the lead, organizing it, and following up — not just a pretty brochure. And we recommend the smallest thing that solves your real problem first, not the biggest invoice.',
    relatedLinks: [LINKS.services, LINKS.demos],
  },

  // ── Services ───────────────────────────────────────────────────────────
  {
    id: 'websites',
    title: 'Websites and landing pages',
    category: 'Services',
    keywords: [
      'website',
      'landing page',
      'web design',
      'site',
      'seo',
      'online presence',
      'build a website',
      'new website',
    ],
    content:
      'The Website Starter System is a clean, mobile-friendly site that explains what you do and gives customers a clear way to reach out: a services section, contact or quote form that lands somewhere organized, and basic SEO structure. It does not include ongoing content writing, blog management, paid ads, or complex e-commerce — those are quoted separately. Rough range: about $500–$2,000 depending on pages and complexity, usually 1–3 weeks.',
    relatedLinks: [LINKS.services, LINKS.intake],
  },
  {
    id: 'existing-website',
    title: 'Already have a website or tools',
    category: 'Services',
    keywords: [
      'already have a website',
      'existing site',
      'wix',
      'squarespace',
      'godaddy',
      'wordpress',
      'google sheets',
      'improve my site',
      'redesign',
    ],
    content:
      'Already have a website or tools like Wix, Squarespace, Shopify, or Google Sheets? That is completely fine. We can often work with what you have, improve it, or add the missing pieces like a lead tracker or follow-up system. We will not make you rip out tools that are working — we will tell you honestly whether to build on what you have or start fresh.',
    relatedLinks: [LINKS.intake, LINKS.services],
  },
  {
    id: 'intake-systems',
    title: 'Intake forms and quote request systems',
    category: 'Services',
    keywords: [
      'intake form',
      'quote request',
      'quote form',
      'contact form',
      'lead form',
      'capture leads',
      'inquiries',
    ],
    content:
      'We build intake and quote-request forms that land somewhere organized instead of a cluttered inbox. A new inquiry gets captured with the details you need, you get alerted, and the lead shows up in one place with a clear next step — so quotes stop slipping through the cracks.',
    relatedLinks: [LINKS.demos, LINKS.intake],
  },
  {
    id: 'lead-tracking',
    title: 'Lead tracking and CRM dashboards',
    category: 'Services',
    keywords: [
      'crm',
      'lead tracking',
      'dashboard',
      'track customers',
      'pipeline',
      'organize leads',
      'customer tracking',
      'jobs',
      'spreadsheet',
    ],
    content:
      'The CRM / Lead Tracker gives you one organized place for names, phone numbers, job details, notes, and follow-ups — with statuses like new, contacted, quoted, scheduled, and completed, plus new-lead alerts. It replaces leads living in texts, calls, and memory. Rough range: about $750–$2,500 depending on fields, statuses, and alerts, usually 1–3 weeks. Deep integrations with large enterprise CRMs or accounting systems are scoped separately.',
    relatedLinks: [LINKS.services, LINKS.demos],
  },
  {
    id: 'alerts-reminders',
    title: 'Alerts, reminders, and scheduling support',
    category: 'Services',
    keywords: [
      'alerts',
      'reminders',
      'notifications',
      'scheduling',
      'miss a lead',
      'forget to follow up',
      'stay on top',
    ],
    content:
      'Alerts and reminders make sure the right next step happens at the right time: know the moment a new lead comes in, get reminders for same-day and later follow-ups, and see status alerts on jobs and customers. It is usually added to a dashboard build so nothing sits unnoticed.',
    relatedLinks: [LINKS.services, LINKS.intake],
  },
  {
    id: 'shopify-ops',
    title: 'Shopify / store operations support',
    category: 'Services',
    keywords: [
      'shopify',
      'ecommerce',
      'online store',
      'store operations',
      'products',
      'orders',
      'store cleanup',
    ],
    content:
      'For Shopify and small online stores we help keep operations tidy: product organization, basic store cleanup, customer-issue tracking, simple automations, and an operations dashboard. The goal is a store that stays organized and looks professional without the owner living inside admin screens.',
    relatedLinks: [LINKS.services, LINKS.intake],
  },
  {
    id: 'automation-audit',
    title: 'Automation Audit',
    category: 'Services',
    keywords: [
      'audit',
      'not sure what i need',
      'where to start',
      'review my business',
      'diagnosis',
      'assessment',
    ],
    content:
      'The Automation Audit is for owners who feel busy and disorganized but are not sure what to fix first. It is a short intake plus one call, and you get a simple written map of where leads and follow-ups are slipping, a prioritized list of 3–5 practical fixes, and a clear starter-build recommendation with rough pricing. Roughly $150–$400 (sometimes free or credited toward a build for early pilots), delivered in 3–5 days. It is the diagnosis, not the build.',
    relatedLinks: [LINKS.intake, LINKS.howItWorks],
  },

  // ── AI & Automation ────────────────────────────────────────────────────
  {
    id: 'ai-follow-up',
    title: 'AI-assisted follow-up drafts',
    category: 'AI & Automation',
    keywords: [
      'ai follow up',
      'follow up',
      'ai email',
      'ai text',
      'respond to leads',
      'draft messages',
      'ai message customers',
      'automatic reply',
    ],
    content:
      'Yes — AI can help follow up with your leads, and we start the safe way: AI drafts the follow-up email or message based on the customer status, and you (or your team) review and approve before anything sends. You get speed without risking a weird or wrong message going straight to a customer. Reusable templates and reminders are included. Rough range: about $500–$2,000, often added to a CRM/dashboard build, usually 1–2 weeks. We do not promise specific reply or conversion rates.',
    relatedLinks: [LINKS.followUpDemo, LINKS.services],
  },
  {
    id: 'ai-drafts-human-approves',
    title: 'AI drafts, a human approves',
    category: 'AI & Automation',
    keywords: [
      'human approval',
      'auto send',
      'automatic sending',
      'ai wrong',
      'ai mistakes',
      'review before send',
      'control',
      'safe ai',
    ],
    content:
      'Our default rule is: AI drafts, a human approves. AI is great at drafting and organizing fast, but it is not perfect — so nothing goes to your customers automatically unless you specifically ask for that and understand it. You stay in control of what actually sends. That is a deliberate design choice, not a limitation.',
    relatedLinks: [LINKS.followUpDemo, LINKS.howItWorks],
  },

  // ── Pricing ────────────────────────────────────────────────────────────
  {
    id: 'pricing',
    title: 'Rough pricing ranges',
    category: 'Pricing',
    keywords: [
      'cost',
      'price',
      'pricing',
      'how much',
      'expensive',
      'budget',
      'rates',
      'fees',
      'quote',
    ],
    content:
      'Pricing depends on scope, so these are rough starting ranges, not guarantees: Automation Audit ~$150–$400; Starter Website + Intake ~$500–$2,000; Lead Capture + CRM Dashboard ~$750–$2,500; AI Follow-Up Drafting ~$500–$2,000; optional Monthly Support ~$100–$500/month. There is a one-time build fee, and the monthly plan is optional. The first step is the short intake — then we recommend the simplest useful starting system with a clear, specific price. No surprises.',
    relatedLinks: [LINKS.intake, LINKS.services],
  },
  {
    id: 'timelines-revisions',
    title: 'Timelines and revisions',
    category: 'Pricing',
    keywords: [
      'how long',
      'timeline',
      'turnaround',
      'revisions',
      'changes',
      'rounds',
      'delay',
      'when will it be done',
    ],
    content:
      'Most starter builds take from a few days to a few weeks depending on scope, and you get a specific timeline with the proposal. Each deliverable includes up to two rounds of revisions — refining the agreed work, not changing the goal. New pages, features, or direction changes are welcome; they are just quoted as a small add-on or a phase 2 so nothing is built silently for free. Timelines assume feedback from you within a few business days.',
    relatedLinks: [LINKS.howItWorks, LINKS.contact],
  },

  // ── Ownership & Hosting ────────────────────────────────────────────────
  {
    id: 'managed-build',
    title: 'Lane Managed Build (the default)',
    category: 'Ownership & Hosting',
    keywords: [
      'managed build',
      'manage everything',
      'host it for me',
      'handle the tech',
      'done for me',
      'who runs it',
    ],
    content:
      'By default we do a Lane Managed Build: we build and run the technical system, and you get a live link, a short walkthrough video, and one person to contact when you want a change. You get the working system; we handle the technical plumbing. There is a one-time build fee, plus an optional monthly fee if you want us to keep hosting, supporting, and improving it.',
    relatedLinks: [LINKS.howItWorks, LINKS.intake],
  },
  {
    id: 'client-owned-build',
    title: 'Client-Owned Build',
    category: 'Ownership & Hosting',
    keywords: [
      'own the accounts',
      'my own accounts',
      'client owned',
      'own everything',
      'in house',
      'my developer',
    ],
    content:
      'If you would rather own all the technical accounts yourself from day one, we can do a Client-Owned Build: we build inside your own accounts and hand over full control. It is a bit more setup on your side, the build fee reflects that, and you cover your own tool costs directly. It suits businesses with in-house technical help or a firm preference to own everything from the start.',
    relatedLinks: [LINKS.contact, LINKS.howItWorks],
  },
  {
    id: 'transfer-later',
    title: 'Transfer Later option',
    category: 'Ownership & Hosting',
    keywords: [
      'transfer',
      'take ownership later',
      'what if you disappear',
      'migrate',
      'switch to my accounts',
      'leave',
    ],
    content:
      'Many clients start with us managing everything and take full ownership later — that is the Transfer Later option. When you ask, we migrate the system to your accounts and document the handoff for a one-time transfer fee, once invoices are current. So choosing the simple managed route now never locks you in.',
    relatedLinks: [LINKS.contact, LINKS.howItWorks],
  },
  {
    id: 'ownership',
    title: 'Who owns what',
    category: 'Ownership & Hosting',
    keywords: [
      'own the system',
      'ownership',
      'my data',
      'who owns',
      'intellectual property',
      'own my website',
    ],
    content:
      'You always own your business information, content, brand assets, and customer relationships. The technical setup depends on the project: we can manage it for you (the default), build inside your own accounts, or transfer it to you later. Your data and paid-for work are never held hostage — once invoices are paid in full, you can request an export or transfer at any time.',
    relatedLinks: [LINKS.howItWorks, LINKS.privacy],
  },
  {
    id: 'no-tech-accounts',
    title: 'Do I need GitHub, Vercel, or hosting accounts?',
    category: 'Ownership & Hosting',
    keywords: [
      'github',
      'vercel',
      'hosting',
      'technical accounts',
      'domain',
      'servers',
      'manage the tech',
      'developer tools',
    ],
    content:
      'No. Developer tools and hosting are our world, not yours. We manage all the behind-the-scenes tools, and you just get the working system, a live link, and a walkthrough. Your site lives on professional, reliable hosting that we set up and manage. If you specifically want to own those accounts, we can set that up as a Client-Owned Build instead.',
    relatedLinks: [LINKS.howItWorks, LINKS.intake],
  },

  // ── Monthly Support ────────────────────────────────────────────────────
  {
    id: 'monthly-support',
    title: 'What monthly support includes',
    category: 'Monthly Support',
    keywords: [
      'monthly support',
      'maintenance',
      'monthly fee',
      'support plan',
      'why monthly',
      'subscription',
      'ongoing',
    ],
    content:
      'Monthly support is optional and month-to-month — you can start, pause, or stop it whenever you like. It covers hosting and keeping the system online, monitoring, small fixes and tweaks, priority answers to your questions, and a light check-in on what to improve next. Rough range: about $100–$500/month depending on scope and response time. The idea is simple: the build fee pays for the build; the monthly fee keeps it alive.',
    relatedLinks: [LINKS.services, LINKS.contact],
  },
  {
    id: 'monthly-support-excludes',
    title: 'What monthly support does not include',
    category: 'Monthly Support',
    keywords: [
      'not included',
      'excluded',
      'new features',
      'extra work',
      'add ons',
      'unlimited support',
      'sla',
    ],
    content:
      'Monthly support keeps what we built running smoothly — it is not unlimited work. Brand-new features, extra pages, dashboards, or whole new systems are separate projects we quote clearly. It also does not cover major redesigns, third-party tool subscription costs (larger usage-based costs are passed through, flagged in advance), or hard uptime and results guarantees. When a request is bigger than a small tweak, we quote it as an add-on — no surprises.',
    relatedLinks: [LINKS.contact, LINKS.services],
  },
  {
    id: 'stop-monthly-support',
    title: 'What happens if monthly support stops',
    category: 'Monthly Support',
    keywords: [
      'stop paying',
      'cancel',
      'stop monthly',
      'quit the plan',
      'end support',
      'what happens if i stop',
    ],
    content:
      'The original build and handoff are separate from ongoing support. If the monthly plan stops, we pause updates, monitoring, troubleshooting, and managed hosting — after a reminder and a friendly grace period, never as a surprise. Your data and paid-for work are not held hostage: once invoices are current, we help you export or transfer the system, and restoring service after payment is prompt (a small reactivation fee may apply).',
    relatedLinks: [LINKS.contact, LINKS.howItWorks],
  },
  {
    id: 'something-breaks',
    title: 'What if something breaks',
    category: 'Monthly Support',
    keywords: [
      'broken',
      'breaks',
      'bug',
      'not working',
      'fix',
      'down',
      'error on my site',
    ],
    content:
      'If you are on a support plan, you message us and we fix it — that is what the plan is for. If you are not, we still help, just on a per-fix or hourly basis. Either way you are not left stranded. Every build also includes support through handoff plus a short settling-in window for fixes to what we delivered.',
    relatedLinks: [LINKS.contact, LINKS.services],
  },

  // ── Working Together ───────────────────────────────────────────────────
  {
    id: 'what-lane-needs',
    title: 'What Lane needs from you',
    category: 'Working Together',
    keywords: [
      'what do you need from me',
      'requirements',
      'provide',
      'materials',
      'logo',
      'photos',
      'access',
      'to get started',
    ],
    content:
      'Usually: your business info and services, a logo or photos if you have them, your current website or domain details, and a clear picture of what happens today when a lead contacts you. If we ever need access to a tool, we prefer a collaborator invite instead of a password — that way you never share credentials and you can remove our access anytime.',
    relatedLinks: [LINKS.intake, LINKS.fullIntake],
  },
  {
    id: 'no-sensitive-data',
    title: 'Please do not send sensitive information',
    category: 'Privacy & Security',
    keywords: [
      'password',
      'passwords',
      'api key',
      'payment info',
      'credit card',
      'sensitive data',
      'credentials',
      'secrets',
      'customer list',
    ],
    content:
      'Please do not send passwords, API keys, payment information, private customer lists, or other sensitive data through this chat or the website forms. We never ask for passwords — when a project needs access to a tool, we handle it separately and prefer a collaborator invite, so you keep control and can revoke access anytime.',
    relatedLinks: [LINKS.privacy, LINKS.contact],
  },
  {
    id: 'privacy',
    title: 'Privacy and data use',
    category: 'Privacy & Security',
    keywords: [
      'privacy',
      'data use',
      'my information',
      'sell my data',
      'delete my data',
      'gdpr',
      'safe',
      'secure',
    ],
    content:
      'We use what you submit only to understand your business and respond with useful recommendations and follow-up. We do not sell your information. Systems we build collect only the data they actually need, we keep client data separated, and you can email us anytime to request deletion of what you have submitted. The privacy page has the full plain-English note.',
    relatedLinks: [LINKS.privacy, LINKS.contact],
  },

  // ── Demos & Examples ───────────────────────────────────────────────────
  {
    id: 'demos',
    title: 'What the demos show',
    category: 'Demos & Examples',
    keywords: [
      'demo',
      'demos',
      'examples',
      'see it',
      'preview',
      'show me',
      'sample',
    ],
    content:
      'The demos are honest, static examples built with example data — no real customers, nothing live, nothing saved or sent. They show what a lead capture system, an AI follow-up assistant (drafts with human review), a small-business dashboard, and a Shopify operations helper look like in practice, so you can picture the system before anything is built.',
    relatedLinks: [LINKS.demos, LINKS.followUpDemo],
  },
  {
    id: 'case-studies',
    title: 'Case studies and pilots',
    category: 'Demos & Examples',
    keywords: [
      'case studies',
      'clients',
      'results',
      'testimonials',
      'proof',
      'portfolio',
      'past work',
    ],
    content:
      'Our case studies are honest, in-progress pilots — real builds we describe as pilots, not finished success stories with invented numbers. We only share real, approved outcomes, and we update them as real results appear. Being early and honest is part of how we work.',
    relatedLinks: [LINKS.caseStudies, LINKS.demos],
  },

  // ── Guardrails / expectations ──────────────────────────────────────────
  {
    id: 'no-guarantees',
    title: 'What Lane will not promise',
    category: 'Working Together',
    keywords: [
      'guarantee',
      'guaranteed sales',
      'more revenue',
      'more customers',
      'roi',
      'results',
      'promise',
      'rankings',
    ],
    content:
      'We do not guarantee revenue, lead counts, sales, rankings, or specific business outcomes — no honest person should, because too much depends on your market and follow-through. What we can do is improve how leads get captured, organized, and followed up with, so your business has a better process and fewer missed opportunities. We are always honest about what a system can and cannot reasonably do.',
    relatedLinks: [LINKS.howItWorks, LINKS.caseStudies],
  },

  // ── Next Steps ─────────────────────────────────────────────────────────
  {
    id: 'what-to-start-with',
    title: 'Not sure what to start with',
    category: 'Next Steps',
    keywords: [
      'what should i start with',
      'where do i start',
      'not sure',
      'recommend',
      'first step',
      'website or system',
      'contractor',
      'best option',
    ],
    content:
      'Not knowing what you need is completely normal — figuring that out is our job, not yours. As a rule of thumb: if customers cannot find or understand you, start with the website; if leads are slipping through texts and memory, start with the lead tracker; if you are slow to reply, start with AI-drafted follow-ups. The short intake takes a few minutes, and afterwards we recommend the cleanest single starting point with a clear price.',
    relatedLinks: [LINKS.intake, LINKS.smallBusinesses],
  },
  {
    id: 'next-steps',
    title: 'Best next step',
    category: 'Next Steps',
    keywords: [
      'next step',
      'contact',
      'talk',
      'call',
      'book',
      'reach out',
      'sign up',
      'get a quote',
    ],
    content:
      'The best next step is the short intake form — a few quick questions so we can recommend the simplest useful starting point and put together a clear price. Prefer to talk first? Use the contact page. Want to see examples before anything else? Browse the demos.',
    relatedLinks: [LINKS.intake, LINKS.contact, LINKS.demos],
  },
]

/**
 * Default chunks used when a question matches nothing — enough to introduce
 * Lane and point at a useful next step.
 */
export const DEFAULT_CHUNK_IDS = ['what-lane-does', 'pricing', 'next-steps']
