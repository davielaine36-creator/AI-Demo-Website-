import { useState } from 'react'
import { Button } from './Button'
import { Field, TextInput, TextArea, Select, CheckboxGroup } from './form/FormControls'
import { FormResult } from './form/FormResult'
import { PrivacyNote } from './PrivacyNote'
import {
  buildSummary,
  isValidEmail,
  submitForm,
  type FieldValue,
  type SubmitResult,
  type SummarySection,
} from '../utils/formSubmit'
import { useFormTracking } from '../lib/useFormTracking'
import { getLeadSource, computeLeadScore, leadStatusFromScore } from '../lib/leadContext'

/*
 * Full online intake — the complete discovery questionnaire from the intake PDF,
 * recreated as a clean web form. It is schema-driven so the long questionnaire
 * stays readable and maintainable, and it reuses the existing form controls,
 * validation helpers, summary builder, submit logic, and FormResult view.
 *
 * No backend required: submits to the /api/intake proxy (which forwards to the
 * server-only n8n webhook when configured), otherwise falls back to
 * copy-to-clipboard + prefilled email draft.
 */

type FieldType = 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox'

interface FieldDef {
  name: string
  label: string
  type: FieldType
  required?: boolean
  options?: string[]
  placeholder?: string
  hint?: string
  /** Force full width in the 2-column grid (textareas/checkboxes are always full). */
  full?: boolean
}

interface SectionDef {
  heading: string
  description?: string
  fields: FieldDef[]
}

const YES_NO = ['Yes', 'No']

const SECTIONS: SectionDef[] = [
  {
    heading: 'Basic business info',
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'business', label: 'Business name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'tel' },
      { name: 'website', label: 'Website', type: 'text', placeholder: 'https://' },
      {
        name: 'businessType',
        label: 'Business type',
        type: 'text',
        placeholder: 'e.g. window cleaning, training, Shopify store',
      },
      { name: 'serviceArea', label: 'Location / service area', type: 'text' },
      {
        name: 'bestContact',
        label: 'Best way to contact you',
        type: 'select',
        options: ['Email', 'Phone call', 'Text message', "Whatever's easiest"],
      },
      {
        name: 'decisionMakers',
        label: 'Who else is involved in decisions?',
        type: 'text',
        full: true,
      },
    ],
  },
  {
    heading: 'Business overview',
    fields: [
      { name: 'whatBusinessDoes', label: 'What does your business do?', type: 'textarea' },
      { name: 'whoCustomers', label: 'Who are your customers?', type: 'textarea' },
      {
        name: 'servicesProducts',
        label: 'What services or products do you offer?',
        type: 'textarea',
      },
      {
        name: 'howCustomersFind',
        label: 'What are the main ways customers currently find you?',
        type: 'textarea',
      },
      {
        name: 'topPriority',
        label: 'What is the most important thing your business needs help with right now?',
        type: 'textarea',
      },
    ],
  },
  {
    heading: 'Website needs',
    fields: [
      { name: 'hasWebsite', label: 'Do you currently have a website?', type: 'select', options: YES_NO },
      { name: 'websiteWorking', label: 'What is working about it?', type: 'textarea' },
      { name: 'websiteNotWorking', label: 'What is not working about it?', type: 'textarea' },
      { name: 'pagesNeeded', label: 'What pages do you need?', type: 'textarea' },
      {
        name: 'customerActions',
        label: 'What should customers be able to do on the website?',
        type: 'textarea',
      },
      {
        name: 'websiteSections',
        label: 'Which sections do you need?',
        type: 'checkbox',
        options: [
          'Quote requests',
          'Booking',
          'Contact form',
          'Service pages',
          'FAQ',
          'Reviews',
          'Gallery',
          'Other',
        ],
      },
      { name: 'websitesYouLike', label: 'What websites do you like, if any?', type: 'textarea' },
    ],
  },
  {
    heading: 'Lead capture / customer intake',
    fields: [
      {
        name: 'newCustomerFlow',
        label: 'What happens when a new customer reaches out today?',
        type: 'textarea',
      },
      { name: 'leadSources', label: 'Where do leads currently come from?', type: 'textarea' },
      {
        name: 'leadInfoNeeded',
        label: 'What information do you need from a new lead?',
        type: 'textarea',
      },
      {
        name: 'infoForgotten',
        label: 'What information do you often forget to collect?',
        type: 'textarea',
      },
      {
        name: 'responseSpeed',
        label: 'How fast do you usually respond?',
        type: 'select',
        options: ['Within minutes', 'Within an hour', 'Same day', 'Next day', 'It varies a lot'],
      },
      {
        name: 'leadsFallThrough',
        label: 'What causes leads to fall through the cracks?',
        type: 'textarea',
      },
    ],
  },
  {
    heading: 'CRM / dashboard needs',
    fields: [
      {
        name: 'customerInfoLocation',
        label: 'Where do you currently keep customer info?',
        type: 'checkbox',
        options: [
          'Text messages',
          'Phone calls',
          'Email',
          'Spreadsheet',
          'Paper / notebook',
          'CRM',
          'Shopify',
          'Not organized yet',
          'Other',
        ],
      },
      {
        name: 'detailsToTrack',
        label: 'What customer or job details need to be tracked?',
        type: 'textarea',
      },
      {
        name: 'statuses',
        label: 'What statuses do you need?',
        type: 'checkbox',
        options: [
          'New lead',
          'Contacted',
          'Quoted',
          'Scheduled',
          'Completed',
          'Follow-up needed',
          'Lost',
          'Other',
        ],
      },
      { name: 'dashboardAccess', label: 'Who needs access to the dashboard?', type: 'text', full: true },
      {
        name: 'dashboardFirstView',
        label: 'What would you want to see first when opening the dashboard?',
        type: 'textarea',
      },
      {
        name: 'dashboardUseful',
        label: 'What would make the dashboard genuinely useful?',
        type: 'textarea',
      },
    ],
  },
  {
    heading: 'Follow-up / email drafting',
    fields: [
      { name: 'commonFollowUps', label: 'What follow-ups do you send most often?', type: 'textarea' },
      { name: 'repeatedMessages', label: 'What messages do you write repeatedly?', type: 'textarea' },
      {
        name: 'aiDraftApproval',
        label: 'Do you want AI to draft replies for approval before sending?',
        type: 'select',
        options: [
          'Yes — draft for my approval',
          'Yes — and send automatically',
          'No, I’ll write my own',
          'Not sure yet',
        ],
      },
      { name: 'tone', label: 'What tone should messages have?', type: 'text', full: true },
      {
        name: 'followUpTiming',
        label: 'What follow-up timing matters?',
        type: 'checkbox',
        options: ['Same day', '2 days later', '1 week later', 'Monthly', 'Other'],
      },
      {
        name: 'reminderCustomers',
        label: 'What types of customers should get reminders later?',
        type: 'textarea',
      },
    ],
  },
  {
    heading: 'Alerts / reminders / automation',
    fields: [
      { name: 'alertAbout', label: 'What do you want to be alerted about?', type: 'textarea' },
      {
        name: 'alertDestinations',
        label: 'Where should alerts go?',
        type: 'checkbox',
        options: ['Email', 'Text', 'Slack', 'Dashboard', 'Other'],
      },
      { name: 'tasksToAutomate', label: 'What tasks do you want automated?', type: 'textarea' },
      {
        name: 'neverAutomate',
        label: 'What tasks should never be automated without approval?',
        type: 'textarea',
      },
      {
        name: 'biggestTimeSaver',
        label: 'What would save you the most time every week?',
        type: 'textarea',
      },
    ],
  },
  {
    heading: 'Tools / accounts',
    description: 'Only fill in what applies — skip anything you don’t use.',
    fields: [
      { name: 'emailProvider', label: 'Email provider', type: 'text' },
      { name: 'websitePlatform', label: 'Website platform', type: 'text' },
      { name: 'crmTool', label: 'CRM, if any', type: 'text' },
      { name: 'spreadsheetTools', label: 'Spreadsheet tools', type: 'text' },
      { name: 'shopifyTool', label: 'Shopify, if any', type: 'text' },
      { name: 'schedulingTool', label: 'Scheduling tool', type: 'text' },
      { name: 'paymentTool', label: 'Payment tool', type: 'text' },
      { name: 'otherTools', label: 'Other important tools', type: 'text' },
      {
        name: 'comfortableConnecting',
        label: 'Are you comfortable connecting accounts if needed?',
        type: 'select',
        options: ['Yes', 'No', 'Need to know more first'],
        full: true,
      },
    ],
  },
  {
    heading: 'Shopify / store operations',
    description: 'Only if you run an online store — otherwise skip this section.',
    fields: [
      { name: 'runsShopify', label: 'Do you run a Shopify store?', type: 'select', options: YES_NO },
      { name: 'repetitiveStoreTasks', label: 'What store tasks feel repetitive?', type: 'textarea' },
      {
        name: 'shopifyNeeds',
        label: 'What would help most?',
        type: 'checkbox',
        options: [
          'Product organization',
          'Customer issue tracking',
          'Draft replies',
          'Inventory / task tracking',
          'Dashboard support',
          'Other',
        ],
      },
      { name: 'storeEasier', label: 'What would make store operations easier?', type: 'textarea' },
    ],
  },
  {
    heading: 'Success criteria',
    fields: [
      { name: 'successDefinition', label: 'What would make this project successful?', type: 'textarea' },
      {
        name: 'wantEasier',
        label: 'What would you want to be easier after this system exists?',
        type: 'textarea',
      },
      { name: 'stopDoingManually', label: 'What would you want to stop doing manually?', type: 'textarea' },
      { name: 'highestValueOutcome', label: 'What is the highest-value outcome?', type: 'textarea' },
      { name: 'worthItSignal', label: 'How will you know this was worth it?', type: 'textarea' },
    ],
  },
  {
    heading: 'Budget / timeline / scope',
    fields: [
      {
        name: 'readiness',
        label: 'Are you exploring or ready to start?',
        type: 'select',
        options: ['Just exploring', 'Somewhere in between', 'Ready to start'],
      },
      { name: 'timeline', label: 'Desired timeline', type: 'text' },
      {
        name: 'urgency',
        label: 'Urgency level',
        type: 'select',
        options: ['Low', 'Medium', 'High', 'Urgent'],
      },
      {
        name: 'budgetRange',
        label: 'Budget comfort range',
        type: 'select',
        options: [
          'Not sure yet',
          'Starter / small',
          'Mid-range',
          'Larger build',
          'Prefer to discuss',
        ],
      },
      {
        name: 'starterOrComplete',
        label: 'Starter version first or a more complete build?',
        type: 'select',
        options: ['Starter version first', 'More complete build', 'Not sure yet'],
      },
      { name: 'avoid', label: 'Anything we should avoid?', type: 'textarea', full: true },
    ],
  },
  {
    heading: 'Final notes',
    fields: [
      { name: 'anythingElse', label: 'Anything else we should know?', type: 'textarea' },
      {
        name: 'linksExamples',
        label: 'Links to examples, docs, or current workflows',
        type: 'textarea',
        hint: 'Paste any links here — Google Drive, current site, spreadsheets, etc.',
      },
      {
        name: 'permissionFollowUp',
        label: 'Can we follow up with clarifying questions?',
        type: 'select',
        options: ['Yes', 'No'],
      },
    ],
  },
]

// Fields that must be completed before submitting.
const REQUIRED = SECTIONS.flatMap((s) => s.fields.filter((f) => f.required).map((f) => f.name))

type FormState = Record<string, FieldValue>

function initialState(): FormState {
  const state: FormState = {}
  for (const section of SECTIONS) {
    for (const field of section.fields) {
      state[field.name] = field.type === 'checkbox' ? [] : ''
    }
  }
  return state
}

export function FullIntakeForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ summary: string; res: SubmitResult } | null>(null)

  const asString = (name: string) => (form[name] as string) ?? ''
  const asArray = (name: string) => (form[name] as string[]) ?? []

  const { trackStart, trackSubmit, trackSuccess } = useFormTracking('full-intake')

  const setValue = (name: string, value: FieldValue) => {
    trackStart()
    setForm((f) => ({ ...f, [name]: value }))
  }

  const toggle = (name: string, option: string) => {
    trackStart()
    setForm((f) => {
      const current = (f[name] as string[]) ?? []
      return {
        ...f,
        [name]: current.includes(option)
          ? current.filter((o) => o !== option)
          : [...current, option],
      }
    })
  }

  const validate = (): boolean => {
    const next: Record<string, string> = {}
    for (const name of REQUIRED) {
      if (!asString(name).trim()) next[name] = 'This field is required.'
    }
    if (asString('email').trim() && !isValidEmail(asString('email'))) {
      next.email = 'Please enter a valid email.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const buildSections = (): SummarySection[] =>
    SECTIONS.map((section) => ({
      heading: section.heading,
      fields: section.fields.map((f) => ({ label: f.label, value: form[f.name] })),
    }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) {
      document
        .querySelector('[aria-invalid="true"]')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    trackSubmit()
    setSubmitting(true)
    const summary = buildSummary(
      'Laine Industries — Full Intake Summary',
      buildSections(),
    )
    const source = getLeadSource('full-intake')
    const leadScore = computeLeadScore({
      name: asString('name'),
      business: asString('business'),
      email: asString('email'),
      phone: asString('phone'),
      website: asString('website'),
      businessType: asString('businessType'),
      painPoint: asString('topPriority'),
      needs: [...asArray('websiteSections'), ...asArray('statuses')],
      budget: asString('budgetRange'),
      timeline: `${asString('readiness')} ${asString('urgency')} ${asString('timeline')}`.trim(),
    })
    const res = await submitForm(form, {
      formType: 'full-intake',
      summary,
      source,
      leadScore,
      leadStatus: leadStatusFromScore(leadScore),
    })
    if (res.ok) trackSuccess(res.channel)
    setSubmitting(false)
    setResult({ summary, res })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const reset = () => {
    setForm(initialState())
    setErrors({})
    setResult(null)
  }

  if (result) {
    return (
      <FormResult
        title="Thanks — your full intake is ready."
        summary={result.summary}
        mailSubject="Laine Industries — Full Intake"
        result={result.res}
        onReset={reset}
      />
    )
  }

  const renderField = (field: FieldDef) => {
    const id = `full-${field.name}`
    const error = errors[field.name]
    const isFull = field.full || field.type === 'textarea' || field.type === 'checkbox'

    let control
    switch (field.type) {
      case 'textarea':
        control = (
          <TextArea
            id={id}
            name={field.name}
            value={asString(field.name)}
            onChange={(v) => setValue(field.name, v)}
            placeholder={field.placeholder}
            invalid={!!error}
          />
        )
        break
      case 'select':
        control = (
          <Select
            id={id}
            name={field.name}
            value={asString(field.name)}
            onChange={(v) => setValue(field.name, v)}
            options={field.options ?? []}
            placeholder="Select one"
            invalid={!!error}
          />
        )
        break
      case 'checkbox':
        control = (
          <CheckboxGroup
            name={field.name}
            options={field.options ?? []}
            selected={asArray(field.name)}
            onToggle={(o) => toggle(field.name, o)}
          />
        )
        break
      default:
        control = (
          <TextInput
            id={id}
            name={field.name}
            type={field.type}
            value={asString(field.name)}
            onChange={(v) => setValue(field.name, v)}
            placeholder={field.placeholder}
            invalid={!!error}
          />
        )
    }

    return (
      <div key={field.name} className={isFull ? 'sm:col-span-2' : ''}>
        <Field
          label={field.label}
          htmlFor={field.type === 'checkbox' ? undefined : id}
          required={field.required}
          error={error}
          hint={field.hint}
        >
          {control}
        </Field>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-12">
      {SECTIONS.map((section, i) => (
        <fieldset key={section.heading} className="space-y-5">
          <div className="flex items-start gap-3 border-b border-slate-100 pb-4">
            <span className="mt-0.5 grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-white">
              {i + 1}
            </span>
            <div>
              <legend className="text-lg font-semibold text-ink">
                {section.heading}
              </legend>
              {section.description && (
                <p className="mt-1 text-sm text-slate-500">{section.description}</p>
              )}
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {section.fields.map(renderField)}
          </div>
        </fieldset>
      ))}

      <PrivacyNote />

      <div className="flex flex-wrap items-center gap-4 border-t border-slate-100 pt-8">
        <Button type="submit" size="lg" disabled={submitting} trackAs={false}>
          {submitting ? 'Preparing…' : 'Submit full intake'}
        </Button>
        <p className="text-xs text-slate-500">
          No account needed. You'll get a clean summary you can email or copy.
          Only name, business, and email are required — everything else is
          optional.
        </p>
      </div>
    </form>
  )
}
