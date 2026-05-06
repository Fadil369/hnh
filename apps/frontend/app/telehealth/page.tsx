'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Video, Loader2, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useT } from '@/lib/i18n'
import { useAppointments, useStartTelehealth } from '@/hooks/useApi'

export default function TelehealthPage() {
  const { t, locale } = useT()
  const today = new Date().toISOString().split('T')[0]
  const { data: appointments = [], isLoading } = useAppointments(today)
  const start = useStartTelehealth()
  const [session, setSession] = useState<any>(null)

  const virtual = (appointments as any[]).filter(
    (a) => a.appointment_type === 'telehealth' || a.virtual === true || a.modality === 'virtual'
  )
  const list = virtual.length > 0 ? virtual : (appointments as any[])

  const onStart = async (a: any) => {
    try {
      const r: any = await start.mutateAsync({
        appointment_id: String(a.id),
        provider_id: a.provider_id ? String(a.provider_id) : undefined,
      })
      setSession({ ...r, appointment: a })
    } catch {/* toast handled */}
  }

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 py-10 space-y-6">
      <header>
        <Badge variant="info">Telehealth</Badge>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{t('telehealth.title')}</h1>
        <p className="text-sm text-muted-foreground">{t('telehealth.subtitle')}</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {locale === 'ar' ? 'جلسات اليوم' : "Today's virtual sessions"}
          </CardTitle>
          <CardDescription>
            {locale === 'ar' ? 'انضم بنقرة واحدة عبر فيديو آمن مع مُدوِّن AI.' : 'Join in one click with secure video and AI scribe.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="space-y-2 p-4">
              {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-12" />)}
            </div>
          ) : list.length === 0 ? (
            <div className="p-10 text-center text-sm text-muted-foreground">
              <Video className="mx-auto mb-3 h-6 w-6" />
              {t('telehealth.empty')}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{locale === 'ar' ? 'الوقت' : 'Time'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'المريض' : 'Patient'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'الطبيب' : 'Provider'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {list.slice(0, 20).map((a: any) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-mono text-xs">{a.appointment_time?.slice(0, 5) ?? '—'}</TableCell>
                    <TableCell className="font-medium">{a.patient_name ?? `#${a.patient_id ?? '—'}`}</TableCell>
                    <TableCell>{a.provider_name ?? `#${a.provider_id ?? '—'}`}</TableCell>
                    <TableCell><Badge variant="outline">{a.status ?? 'scheduled'}</Badge></TableCell>
                    <TableCell>
                      <Button size="sm" onClick={() => onStart(a)} disabled={start.isPending}>
                        {start.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Video className="h-4 w-4" />}
                        {t('telehealth.start')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AnimatePresence>
        {session ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {locale === 'ar' ? 'الجلسة الحية' : 'Live session'}
                </CardTitle>
                <CardDescription>
                  {session.appointment?.patient_name ?? `#${session.appointment?.patient_id}`}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {session.join_url ? (
                  <Button asChild>
                    <a href={session.join_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      {t('telehealth.join')}
                    </a>
                  </Button>
                ) : null}
                <pre className="overflow-x-auto rounded-md border bg-muted/40 p-3 text-xs">
                  {JSON.stringify(session, null, 2)}
                </pre>
              </CardContent>
            </Card>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
