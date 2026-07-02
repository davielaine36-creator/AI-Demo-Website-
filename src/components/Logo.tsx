import { Link } from 'react-router-dom'

interface LogoProps {
  className?: string
  onClick?: () => void
}

/** Wordmark + simple monogram mark. No image dependency. */
export function Logo({ className = '', onClick }: LogoProps) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 ${className}`}
      aria-label="Laine Industries — home"
    >
      <span
        aria-hidden
        className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-white shadow-soft"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6 4v16h12"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="17" cy="8" r="2.2" fill="currentColor" />
        </svg>
      </span>
      <span className="text-lg font-bold tracking-tight text-ink">
        Laine Industries
      </span>
    </Link>
  )
}
