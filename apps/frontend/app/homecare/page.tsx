'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { HeartPulse, Stethoscope, FlaskConical, Syringe, MapPin, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useT } from '@/lib/i18n'
import { useScheduleHomecare } from '@/hooks/useApi'

interface HomecareForm {
  patient_id: string
  service_type: 'nursing' | 'physio' | 'lab' | 'iv'
  visit_date: string
  visit_time: string
  address: string
}

const SERVICES = [
  { id: 'nursing', icon: HeartPulse,   key: 'homecare.service.nursing', tone: 'from-rose-500 to-pink-500' },
  { id: 'physio',  icon: Stethoscope,  key: 'homecare.service.physio',  tone: 'from-sky-500 to-cyan-500' },
  { id: 'lab',     icon: FlaskConical, key: 'homecare.service.lab',     tone: 'from-emerald-500 to-teal-500' },
  { id: 'iv',      icon: Syringe,      key: 'homecare.service.iv',      tone: 'from-amber-500 to-orange-500' },
] as const

export default function HomecarePage() {
  const { t, locale } = useT()
  const schedule = useScheduleHomecare()
  const [active, setActive] = useState<HomecareForm['service_type']>('nursing')
  const [bookings, setBookings] = useState<any[]>([])

  const form = useForm<HomecareForm>({
    defaultValues: {
      patient_id: '', service_type: 'nursing',
      visit_date: '', visit_time: '09:00', address: '',
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    const payload = { ...values, service_type: active }
    try {
      const r: any = await schedule.mutateAsync(payload)
      setBookings((prev) => [{ ...payload, id: r?.visit_id ?? Date.now(), status: 'scheduled' }, ...prev])
      form.reset({ patient_id: '', service_type: active, visit_date: '', visit_time: '09:00', address: '' })
    } catch {/* toast handled */}
  })

  const activeService = SERVICES.find((s) => s.id === active)!

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 py-10 space-y-6">
      <header>
        <Badge variant="info">Homecare</Badge>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{t('homecare.title')}</h1>
        <p className="text-sm text-muted-foreground">{t('homecare.subtitle')}</p>
      </header>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {SERVICES.map((s, i) => (
          <motion.button
            key={s.id}
            type="button"
            onClick={() => { setActive(s.id); form.setValue('service_type', s.id) }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`overflow-hidden rounded-xl border text-start transition-transform hover:-translate-y-0.5 ${active === s.id ? 'ring-2 ring-primary' : ''}`}
          >
            <div className={`bg-gradient-to-br ${s.tone} p-5 text-white`}>
              <s.icon className="h-6 w-6" />
              <div className="mt-2 text-sm font-semibold">{t(s.key as any)}</div>
            </div>
          </motion.button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('homecare.schedule')}</CardTitle>
          <CardDescription>{t(activeService.key as any)}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={locale === 'ar' ? 'رقم المريض' : 'Patient ID'}>
              <Input dir="ltr" {...form.register('patient_id', { required: true })} />
            </Field>
            <Field label={locale === 'ar' ? 'تاريخ الزيارة' : 'Visit date'}>
              <Input type="date" {...form.register('visit_date', { required: true })} />
            </Field>
            <Field label={locale === 'ar' ? 'الوقت' : 'Time'}>
              <Input type="time" {...form.register('visit_time', { required: true })} />
            </Field>
            <Field label={t('homecare.field.address')}>
              <Input {...form.register('address')} />
            </Field>
            <div className="sm:col-span-2">
              <Button type="submit" disabled={schedule.isPending}>
                {schedule.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
                {t('homecare.schedule')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {bookings.length > 0 ? (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground">
            {locale === 'ar' ? 'الزيارات المجدولة' : 'Scheduled visits'}
          </h2>
          {bookings.map((b) => (
            <Card key={b.id}>
              <CardContent className="flex items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium">
                    {t(SERVICES.find((s) => s.id === b.service_type)?.key as any)}
                    <span className="ms-2 font-mono text-xs text-muted-foreground">#{b.patient_id}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{b.visit_date} · {b.visit_time} · {b.address}</p>
                </div>
                <Badge variant="success">{b.status}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}
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
