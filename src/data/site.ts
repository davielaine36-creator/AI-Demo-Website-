// Central site configuration. Update contact details, nav, and copy here.

/**
 * Contact email used across forms for mailto: fallbacks.
 * Set VITE_CONTACT_EMAIL in your environment (or Vercel) to override.
 * We intentionally do NOT hardcode a personal email in the codebase.
 */
export const CONTACT_EMAIL: string =
  import.meta.env.VITE_CONTACT_EMAIL || 'hello@laneindustries.dev'

/**
 * Optional n8n webhook. When present, forms POST their payload here.
 * When absent, forms fall back to copy-to-clipboard + email draft.
 */
export const N8N_INTAKE_WEBHOOK_URL: string | undefined =
  import.meta.env.VITE_N8N_INTAKE_WEBHOOK_URL

export const SITE = {
  name: 'Laine Industries',
  tagline:
    'Simple websites, CRM dashboards, and AI follow-up systems for small businesses.',
  message:
    'We help small businesses turn scattered leads, missed follow-ups, and outdated websites into one simple system.',
  location: 'San Diego / Southern California — remote-friendly',
  // Path where the full intake PDF should live once added (see public/resources/README.md).
  intakePdfPath: '/resources/client-ai-systems-intake-questionnaire.pdf',
} as const

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'For Small Businesses', to: '/for-small-businesses' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Demos', to: '/demos' },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'About', to: '/about' },
] as const

// Primary calls-to-action reused across pages.
export const CTA = {
  intake: { label: 'Start With the Intake Form', to: '/intake' },
  demos: { label: 'See What We Build', to: '/demos' },
  contact: { label: 'Contact Us', to: '/contact' },
} as const
