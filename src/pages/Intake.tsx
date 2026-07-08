import { PageHero } from '../components/PageHero'
import { SEO } from '../components/SEO'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { IntakeForm } from '../components/IntakeForm'
import { IconDownload, IconArrowRight, IconClipboard, IconLayout } from '../components/Icons'
import { SITE } from '../data/site'

export default function Intake() {
  return (
    <>
      <SEO
        title="Request a Demo / Start Your Intake | Laine Industries"
        description="Start with a short intake so Laine Industries can understand your business and recommend the simplest useful website or lead system to start with."
      />
      <PageHero
        eyebrow="Intake"
        title="Three ways to get started."
        subtitle="Tell us how your business works today. Pick whichever fits — a quick start, the full questionnaire online, or a PDF to fill out offline. Any of them help us recommend a simple system that fits."
      />

      {/* Three options */}
      <Section className="!pb-0">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Option 1: Short form (on this page) */}
          <Card interactive className="flex h-full flex-col">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <IconClipboard />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-ink">Short Intake Form</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
              The fastest way to start — a few key questions about your business.
              It's right below on this page.
            </p>
            <Button href="#short-form" variant="secondary" size="sm" className="mt-5 w-full">
              Start short form
              <IconArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </Card>

          {/* Option 2: Full online form */}
          <Card interactive className="flex h-full flex-col ring-1 ring-brand-100">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <IconLayout />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-ink">Full Intake Form</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
              The detailed discovery questionnaire, filled out online. Best when
              you're ready to go deeper — no download needed.
            </p>
            <Button to="/full-intake" size="sm" className="mt-5 w-full">
              Open full form
              <IconArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </Card>

          {/* Option 3: PDF download */}
          <Card interactive className="flex h-full flex-col">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <IconDownload />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-ink">Download Full Intake PDF</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
              Prefer to work offline or share with your team? Download the full
              questionnaire as a PDF.
            </p>
            {/*
              The PDF lives at public/resources/ (see the README there).
              If the file is missing this link 404s gracefully — the site still builds.
            */}
            <Button
              href={SITE.intakePdfPath}
              target="_blank"
              download
              variant="secondary"
              size="sm"
              className="mt-5 w-full"
            >
              Download PDF
            </Button>
          </Card>
        </div>
      </Section>

      {/* Short form */}
      <Section id="short-form">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-start">
          {/* Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <Card>
              <h2 className="text-lg font-semibold text-ink">Short intake</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                A quick way to share the essentials. Want to give us the full
                picture instead? Use the{' '}
                <Button to="/full-intake" variant="ghost" size="sm" className="!inline !px-1 !py-0 align-baseline">
                  full intake form
                </Button>
                .
              </p>
              <p className="mt-3 text-xs text-slate-500">
                Submitting gives you a clean summary you can email or copy — no
                account needed.
              </p>
            </Card>

            <Card>
              <h2 className="text-base font-semibold text-ink">What happens next</h2>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-slate-600">
                <li>1. You submit the form.</li>
                <li>2. We review how your business works today.</li>
                <li>3. We reply with a simple, recommended starting point.</li>
              </ul>
            </Card>
          </div>

          {/* Form */}
          <Card className="lg:p-8">
            <IntakeForm />
          </Card>
        </div>
      </Section>
    </>
  )
}
