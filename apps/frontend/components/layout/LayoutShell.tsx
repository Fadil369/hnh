'use client'

import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Search, Hospital } from 'lucide-react'

const BasmaAssistant = dynamic(() => import('@/app/components/BasmaAssistant'), { ssr: false })
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ThemeToggle, LocaleToggle } from './Toggles'
import { NAV, PRIMARY_NAV, PORTAL_NAV, SECONDARY_NAV } from './nav-config'
import { useT } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { useCommandPalette } from './CommandPalette'

const CommandPalette = dynamic(() => import('./CommandPalette').then((m) => m.CommandPalette), { ssr: false })

function NavLink({ href, label, active, Icon }: { href: string; label: string; active: boolean; Icon: any }) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all',
        'hover:bg-foreground/[0.06]',
        active && 'bg-primary/10 text-primary',
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  )
}

function CommandTrigger({ onClick }: { onClick: () => void }) {
  const { t } = useT()
  return (
    <button
      onClick={onClick}
      className="group flex h-9 w-full max-w-xs items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3.5 text-sm text-muted-foreground shadow-sm transition-all hover:border-primary/40 hover:bg-background"
      aria-label={t('common.search')}
    >
      <Search className="h-4 w-4 opacity-70" />
      <span className="truncate">{t('cmd.placeholder')}</span>
      <kbd className="ms-auto hidden items-center gap-0.5 rounded-md border bg-muted px-1.5 py-0.5 text-[10px] font-mono opacity-70 sm:inline-flex">
        ⌘K
      </kbd>
    </button>
  )
}

export default function LayoutShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { t } = useT()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { open: cmdOpen, setOpen: setCmdOpen } = useCommandPalette()

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname?.startsWith(href)

  return (
    <div className="relative flex min-h-dvh flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        Skip to main content
      </a>

      <header
        className={cn(
          'sticky top-0 z-40 border-b backdrop-blur-xl',
          'bg-background/80 supports-[backdrop-filter]:bg-background/60',
        )}
      >
        <div className="mx-auto flex h-[var(--header-h)] w-full max-w-screen-2xl items-center gap-3 px-4 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-2.5 font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground shadow-card">
              <Hospital className="h-4 w-4" />
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-[15px] font-semibold tracking-tight">HNH × BrainSAIT</span>
              <span className="text-[11px] font-medium text-muted-foreground">{t('app.tagline')}</span>
            </span>
          </Link>

          <nav className="ms-2 hidden items-center gap-1 lg:flex" aria-label="primary">
            {PRIMARY_NAV.slice(0, 6).map((n) => (
              <NavLink key={n.href} href={n.href} label={t(n.labelKey)} active={isActive(n.href)} Icon={n.icon} />
            ))}
          </nav>

          <div className="ms-auto flex items-center gap-2">
            <div className="hidden md:block">
              <CommandTrigger onClick={() => setCmdOpen(true)} />
            </div>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setCmdOpen(true)} aria-label={t('common.search')}>
              <Search className="h-4 w-4" />
            </Button>
            <LocaleToggle />
            <ThemeToggle />

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 p-0">
                <div className="flex h-full flex-col">
                  <div className="border-b p-4">
                    <span className="text-sm font-semibold">{t('app.title')}</span>
                  </div>
                  <div className="scrollbar-thin flex-1 overflow-y-auto p-3">
                    <NavGroup title={t('nav.home')} items={PRIMARY_NAV} pathname={pathname ?? ''} onClick={() => setMobileOpen(false)} />
                    <div className="my-3 h-px bg-border" />
                    <NavGroup title={t('nav.portals')} items={PORTAL_NAV} pathname={pathname ?? ''} onClick={() => setMobileOpen(false)} />
                    <div className="my-3 h-px bg-border" />
                    <NavGroup title={t('nav.integrations')} items={SECONDARY_NAV} pathname={pathname ?? ''} onClick={() => setMobileOpen(false)} />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main id="main" className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname ?? 'root'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t bg-card/40">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} HNH × BrainSAIT — Healthcare OS
          </p>
          <p className="text-xs text-muted-foreground">v9.3 · Cloudflare Workers</p>
        </div>
      </footer>

      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
      <BasmaAssistant />
    </div>
  )
}

function NavGroup({ title, items, pathname, onClick }: { title: string; items: typeof NAV; pathname: string; onClick: () => void }) {
  const { t } = useT()
  return (
    <div>
      <div className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{title}</div>
      <ul className="space-y-0.5">
        {items.map((n) => {
          const Icon = n.icon
          const active = n.href === '/' ? pathname === '/' : pathname.startsWith(n.href)
          return (
            <li key={n.href}>
              <Link
                href={n.href}
                onClick={onClick}
                className={cn(
                  'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors hover:bg-accent',
                  active && 'bg-accent font-medium text-primary',
                )}
              >
                <Icon className="h-4 w-4 opacity-80" />
                <span>{t(n.labelKey)}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
