'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Database, FileWarning, Sparkles, Loader2, Wand2, ShieldCheck, Send, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useT } from '@/lib/i18n'
import {
  useLoadRcm, useGenerateAppeal,
  useNormalizeClaim, useValidateClaim, useSubmitClaim,
} from '@/hooks/useApi'

const BRANCHES = [
  { id: 'r001', label: 'Riyadh' },
  { id: 'm001', label: 'Makkah' },
  { id: 'j001', label: 'Jeddah' },
  { id: 'k001', label: 'Khobar' },
  { id: 'u001', label: 'Unayzah' },
]

export default function SbsPage() {
  const { t, locale } = useT()
  const [branch, setBranch] = useState('r001')
  const load = useLoadRcm(branch)
  const appeal = useGenerateAppeal()
  const [appeals, setAppeals] = useState<Record<string, string>>({})

  const dashboard = load.data?.dashboard
  const rejected = load.data?.rejected ?? []

  const onAppeal = async (id: string) => {
    const r: any = await appeal.mutateAsync(id)
    setAppeals((prev) => ({ ...prev, [id]: r?.appeal_text || r?.text || JSON.stringify(r).slice(0, 400) }))
  }

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 py-10 space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Badge variant="info">SBS · RCM</Badge>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{t('sbs.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('sbs.subtitle')}</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              {BRANCHES.map((b) => <SelectItem key={b.id} value={b.id}>{b.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={() => load.mutate()} disabled={load.isPending}>
            {load.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
            {t('sbs.load')}
          </Button>
        </div>
      </header>

      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard">{t('sbs.tab.dashboard')}</TabsTrigger>
          <TabsTrigger value="claims">{t('sbs.tab.claims')}</TabsTrigger>
          <TabsTrigger value="appeals">{t('sbs.tab.appeals')}</TabsTrigger>
          <TabsTrigger value="submit">{t('sbs.tab.submit')}</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          {!dashboard ? (
            <Card><CardContent className="p-10 text-center text-sm text-muted-foreground">
              {locale === 'ar' ? 'اضغط على "تحميل بيانات RCM" لعرض اللوحة.' : 'Press "Load RCM data" to populate the dashboard.'}
            </CardContent></Card>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Object.entries(dashboard).slice(0, 8).map(([k, v]) => (
                <Card key={k}>
                  <CardHeader>
                    <CardDescription className="capitalize">{k.replace(/_/g, ' ')}</CardDescription>
                    <CardTitle className="text-2xl">
                      {typeof v === 'number' ? v.toLocaleString() : String(v).slice(0, 40)}
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="claims">
          <Card>
            <CardContent className="p-0">
              {rejected.length === 0 ? (
                <div className="p-10 text-center text-sm text-muted-foreground">
                  <FileWarning className="mx-auto mb-3 h-6 w-6" />
                  {locale === 'ar' ? 'لا توجد مطالبات مرفوضة' : 'No rejected claims'}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>{locale === 'ar' ? 'المريض' : 'Patient'}</TableHead>
                      <TableHead>{locale === 'ar' ? 'السبب' : 'Reason'}</TableHead>
                      <TableHead className="text-end">{locale === 'ar' ? 'المبلغ' : 'Amount'}</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rejected.map((c: any) => (
                      <TableRow key={c.id ?? c.claim_id}>
                        <TableCell className="font-mono text-xs">{c.claim_number ?? c.id}</TableCell>
                        <TableCell>{c.patient_name ?? `#${c.patient_id ?? '—'}`}</TableCell>
                        <TableCell className="max-w-md truncate text-muted-foreground">{c.rejection_reason ?? c.reason ?? '—'}</TableCell>
                        <TableCell className="text-end font-mono">{Number(c.total_amount ?? c.amount ?? 0).toLocaleString()}</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" onClick={() => onAppeal(c.id ?? c.claim_id)} disabled={appeal.isPending}>
                            <Sparkles className="h-4 w-4" />
                            {t('sbs.appeal.generate')}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appeals" className="space-y-3">
          {Object.keys(appeals).length === 0 ? (
            <Card><CardContent className="p-10 text-center text-sm text-muted-foreground">
              {locale === 'ar' ? 'لا توجد طعون مولدة بعد' : 'No appeals generated yet'}
            </CardContent></Card>
          ) : (
            Object.entries(appeals).map(([id, text]) => (
              <motion.div key={id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Appeal · {id}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="whitespace-pre-wrap text-xs">{text}</pre>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </TabsContent>

        <TabsContent value="submit">
          <SubmissionPanel />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function SubmissionPanel() {
  const { t, locale } = useT()
  const [claimId, setClaimId] = useState('')
  const normalize = useNormalizeClaim()
  const validate = useValidateClaim()
  const submit = useSubmitClaim()
  const [results, setResults] = useState<Record<string, any>>({})

  const stages = [
    { key: 'normalize', icon: Wand2,        label: t('sbs.submit.normalize'), mut: normalize, tone: 'from-sky-500 to-cyan-500' },
    { key: 'validate',  icon: ShieldCheck,  label: t('sbs.submit.validate'),  mut: validate,  tone: 'from-emerald-500 to-teal-500' },
    { key: 'send',      icon: Send,         label: t('sbs.submit.send'),      mut: submit,    tone: 'from-fuchsia-500 to-purple-500' },
  ] as const

  async function run(key: string, mut: any) {
    if (!claimId) return
    try {
      const r = await mut.mutateAsync({ claim_id: claimId })
      setResults((prev) => ({ ...prev, [key]: r }))
    } catch (e: any) {
      setResults((prev) => ({ ...prev, [key]: { error: e?.message ?? 'failed' } }))
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('sbs.tab.submit')}</CardTitle>
          <CardDescription>
            {locale === 'ar'
              ? 'تطبيع المطالبة، التحقق منها، ثم إرسالها إلى نفيس 837.'
              : 'Normalize, validate, then transmit the claim to NPHIES 837.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <div className="grid gap-1.5">
              <Label>{locale === 'ar' ? 'رقم المطالبة' : 'Claim ID'}</Label>
              <Input dir="ltr" value={claimId} onChange={(e) => setClaimId(e.target.value)} placeholder="CLM-XXXXXX" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {stages.map((s) => {
              const r = results[s.key]
              const Icon = s.icon
              const done = r && !r.error
              return (
                <Card key={s.key} className="overflow-hidden">
                  <div className={`bg-gradient-to-r ${s.tone} p-4 text-white`}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-semibold">{s.label}</span>
                      {done ? <Check className="ms-auto h-4 w-4" /> : null}
                    </div>
                  </div>
                  <CardContent className="space-y-2 p-4">
                    <Button
                      size="sm"
                      variant={done ? 'outline' : 'default'}
                      onClick={() => run(s.key, s.mut)}
                      disabled={!claimId || s.mut.isPending}
                    >
                      {s.mut.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Icon className="h-4 w-4" />}
                      {s.label}
                    </Button>
                    {r ? (
                      <pre className="max-h-48 overflow-auto rounded-md border bg-muted/40 p-2 text-[11px]">
                        {JSON.stringify(r, null, 2)}
                      </pre>
                    ) : null}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
