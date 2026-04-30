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
  { href: '/patients', label: 'المرضى', labelEn: 'Patients', icon: '👤' },
  { href: '/appointments', label: 'المواعيد', labelEn: 'Appointments', icon: '📅' },
  { href: '/providers', label: 'الأطباء', labelEn: 'Providers', icon: '👨‍⚕️' },
  { href: '/claims', label: 'المطالبات', labelEn: 'Claims', icon: '📋' },
  { href: '/knowledge', label: 'المعرفة', labelEn: 'KB', icon: '📚' },
]

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('hnh-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = saved === 'dark' || (!saved && prefersDark)
    if (isDark) {
      setDark(true)
      document.documentElement.classList.add('dark')
    }
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
                <h1 className="text-lg font-bold leading-tight">مستشفى حيات الوطني</h1>
                <p className="text-xs opacity-80 leading-tight">Hayat National Hospital · غرنطا</p>
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
            </nav>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6" style={{ minHeight: 'calc(100vh - 200px)' }}>
        {children}
      </main>

      <footer className="border-t py-6 mt-12" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            © 2026 مستشفى حيات الوطني - غرنطا | Powered by{' '}
            <a href="https://brainsait.org" className="underline hover:opacity-80" style={{ color: 'var(--primary)' }}>
              BrainSAIT Healthcare OS
            </a>
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
            Hayat National Hospital · Gharnata Branch · جميع الحقوق محفوظة
          </p>
        </div>
      </footer>

      <BasmaAssistant />
    </>
  )
}
