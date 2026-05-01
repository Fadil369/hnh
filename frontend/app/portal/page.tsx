'use client'

import { useState } from 'react'

const PORTALS = [
  {
    id: 'bsma',
    name: 'BSMA',
    nameAr: 'بسمة',
    title: 'Patient Portal',
    titleAr: 'بوابة المرضى',
    desc: 'Appointments, eligibility, health records, and digital registration',
    descAr: 'المواعيد، الأهلية، السجلات الصحية، والتسجيل الرقمي',
    icon: '🙂',
    color: 'from-blue-500 to-blue-700',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-700',
    href: 'https://bsma.elfadil.com',
    features: ['حجز المواعيد', 'التحقق من الأهلية', 'السجلات الصحية', 'الموافقة الرقمية'],
  },
  {
    id: 'givc',
    name: 'GIVC',
    nameAr: 'جيفك',
    title: 'Provider Portal',
    titleAr: 'بوابة مقدمي الخدمة',
    desc: 'Clinical workstation, CPOE orders, lab results, and nursing documentation',
    descAr: 'محطة العمل السريرية، الطلبات الطبية، نتائج المختبر، والتوثيق التمريضي',
    icon: '🩺',
    color: 'from-emerald-500 to-emerald-700',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-700',
    href: 'https://givc.elfadil.com',
    features: ['ملاحظات سريرية', 'طلبات CPOE', 'نتائج المختبر', 'وصفات الدواء'],
  },
  {
    id: 'sbs',
    name: 'SBS',
    nameAr: 'سبس',
    title: 'Billing & Insurance',
    titleAr: 'الفواتير والتأمين',
    desc: 'Revenue cycle management, claims, prior authorization, and contracts',
    descAr: 'إدارة دورة الإيرادات، المطالبات، التفويض المسبق، والعقود',
    icon: '💰',
    color: 'from-violet-500 to-violet-700',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
    border: 'border-violet-200 dark:border-violet-700',
    href: 'https://sbs.elfadil.com',
    features: ['لوحة RCM', 'المطالبات', 'التفويض المسبق', 'العقود'],
  },
  {
    id: 'nphies',
    name: 'NPHIES',
    nameAr: 'نفيس',
    title: 'Gov Insurance Exchange',
    titleAr: 'منصة التأمين الحكومية',
    desc: 'National Platform for Health Insurance Exchange — eligibility, PA, and claims',
    descAr: 'المنصة الوطنية لتبادل التأمين الصحي — الأهلية، التفويض، والمطالبات',
    icon: '🏛️',
    color: 'from-amber-500 to-amber-700',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-700',
    href: 'https://portal.nphies.sa',
    features: ['التحقق من الأهلية', 'التفويض المسبق', 'تقديم المطالبات', 'تتبع الحالة'],
  },
  {
    id: 'oracle',
    name: 'Oracle HIS',
    nameAr: 'أوراكل',
    title: 'Hospital Information System',
    titleAr: 'نظام معلومات المستشفى',
    desc: 'Oracle RAD integration — PMI, OPD, ADT, Lab, Radiology, Pharmacy',
    descAr: 'تكامل أوراكل — سجلات المرضى، العيادات، الدخول، المختبر، الأشعة، الصيدلية',
    icon: '🔷',
    color: 'from-red-500 to-red-700',
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-700',
    href: 'https://oracle-bridge.brainsait.org',
    features: ['PMI المرضى', 'OPD العيادات', 'ADT الدخول', 'Lab & Radiology'],
  },
]

export default function PortalHub() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="card p-8 gradient-hero text-white border-0 text-center">
        <div className="text-5xl mb-4">🏥</div>
        <h1 className="text-4xl font-bold mb-2">المركز الموحد</h1>
        <p className="text-xl opacity-90 mb-1">Unified Healthcare Hub</p>
        <p className="text-sm opacity-70">مستشفى حيات الوطني - غرنطا · Hayat National Hospital</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm opacity-80">
          <span className="px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
            🔗 Oracle RAD
          </span>
          <span className="px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
            🏛️ NPHIES
          </span>
          <span className="px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
            🙂 BSMA
          </span>
          <span className="px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
            🩺 GIVC
          </span>
          <span className="px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
            💰 SBS
          </span>
        </div>
      </div>

      {/* Portal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {PORTALS.map((portal) => (
          <a
            key={portal.id}
            href={portal.href}
            target={portal.id !== 'bsma' ? '_blank' : undefined}
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(portal.id)}
            onMouseLeave={() => setHovered(null)}
            className={`card p-6 border-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${portal.bg} ${portal.border} block`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-4xl mb-2">{portal.icon}</div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">{portal.name}</span>
                  <span className="text-sm opacity-60">({portal.nameAr})</span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-white text-xs bg-gradient-to-r ${portal.color}`}>
                {portal.id.toUpperCase()}
              </div>
            </div>

            <h3 className="text-lg font-bold mb-1">{portal.titleAr}</h3>
            <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>{portal.title}</p>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{portal.descAr}</p>

            <div className="grid grid-cols-2 gap-1">
              {portal.features.map((f, i) => (
                <div key={i} className="text-xs flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
                  <span className="text-green-500">✓</span> {f}
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs opacity-50">{portal.href.replace('https://', '')}</span>
              <span className="text-sm font-medium" style={{ color: 'var(--primary)' }}>
                {hovered === portal.id ? 'فتح ←' : 'دخول →'}
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Integration Status */}
      <div className="card p-6">
        <h3 className="text-xl font-bold mb-4">
          حالة التكاملات
          <span className="text-sm font-normal mr-2" style={{ color: 'var(--text-secondary)' }}>Integration Status</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Oracle Bridge', status: 'active', color: 'text-green-500' },
            { name: 'NPHIES Mirror', status: 'active', color: 'text-green-500' },
            { name: 'D1 Database', status: 'active', color: 'text-green-500' },
            { name: 'NPHIES Portal', status: 'integrated', color: 'text-blue-500' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: 'var(--bg)' }}>
              <span className={`text-lg ${item.color}`}>●</span>
              <div>
                <div className="text-sm font-medium">{item.name}</div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
