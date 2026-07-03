import { PageHero } from '../components/PageHero'
import { Section } from '../components/Section'
import { CaseStudyCard } from '../components/CaseStudyCard'
import { CTASection } from '../components/CTASection'
import { CASE_STUDIES } from '../data/caseStudies'
import { CTA } from '../data/site'

export default function CaseStudies() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies / Pilot Builds"
        title="Pilot builds and real-world systems in progress."
        subtitle="Laine Industries is building practical systems for real businesses and documenting the before, build, and after of each project."
      />

      <Section trackName="case-studies">
        <div className="grid gap-6 lg:grid-cols-2">
          {CASE_STUDIES.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl rounded-xl border border-slate-200 bg-slate-50 p-4 text-center text-sm leading-relaxed text-slate-600">
          These are pilot / in-progress builds. We'll add real outcomes and
          before-and-after details as each project develops — no invented
          results.
          {/* TODO: replace status + add measured results as pilots complete. */}
        </p>
      </Section>

      <CTASection
        headline="Want to be an early pilot?"
        text="We're taking on a small number of pilot builds. If your business could use a simpler system, start with the intake form."
        buttonLabel="Start With the Intake Form"
        buttonTo={CTA.intake.to}
        secondaryLabel="Contact us"
        secondaryTo="/contact"
      />
    </>
  )
}
