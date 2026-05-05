'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import BasmaAssistant from './components/BasmaAssistant'

function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="nav-chip surface-outline"
      style={{
        backgroundColor: 'rgba(255,255,255,0.12)',
        color: 'white',
      }}
      title={dark ? 'الوضع النهاري | Light Mode' : 'الوضع الليلي | Dark Mode'}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span>{dark ? '☀️' : '🌙'}</span>
      <span className="text-xs">{dark ? 'Light' : 'Dark'}</span>
    </button>
  )
}

const NAV_ITEMS = [
  { href: '/', label: 'الرئيسية', labelEn: 'Home', icon: '🏠' },
  { href: '/portal', label: 'المنافذ', labelEn: 'Portals', icon: '🌐' },
  { href: '/integrations', label: 'التكامل', labelEn: 'Integrations', icon: '🔗' },
  { href: '/workflows', label: 'سير العمل', labelEn: 'Workflows', icon: '⚙️' },
  { href: '/patients', label: 'المرضى', labelEn: 'Patients', icon: '👤' },
  { href: '/appointments', label: 'المواعيد', labelEn: 'Appointments', icon: '📅' },
  { href: '/eligibility', label: 'الأهلية', labelEn: 'Eligibility', icon: '✅' },
  { href: '/claims', label: 'المطالبات', labelEn: 'Claims', icon: '📋' },
]

const PORTAL_NAV = [
  { href: '/givc', label: 'GIVC', labelAr: 'بوابة جيفك', icon: '🩺' },
  { href: '/sbs', label: 'SBS', labelAr: 'بوابة الفوترة', icon: '💰' },
  { href: '/nphies', label: 'NPHIES', labelAr: 'بوابة نفيز', icon: '🏛️' },
]

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [dark, setDark] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [portalMenu, setPortalMenu] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('hnh-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = saved === 'dark' || (!saved && prefersDark)
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPortalMenu(false)
        setMobileMenu(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    setPortalMenu(false)
    setMobileMenu(false)
  }, [pathname])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    localStorage.setItem('hnh-theme', next ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', next)
  }

  const activeSection = useMemo(() => {
    const current = NAV_ITEMS.find((item) => item.href !== '/' && pathname?.startsWith(item.href))
    if (current) return current
    if (pathname?.startsWith('/stitch')) {
      return { href: '/stitch', label: 'الأصول البصرية', labelEn: 'Visual Assets', icon: '🎨' }
    }
    return NAV_ITEMS.find((item) => item.href === pathname) ?? NAV_ITEMS[0]
  }, [pathname])

  const linkStyles = (href: string) => {
    const active = href === '/'
      ? pathname === '/'
      : pathname === href || pathname?.startsWith(`${href}/`)

    return {
      active,
      className: `nav-chip ${active ? 'surface-outline' : ''}`,
      style: active
        ? {
            backgroundColor: 'rgba(255,255,255,0.18)',
            color: 'white',
            borderColor: 'rgba(255,255,255,0.24)',
          }
        : {
            backgroundColor: 'rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.92)',
          },
    }
  }

  return (
    <div className="app-shell">
      <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur-xl">
        <div className="gradient-hero text-white shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-white/78">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="status-pill border-white/10 bg-white/10 text-white">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Live Control Center
                  </span>
                  <span>Saudi Vision 2030 aligned</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                  <span className="status-pill border-white/10 bg-white/10 text-white">Bilingual Arabic/English</span>
                  <span className="status-pill border-white/10 bg-white/10 text-white">{activeSection.labelEn}</span>
                </div>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-2xl shadow-lg">
                    🏥
                  </div>
                  <div>
                    <h1 className="text-lg font-bold leading-tight md:text-xl">مستشفى حيات الوطني - نظام التشغيل</h1>
                    <p className="text-sm text-white/78">HNH BrainSAIT Healthcare OS</p>
                    <p className="text-xs text-white/60">Live command surface for portals, workflows, AI services, and clinical operations</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <ThemeToggle dark={dark} onToggle={toggleDark} />
                  <button
                    onClick={() => setMobileMenu((open) => !open)}
                    className="nav-chip md:hidden"
                    style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: 'white' }}
                    aria-label="Toggle navigation"
                    aria-expanded={mobileMenu}
                  >
                    <span className="text-base">{mobileMenu ? '✕' : '☰'}</span>
                    <span className="text-xs">Menu</span>
                  </button>
                </div>
              </div>

              <div className="hidden items-center justify-between gap-4 md:flex">
                <nav className="flex flex-wrap items-center gap-2">
                  {NAV_ITEMS.map((item) => {
                    const link = linkStyles(item.href)
                    return (
                      <a key={item.href} href={item.href} className={link.className} style={link.style}>
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                        <span className="text-xs text-white/65">{item.labelEn}</span>
                      </a>
                    )
                  })}
                </nav>

                <div className="relative">
                  <button
                    onClick={() => setPortalMenu((open) => !open)}
                    aria-haspopup="menu"
                    aria-expanded={portalMenu}
                    className="nav-chip surface-outline"
                    style={{ backgroundColor: 'rgba(255,255,255,0.14)', color: 'white', borderColor: 'rgba(255,255,255,0.18)' }}
                  >
                    <span>🧭</span>
                    <span>بوابات التشغيل</span>
                    <span className="text-xs text-white/70">Portal switcher</span>
                  </button>

                  {portalMenu && (
                    <div
                      role="menu"
                      className="absolute left-0 top-full mt-2 min-w-[18rem] overflow-hidden rounded-2xl border shadow-2xl"
                      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
                    >
                      <div className="px-4 py-3 text-xs text-muted" style={{ backgroundColor: 'var(--surface-muted)' }}>
                        Jump directly into operational portals.
                      </div>
                      <div className="p-2">
                        {PORTAL_NAV.map((portal) => (
                          <a
                            key={portal.href}
                            href={portal.href}
                            role="menuitem"
                            className="flex items-center justify-between rounded-xl px-3 py-3 hover:translate-x-[-2px]"
                            style={{ color: 'var(--text)' }}
                          >
                            <div className="flex items-center gap-3">
                              <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: 'var(--surface-strong)' }}>
                                {portal.icon}
                              </span>
                              <div className="bilingual-label">
                                <strong>{portal.label}</strong>
                                <span>{portal.labelAr}</span>
                              </div>
                            </div>
                            <span className="text-sm text-muted">↗</span>
                          </a>
                        ))}
                      </div>
                      <div className="loud-divider" />
                      <a
                        href="https://portal.nphies.sa"
                        target="_blank"
                        rel="noopener noreferrer"
                        role="menuitem"
                        className="flex items-center justify-between px-4 py-3 text-sm"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <span>National external portal</span>
                        <span dir="ltr">portal.nphies.sa ↗</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {mobileMenu && (
                <div className="panel md:hidden p-3">
                  <nav className="grid grid-cols-1 gap-2">
                    {NAV_ITEMS.map((item) => {
                      const link = linkStyles(item.href)
                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          className="flex items-center justify-between rounded-2xl px-4 py-3"
                          style={link.active
                            ? { backgroundColor: 'var(--primary)', color: 'white' }
                            : { backgroundColor: 'var(--surface-muted)', color: 'var(--text)' }}
                        >
                          <div className="flex items-center gap-3">
                            <span>{item.icon}</span>
                            <div className="bilingual-label">
                              <strong>{item.label}</strong>
                              <span style={{ color: link.active ? 'rgba(255,255,255,0.75)' : 'var(--text-secondary)' }}>{item.labelEn}</span>
                            </div>
                          </div>
                          <span className="text-sm">↗</span>
                        </a>
                      )
                    })}
                  </nav>

                  <div className="loud-divider my-3" />

                  <div className="grid grid-cols-1 gap-2">
                    {PORTAL_NAV.map((portal) => (
                      <a
                        key={portal.href}
                        href={portal.href}
                        className="flex items-center justify-between rounded-2xl px-4 py-3"
                        style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text)' }}
                      >
                        <div className="flex items-center gap-3">
                          <span>{portal.icon}</span>
                          <div className="bilingual-label">
                            <strong>{portal.label}</strong>
                            <span>{portal.labelAr}</span>
                          </div>
                        </div>
                        <span className="text-sm">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6" style={{ minHeight: 'calc(100vh - 220px)' }}>
        {children}
      </main>

      <footer className="mt-12 border-t" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="container mx-auto px-4 py-8">
          <div className="panel-soft p-5">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="max-w-2xl">
                <div className="section-kicker mb-3">Operational Surface</div>
                <h2 className="text-lg font-bold">HNH BrainSAIT Healthcare OS</h2>
                <p className="mt-2 text-sm text-muted">
                  Unified access to Basma AI, claims orchestration, clinical portals, workflow automation,
                  and connected healthcare services across the HNH network.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                <a href="/portal" className="status-pill hover:translate-y-[-1px]" style={{ color: 'var(--primary)' }}>🌐 Hub</a>
                <a href="/integrations" className="status-pill hover:translate-y-[-1px]" style={{ color: 'var(--primary)' }}>🔗 Integrations</a>
                <a href="/workflows" className="status-pill hover:translate-y-[-1px]" style={{ color: 'var(--primary)' }}>⚙️ Workflows</a>
                <a href="https://bsma.elfadil.com" target="_blank" rel="noopener noreferrer" className="status-pill hover:translate-y-[-1px]" style={{ color: 'var(--primary)' }}>🤖 Basma</a>
                <a href="https://sbs.elfadil.com" target="_blank" rel="noopener noreferrer" className="status-pill hover:translate-y-[-1px]" style={{ color: 'var(--primary)' }}>💰 SBS</a>
                <a href="https://oracle-bridge.brainsait.org" target="_blank" rel="noopener noreferrer" className="status-pill hover:translate-y-[-1px]" style={{ color: 'var(--primary)' }}>☁️ Oracle</a>
              </div>
            </div>

            <div className="loud-divider my-5" />

            <div className="flex flex-col gap-2 text-sm md:flex-row md:items-center md:justify-between">
              <p className="text-muted">© 2026 HNH BrainSAIT Healthcare OS · Powered by BrainSAIT</p>
              <p className="text-xs text-muted">Basma AI · GIVC · NPHIES · Oracle · SBS · ClaimLinc · Live Control Center v9.2</p>
            </div>
          </div>
        </div>
      </footer>

      <BasmaAssistant />
    </div>
  )
}
