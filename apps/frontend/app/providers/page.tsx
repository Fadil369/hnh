'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CalendarPlus, Mail, Stethoscope, UserCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useT } from '@/lib/i18n'
import { useProviders } from '@/hooks/useApi'

export default function ProvidersPage() {
  const { t, locale } = useT()
  const { data: providers = [], isLoading } = useProviders()

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 py-10 space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Badge variant="info">Providers</Badge>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{t('providers.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('providers.subtitle')}</p>
        </div>
        {!isLoading && (
          <Badge variant="secondary" className="font-mono">
            {providers.length} {providers.length === 1 ? 'provider' : 'providers'}
          </Badge>
        )}
      </header>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-56 w-full rounded-2xl" />)}
        </div>
      ) : providers.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center text-sm text-muted-foreground">
            {t('providers.empty')}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {providers.map((p: any, idx: number) => {
            const nameAr = `${p.first_name_ar ?? ''} ${p.last_name_ar ?? ''}`.trim()
            const nameEn = `${p.first_name_en ?? ''} ${p.last_name_en ?? ''}`.trim()
            return (
              <motion.div
                key={p.id ?? idx}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
              >
                <Card className="h-full hover:-translate-y-0.5 transition-transform">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="grid h-14 w-14 place-items-center rounded-full bg-muted">
                        <UserCircle2 className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div className="min-w-0">
                        <CardTitle className="truncate text-lg">
                          {locale === 'ar' ? nameAr || nameEn : nameEn || nameAr}
                        </CardTitle>
                        <p className="truncate text-xs text-muted-foreground">
                          {locale === 'ar' ? nameEn : nameAr}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <Row label={locale === 'ar' ? 'التخصص' : 'Specialty'} icon={<Stethoscope className="h-4 w-4" />}>
                      <Badge variant="outline">{p.specialty || '—'}</Badge>
                    </Row>
                    <Row label={locale === 'ar' ? 'القسم' : 'Department'}>
                      <span>{p.department || '—'}</span>
                    </Row>
                    {p.license_number && (
                      <Row label={locale === 'ar' ? 'الترخيص' : 'License'}>
                        <span className="font-mono text-xs">{p.license_number}</span>
                      </Row>
                    )}
                    {p.email && (
                      <Row label={locale === 'ar' ? 'البريد' : 'Email'} icon={<Mail className="h-4 w-4" />}>
                        <span className="truncate text-xs" dir="ltr">{p.email}</span>
                      </Row>
                    )}
                    <Button asChild className="mt-2 w-full" size="sm">
                      <Link href="/appointments">
                        <CalendarPlus className="h-4 w-4" />
                        {t('providers.book')}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function Row({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b pb-2 last:border-0 last:pb-0">
      <span className="flex items-center gap-1.5 text-muted-foreground">
        {icon}
        {label}
      </span>
      <div className="text-end">{children}</div>
    </div>
  )
}
