'use client'

import { useEffect, useMemo, useState } from 'react'

interface IntegrationStatus {
  name: string
  nameAr: string
  status: 'connected' | 'warning' | 'degraded' | 'offline' | 'configured' | 'not_configured'
  icon: string
  description: string
  descriptionAr: string
}

interface Stats {
  total_patients: number
  today_appointments: number
  total_providers: number
  total_claims: number
  pending_claims: number
}

interface SystemHealth {
  oracle_bridge: string
  nphies_mirror: string
  claimlinc: string
  basma_portal: string
  sbs_portal: string
  givc_portal: { status: string; network_count: number }
}

interface Workflow {
  id: string
  icon: string
  titleEn: string
  titleAr: string
  descriptionEn: string
  descriptionAr: string
  promptEn: string
  promptAr: string
  color: string
  accentColor: string
}

const API = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'https://hnh.brainsait.org'

const PATIENT_WORKFLOWS: Workflow[] = [
  {
    id: 'proactive',
    icon: '🩺',
    titleEn: 'Proactive Health',
    titleAr: 'الصحة الاستباقية',
    descriptionEn: 'AI screening recommendations driven by patient risk and clinical history.',
    descriptionAr: 'توصيات فحص مدعومة بالذكاء الاصطناعي حسب عوامل الخطورة والتاريخ السريري.',
    promptEn: 'Basma, what screenings should this patient complete this quarter?',
    promptAr: 'بسمة، ما الفحوصات التي يجب على هذا المريض إكمالها هذا الربع؟',
    color: 'from-sky-500 via-cyan-500 to-blue-600',
    accentColor: 'text-sky-600',
  },
  {
    id: 'visit',
    icon: '📅',
    titleEn: 'Visit Orchestration',
    titleAr: 'تنسيق الزيارة',
    descriptionEn: 'Appointment booking, eligibility, reminders, and follow-up in one flow.',
    descriptionAr: 'حجز الموعد، التحقق من الأهلية، التذكير، والمتابعة ضمن رحلة واحدة.',
    promptEn: 'Book cardiology follow-up next week and verify eligibility.',
    promptAr: 'احجز متابعة قلب الأسبوع القادم وتحقق من الأهلية.',
    color: 'from-emerald-500 via-teal-500 to-cyan-600',
    accentColor: 'text-emerald-600',
  },
  {
    id: 'claims',
    icon: '💳',
    titleEn: 'Claims Tracking',
    titleAr: 'تتبع المطالبات',
    descriptionEn: 'Auto-submit claims, monitor approvals, and notify the patient instantly.',
    descriptionAr: 'إرسال المطالبات تلقائياً، ومتابعة الموافقات، وإشعار المريض فوراً.',
    promptEn: 'Submit the claim after discharge and notify me of the payment decision.',
    promptAr: 'قدّم المطالبة بعد الخروج وأبلغني بقرار السداد.',
    color: 'from-violet-500 via-purple-500 to-fuchsia-600',
    accentColor: 'text-violet-600',
  },
  {
    id: 'lab',
    icon: '🔬',
    titleEn: 'Lab Interpretation',
    titleAr: 'شرح نتائج المختبر',
    descriptionEn: 'Explain results in patient language with comparison to prior trends.',
    descriptionAr: 'شرح النتائج بلغة واضحة للمريض مع المقارنة بالنتائج السابقة.',
    promptEn: 'Explain the latest HbA1c and lipid profile in plain language.',
    promptAr: 'اشرح آخر نتائج HbA1c ودهون الدم بلغة مبسطة.',
    color: 'from-amber-500 via-orange-500 to-red-500',
    accentColor: 'text-amber-600',
  },
]

const PROVIDER_WORKFLOWS: Workflow[] = [
  {
    id: 'cds',
    icon: '🧠',
    titleEn: 'Clinical Decision Support',
    titleAr: 'دعم القرار السريري',
    descriptionEn: 'Analyze notes, vitals, and history to suggest safer next actions.',
    descriptionAr: 'تحليل الملاحظات والعلامات الحيوية والتاريخ المرضي لاقتراح الخطوات التالية.',
    promptEn: 'Analyze diabetic SOAP note and suggest medication adjustments.',
    promptAr: 'حلل ملاحظة مريض السكري واقترح تعديل العلاج.',
    color: 'from-rose-500 via-pink-500 to-red-500',
    accentColor: 'text-rose-600',
  },
  {
    id: 'billing',
    icon: '💰',
    titleEn: 'Smart Documentation',
    titleAr: 'التوثيق الذكي',
    descriptionEn: 'Generate SBS codes and cleaner billing outputs directly from encounters.',
    descriptionAr: 'إنشاء أكواد SBS ومخرجات فوترة أنظف مباشرة من تفاصيل الزيارة.',
    promptEn: 'Generate billing codes and validate payer readiness after consultation.',
    promptAr: 'أنشئ أكواد الفوترة وتحقق من جاهزية جهة الدفع بعد الاستشارة.',
    color: 'from-cyan-500 via-sky-500 to-blue-500',
    accentColor: 'text-cyan-600',
  },
  {
    id: 'ambient',
    icon: '🎤',
    titleEn: 'Ambient Voice',
    titleAr: 'الصوت البيئي',
    descriptionEn: 'Hands-free Arabic voice workflows for clinicians during care delivery.',
    descriptionAr: 'سير عمل صوتي بالعربية دون استخدام اليدين أثناء تقديم الرعاية.',
    promptEn: 'Show the latest results for the last admitted patient.',
    promptAr: 'اعرض آخر النتائج لآخر مريض تم تنويمه.',
    color: 'from-indigo-500 via-purple-500 to-violet-500',
    accentColor: 'text-indigo-600',
  },
  {
    id: 'cohort',
    icon: '👥',
    titleEn: 'Patient Cohorts',
    titleAr: 'مجموعات المرضى',
    descriptionEn: 'Identify patients due for outreach, screening, or chronic follow-up.',
    descriptionAr: 'تحديد المرضى المستحقين للتواصل أو الفحص أو المتابعة المزمنة.',
    promptEn: 'Find hypertensive patients missing a check-up for 6 months.',
    promptAr: 'ابحث عن مرضى الضغط الذين لم يراجعوا منذ 6 أشهر.',
    color: 'from-teal-500 via-emerald-500 to-green-500',
    accentColor: 'text-teal-600',
  },
]

const PAYER_WORKFLOWS: Workflow[] = [
  {
    id: 'adjudication',
    icon: '⚖️',
    titleEn: 'Auto Adjudication',
    titleAr: 'الفصل الآلي',
    descriptionEn: 'Realtime claims rules with payer-grade AI reasoning and auditability.',
    descriptionAr: 'قواعد مطالبات آنية مع استدلال ذكي وإمكانية تتبع ومراجعة القرار.',
    promptEn: 'Auto-adjudicate this claim against SBS mapping and NPHIES rules.',
    promptAr: 'افصل هذه المطالبة تلقائياً وفق خرائط SBS وقواعد نفيز.',
    color: 'from-slate-500 via-zinc-600 to-slate-700',
    accentColor: 'text-slate-600',
  },
  {
    id: 'priorauth',
    icon: '✅',
    titleEn: 'Prior Authorization',
    titleAr: 'الموافقة المسبقة',
    descriptionEn: 'Fast policy checks for routine, urgent, and emergency authorization decisions.',
    descriptionAr: 'فحص سريع للسياسات لقرارات الموافقة الروتينية والعاجلة والطارئة.',
    promptEn: 'Check MRI authorization against policy, deductible, and clinical criteria.',
    promptAr: 'تحقق من موافقة MRI مقابل السياسة والخصم والمعايير السريرية.',
    color: 'from-green-500 via-emerald-500 to-lime-500',
    accentColor: 'text-green-600',
  },
  {
    id: 'fwa',
    icon: '🔍',
    titleEn: 'FWA Detection',
    titleAr: 'كشف الاحتيال',
    descriptionEn: 'Statistical anomaly detection combined with AI pattern review.',
    descriptionAr: 'كشف الشذوذ الإحصائي مع مراجعة ذكية لأنماط الفوترة.',
    promptEn: 'Analyze this provider against peers for anomalous billing behavior.',
    promptAr: 'حلل هذا المزود مقارنة بنظرائه لاكتشاف أنماط الفوترة الشاذة.',
    color: 'from-red-500 via-orange-500 to-amber-500',
    accentColor: 'text-red-600',
  },
]

const GOVERNMENT_WORKFLOWS: Workflow[] = [
  {
    id: 'surveillance',
    icon: '📡',
    titleEn: 'Public Health Surveillance',
    titleAr: 'المراقبة الصحية العامة',
    descriptionEn: 'Detect spikes, clusters, and public health threats in near-realtime.',
    descriptionAr: 'اكتشاف الارتفاعات والتجمعات والتهديدات الصحية العامة شبه لحظياً.',
    promptEn: 'Monitor respiratory spikes in Riyadh emergency visits.',
    promptAr: 'راقب ارتفاع أمراض التنفس في زيارات الطوارئ بالرياض.',
    color: 'from-violet-500 via-purple-500 to-indigo-500',
    accentColor: 'text-violet-600',
  },
  {
    id: 'compliance',
    icon: '📊',
    titleEn: 'Compliance Reporting',
    titleAr: 'تقارير الامتثال',
    descriptionEn: 'Automated MOH quality reporting with structured submission outputs.',
    descriptionAr: 'تقارير جودة آلية لوزارة الصحة مع مخرجات جاهزة للتسليم.',
    promptEn: 'Generate a compliance package and prepare NPHIES-ready output.',
    promptAr: 'أنشئ حزمة امتثال وجهّز المخرجات الجاهزة لنفيز.',
    color: 'from-blue-500 via-indigo-500 to-blue-700',
    accentColor: 'text-blue-600',
  },
  {
    id: 'policy',
    icon: '📋',
    titleEn: 'Policy Support',
    titleAr: 'دعم السياسات',
    descriptionEn: 'Analyze cost, quality, and Vision 2030 impact across care programs.',
    descriptionAr: 'تحليل التكلفة والجودة وأثر البرامج الصحية على مؤشرات رؤية 2030.',
    promptEn: 'Assess diabetes program cost-effectiveness at kingdom scale.',
    promptAr: 'قيّم فعالية تكلفة برنامج السكري على مستوى المملكة.',
    color: 'from-amber-500 via-yellow-500 to-orange-500',
    accentColor: 'text-amber-600',
  },
]

export default function Home() {
  const [stats, setStats] = useState<Stats>({
    total_patients: 0,
    today_appointments: 0,
    total_providers: 0,
    total_claims: 0,
    pending_claims: 0,
  })
  const [integrations, setIntegrations] = useState<IntegrationStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'patient' | 'provider' | 'payer' | 'government'>('overview')

  const todayDate = useMemo(
    () => new Date().toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    []
  )

  useEffect(() => {
    void fetchDashboardData()
    const interval = setInterval(() => {
      void fetchDashboardData()
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchDashboardData = async () => {
    try {
      const healthRes = await fetch(`${API}/api/health`)
      const healthData = await healthRes.json()

      if (healthData.stats) {
        setStats({
          total_patients: healthData.stats.total_patients || 0,
          today_appointments: healthData.stats.today_appointments || 0,
          total_providers: healthData.stats.total_providers || 0,
          total_claims: healthData.stats.total_claims || 0,
          pending_claims: healthData.stats.pending_claims || 0,
        })
      }

      if (healthData.integrations) {
        const int = healthData.integrations
        setIntegrations([
          { name: 'Basma', nameAr: 'بسمة', status: int.basma_portal || 'offline', icon: '🤖', description: 'AI assistant', descriptionAr: 'المساعد الذكي' },
          { name: 'GIVC', nameAr: 'جيفك', status: int.givc_portal?.status || 'offline', icon: '🏥', description: 'Revenue cycle', descriptionAr: 'إدارة دورة الإيرادات' },
          { name: 'NPHIES', nameAr: 'نفيز', status: int.nphies_mirror || 'offline', icon: '🏛️', description: 'National exchange', descriptionAr: 'المنصة الوطنية' },
          { name: 'Oracle', nameAr: 'أوراكل', status: int.oracle_bridge || 'offline', icon: '☁️', description: 'Cloud infrastructure', descriptionAr: 'البنية السحابية' },
          { name: 'SBS', nameAr: 'SBS', status: int.sbs_portal || 'offline', icon: '💰', description: 'Billing system', descriptionAr: 'نظام الفوترة' },
          { name: 'ClaimLinc', nameAr: 'كلايم لينك', status: int.claimlinc || 'offline', icon: '📋', description: 'Claims processing', descriptionAr: 'معالجة المطالبات' },
        ])
      }

      setSystemHealth(healthData.integrations)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'configured':
        return 'bg-emerald-500'
      case 'degraded':
      case 'warning':
        return 'bg-amber-500'
      case 'offline':
      case 'not_configured':
        return 'bg-red-500'
      default:
        return 'bg-slate-400'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return 'Connected · متصل'
      case 'configured':
        return 'Configured · مهيأ'
      case 'degraded':
        return 'Degraded · متدهور'
      case 'warning':
        return 'Warning · تحذير'
      case 'offline':
        return 'Offline · غير متصل'
      case 'not_configured':
        return 'Not configured · غير مهيأ'
      default:
        return 'Unknown · غير معروف'
    }
  }

  const stakeholderTabs = [
    { id: 'overview', label: 'Overview', labelAr: 'نظرة تشغيلية عامة' },
    { id: 'patient', label: 'Patient', labelAr: 'رحلة المريض' },
    { id: 'provider', label: 'Provider', labelAr: 'أدوات مقدم الخدمة' },
    { id: 'payer', label: 'Payer', labelAr: 'عمليات جهة الدفع' },
    { id: 'government', label: 'Government', labelAr: 'الحوكمة والتنظيم' },
  ] as const

  const renderWorkflows = (workflows: Workflow[]) => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {workflows.map((workflow) => (
        <div key={workflow.id} className="panel p-5 group hover:-translate-y-0.5">
          <div className="flex items-start gap-4">
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${workflow.color} text-2xl text-white shadow-lg`}>
              {workflow.icon}
            </div>
            <div className="flex-1">
              <div className="bilingual-label">
                <strong className={workflow.accentColor}>{workflow.titleAr}</strong>
                <span>{workflow.titleEn}</span>
              </div>
              <p className="mt-2 text-sm text-muted">{workflow.descriptionAr}</p>
              <p className="text-xs text-muted">{workflow.descriptionEn}</p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-dashed p-3 text-xs leading-6 opacity-85" style={{ borderColor: 'var(--border-strong)', backgroundColor: 'var(--surface-muted)' }}>
            <div className="font-semibold">Prompt preview</div>
            <div className="mt-1 text-muted">{workflow.promptAr}</div>
            <div className="text-muted">{workflow.promptEn}</div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      <section className="panel-hero px-6 py-7 text-white md:px-8 md:py-8">
        <div className="subtle-grid" />
        <div className="relative z-10 grid gap-6 lg:grid-cols-[1.7fr_0.9fr] lg:items-end">
          <div>
            <div className="section-kicker border border-white/10 bg-white/10 text-white">Healthcare OS Live Control Center</div>
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">مركز التحكم الحي لمستشفى حيات الوطني</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/80 md:text-base">
              لوحة تشغيل موحدة تربط بسمة، المطالبات، الأهلية، البوابات، وأتمتة سير العمل السريري والمالي والحكومي
              في واجهة تشغيلية واحدة قابلة للمتابعة المباشرة.
            </p>
            <p className="text-sm text-white/60">Unified operational command surface for HNH clinical, financial, and regulatory workflows.</p>

            <div className="mt-5 flex flex-wrap gap-2 text-sm">
              {['Basma AI', 'GIVC', 'NPHIES', 'Oracle', 'SBS', 'ClaimLinc'].map((item) => (
                <span key={item} className="status-pill border-white/10 bg-white/10 text-white">{item}</span>
              ))}
            </div>
          </div>

          <div className="panel-soft p-5 text-slate-900 shadow-2xl dark:text-slate-100" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Realtime Snapshot</div>
                <div className="mt-2 text-sm font-semibold">{todayDate}</div>
                <div className="text-xs text-slate-500">AST · Auto-refresh every 30 seconds</div>
              </div>
              <div className="status-pill">
                <span className={`h-2.5 w-2.5 rounded-full ${loading ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                {loading ? 'Syncing' : 'Live'}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border p-3" style={{ borderColor: 'var(--border)' }}>
                <div className="text-xs text-muted">Patients</div>
                <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{loading ? '-' : stats.total_patients.toLocaleString()}</div>
              </div>
              <div className="rounded-2xl border p-3" style={{ borderColor: 'var(--border)' }}>
                <div className="text-xs text-muted">Providers</div>
                <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{loading ? '-' : stats.total_providers.toLocaleString()}</div>
              </div>
              <div className="rounded-2xl border p-3" style={{ borderColor: 'var(--border)' }}>
                <div className="text-xs text-muted">Claims</div>
                <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{loading ? '-' : stats.total_claims.toLocaleString()}</div>
              </div>
              <div className="rounded-2xl border p-3" style={{ borderColor: 'var(--border)' }}>
                <div className="text-xs text-muted">Pending</div>
                <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{loading ? '-' : stats.pending_claims.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="panel p-5 md:p-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="section-kicker">Network Status</div>
            <h3 className="mt-3 text-xl font-bold">طبقة التكامل المباشر</h3>
            <p className="text-sm text-muted">Operational status of core systems and the most critical hospital integrations.</p>
          </div>
          <div className="status-pill">
            <span className={`h-2.5 w-2.5 rounded-full ${loading ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
            {loading ? 'Connecting systems' : 'Systems responding'}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {integrations.map((integration) => (
            <div key={integration.name} className="panel-soft p-4 hover:-translate-y-0.5">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-2xl" style={{ backgroundColor: 'var(--surface-strong)' }}>
                  {integration.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="bilingual-label">
                      <strong>{integration.nameAr}</strong>
                      <span>{integration.name}</span>
                    </div>
                    <span className={`mt-1 h-3 w-3 rounded-full ${getStatusColor(integration.status)}`} />
                  </div>
                  <p className="mt-2 text-sm text-muted">{integration.descriptionAr}</p>
                  <p className="text-xs text-muted">{integration.description}</p>
                  <div className="mt-3 text-xs font-semibold">{getStatusText(integration.status)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="metric-card border-s-4 border-blue-500">
          <div className="text-2xl">👤</div>
          <div className="metric-value mt-4 text-blue-600">{loading ? '-' : stats.total_patients.toLocaleString()}</div>
          <div className="mt-3 bilingual-label"><strong>المرضى</strong><span>Patients</span></div>
        </div>
        <div className="metric-card border-s-4 border-emerald-500">
          <div className="text-2xl">📅</div>
          <div className="metric-value mt-4 text-emerald-600">{loading ? '-' : stats.today_appointments}</div>
          <div className="mt-3 bilingual-label"><strong>مواعيد اليوم</strong><span>Today's appointments</span></div>
        </div>
        <div className="metric-card border-s-4 border-violet-500">
          <div className="text-2xl">👨‍⚕️</div>
          <div className="metric-value mt-4 text-violet-600">{loading ? '-' : stats.total_providers}</div>
          <div className="mt-3 bilingual-label"><strong>مقدمو الخدمة</strong><span>Providers</span></div>
        </div>
        <div className="metric-card border-s-4 border-amber-500">
          <div className="text-2xl">📋</div>
          <div className="metric-value mt-4 text-amber-600">{loading ? '-' : stats.total_claims}</div>
          <div className="mt-3 bilingual-label"><strong>إجمالي المطالبات</strong><span>Total claims</span></div>
        </div>
        <div className="metric-card border-s-4 border-rose-500">
          <div className="text-2xl">⏳</div>
          <div className="metric-value mt-4 text-rose-600">{loading ? '-' : stats.pending_claims}</div>
          <div className="mt-3 bilingual-label"><strong>قيد الانتظار</strong><span>Pending decisions</span></div>
        </div>
      </section>

      <section className="panel p-5 md:p-6">
        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="section-kicker">Stakeholder Journeys</div>
            <h3 className="mt-3 text-2xl font-bold">واجهات العمل حسب أصحاب المصلحة</h3>
            <p className="text-sm text-muted">Switch between overview, patient, provider, payer, and regulatory command surfaces.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {stakeholderTabs.map((tab) => {
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="rounded-full px-4 py-2 text-sm font-semibold"
                  style={active
                    ? { backgroundColor: 'var(--primary)', color: 'white' }
                    : { backgroundColor: 'var(--surface-muted)', color: 'var(--text)', border: '1px solid var(--border)' }}
                >
                  <div>{tab.labelAr}</div>
                  <div className="text-[11px] opacity-75">{tab.label}</div>
                </button>
              )
            })}
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="panel-soft p-5">
              <h4 className="text-xl font-bold">Command overview</h4>
              <p className="mt-2 text-sm leading-7 text-muted">
                This operating system connects hospital operations, clinical intelligence, revenue cycle, payer workflows,
                and regulatory reporting in one bilingual control surface. The main UI priority is fast interpretation,
                clear status language, and fewer visual dead ends.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
                {[
                  { href: '/portal', icon: '🌐', ar: 'المركز الموحد', en: 'Unified hub' },
                  { href: '/appointments', icon: '📅', ar: 'إدارة المواعيد', en: 'Appointments' },
                  { href: '/eligibility', icon: '✅', ar: 'التحقق من الأهلية', en: 'Eligibility' },
                  { href: '/patients', icon: '👤', ar: 'ملفات المرضى', en: 'Patients' },
                  { href: '/integrations', icon: '🔗', ar: 'خريطة التكامل', en: 'Integrations' },
                  { href: '/workflows', icon: '⚙️', ar: 'سير العمل', en: 'Workflow center' },
                ].map((action) => (
                  <a key={action.href} href={action.href} className="panel-soft p-4 text-center hover:-translate-y-0.5">
                    <div className="text-3xl">{action.icon}</div>
                    <div className="mt-3 font-semibold">{action.ar}</div>
                    <div className="text-xs text-muted">{action.en}</div>
                  </a>
                ))}
              </div>
            </div>

            <div className="panel-soft p-5">
              <h4 className="text-lg font-bold">Branch network</h4>
              <div className="mt-4 space-y-3">
                {[
                  { id: 'R001', name: 'الرياض', nameEn: 'Riyadh', beds: 300, depts: 24 },
                  { id: 'J001', name: 'جازان', nameEn: 'Jazan', beds: 150, depts: 13 },
                  { id: 'K001', name: 'خميس مشيط', nameEn: 'Khamis Mushait', beds: 180, depts: 20 },
                  { id: 'M001', name: 'المدينة المنورة', nameEn: 'Madinah', beds: 200, depts: 16 },
                  { id: 'U001', name: 'عنيزة', nameEn: 'Unayzah', beds: 120, depts: 14 },
                ].map((branch) => (
                  <div key={branch.id} className="flex items-center justify-between rounded-2xl border p-3" style={{ borderColor: 'var(--border)' }}>
                    <div className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full bg-emerald-500" />
                      <div className="bilingual-label">
                        <strong>{branch.name}</strong>
                        <span>{branch.nameEn}</span>
                      </div>
                    </div>
                    <div className="text-end text-xs text-muted">
                      <div>{branch.beds} سرير</div>
                      <div>{branch.depts} departments</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'patient' && renderWorkflows(PATIENT_WORKFLOWS)}
        {activeTab === 'provider' && renderWorkflows(PROVIDER_WORKFLOWS)}
        {activeTab === 'payer' && renderWorkflows(PAYER_WORKFLOWS)}
        {activeTab === 'government' && renderWorkflows(GOVERNMENT_WORKFLOWS)}
      </section>

      <section className="panel p-5 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 text-4xl text-white shadow-lg">
              🤖
            </div>
            <div>
              <h3 className="text-xl font-bold">بسمة | Basma AI assistant</h3>
              <p className="text-sm text-muted">Voice-ready bilingual assistant for scheduling, screening, claims, and clinical support.</p>
            </div>
          </div>
          <a href="/workflows" className="btn-primary text-center">Open workflow center</a>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            'حجز موعد ومطابقة التخصص المناسب',
            'فهم نتائج المختبر بلغة أوضح للمريض',
            'تشغيل مسارات الذكاء الاصطناعي السريرية والإدارية',
          ].map((item) => (
            <div key={item} className="panel-soft p-4 text-sm text-muted">{item}</div>
          ))}
        </div>

        {systemHealth?.givc_portal?.network_count !== undefined && (
          <div className="mt-5 rounded-2xl border p-4 text-sm" style={{ borderColor: 'var(--border)' }}>
            <strong>GIVC network</strong>
            <span className="mx-2 text-muted">·</span>
            <span className="text-muted">{systemHealth.givc_portal.network_count} active providers currently visible in the connected network.</span>
          </div>
        )}
      </section>
    </div>
  )
}
