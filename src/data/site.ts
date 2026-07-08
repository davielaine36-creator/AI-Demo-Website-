// Central site configuration. Update contact details, nav, and copy here.

/**
 * Contact email used across forms for mailto: fallbacks.
 * Set VITE_CONTACT_EMAIL in your environment (or Vercel) to override.
 * We intentionally do NOT hardcode a personal email in the codebase.
 */
export const CONTACT_EMAIL: string =
  import.meta.env.VITE_CONTACT_EMAIL || 'hello@laineindustries.co'

/**
 * Same-origin intake endpoint. The browser always POSTs form submissions here;
 * the serverless function at api/intake.ts holds the real n8n webhook URL as a
 * SERVER-ONLY secret (N8N_INTAKE_WEBHOOK_URL — note: no VITE_ prefix, so it is
 * never bundled into the public client) and forwards the payload. When the
 * server has no webhook configured it responds 503 and the form falls back to
 * the copy-to-clipboard + email draft options.
 */
export const INTAKE_ENDPOINT = '/api/intake'

/** Canonical production origin — used for canonical URLs, OG tags, and sitemap. */
export const SITE_URL = 'https://laineindustries.co'

export const SITE = {
  name: 'Laine Industries',
  tagline:
    'AI-powered websites, lead systems, and follow-up automation for small businesses.',
  message:
    'Laine Industries helps small businesses capture leads, organize customer info, and follow up faster — so opportunities stop falling through the cracks.',
  location: 'San Diego / Southern California — remote-friendly',
  // Path where the full intake PDF should live once added (see public/resources/README.md).
  intakePdfPath: '/resources/client-ai-systems-intake-questionnaire.pdf',
} as const

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Lead Systems', to: '/lead-systems' },
  { label: 'Industries', to: '/industries' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Demos', to: '/demos' },
  { label: 'About', to: '/about' },
] as const

// Primary calls-to-action reused across pages.
export const CTA = {
  intake: { label: 'Request a Demo', to: '/intake' },
  demos: { label: 'See What We Build', to: '/demos' },
  contact: { label: 'Contact Us', to: '/contact' },
} as const
