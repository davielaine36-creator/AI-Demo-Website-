import { Card } from './Card'
import { FeatureList } from './FeatureList'
import { IconArrowRight } from './Icons'
import type { Demo } from '../data/demos'

export function DemoCard({ demo }: { demo: Demo }) {
  return (
    <Card interactive className="flex h-full flex-col">
      <h3 className="text-lg font-semibold text-ink">{demo.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {demo.description}
      </p>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          What it demonstrates
        </p>
        <FeatureList items={demo.demonstrates} className="mt-3" />
      </div>

      <div className="mt-6 border-t border-slate-100 pt-5">
        {demo.href ? (
          <a
            href={demo.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            View demo <IconArrowRight className="h-4 w-4" aria-hidden />
          </a>
        ) : (
          // TODO: attach a live demo link/embed. Placeholder until a demo is hosted.
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
            Demo coming soon
          </span>
        )}
      </div>
    </Card>
  )
}
