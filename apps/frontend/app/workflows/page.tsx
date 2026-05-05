'use client'

import { useMemo, useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'https://hnh.brainsait.org'

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

const PATIENT_WORKFLOWS: WorkflowCard[] = [
  {
    id: 'health-screening',
    icon: '🩺',
    label: 'Health Screening',
    labelAr: 'الفحص الصحي الذكي',
    desc: 'AI-powered health risk assessment based on patient profile and vitals.',
    descAr: 'تقييم مخاطر صحية مدعوم بالذكاء الاصطناعي وفق الملف الصحي والعلامات الحيوية.',
    endpoint: '/api/workflows/patient/health-screening',
    buildPayload: (i) => ({ patient_id: i.patient_id }),
    inputs: [{ key: 'patient_id', label: 'Patient ID', labelAr: 'رقم المريض', placeholder: 'P001' }],
  },
  {
    id: 'book-visit',
    icon: '📅',
    label: 'Book Visit',
    labelAr: 'حجز موعد',
    desc: 'Appointment booking with specialty matching and preferred scheduling.',
    descAr: 'حجز موعد مع مطابقة التخصص واختيار التاريخ المفضل.',
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
    desc: 'Generate a bilingual discharge summary and follow-up plan.',
    descAr: 'توليد ملخص خروج وخطة متابعة ثنائية اللغة.',
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
    desc: 'Explain lab results in plain language and flag critical values.',
    descAr: 'شرح نتائج المختبر بلغة مبسطة مع تمييز القيم الحرجة.',
    endpoint: '/api/workflows/patient/lab-results',
    buildPayload: (i) => ({ patient_id: i.patient_id }),
    inputs: [{ key: 'patient_id', label: 'Patient ID', labelAr: 'رقم المريض', placeholder: 'P001' }],
  },
  {
    id: 'patient-summary',
    icon: '📊',
    label: 'Patient Summary',
    labelAr: 'ملخص المريض',
    desc: 'Complete health summary including history, medications, and next care steps.',
    descAr: 'ملخص صحي شامل يتضمن التاريخ المرضي والأدوية والخطوات القادمة.',
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
    desc: 'Evidence-based diagnosis and treatment recommendations.',
    descAr: 'توصيات تشخيصية وعلاجية قائمة على الأدلة.',
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
    desc: 'Generate SBS, ICD-10, and DRG codes from encounter context.',
    descAr: 'إنشاء أكواد SBS و ICD-10 و DRG من سياق الزيارة.',
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
    labelAr: 'تواصل مجموعات المرضى',
    desc: 'Identify high-value patient cohorts and create outreach actions.',
    descAr: 'تحديد مجموعات المرضى ذات الأولوية وإنشاء إجراءات للتواصل معها.',
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
    desc: 'Generate prescriptions with basic interaction and safety checks.',
    descAr: 'إنشاء وصفات مع التحقق الأساسي من التفاعلات والسلامة.',
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
    desc: 'Optimize provider schedules, gaps, and operational load balancing.',
    descAr: 'تحسين جداول مقدمي الخدمة والفجوات والتوازن التشغيلي.',
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
    desc: 'Eligibility checks and payment decisions using payer logic.',
    descAr: 'فحص الأهلية واتخاذ قرار السداد باستخدام منطق جهة الدفع.',
    endpoint: '/api/workflows/payer/adjudicate',
    buildPayload: (i) => ({ claim_id: i.claim_id }),
    inputs: [{ key: 'claim_id', label: 'Claim ID', labelAr: 'رقم المطالبة', placeholder: 'CLM-001' }],
  },
  {
    id: 'prior-auth',
    icon: '🔐',
    label: 'Prior Authorization',
    labelAr: 'الموافقة المسبقة',
    desc: 'Instant authorization checks with urgency-aware routing.',
    descAr: 'فحص فوري للموافقة مع توجيه يعتمد على درجة الاستعجال.',
    endpoint: '/api/workflows/payer/prior-auth',
    buildPayload: (i) => ({ patient_id: i.patient_id, service_code: i.service, diagnosis_code: i.diag, urgency: i.urgency || 'routine' }),
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
    desc: 'Statistical and AI fraud, waste, and abuse analysis across claims.',
    descAr: 'تحليل إحصائي وذكي للاحتيال والهدر والإساءة عبر المطالبات.',
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
    desc: 'Generate electronic remittance advice for processed claims.',
    descAr: 'توليد إشعار التسوية الإلكتروني للمطالبات المعالجة.',
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
    desc: 'Realtime epidemic surveillance and spike detection.',
    descAr: 'مراقبة وبائية آنية وكشف الارتفاعات غير الطبيعية.',
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
    desc: 'Generate MOH-ready compliance outputs and executive summaries.',
    descAr: 'إنشاء مخرجات امتثال جاهزة للوزارة مع ملخصات تنفيذية.',
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
    desc: 'Analyze health policy ideas against quality, cost, and Vision 2030 KPIs.',
    descAr: 'تحليل السياسات الصحية مقابل الجودة والتكلفة ومؤشرات رؤية 2030.',
    endpoint: '/api/workflows/government/policy-analysis',
    buildPayload: (i) => ({ policy_text: i.policy }),
    inputs: [{ key: 'policy', label: 'Policy Text', labelAr: 'نص السياسة', placeholder: 'Enter policy description...' }],
  },
  {
    id: 'kpi-dashboard',
    icon: '📈',
    label: 'KPI Dashboard',
    labelAr: 'لوحة مؤشرات الأداء',
    desc: 'Aggregate MOH and Vision 2030 healthcare KPI indicators.',
    descAr: 'تجميع مؤشرات أداء وزارة الصحة ورؤية 2030 الصحية.',
    endpoint: '/api/workflows/government/kpi-dashboard',
    buildPayload: () => ({}),
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

function WorkflowCardUI({ card, color }: { card: WorkflowCard; color: string }) {
  const [inputs, setInputs] = useState<Record<string, string>>({})
  const [result, setResult] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expanded, setExpanded] = useState(false)

  const tones: Record<string, { soft: string; icon: string; button: string }> = {
    blue: { soft: '#dbeafe', icon: '#1d4ed8', button: 'var(--primary)' },
    emerald: { soft: '#d1fae5', icon: '#047857', button: '#047857' },
    violet: { soft: '#ede9fe', icon: '#6d28d9', button: '#6d28d9' },
    amber: { soft: '#fef3c7', icon: '#b45309', button: '#b45309' },
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
    <div className={`panel transition-all ${expanded ? 'xl:col-span-2' : ''}`}>
      <div className="p-5">
        <div className="mb-4 flex items-start gap-4">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl"
            style={{ backgroundColor: tones[color].soft, color: tones[color].icon }}
          >
            {card.icon}
          </span>
          <div className="flex-1 min-w-0">
            <div className="bilingual-label">
              <strong>{card.labelAr}</strong>
              <span>{card.label}</span>
            </div>
            <p className="mt-2 text-sm text-muted">{card.descAr}</p>
            <p className="text-xs text-muted">{card.desc}</p>
          </div>
        </div>

        {card.inputs.length > 0 && (
          <div className="mb-4 space-y-3">
            {card.inputs.map((inp) => (
              <div key={inp.key}>
                <label className="mb-1 block text-xs font-medium text-muted">
                  {inp.labelAr}
                  <span className="mx-1">·</span>
                  {inp.label}
                </label>
                <input
                  type={inp.type || 'text'}
                  placeholder={inp.placeholder}
                  value={inputs[inp.key] || ''}
                  onChange={(e) => setInputs((prev) => ({ ...prev, [inp.key]: e.target.value }))}
                  className="input-field text-sm"
                  dir="auto"
                />
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleRun}
          disabled={loading}
          className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
          style={{ backgroundColor: tones[color].button }}
        >
          {loading ? 'جاري التنفيذ... Running...' : 'تشغيل سير العمل · Run workflow'}
        </button>

        {error && (
          <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">{error}</div>
        )}
      </div>

      {result && expanded && (
        <div className="border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between px-5 py-3" style={{ backgroundColor: 'var(--surface-muted)' }}>
            <span className="text-xs font-semibold text-muted">النتيجة · Result</span>
            <button onClick={() => setExpanded(false)} className="text-xs text-muted">Collapse ✕</button>
          </div>
          <div className="max-h-80 overflow-y-auto px-5 pb-5 pt-4">
            {typeof result === 'object' && result !== null && 'ai_summary' in result ? (
              <div className="space-y-3">
                <div className="panel-soft p-4 text-sm leading-7">{String(result.ai_summary)}</div>
                <details className="text-xs text-muted">
                  <summary className="cursor-pointer">Raw JSON</summary>
                  <pre className="mt-2 overflow-x-auto rounded-xl p-3 text-[11px]" style={{ backgroundColor: 'var(--surface-muted)' }}>
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </details>
              </div>
            ) : (
              <pre className="overflow-x-auto rounded-xl p-4 text-[11px]" style={{ backgroundColor: 'var(--surface-muted)' }}>
                {JSON.stringify(result, null, 2)}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function WorkflowsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('patient')

  const tab = useMemo(() => TABS.find((item) => item.id === activeTab)!, [activeTab])

  return (
    <div className="space-y-6">
      <section className="panel-hero px-6 py-7 text-white md:px-8">
        <div className="subtle-grid" />
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="section-kicker border border-white/10 bg-white/10 text-white">Workflow Center</div>
            <h1 className="mt-4 text-3xl font-bold md:text-4xl">مركز سير العمل الذكي</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/80 md:text-base">
              تشغيل مسارات الرعاية الصحية المدعومة بالذكاء الاصطناعي للمريض، المزود، جهة الدفع، والجهات الحكومية
              من شاشة تنفيذ واحدة تربط الواجهات الخلفية بنتائج قابلة للمراجعة.
            </p>
          </div>
          <div className="status-pill border-white/10 bg-white/10 text-white">
            Llama 3.3 70B · NPHIES aligned · Vision 2030
          </div>
        </div>
      </section>

      <section className="panel p-5 md:p-6">
        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="section-kicker">Stakeholders</div>
            <h2 className="mt-3 text-xl font-bold">اختيار مسار التشغيل</h2>
            <p className="text-sm text-muted">Choose the stakeholder lane, fill the minimum fields, then run the workflow.</p>
          </div>
          <div className="text-sm text-muted">{tab.workflows.length} workflows available</div>
        </div>

        <div className="flex flex-wrap gap-2">
          {TABS.map((item) => {
            const active = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="rounded-full px-4 py-2 text-sm font-semibold"
                style={active
                  ? { backgroundColor: 'var(--primary)', color: 'white' }
                  : { backgroundColor: 'var(--surface-muted)', color: 'var(--text)', border: '1px solid var(--border)' }}
              >
                <div>{item.icon} {item.labelAr}</div>
                <div className="text-[11px] opacity-75">{item.label}</div>
              </button>
            )
          })}
        </div>
      </section>

      <section className="panel p-5 md:p-6">
        <div className="mb-5 flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: 'var(--surface-strong)' }}>
            <span className="text-2xl">{tab.icon}</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">{tab.labelAr}</h2>
            <p className="text-sm text-muted">{tab.label} workflows for the active operating context.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tab.workflows.map((wf) => (
            <WorkflowCardUI key={wf.id} card={wf} color={tab.color} />
          ))}
        </div>
      </section>
    </div>
  )
}
