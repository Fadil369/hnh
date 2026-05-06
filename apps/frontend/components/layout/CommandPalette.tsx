'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Sun, Moon, Monitor, Languages, Plus, Search } from 'lucide-react'
import {
  CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandShortcut,
} from '@/components/ui/command'
import { NAV } from './nav-config'
import { useT } from '@/lib/i18n'

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const router = useRouter()
  const { setTheme } = useTheme()
  const { t, locale, setLocale, dir } = useT()

  const run = (fn: () => void) => () => { onOpenChange(false); fn() }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title={t('cmd.placeholder')}>
      <CommandInput placeholder={t('cmd.placeholder')} dir={dir} />
      <CommandList>
        <CommandEmpty>{t('cmd.empty')}</CommandEmpty>
        <CommandGroup heading={t('cmd.pages')}>
          {NAV.map((item) => {
            const Icon = item.icon
            const label = t(item.labelKey)
            return (
              <CommandItem key={item.href} value={`${item.href} ${label}`} onSelect={run(() => router.push(item.href))}>
                <Icon className="h-4 w-4 opacity-70" />
                <span>{label}</span>
                <CommandShortcut>{item.href}</CommandShortcut>
              </CommandItem>
            )
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={t('cmd.actions')}>
          <CommandItem value="new patient" onSelect={run(() => router.push('/patients?new=1'))}>
            <Plus className="h-4 w-4 opacity-70" /> {t('patients.create')}
          </CommandItem>
          <CommandItem value="check eligibility" onSelect={run(() => router.push('/eligibility'))}>
            <Search className="h-4 w-4 opacity-70" /> {t('eligibility.check')}
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={t('cmd.theme')}>
          <CommandItem onSelect={run(() => setTheme('light'))}><Sun className="h-4 w-4 opacity-70" />{t('cmd.theme.light')}</CommandItem>
          <CommandItem onSelect={run(() => setTheme('dark'))}><Moon className="h-4 w-4 opacity-70" />{t('cmd.theme.dark')}</CommandItem>
          <CommandItem onSelect={run(() => setTheme('system'))}><Monitor className="h-4 w-4 opacity-70" />{t('cmd.theme.system')}</CommandItem>
        </CommandGroup>

        <CommandGroup heading={t('cmd.locale')}>
          <CommandItem onSelect={run(() => setLocale('en'))}><Languages className="h-4 w-4 opacity-70" />{t('cmd.locale.en')}</CommandItem>
          <CommandItem onSelect={run(() => setLocale('ar'))}><Languages className="h-4 w-4 opacity-70" />{t('cmd.locale.ar')}</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

export function useCommandPalette() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  return { open, setOpen }
}
