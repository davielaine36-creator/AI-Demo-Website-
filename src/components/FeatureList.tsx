import { IconCheck } from './Icons'

interface FeatureListProps {
  items: string[]
  className?: string
}

/** A checkmark bullet list used for "includes" / benefits throughout the site. */
export function FeatureList({ items, className = '' }: FeatureListProps) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <IconCheck
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-600"
            aria-hidden
          />
          <span className="text-sm leading-relaxed text-slate-700">{item}</span>
        </li>
      ))}
    </ul>
  )
}
