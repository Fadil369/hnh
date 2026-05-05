'use client'

import { useEffect, useMemo, useState, type ComponentType } from 'react'
import { usePathname } from 'next/navigation'
import {
  Home, Globe, Link2, Github, Workflow, Users, CalendarDays,
  ShieldCheck, ClipboardList, Sun, Moon, Menu, X, ChevronDown,
  Stethoscope, CreditCard, Building2, MoreHorizontal,
  ArrowUpRight, Hospital,
} from 'lucide-react'
import BasmaAssistant from './components/BasmaAssistant'

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavItem {
  href: string
  label: string
  labelEn: string
  Icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>
}

interface PortalItem {
  href: string
  label: string
  labelAr: string
  desc: string
  Icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>
}

// ─── Navigation config ────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { href: '/',             label: 'الرئيسية',   labelEn: 'Home',          Icon: Home },
  { href: '/portal',       label: 'المنافذ',     labelEn: 'Portals',       Icon: Globe },
  { href: '/integrations', label: 'التكامل',     labelEn: 'Integrations',  Icon: Link2 },
  { href: '/github',       label: 'GitHub',      labelEn: 'GitHub',        Icon: Github },
  { href: '/workflows',    label: 'سير العمل',   labelEn: 'Workflows',     Icon: Workflow },
  { href: '/patients',     label: 'المرضى',      labelEn: 'Patients',      Icon: Users },
  { href: '/appointments', label: 'المواعيد',    labelEn: 'Appointments',  Icon: CalendarDays },
  { href: '/eligibility',  label: 'الأهلية',     labelEn: 'Eligibility',   Icon: ShieldCheck },
  { href: '/claims',       label: 'المطالبات',   labelEn: 'Claims',        Icon: ClipboardList },
]

const MOBILE_PRIMARY = NAV_ITEMS.slice(0, 5)

const PORTAL_NAV: PortalItem[] = [
  { href: '/givc',   label: 'GIVC',   labelAr: 'بوابة جيفك',   desc: 'Provider clinical workstation', Icon: Stethoscope },
  { href: '/sbs',    label: 'SBS',    labelAr: 'بوابة الفوترة', desc: 'Saudi billing & RCM',           Icon: CreditCard },
  { href: '/nphies', label: 'NPHIES', labelAr: 'بوابة نفيز',    desc: 'Insurance exchange',             Icon: Building2 },
]

// ─── Sub-components ───────────────────────────────────────────────────────────
function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="flex h-9 w-9 items-center justify-center rounded-xl border transition-all hover:scale-105 hover:bg-white/15 active:scale-95"
      style={{ borderColor: 'rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.85)' }}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark
        ? <Sun size={16} strokeWidth={2} />
        : <Moon size={16} strokeWidth={2} />}
    </button>
  )
}

// ─── Main layout ──────────────────────────────────────────────────────────────
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

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setPortalMenu(false); setMobileMenu(false) }
    }
    const onScroll = () => setScrolled(window.scrollY > 12)

    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
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
    const match = NAV_ITEMS.find(item => item.href !== '/' && pathname?.startsWith(item.href))
    return match ?? NAV_ITEMS.find(item => item.href === pathname) ?? NAV_ITEMS[0]
  }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname?.startsWith(`${href}/`)

  return (
    <div className="app-shell">

      {/* ─── Header ──────────────────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(5, 13, 31, 0.94)'
            : 'linear-gradient(150deg, #050f24 0%, #0e1e3e 100%)',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 24px rgba(5,13,31,0.32)' : 'none',
        }}
      >
        <div className="mx-auto max-w-screen-xl px-4">

          {/* Status bar */}
          <div className="flex items-center justify-between py-2 text-[11px]" style={{ color: 'rgba(255,255,255,0.45)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="live-dot" style={{ width: 6, height: 6 }} />
                Live Control Center
              </span>
              <span className="hidden sm:inline" style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
              <span className="hidden sm:inline">Saudi Vision 2030</span>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>{activeSection.labelEn}</span>
          </div>

          {/* Brand + actions */}
          <div className="flex items-center justify-between gap-4 py-3">
            <a href="/" className="group flex items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(37,99,235,0.6), rgba(6,182,212,0.45))',
                  border: '1px solid rgba(255,255,255,0.16)',
                  boxShadow: '0 4px 16px rgba(37,99,235,0.30)',
                }}
              >
                <Hospital size={20} strokeWidth={1.75} style={{ color: 'white' }} />
              </div>
              <div>
                <p className="text-sm font-bold leading-tight text-white md:text-base">
                  مستشفيات الحياة الوطني
                </p>
                <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.50)' }}>
                  HNH · BrainSAIT Healthcare OS
                </p>
              </div>
            </a>

            <div className="flex items-center gap-2">
              <ThemeToggle dark={dark} onToggle={toggleDark} />

              {/* Portal switcher — desktop */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setPortalMenu(o => !o)}
                  aria-haspopup="menu"
                  aria-expanded={portalMenu}
                  className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-all hover:bg-white/10 active:scale-95"
                  style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.80)' }}
                >
                  <Globe size={14} strokeWidth={2} />
                  <span>Portals</span>
                  <ChevronDown
                    size={12}
                    strokeWidth={2.5}
                    className="transition-transform"
                    style={{ transform: portalMenu ? 'rotate(180deg)' : 'rotate(0deg)', color: 'rgba(255,255,255,0.45)' }}
                  />
                </button>

                {portalMenu && (
                  <div
                    role="menu"
                    className="animate-scale-in absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-2xl border shadow-2xl"
                    style={{ background: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow-soft)' }}
                  >
                    <p className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)', borderBottom: '1px solid var(--border)', background: 'var(--surface-muted)' }}>
                      Clinical Portals
                    </p>
                    <div className="p-2">
                      {PORTAL_NAV.map(({ href, label, labelAr, desc, Icon }) => (
                        <a
                          key={href}
                          href={href}
                          role="menuitem"
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-[var(--surface-muted)]"
                          style={{ color: 'var(--text)' }}
                        >
                          <span
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                            style={{ background: 'var(--surface-strong)', color: 'var(--primary)' }}
                          >
                            <Icon size={16} strokeWidth={1.75} />
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold">{labelAr}</p>
                            <p className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>{desc}</p>
                          </div>
                          <ArrowUpRight size={14} strokeWidth={2} style={{ color: 'var(--text-tertiary)' }} />
                        </a>
                      ))}
                    </div>
                    <div className="loud-divider" />
                    <a
                      href="https://portal.nphies.sa"
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      className="flex items-center justify-between px-4 py-3 text-xs transition-colors hover:bg-[var(--surface-muted)]"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      <span>NPHIES national portal</span>
                      <span className="flex items-center gap-1">portal.nphies.sa <ArrowUpRight size={11} /></span>
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenu(o => !o)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border transition-all hover:bg-white/10 active:scale-95 md:hidden"
                style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.80)' }}
                aria-label="Toggle navigation"
                aria-expanded={mobileMenu}
              >
                {mobileMenu
                  ? <X size={16} strokeWidth={2} />
                  : <Menu size={16} strokeWidth={2} />}
              </button>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 pb-3 md:flex" aria-label="Main navigation">
            {NAV_ITEMS.map(({ href, label, labelEn, Icon }) => {
              const active = isActive(href)
              return (
                <a
                  key={href}
                  href={href}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all hover:bg-white/10 active:scale-95"
                  style={active
                    ? { background: 'rgba(255,255,255,0.14)', color: 'white', border: '1px solid rgba(255,255,255,0.18)' }
                    : { color: 'rgba(255,255,255,0.68)', border: '1px solid transparent' }}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon size={14} strokeWidth={active ? 2.25 : 1.75} />
                  <span>{label}</span>
                  <span className="hidden lg:inline text-[11px]" style={{ color: active ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.35)' }}>
                    {labelEn}
                  </span>
                </a>
              )
            })}
          </nav>

          {/* Mobile expanded menu */}
          {mobileMenu && (
            <nav
              className="animate-slide-up mb-3 overflow-hidden rounded-2xl border p-3 md:hidden"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
              aria-label="Mobile navigation"
            >
              <div className="grid grid-cols-2 gap-1.5">
                {NAV_ITEMS.map(({ href, label, labelEn, Icon }) => {
                  const active = isActive(href)
                  return (
                    <a
                      key={href}
                      href={href}
                      className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all"
                      style={active
                        ? { background: 'rgba(37,99,235,0.30)', color: 'white', border: '1px solid rgba(255,255,255,0.14)' }
                        : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.06)' }}
                      aria-current={active ? 'page' : undefined}
                    >
                      <Icon size={15} strokeWidth={active ? 2.25 : 1.75} className="shrink-0" />
                      <div className="min-w-0">
                        <p className="truncate">{label}</p>
                        <p className="truncate text-[10px]" style={{ color: 'rgba(255,255,255,0.40)' }}>{labelEn}</p>
                      </div>
                    </a>
                  )
                })}
              </div>

              <div className="loud-divider my-3" />

              <div className="grid grid-cols-3 gap-1.5">
                {PORTAL_NAV.map(({ href, labelAr, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    className="flex flex-col items-center gap-2 rounded-xl px-2 py-3 text-center text-xs font-medium transition-all hover:bg-white/10"
                    style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.72)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <Icon size={18} strokeWidth={1.75} />
                    <span>{labelAr}</span>
                  </a>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* ─── Main content ──────────────────────────────────────────────────────── */}
      <main
        className="mx-auto w-full max-w-screen-xl flex-1 px-4 py-5 md:py-7"
        style={{ minHeight: 'calc(100dvh - 200px)' }}
      >
        {children}
      </main>

      {/* ─── Footer — desktop only ─────────────────────────────────────────────── */}
      <footer
        className="mt-12 hidden border-t md:block"
        style={{ background: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        <div className="mx-auto max-w-screen-xl px-4 py-8">
          <div className="panel-soft p-5">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-md">
                <div className="section-kicker mb-3">Operational Surface</div>
                <h2 className="text-base font-bold">HNH BrainSAIT Healthcare OS</h2>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Unified access to Basma AI, claims orchestration, clinical portals,
                  workflow automation, and connected healthcare services across the HNH network.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { href: '/integrations', label: 'Integrations', Icon: Link2 },
                  { href: '/github',       label: 'GitHub',       Icon: Github },
                  { href: '/workflows',    label: 'Workflows',    Icon: Workflow },
                  { href: 'https://bsma.elfadil.com', label: 'Basma AI', Icon: Globe, external: true },
                  { href: 'https://sbs.elfadil.com',  label: 'SBS',      Icon: CreditCard, external: true },
                ].map(({ href, label, Icon, external }) => (
                  <a
                    key={href}
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="status-pill transition-transform hover:-translate-y-px"
                    style={{ color: 'var(--primary)' }}
                  >
                    <Icon size={12} strokeWidth={2} />
                    {label}
                  </a>
                ))}
              </div>
            </div>
            <div className="loud-divider my-5" />
            <div className="flex flex-col gap-1.5 text-xs md:flex-row md:items-center md:justify-between" style={{ color: 'var(--text-tertiary)' }}>
              <p>© 2026 HNH · BrainSAIT Healthcare OS · All rights reserved</p>
              <p>Basma AI · GIVC · NPHIES · Oracle · SBS · ClaimLinc · GitHub Models · v9.3</p>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── Mobile bottom nav ─────────────────────────────────────────────────── */}
      <nav className="mobile-bottom-nav md:hidden" aria-label="Mobile primary navigation">
        <div className="flex items-center justify-around px-1 py-1">
          {MOBILE_PRIMARY.map(({ href, label, Icon }) => {
            const active = isActive(href)
            return (
              <a
                key={href}
                href={href}
                className="flex flex-col items-center gap-1 rounded-xl px-2 py-2 transition-all"
                style={{
                  minWidth: 52,
                  color: active ? 'var(--primary)' : 'var(--text-tertiary)',
                  background: active ? 'color-mix(in srgb, var(--primary) 10%, transparent)' : 'transparent',
                }}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={20} strokeWidth={active ? 2.25 : 1.75} />
                <span className="text-[10px] font-semibold leading-none">{label}</span>
              </a>
            )
          })}
          <button
            onClick={() => setMobileMenu(o => !o)}
            className="flex flex-col items-center gap-1 rounded-xl px-2 py-2 transition-all"
            style={{
              minWidth: 52,
              color: mobileMenu ? 'var(--primary)' : 'var(--text-tertiary)',
              background: mobileMenu ? 'color-mix(in srgb, var(--primary) 10%, transparent)' : 'transparent',
            }}
            aria-label="More navigation"
          >
            {mobileMenu
              ? <X size={20} strokeWidth={2.25} />
              : <MoreHorizontal size={20} strokeWidth={1.75} />}
            <span className="text-[10px] font-semibold leading-none">المزيد</span>
          </button>
        </div>
      </nav>

      <BasmaAssistant />
    </div>
  )
}
