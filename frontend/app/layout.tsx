import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'مستشفى حيات الوطني - غرنطا | Hayat National Hospital - Gharnata',
  description: 'بوابة خدمات المرضى - Hayat National Hospital Patient Portal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <header className="bg-blue-900 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">مستشفى حيات الوطني</h1>
            <nav className="space-x-4 space-x-reverse">
              <a href="/" className="hover:text-blue-300">الرئيسية</a>
              <a href="/patients" className="hover:text-blue-300">المرضى</a>
              <a href="/appointments" className="hover:text-blue-300">المواعيد</a>
              <a href="/providers" className="hover:text-blue-300">الأطباء</a>
            </nav>
          </div>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            <p>© 2026 مستشفى حيات الوطني - غرنطا | BrainSAIT Healthcare OS</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
