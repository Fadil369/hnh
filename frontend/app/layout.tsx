import type { Metadata } from 'next'
import './globals.css'
import LayoutClient from './layout-client'

export const metadata: Metadata = {
  title: 'مستشفى حيات الوطني - غرنطا | Hayat National Hospital - Gharnata',
  description: 'بوابة خدمات المرضى لنظام معلومات مستشفى حيات - Hayat National Hospital Patient Portal powered by BrainSAIT Healthcare OS',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  )
}
