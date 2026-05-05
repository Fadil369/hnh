'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import BasmaAssistant from './components/BasmaAssistant'

function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="flex h-10 w-10 items-center justify-center rounded-full border text-base transition-all hover:scale-105"
      style={{
        backgroundColor: 'rgba(255,255,255,0.10)',
        borderColor: 'rgba(255,255,255,0.14)',
        color: 'white',
      }}
      title={dark ? 'الوضع النهاري | Light Mode' : 'الوضع الليلي | Dark Mode'}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? '☀️' : '🌙'}
    </button>
  )
}

const NAV_ITEMS = [
  { href: '/',            label: 'الرئيسية',  labelEn: 'Home',         icon: '🏠' },
  { href: '/portal',      label: 'المنافذ',    labelEn: 'Portals',      icon: '🌐' },
  { href: '/integrations',label: 'التكامل',    labelEn: 'Integrations', icon: '🔗' },
  { href: '/github',      label: 'GitHub',     labelEn: 'GitHub',       icon: '🐙' },
  { href: '/workflows',   label: 'سير العمل',  labelEn: 'Workflows',    icon: '⚙️' },
  { href: '/patients',    label: 'المرضى',     labelEn: 'Patients',     icon: '👤' },
  { href: '/appointments',label: 'المواعيد',   labelEn: 'Appointments', icon: '📅' },
  { href: '/eligibility', label: 'الأهلية',    labelEn: 'Eligibility',  icon: '✅' },
  { href: '/claims',      label: 'المطالبات',  labelEn: 'Claims',       icon: '📋' },
]

// Primary nav shown in mobile bottom bar (most used)
const MOBILE_PRIMARY = NAV_ITEMS.slice(0, 5)

const PORTAL_NAV = [
  { href: '/givc',   label: 'GIVC',   labelAr: 'بوابة جيفك',   icon: '🩺', desc: 'Provider clinical workstation' },
  { href: '/sbs',    label: 'SBS',    labelAr: 'بوابة الفوترة', icon: '💰', desc: 'Saudi billing & RCM' },
  { href: '/nphies', label: 'NPHIES', labelAr: 'بوابة نفيز',    icon: '🏛️', desc: 'Insurance exchange' },
]

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [dark, setDark] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [portalMenu, setPortalMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('hnh-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = saved === 'dark' || (!saved && prefersDark)
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setPortalMenu(false); setMobileMenu(false) }
    }
    const handleScroll = () => setScrolled(window.scrollY > 12)

    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => { setPortalMenu(false); setMobileMenu(false) }, [pathname])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    localStorage.setItem('hnh-theme', next ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', next)
  }

  const activeSection = useMemo(() => {
    const current = NAV_ITEMS.find(item => item.href !== '/' && pathname?.startsWith(item.href))
    if (current) return current
    return NAV_ITEMS.find(item => item.href === pathname) ?? NAV_ITEMS[0]
  }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname?.startsWith(`${href}/`)

  return (
    <div className="app-shell">
      {/* ─── Header ──────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(5, 13, 31, 0.94)'
            : 'linear-gradient(150deg, #050f24 0%, #0e1e3e 100%)',
          backdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          boxShadow: scrolled ? '0 8px 32px rgba(5,13,31,0.28)' : 'none',
        }}
      >
        <div className="mx-auto max-w-screen-xl px-4 py-3 md:py-4">
          {/* Top bar — version / status */}
          <div className="mb-2 flex items-center justify-between text-[11px] text-white/50">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5">
                <span className="live-dot" />
                Live Control Center
              </span>
              <span className="hidden sm:inline text-white/30">·</span>
              <span className="hidden sm:inline">Saudi Vision 2030</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">{activeSection.labelEn}</span>
              <span className="status-pill border-white/10 bg-white/8 text-white/60">v9.3</span>
            </div>
          </div>

          {/* Brand row */}
          <div className="flex items-center justify-between gap-4">
            <a href="/" className="flex items-center gap-3 group">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl text-2xl shadow-lg transition-transform group-hover:scale-105"
                style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.55), rgba(6,182,212,0.4))', border: '1px solid rgba(255,255,255,0.14)' }}
              >
                🏥
              </div>
              <div>
                <h1 className="text-base font-bold leading-tight text-white md:text-lg">
                  مستشفى حيات الوطني
                </h1>
                <p className="text-[11px] text-white/55">HNH BrainSAIT Healthcare OS</p>
              </div>
            </a>

            <div className="flex items-center gap-2">
              <ThemeToggle dark={dark} onToggle={toggleDark} />

              {/* Portal switcher (desktop) */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setPortalMenu(open => !open)}
                  aria-haspopup="menu"
                  aria-expanded={portalMenu}
                  className="nav-chip border border-white/12 bg-white/8 text-white hover:bg-white/14"
                >
                  <span>🧭</span>
                  <span>بوابات</span>
                  <span className="text-[11px] opacity-60">{portalMenu ? '▲' : '▼'}</span>
                </button>

                {portalMenu && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border shadow-2xl animate-scale-in"
                    style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow-soft)' }}
                  >
                    <div className="px-3 py-2.5 text-[11px] font-semibold text-faint" style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-muted)' }}>
                      Portal Switcher
                    </div>
                    <div className="p-2">
                      {PORTAL_NAV.map(portal => (
                        <a
                          key={portal.href}
                          href={portal.href}
                          role="menuitem"
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all hover:bg-[var(--surface-muted)]"
                          style={{ color: 'var(--text)' }}
                        >
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl text-lg" style={{ background: 'var(--surface-strong)' }}>
                            {portal.icon}
                          </span>
                          <div>
                            <div className="font-semibold text-sm">{portal.labelAr}</div>
                            <div className="text-[11px] text-faint">{portal.desc}</div>
                          </div>
                          <span className="ms-auto text-xs text-faint">↗</span>
                        </a>
                      ))}
                    </div>
                    <div className="loud-divider" />
                    <a
                      href="https://portal.nphies.sa"
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      className="flex items-center justify-between px-4 py-3 text-xs text-faint hover:bg-[var(--surface-muted)]"
                    >
                      <span>NPHIES national portal</span>
                      <span dir="ltr">portal.nphies.sa ↗</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenu(open => !open)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white md:hidden hover:bg-white/14 transition-all"
                aria-label="Toggle navigation"
                aria-expanded={mobileMenu}
              >
                <span className="text-lg leading-none">{mobileMenu ? '✕' : '☰'}</span>
              </button>
            </div>
          </div>

          {/* Desktop nav row */}
          <nav className="mt-3 hidden flex-wrap items-center gap-1.5 md:flex">
            {NAV_ITEMS.map(item => {
              const active = isActive(item.href)
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-chip text-sm transition-all"
                  style={active
                    ? { background: 'rgba(255,255,255,0.16)', color: 'white', border: '1px solid rgba(255,255,255,0.20)', boxShadow: '0 2px 8px rgba(37,99,235,0.25)' }
                    : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                  <span className="hidden lg:inline text-[11px] opacity-55">{item.labelEn}</span>
                </a>
              )
            })}
          </nav>

          {/* Mobile expanded menu (full nav) */}
          {mobileMenu && (
            <nav
              className="mt-3 overflow-hidden rounded-2xl border p-3 md:hidden animate-slide-up"
              style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div className="grid grid-cols-2 gap-2">
                {NAV_ITEMS.map(item => {
                  const active = isActive(item.href)
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all"
                      style={active
                        ? { background: 'rgba(37,99,235,0.35)', color: 'white', border: '1px solid rgba(255,255,255,0.14)' }
                        : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.80)', border: '1px solid transparent' }}
                    >
                      <span>{item.icon}</span>
                      <div>
                        <div>{item.label}</div>
                        <div className="text-[10px] opacity-55">{item.labelEn}</div>
                      </div>
                    </a>
                  )
                })}
              </div>
              <div className="loud-divider my-3" />
              <div className="grid grid-cols-3 gap-2">
                {PORTAL_NAV.map(portal => (
                  <a
                    key={portal.href}
                    href={portal.href}
                    className="flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-center text-xs font-semibold"
                    style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.80)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <span className="text-xl">{portal.icon}</span>
                    <span>{portal.labelAr}</span>
                  </a>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* ─── Main content ─────────────────────────────────────────────────── */}
      <main className="mx-auto w-full max-w-screen-xl flex-1 px-4 py-5 md:py-7" style={{ minHeight: 'calc(100dvh - 200px)' }}>
        {children}
      </main>

      {/* ─── Footer ──────────────────────────────────────────────────────── */}
      <footer
        className="mt-12 border-t hidden md:block"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        <div className="mx-auto max-w-screen-xl px-4 py-8">
          <div className="panel-soft p-5">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="max-w-xl">
                <div className="section-kicker mb-3">Operational Surface</div>
                <h2 className="text-lg font-bold">HNH BrainSAIT Healthcare OS</h2>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Unified access to Basma AI, claims orchestration, clinical portals,
                  workflow automation, and connected healthcare services across the HNH network.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { href: '/portal',       label: '🌐 Hub' },
                  { href: '/integrations', label: '🔗 Integrations' },
                  { href: '/github',       label: '🐙 GitHub' },
                  { href: '/workflows',    label: '⚙️ Workflows' },
                  { href: 'https://bsma.elfadil.com', label: '🤖 Basma', external: true },
                  { href: 'https://sbs.elfadil.com',  label: '💰 SBS',   external: true },
                  { href: 'https://oracle-bridge.brainsait.org', label: '☁️ Oracle', external: true },
                ].map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="status-pill hover:translate-y-[-1px] transition-transform"
                    style={{ color: 'var(--primary)' }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="loud-divider my-5" />
            <div className="flex flex-col gap-2 text-xs md:flex-row md:items-center md:justify-between">
              <p className="text-muted">© 2026 HNH BrainSAIT Healthcare OS · Powered by BrainSAIT</p>
              <p className="text-faint">Basma AI · GIVC · NPHIES · Oracle · SBS · ClaimLinc · GitHub Models · v9.3</p>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── Mobile bottom navigation bar ─────────────────────────────────── */}
      <nav className="mobile-bottom-nav md:hidden" aria-label="Mobile navigation">
        <div className="flex items-center justify-around px-1 py-1.5">
          {MOBILE_PRIMARY.map(item => {
            const active = isActive(item.href)
            return (
              <a
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-h-[52px] justify-center"
                style={active
                  ? { color: 'var(--primary)', background: 'color-mix(in srgb, var(--primary) 12%, transparent)' }
                  : { color: 'var(--text-secondary)' }}
              >
                <span className="text-xl leading-none">{item.icon}</span>
                <span className="text-[10px] font-semibold leading-tight">{item.label}</span>
              </a>
            )
          })}
          {/* More button triggers overlay menu */}
          <button
            onClick={() => setMobileMenu(open => !open)}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl min-h-[52px] justify-center transition-all"
            style={{ color: mobileMenu ? 'var(--primary)' : 'var(--text-secondary)' }}
            aria-label="More navigation"
          >
            <span className="text-xl leading-none">{mobileMenu ? '✕' : '⋯'}</span>
            <span className="text-[10px] font-semibold leading-tight">المزيد</span>
          </button>
        </div>
      </nav>

      <BasmaAssistant />
    </div>
  )
}

