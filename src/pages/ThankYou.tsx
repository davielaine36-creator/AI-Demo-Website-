import { useSearchParams } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SEO } from '../components/SEO'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { IconCheck } from '../components/Icons'

/**
 * Stripe Checkout Session IDs look like cs_test_… or cs_live_….
 * Anything else in ?session_id= is ignored — this page never treats the
 * query string as proof of payment.
 */
const SESSION_ID_PATTERN = /^cs_(test|live)_[A-Za-z0-9]+$/

function checkoutReference(value: string | null): string | null {
  if (!value) return null
  return SESSION_ID_PATTERN.test(value) ? value : null
}

export default function ThankYou() {
  const [params] = useSearchParams()
  const reference = checkoutReference(params.get('session_id'))

  return (
    <>
      <SEO
        title="Thank You | Website Rescue Deposit | Laine Industries"
        description="Thank you for your Website Rescue deposit. We've received it and will be in touch with next steps."
        path="/thank-you"
      />
      <PageHero
        eyebrow="Website Rescue"
        title="Thank you for your deposit."
        subtitle="We've received your Website Rescue deposit and will be in touch shortly with next steps."
      >
        <Button to="/" size="lg">
          Back to home
        </Button>
        <Button to="/contact" variant="secondary" size="lg">
          Contact us
        </Button>
      </PageHero>

      <Section>
        <div className="mx-auto max-w-3xl space-y-4">
          <Card>
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <IconCheck aria-hidden />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-ink">
              What happens next
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              We’ll review the deposit and reach out to start the Website Rescue
              work. If you have questions or extra details to share in the
              meantime, the contact page is the fastest way to reach us.
            </p>
          </Card>

          {reference && (
            <Card>
              <h2 className="text-lg font-semibold text-ink">
                Checkout reference
              </h2>
              <p className="mt-2 break-all font-mono text-sm text-slate-700">
                {reference}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                For your records only. This is not a receipt and does not
                verify payment by itself.
              </p>
            </Card>
          )}

          <Card className="surface-gradient">
            <p className="text-sm leading-relaxed text-slate-600">
              This page is a confirmation landing — not a receipt and not a
              paid-status check. We record the deposit on our side when
              checkout completes. A checkout ID in the URL is a reference only.
            </p>
          </Card>
        </div>
      </Section>
    </>
  )
}
