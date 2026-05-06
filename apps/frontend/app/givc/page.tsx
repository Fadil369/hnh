'use client'

import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { Stethoscope, Loader2, Sparkles, Users, Calendar, Search, FileText, FlaskConical, Image as ImageIcon, ScrollText } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useT } from '@/lib/i18n'
import { useProviders, useAppointments, useRunWorkflow, usePatientHistory } from '@/hooks/useApi'

interface ClinicalForm {
  patient_id: string
  provider_id: string
  chief_complaint: string
}

export default function GivcPage() {
  const { t, locale } = useT()
  const { data: providers = [], isLoading: provLoading } = useProviders()
  const today = new Date().toISOString().split('T')[0]
  const { data: appointments = [], isLoading: apptLoading } = useAppointments(today)
  const run = useRunWorkflow()

  const form = useForm<ClinicalForm>({
    defaultValues: { patient_id: '', provider_id: '', chief_complaint: '' },
  })

  const [result, setResult] = useState<string>('')

  const metrics = useMemo(() => {
    const provs = (providers as any[]).length
    const appts = (appointments as any[]).length
    const confirmed = (appointments as any[]).filter((a) => a.status === 'confirmed').length
    return [
      { label: locale === 'ar' ? 'الأطباء' : 'Providers', value: provs, icon: Users },
      { label: locale === 'ar' ? 'مواعيد اليوم' : "Today's appointments", value: appts, icon: Calendar },
      { label: locale === 'ar' ? 'المؤكدة' : 'Confirmed', value: confirmed, icon: Stethoscope },
      { label: locale === 'ar' ? 'متاحة' : 'Available', value: Math.max(0, provs - confirmed), icon: Users },
    ]
  }, [providers, appointments, locale])

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const r: any = await run.mutateAsync({
        endpoint: '/api/workflows/provider/clinical-decision',
        payload: values,
      })
      setResult(r?.ai_summary || r?.summary || r?.error || JSON.stringify(r, null, 2))
    } catch (e: any) {
      setResult(e?.message ?? 'Failed')
    }
  })

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 py-10 space-y-6">
      <header>
        <Badge variant="info">GIVC</Badge>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{t('givc.title')}</h1>
        <p className="text-sm text-muted-foreground">{t('givc.subtitle')}</p>
      </header>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {metrics.map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Card>
              <CardHeader>
                <CardDescription className="flex items-center gap-2">
                  <m.icon className="h-4 w-4" />{m.label}
                </CardDescription>
                <CardTitle className="text-2xl">{m.value}</CardTitle>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{locale === 'ar' ? 'مواعيد اليوم' : "Today's appointments"}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {apptLoading ? (
            <div className="space-y-2 p-4">
              {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-10" />)}
            </div>
          ) : (appointments as any[]).length === 0 ? (
            <div className="p-10 text-center text-sm text-muted-foreground">
              {locale === 'ar' ? 'لا توجد مواعيد لليوم' : 'No appointments today'}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{locale === 'ar' ? 'الوقت' : 'Time'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'المريض' : 'Patient'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'الطبيب' : 'Provider'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(appointments as any[]).slice(0, 12).map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-mono text-xs">{a.appointment_time?.slice(0, 5)}</TableCell>
                    <TableCell>{a.patient_name ?? `#${a.patient_id}`}</TableCell>
                    <TableCell>{a.provider_name ?? `#${a.provider_id}`}</TableCell>
                    <TableCell><Badge variant="outline">{a.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{locale === 'ar' ? 'شبكة الأطباء' : 'Provider network'}</CardTitle>
        </CardHeader>
        <CardContent>
          {provLoading ? (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-20" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
              {(providers as any[]).slice(0, 8).map((p) => (
                <div key={p.id} className="rounded-lg border bg-card p-3">
                  <p className="text-sm font-medium">{p.first_name_en} {p.last_name_en}</p>
                  <p className="text-xs text-muted-foreground">{p.specialty}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Search className="h-4 w-4" />
            {t('history.title')}
          </CardTitle>
          <CardDescription>
            {locale === 'ar' ? 'بحث AutoRAG عبر السجلات والمختبرات والأشعة.' : 'AutoRAG search across encounters, labs, radiology, and reports.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PatientHistoryPanel />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            {t('givc.assist.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label={locale === 'ar' ? 'رقم المريض' : 'Patient ID'}>
              <Input dir="ltr" {...form.register('patient_id', { required: true })} />
            </Field>
            <Field label={locale === 'ar' ? 'رقم الطبيب' : 'Provider ID'}>
              <Input dir="ltr" {...form.register('provider_id', { required: true })} />
            </Field>
            <Field label={locale === 'ar' ? 'الشكوى الرئيسية' : 'Chief complaint'}>
              <Input {...form.register('chief_complaint', { required: true })} />
            </Field>
            <div className="sm:col-span-3">
              <Button type="submit" disabled={run.isPending}>
                {run.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {t('givc.assist.run')}
              </Button>
            </div>
          </form>
          <AnimatePresence>
            {result ? (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-lg border bg-muted/40 p-4">
                <pre className="whitespace-pre-wrap text-xs">{result}</pre>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </CardContent>
      </Card>
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

function PatientHistoryPanel() {
  const { t, locale } = useT()
  const [input, setInput] = useState('')
  const [activeId, setActiveId] = useState('')
  const { data, isLoading, isError } = usePatientHistory(activeId)

  const encounters = (data as any)?.encounters ?? []
  const labs = (data as any)?.labs ?? []
  const radiology = (data as any)?.radiology ?? []
  const reports = (data as any)?.reports ?? []
  const rag = (data as any)?.rag_results ?? []

  return (
    <div className="space-y-4">
      <form
        onSubmit={(e) => { e.preventDefault(); setActiveId(input.trim()) }}
        className="flex flex-col gap-2 sm:flex-row sm:items-end"
      >
        <div className="grid flex-1 gap-1.5">
          <Label>{t('history.lookup')}</Label>
          <Input dir="ltr" value={input} onChange={(e) => setInput(e.target.value)} placeholder="1XXXXXXXXX" />
        </div>
        <Button type="submit" disabled={!input.trim() || isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          {t('history.lookup')}
        </Button>
      </form>

      {!activeId ? null : isError ? (
        <p className="text-sm text-destructive">
          {locale === 'ar' ? 'تعذر جلب السجل' : 'Failed to fetch history'}
        </p>
      ) : (
        <Tabs defaultValue="encounters">
          <TabsList>
            <TabsTrigger value="encounters">
              <ScrollText className="h-3.5 w-3.5" />{t('history.encounters')} ({encounters.length})
            </TabsTrigger>
            <TabsTrigger value="labs">
              <FlaskConical className="h-3.5 w-3.5" />{t('history.labs')} ({labs.length})
            </TabsTrigger>
            <TabsTrigger value="radiology">
              <ImageIcon className="h-3.5 w-3.5" />{t('history.radiology')} ({radiology.length})
            </TabsTrigger>
            <TabsTrigger value="reports">
              <FileText className="h-3.5 w-3.5" />{t('history.reports')} ({reports.length})
            </TabsTrigger>
            <TabsTrigger value="rag">
              <Sparkles className="h-3.5 w-3.5" />{t('history.rag')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="encounters"><HistoryList items={encounters} fields={['date','provider','diagnosis']} /></TabsContent>
          <TabsContent value="labs"><HistoryList items={labs} fields={['date','test','result','flag']} /></TabsContent>
          <TabsContent value="radiology"><HistoryList items={radiology} fields={['date','modality','impression']} /></TabsContent>
          <TabsContent value="reports"><HistoryList items={reports} fields={['date','title','summary']} /></TabsContent>
          <TabsContent value="rag" className="space-y-2">
            {rag.length === 0 ? (
              <p className="p-6 text-center text-sm text-muted-foreground">
                {locale === 'ar' ? 'لا نتائج' : 'No matches'}
              </p>
            ) : rag.map((r: any, i: number) => (
              <motion.div key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}>
                <Card>
                  <CardContent className="p-3">
                    <p className="text-xs text-muted-foreground">{r.source ?? r.title ?? `Match #${i + 1}`}</p>
                    <p className="mt-1 text-sm">{r.text ?? r.snippet ?? r.content ?? JSON.stringify(r).slice(0, 300)}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

function HistoryList({ items, fields }: { items: any[]; fields: string[] }) {
  if (!items || items.length === 0) {
    return <p className="p-6 text-center text-sm text-muted-foreground">—</p>
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {fields.map((f) => <TableHead key={f} className="capitalize">{f}</TableHead>)}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.slice(0, 30).map((it, i) => (
          <TableRow key={it.id ?? i}>
            {fields.map((f) => (
              <TableCell key={f} className="text-sm">{String(it[f] ?? '—').slice(0, 120)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
