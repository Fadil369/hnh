'use client'

import { Suspense, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarPlus, Plus } from 'lucide-react'
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
import { useAppointments, useCreateAppointment, useProviders } from '@/hooks/useApi'
import { AppointmentCreateSchema, type AppointmentCreate } from '@/lib/schemas'

const STATUS_LABEL: Record<string, { ar: string; en: string; variant: 'default' | 'info' | 'success' | 'destructive' | 'secondary' }> = {
  scheduled: { ar: 'مجدول', en: 'Scheduled', variant: 'secondary' },
  confirmed: { ar: 'مؤكد', en: 'Confirmed', variant: 'success' },
  completed: { ar: 'مكتمل', en: 'Completed', variant: 'info' },
  cancelled: { ar: 'ملغي', en: 'Cancelled', variant: 'destructive' },
}

export default function AppointmentsPage() {
  return (
    <Suspense fallback={null}>
      <AppointmentsInner />
    </Suspense>
  )
}

function AppointmentsInner() {
  const { t, locale } = useT()
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0])
  const [open, setOpen] = useState(false)
  const { data: appointments = [], isLoading, refetch } = useAppointments(date)

  const sorted = (appointments as any[])
    .slice()
    .sort((a, b) => (a.appointment_time ?? '').localeCompare(b.appointment_time ?? ''))

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 py-10 space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Badge variant="info">Appointments</Badge>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{t('appointments.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('appointments.subtitle')}</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4" />{t('appointments.book')}</Button>
          </DialogTrigger>
          <CreateAppointmentDialog onSuccess={() => { setOpen(false); refetch() }} />
        </Dialog>
      </header>

      <Card>
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <Label htmlFor="appt-date" className="text-sm">{t('appointments.date')}</Label>
          <Input
            id="appt-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-auto"
          />
          <span className="ms-auto text-xs text-muted-foreground">
            {(appointments as any[]).length} {locale === 'ar' ? 'مواعيد' : 'scheduled'}
          </span>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="space-y-2 p-4">
              {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : sorted.length === 0 ? (
            <div className="p-10 text-center text-sm text-muted-foreground">
              {t('appointments.empty')}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('appointments.field.time')}</TableHead>
                  <TableHead>{locale === 'ar' ? 'المريض' : 'Patient'}</TableHead>
                  <TableHead>{locale === 'ar' ? 'العيادة' : 'Clinic'}</TableHead>
                  <TableHead>{t('appointments.field.type')}</TableHead>
                  <TableHead>{locale === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((a: any) => {
                  const status = STATUS_LABEL[a.status] ?? { ar: a.status, en: a.status, variant: 'secondary' as const }
                  return (
                    <TableRow key={a.id}>
                      <TableCell className="font-mono text-xs">{a.appointment_time?.slice(0, 5) ?? '—'}</TableCell>
                      <TableCell className="font-medium">{a.patient_name ?? `#${a.patient_id ?? '—'}`}</TableCell>
                      <TableCell>{a.clinic_name ?? '—'}</TableCell>
                      <TableCell>
                        {a.appointment_type === 'follow_up'
                          ? t('appointments.type.follow_up')
                          : t('appointments.type.new')}
                      </TableCell>
                      <TableCell>
                        <Badge variant={status.variant}>{locale === 'ar' ? status.ar : status.en}</Badge>
                      </TableCell>
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

function CreateAppointmentDialog({ onSuccess }: { onSuccess: () => void }) {
  const { t } = useT()
  const create = useCreateAppointment()
  const { data: providers = [] } = useProviders()

  const form = useForm<AppointmentCreate>({
    resolver: zodResolver(AppointmentCreateSchema),
    defaultValues: {
      patient_id: '', provider_id: '', appointment_date: '', appointment_time: '',
      appointment_type: 'new', clinic_code: '', clinic_name: '', reason: '',
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    await create.mutateAsync(values)
    form.reset()
    onSuccess()
  })

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>{t('appointments.book')}</DialogTitle>
        <DialogDescription>{t('appointments.subtitle')}</DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={t('appointments.field.patient_id')} error={form.formState.errors.patient_id?.message}>
          <Input dir="ltr" {...form.register('patient_id')} />
        </Field>
        <Field label={t('appointments.field.provider')} error={form.formState.errors.provider_id?.message}>
          <Select value={form.watch('provider_id')} onValueChange={(v) => form.setValue('provider_id', v)}>
            <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>
            <SelectContent>
              {(providers as any[]).map((p) => (
                <SelectItem key={p.id} value={String(p.id)}>
                  {p.first_name_en} {p.last_name_en} — {p.specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label={t('appointments.date')} error={form.formState.errors.appointment_date?.message}>
          <Input type="date" {...form.register('appointment_date')} />
        </Field>
        <Field label={t('appointments.field.time')} error={form.formState.errors.appointment_time?.message}>
          <Input type="time" {...form.register('appointment_time')} />
        </Field>
        <Field label={t('appointments.field.type')}>
          <Select
            value={form.watch('appointment_type')}
            onValueChange={(v) => form.setValue('appointment_type', v as 'new' | 'follow_up')}
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="new">{t('appointments.type.new')}</SelectItem>
              <SelectItem value="follow_up">{t('appointments.type.follow_up')}</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label={t('appointments.field.clinic_code')}>
          <Input dir="ltr" {...form.register('clinic_code')} />
        </Field>
        <div className="sm:col-span-2">
          <Field label={t('appointments.field.reason')}>
            <Input {...form.register('reason')} />
          </Field>
        </div>
        <DialogFooter className="sm:col-span-2">
          <Button type="submit" disabled={create.isPending}>
            <CalendarPlus className="h-4 w-4" />
            {create.isPending ? t('common.loading') : t('appointments.book')}
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
