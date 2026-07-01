export interface Demo {
  id: string
  title: string
  description: string
  demonstrates: string[]
  // TODO: replace with a real hosted demo link or embed once available.
  href?: string
}

export const DEMOS: Demo[] = [
  {
    id: 'lead-capture',
    title: 'AI Lead Capture System',
    description:
      'A customer fills out a form, the lead is saved, the owner is alerted, and a follow-up draft is created.',
    demonstrates: [
      'Lead form',
      'Dashboard',
      'Alert',
      'Follow-up draft',
      'Simple owner workflow',
    ],
  },
  {
    id: 'crm-dashboard',
    title: 'CRM / Project Dashboard',
    description:
      'A lightweight dashboard for tracking customers, jobs, statuses, notes, and next steps.',
    demonstrates: [
      'Customer records',
      'Job status',
      'Follow-up date',
      'Notes',
      'Priority',
    ],
  },
  {
    id: 'n8n-automation',
    title: 'n8n Automation Flow',
    description:
      'A workflow that connects forms, email, alerts, spreadsheets, and AI drafting.',
    demonstrates: [
      'Trigger',
      'Data cleanup',
      'Notification',
      'Draft generation',
      'Owner review',
    ],
  },
  {
    id: 'shopify-ops',
    title: 'Shopify Operations Helper',
    description:
      'A simple system for organizing store tasks, product work, customer issues, and operational follow-ups.',
    demonstrates: [
      'Product / task status',
      'Customer issue tracking',
      'Draft replies',
      'Store operations dashboard',
    ],
  },
]
