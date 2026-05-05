'use client'

import { useState } from 'react'

const PORTALS = [
  {
    id: 'bsma',
    name: 'BSMA',
    nameAr: 'بسمة',
    title: 'Patient Portal',
    titleAr: 'بوابة المرضى',
    desc: 'Appointments, eligibility, health records, and digital registration.',
    descAr: 'المواعيد، الأهلية، السجلات الصحية، والتسجيل الرقمي.',
    icon: '🙂',
    color: 'from-blue-500 to-blue-700',
    href: 'https://bsma.elfadil.com',
    features: ['حجز المواعيد', 'التحقق من الأهلية', 'السجلات الصحية', 'الموافقة الرقمية'],
  },
  {
    id: 'givc',
    name: 'GIVC',
    nameAr: 'جيفك',
    title: 'Provider Portal',
    titleAr: 'بوابة مقدمي الخدمة',
    desc: 'Clinical workstation, CPOE orders, lab results, and nursing documentation.',
    descAr: 'محطة العمل السريرية، الطلبات الطبية، نتائج المختبر، والتوثيق التمريضي.',
    icon: '🩺',
    color: 'from-emerald-500 to-emerald-700',
    href: '/givc',
    features: ['ملاحظات سريرية', 'طلبات CPOE', 'نتائج المختبر', 'وصفات الدواء'],
  },
  {
    id: 'sbs',
    name: 'SBS',
    nameAr: 'سبس',
    title: 'Billing & Insurance',
    titleAr: 'الفواتير والتأمين',
    desc: 'Revenue cycle management, claims, prior authorization, and contracts.',
    descAr: 'إدارة دورة الإيرادات، المطالبات، التفويض المسبق، والعقود.',
    icon: '💰',
    color: 'from-violet-500 to-violet-700',
    href: '/sbs',
    features: ['لوحة RCM', 'المطالبات', 'التفويض المسبق', 'العقود'],
  },
  {
    id: 'nphies',
    name: 'NPHIES',
    nameAr: 'نفيز',
    title: 'Gov Insurance Exchange',
    titleAr: 'منصة التأمين الحكومية',
    desc: 'National health insurance exchange for eligibility, PA, and claims.',
    descAr: 'المنصة الوطنية لتبادل التأمين الصحي للأهلية والتفويض والمطالبات.',
    icon: '🏛️',
    color: 'from-amber-500 to-amber-700',
    href: '/nphies',
    features: ['التحقق من الأهلية', 'التفويض المسبق', 'تقديم المطالبات', 'تتبع الحالة'],
  },
  {
    id: 'oracle',
    name: 'Oracle HIS',
    nameAr: 'أوراكل',
    title: 'Hospital Information System',
    titleAr: 'نظام معلومات المستشفى',
    desc: 'Oracle RAD integration across patient, clinic, lab, radiology, and pharmacy domains.',
    descAr: 'تكامل Oracle RAD عبر المرضى والعيادات والمختبر والأشعة والصيدلية.',
    icon: '🔷',
    color: 'from-rose-500 to-red-700',
    href: 'https://oracle-bridge.brainsait.org',
    features: ['PMI المرضى', 'OPD العيادات', 'ADT الدخول', 'Lab & Radiology'],
  },
]

export default function PortalHub() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <section className="panel-hero px-6 py-7 text-white md:px-8 text-center">
        <div className="subtle-grid" />
        <div className="relative z-10">
          <div className="text-5xl">🏥</div>
          <h1 className="mt-4 text-4xl font-bold">المركز الموحد</h1>
          <p className="mt-2 text-lg text-white/85">Unified Healthcare Hub</p>
          <p className="text-sm text-white/65">HNH BrainSAIT Healthcare OS · operational access across core portals</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2 text-sm">
            {['Oracle RAD', 'NPHIES', 'BSMA', 'GIVC', 'SBS'].map((item) => (
              <span key={item} className="status-pill border-white/10 bg-white/10 text-white">{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {PORTALS.map((portal) => {
          const external = portal.href.startsWith('http')
          return (
            <a
              key={portal.id}
              href={portal.href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              onMouseEnter={() => setHovered(portal.id)}
              onMouseLeave={() => setHovered(null)}
              className="panel p-6 block hover:-translate-y-0.5"
            >
              <div className="mb-5 flex items-start justify-between gap-3">
                <div>
                  <div className="mb-3 text-4xl">{portal.icon}</div>
                  <div className="bilingual-label">
                    <strong>{portal.titleAr}</strong>
                    <span>{portal.title}</span>
                  </div>
                </div>
                <div className={`rounded-full bg-gradient-to-r ${portal.color} px-3 py-1 text-xs font-bold text-white`}>
                  {portal.name}
                </div>
              </div>

              <p className="text-sm text-muted">{portal.descAr}</p>
              <p className="text-xs text-muted">{portal.desc}</p>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {portal.features.map((feature) => (
                  <div key={feature} className="text-xs text-muted">✓ {feature}</div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="text-muted">{portal.nameAr}</span>
                <span style={{ color: 'var(--primary)' }}>{hovered === portal.id ? 'فتح ←' : 'دخول →'}</span>
              </div>
            </a>
          )
        })}
      </section>

      <section className="panel p-5 md:p-6">
        <div className="mb-5">
          <div className="section-kicker">Integration Snapshot</div>
          <h2 className="mt-3 text-xl font-bold">حالة التكاملات</h2>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { name: 'Oracle Bridge', status: 'active', tone: 'text-emerald-600' },
            { name: 'NPHIES Mirror', status: 'active', tone: 'text-emerald-600' },
            { name: 'D1 Database', status: 'active', tone: 'text-emerald-600' },
            { name: 'Operational UI', status: 'live', tone: 'text-blue-600' },
          ].map((item) => (
            <div key={item.name} className="panel-soft flex items-center gap-3 p-4">
              <span className={`text-lg ${item.tone}`}>●</span>
              <div>
                <div className="text-sm font-semibold">{item.name}</div>
                <div className="text-xs text-muted">{item.status}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
