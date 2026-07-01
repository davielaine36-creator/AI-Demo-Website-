import { Card } from './Card'
import { FeatureList } from './FeatureList'
import type { CaseStudy } from '../data/caseStudies'

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          {study.status}
        </span>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-ink">{study.title}</h3>

      <div className="mt-6 space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            The problem
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {study.problem}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            The system
          </p>
          <FeatureList items={study.system} className="mt-3" />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            What success would look like
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {study.success}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Current status
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            {study.currentStatus}
          </p>
        </div>
      </div>
    </Card>
  )
}
