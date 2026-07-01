import { Link } from 'react-router-dom'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

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

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
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
    ...rest
  } = props
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if ('to' in props && props.to !== undefined) {
    const { to } = props as ButtonAsLink
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if ('href' in props && props.href !== undefined) {
    const { href, download, target, rel } = props as ButtonAsAnchor
    return (
      <a
        href={href}
        download={download}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={classes}
      >
        {children}
      </a>
    )
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  )
}
