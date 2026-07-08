export interface Service {
  id: string
  title: string
  summary: string
  includes: string[]
  benefit: string
}

export const SERVICES: Service[] = [
  {
    id: 'website-starter',
    title: 'Website Starter System',
    summary:
      'A clean business website or landing page that explains what you do and gives customers a clear next step.',
    includes: [
      'Homepage or landing page',
      'Service sections',
      'Clear call-to-action structure',
      'Contact / quote form',
      'Mobile-first layout',
      'Basic SEO structure',
      'Analytics hooks',
      'Deployment support',
    ],
    benefit:
      'Helps customers understand what you do and gives them a clear path to reach out.',
  },
  {
    id: 'lead-capture',
    title: 'Lead Capture System',
    summary:
      'A page + form flow designed to turn visitors into organized quote requests.',
    includes: [
      'Landing page',
      'Quote / request form',
      'Service-area fields',
      'Budget / timeline fields',
      'Lead source tracking',
      'Confirmation state',
      'Admin notification',
      'CRM handoff',
    ],
    benefit:
      'Turns interest into structured, followed-up requests instead of scattered calls and texts.',
  },
  {
    id: 'crm-lead-tracker',
    title: 'CRM / Lead Tracker',
    summary:
      'One organized place for names, phone numbers, project details, status, notes, and next follow-up.',
    includes: [
      'Lead list',
      'Status pipeline',
      'Notes',
      'Lead source',
      'Follow-up date',
      'Owner view',
      'Simple dashboard',
    ],
    benefit:
      'Keeps customer information organized so leads and jobs do not live only in texts, memory, or scattered notes.',
  },
  {
    id: 'ai-follow-up',
    title: 'AI Follow-Up Assistant',
    summary:
      'AI-drafted follow-up messages so owners can respond faster without writing from scratch.',
    includes: [
      'Follow-up templates',
      'Reply drafts',
      'Context from the lead / customer record',
      'Optional owner approval',
      'Tone guidelines',
    ],
    benefit:
      'Helps the owner respond faster without writing every message from scratch.',
  },
  {
    id: 'alerts-reminders',
    title: 'Alerts & Automations',
    summary:
      'Notifications when a lead comes in, when someone needs a response, or when a customer needs attention.',
    includes: [
      'New lead alerts',
      'Follow-up reminders',
      'Status alerts',
      'n8n workflow integration',
      'Resend / email support',
      'Future SMS option if supported',
    ],
    benefit:
      'Reduces missed opportunities and helps the business stay on top of important next steps.',
  },
  {
    id: 'local-growth',
    title: 'Local Growth / Lead System',
    summary:
      'A practical lead-generation foundation for local service businesses.',
    includes: [
      'Service landing pages',
      'Quote forms',
      'Lead tracking',
      'Lead qualification',
      'CRM routing',
      'Follow-up automation',
      'Reporting',
      'Optional Google Ads / SEO readiness',
    ],
    benefit:
      'Builds the system needed to capture and manage leads — not a promise of leads, but the foundation to convert the interest you earn.',
  },
  {
    id: 'shopify-ops',
    title: 'Shopify / Store Operations Support',
    summary: 'Keep an online store tidy, organized, and professional.',
    includes: [
      'Product organization',
      'Basic Shopify cleanup',
      'Customer flow improvements',
      'Simple automations',
      'Operational dashboards',
    ],
    benefit:
      'Helps small online stores stay organized and look more professional.',
  },
]

export interface StarterPackage {
  name: string
  description: string
}

export const STARTER_PACKAGES: StarterPackage[] = [
  {
    name: 'Automation Audit',
    description:
      'We review how leads, follow-ups, and manual work flow through your business and map the highest-value fixes first.',
  },
  {
    name: 'Starter Automation Build',
    description:
      'A focused first build — usually a form, a dashboard, and one automation — that solves your most painful gap.',
  },
  {
    name: 'AI Lead System',
    description:
      'Lead capture, organized records, alerts, and AI-drafted follow-ups working together as one simple system.',
  },
  {
    name: 'Monthly Maintenance',
    description:
      'Ongoing tweaks, support, and small improvements so the system keeps working as your business changes.',
  },
]
