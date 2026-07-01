import { Link } from 'react-router-dom'
import { Logo } from './Logo'
import { NAV_LINKS, SITE, CONTACT_EMAIL } from '../data/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container-content py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              {SITE.tagline}
            </p>
            <p className="mt-4 text-sm text-slate-500">{SITE.location}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink">Pages</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-600 transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink">Get started</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  to="/intake"
                  className="text-sm text-slate-600 transition-colors hover:text-ink"
                >
                  Intake form
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-slate-600 transition-colors hover:text-ink"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-sm text-slate-600 transition-colors hover:text-ink"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-slate-600 transition-colors hover:text-ink"
                >
                  Privacy / Data Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-500">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-400">
            A Lane Industries System
          </p>
        </div>
      </div>
    </footer>
  )
}
