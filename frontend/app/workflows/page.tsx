'use client'

import { useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || 'https://hnh.brainsait.org'

// ─── Types ────────────────────────────────────────────────────────────────────
interface WorkflowCard {
  id: string
  icon: string
  label: string
  labelAr: string
  desc: string
  descAr: string
  endpoint: string
  buildPayload: (inputs: Record<string, string>) => Record<string, unknown>
  inputs: { key: string; label: string; labelAr: string; placeholder: string; type?: string }[]
}

// ─── Workflow definitions ─────────────────────────────────────────────────────
const PATIENT_WORKFLOWS: WorkflowCard[] = [
  {
    id: 'health-screening',
    icon: '🩺',
    label: 'Health Screening',
    labelAr: 'الفحص الصحي الذكي',
    desc: 'AI-powered health risk assessment based on patient profile & vitals',
    descAr: 'تقييم مخاطر صحية مدعوم بالذكاء الاصطناعي',
    endpoint: '/api/workflows/patient/health-screening',
    buildPayload: (i) => ({ patient_id: i.patient_id }),
    inputs: [{ key: 'patient_id', label: 'Patient ID', labelAr: 'رقم المريض', placeholder: 'P001' }],
  },
  {
    id: 'book-visit',
    icon: '📅',
    label: 'Book Visit',
    labelAr: 'حجز موعد',
    desc: 'AI-assisted appointment booking with provider matching',
    descAr: 'حجز موعد ذكي مع أفضل مزود رعاية',
    endpoint: '/api/workflows/patient/book-visit',
    buildPayload: (i) => ({ patient_id: i.patient_id, specialty: i.specialty, preferred_date: i.date }),
    inputs: [
      { key: 'patient_id', label: 'Patient ID', labelAr: 'رقم المريض', placeholder: 'P001' },
      { key: 'specialty', label: 'Specialty', labelAr: 'التخصص', placeholder: 'cardiology' },
      { key: 'date', label: 'Preferred Date', labelAr: 'التاريخ المفضل', placeholder: '2026-05-10', type: 'date' },
    ],
  },
  {
    id: 'post-visit',
    icon: '📋',
    label: 'Post-Visit Summary',
    labelAr: 'ملخص ما بعد الزيارة',
    desc: 'Auto-generate bilingual discharge summary & follow-up plan',
    descAr: 'توليد ملخص خروج ثنائي اللغة تلقائياً',
    endpoint: '/api/workflows/patient/post-visit',
    buildPayload: (i) => ({ patient_id: i.patient_id, appointment_id: i.appt }),
    inputs: [
      { key: 'patient_id', label: 'Patient ID', labelAr: 'رقم المريض', placeholder: 'P001' },
      { key: 'appt', label: 'Appointment ID', labelAr: 'رقم الموعد', placeholder: 'APT-001' },
    ],
  },
  {
    id: 'lab-results',
    icon: '🧪',
    label: 'Lab Results',
    labelAr: 'نتائج المختبر',
    desc: 'Explain lab results in plain language, flag critical values',
    descAr: 'شرح نتائج المختبر بلغة مبسطة وتمييز القيم الحرجة',
    endpoint: '/api/workflows/patient/lab-results',
    buildPayload: (i) => ({ patient_id: i.patient_id }),
    inputs: [{ key: 'patient_id', label: 'Patient ID', labelAr: 'رقم المريض', placeholder: 'P001' }],
  },
  {
    id: 'patient-summary',
    icon: '📊',
    label: 'Patient Summary',
    labelAr: 'ملخص المريض',
    desc: 'Complete health summary: history, medications, upcoming care',
    descAr: 'ملخص صحي شامل: التاريخ المرضي والأدوية والرعاية القادمة',
    endpoint: '/api/workflows/patient/summary',
    buildPayload: (i) => ({ patient_id: i.patient_id }),
    inputs: [{ key: 'patient_id', label: 'Patient ID', labelAr: 'رقم المريض', placeholder: 'P001' }],
  },
]

const PROVIDER_WORKFLOWS: WorkflowCard[] = [
  {
    id: 'clinical-decision',
    icon: '🧠',
    label: 'Clinical Decision Support',
    labelAr: 'دعم القرار السريري',
    desc: 'Evidence-based diagnosis & treatment recommendations',
    descAr: 'توصيات تشخيصية وعلاجية قائمة على الأدلة',
    endpoint: '/api/workflows/provider/clinical-decision',
    buildPayload: (i) => ({ patient_id: i.patient_id, chief_complaint: i.complaint, provider_id: i.provider_id }),
    inputs: [
      { key: 'patient_id', label: 'Patient ID', labelAr: 'رقم المريض', placeholder: 'P001' },
      { key: 'provider_id', label: 'Provider ID', labelAr: 'رقم المزود', placeholder: 'DR001' },
      { key: 'complaint', label: 'Chief Complaint', labelAr: 'الشكوى الرئيسية', placeholder: 'chest pain' },
    ],
  },
  {
    id: 'smart-billing',
    icon: '💳',
    label: 'Smart Billing (SBS)',
    labelAr: 'الفوترة الذكية',
    desc: 'AI-generated SBS/ICD-10/DRG codes from clinical notes',
    descAr: 'رموز SBS/ICD-10/DRG مولدة من الملاحظات السريرية',
    endpoint: '/api/workflows/provider/smart-billing',
    buildPayload: (i) => ({ patient_id: i.patient_id, appointment_id: i.appt, provider_id: i.provider_id }),
    inputs: [
      { key: 'patient_id', label: 'Patient ID', labelAr: 'رقم المريض', placeholder: 'P001' },
      { key: 'appt', label: 'Appointment ID', labelAr: 'رقم الموعد', placeholder: 'APT-001' },
      { key: 'provider_id', label: 'Provider ID', labelAr: 'رقم المزود', placeholder: 'DR001' },
    ],
  },
  {
    id: 'cohort-outreach',
    icon: '📣',
    label: 'Cohort Outreach',
    labelAr: 'تواصل مجموعة المرضى',
    desc: 'AI-driven patient cohort identification & engagement campaigns',
    descAr: 'تحديد مجموعات المرضى وحملات التواصل الذكي',
    endpoint: '/api/workflows/provider/cohort-outreach',
    buildPayload: (i) => ({ condition: i.condition, provider_id: i.provider_id }),
    inputs: [
      { key: 'provider_id', label: 'Provider ID', labelAr: 'رقم المزود', placeholder: 'DR001' },
      { key: 'condition', label: 'Condition/ICD-10', labelAr: 'الحالة / ICD-10', placeholder: 'I10 (hypertension)' },
    ],
  },
  {
    id: 'prescription',
    icon: '💊',
    label: 'e-Prescription',
    labelAr: 'الوصفة الإلكترونية',
    desc: 'AI-assisted prescription generation with drug interactions check',
    descAr: 'وصفة طبية إلكترونية ذكية مع فحص التفاعلات الدوائية',
    endpoint: '/api/workflows/provider/prescription',
    buildPayload: (i) => ({ patient_id: i.patient_id, provider_id: i.provider_id, diagnosis: i.diagnosis }),
    inputs: [
      { key: 'patient_id', label: 'Patient ID', labelAr: 'رقم المريض', placeholder: 'P001' },
      { key: 'provider_id', label: 'Provider ID', labelAr: 'رقم المزود', placeholder: 'DR001' },
      { key: 'diagnosis', label: 'Diagnosis (ICD-10)', labelAr: 'التشخيص', placeholder: 'J06.9' },
    ],
  },
  {
    id: 'schedule',
    icon: '🗓️',
    label: 'Schedule Optimizer',
    labelAr: 'تحسين الجدول',
    desc: 'AI-optimized provider schedule with gap analysis',
    descAr: 'جدول مزودي الرعاية المُحسَّن بالذكاء الاصطناعي',
    endpoint: '/api/workflows/provider/schedule',
    buildPayload: (i) => ({ provider_id: i.provider_id }),
    inputs: [{ key: 'provider_id', label: 'Provider ID', labelAr: 'رقم المزود', placeholder: 'DR001' }],
  },
]

const PAYER_WORKFLOWS: WorkflowCard[] = [
  {
    id: 'adjudicate',
    icon: '⚖️',
    label: 'Claim Adjudication',
    labelAr: 'تسوية المطالبة',
    desc: 'AI-powered eligibility check + payment decision via NPHIES rules',
    descAr: 'تسوية ذكية للمطالبات عبر قواعد نظام NPHIES',
    endpoint: '/api/workflows/payer/adjudicate',
    buildPayload: (i) => ({ claim_id: i.claim_id }),
    inputs: [{ key: 'claim_id', label: 'Claim ID', labelAr: 'رقم المطالبة', placeholder: 'CLM-001' }],
  },
  {
    id: 'prior-auth',
    icon: '🔐',
    label: 'Prior Authorization',
    labelAr: 'الموافقة المسبقة',
    desc: 'Instant AI prior authorization with clinical guidelines',
    descAr: 'موافقة مسبقة فورية بالذكاء الاصطناعي',
    endpoint: '/api/workflows/payer/prior-auth',
    buildPayload: (i) => ({
      patient_id: i.patient_id, service_code: i.service, diagnosis_code: i.diag, urgency: i.urgency || 'routine',
    }),
    inputs: [
      { key: 'patient_id', label: 'Patient ID', labelAr: 'رقم المريض', placeholder: 'P001' },
      { key: 'service', label: 'Service Code', labelAr: 'رمز الخدمة', placeholder: '27447' },
      { key: 'diag', label: 'Diagnosis ICD-10', labelAr: 'التشخيص ICD-10', placeholder: 'M17.11' },
      { key: 'urgency', label: 'Urgency', labelAr: 'الاستعجال', placeholder: 'routine | urgent | emergency' },
    ],
  },
  {
    id: 'fwa-detect',
    icon: '🚨',
    label: 'FWA Detection',
    labelAr: 'كشف الاحتيال والمخالفات',
    desc: 'Statistical & AI fraud, waste, and abuse detection across claims',
    descAr: 'كشف الاحتيال والهدر والإساءة إحصائياً وبالذكاء الاصطناعي',
    endpoint: '/api/workflows/payer/fwa-detect',
    buildPayload: (i) => ({ provider_id: i.provider_id, analysis_window_days: parseInt(i.days) || 90 }),
    inputs: [
      { key: 'provider_id', label: 'Provider ID', labelAr: 'رقم المزود', placeholder: 'DR001' },
      { key: 'days', label: 'Analysis Window (days)', labelAr: 'نافذة التحليل (أيام)', placeholder: '90', type: 'number' },
    ],
  },
  {
    id: 'get-era',
    icon: '📄',
    label: 'ERA Generation',
    labelAr: 'إنشاء الإشعار الإلكتروني',
    desc: 'Generate Electronic Remittance Advice for processed claims',
    descAr: 'توليد إشعار التسوية الإلكتروني للمطالبات',
    endpoint: '/api/workflows/payer/get-era',
    buildPayload: (i) => ({ claim_id: i.claim_id }),
    inputs: [{ key: 'claim_id', label: 'Claim ID', labelAr: 'رقم المطالبة', placeholder: 'CLM-001' }],
  },
]

const GOVERNMENT_WORKFLOWS: WorkflowCard[] = [
  {
    id: 'surveillance',
    icon: '🌐',
    label: 'Disease Surveillance',
    labelAr: 'مراقبة الأمراض',
    desc: 'Real-time AI epidemic surveillance & spike detection',
    descAr: 'مراقبة وبائية آنية وكشف الارتفاعات الحادة',
    endpoint: '/api/workflows/government/surveillance',
    buildPayload: (i) => ({ condition: i.condition, region: i.region }),
    inputs: [
      { key: 'condition', label: 'Condition / ICD-10', labelAr: 'الحالة / ICD-10', placeholder: 'influenza' },
      { key: 'region', label: 'Region', labelAr: 'المنطقة', placeholder: 'Riyadh' },
    ],
  },
  {
    id: 'compliance-report',
    icon: '📑',
    label: 'Compliance Report',
    labelAr: 'تقرير الامتثال',
    desc: 'MOH-ready compliance XML + AI executive summary',
    descAr: 'تقرير امتثال XML للوزارة + ملخص تنفيذي ذكي',
    endpoint: '/api/workflows/government/compliance-report',
    buildPayload: (i) => ({ period_start: i.start, period_end: i.end }),
    inputs: [
      { key: 'start', label: 'Period Start', labelAr: 'بداية الفترة', placeholder: '2026-01-01', type: 'date' },
      { key: 'end', label: 'Period End', labelAr: 'نهاية الفترة', placeholder: '2026-03-31', type: 'date' },
    ],
  },
  {
    id: 'policy-analysis',
    icon: '📐',
    label: 'Policy Analysis',
    labelAr: 'تحليل السياسات',
    desc: 'AI analysis of health policies vs Vision 2030 KPIs',
    descAr: 'تحليل السياسات الصحية مقابل مؤشرات رؤية 2030',
    endpoint: '/api/workflows/government/policy-analysis',
    buildPayload: (i) => ({ policy_text: i.policy }),
    inputs: [{ key: 'policy', label: 'Policy Text', labelAr: 'نص السياسة', placeholder: 'Enter policy description...' }],
  },
  {
    id: 'kpi-dashboard',
    icon: '📈',
    label: 'KPI Dashboard',
    labelAr: 'لوحة مؤشرات الأداء',
    desc: 'MOH + Vision 2030 healthcare KPI aggregation & benchmarking',
    descAr: 'تجميع مؤشرات أداء الوزارة ورؤية 2030 والمقارنة المرجعية',
    endpoint: '/api/workflows/government/kpi-dashboard',
    buildPayload: (_i) => ({}),
    inputs: [],
  },
]

const TABS = [
  { id: 'patient', label: 'Patient', labelAr: 'المريض', icon: '🏥', color: 'blue', workflows: PATIENT_WORKFLOWS },
  { id: 'provider', label: 'Provider', labelAr: 'المزود', icon: '👨‍⚕️', color: 'emerald', workflows: PROVIDER_WORKFLOWS },
  { id: 'payer', label: 'Payer', labelAr: 'جهة الدفع', icon: '💰', color: 'violet', workflows: PAYER_WORKFLOWS },
  { id: 'government', label: 'Government', labelAr: 'الحكومة', icon: '🏛️', color: 'amber', workflows: GOVERNMENT_WORKFLOWS },
] as const

type TabId = (typeof TABS)[number]['id']

// ─── Workflow Card Component ──────────────────────────────────────────────────
function WorkflowCardUI({ card, color }: { card: WorkflowCard; color: string }) {
  const [inputs, setInputs] = useState<Record<string, string>>({})
  const [result, setResult] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)

  const borderColors: Record<string, string> = {
    blue: 'border-blue-200 hover:border-blue-400',
    emerald: 'border-emerald-200 hover:border-emerald-400',
    violet: 'border-violet-200 hover:border-violet-400',
    amber: 'border-amber-200 hover:border-amber-400',
  }
  const iconBg: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-700',
    emerald: 'bg-emerald-100 text-emerald-700',
    violet: 'bg-violet-100 text-violet-700',
    amber: 'bg-amber-100 text-amber-700',
  }
  const btnColors: Record<string, string> = {
    blue: 'bg-blue-700 hover:bg-blue-800',
    emerald: 'bg-emerald-700 hover:bg-emerald-800',
    violet: 'bg-violet-700 hover:bg-violet-800',
    amber: 'bg-amber-600 hover:bg-amber-700',
  }

  const handleRun = async () => {
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const payload = card.buildPayload(inputs)
      const res = await fetch(`${API}${card.endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      setResult(data)
      setExpanded(true)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`border-2 rounded-xl bg-white transition-all ${borderColors[color]} ${expanded ? 'col-span-2' : ''}`}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <span className={`text-2xl p-2 rounded-lg ${iconBg[color]}`}>{card.icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-sm" dir="ltr">{card.label}</h3>
            <p className="text-xs text-gray-500" dir="rtl">{card.labelAr}</p>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">{card.desc}</p>
          </div>
        </div>

        {/* Inputs */}
        {card.inputs.length > 0 && (
          <div className="space-y-2 mb-3">
            {card.inputs.map(inp => (
              <div key={inp.key}>
                <label className="block text-[10px] text-gray-500 mb-0.5">
                  {inp.label} <span className="text-gray-400">· {inp.labelAr}</span>
                </label>
                <input
                  type={inp.type || 'text'}
                  placeholder={inp.placeholder}
                  value={inputs[inp.key] || ''}
                  onChange={e => setInputs(prev => ({ ...prev, [inp.key]: e.target.value }))}
                  className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
                  dir="ltr"
                />
              </div>
            ))}
          </div>
        )}

        {/* Run button */}
        <button
          onClick={handleRun}
          disabled={loading}
          className={`w-full ${btnColors[color]} text-white text-xs py-2 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50`}
        >
          {loading ? (
            <>
              <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              جاري التنفيذ... Running...
            </>
          ) : (
            <>▶ Run · تشغيل</>
          )}
        </button>

        {/* Error */}
        {error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg text-[11px] text-red-700">{error}</div>
        )}
      </div>

      {/* Result panel */}
      {result && expanded && (
        <div className="border-t border-gray-100">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-b-xl">
            <span className="text-[10px] text-gray-500 font-mono">Result · النتيجة</span>
            <button
              onClick={() => setExpanded(false)}
              className="text-[10px] text-gray-400 hover:text-gray-600"
            >
              collapse ✕
            </button>
          </div>
          <div className="px-4 pb-4 max-h-64 overflow-y-auto">
            {typeof result === 'object' && result !== null && 'ai_summary' in (result as Record<string, unknown>) ? (
              <div className="mt-2 space-y-2">
                <div className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap bg-blue-50 p-3 rounded-lg">
                  {String((result as Record<string, unknown>).ai_summary)}
                </div>
                <details className="text-[10px]">
                  <summary className="cursor-pointer text-gray-400 hover:text-gray-600">Raw JSON</summary>
                  <pre className="mt-1 p-2 bg-gray-50 rounded text-gray-500 overflow-x-auto">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </details>
              </div>
            ) : (
              <pre className="mt-2 text-[10px] text-gray-600 bg-gray-50 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function WorkflowsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('patient')

  const tab = TABS.find(t => t.id === activeTab)!

  const tabActiveColors: Record<string, string> = {
    blue: 'bg-blue-700 text-white shadow-sm',
    emerald: 'bg-emerald-700 text-white shadow-sm',
    violet: 'bg-violet-700 text-white shadow-sm',
    amber: 'bg-amber-600 text-white shadow-sm',
  }

  return (
    <main className="min-h-screen bg-gray-50" dir="rtl">
      {/* Page header */}
      <div className="bg-gradient-to-l from-blue-900 via-blue-800 to-indigo-900 text-white py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-1">مركز سير العمل الذكي</h1>
          <p className="text-blue-200 text-sm" dir="ltr">HNH Workflow Orchestration Center · AI-Powered Healthcare Automation</p>
          <p className="text-blue-300 text-xs mt-2">
            تشغيل سير عمل الرعاية الصحية المدعومة بالذكاء الاصطناعي لجميع أصحاب المصلحة —
            المريض · المزود · جهة الدفع · الحكومة
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stakeholder Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition ${
                activeTab === t.id
                  ? tabActiveColors[t.color]
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
              }`}
            >
              <span>{t.icon}</span>
              <span dir="ltr">{t.label}</span>
              <span className="text-[11px] opacity-70">· {t.labelAr}</span>
            </button>
          ))}
        </div>

        {/* Tab description */}
        <div className="mb-6 flex items-center gap-3">
          <span className="text-3xl">{tab.icon}</span>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {tab.labelAr} <span className="text-gray-400 font-normal text-base" dir="ltr">· {tab.label} Workflows</span>
            </h2>
            <p className="text-xs text-gray-400">
              {tab.workflows.length} سير عمل متاح · {tab.workflows.length} workflows available
            </p>
          </div>
        </div>

        {/* Workflow grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {tab.workflows.map(wf => (
            <WorkflowCardUI key={wf.id} card={wf} color={tab.color} />
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-10 p-4 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-700 text-center">
          جميع سير العمل مدعومة بـ Llama 3.3 70B · NPHIES-compliant · رؤية 2030 aligned
          <span className="text-blue-400 mx-2">·</span>
          All workflows powered by Llama 3.3 70B · NPHIES-compliant · Vision 2030 aligned
        </div>
      </div>
    </main>
  )
}
