'use client'

import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, CalendarClock, ExternalLink, Loader2, Radio, ShieldCheck, Video } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useT } from '@/lib/i18n'
import {
  useCreateTelehealthSession,
  useStartTelehealth,
  useTelehealthIceServers,
  useTelehealthSessions,
  useTelehealthStats,
} from '@/hooks/useApi'

type SessionForm = {
  patient_id: string
  provider_id: string
  branch_id: string
  session_date: string
  session_time: string
  session_type: string
  chief_complaint: string
}

const SESSION_TYPES = ['consultation', 'follow-up', 'second-opinion', 'pharmacy']

export default function TelehealthPage() {
  const { t, locale } = useT()
  const today = new Date().toISOString().split('T')[0]
  const [date, setDate] = useState(today)
  const [live, setLive] = useState<any>(null)
  const { data: sessions = [], isLoading } = useTelehealthSessions({ date, limit: 30 })
  const { data: stats } = useTelehealthStats()
  const { data: ice } = useTelehealthIceServers()
  const createSession = useCreateTelehealthSession()
  const start = useStartTelehealth()

  const form = useForm<SessionForm>({
    defaultValues: {
      patient_id: '',
      provider_id: '',
      branch_id: 'R001',
      session_date: today,
      session_time: '10:00',
      session_type: 'consultation',
      chief_complaint: '',
    },
  })

  const metrics = useMemo(() => [
    { label: locale === 'ar' ? 'إجمالي الجلسات' : 'Total sessions', value: stats?.total_sessions ?? 0, icon: Video },
    { label: locale === 'ar' ? 'اليوم' : 'Today', value: stats?.today ?? 0, icon: CalendarClock },
    { label: locale === 'ar' ? 'نشطة' : 'Active', value: stats?.active ?? 0, icon: Activity },
    { label: locale === 'ar' ? 'مكتملة' : 'Completed', value: stats?.completed ?? 0, icon: ShieldCheck },
  ], [locale, stats])

  const onSchedule = form.handleSubmit(async (values) => {
    const payload = {
      ...values,
      provider_id: values.provider_id || undefined,
      chief_complaint: values.chief_complaint || undefined,
    }
    const result: any = await createSession.mutateAsync(payload)
    setDate(values.session_date)
    setLive(result)
    form.reset({ ...values, patient_id: '', chief_complaint: '' })
  })

  async function onStart(session: any) {
    const result = await start.mutateAsync({ session_id: String(session.id) })
    setLive({ ...result, session })
  }

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 py-10 space-y-8">
      <section className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-soft md:p-8">
        <div className="absolute inset-0 bg-mesh-brand opacity-80" aria-hidden />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Badge variant="info" className="mb-4">
              <Radio className="h-3 w-3" />
              HNH Virtual Care
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{t('telehealth.title')}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{t('telehealth.subtitle')}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:min-w-[520px]">
            {metrics.map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-xl border bg-background/70 p-3 backdrop-blur">
                <Icon className="mb-2 h-4 w-4 text-primary" />
                <div className="text-2xl font-semibold">{Number(value).toLocaleString(locale)}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t('telehealth.schedule')}</CardTitle>
            <CardDescription>
              {locale === 'ar'
                ? 'تنشئ الجلسة في قاعدة بيانات HNH وتولد رابط غرفة آمن.'
                : 'Creates the session in HNH DB and issues a secure room link.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSchedule} className="grid gap-4">
              <Field label={locale === 'ar' ? 'رقم المريض' : 'Patient ID'}>
                <Input dir="ltr" {...form.register('patient_id', { required: true })} placeholder="14" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label={locale === 'ar' ? 'التاريخ' : 'Date'}>
                  <Input type="date" {...form.register('session_date', { required: true })} />
                </Field>
                <Field label={locale === 'ar' ? 'الوقت' : 'Time'}>
                  <Input type="time" {...form.register('session_time', { required: true })} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label={locale === 'ar' ? 'الفرع' : 'Branch'}>
                  <Input dir="ltr" {...form.register('branch_id')} />
                </Field>
                <Field label={locale === 'ar' ? 'الطبيب' : 'Provider'}>
                  <Input dir="ltr" {...form.register('provider_id')} placeholder="optional" />
                </Field>
              </div>
              <Field label={locale === 'ar' ? 'نوع الجلسة' : 'Session type'}>
                <Select
                  defaultValue="consultation"
                  onValueChange={(value) => form.setValue('session_type', value)}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SESSION_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label={locale === 'ar' ? 'الشكوى الرئيسية' : 'Chief complaint'}>
                <Input {...form.register('chief_complaint')} />
              </Field>
              <Button type="submit" disabled={createSession.isPending}>
                {createSession.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarClock className="h-4 w-4" />}
                {t('telehealth.schedule')}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-end justify-between gap-3 space-y-0">
            <div>
              <CardTitle className="text-base">{locale === 'ar' ? 'جدول الاستشارات' : 'Virtual care schedule'}</CardTitle>
              <CardDescription>{locale === 'ar' ? 'جلسات HNH الأصلية من قاعدة البيانات.' : 'Native HNH telehealth sessions from the database.'}</CardDescription>
            </div>
            <Input className="w-44" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="space-y-2 p-4">
                {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12" />)}
              </div>
            ) : sessions.length === 0 ? (
              <div className="p-12 text-center text-sm text-muted-foreground">
                <Video className="mx-auto mb-3 h-6 w-6" />
                {t('telehealth.empty')}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{locale === 'ar' ? 'الوقت' : 'Time'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'المريض' : 'Patient'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'النوع' : 'Type'}</TableHead>
                    <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessions.map((s: any) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-mono text-xs">{s.session_time?.slice(0, 5) ?? '—'}</TableCell>
                      <TableCell className="font-medium">{s.patient_name_ar || s.patient_name_en || `#${s.patient_id ?? '—'}`}</TableCell>
                      <TableCell>{s.session_type ?? 'consultation'}</TableCell>
                      <TableCell><Badge variant={s.status === 'in-progress' ? 'success' : 'outline'}>{s.status ?? 'scheduled'}</Badge></TableCell>
                      <TableCell className="text-end">
                        <Button size="sm" onClick={() => onStart(s)} disabled={start.isPending || s.status === 'completed'}>
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
      </div>

      <AnimatePresence>
        {live ? (
          <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t('telehealth.active')}</CardTitle>
                <CardDescription>{live.session_id || live.session?.id}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <Badge variant="success">{live.status || 'scheduled'}</Badge>
                  <p className="text-sm text-muted-foreground">
                    {t('telehealth.ice')}: {ice?.has_turn ? 'TURN + STUN' : 'STUN'} · {(ice?.ice_servers || live.ice_servers || []).length} servers
                  </p>
                </div>
                {live.join_url ? (
                  <Button asChild>
                    <a href={live.join_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      {t('telehealth.join')}
                    </a>
                  </Button>
                ) : null}
              </CardContent>
            </Card>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  )
}
