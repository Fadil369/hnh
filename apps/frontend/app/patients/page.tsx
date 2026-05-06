'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Search, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { useT } from '@/lib/i18n'
import { usePatientsSearch, useCreatePatient } from '@/hooks/useApi'
import { PatientCreateSchema, type PatientCreate, type Patient } from '@/lib/schemas'
import { formatDate } from '@/lib/utils'

export default function PatientsPage() {
  return (
    <Suspense fallback={null}>
      <PatientsPageInner />
    </Suspense>
  )
}

function PatientsPageInner() {
  const { t, locale } = useT()
  const params = useSearchParams()
  const [query, setQuery] = useState('')
  const debounced = useDebouncedValue(query, 250)
  const [openCreate, setOpenCreate] = useState(false)

  useEffect(() => {
    if (params?.get('new') === '1') setOpenCreate(true)
  }, [params])

  const { data, isLoading, isError, refetch } = usePatientsSearch(debounced)
  const patients = data?.patients ?? []

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 py-10">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{t('patients.title')}</h1>
          <p className="text-sm text-muted-foreground">FHIR · Saudi national IDs · {patients.length} {patients.length === 1 ? 'result' : 'results'}</p>
        </div>
        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4" />{t('patients.create')}</Button>
          </DialogTrigger>
          <CreatePatientDialog onSuccess={() => { setOpenCreate(false); refetch() }} />
        </Dialog>
      </header>

      <Card className="mb-4">
        <CardContent className="p-3">
          <div className="relative">
            <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('patients.search.placeholder')}
              className="ps-10"
              autoFocus
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="space-y-2 p-4">
              {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : isError ? (
            <div className="p-10 text-center">
              <p className="text-sm text-destructive">{t('common.error')}</p>
              <Button variant="outline" size="sm" className="mt-3" onClick={() => refetch()}>{t('common.retry')}</Button>
            </div>
          ) : patients.length === 0 ? (
            <div className="p-10 text-center">
              <UserPlus className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-3 text-sm text-muted-foreground">
                {debounced ? t('patients.empty') : t('patients.search.placeholder')}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('patients.field.national_id')}</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>{t('patients.field.gender')}</TableHead>
                  <TableHead>{t('patients.field.date_of_birth')}</TableHead>
                  <TableHead>{t('patients.field.phone')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((p: Patient) => {
                  const name = locale === 'ar'
                    ? p.full_name_ar || `${p.first_name_ar ?? ''} ${p.last_name_ar ?? ''}`.trim()
                    : p.full_name_en || `${p.first_name_en ?? ''} ${p.last_name_en ?? ''}`.trim()
                  return (
                    <TableRow key={String(p.id ?? p.national_id ?? Math.random())}>
                      <TableCell className="font-mono text-xs">{p.national_id ?? '—'}</TableCell>
                      <TableCell className="font-medium">{name || '—'}</TableCell>
                      <TableCell>
                        {p.gender ? (
                          <Badge variant={p.gender === 'M' ? 'info' : 'default'}>
                            {p.gender === 'M' ? t('patients.field.gender.M') : t('patients.field.gender.F')}
                          </Badge>
                        ) : '—'}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{formatDate(p.date_of_birth, locale)}</TableCell>
                      <TableCell className="font-mono text-xs">{p.phone ?? '—'}</TableCell>
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

function CreatePatientDialog({ onSuccess }: { onSuccess: () => void }) {
  const { t } = useT()
  const create = useCreatePatient()

  const form = useForm<PatientCreate>({
    resolver: zodResolver(PatientCreateSchema),
    defaultValues: {
      national_id: '', first_name_ar: '', first_name_en: '',
      last_name_ar: '', last_name_en: '', date_of_birth: '',
      gender: 'M', phone: '', email: '',
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
        <DialogTitle>{t('patients.create')}</DialogTitle>
        <DialogDescription>{t('patients.field.national_id')} · FHIR Patient resource</DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label={t('patients.field.national_id')} error={form.formState.errors.national_id?.message}>
          <Input {...form.register('national_id')} dir="ltr" />
        </Field>
        <Field label={t('patients.field.gender')} error={form.formState.errors.gender?.message}>
          <Select value={form.watch('gender')} onValueChange={(v) => form.setValue('gender', v as 'M' | 'F')}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="M">{t('patients.field.gender.M')}</SelectItem>
              <SelectItem value="F">{t('patients.field.gender.F')}</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label={t('patients.field.first_name_ar')} error={form.formState.errors.first_name_ar?.message}>
          <Input {...form.register('first_name_ar')} dir="rtl" />
        </Field>
        <Field label={t('patients.field.last_name_ar')} error={form.formState.errors.last_name_ar?.message}>
          <Input {...form.register('last_name_ar')} dir="rtl" />
        </Field>
        <Field label={t('patients.field.first_name_en')} error={form.formState.errors.first_name_en?.message}>
          <Input {...form.register('first_name_en')} dir="ltr" />
        </Field>
        <Field label={t('patients.field.last_name_en')} error={form.formState.errors.last_name_en?.message}>
          <Input {...form.register('last_name_en')} dir="ltr" />
        </Field>
        <Field label={t('patients.field.date_of_birth')} error={form.formState.errors.date_of_birth?.message}>
          <Input type="date" {...form.register('date_of_birth')} />
        </Field>
        <Field label={t('patients.field.phone')} error={form.formState.errors.phone?.message}>
          <Input type="tel" dir="ltr" {...form.register('phone')} />
        </Field>
        <div className="sm:col-span-2">
          <Field label={t('patients.field.email')} error={form.formState.errors.email?.message}>
            <Input type="email" dir="ltr" {...form.register('email')} />
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
