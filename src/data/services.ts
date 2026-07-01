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
    summary: 'A clean, mobile-friendly site that explains what you do.',
    includes: [
      'Simple website or landing page',
      'Clear services section',
      'Contact / quote form',
      'Mobile-friendly design',
      'Basic SEO structure',
      'Call-to-action sections',
    ],
    benefit:
      'Helps customers understand what you do and gives them a clear path to reach out.',
  },
  {
    id: 'crm-lead-tracker',
    title: 'CRM / Lead Tracker',
    summary: 'One organized place for names, jobs, notes, and follow-ups.',
    includes: [
      'Simple dashboard',
      'Lead / contact tracking',
      'Job or project status',
      'Notes',
      'Follow-up fields',
      'Owner view',
    ],
    benefit:
      'Keeps customer information organized so leads and jobs do not live only in texts, memory, or scattered notes.',
  },
  {
    id: 'ai-follow-up',
    title: 'AI Follow-Up Assistant',
    summary: 'Drafts your follow-up messages so you never start from zero.',
    includes: [
      'Drafted follow-up emails or messages',
      'Reply templates',
      'Customer status context',
      'Optional owner approval before sending',
    ],
    benefit:
      'Helps the owner respond faster without writing every message from scratch.',
  },
  {
    id: 'alerts-reminders',
    title: 'Alerts & Reminders',
    summary: 'Know the moment a lead comes in or a job needs attention.',
    includes: [
      'New lead alerts',
      'Follow-up reminders',
      'Job / customer status alerts',
      'Optional n8n workflow integration',
    ],
    benefit:
      'Reduces missed opportunities and helps the business stay on top of important next steps.',
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
