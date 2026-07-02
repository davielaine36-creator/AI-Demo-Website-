export interface Demo {
  id: string
  title: string
  description: string
  demonstrates: string[]
  /** Call-to-action label for the card's button (e.g. "Open lead capture demo"). */
  cta?: string
  /** Internal route to an interactive demo page on this site. */
  to?: string
  /** External demo link, if one is ever hosted elsewhere. */
  href?: string
}

export const DEMOS: Demo[] = [
  {
    id: 'lead-capture',
    title: 'Lead Capture System',
    description:
      'Follow an example quote request from first inquiry to won job — captured, summarized for the owner, and moved through simple stages.',
    demonstrates: [
      'Simple quote request form',
      'Clean lead summary for the owner',
      'Pipeline stages from new to won',
      'A clear next step for every lead',
    ],
    cta: 'Open lead capture demo',
    to: '/demos/lead-capture',
  },
  {
    id: 'follow-up-assistant',
    title: 'Follow-Up Assistant',
    description:
      'AI drafts the follow-up message. The owner reviews, edits, and sends. Nothing goes out automatically.',
    demonstrates: [
      'An example lead waiting on a reply',
      'AI-drafted follow-up messages',
      'Human review before anything sends',
      'Why drafts come before automation',
    ],
    cta: 'Open follow-up demo',
    to: '/demos/follow-up-assistant',
  },
  {
    id: 'small-business-dashboard',
    title: 'Small Business Dashboard',
    description:
      'One simple screen for leads, follow-ups, estimates, and scheduled jobs — designed for owners, not developers.',
    demonstrates: [
      'Weekly numbers at a glance',
      'Lead list with statuses and next steps',
      'A short, plain task list',
    ],
    cta: 'Open dashboard demo',
    to: '/demos/small-business-dashboard',
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
