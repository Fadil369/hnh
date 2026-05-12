'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useT } from '@/lib/i18n'

interface DesignProject {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  images: { name: string; desc: string; descAr: string }[]
  tone: string
}

const PROJECTS: DesignProject[] = [
  {
    id: 'doctor-dashboard',
    name: 'Doctor Dashboard', nameAr: 'لوحة تحكم الطبيب',
    description: 'Comprehensive doctor dashboard with patient management, appointments, and NPHIES integration',
    descriptionAr: 'لوحة تحكم شاملة للطبيب مع إدارة المرضى والمواعيد وتكامل نفيز',
    tone: 'from-sky-500 to-cyan-500',
    images: [
      { name: 'doctor-dashboard.png', desc: 'Main Dashboard', descAr: 'لوحة التحكم الرئيسية' },
      { name: 'patient-list.png', desc: 'Patient List', descAr: 'قائمة المرضى' },
      { name: 'patient-details.png', desc: 'Patient Details', descAr: 'تفاصيل المريض' },
      { name: 'appointment-management.png', desc: 'Appointments', descAr: 'المواعيد' },
      { name: 'nphies-portal-1.png', desc: 'NPHIES Integration', descAr: 'تكامل نفيز' },
    ],
  },
  {
    id: 'basma-linc',
    name: 'Basma-Linc AI Voice', nameAr: 'بسمة لينك مساعد الصوت',
    description: 'AI-powered voice assistant for healthcare with triage, booking, and symptom assessment',
    descriptionAr: 'مساعد صوت ذكي للرعاية الصحية مع الفرز والحجز وتقييم الأعراض',
    tone: 'from-purple-500 to-pink-500',
    images: [
      { name: 'basma-linc-main.png', desc: 'Main Assistant', descAr: 'المساعد الرئيسي' },
      { name: 'hospital-portals.png', desc: 'Portals Hub', descAr: 'مركز البوابات' },
      { name: 'ai-symptom-chat.png', desc: 'Symptom Assessment', descAr: 'تقييم الأعراض' },
      { name: 'emergency-triage.png', desc: 'Emergency Triage', descAr: 'الفرز الطارئ' },
      { name: 'specialist-booking.png', desc: 'Booking Flow', descAr: 'عملية الحجز' },
      { name: 'triage-report.png', desc: 'Triage Report', descAr: 'تقرير الفرز' },
    ],
  },
  {
    id: 'claims-workbench',
    name: 'Claims Workbench', nameAr: 'منصة المطالبات',
    description: 'Complete claims management system with workflow, analytics, and audit trails',
    descriptionAr: 'نظام إدارة مطالبات كامل مع سير العمل والتحليلات وسجلات التدقيق',
    tone: 'from-emerald-500 to-teal-500',
    images: [
      { name: 'claims-dashboard.png', desc: 'Claims Dashboard', descAr: 'لوحة المطالبات' },
      { name: 'create-claim-stepper.png', desc: 'Create Claim', descAr: 'إنشاء مطالبة' },
      { name: 'claim-details.png', desc: 'Claim Details', descAr: 'تفاصيل المطالبة' },
      { name: 'insurer-review-queue.png', desc: 'Review Queue', descAr: 'قائمة المراجعة' },
      { name: 'rejection-correction.png', desc: 'Correction Workspace', descAr: 'مساحة التصحيح' },
      { name: 'finance-analytics.png', desc: 'Analytics', descAr: 'التحليلات' },
      { name: 'provider-notifications.png', desc: 'Notifications', descAr: 'الإشعارات' },
      { name: 'audit-log.png', desc: 'Audit Log', descAr: 'سجل التدقيق' },
    ],
  },
  {
    id: 'healthcare-payment',
    name: 'Healthcare Payment Platform', nameAr: 'منصة الدفع الصحي',
    description: 'NPHIES integrated payment and billing platform for Saudi healthcare',
    descriptionAr: 'منصة الدفع والفواتير المتكاملة مع نفيز للرعاية الصحية السعودية',
    tone: 'from-amber-500 to-orange-500',
    images: [
      { name: 'payment-platform-1.png', desc: 'Payment Dashboard', descAr: 'لوحة الدفع' },
      { name: 'payment-platform-2.png', desc: 'Billing Interface', descAr: 'واجهة الفوترة' },
      { name: 'payment-platform-3.png', desc: 'Claims Integration', descAr: 'تكامل المطالبات' },
      { name: 'payment-platform-4.png', desc: 'Analytics', descAr: 'التحليلات' },
    ],
  },
]

export default function StitchDesigns() {
  const { t, locale } = useT()
  const [active, setActive] = useState<string>(PROJECTS[0].id)

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 py-10 space-y-6">
      <header>
        <Badge variant="info">Visual Assets</Badge>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{t('stitch.title')}</h1>
        <p className="text-sm text-muted-foreground">{t('stitch.subtitle')}</p>
      </header>

      <Tabs value={active} onValueChange={setActive}>
        <TabsList className="flex flex-wrap h-auto">
          {PROJECTS.map((p) => (
            <TabsTrigger key={p.id} value={p.id}>
              {locale === 'ar' ? p.nameAr : p.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {PROJECTS.map((project) => (
          <TabsContent key={project.id} value={project.id} className="space-y-6">
            <Card>
              <CardHeader>
                <div className={`rounded-xl bg-gradient-to-r ${project.tone} p-5 text-white`}>
                  <CardTitle className="text-white">
                    {locale === 'ar' ? project.nameAr : project.name}
                  </CardTitle>
                  <CardDescription className="text-white/85">
                    {locale === 'ar' ? project.descriptionAr : project.description}
                  </CardDescription>
                  <div className="mt-3 flex items-center gap-3 text-xs text-white/80">
                    <span>{project.images.length} screens</span>
                    <span>·</span>
                    <span>Design System v1.0</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <AnimatePresence>
                    {project.images.map((img, idx) => (
                      <motion.div
                        key={img.name}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className="overflow-hidden rounded-xl border bg-card shadow-sm transition-transform hover:-translate-y-0.5"
                      >
                        <div className="relative aspect-[9/16] bg-muted">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`/stitch-assets/${project.id}/${img.name}`}
                            alt={img.desc}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect fill='%23f3f4f6' width='400' height='600'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-family='system-ui'%3E${img.name}%3C/text%3E%3C/svg%3E`
                            }}
                          />
                        </div>
                        <div className="border-t p-3 text-sm font-medium">
                          {locale === 'ar' ? img.descAr : img.desc}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
