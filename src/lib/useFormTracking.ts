import { useRef } from 'react'
import { trackEvent } from './analytics'

/**
 * Map a form identifier to a clear event namespace so the marketing funnel is
 * legible in analytics:
 *
 *   contact     → contact_form_*
 *   intake      → intake_form_*
 *   full-intake → full_intake_form_*
 */
function eventBase(form: string): string {
  return `${form.replace(/-/g, '_')}_form`
}

/**
 * Small helper for consistent form-funnel analytics across the contact, intake,
 * and full-intake forms. Emits three events, namespaced by form type:
 *
 *   - <form>_form_start          fired once, on the first field interaction
 *   - <form>_form_submit         fired on a submit attempt that passes validation
 *   - <form>_form_submit_success fired when the submission is confirmed sent
 *
 * We never attach field values — only anonymous funnel signals.
 */
export function useFormTracking(form: string) {
  const started = useRef(false)
  const base = eventBase(form)

  const trackStart = () => {
    if (started.current) return
    started.current = true
    trackEvent(`${base}_start`, { form })
  }

  const trackSubmit = () => trackEvent(`${base}_submit`, { form })

  const trackSuccess = (channel?: string) =>
    trackEvent(`${base}_submit_success`, { form, channel })

  return { trackStart, trackSubmit, trackSuccess }
}
