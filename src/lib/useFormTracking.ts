import { useRef } from 'react'
import { trackEvent } from './analytics'

/**
 * Small helper for consistent form-funnel analytics across the contact and
 * intake forms. Emits three events, all tagged with the given `form` name:
 *
 *   - contact_form_start   fired once, on the first field interaction
 *   - contact_form_submit  fired on a submit attempt that passes validation
 *   - contact_form_submit_success  fired when the submission is confirmed sent
 *
 * We never attach field values — only anonymous funnel signals.
 */
export function useFormTracking(form: string) {
  const started = useRef(false)

  const trackStart = () => {
    if (started.current) return
    started.current = true
    trackEvent('contact_form_start', { form })
  }

  const trackSubmit = () => trackEvent('contact_form_submit', { form })

  const trackSuccess = (channel?: string) =>
    trackEvent('contact_form_submit_success', { form, channel })

  return { trackStart, trackSubmit, trackSuccess }
}
