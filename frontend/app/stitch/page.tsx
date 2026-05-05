'use client'

import { useState } from 'react'

interface DesignProject {
  id: string
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  images: { name: string; desc: string; descAr: string }[]
  color: string
}

export default function StitchDesigns() {
  const [activeProject, setActiveProject] = useState<string>('doctor-dashboard')

  const projects: DesignProject[] = [
    {
      id: 'doctor-dashboard',
      name: 'Doctor Dashboard',
      nameAr: 'لوحة تحكم الطبيب',
      description: 'Comprehensive doctor dashboard with patient management, appointments, and NPHIES integration',
      descriptionAr: 'لوحة تحكم شاملة للطبيب مع إدارة المرضى والمواعيد وتكامل نفيز',
      images: [
        { name: 'doctor-dashboard.png', desc: 'Main Dashboard', descAr: 'لوحة التحكم الرئيسية' },
        { name: 'patient-list.png', desc: 'Patient List', descAr: 'قائمة المرضى' },
        { name: 'patient-details.png', desc: 'Patient Details', descAr: 'تفاصيل المريض' },
        { name: 'appointment-management.png', desc: 'Appointments', descAr: 'المواعيد' },
        { name: 'nphies-portal-1.png', desc: 'NPHIES Integration', descAr: 'تكامل نفيز' },
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'basma-linc',
      name: 'Basma-Linc AI Voice',
      nameAr: 'بسمة لينك مساعد الصوت',
      description: 'AI-powered voice assistant for healthcare with triage, booking, and symptom assessment',
      descriptionAr: 'مساعد صوت ذكي للرعاية الصحية مع الفرز والحجز وتقييم الأعراض',
      images: [
        { name: 'basma-linc-main.png', desc: 'Main Assistant', descAr: 'المساعد الرئيسي' },
        { name: 'hospital-portals.png', desc: 'Portals Hub', descAr: 'مركز البوابات' },
        { name: 'ai-symptom-chat.png', desc: 'Symptom Assessment', descAr: 'تقييم الأعراض' },
        { name: 'emergency-triage.png', desc: 'Emergency Triage', descAr: 'الفرز الطارئ' },
        { name: 'specialist-booking.png', desc: 'Booking Flow', descAr: 'عملية الحجز' },
        { name: 'triage-report.png', desc: 'Triage Report', descAr: 'تقرير الفرز' },
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'claims-workbench',
      name: 'Claims Workbench',
      nameAr: 'منصة المطالبات',
      description: 'Complete claims management system with workflow, analytics, and audit trails',
      descriptionAr: 'نظام إدارة مطالبات كامل مع سير العمل والتحليلات وسجلات التدقيق',
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
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'healthcare-payment',
      name: 'Healthcare Payment Platform',
      nameAr: 'منصة الدفع الصحي',
      description: 'NPHIES integrated payment and billing platform for Saudi healthcare',
      descriptionAr: 'منصة الدفع والفواتير المتكاملة مع نفيز للرعاية الصحية السعودية',
      images: [
        { name: 'payment-platform-1.png', desc: 'Payment Dashboard', descAr: 'لوحة الدفع' },
        { name: 'payment-platform-2.png', desc: 'Billing Interface', descAr: 'واجهة الفوترة' },
        { name: 'payment-platform-3.png', desc: 'Claims Integration', descAr: 'تكامل المطالبات' },
        { name: 'payment-platform-4.png', desc: 'Analytics', descAr: 'التحليلات' },
      ],
      color: 'from-amber-500 to-orange-500'
    },
  ]

  const currentProject = projects.find(p => p.id === activeProject) || projects[0]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="panel p-6 bg-gradient-to-r from-slate-800 to-slate-900 text-white border-0">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🎨</span>
          <div>
            <h2 className="text-2xl font-bold">HNH BrainSAIT Visual Assets</h2>
            <p className="text-slate-300">Reference assets and screen captures used by the current operational sections</p>
          </div>
        </div>
      </div>

      {/* Project Tabs */}
      <div className="flex flex-wrap gap-2">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => setActiveProject(project.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeProject === project.id
                ? `bg-gradient-to-r ${project.color} text-white`
                : 'bg-[var(--border)] hover:bg-[var(--primary)]/10'
            }`}
          >
            <span className="ltr:hidden">{project.nameAr}</span>
            <span className="hidden ltr:inline">{project.name}</span>
          </button>
        ))}
      </div>

      {/* Project Info */}
      <div className="card p-6">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className={`flex-1 p-4 rounded-xl bg-gradient-to-r ${currentProject.color} text-white`}>
            <h3 className="text-xl font-bold mb-2">
              <span className="ltr:hidden">{currentProject.nameAr}</span>
              <span className="hidden ltr:inline">{currentProject.name}</span>
            </h3>
            <p className="text-white/80">
              <span className="ltr:hidden">{currentProject.descriptionAr}</span>
              <span className="hidden ltr:inline">{currentProject.description}</span>
            </p>
          </div>
          <div className="text-right text-sm text-[var(--text-secondary)]">
            <div>{currentProject.images.length} screens</div>
            <div>Design System v1.0</div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentProject.images.map((img, idx) => (
            <div
              key={idx}
              className="card overflow-hidden group hover:shadow-xl transition-all"
            >
              <div className="relative aspect-[9/16] bg-gray-100 dark:bg-gray-800">
                <img
                  src={`/stitch-assets/${currentProject.id}/${img.name}`}
                  alt={img.desc}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect fill='%23f3f4f6' width='400' height='600'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%239ca3af' font-family='system-ui'%3E${img.name}%3C/text%3E%3C/svg%3E`
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
              <div className="p-3 border-t border-[var(--border)]">
                <span className="text-sm font-medium">
                  <span className="ltr:hidden">{img.descAr}</span>
                  <span className="hidden ltr:inline">{img.desc}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Notes */}
      <div className="card p-6">
        <h3 className="text-xl font-bold mb-4">
          <span>ملاحظات التكامل</span>
          <span className="text-sm font-normal mr-2 text-[var(--text-secondary)]">Integration Notes</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-2">Doctor Dashboard Integration</h4>
            <ul className="text-sm space-y-1 text-[var(--text-secondary)]">
              <li>• Connect to /api/patients for patient list</li>
              <li>• Connect to /api/appointments for schedule</li>
              <li>• NPHIES 270/271 for eligibility</li>
              <li>• FHIR R4 patient resources</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <h4 className="font-bold text-purple-600 dark:text-purple-400 mb-2">Basma-Linc Voice Integration</h4>
            <ul className="text-sm space-y-1 text-[var(--text-secondary)]">
              <li>• WebSocket for real-time voice</li>
              <li>• Triage workflow via /api/triage</li>
              <li>• Appointment booking /api/appointments</li>
              <li>• Multi-language (Arabic/English)</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
            <h4 className="font-bold text-emerald-600 dark:text-emerald-400 mb-2">Claims Workbench Integration</h4>
            <ul className="text-sm space-y-1 text-[var(--text-secondary)]">
              <li>• Claim CRUD via /api/claims</li>
              <li>• NPHIES 837 for submission</li>
              <li>• ClaimLinc for adjudication</li>
              <li>• Audit trail /api/audit</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20">
            <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-2">Payment Platform Integration</h4>
            <ul className="text-sm space-y-1 text-[var(--text-secondary)]">
              <li>• SBS billing codes via /api/sbs</li>
              <li>• GIVC RCM /api/givc</li>
              <li>• NPHIES 835 remittance</li>
              <li>• Insurance reconciliation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
