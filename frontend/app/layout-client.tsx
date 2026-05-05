'use client'

import { useState, useEffect } from 'react'
import BasmaAssistant from './components/BasmaAssistant'

function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg transition-colors hover:opacity-80"
      style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' }}
      title={dark ? 'الوضع النهاري | Light Mode' : 'الوضع الليلي | Dark Mode'}
    >
      {dark ? '☀️' : '🌙'}
    </button>
  )
}

const NAV_ITEMS = [
  { href: '/', label: 'الرئيسية', labelEn: 'Home', icon: '🏠' },
  { href: '/portal', label: 'المنافذ', labelEn: 'Portals', icon: '🌐' },
  { href: '/stitch', label: 'التصاميم', labelEn: 'Designs', icon: '🎨' },
  { href: '/patients', label: 'المرضى', labelEn: 'Patients', icon: '👤' },
  { href: '/appointments', label: 'المواعيد', labelEn: 'Appointments', icon: '📅' },
  { href: '/eligibility', label: 'الأهلية', labelEn: 'Eligibility', icon: '✅' },
  { href: '/claims', label: 'المطالبات', labelEn: 'Claims', icon: '📋' },
]

const PORTAL_NAV = [
  { href: '/givc', label: 'GIVC', icon: '🩺', color: 'bg-emerald-600' },
  { href: '/sbs', label: 'SBS', icon: '💰', color: 'bg-violet-600' },
  { href: '/nphies', label: 'NPHIES', icon: '🏛️', color: 'bg-amber-600' },
]

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [portalMenu, setPortalMenu] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('hnh-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = saved === 'dark' || (!saved && prefersDark)
    if (isDark) {
      setDark(true)
      document.documentElement.classList.add('dark')
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setPortalMenu(false); setMobileMenu(false) }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    localStorage.setItem('hnh-theme', next ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <>
      <header className="gradient-hero text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏥</span>
              <div>
                <h1 className="text-lg font-bold leading-tight">مستشفى حيات الوطني - نظام التشغيل</h1>
                <p className="text-xs opacity-80 leading-tight">HNH BrainSAIT Healthcare OS · Live Control Center</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-3 py-1.5 rounded-lg text-sm hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                >
                  {item.icon} {item.label}
                </a>
              ))}

              {/* Portal Switcher */}
              <div className="relative">
                <button
                  onClick={() => setPortalMenu(!portalMenu)}
                  aria-haspopup="menu"
                  aria-expanded={portalMenu}
                  className="px-3 py-1.5 rounded-lg text-sm hover:opacity-80 transition-opacity flex items-center gap-1"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                >
                  🌐 بوابات
                  <span className="text-xs opacity-70">▾</span>
                </button>
                {portalMenu && (
                  <div
                    role="menu"
                    className="absolute left-0 top-full mt-1 rounded-xl shadow-xl overflow-hidden z-50 min-w-40"
                    style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
                  >
                    {PORTAL_NAV.map(p => (
                      <a
                        key={p.href}
                        href={p.href}
                        role="menuitem"
                        onClick={() => setPortalMenu(false)}
                        className="flex items-center gap-2 px-4 py-3 text-sm hover:opacity-80 transition-opacity"
                        style={{ color: 'var(--text)' }}
                      >
                        <span className={`${p.color} text-white px-2 py-0.5 rounded text-xs font-bold`}>{p.label}</span>
                        <span>{p.icon}</span>
                      </a>
                    ))}
                    <a
                      href="https://portal.nphies.sa"
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      className="flex items-center gap-2 px-4 py-3 text-sm hover:opacity-80 transition-opacity border-t"
                      style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)' }}
                    >
                      <span className="text-xs">↗ portal.nphies.sa</span>
                    </a>
                  </div>
                )}
              </div>
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle dark={dark} onToggle={toggleDark} />
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="md:hidden p-2 rounded-lg"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                <span className="text-xl">{mobileMenu ? '✕' : '☰'}</span>
              </button>
            </div>
          </div>

          {mobileMenu && (
            <nav className="md:hidden pb-4 flex flex-col gap-1.5">
              {NAV_ITEMS.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenu(false)}
                  className="px-3 py-2 rounded-lg text-sm"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                >
                  {item.icon} {item.label}
                  <span className="opacity-60 mr-2" dir="ltr">({item.labelEn})</span>
                </a>
              ))}
              <div className="border-t my-1" style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
              {PORTAL_NAV.map(p => (
                <a
                  key={p.href}
                  href={p.href}
                  onClick={() => setMobileMenu(false)}
                  className="px-3 py-2 rounded-lg text-sm"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                >
                  {p.icon} {p.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6" style={{ minHeight: 'calc(100vh - 200px)' }}>
        {children}
      </main>

      <footer className="border-t py-6 mt-12" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-3 mb-3 text-xs">
            <a href="/portal" className="hover:underline" style={{ color: 'var(--primary)' }}>🌐 Hub</a>
            <a href="https://bsma.elfadil.com" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: 'var(--primary)' }}>🙂 BSMA</a>
            <a href="https://givc.elfadil.com" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: 'var(--primary)' }}>🩺 GIVC</a>
            <a href="https://sbs.elfadil.com" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: 'var(--primary)' }}>💰 SBS</a>
            <a href="https://portal.nphies.sa" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: 'var(--primary)' }}>🏛️ NPHIES</a>
            <a href="https://oracle-bridge.brainsait.org" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: 'var(--primary)' }}>🔷 Oracle</a>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            © 2026 HNH BrainSAIT Healthcare OS | Powered by{' '}
            <a href="https://brainsait.org" className="underline hover:opacity-80" style={{ color: 'var(--primary)' }}>
              BrainSAIT
            </a>
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            Basma AI · GIVC · NPHIES · Oracle · SBS · ClaimLinc · Live Control Center v9.1 · جميع الحقوق محفوظة
          </p>
        </div>
      </footer>

      <BasmaAssistant />
    </>
  )
}

