'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Users, CalendarDays, Hospital, ClipboardList, ShieldCheck,
  ArrowRight, Sparkles, Activity, Workflow, BookOpen, Stethoscope, CreditCard, Building2, Video, GraduationCap,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { useT } from '@/lib/i18n'
import { useHealth, useStats } from '@/hooks/useApi'
import { formatNumber } from '@/lib/utils'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
} as const

export default function HomePage() {
  const { t, locale } = useT()
  const { data: health, isLoading: healthLoading } = useHealth()
  const { data: stats, isLoading: statsLoading } = useStats()

  const status = health?.status?.toLowerCase()
  const statusVariant: 'success' | 'warning' | 'destructive' =
    status === 'healthy' || status === 'ok' ? 'success' :
    status === 'degraded' ? 'warning' : 'destructive'
  const statusLabel = healthLoading
    ? t('common.loading')
    : status === 'healthy' || status === 'ok' ? t('common.online')
    : status === 'degraded' ? t('common.degraded')
    : t('common.offline')

  const statCards = [
    { key: 'patients',     label: t('home.stats.patients'),     value: stats?.total_patients,     icon: Users,        href: '/patients' },
    { key: 'appointments', label: t('home.stats.appointments'), value: stats?.today_appointments, icon: CalendarDays, href: '/appointments' },
    { key: 'providers',    label: t('home.stats.providers'),    value: stats?.total_providers,    icon: Hospital,     href: '/providers' },
    { key: 'claims',       label: t('home.stats.claims'),       value: stats?.total_claims,       icon: ClipboardList,href: '/claims' },
    { key: 'pending',      label: t('home.stats.pending'),      value: stats?.pending_claims,     icon: ShieldCheck,  href: '/claims?status=pending' },
  ]

  const portals = [
    { href: '/givc',   icon: Stethoscope, label: t('nav.givc'),   desc: 'Provider clinical workstation', tone: 'from-emerald-500/20 to-emerald-500/5' },
    { href: '/sbs',    icon: CreditCard,  label: t('nav.sbs'),    desc: 'Saudi billing & RCM',           tone: 'from-amber-500/20 to-amber-500/5' },
    { href: '/nphies', icon: Building2,   label: t('nav.nphies'), desc: 'Insurance exchange',            tone: 'from-sky-500/20 to-sky-500/5' },
    { href: '/telehealth', icon: Video, label: t('nav.telehealth'), desc: 'Virtual care console', tone: 'from-cyan-500/20 to-cyan-500/5' },
    { href: '/academy', icon: GraduationCap, label: t('nav.academy'), desc: 'Training and enablement', tone: 'from-fuchsia-500/20 to-fuchsia-500/5' },
  ]

  const features = [
    { icon: Activity,  title: 'Real-time NPHIES',  desc: '270/271 eligibility, 837/835 claims, audit-ready' },
    { icon: Workflow,  title: 'Workflow engine',   desc: 'Patient, provider, billing & insurance flows' },
    { icon: Sparkles,  title: 'Basma AI',          desc: 'Bilingual assistant, intent-aware actions' },
    { icon: BookOpen,  title: 'FHIR R4',           desc: 'Patients, claims, encounters, observations' },
  ]

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <div className="pointer-events-none absolute -top-40 start-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" aria-hidden />

        <div className="mx-auto w-full max-w-screen-2xl px-6 pb-14 pt-16 sm:pt-24">
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="mx-auto max-w-3xl text-center">
            <Badge variant="info" className="mb-5 gap-1.5">
              <Sparkles className="h-3 w-3" />
              {t('home.hero.eyebrow')}
            </Badge>
            <h1 className="text-balance bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
              {t('home.hero.title')}
            </h1>
            <p className="mt-5 text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t('home.hero.subtitle')}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/book">
                  {locale === 'ar' ? 'احجز موعدك' : 'Book an appointment'}
                  <ArrowRight className={locale === 'ar' ? 'rotate-180' : ''} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/portal">{t('home.hero.cta.portal')}</Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link href="/knowledge">{t('home.hero.cta.docs')}</Link>
              </Button>
              <Badge variant={statusVariant} className="gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
                </span>
                {statusLabel}{health?.version ? ` · v${health.version}` : ''}
              </Badge>
            </div>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            initial="hidden" animate="show"
            className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
          >
            {statCards.map(({ key, label, value, icon: Icon, href }) => (
              <motion.div key={key} variants={fadeUp}>
                <Link href={href} className="group block">
                  <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card">
                    <CardContent className="flex items-center justify-between p-4">
                      <div>
                        <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
                        <div className="mt-1 text-2xl font-semibold tracking-tight">
                          {statsLoading
                            ? <Skeleton className="h-7 w-16" />
                            : value !== undefined ? formatNumber(value, locale) : '—'}
                        </div>
                      </div>
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portals */}
      <section className="mx-auto w-full max-w-screen-2xl px-6 py-12">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{t('nav.portals')}</h2>
            <p className="text-sm text-muted-foreground">Specialised consoles for each lane.</p>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/portal">{t('common.viewAll')} <ArrowRight className={locale === 'ar' ? 'rotate-180' : ''} /></Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {portals.map(({ href, icon: Icon, label, desc, tone }) => (
            <Link key={href} href={href} className="group">
              <Card className="relative h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-card">
                <div className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${tone} opacity-60 transition-opacity group-hover:opacity-100`} aria-hidden />
                <CardHeader>
                  <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-background/80 ring-1 ring-border">
                    <Icon className="h-4 w-4" />
                  </div>
                  <CardTitle className="flex items-center justify-between text-lg">
                    {label}
                    <ArrowRight className={`h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100 ${locale === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                  </CardTitle>
                  <CardDescription>{desc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-screen-2xl px-6 pb-20">
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">Platform highlights</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <Card key={title}>
              <CardHeader>
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <CardTitle className="text-base">{title}</CardTitle>
                <CardDescription>{desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
