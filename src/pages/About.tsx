import { PageHero } from '../components/PageHero'
import { Section, SectionHeading } from '../components/Section'
import { Card } from '../components/Card'
import { CTASection } from '../components/CTASection'
import { CTA, SITE } from '../data/site'

const BELIEFS = [
  'We are builders.',
  'We work with AI tools, websites, automations, dashboards, and practical workflows.',
  'We care about simple systems that actually get used.',
  'We believe most small businesses do not need bloated software — they need clear, useful systems that save time and reduce missed opportunities.',
]

const PRINCIPLES = [
  {
    title: 'Useful first, fancy second.',
    text: 'We solve the real problem before adding anything clever.',
  },
  {
    title: 'Simple beats complicated.',
    text: 'The best system is the one you barely have to think about.',
  },
  {
    title: 'Owners should understand their system.',
    text: 'No black boxes. You should always know how your tools work.',
  },
  {
    title: 'AI should support the owner, not replace judgment.',
    text: 'AI drafts and organizes — you stay in control of decisions.',
  },
  {
    title: 'Start with the smallest system that solves the real problem.',
    text: 'Grow only when there’s a clear reason to.',
  },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A small AI systems studio built by David and Eliseo."
        subtitle="We help small businesses use modern tools without making things complicated."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <SectionHeading
            eyebrow="Who we are"
            title="Practical builders, not a software company."
            description="Laine Industries is a two-person studio focused on getting real, useful systems into the hands of business owners — the kind that get used every day."
          />
          <Card>
            <ul className="space-y-4">
              {BELIEFS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-brand-500"
                  />
                  <span className="text-sm leading-relaxed text-slate-700">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-slate-100 pt-5 text-sm leading-relaxed text-slate-600">
              Based around {SITE.location.replace(' — remote-friendly', '')} —
              and happy to work remotely.
            </p>
          </Card>
        </div>
      </Section>

      {/* How we think */}
      <Section muted>
        <SectionHeading
          eyebrow="How we think"
          title="The principles behind every build."
          align="center"
          className="mb-12"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <Card key={p.title} interactive className="flex h-full flex-col">
              <h3 className="text-base font-semibold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {p.text}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <CTASection
        headline="Let's find the simplest useful place to start."
        text="Tell us how your business works today and we'll recommend a first system that fits."
        buttonLabel="Start With the Intake Form"
        buttonTo={CTA.intake.to}
        secondaryLabel="Contact us"
        secondaryTo="/contact"
      />
    </>
  )
}
