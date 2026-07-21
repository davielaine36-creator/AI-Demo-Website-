import { useState } from 'react'
import { Button } from './Button'
import { Field, TextInput, TextArea, Select, CheckboxGroup } from './form/FormControls'
import { useHoneypot } from './form/Honeypot'
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
import { getLeadSource, computeLeadScore, leadStatusFromScore } from '../lib/leadContext'

const HELP_OPTIONS = [
  'Website',
  'Lead capture / landing page',
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
const READINESS_OPTIONS = ['Just exploring', 'Somewhere in between', 'Ready to start']
const CONTACT_OPTIONS = ['Email', 'Phone call', 'Text message', "Whatever's easiest"]
const BUDGET_OPTIONS = [
  'Not sure yet',
  'Starter / small',
  'Mid-range',
  'Larger build',
  'Prefer to discuss',
]

interface IntakeState {
  name: string
  business: string
  email: string
  phone: string
  website: string
  businessType: string
  serviceArea: string
  help: string[]
  newCustomerProcess: string
  storage: string[]
  storageDetail: string
  messyThings: string
  valuable: string
  timing: string
  readiness: string
  budget: string
  contactMethod: string
  consent: string[]
}

const initialState: IntakeState = {
  name: '',
  business: '',
  email: '',
  phone: '',
  website: '',
  businessType: '',
  serviceArea: '',
  help: [],
  newCustomerProcess: '',
  storage: [],
  storageDetail: '',
  messyThings: '',
  valuable: '',
  timing: '',
  readiness: '',
  budget: '',
  contactMethod: '',
  consent: [],
}

export function IntakeForm() {
  const [form, setForm] = useState<IntakeState>(initialState)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ summary: string; res: SubmitResult } | null>(
    null,
  )

  const { trackStart, trackSubmit, trackSuccess } = useFormTracking('intake')
  const honeypot = useHoneypot()

  const set = <K extends keyof IntakeState>(key: K, value: IntakeState[K]) => {
    trackStart()
    setForm((f) => ({ ...f, [key]: value }))
  }

  const toggle = (key: 'help' | 'storage' | 'consent', option: string) => {
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
        { label: 'Business type / industry', value: form.businessType },
        { label: 'Service area', value: form.serviceArea },
        { label: 'Preferred contact', value: form.contactMethod },
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
      heading: 'Timeline, budget & readiness',
      fields: [
        { label: 'Timeline', value: form.timing },
        { label: 'Exploring or ready', value: form.readiness },
        { label: 'Budget comfort range', value: form.budget },
        { label: 'Consent to be contacted', value: form.consent },
      ],
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

    // Compute non-PII attribution + a heuristic lead score for triage.
    const source = getLeadSource('intake')
    const leadScore = computeLeadScore({
      name: form.name,
      business: form.business,
      email: form.email,
      phone: form.phone,
      website: form.website,
      businessType: form.businessType,
      painPoint: `${form.messyThings} ${form.valuable}`.trim(),
      needs: form.help,
      budget: form.budget,
      timeline: `${form.timing} ${form.readiness}`.trim(),
    })

    const res = await submitForm(
      { ...form } as unknown as Record<string, string | string[]>,
      {
        formType: 'intake',
        summary,
        source,
        leadScore,
        leadStatus: leadStatusFromScore(leadScore),
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
      {honeypot.field}
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
          <Field label="Business type / industry" htmlFor="businessType">
            <TextInput
              id="businessType"
              name="businessType"
              value={form.businessType}
              onChange={(v) => set('businessType', v)}
              placeholder="e.g. contractor, HVAC, window cleaning, training"
            />
          </Field>
          <Field label="City / state or service area" htmlFor="serviceArea">
            <TextInput
              id="serviceArea"
              name="serviceArea"
              value={form.serviceArea}
              onChange={(v) => set('serviceArea', v)}
              placeholder="e.g. San Diego, CA"
            />
          </Field>
          <Field label="Preferred contact method" htmlFor="contactMethod">
            <Select
              id="contactMethod"
              name="contactMethod"
              value={form.contactMethod}
              onChange={(v) => set('contactMethod', v)}
              options={CONTACT_OPTIONS}
              placeholder="Select one"
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
          label="What is the biggest problem you'd want this to fix?"
          htmlFor="messyThings"
        >
          <TextArea
            id="messyThings"
            name="messyThings"
            value={form.messyThings}
            onChange={(v) => set('messyThings', v)}
            placeholder="e.g. leads get lost, follow-up is slow, quote requests are missing details"
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

      {/* Timeline / budget / readiness */}
      <fieldset className="space-y-5">
        <legend className="text-lg font-semibold text-ink">
          Timeline & budget
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
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
          <Field label="Are you exploring or ready to start?" htmlFor="readiness">
            <Select
              id="readiness"
              name="readiness"
              value={form.readiness}
              onChange={(v) => set('readiness', v)}
              options={READINESS_OPTIONS}
              placeholder="Select one"
            />
          </Field>
          <Field
            label="Budget comfort range"
            htmlFor="budget"
            hint="No commitment — this just helps us recommend the right starting point."
          >
            <Select
              id="budget"
              name="budget"
              value={form.budget}
              onChange={(v) => set('budget', v)}
              options={BUDGET_OPTIONS}
              placeholder="Select one"
            />
          </Field>
        </div>
        <Field label="Consent">
          <CheckboxGroup
            name="consent"
            options={['You can contact me about my request.']}
            selected={form.consent}
            onToggle={(o) => toggle('consent', o)}
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
