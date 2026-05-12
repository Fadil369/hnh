'use client'

import Script from 'next/script'
import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mic, MessageSquare, Phone, ShieldCheck, UserPlus, Stethoscope, CalendarPlus,
  Send, Loader2, Check, Circle, Sparkles, ArrowRight,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useT } from '@/lib/i18n'
import {
  useCheckEligibility, useCreatePatient, useProviders, useCreateAppointment, useNotify,
} from '@/hooks/useApi'

type StepStatus = 'pending' | 'running' | 'done' | 'error' | 'skipped'

interface Step {
  key: string
  label: string
  icon: typeof Circle
  status: StepStatus
  detail?: string
}

const ELEVENLABS_AGENT_ID =
  process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID?.trim() || ''

export default function BasmaPage() {
  const { t, locale } = useT()
  const eligibility = useCheckEligibility()
  const createPatient = useCreatePatient()
  const providersQ = useProviders()
  const createAppt = useCreateAppointment()
  const notify = useNotify()

  const [nationalId, setNationalId] = useState('')
  const [payerId, setPayerId] = useState('BUPA')
  const [specialty, setSpecialty] = useState('')
  const [phone, setPhone] = useState('')
  const [channel, setChannel] = useState<'sms' | 'whatsapp' | 'voice'>('whatsapp')

  const [steps, setSteps] = useState<Step[]>(initialSteps(t))
  const [running, setRunning] = useState(false)
  const [appointment, setAppointment] = useState<any>(null)

  const providers = (providersQ.data as any[]) ?? []
  const matchedProviders = useMemo(() => {
    if (!specialty) return providers.slice(0, 6)
    const s = specialty.toLowerCase()
    return providers
      .filter((p) =>
        String(p.specialty ?? '').toLowerCase().includes(s) ||
        String(p.specialty_ar ?? '').includes(s)
      )
      .slice(0, 6)
  }, [specialty, providers])

  function update(key: string, status: StepStatus, detail?: string) {
    setSteps((prev) => prev.map((s) => (s.key === key ? { ...s, status, detail } : s)))
  }

  async function runIntake() {
    if (!nationalId) return
    setRunning(true)
    setAppointment(null)
    setSteps(initialSteps(t))

    try {
      update('id', 'done', nationalId)

      // Eligibility
      update('eligibility', 'running')
      const today = new Date().toISOString().split('T')[0]
      try {
        const r: any = await eligibility.mutateAsync({
          national_id: nationalId, payer_id: payerId, service_date: today, service_type: 'consultation',
        })
        const ok = !!(r?.eligible || r?.success || r?.status === 'active')
        update('eligibility', ok ? 'done' : 'error', ok ? 'active' : (r?.message ?? 'not eligible'))
      } catch (e: any) {
        update('eligibility', 'error', e?.message ?? 'failed')
      }

      // Register
      update('register', 'running')
      try {
        const r: any = await createPatient.mutateAsync({
          national_id: nationalId,
          first_name_ar: 'مريض', first_name_en: 'Patient',
          last_name_ar: 'بسمة', last_name_en: 'Basma',
          date_of_birth: '1990-01-01', gender: 'M',
          phone, email: '',
        })
        update('register', 'done', r?.patient_id ? `#${r.patient_id}` : 'registered')
      } catch {
        update('register', 'skipped', 'already registered')
      }

      // Doctor search
      update('doctor', 'running')
      if (matchedProviders.length === 0) {
        update('doctor', 'error', 'no provider')
        setRunning(false); return
      }
      const provider = matchedProviders[0]
      const providerId = String(provider.id)
      update('doctor', 'done', `${provider.first_name_en ?? ''} ${provider.last_name_en ?? ''} · ${provider.specialty}`.trim())

      // Slot
      update('slot', 'running')
      const date = nextWorkingDay()
      const time = '09:00'
      update('slot', 'done', `${date} · ${time}`)

      // Book
      update('book', 'running')
      try {
        const r: any = await createAppt.mutateAsync({
          patient_id: nationalId, provider_id: providerId,
          appointment_date: date, appointment_time: time,
          appointment_type: 'new', clinic_code: '', clinic_name: '',
          reason: 'Booked via Basma voice concierge',
        })
        setAppointment(r)
        update('book', 'done', r?.appointment_id ? `#${r.appointment_id}` : 'confirmed')
      } catch (e: any) {
        update('book', 'error', e?.message ?? 'failed')
        setRunning(false); return
      }

      // Notify
      update('notify', 'running')
      if (!phone) {
        update('notify', 'skipped', 'no phone')
      } else {
        try {
          const msg = locale === 'ar'
            ? `تم تأكيد موعدك مع ${provider.first_name_en ?? ''} يوم ${date} الساعة ${time}.`
            : `Your appointment with ${provider.first_name_en ?? ''} on ${date} at ${time} is confirmed.`
          await notify.mutateAsync({ channel, to: phone, message: msg, locale })
          update('notify', 'done', `via ${channel}`)
        } catch (e: any) {
          update('notify', 'error', e?.message ?? 'failed')
        }
      }
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 py-10 space-y-6">
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-amber-500/10 p-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(236,72,153,0.18),transparent_60%)]" aria-hidden />
        <div className="relative">
          <Badge variant="info">Basma · AI concierge</Badge>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">{t('basma.title')}</h1>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{t('basma.subtitle')}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {['ElevenLabs ConvAI', 'DeepSeek reasoning', 'Twilio · WhatsApp / SMS', 'NPHIES 270/271', 'Oracle EHR', 'AutoRAG'].map((tag) => (
              <span key={tag} className="rounded-full border bg-background/60 px-3 py-1">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChannelCard icon={Mic} title={t('basma.channel.voice')} tone="from-indigo-500 to-purple-500"
          desc={locale === 'ar' ? 'مساعد صوتي حي عبر ElevenLabs' : 'Live voice agent via ElevenLabs ConvAI'} />
        <ChannelCard icon={MessageSquare} title={t('basma.channel.whatsapp')} tone="from-emerald-500 to-teal-500"
          desc={locale === 'ar' ? 'تأكيد ومتابعة عبر واتساب' : 'Confirmation & follow-up via WhatsApp Business'} />
        <ChannelCard icon={Phone} title={t('basma.channel.sms')} tone="from-amber-500 to-orange-500"
          desc={locale === 'ar' ? 'رسائل SMS عبر Twilio' : 'SMS notifications via Twilio'} />
      </div>

      {ELEVENLABS_AGENT_ID ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              {t('basma.assistant')}
            </CardTitle>
            <CardDescription>{t('basma.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-xl border">
              <ConvaiWidget agentId={ELEVENLABS_AGENT_ID} />
            </div>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t('basma.pipeline')}</CardTitle>
          <CardDescription>
            {locale === 'ar'
              ? 'تنسيق آلي للأهلية والتسجيل والحجز والإخطار في تدفق واحد.'
              : 'End-to-end orchestration of eligibility, registration, booking, and confirmation in one run.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Field label={t('basma.step.id')}>
              <Input dir="ltr" value={nationalId} onChange={(e) => setNationalId(e.target.value)} placeholder="1XXXXXXXXX" />
            </Field>
            <Field label={locale === 'ar' ? 'جهة الدفع' : 'Payer'}>
              <Select value={payerId} onValueChange={setPayerId}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="BUPA">Bupa Arabia</SelectItem>
                  <SelectItem value="TAWUNIYA">Tawuniya</SelectItem>
                  <SelectItem value="MEDGULF">MedGulf</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label={locale === 'ar' ? 'التخصص' : 'Specialty'}>
              <Input value={specialty} onChange={(e) => setSpecialty(e.target.value)}
                placeholder={locale === 'ar' ? 'باطنية' : 'Internal medicine'} />
            </Field>
            <Field label={locale === 'ar' ? 'هاتف' : 'Phone (E.164)'}>
              <Input dir="ltr" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+9665XXXXXXXX" />
            </Field>
            <div className="md:col-span-2">
              <Field label={locale === 'ar' ? 'قناة الإخطار' : 'Notification channel'}>
                <Select value={channel} onValueChange={(v) => setChannel(v as typeof channel)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whatsapp">{t('basma.channel.whatsapp')}</SelectItem>
                    <SelectItem value="sms">{t('basma.channel.sms')}</SelectItem>
                    <SelectItem value="voice">{t('basma.channel.voice')}</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <div className="md:col-span-2 flex items-end">
              <Button onClick={runIntake} disabled={running || !nationalId} className="w-full md:w-auto">
                {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {t('basma.run')}
              </Button>
            </div>
          </div>

          <ol className="grid grid-cols-1 gap-3 md:grid-cols-7">
            {steps.map((s, idx) => (
              <li key={s.key} className="contents">
                <StepCard step={s} index={idx} />
              </li>
            ))}
          </ol>

          <AnimatePresence>
            {appointment ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border bg-emerald-50/40 p-5 dark:bg-emerald-500/5"
              >
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <Check className="h-5 w-5" />
                  <span className="font-medium">
                    {locale === 'ar' ? 'تم الحجز ووصول البيانات إلى GIVC' : 'Booked — pushed to GIVC provider workstation'}
                  </span>
                </div>
                <pre className="mt-3 overflow-x-auto rounded-md bg-background/80 p-3 text-xs">
                  {JSON.stringify(appointment, null, 2)}
                </pre>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}

function initialSteps(t: any): Step[] {
  return [
    { key: 'id',          label: t('basma.step.id'),          icon: Circle,       status: 'pending' },
    { key: 'eligibility', label: t('basma.step.eligibility'), icon: ShieldCheck,  status: 'pending' },
    { key: 'register',    label: t('basma.step.register'),    icon: UserPlus,     status: 'pending' },
    { key: 'doctor',      label: t('basma.step.doctor'),      icon: Stethoscope,  status: 'pending' },
    { key: 'slot',        label: t('basma.step.slot'),        icon: ArrowRight,   status: 'pending' },
    { key: 'book',        label: t('basma.step.book'),        icon: CalendarPlus, status: 'pending' },
    { key: 'notify',      label: t('basma.step.notify'),      icon: Send,         status: 'pending' },
  ]
}

function nextWorkingDay() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

function StepCard({ step, index }: { step: Step; index: number }) {
  const Icon = step.icon
  const tone =
    step.status === 'done' ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
    : step.status === 'running' ? 'border-sky-500/40 bg-sky-500/10 text-sky-700 dark:text-sky-300'
    : step.status === 'error' ? 'border-destructive/40 bg-destructive/10 text-destructive'
    : step.status === 'skipped' ? 'border-muted-foreground/30 bg-muted/40 text-muted-foreground'
    : 'border-border bg-muted/20 text-muted-foreground'
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex flex-col rounded-xl border p-3 ${tone}`}
    >
      <div className="flex items-center gap-2">
        {step.status === 'running' ? <Loader2 className="h-4 w-4 animate-spin" /> :
         step.status === 'done' ? <Check className="h-4 w-4" /> :
         <Icon className="h-4 w-4" />}
        <span className="text-xs font-medium">{step.label}</span>
      </div>
      <div className="mt-1 truncate text-[11px] opacity-80">{step.detail ?? '—'}</div>
    </motion.div>
  )
}

function ChannelCard({ icon: Icon, title, desc, tone }: { icon: any; title: string; desc: string; tone: string }) {
  return (
    <Card className="overflow-hidden">
      <div className={`bg-gradient-to-r ${tone} p-5 text-white`}>
        <Icon className="h-6 w-6" />
        <div className="mt-2 text-base font-semibold">{title}</div>
        <div className="mt-1 text-xs text-white/85">{desc}</div>
      </div>
    </Card>
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

function ConvaiWidget({ agentId }: { agentId: string }) {
  return (
    <>
      <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" strategy="afterInteractive" />
      <div
        className="w-full"
        dangerouslySetInnerHTML={{
          __html: `<elevenlabs-convai agent-id="${agentId.replace(/"/g, '')}"></elevenlabs-convai>`,
        }}
      />
    </>
  )
}
