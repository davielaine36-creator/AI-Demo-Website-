import { useRef, type ReactNode } from 'react'
import { Card } from './Card'
import { FeatureList } from './FeatureList'
import type { Service } from '../data/services'
import { trackEvent } from '../lib/analytics'

interface ServiceCardProps {
  service: Service
  icon?: ReactNode
}

export function ServiceCard({ service, icon }: ServiceCardProps) {
  // Only report the first interaction per mount so repeated clicks on the same
  // card don't spam the event stream.
  const tracked = useRef(false)
  const handleClick = () => {
    if (tracked.current) return
    tracked.current = true
    trackEvent('service_click', {
      text: service.title,
      service_id: service.id,
      section: 'services',
    })
  }

  return (
    <Card interactive className="flex h-full flex-col" onClick={handleClick}>
      {icon && (
        <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-ink">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {service.summary}
      </p>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Includes
        </p>
        <FeatureList items={service.includes} className="mt-3" />
      </div>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <p className="text-sm leading-relaxed text-slate-700">
          <span className="font-semibold text-ink">Why it helps: </span>
          {service.benefit}
        </p>
      </div>
    </Card>
  )
}
