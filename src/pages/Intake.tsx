import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { IntakeForm } from '../components/IntakeForm'
import { IconDownload } from '../components/Icons'
import { SITE } from '../data/site'

export default function Intake() {
  return (
    <>
      <PageHero
        eyebrow="Intake"
        title="Start with a short intake."
        subtitle="Tell us how your business works today. Your answers help us understand where leads, follow-ups, or manual work are causing friction — then we recommend a simple system that fits."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-start">
          {/* Sidebar: explanation + PDF download */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <Card>
              <h2 className="text-lg font-semibold text-ink">
                Two ways to share details
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Fill out the short form on this page, or download the full
                questionnaire (PDF) if you'd like to prepare answers offline or
                share them with your team.
              </p>
              <div className="mt-5">
                {/*
                  The PDF should be placed at public/resources/ (see the README there).
                  If the file is missing this link 404s gracefully — the site still builds.
                */}
                <Button
                  href={SITE.intakePdfPath}
                  target="_blank"
                  download
                  variant="secondary"
                  className="w-full"
                >
                  <IconDownload className="h-4 w-4" aria-hidden />
                  Download Full Intake PDF
                </Button>
                <p className="mt-3 text-xs text-slate-500">
                  Prefer email? Submitting the form gives you a clean summary you
                  can send or copy.
                </p>
              </div>
            </Card>

            <Card>
              <h2 className="text-base font-semibold text-ink">
                What happens next
              </h2>
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
