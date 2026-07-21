import { useState } from 'react'
import { Button } from './Button'
import { Field, TextInput, TextArea, Select } from './form/FormControls'
import { useHoneypot } from './form/Honeypot'
import { FormResult } from './form/FormResult'
import { PrivacyNote } from './PrivacyNote'
import {
  buildSummary,
  isValidEmail,
  submitForm,
  type SubmitResult,
} from '../utils/formSubmit'
import { useFormTracking } from '../lib/useFormTracking'
import { getLeadSource } from '../lib/leadContext'

const INTEREST_OPTIONS = [
  'Website',
  'CRM / lead tracking',
  'AI follow-up',
  'Alerts / automations',
  'Shopify / store operations',
  'Not sure yet',
]

interface ContactState {
  name: string
  business: string
  email: string
  interest: string
  message: string
}

const initialState: ContactState = {
  name: '',
  business: '',
  email: '',
  interest: '',
  message: '',
}

export function ContactForm() {
  const [form, setForm] = useState<ContactState>(initialState)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ summary: string; res: SubmitResult } | null>(
    null,
  )

  const { trackStart, trackSubmit, trackSuccess } = useFormTracking('contact')
  const honeypot = useHoneypot()

  const set = <K extends keyof ContactState>(key: K, value: ContactState[K]) => {
    trackStart()
    setForm((f) => ({ ...f, [key]: value }))
  }

  const validate = (): boolean => {
    const next: Record<string, string> = {}
    if (!form.name.trim()) next.name = 'Please add your name.'
    if (!form.email.trim()) next.email = 'Please add your email.'
    else if (!isValidEmail(form.email)) next.email = 'Please enter a valid email.'
    if (!form.message.trim()) next.message = 'Please add a short message.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      const firstError = document.querySelector('[aria-invalid="true"]')
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    trackSubmit()
    setSubmitting(true)
    const summary = buildSummary('Laine Industries — Contact Message', [
      {
        heading: 'Contact',
        fields: [
          { label: 'Name', value: form.name },
          { label: 'Business', value: form.business },
          { label: 'Email', value: form.email },
          { label: 'Interested in', value: form.interest },
        ],
      },
      {
        heading: 'Message',
        fields: [{ label: 'Message', value: form.message }],
      },
    ])

    const res = await submitForm(
      { ...form } as unknown as Record<string, string | string[]>,
      {
        formType: 'contact',
        summary,
        source: getLeadSource('contact'),
        honeypot: honeypot.value,
      },
    )

    if (res.ok) trackSuccess(res.channel)
    setSubmitting(false)
    setResult({ summary, res })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const reset = () => {
    setForm(initialState)
    setErrors({})
    setResult(null)
  }

  if (result) {
    return (
      <FormResult
        title="Thanks for reaching out."
        summary={result.summary}
        mailSubject="Laine Industries — Contact"
        result={result.res}
        onReset={reset}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {honeypot.field}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="c-name" required error={errors.name}>
          <TextInput
            id="c-name"
            name="name"
            value={form.name}
            onChange={(v) => set('name', v)}
            autoComplete="name"
            invalid={!!errors.name}
          />
        </Field>
        <Field label="Business" htmlFor="c-business">
          <TextInput
            id="c-business"
            name="business"
            value={form.business}
            onChange={(v) => set('business', v)}
            autoComplete="organization"
          />
        </Field>
      </div>

      <Field label="Email" htmlFor="c-email" required error={errors.email}>
        <TextInput
          id="c-email"
          name="email"
          type="email"
          value={form.email}
          onChange={(v) => set('email', v)}
          autoComplete="email"
          invalid={!!errors.email}
        />
      </Field>

      <Field label="What are you interested in?" htmlFor="c-interest">
        <Select
          id="c-interest"
          name="interest"
          value={form.interest}
          onChange={(v) => set('interest', v)}
          options={INTEREST_OPTIONS}
          placeholder="Select one"
        />
      </Field>

      <Field label="Message" htmlFor="c-message" required error={errors.message}>
        <TextArea
          id="c-message"
          name="message"
          value={form.message}
          onChange={(v) => set('message', v)}
          rows={5}
          placeholder="Tell us what feels messy in your business — we'll help you find the simplest useful place to start."
          invalid={!!errors.message}
        />
      </Field>

      <PrivacyNote />

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={submitting} trackAs={false}>
          {submitting ? 'Preparing…' : 'Send message'}
        </Button>
        <p className="text-xs text-slate-500">
          We'll get back to you by email.
        </p>
      </div>
    </form>
  )
}
