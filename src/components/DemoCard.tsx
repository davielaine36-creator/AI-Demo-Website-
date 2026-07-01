import { Link } from 'react-router-dom'
import { Card } from './Card'
import { FeatureList } from './FeatureList'
import { IconArrowRight } from './Icons'
import { StatusPill } from './demo/StatusPill'
import type { Demo } from '../data/demos'

const linkClasses =
  'inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800'

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

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
        {demo.to ? (
          <>
            <Link to={demo.to} className={linkClasses}>
              View the demo <IconArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <StatusPill>Static preview</StatusPill>
          </>
        ) : demo.href ? (
          <a
            href={demo.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClasses}
          >
            View demo <IconArrowRight className="h-4 w-4" aria-hidden />
          </a>
        ) : (
          // TODO: attach a demo page/link once one exists for this card.
          <StatusPill>Demo coming soon</StatusPill>
        )}
      </div>
    </Card>
  )
}
