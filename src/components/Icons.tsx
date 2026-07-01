// Lightweight inline SVG icons (stroke-based, Apple-ish, no dependencies).
import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const iconBase = (props: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...props,
})

export function IconGlobe(props: IconProps) {
  return (
    <svg {...iconBase(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
    </svg>
  )
}

export function IconLayout(props: IconProps) {
  return (
    <svg {...iconBase(props)}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  )
}

export function IconSparkles(props: IconProps) {
  return (
    <svg {...iconBase(props)}>
      <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z" />
      <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z" />
    </svg>
  )
}

export function IconBell(props: IconProps) {
  return (
    <svg {...iconBase(props)}>
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </svg>
  )
}

export function IconCart(props: IconProps) {
  return (
    <svg {...iconBase(props)}>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2 3h2l2.6 12.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.5L22 8H6" />
    </svg>
  )
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...iconBase(props)}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...iconBase(props)}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  )
}

export function IconClipboard(props: IconProps) {
  return (
    <svg {...iconBase(props)}>
      <rect x="8" y="4" width="8" height="4" rx="1" />
      <path d="M8 6H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2" />
    </svg>
  )
}

export function IconMail(props: IconProps) {
  return (
    <svg {...iconBase(props)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  )
}

export function IconDownload(props: IconProps) {
  return (
    <svg {...iconBase(props)}>
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  )
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...iconBase(props)}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  )
}

export function IconClose(props: IconProps) {
  return (
    <svg {...iconBase(props)}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  )
}

export function IconUsers(props: IconProps) {
  return (
    <svg {...iconBase(props)}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13A4 4 0 0 1 16 11" />
    </svg>
  )
}
