import { Card } from './Card'
import { Button } from './Button'
import { FeatureList } from './FeatureList'
import { IconArrowRight } from './Icons'
import { StatusPill } from './demo/StatusPill'
import type { Demo } from '../data/demos'

export function DemoCard({ demo }: { demo: Demo }) {
  const ready = Boolean(demo.to || demo.href)
  return (
    <Card interactive className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-ink">{demo.title}</h3>
        <StatusPill tone={ready ? 'info' : 'neutral'}>
          {ready ? 'Example data' : 'Coming soon'}
        </StatusPill>
      </div>

      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {demo.description}
      </p>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          What it demonstrates
        </p>
        <FeatureList items={demo.demonstrates} className="mt-3" />
      </div>

      {/* CTA pinned to the bottom so cards line up evenly. */}
      <div className="mt-auto pt-6">
        {demo.to ? (
          <Button to={demo.to} className="w-full">
            {demo.cta || 'Open demo'}
            <IconArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        ) : demo.href ? (
          <Button href={demo.href} target="_blank" className="w-full">
            {demo.cta || 'Open demo'}
            <IconArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        ) : (
          <p className="text-center text-sm font-medium text-slate-400">
            Demo coming soon
          </p>
        )}
      </div>
    </Card>
  )
}
