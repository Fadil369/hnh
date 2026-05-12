import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Providers } from './providers'
import LayoutShell from '@/components/layout/LayoutShell'

export const metadata: Metadata = {
  title: { default: 'HNH × BrainSAIT — Healthcare OS', template: '%s · HNH × BrainSAIT' },
  description:
    'Unified Saudi healthcare platform: NPHIES, FHIR, RCM and Basma AI orchestration for HNH-Gharnata. Bilingual, accessible, production-grade on Cloudflare.',
  applicationName: 'HNH BrainSAIT Healthcare OS',
  authors: [{ name: 'BrainSAIT' }],
  keywords: ['NPHIES', 'FHIR', 'RCM', 'Saudi healthcare', 'Cloudflare Workers', 'BrainSAIT'],
  openGraph: {
    title: 'HNH × BrainSAIT — Healthcare OS',
    description: 'NPHIES, FHIR, RCM and Basma AI orchestration in one bilingual platform.',
    type: 'website',
  },
  icons: { icon: '/favicon.ico' },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f0f4ff' },
    { media: '(prefers-color-scheme: dark)',  color: '#060c1a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <Providers>
          <LayoutShell>{children}</LayoutShell>
        </Providers>
      </body>
    </html>
  )
}

