import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Logo } from './Logo'
import { Button } from './Button'
import { IconMenu, IconClose } from './Icons'
import { NAV_LINKS, CTA } from '../data/site'

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Close the mobile menu on route change.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Prevent background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-brand-700' : 'text-slate-600 hover:text-ink'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
      <div className="container-content flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button to={CTA.contact.to} variant="ghost" size="sm">
            Contact
          </Button>
          <Button to={CTA.intake.to} size="sm">
            Start Intake
          </Button>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg text-ink lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden">
          <nav
            className="container-content flex flex-col gap-1 border-t border-slate-200 py-4"
            aria-label="Mobile"
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Button to={CTA.intake.to} className="w-full">
                Start With the Intake Form
              </Button>
              <Button to={CTA.contact.to} variant="secondary" className="w-full">
                Contact Us
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
