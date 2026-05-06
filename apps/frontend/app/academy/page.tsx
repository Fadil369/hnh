'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight, Award, BookOpenCheck, CalendarDays, GraduationCap, Layers3,
  MessageSquareText, ShieldCheck, Sparkles, Stethoscope, Wallet,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useHealth } from '@/hooks/useApi'
import { useT } from '@/lib/i18n'

const TRACKS = [
  {
    key: 'clinical',
    icon: Stethoscope,
    titleKey: 'academy.track.clinical',
    titleAr: 'التميز السريري',
    desc: 'Triage, virtual-care etiquette, documentation quality, and post-visit coordination.',
    descAr: 'الفرز، آداب الاستشارة الافتراضية، جودة التوثيق، وتنسيق ما بعد الزيارة.',
    tone: 'from-emerald-500 to-teal-600',
    modules: ['Telehealth workflow', 'FHIR summaries', 'Patient communication'],
  },
  {
    key: 'revenue',
    icon: Wallet,
    titleKey: 'academy.track.revenue',
    titleAr: 'دورة الإيرادات',
    desc: 'SBS coding, claim normalization, denial prevention, and NPHIES submission readiness.',
    descAr: 'ترميز SBS، تنسيق المطالبات، منع الرفض، وجاهزية الإرسال إلى نفيس.',
    tone: 'from-amber-500 to-orange-600',
    modules: ['SBS coding', 'NPHIES 837', 'Appeal drafting'],
  },
  {
    key: 'digital',
    icon: Sparkles,
    titleKey: 'academy.track.digital',
    titleAr: 'الصحة الرقمية',
    desc: 'Basma intake design, WhatsApp/SMS handoff, DAB-ready data views, and operational QA.',
    descAr: 'تصميم استقبال بسمة، انتقال واتساب والرسائل، عروض بيانات DAB، وضمان الجودة التشغيلي.',
    tone: 'from-sky-500 to-blue-700',
    modules: ['Basma flows', 'Comms playbooks', 'Operational audit'],
  },
]

const COURSES = [
  { title: 'Telehealth Operations', titleAr: 'تشغيل الاستشارة عن بعد', hours: 12, level: 'Intermediate', path: '/telehealth' },
  { title: 'SBS Coding & Claims', titleAr: 'ترميز SBS والمطالبات', hours: 18, level: 'Advanced', path: '/sbs' },
  { title: 'NPHIES Readiness', titleAr: 'جاهزية نفيس', hours: 10, level: 'Intermediate', path: '/nphies' },
  { title: 'Basma Communication', titleAr: 'تواصل بسمة', hours: 8, level: 'Foundation', path: '/basma' },
]

export default function AcademyPage() {
  const { t, locale } = useT()
  const { data: health } = useHealth()
  const academyStatus = String((health as any)?.integrations?.academy ?? 'connected')

  const metrics = [
    { label: t('academy.metric.courses'), value: COURSES.length, icon: BookOpenCheck },
    { label: t('academy.metric.hours'), value: COURSES.reduce((sum, c) => sum + c.hours, 0), icon: CalendarDays },
    { label: t('academy.metric.tracks'), value: TRACKS.length, icon: Layers3 },
  ]

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 py-10 space-y-8">
      <section className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-soft md:p-8">
        <div className="absolute inset-0 bg-mesh-brand opacity-90" aria-hidden />
        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <Badge variant="info" className="mb-4">
              <GraduationCap className="h-3 w-3" />
              HNH Learning System
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">{t('academy.title')}</h1>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">{t('academy.subtitle')}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/workflows">
                  {t('academy.enroll')}
                  <ArrowRight className={locale === 'ar' ? 'rotate-180' : ''} />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a href="/academy.html">{t('academy.catalog')}</a>
              </Button>
              <Badge variant={/connected|healthy|ok/i.test(academyStatus) ? 'success' : 'warning'}>
                {academyStatus}
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {metrics.map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-xl border bg-background/70 p-4 backdrop-blur">
                <Icon className="mb-3 h-4 w-4 text-primary" />
                <div className="text-2xl font-semibold">{Number(value).toLocaleString(locale)}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {TRACKS.map((track, idx) => {
          const Icon = track.icon
          return (
            <motion.div key={track.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
              <Card className="h-full overflow-hidden">
                <div className={`h-1.5 bg-gradient-to-r ${track.tone}`} />
                <CardHeader>
                  <div className={`mb-2 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${track.tone} text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{t(track.titleKey as any)}</CardTitle>
                  <CardDescription>{locale === 'ar' ? track.descAr : track.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {track.modules.map((m) => <Badge key={m} variant="outline">{m}</Badge>)}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <Badge variant="outline">{t('academy.catalog')}</Badge>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">{locale === 'ar' ? 'مسارات مرتبطة بالتشغيل' : 'Operation-linked courses'}</h2>
          </div>
          <Badge variant="success">
            <ShieldCheck className="h-3 w-3" />
            {locale === 'ar' ? 'متكامل مع HNH' : 'Integrated with HNH'}
          </Badge>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {COURSES.map((course) => (
            <Link key={course.title} href={course.path} className="group">
              <Card className="transition-all hover:-translate-y-0.5 hover:border-primary/40">
                <CardContent className="flex items-center justify-between gap-4 p-5">
                  <div className="min-w-0">
                    <div className="font-semibold">{locale === 'ar' ? course.titleAr : course.title}</div>
                    <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span>{course.hours}h</span>
                      <span>{course.level}</span>
                    </div>
                  </div>
                  <ArrowRight className={`h-4 w-4 text-primary opacity-70 transition-transform group-hover:translate-x-1 ${locale === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border bg-card p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
              <MessageSquareText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-semibold">{locale === 'ar' ? 'التواصل والتسجيل' : 'Communication and enrollment'}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {locale === 'ar'
                  ? 'يمكن ربط الاهتمام بالدورات مع بسمة وواتساب والبريد ضمن مسار موحد.'
                  : 'Course interest can flow through Basma, WhatsApp, and email as one operational pathway.'}
              </p>
            </div>
          </div>
          <Button asChild variant="outline">
            <Link href="/basma">{locale === 'ar' ? 'افتح بسمة' : 'Open Basma'}</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
