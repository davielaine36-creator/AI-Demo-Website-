import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { ContactForm } from '../components/ContactForm'
import { IconMail, IconClipboard, IconArrowRight } from '../components/Icons'
import { CONTACT_EMAIL } from '../data/site'
import { trackEvent } from '../lib/analytics'

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what feels messy in your business."
        subtitle="We'll help you figure out the simplest useful system to start with. No pressure, no jargon."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:items-start">
          {/* What to send + direct email + intake link */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <Card>
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <IconClipboard />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-ink">
                What to send
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                A sentence or two about your business, what feels messy or
                repetitive, and what you'd like to be easier. That's plenty for
                us to point you in the right direction.
              </p>
            </Card>

            <Card>
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                <IconMail />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-ink">
                Prefer email?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Reach us directly at:
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                onClick={() =>
                  trackEvent('external_link_click', {
                    text: 'Email us',
                    destination: `mailto:${CONTACT_EMAIL}`,
                    section: 'contact',
                  })
                }
                className="mt-2 inline-block text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                {CONTACT_EMAIL}
              </a>
              <div className="mt-5 border-t border-slate-100 pt-5">
                <p className="text-sm text-slate-600">
                  Ready to share more detail?
                </p>
                <div className="mt-1 flex flex-col items-start">
                  <Button to="/intake" variant="ghost" size="sm" className="-ml-2">
                    Short intake form
                    <IconArrowRight className="h-4 w-4" aria-hidden />
                  </Button>
                  <Button to="/full-intake" variant="ghost" size="sm" className="-ml-2">
                    Full intake questionnaire
                    <IconArrowRight className="h-4 w-4" aria-hidden />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact form */}
          <Card className="lg:p-8">
            <ContactForm />
          </Card>
        </div>
      </Section>
    </>
  )
}
