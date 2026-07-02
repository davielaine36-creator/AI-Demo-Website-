import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { CONTACT_EMAIL } from '../data/site'

interface Item {
  heading: string
  body: React.ReactNode
}

const ITEMS: Item[] = [
  {
    heading: 'What we do with what you send',
    body: 'We use the information you submit through our forms to understand your business and respond with useful recommendations, project scopes, and follow-up communication. That’s it.',
  },
  {
    heading: 'We do not sell your information',
    body: 'We do not sell submitted information. We share it only as needed to respond to you and prepare your recommendation.',
  },
  {
    heading: "Please don't send sensitive information",
    body: 'We do not ask for sensitive personal information, passwords, payment details, API keys, private customer lists, or government IDs through the public website. Please don’t submit secrets or sensitive data through the forms.',
  },
  {
    heading: 'If technical access is ever needed',
    body: 'If a project later requires access to a tool or account, we’ll handle that separately and intentionally — never through a public form on this site.',
  },
  {
    heading: 'About “Ask Laine”',
    body: 'Ask Laine is an AI-powered website assistant. Questions you type in the chat are sent to our server and processed by an AI service to generate an answer — we use them only to answer you, and we don’t use the chat to build marketing profiles. Please don’t type passwords, payment details, API keys, or sensitive customer data into the chat. The guided quick-start option works entirely in your browser and doesn’t send anything.',
  },
  {
    heading: 'How submissions reach us',
    body: 'Form submissions may be sent to us using an email draft or copy-and-paste fallback. Later, if configured, submissions may also be routed through automation tools such as n8n. Either way, we use the information only to understand your business and respond.',
  },
  {
    heading: 'How we use business information',
    body: 'Business information you share may be used to prepare recommendations, project scopes, and follow-up communication about working together.',
  },
  {
    heading: 'Requesting deletion',
    body: (
      <>
        You can contact us at any time to request deletion of information you’ve
        submitted. Just email{' '}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-semibold text-brand-700 hover:text-brand-800"
        >
          {CONTACT_EMAIL}
        </a>{' '}
        and we’ll take care of it.
      </>
    ),
  },
]

export default function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="Privacy / Data Use"
        title="How we handle your information."
        subtitle="A plain-English note on what happens to the details you share through our contact form, intake forms, PDF/email, and the Ask Laine assistant. This is a basic operational privacy note — not complex legal boilerplate."
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="space-y-4">
            {ITEMS.map((item) => (
              <Card key={item.heading}>
                <h2 className="text-base font-semibold text-ink">
                  {item.heading}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.body}
                </p>
              </Card>
            ))}
          </div>

          <Card className="mt-8 surface-gradient">
            <h2 className="text-lg font-semibold text-ink">
              Questions about your information?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              We’re happy to explain anything here in more detail, or remove
              information you’ve submitted.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href={`mailto:${CONTACT_EMAIL}`} size="md">
                Email us
              </Button>
              <Button to="/contact" variant="secondary" size="md">
                Contact form
              </Button>
            </div>
          </Card>

          <p className="mt-6 text-center text-xs text-slate-400">
            This is a basic operational privacy note, not complex legal
            boilerplate.
          </p>
        </div>
      </Section>
    </>
  )
}
