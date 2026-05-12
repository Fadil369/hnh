'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useT } from '@/lib/i18n'
import { useClaims, useCreateClaim } from '@/hooks/useApi'
import { ClaimCreateSchema, type ClaimCreate } from '@/lib/schemas'

const STATUS: Record<string, { ar: string; en: string; variant: 'default' | 'info' | 'success' | 'destructive' | 'secondary' }> = {
  draft: { ar: 'مسودة', en: 'Draft', variant: 'secondary' },
  submitted: { ar: 'مقدمة', en: 'Submitted', variant: 'info' },
  approved: { ar: 'معتمدة', en: 'Approved', variant: 'success' },
  rejected: { ar: 'مرفوضة', en: 'Rejected', variant: 'destructive' },
  paid: { ar: 'مدفوعة', en: 'Paid', variant: 'success' },
}

export default function ClaimsPage() {
  const { t, locale } = useT()
  const { data: claims = [], isLoading, refetch } = useClaims()
  const [open, setOpen] = useState(false)

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 py-10 space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Badge variant="info">Claims</Badge>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{t('claims.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('claims.subtitle')}</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4" />{t('claims.create')}</Button>
          </DialogTrigger>
          <CreateClaimDialog onSuccess={() => { setOpen(false); refetch() }} />
        </Dialog>
      </header>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="space-y-2 p-4">
              {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : (claims as any[]).length === 0 ? (
            <div className="p-10 text-center text-sm text-muted-foreground">{t('claims.empty')}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{locale === 'ar' ? 'رقم' : 'Number'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'المريض' : 'Patient'}</TableHead>
                  <TableHead>{t('claims.field.type')}</TableHead>
                  <TableHead>{t('claims.field.payer_name')}</TableHead>
                  <TableHead className="text-end">{t('claims.field.amount')}</TableHead>
                  <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(claims as any[]).map((c) => {
                  const s = STATUS[c.status] ?? { ar: c.status, en: c.status, variant: 'secondary' as const }
                  return (
                    <TableRow key={c.id}>
                      <TableCell className="font-mono text-xs">{c.claim_number}</TableCell>
                      <TableCell className="font-medium">{c.patient_name ?? `#${c.patient_id}`}</TableCell>
                      <TableCell><Badge variant="outline">{c.claim_type}</Badge></TableCell>
                      <TableCell>{c.payer_name}</TableCell>
                      <TableCell className="text-end font-mono">
                        {Number(c.total_amount).toLocaleString()} SAR
                      </TableCell>
                      <TableCell><Badge variant={s.variant}>{locale === 'ar' ? s.ar : s.en}</Badge></TableCell>
                      <TableCell className="text-xs text-muted-foreground">{c.created_at?.split('T')[0]}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function CreateClaimDialog({ onSuccess }: { onSuccess: () => void }) {
  const { t } = useT()
  const create = useCreateClaim()

  const form = useForm<ClaimCreate>({
    resolver: zodResolver(ClaimCreateSchema),
    defaultValues: {
      patient_id: '', claim_type: 'professional',
      payer_id: '', payer_name: '', total_amount: 0,
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    await create.mutateAsync(values)
    form.reset()
    onSuccess()
  })

  return (
    <DialogContent className="sm:max-w-xl">
      <DialogHeader>
        <DialogTitle>{t('claims.create')}</DialogTitle>
        <DialogDescription>{t('claims.subtitle')}</DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={t('claims.field.patient_id')} error={form.formState.errors.patient_id?.message}>
          <Input dir="ltr" {...form.register('patient_id')} />
        </Field>
        <Field label={t('claims.field.type')}>
          <Select
            value={form.watch('claim_type')}
            onValueChange={(v) => form.setValue('claim_type', v as ClaimCreate['claim_type'])}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">{t('claims.type.professional')}</SelectItem>
              <SelectItem value="institutional">{t('claims.type.institutional')}</SelectItem>
              <SelectItem value="pharmacy">{t('claims.type.pharmacy')}</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label={t('claims.field.payer_id')} error={form.formState.errors.payer_id?.message}>
          <Input dir="ltr" {...form.register('payer_id')} />
        </Field>
        <Field label={t('claims.field.payer_name')} error={form.formState.errors.payer_name?.message}>
          <Input {...form.register('payer_name')} />
        </Field>
        <div className="sm:col-span-2">
          <Field label={t('claims.field.amount')} error={form.formState.errors.total_amount?.message}>
            <Input type="number" step="0.01" {...form.register('total_amount', { valueAsNumber: true })} />
          </Field>
        </div>
        <DialogFooter className="sm:col-span-2">
          <Button type="submit" disabled={create.isPending}>
            {create.isPending ? t('common.loading') : t('common.create')}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
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
