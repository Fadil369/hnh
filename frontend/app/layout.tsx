import type { Metadata } from 'next'
import './globals.css'
import LayoutClient from './layout-client'

export const metadata: Metadata = {
  title: 'HNH BrainSAIT Healthcare OS | مركز التحكم الحيوي',
  description: 'HNH Operating System - Live Control Center for Al Hayat National Hospitals. Powered by BrainSAIT: Basma AI, GIVC, NPHIES, Oracle, SBS, ClaimLinc',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="antialiased">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  )
}
