import { Link } from 'react-router-dom'
import {
  Children,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react'
import { trackEvent } from '../lib/analytics'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-colors duration-200 select-none disabled:opacity-60 disabled:cursor-not-allowed'

const variants: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-soft',
  secondary:
    'bg-white text-ink border border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-soft',
  ghost: 'text-brand-700 hover:bg-brand-50',
}

const sizes: Record<Size, string> = {
  sm: 'text-sm px-4 py-2',
  md: 'text-sm px-5 py-2.5',
  lg: 'text-base px-6 py-3',
}

/** Pull a readable label out of button children (ignores icon elements). */
function extractText(node: ReactNode): string {
  let text = ''
  Children.forEach(node, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      text += child
    } else if (isValidElement(child)) {
      text += extractText((child.props as { children?: ReactNode }).children)
    }
  })
  return text.trim()
}

/** A link is "external" if it leaves the app (mailto/tel or another origin). */
function isExternalHref(href: string): boolean {
  return /^(https?:|mailto:|tel:)/i.test(href)
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
  /**
   * Override the analytics event name (defaults to `cta_click`, or
   * `external_link_click` for external anchors). Set `trackEvent={false}`
   * to opt this button out of tracking entirely.
   */
  trackAs?: string | false
  /** Optional section/context label attached to the analytics event. */
  trackSection?: string
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: undefined
    href?: undefined
  }

type ButtonAsLink = CommonProps & {
  to: string
  href?: undefined
}

type ButtonAsAnchor = CommonProps & {
  href: string
  to?: undefined
  download?: boolean | string
  target?: string
  rel?: string
}

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    className = '',
    children,
    trackAs,
    trackSection,
    ...rest
  } = props
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  const label = extractText(children)

  const emit = (event: string, destination?: string) => {
    if (trackAs === false) return
    trackEvent(trackAs || event, {
      text: label || undefined,
      destination,
      section: trackSection,
    })
  }

  if ('to' in props && props.to !== undefined) {
    const { to } = props as ButtonAsLink
    return (
      <Link to={to} className={classes} onClick={() => emit('cta_click', to)}>
        {children}
      </Link>
    )
  }

  if ('href' in props && props.href !== undefined) {
    const { href, download, target, rel } = props as ButtonAsAnchor
    const defaultEvent = isExternalHref(href) ? 'external_link_click' : 'cta_click'
    return (
      <a
        href={href}
        download={download}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={classes}
        onClick={() => emit(defaultEvent, href)}
      >
        {children}
      </a>
    )
  }

  const { onClick, ...buttonProps } = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button
      className={classes}
      onClick={(e) => {
        emit('cta_click')
        onClick?.(e)
      }}
      {...buttonProps}
    >
      {children}
    </button>
  )
}
