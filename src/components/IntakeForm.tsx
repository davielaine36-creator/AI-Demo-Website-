import { useState } from 'react'
import { Button } from './Button'
import { Field, TextInput, TextArea, Select, CheckboxGroup } from './form/FormControls'
import { FormResult } from './form/FormResult'
import { PrivacyNote } from './PrivacyNote'
import {
  buildSummary,
  isValidEmail,
  submitForm,
  type SubmitResult,
  type SummarySection,
} from '../utils/formSubmit'
import { useFormTracking } from '../lib/useFormTracking'

const HELP_OPTIONS = [
  'Website',
  'CRM / lead tracking',
  'Follow-up messages',
  'Email drafting',
  'Alerts / reminders',
  'Customer intake',
  'Booking / scheduling',
  'Shopify / store operations',
  "I'm not sure yet",
]

const STORAGE_OPTIONS = [
  'Text messages',
  'Phone calls',
  'Email',
  'Spreadsheet',
  'Paper / notebook',
  'CRM',
  'Shopify',
  'Not organized yet',
  'Other',
]

const TIMING_OPTIONS = ['Just exploring', 'Soon', 'This month', 'Urgent']

interface IntakeState {
  name: string
  business: string
  email: string
  phone: string
  website: string
  businessType: string
  help: string[]
  newCustomerProcess: string
  storage: string[]
  storageDetail: string
  messyThings: string
  valuable: string
  timing: string
}

const initialState: IntakeState = {
  name: '',
  business: '',
  email: '',
  phone: '',
  website: '',
  businessType: '',
  help: [],
  newCustomerProcess: '',
  storage: [],
  storageDetail: '',
  messyThings: '',
  valuable: '',
  timing: '',
}

export function IntakeForm() {
  const [form, setForm] = useState<IntakeState>(initialState)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ summary: string; res: SubmitResult } | null>(
    null,
  )

  const { trackStart, trackSubmit, trackSuccess } = useFormTracking('intake')

  const set = <K extends keyof IntakeState>(key: K, value: IntakeState[K]) => {
    trackStart()
    setForm((f) => ({ ...f, [key]: value }))
  }

  const toggle = (key: 'help' | 'storage', option: string) => {
    trackStart()
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(option)
        ? f[key].filter((o) => o !== option)
        : [...f[key], option],
    }))
  }

  const validate = (): boolean => {
    const next: Record<string, string> = {}
    if (!form.name.trim()) next.name = 'Please add your name.'
    if (!form.business.trim()) next.business = 'Please add your business name.'
    if (!form.email.trim()) next.email = 'Please add your email.'
    else if (!isValidEmail(form.email)) next.email = 'Please enter a valid email.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const buildSections = (): SummarySection[] => [
    {
      heading: 'Basic Info',
      fields: [
        { label: 'Name', value: form.name },
        { label: 'Business', value: form.business },
        { label: 'Email', value: form.email },
        { label: 'Phone', value: form.phone },
        { label: 'Website', value: form.website },
        { label: 'Business type', value: form.businessType },
      ],
    },
    {
      heading: 'What they need help with',
      fields: [{ label: 'Selected', value: form.help }],
    },
    {
      heading: 'Current process',
      fields: [
        {
          label: 'When a new customer contacts them',
          value: form.newCustomerProcess,
        },
        { label: 'Where info is kept', value: form.storage },
        { label: 'Storage details / other', value: form.storageDetail },
      ],
    },
    {
      heading: 'Pain points',
      fields: [
        { label: 'What feels messy / repetitive', value: form.messyThings },
        { label: 'What would make this valuable', value: form.valuable },
      ],
    },
    {
      heading: 'Timing',
      fields: [{ label: 'Timeline', value: form.timing }],
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      // Scroll to the first error for mobile users.
      const firstError = document.querySelector('[aria-invalid="true"]')
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    trackSubmit()
    setSubmitting(true)
    const summary = buildSummary('Laine Industries — Intake Summary', buildSections())

    const res = await submitForm(
      { ...form } as unknown as Record<string, string | string[]>,
      { formType: 'intake', summary },
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
        title="Thanks — your intake is ready."
        summary={result.summary}
        mailSubject="Laine Industries — New Intake"
        result={result.res}
        onReset={reset}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-10">
      {/* Basic Info */}
      <fieldset className="space-y-5">
        <legend className="text-lg font-semibold text-ink">Basic info</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" htmlFor="name" required error={errors.name}>
            <TextInput
              id="name"
              name="name"
              value={form.name}
              onChange={(v) => set('name', v)}
              autoComplete="name"
              invalid={!!errors.name}
            />
          </Field>
          <Field
            label="Business name"
            htmlFor="business"
            required
            error={errors.business}
          >
            <TextInput
              id="business"
              name="business"
              value={form.business}
              onChange={(v) => set('business', v)}
              autoComplete="organization"
              invalid={!!errors.business}
            />
          </Field>
          <Field label="Email" htmlFor="email" required error={errors.email}>
            <TextInput
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={(v) => set('email', v)}
              autoComplete="email"
              invalid={!!errors.email}
            />
          </Field>
          <Field label="Phone" htmlFor="phone">
            <TextInput
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={(v) => set('phone', v)}
              autoComplete="tel"
            />
          </Field>
          <Field label="Website URL" htmlFor="website" hint="If you have one.">
            <TextInput
              id="website"
              name="website"
              value={form.website}
              onChange={(v) => set('website', v)}
              placeholder="https://"
            />
          </Field>
          <Field label="Business type" htmlFor="businessType">
            <TextInput
              id="businessType"
              name="businessType"
              value={form.businessType}
              onChange={(v) => set('businessType', v)}
              placeholder="e.g. window cleaning, training, Shopify store"
            />
          </Field>
        </div>
      </fieldset>

      {/* Help needed */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-ink">
          What do you need help with?
        </legend>
        <CheckboxGroup
          name="help"
          options={HELP_OPTIONS}
          selected={form.help}
          onToggle={(o) => toggle('help', o)}
        />
      </fieldset>

      {/* Current process */}
      <fieldset className="space-y-5">
        <legend className="text-lg font-semibold text-ink">Current process</legend>
        <Field
          label="What happens right now when a new customer contacts you?"
          htmlFor="newCustomerProcess"
        >
          <TextArea
            id="newCustomerProcess"
            name="newCustomerProcess"
            value={form.newCustomerProcess}
            onChange={(v) => set('newCustomerProcess', v)}
            placeholder="Walk us through what happens today."
          />
        </Field>
        <Field label="Where do you currently keep customer info, job notes, or lead details?">
          <CheckboxGroup
            name="storage"
            options={STORAGE_OPTIONS}
            selected={form.storage}
            onToggle={(o) => toggle('storage', o)}
          />
        </Field>
        <Field label="Anything to add about where info lives?" htmlFor="storageDetail">
          <TextInput
            id="storageDetail"
            name="storageDetail"
            value={form.storageDetail}
            onChange={(v) => set('storageDetail', v)}
            placeholder="Optional — e.g. which spreadsheet or app"
          />
        </Field>
      </fieldset>

      {/* Pain points */}
      <fieldset className="space-y-5">
        <legend className="text-lg font-semibold text-ink">Pain points</legend>
        <Field
          label="What feels messy, repetitive, or easy to forget in your business right now?"
          htmlFor="messyThings"
        >
          <TextArea
            id="messyThings"
            name="messyThings"
            value={form.messyThings}
            onChange={(v) => set('messyThings', v)}
          />
        </Field>
        <Field
          label="What would make this system valuable to you?"
          htmlFor="valuable"
        >
          <TextArea
            id="valuable"
            name="valuable"
            value={form.valuable}
            onChange={(v) => set('valuable', v)}
          />
        </Field>
      </fieldset>

      {/* Timing */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-ink">Timing</legend>
        <Field label="What's your timeline?" htmlFor="timing">
          <Select
            id="timing"
            name="timing"
            value={form.timing}
            onChange={(v) => set('timing', v)}
            options={TIMING_OPTIONS}
            placeholder="Select one"
          />
        </Field>
      </fieldset>

      <PrivacyNote />

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={submitting} trackAs={false}>
          {submitting ? 'Preparing…' : 'Submit intake'}
        </Button>
        <p className="text-xs text-slate-500">
          No account needed. You'll get a clean summary you can email or copy.
        </p>
      </div>
    </form>
  )
}
