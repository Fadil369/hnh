'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, ArrowLeft, ShieldCheck, ShieldAlert, ShieldQuestion, UserPlus,
  Stethoscope, CalendarDays, MessageSquare, CheckCircle2, Loader2, Sparkles, Phone,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useT } from '@/lib/i18n'
import { toast } from 'sonner'
import { api } from '@/lib/api'
import {
  useCheckEligibility, useCreatePatient, useProviders,
  useProviderAvailability, useCreateAppointment, useNotifyWhatsAppAppointment,
} from '@/hooks/useApi'

type Step = 1 | 2 | 3 | 4 | 5 | 6

const PAYERS = [
  { id: 'BUPA',     label: 'Bupa Arabia' },
  { id: 'TAWUNIYA', label: 'Tawuniya' },
  { id: 'MEDGULF',  label: 'MedGulf' },
  { id: 'WALAA',    label: 'Walaa' },
  { id: 'AXA',      label: 'AXA Cooperative' },
]

const SPECIALTIES = [
  'Cardiology', 'Internal Medicine', 'Family Medicine', 'Pediatrics',
  'Dermatology', 'Orthopedics', 'ENT', 'Ophthalmology', 'Obstetrics & Gynecology',
]

const STR = {
  en: {
    eyebrow: 'New patient · Self-service booking',
    title: 'Book your visit in 60 seconds',
    subtitle: 'NPHIES eligibility, doctor matching, slot booking, and a WhatsApp confirmation from Basma — end-to-end.',
    back: 'Back', next: 'Continue', submit: 'Confirm booking',
    s1Title: 'Tell us about you', s1Desc: 'We use your National ID to verify insurance via NPHIES.',
    nationalId: 'Saudi National ID / Iqama', firstName: 'First name', lastName: 'Last name',
    phone: 'WhatsApp number (E.164, e.g. +9665…)', payer: 'Insurance payer',
    s2Title: 'Eligibility (NPHIES 270/271)', s2Desc: 'Real-time check against your payer.',
    eligible: 'Coverage active', notEligible: 'Coverage not found', unknown: 'Will continue without insurance',
    s3Title: 'Patient profile', s3Desc: "We'll create your record if it doesn't exist.",
    s4Title: 'Pick a specialty & doctor', s4Desc: 'Filtered against the live OID provider tree.',
    specialty: 'Specialty',
    s5Title: 'Choose a slot', s5Desc: 'Live availability for the selected day.',
    date: 'Date', noSlots: 'No free slots — try another date.',
    s6Title: 'Review & confirm', s6Desc: 'You will receive a WhatsApp confirmation immediately.',
    booked: '✅ Booked. Basma is sending the confirmation on WhatsApp now.',
    viewProvider: 'See it from the provider side (GiVC) →',
    chatBasma: 'Chat with Basma on WhatsApp',
  },
  ar: {
    eyebrow: 'مريض جديد · حجز ذاتي',
    title: 'احجز موعدك خلال ٦٠ ثانية',
    subtitle: 'تحقق نفيس من التأمين، مطابقة الطبيب، حجز موعد، ورسالة تأكيد على واتساب من بسمة — بشكل متكامل.',
    back: 'رجوع', next: 'متابعة', submit: 'تأكيد الحجز',
    s1Title: 'عرّف عن نفسك', s1Desc: 'نستخدم رقم الهوية للتحقق من التأمين عبر نفيس.',
    nationalId: 'الهوية الوطنية / الإقامة', firstName: 'الاسم الأول', lastName: 'اسم العائلة',
    phone: 'رقم واتساب (مثال: ‎+9665…)', payer: 'شركة التأمين',
    s2Title: 'التحقق من الأهلية (نفيس 270/271)', s2Desc: 'تحقق فوري مع شركة التأمين.',
    eligible: 'التغطية فعّالة', notEligible: 'لا توجد تغطية', unknown: 'سنكمل بدون تأمين',
    s3Title: 'الملف الصحي', s3Desc: 'سننشئ سجلك إذا لم يكن موجود.',
    s4Title: 'اختر التخصص والطبيب', s4Desc: 'تصفية مباشرة من شجرة معرفات الأطباء (OID).',
    specialty: 'التخصص',
    s5Title: 'اختر الموعد', s5Desc: 'الفترات المتاحة لليوم المختار.',
    date: 'التاريخ', noSlots: 'لا توجد فترات متاحة — جرّب يوم آخر.',
    s6Title: 'المراجعة والتأكيد', s6Desc: 'ستصلك رسالة تأكيد على واتساب فور التأكيد.',
    booked: '✅ تم الحجز. بسمة ترسل التأكيد على واتساب الآن.',
    viewProvider: 'شاهدها من واجهة الطبيب (GiVC) ←',
    chatBasma: 'تحدث مع بسمة على واتساب',
  },
} as const

export default function BookVisitPage() {
  const { locale } = useT()
  const lang: 'ar' | 'en' = locale === 'ar' ? 'ar' : 'en'
  const t = STR[lang]

  const [step, setStep] = useState<Step>(1)
  const [me, setMe] = useState({
    national_id: '',
    first_name: '',
    last_name: '',
    phone: '',
    payer_id: 'BUPA',
  })
  const [eligibility, setEligibility] = useState<any>(null)
  const [patientId, setPatientId] = useState<string | number | null>(null)
  const [specialty, setSpecialty] = useState<string>('Cardiology')
  const [providerId, setProviderId] = useState<string | number | ''>('')
  const [date, setDate] = useState<string>(() => new Date(Date.now() + 86_400_000).toISOString().slice(0, 10))
  const [time, setTime] = useState<string>('')
  const [reason, setReason] = useState<string>('')
  const [done, setDone] = useState<{ ok: boolean; sid?: string } | null>(null)

  const elig = useCheckEligibility()
  const createPt = useCreatePatient()
  const providers = useProviders()
  const avail = useProviderAvailability(providerId || undefined, date)
  const createAppt = useCreateAppointment()
  const notify = useNotifyWhatsAppAppointment()

  const filteredProviders = useMemo(() => {
    const all = (providers.data ?? []) as any[]
    const s = specialty.toLowerCase()
    return all.filter((p) =>
      String(p.speciality ?? p.specialty ?? '').toLowerCase().includes(s),
    ).slice(0, 12)
  }, [providers.data, specialty])

  const selectedProvider = useMemo(
    () => filteredProviders.find((p: any) => String(p.id) === String(providerId)),
    [filteredProviders, providerId],
  )

  const stepValid: Record<Step, boolean> = {
    1: !!(me.national_id && me.first_name && me.last_name && /^\+\d{8,}$/.test(me.phone)),
    2: !!eligibility,
    3: !!patientId,
    4: !!providerId,
    5: !!time,
    6: !!time,
  }

  async function runEligibility() {
    try {
      const res = await elig.mutateAsync({
        national_id: me.national_id,
        payer_id: me.payer_id,
        service_date: date,
        service_type: 'consultation',
      })
      setEligibility(res ?? { eligible: false })
    } catch {
      setEligibility({ eligible: false })
    }
  }

  async function ensurePatient() {
    try {
      const r = await api<{ patients?: any[] }>('/api/patients', { query: { search: me.national_id } })
      const found = r?.patients?.find((p) => p.national_id === me.national_id)
      if (found?.id) { setPatientId(found.id); return }
    } catch {}
    const created = await createPt.mutateAsync({
      national_id: me.national_id,
      first_name_en: me.first_name, last_name_en: me.last_name,
      first_name_ar: me.first_name, last_name_ar: me.last_name,
      date_of_birth: '1990-01-01',
      gender: 'M',
      phone: me.phone,
      email: '',
    } as any)
    if ((created as any)?.patient?.id) setPatientId((created as any).patient.id)
  }

  async function confirm() {
    if (!patientId || !providerId || !time) return
    const ok = await createAppt.mutateAsync({
      patient_id: String(patientId),
      provider_id: String(providerId),
      appointment_date: date,
      appointment_time: time,
      appointment_type: 'new',
      clinic_name: selectedProvider?.facility_name || selectedProvider?.name || 'BrainSAIT Clinic',
      reason: reason || specialty,
    } as any)
    let sid: string | undefined
    try {
      const wa = await notify.mutateAsync({
        to: me.phone,
        patient_name: `${me.first_name} ${me.last_name}`.trim(),
        provider_name: selectedProvider?.name || 'Doctor',
        appointment_date: date,
        appointment_time: time,
        clinic_name: selectedProvider?.facility_name || 'BrainSAIT Clinic',
        reason: reason || specialty,
        lang,
      })
      sid = (wa as any)?.sid || (wa as any)?.message?.sid
    } catch {}
    setDone({ ok: !!(ok as any)?.success, sid })
    setStep(6)
    toast.success(t.booked)
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      <header className="mb-8 text-center">
        <Badge variant="info" className="mb-3 gap-1.5"><Sparkles className="h-3 w-3" />{t.eyebrow}</Badge>
        <h1 className="text-balance bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
          {t.title}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">{t.subtitle}</p>
      </header>

      <Stepper step={step} lang={lang} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>{t.s1Title}</CardTitle>
                <CardDescription>{t.s1Desc}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <Field label={t.nationalId} className="sm:col-span-2">
                  <Input dir="ltr" value={me.national_id}
                    onChange={(e) => setMe({ ...me, national_id: e.target.value })}
                    placeholder="10XXXXXXXX" inputMode="numeric" />
                </Field>
                <Field label={t.firstName}>
                  <Input value={me.first_name} onChange={(e) => setMe({ ...me, first_name: e.target.value })} />
                </Field>
                <Field label={t.lastName}>
                  <Input value={me.last_name} onChange={(e) => setMe({ ...me, last_name: e.target.value })} />
                </Field>
                <Field label={t.phone}>
                  <Input dir="ltr" value={me.phone} onChange={(e) => setMe({ ...me, phone: e.target.value })}
                    placeholder="+96651..." />
                </Field>
                <Field label={t.payer}>
                  <Select value={me.payer_id} onValueChange={(v) => setMe({ ...me, payer_id: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {PAYERS.map(p => <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>{t.s2Title}</CardTitle>
                <CardDescription>{t.s2Desc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!eligibility && (
                  <Button onClick={runEligibility} disabled={elig.isPending}>
                    {elig.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                    {lang === 'ar' ? 'تحقق الآن' : 'Verify now'}
                  </Button>
                )}
                {eligibility && <EligibilityResult lang={lang} data={eligibility} t={t} />}
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>{t.s3Title}</CardTitle>
                <CardDescription>{t.s3Desc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {!patientId ? (
                  <Button onClick={ensurePatient} disabled={createPt.isPending}>
                    {createPt.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                    {lang === 'ar' ? 'إنشاء/جلب الملف' : 'Create / fetch profile'}
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>{lang === 'ar' ? 'تم. رقم المريض:' : 'Patient ID:'} <code className="rounded bg-muted px-1.5 py-0.5">{String(patientId)}</code></span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>{t.s4Title}</CardTitle>
                <CardDescription>{t.s4Desc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field label={t.specialty}>
                  <Select value={specialty} onValueChange={setSpecialty}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {SPECIALTIES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <div className="grid gap-2 md:grid-cols-2">
                  {providers.isLoading && <p className="text-sm text-muted-foreground">{lang === 'ar' ? 'جاري التحميل…' : 'Loading…'}</p>}
                  {filteredProviders.map((p: any) => {
                    const id = String(p.id)
                    const active = id === String(providerId)
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setProviderId(id)}
                        className={`flex items-start gap-3 rounded-lg border p-3 text-start transition hover:bg-accent ${active ? 'border-primary ring-2 ring-primary/30' : ''}`}
                      >
                        <Stethoscope className="mt-0.5 h-4 w-4 text-primary" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{p.name || `${p.first_name ?? ''} ${p.last_name ?? ''}`.trim()}</p>
                          <p className="truncate text-xs text-muted-foreground">{p.speciality ?? p.specialty} · {p.facility_name ?? p.organization ?? ''}</p>
                          {p.oid && <p className="truncate text-[10px] font-mono text-muted-foreground/80">OID {p.oid}</p>}
                        </div>
                      </button>
                    )
                  })}
                  {!providers.isLoading && filteredProviders.length === 0 && (
                    <p className="text-sm text-muted-foreground">{lang === 'ar' ? 'لا يوجد أطباء بهذا التخصص' : 'No doctors found.'}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {step === 5 && (
            <Card>
              <CardHeader>
                <CardTitle>{t.s5Title}</CardTitle>
                <CardDescription>{t.s5Desc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Field label={t.date}>
                  <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </Field>
                <div className="flex flex-wrap gap-2">
                  {avail.isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {(avail.data?.available_slots ?? []).map((s) => (
                    <Button
                      key={s}
                      type="button"
                      size="sm"
                      variant={time === s ? 'default' : 'outline'}
                      onClick={() => setTime(s)}
                    >{s}</Button>
                  ))}
                  {!avail.isLoading && (avail.data?.available_slots ?? []).length === 0 && (
                    <p className="text-sm text-muted-foreground">{t.noSlots}</p>
                  )}
                </div>
                <Field label={lang === 'ar' ? 'سبب الزيارة (اختياري)' : 'Reason (optional)'}>
                  <Input value={reason} onChange={(e) => setReason(e.target.value)} placeholder={specialty} />
                </Field>
              </CardContent>
            </Card>
          )}

          {step === 6 && (
            <Card>
              <CardHeader>
                <CardTitle>{t.s6Title}</CardTitle>
                <CardDescription>{t.s6Desc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Summary
                  rows={[
                    { k: lang === 'ar' ? 'الاسم' : 'Name', v: `${me.first_name} ${me.last_name}` },
                    { k: lang === 'ar' ? 'الهوية' : 'National ID', v: me.national_id },
                    { k: lang === 'ar' ? 'الواتساب' : 'WhatsApp', v: me.phone },
                    { k: lang === 'ar' ? 'التأمين' : 'Payer', v: me.payer_id },
                    { k: lang === 'ar' ? 'الطبيب' : 'Doctor', v: selectedProvider?.name || '' },
                    { k: lang === 'ar' ? 'التخصص' : 'Specialty', v: specialty },
                    { k: lang === 'ar' ? 'الموعد' : 'Slot', v: `${date} · ${time}` },
                  ]}
                />
                {done?.ok ? (
                  <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4">
                    <p className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 className="h-4 w-4" /> {t.booked}
                    </p>
                    {done.sid && <p className="mt-1 text-xs text-muted-foreground">SID: <code>{done.sid}</code></p>}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button asChild variant="outline" size="sm"><Link href="/givc">{t.viewProvider}</Link></Button>
                      <Button asChild variant="outline" size="sm">
                        <a href="https://wa.me/14155238886?text=Basma" target="_blank" rel="noreferrer">
                          <MessageSquare className="h-4 w-4" /> {t.chatBasma}
                        </a>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button onClick={confirm} disabled={createAppt.isPending} size="lg">
                    {createAppt.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                    {t.submit}
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          disabled={step === 1 || done?.ok}
          onClick={() => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))}
        >
          <ArrowLeft className={lang === 'ar' ? 'rotate-180' : ''} /> {t.back}
        </Button>
        {step < 6 && (
          <Button
            type="button"
            disabled={!stepValid[step]}
            onClick={() => setStep((s) => ((s + 1) as Step))}
          >
            {t.next} <ArrowRight className={lang === 'ar' ? 'rotate-180' : ''} />
          </Button>
        )}
      </div>
    </div>
  )
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Label className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
    </div>
  )
}

function Stepper({ step, lang }: { step: Step; lang: 'ar' | 'en' }) {
  const labels = lang === 'ar'
    ? ['الهوية', 'الأهلية', 'الملف', 'الطبيب', 'الموعد', 'التأكيد']
    : ['Identity', 'Eligibility', 'Profile', 'Doctor', 'Slot', 'Confirm']
  const icons = [Phone, ShieldCheck, UserPlus, Stethoscope, CalendarDays, CheckCircle2]
  return (
    <ol className="mx-auto mb-8 flex max-w-3xl items-center justify-between gap-1 text-xs">
      {labels.map((l, i) => {
        const n = (i + 1) as Step
        const Icon = icons[i]
        const active = step === n
        const isDone = step > n
        return (
          <li key={l} className="flex flex-1 items-center gap-2">
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
              isDone ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500'
                : active ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border text-muted-foreground'
            }`}>
              <Icon className="h-3.5 w-3.5" />
            </span>
            <span className={`hidden truncate sm:inline ${active || isDone ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>{l}</span>
            {i < labels.length - 1 && <span className={`mx-1 h-px flex-1 ${isDone ? 'bg-emerald-500' : 'bg-border'}`} />}
          </li>
        )
      })}
    </ol>
  )
}

function EligibilityResult({ lang, data, t }: { lang: 'ar' | 'en'; data: any; t: any }) {
  const eligible = data?.eligible === true
  const ineligible = data?.eligible === false
  const Icon = eligible ? ShieldCheck : ineligible ? ShieldAlert : ShieldQuestion
  const tone = eligible ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
    : ineligible ? 'border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300'
    : 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300'
  const label = eligible ? t.eligible : ineligible ? t.notEligible : t.unknown
  return (
    <div className={`rounded-lg border p-4 ${tone}`}>
      <p className="flex items-center gap-2 text-sm font-medium"><Icon className="h-4 w-4" /> {label}</p>
      {data?.policy_number && <p className="mt-1 text-xs">Policy: {data.policy_number}</p>}
      {data?.copay !== undefined && <p className="text-xs">Copay: {String(data.copay)}</p>}
      {data?.message && <p className="mt-1 text-xs text-muted-foreground">{data.message}</p>}
    </div>
  )
}

function Summary({ rows }: { rows: { k: string; v: string }[] }) {
  return (
    <dl className="grid gap-2 rounded-lg border bg-muted/30 p-4 text-sm sm:grid-cols-2">
      {rows.map((r) => (
        <div key={r.k} className="flex items-center justify-between gap-3">
          <dt className="text-muted-foreground">{r.k}</dt>
          <dd className="truncate font-medium">{r.v || '—'}</dd>
        </div>
      ))}
    </dl>
  )
}
