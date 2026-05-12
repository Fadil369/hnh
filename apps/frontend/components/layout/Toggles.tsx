'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { useT } from '@/lib/i18n'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { t } = useT()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t('theme.toggle')}>
          {mounted && theme === 'dark' ? (
            <Moon className="h-4 w-4" />
          ) : mounted && theme === 'system' ? (
            <Monitor className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          <Sun className="h-4 w-4" /> {t('cmd.theme.light')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          <Moon className="h-4 w-4" /> {t('cmd.theme.dark')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          <Monitor className="h-4 w-4" /> {t('cmd.theme.system')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function LocaleToggle() {
  const { locale, setLocale, t } = useT()
  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-1.5 font-semibold"
      onClick={() => setLocale(locale === 'ar' ? 'en' : 'ar')}
      aria-label={t('locale.toggle')}
    >
      {locale === 'ar' ? 'EN' : 'AR'}
    </Button>
  )
}
