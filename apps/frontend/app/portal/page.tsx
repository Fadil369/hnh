'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight, Hospital, Stethoscope, Wallet, Landmark, Database, ExternalLink, CircleDot, Video, GraduationCap,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useT } from '@/lib/i18n'

type Portal = {
  id: string
  name: string
  nameAr: string
  title: string
  titleAr: string
  desc: string
  descAr: string
  icon: any
  href: string
  features: string[]
  tone: string
}

const PORTALS: Portal[] = [
  {
    id: 'bsma', name: 'BSMA', nameAr: 'بسمة',
    title: 'Patient Portal', titleAr: 'بوابة المرضى',
    desc: 'Appointments, eligibility, health records, and digital registration.',
    descAr: 'المواعيد، الأهلية، السجلات الصحية، والتسجيل الرقمي.',
    icon: Hospital, href: 'https://bsma.elfadil.com',
    features: ['حجز المواعيد', 'التحقق من الأهلية', 'السجلات الصحية', 'الموافقة الرقمية'],
    tone: 'from-sky-500 to-blue-700',
  },
  {
    id: 'givc', name: 'GIVC', nameAr: 'جيفك',
    title: 'Provider Portal', titleAr: 'بوابة مقدمي الخدمة',
    desc: 'Clinical workstation, CPOE orders, lab results, and nursing documentation.',
    descAr: 'محطة العمل السريرية، الطلبات الطبية، نتائج المختبر، والتوثيق التمريضي.',
    icon: Stethoscope, href: '/givc',
    features: ['ملاحظات سريرية', 'طلبات CPOE', 'نتائج المختبر', 'وصفات الدواء'],
    tone: 'from-emerald-500 to-emerald-700',
  },
  {
    id: 'sbs', name: 'SBS', nameAr: 'سبس',
    title: 'Billing & Insurance', titleAr: 'الفواتير والتأمين',
    desc: 'Revenue cycle management, claims, prior authorization, and contracts.',
    descAr: 'إدارة دورة الإيرادات، المطالبات، التفويض المسبق، والعقود.',
    icon: Wallet, href: '/sbs',
    features: ['لوحة RCM', 'المطالبات', 'التفويض المسبق', 'العقود'],
    tone: 'from-violet-500 to-violet-700',
  },
  {
    id: 'nphies', name: 'NPHIES', nameAr: 'نفيز',
    title: 'Gov Insurance Exchange', titleAr: 'منصة التأمين الحكومية',
    desc: 'National health insurance exchange for eligibility, PA, and claims.',
    descAr: 'المنصة الوطنية لتبادل التأمين الصحي للأهلية والتفويض والمطالبات.',
    icon: Landmark, href: '/nphies',
    features: ['التحقق من الأهلية', 'التفويض المسبق', 'تقديم المطالبات', 'تتبع الحالة'],
    tone: 'from-amber-500 to-amber-700',
  },
  {
    id: 'telehealth', name: 'Telehealth', nameAr: 'التطبيب',
    title: 'Virtual Care Console', titleAr: 'لوحة الاستشارة عن بعد',
    desc: 'Schedule sessions, start secure rooms, and track ICE readiness.',
    descAr: 'جدولة الجلسات، بدء الغرف الآمنة، وتتبع جاهزية ICE.',
    icon: Video, href: '/telehealth',
    features: ['جلسات مباشرة', 'روابط آمنة', 'ICE/TURN', 'متابعة بعد الزيارة'],
    tone: 'from-cyan-500 to-blue-700',
  },
  {
    id: 'academy', name: 'Academy', nameAr: 'الأكاديمية',
    title: 'Life Academy', titleAr: 'أكاديمية الحياة',
    desc: 'Training tracks tied to clinical operations, SBS, NPHIES, and Basma.',
    descAr: 'مسارات تدريب مرتبطة بالتشغيل السريري وSBS ونفيس وبسمة.',
    icon: GraduationCap, href: '/academy',
    features: ['تشغيل التطبيب', 'ترميز SBS', 'جاهزية نفيس', 'تواصل بسمة'],
    tone: 'from-fuchsia-500 to-violet-700',
  },
  {
    id: 'oracle', name: 'Oracle HIS', nameAr: 'أوراكل',
    title: 'Hospital Information System', titleAr: 'نظام معلومات المستشفى',
    desc: 'Oracle RAD integration across patient, clinic, lab, radiology, and pharmacy domains.',
    descAr: 'تكامل Oracle RAD عبر المرضى والعيادات والمختبر والأشعة والصيدلية.',
    icon: Database, href: 'https://oracle-bridge.brainsait.org',
    features: ['PMI المرضى', 'OPD العيادات', 'ADT الدخول', 'Lab & Radiology'],
    tone: 'from-rose-500 to-red-700',
  },
]

const SNAPSHOT = [
  { name: 'Oracle Bridge', tone: 'success' as const },
  { name: 'NPHIES Mirror', tone: 'success' as const },
  { name: 'D1 Database', tone: 'success' as const },
  { name: 'Operational UI', tone: 'info' as const },
]

export default function PortalHub() {
  const { t, locale } = useT()

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 py-10 space-y-8">
      <header className="space-y-3 text-center">
        <Badge variant="info">HNH × BrainSAIT · Healthcare OS</Badge>
        <motion.h1
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-semibold tracking-tight md:text-4xl"
        >
          {t('portal.title')}
        </motion.h1>
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground">{t('portal.subtitle')}</p>
        <div className="flex flex-wrap justify-center gap-2 pt-1">
          {['Oracle RAD', 'NPHIES', 'BSMA', 'GIVC', 'SBS'].map((id) => (
            <Badge key={id} variant="outline">{id}</Badge>
          ))}
        </div>
      </header>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {PORTALS.map((portal, idx) => {
          const external = portal.href.startsWith('http')
          const Icon = portal.icon
          return (
            <motion.div
              key={portal.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
            >
              <Link
                href={portal.href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl"
              >
                <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${portal.tone} text-white shadow-sm`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary" className="font-semibold">{portal.name}</Badge>
                    </div>
                    <CardTitle className="mt-2">
                      {locale === 'ar' ? portal.titleAr : portal.title}
                    </CardTitle>
                    <CardDescription>
                      {locale === 'ar' ? portal.descAr : portal.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid grid-cols-2 gap-1.5 text-xs text-muted-foreground">
                      {portal.features.map((f) => (
                        <li key={f} className="flex items-center gap-1.5">
                          <CircleDot className="h-3 w-3 text-emerald-500" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{portal.nameAr}</span>
                      <span className="inline-flex items-center gap-1 font-semibold text-primary">
                        {t('portal.open')}
                        {external ? <ExternalLink className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </section>

      <Card>
        <CardHeader>
          <Badge variant="outline" className="w-fit">{t('portal.snapshot')}</Badge>
          <CardTitle className="text-xl">{t('portal.snapshot')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {SNAPSHOT.map((s) => (
              <div key={s.name} className="flex items-center gap-3 rounded-xl border bg-muted/30 p-4">
                <span className={`h-2.5 w-2.5 rounded-full ${s.tone === 'success' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                <div>
                  <div className="text-sm font-semibold">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.tone === 'success' ? 'active' : 'live'}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
