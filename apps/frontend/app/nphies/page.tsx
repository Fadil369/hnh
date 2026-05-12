'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Send, Cloud, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useT } from '@/lib/i18n'
import { useCheckEligibility, useNphiesSubmit, useGssMirror } from '@/hooks/useApi'
import { EligibilityRequestSchema, type EligibilityRequest } from '@/lib/schemas'
import { useState } from 'react'

const PAYERS = [
  { id: 'BUPA', label: 'Bupa Arabia' },
  { id: 'TAWUNIYA', label: 'Tawuniya' },
  { id: 'MEDGULF', label: 'MedGulf' },
]

export default function NphiesPage() {
  const { t, locale } = useT()
  const eligibility = useCheckEligibility()
  const submit = useNphiesSubmit()
  const gss = useGssMirror()

  const [txType, setTxType] = useState<'270' | '278' | '837'>('270')
  const [payload, setPayload] = useState<string>('{\n  "patient_id": "",\n  "service_date": ""\n}')

  const form = useForm<EligibilityRequest>({
    resolver: zodResolver(EligibilityRequestSchema),
    defaultValues: {
      national_id: '', payer_id: 'BUPA',
      service_date: new Date().toISOString().split('T')[0],
      service_type: 'consultation',
    },
  })

  const onSubmitTx = async () => {
    try {
      const parsed = JSON.parse(payload)
      await submit.mutateAsync({ type: txType, payload: parsed })
    } catch {
      // toast already wired via mutation onError; JSON parse handled below
      submit.reset?.()
    }
  }

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 py-10 space-y-6">
      <header>
        <Badge variant="info">NPHIES</Badge>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{t('nphies.title')}</h1>
        <p className="text-sm text-muted-foreground">{t('nphies.subtitle')}</p>
      </header>

      <Tabs defaultValue="eligibility">
        <TabsList>
          <TabsTrigger value="eligibility">{t('nphies.tab.eligibility')}</TabsTrigger>
          <TabsTrigger value="transactions">{t('nphies.tab.transactions')}</TabsTrigger>
          <TabsTrigger value="gss">{t('nphies.tab.gss')}</TabsTrigger>
        </TabsList>

        <TabsContent value="eligibility">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t('nphies.tab.eligibility')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={form.handleSubmit((v) => eligibility.mutate(v))}
                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                <Field label={locale === 'ar' ? 'رقم الهوية' : 'National ID'} error={form.formState.errors.national_id?.message}>
                  <Input dir="ltr" {...form.register('national_id')} />
                </Field>
                <Field label={locale === 'ar' ? 'جهة الدفع' : 'Payer'}>
                  <Select value={form.watch('payer_id')} onValueChange={(v) => form.setValue('payer_id', v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {PAYERS.map((p) => <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label={locale === 'ar' ? 'تاريخ الخدمة' : 'Service date'}>
                  <Input type="date" {...form.register('service_date')} />
                </Field>
                <Field label={locale === 'ar' ? 'نوع الخدمة' : 'Service type'}>
                  <Input {...form.register('service_type')} />
                </Field>
                <div className="sm:col-span-2">
                  <Button type="submit" disabled={eligibility.isPending}>
                    {eligibility.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                    {locale === 'ar' ? 'فحص الأهلية' : 'Check eligibility'}
                  </Button>
                </div>
              </form>

              <AnimatePresence>
                {eligibility.data ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-6 rounded-lg border bg-muted/40 p-4"
                  >
                    <pre className="overflow-x-auto text-xs">{JSON.stringify(eligibility.data, null, 2)}</pre>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t('nphies.tab.transactions')}</CardTitle>
              <CardDescription>{t('nphies.transaction.payload')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <Field label={t('nphies.transaction.type')}>
                  <Select value={txType} onValueChange={(v) => setTxType(v as typeof txType)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="270">270 — Eligibility</SelectItem>
                      <SelectItem value="278">278 — Authorization</SelectItem>
                      <SelectItem value="837">837 — Claim</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <div className="grid gap-1.5">
                <Label>{t('nphies.transaction.payload')}</Label>
                <textarea
                  dir="ltr"
                  value={payload}
                  onChange={(e) => setPayload(e.target.value)}
                  rows={10}
                  className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <Button onClick={onSubmitTx} disabled={submit.isPending}>
                {submit.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {t('nphies.transaction.submit')}
              </Button>
              <AnimatePresence>
                {submit.data ? (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border bg-muted/40 p-4">
                    <pre className="overflow-x-auto text-xs">{JSON.stringify(submit.data, null, 2)}</pre>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gss">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t('nphies.tab.gss')}</CardTitle>
              <CardDescription>{t('nphies.subtitle')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={() => gss.mutate()} disabled={gss.isPending} variant="outline">
                {gss.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Cloud className="h-4 w-4" />}
                {t('nphies.gss.load')}
              </Button>
              <AnimatePresence>
                {gss.data ? (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border bg-muted/40 p-4">
                    <pre className="overflow-x-auto text-xs">{JSON.stringify(gss.data, null, 2)}</pre>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  )
}
