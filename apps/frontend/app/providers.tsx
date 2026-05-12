'use client'

import { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { I18nProvider, useT } from '@/lib/i18n'

function ToasterWithLocale() {
  const { dir } = useT()
  return (
    <Toaster
      richColors
      closeButton
      position={dir === 'rtl' ? 'top-left' : 'top-right'}
      dir={dir}
      toastOptions={{ classNames: { toast: 'font-sans' } }}
    />
  )
}

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            gcTime: 5 * 60_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  )
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="hnh-theme" disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <I18nProvider>
          <TooltipProvider delayDuration={150}>
            {children}
            <ToasterWithLocale />
          </TooltipProvider>
        </I18nProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
