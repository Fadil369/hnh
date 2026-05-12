'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, ShieldAlert, ShieldQuestion, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useT } from '@/lib/i18n'
import { useCheckEligibility } from '@/hooks/useApi'
import { EligibilityRequestSchema, type EligibilityRequest } from '@/lib/schemas'
import { toast } from 'sonner'

const PAYERS = [
  { id: 'BUPA',     label: 'Bupa Arabia' },
  { id: 'TAWUNIYA', label: 'Tawuniya' },
  { id: 'MEDGULF',  label: 'MedGulf' },
  { id: 'WALAA',    label: 'Walaa' },
  { id: 'AXA',      label: 'AXA Cooperative' },
]

const SERVICE_TYPES = [
  { id: 'consultation',    label: 'Consultation' },
  { id: 'lab',             label: 'Laboratory' },
  { id: 'radiology',       label: 'Radiology' },
  { id: 'pharmacy',        label: 'Pharmacy' },
  { id: 'inpatient',       label: 'Inpatient' },
  { id: 'emergency',       label: 'Emergency' },
]

export default function EligibilityPage() {
  const { t } = useT()
  const check = useCheckEligibility()

  const form = useForm<EligibilityRequest>({
    resolver: zodResolver(EligibilityRequestSchema),
    defaultValues: {
      national_id: '',
      payer_id: 'BUPA',
      service_date: new Date().toISOString().slice(0, 10),
      service_type: 'consultation',
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    const res = await check.mutateAsync(values)
    if (res?.eligible) toast.success(t('eligibility.eligible'))
    else if (res?.eligible === false) toast.error(t('eligibility.not_eligible'))
  })

  const result = check.data
  const isEligible = result?.eligible === true
  const isIneligible = result?.eligible === false

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <header className="mb-6">
        <Badge variant="info" className="mb-3">NPHIES 270 / 271</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">{t('eligibility.title')}</h1>
        <p className="text-sm text-muted-foreground">{t('eligibility.subtitle')}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Form */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Patient & coverage</CardTitle>
            <CardDescription>Enter the patient's National ID and payer details.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
              <Field label={t('eligibility.field.national_id')} error={form.formState.errors.national_id?.message} className="sm:col-span-2">
                <Input dir="ltr" inputMode="numeric" placeholder="10XXXXXXXX" {...form.register('national_id')} />
              </Field>
              <Field label={t('eligibility.field.payer_id')} error={form.formState.errors.payer_id?.message}>
                <Select value={form.watch('payer_id')} onValueChange={(v) => form.setValue('payer_id', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PAYERS.map((p) => <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label={t('eligibility.field.service_date')} error={form.formState.errors.service_date?.message}>
                <Input type="date" {...form.register('service_date')} />
              </Field>
              <Field label={t('eligibility.field.service_type')} error={form.formState.errors.service_type?.message} className="sm:col-span-2">
                <Select value={form.watch('service_type')} onValueChange={(v) => form.setValue('service_type', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SERVICE_TYPES.map((s) => <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <div className="sm:col-span-2 flex justify-end">
                <Button type="submit" disabled={check.isPending} size="lg">
                  {check.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                  {t('eligibility.check')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Result */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Result</CardTitle>
            <CardDescription>NPHIES 271 response</CardDescription>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {check.isPending ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-2 py-10 text-muted-foreground">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span className="text-sm">Querying NPHIES…</span>
                </motion.div>
              ) : !result ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-2 py-10 text-muted-foreground">
                  <ShieldQuestion className="h-6 w-6" />
                  <span className="text-sm">No request submitted yet</span>
                </motion.div>
              ) : (
                <motion.div key={isEligible ? 'ok' : 'no'} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                  <div className="flex items-center gap-3">
                    {isEligible ? (
                      <ShieldCheck className="h-7 w-7 text-[hsl(var(--success))]" />
                    ) : isIneligible ? (
                      <ShieldAlert className="h-7 w-7 text-destructive" />
                    ) : (
                      <ShieldQuestion className="h-7 w-7 text-muted-foreground" />
                    )}
                    <div>
                      <Badge variant={isEligible ? 'success' : isIneligible ? 'destructive' : 'warning'}>
                        {isEligible ? t('eligibility.eligible') : isIneligible ? t('eligibility.not_eligible') : (result.status ?? 'Unknown')}
                      </Badge>
                      {result.message ? <p className="mt-1 text-sm text-muted-foreground">{result.message}</p> : null}
                    </div>
                  </div>

                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    {result.member_id      ? <Row label="Member ID"      value={result.member_id} mono /> : null}
                    {result.policy_number  ? <Row label="Policy"         value={result.policy_number} mono /> : null}
                    {result.effective_date ? <Row label="Effective"      value={result.effective_date} /> : null}
                    {result.expiration_date? <Row label="Expires"        value={result.expiration_date} /> : null}
                    {typeof result.copay      === 'number' ? <Row label="Copay"      value={`${result.copay} SAR`} /> : null}
                    {typeof result.deductible === 'number' ? <Row label="Deductible" value={`${result.deductible} SAR`} /> : null}
                  </dl>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Field({ label, error, children, className = '' }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`grid gap-1.5 ${className}`}>
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  )
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <>
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className={mono ? 'font-mono text-xs' : ''}>{value}</dd>
    </>
  )
}
