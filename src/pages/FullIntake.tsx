import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { FullIntakeForm } from '../components/FullIntakeForm'
import { IconDownload, IconArrowRight } from '../components/Icons'
import { SITE } from '../data/site'

export default function FullIntake() {
  return (
    <>
      <PageHero
        eyebrow="Full intake"
        title="The full discovery questionnaire — online."
        subtitle="A more detailed intake for when you're ready to go deeper. Fill out only what applies; only name, business, and email are required. You'll get a clean summary at the end to email or copy."
      >
        <Button to="/intake" variant="secondary" size="lg">
          Prefer the short version?
        </Button>
        <Button href={SITE.intakePdfPath} target="_blank" download variant="ghost" size="lg">
          <IconDownload className="h-4 w-4" aria-hidden />
          Download PDF instead
        </Button>
      </PageHero>

      <Section>
        <div className="mx-auto max-w-3xl">
          <Card className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-slate-600">
              This takes about 10–15 minutes if you answer everything — but you
              can skip any question that doesn't apply.
            </p>
            <Button to="/intake" variant="ghost" size="sm" className="flex-shrink-0">
              Short form
              <IconArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </Card>

          <Card className="lg:p-8">
            <FullIntakeForm />
          </Card>
        </div>
      </Section>
    </>
  )
}
