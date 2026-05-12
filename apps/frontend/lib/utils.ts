import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(n: number | undefined | null, locale = 'en-US') {
  if (n === undefined || n === null) return '—'
  try { return new Intl.NumberFormat(locale).format(n) } catch { return String(n) }
}

export function formatDate(d: string | number | Date | undefined | null, locale = 'en-US', opts?: Intl.DateTimeFormatOptions) {
  if (!d) return '—'
  try {
    return new Intl.DateTimeFormat(locale, opts ?? { dateStyle: 'medium' }).format(new Date(d))
  } catch { return String(d) }
}

export function formatRelative(d: string | number | Date | undefined | null, locale = 'en-US') {
  if (!d) return '—'
  const target = new Date(d).getTime()
  const diff = (target - Date.now()) / 1000
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31536000], ['month', 2592000], ['week', 604800],
    ['day', 86400], ['hour', 3600], ['minute', 60], ['second', 1],
  ]
  for (const [unit, sec] of units) {
    if (Math.abs(diff) >= sec || unit === 'second') return rtf.format(Math.round(diff / sec), unit)
  }
  return rtf.format(0, 'second')
}
