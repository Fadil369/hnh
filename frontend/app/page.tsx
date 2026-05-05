'use client'

import { useState, useEffect } from 'react'

interface IntegrationStatus {
  name: string
  nameAr: string
  status: 'connected' | 'warning' | 'degraded' | 'offline'
  icon: string
  description: string
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

export default function Home() {
  const [stats, setStats] = useState<Stats>({
    total_patients: 0,
    today_appointments: 0,
    total_providers: 0,
    total_claims: 0,
    pending_claims: 0
  })
  const [integrations, setIntegrations] = useState<IntegrationStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'patient' | 'provider' | 'payer' | 'government'>('overview')

  const [todayDate] = useState(() => new Date().toLocaleDateString('ar-SA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }))

  useEffect(() => {
    fetchDashboardData()
    const interval = setInterval(fetchDashboardData, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchDashboardData = async () => {
    try {
      const healthRes = await fetch(`${process.env.API_URL}/api/health`)
      const healthData = await healthRes.json()

      if (healthData.stats) {
        setStats({
          total_patients: healthData.stats.total_patients || 0,
          today_appointments: healthData.stats.today_appointments || 0,
          total_providers: healthData.stats.total_providers || 0,
          total_claims: healthData.stats.total_claims || 0,
          pending_claims: healthData.stats.pending_claims || 0
        })
      }

      if (healthData.integrations) {
        const int = healthData.integrations
        setIntegrations([
          { name: 'Basma', nameAr: 'بسمة', status: int.basma_portal || 'offline', icon: '🤖', description: 'AI Assistant' },
          { name: 'GIVC', nameAr: 'جيفك', status: int.givc_portal?.status || 'offline', icon: '🏥', description: 'Revenue Cycle' },
          { name: 'NPHIES', nameAr: 'نفيز', status: int.nphies_mirror || 'offline', icon: '🏛️', description: 'National Platform' },
          { name: 'Oracle', nameAr: 'أوراكل', status: int.oracle_bridge || 'offline', icon: '☁️', description: 'Cloud Infrastructure' },
          { name: 'SBS', nameAr: 'الأساسية', status: int.sbs_portal || 'offline', icon: '💰', description: 'Billing System' },
          { name: 'ClaimLinc', nameAr: 'كلايم لينك', status: int.claimlinc || 'offline', icon: '📋', description: 'Claims Processing' }
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
      case 'connected': return 'bg-emerald-500'
      case 'degraded': return 'bg-amber-500'
      case 'warning': return 'bg-amber-500'
      case 'offline': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string, isArabic: boolean) => {
    switch (status) {
      case 'connected': return isArabic ? 'متصل' : 'Connected'
      case 'degraded': return isArabic ? 'متدهور' : 'Degraded'
      case 'warning': return isArabic ? 'تحذير' : 'Warning'
      case 'offline': return isArabic ? 'غير متصل' : 'Offline'
      default: return isArabic ? 'غير معروف' : 'Unknown'
    }
  }

  const patientWorkflows: Workflow[] = [
    {
      id: 'proactive',
      icon: '🩺',
      titleEn: 'Proactive Health',
      titleAr: 'الصحة الاستباقية',
      descriptionEn: 'AI-powered health screening recommendations',
      descriptionAr: 'توصيات الفحص الصحي المدعومة بالذكاء الاصطناعي',
      promptEn: 'Basma, what health screenings do I need based on my age and medical history?',
      promptAr: 'بسمة، ما الفحوصات الصحية التي أحتاجها بناءً على عمري وتاريخي الطبي؟',
      color: 'from-blue-500 to-cyan-500',
      accentColor: 'text-blue-600'
    },
    {
      id: 'visit',
      icon: '📅',
      titleEn: 'Visit Orchestration',
      titleAr: 'تنظيم الزيارة',
      descriptionEn: 'End-to-end appointment booking with eligibility',
      descriptionAr: 'حجز المواعيد من البداية إلى النهاية مع التحقق من الأهلية',
      promptEn: 'Basma, I need a follow-up with my cardiologist. Check eligibility and book.',
      promptAr: 'بسمة، أحتاج متابعة مع طبيب القلب. تحقق من أهليتي واحجز.',
      color: 'from-emerald-500 to-teal-500',
      accentColor: 'text-emerald-600'
    },
    {
      id: 'claims',
      icon: '💳',
      titleEn: 'Claims Tracking',
      titleAr: 'تتبع المطالبات',
      descriptionEn: 'Auto-submit claims and track status',
      descriptionAr: 'تقديم المطالبات تلقائياً وتتبع حالتها',
      promptEn: 'After my visit, submit claim and notify me of approval or balance.',
      promptAr: 'بعد الزيارة، قدم المطالب وأخبرني بالموافقة أو الرصيد.',
      color: 'from-purple-500 to-violet-500',
      accentColor: 'text-purple-600'
    },
    {
      id: 'lab',
      icon: '🔬',
      titleEn: 'Lab Results',
      titleAr: 'نتائج المختبر',
      descriptionEn: 'Plain English explanation with trends',
      descriptionAr: 'شرح بلغة بسيطة مع اتجاهات النتائج',
      promptEn: 'Explain my latest lab results in plain English and compare to previous.',
      promptAr: 'شرح نتائج المختبر الأخيرة بلغة بسيطة وقارن بالنتائج السابقة.',
      color: 'from-amber-500 to-orange-500',
      accentColor: 'text-amber-600'
    }
  ]

  const providerWorkflows: Workflow[] = [
    {
      id: 'cds',
      icon: '🧠',
      titleEn: 'Clinical Decision Support',
      titleAr: 'دعم القرار السريري',
      descriptionEn: 'AI analysis of SOAP notes with recommendations',
      descriptionAr: 'تحليل ملاحظات SOAP بالذكاء الاصطناعي مع التوصيات',
      promptEn: 'Analyze diabetic patient notes and suggest medication adjustments.',
      promptAr: 'تحليل ملاحظات مريض السكري واقتراح تعديلات العلاج.',
      color: 'from-rose-500 to-pink-500',
      accentColor: 'text-rose-600'
    },
    {
      id: 'billing',
      icon: '💰',
      titleEn: 'Smart Documentation',
      titleAr: 'التوثيق الذكي',
      descriptionEn: 'Auto-generate SBS codes and submit clean claims',
      descriptionAr: 'إنشاء أكواد SBS تلقائياً وتقديم مطالبات نظيفة',
      promptEn: 'After consultation, generate billing codes and verify eligibility.',
      promptAr: 'بعد الاستشارة، أنشئ أكواد الفوترة وتحقق من الأهلية.',
      color: 'from-cyan-500 to-blue-500',
      accentColor: 'text-cyan-600'
    },
    {
      id: 'ambient',
      icon: '🎤',
      titleEn: 'Ambient Voice',
      titleAr: 'الصوت البيئي',
      descriptionEn: 'Voice commands in Arabic dialect',
      descriptionAr: 'أوامر صوتية باللهجة العربية',
      promptEn: 'عرض نتائج المختبر للمريض الأخير',
      promptAr: 'Show lab results for the last patient',
      color: 'from-indigo-500 to-purple-500',
      accentColor: 'text-indigo-600'
    },
    {
      id: 'cohort',
      icon: '👥',
      titleEn: 'Patient Cohorts',
      titleAr: 'مجموعات المرضى',
      descriptionEn: 'Identify and outreach to at-risk patients',
      descriptionAr: 'تحديد المرضى المعرضين للخطر والتواصل معهم',
      promptEn: 'Find all hypertension patients without check-up in 6 months.',
      promptAr: 'ابحث عن مرضى ارتفاع ضغط الدم دون فحص خلال 6 أشهر.',
      color: 'from-teal-500 to-emerald-500',
      accentColor: 'text-teal-600'
    }
  ]

  const payerWorkflows: Workflow[] = [
    {
      id: 'adjudication',
      icon: '⚖️',
      titleEn: 'Auto Adjudication',
      titleAr: 'الفصل الآلي',
      descriptionEn: 'Real-time automated claims processing',
      descriptionAr: 'معالجة المطالبات الآلية في الوقت الفعلي',
      promptEn: 'Auto-adjudicate this claim against SBS mapping rules.',
      promptAr: 'فصل هذه المطالبة تلقائياً وفق قواعد خريطة SBS.',
      color: 'from-slate-500 to-zinc-500',
      accentColor: 'text-slate-600'
    },
    {
      id: 'priorauth',
      icon: '✅',
      titleEn: 'Prior Authorization',
      titleAr: 'الترخيص المسبق',
      descriptionEn: 'Instant approval or clinical routing',
      descriptionAr: 'موافقة فورية أو تحويل للمراجعة السريرية',
      promptEn: 'Check MRI prior auth against policy, deductibles, guidelines.',
      promptAr: 'تحقق من ترخيص MRI المسبق مقابل السياسة والخصومات.',
      color: 'from-green-500 to-emerald-500',
      accentColor: 'text-green-600'
    },
    {
      id: 'fwa',
      icon: '🔍',
      titleEn: 'FWA Detection',
      titleAr: 'كشف الاحتيال',
      descriptionEn: 'Anomalous billing pattern detection',
      descriptionAr: 'كشف أنماط الفوترة غير الطبيعية',
      promptEn: 'Analyze claims for anomalous billing vs regional peers.',
      promptAr: 'تحليل المطالبات للبحث عن فوترة غير طبيعية مقارنة بالمنطقة.',
      color: 'from-red-500 to-orange-500',
      accentColor: 'text-red-600'
    }
  ]

  const governmentWorkflows: Workflow[] = [
    {
      id: 'surveillance',
      icon: '📡',
      titleEn: 'Public Health',
      titleAr: 'الصحة العامة',
      descriptionEn: 'Real-time disease outbreak detection',
      descriptionAr: 'اكتشاف تفشي الأمراض في الوقت الفعلي',
      promptEn: 'Monitor ER visits for respiratory illness spikes in Riyadh.',
      promptAr: 'مراقبة زيارات الطوارئ لأمراض التنفس في الرياض.',
      color: 'from-violet-500 to-purple-500',
      accentColor: 'text-violet-600'
    },
    {
      id: 'compliance',
      icon: '📊',
      titleEn: 'Compliance Reporting',
      titleAr: 'تقارير الامتثال',
      descriptionEn: 'Automated MOH quality reports',
      descriptionAr: 'تقارير الجودة الآلية لوزارة الصحة',
      promptEn: 'Generate MOH compliance report and submit via NPHIES.',
      promptAr: 'إنشاء تقرير الامتثال وتقديمه عبر نفيز.',
      color: 'from-blue-500 to-indigo-500',
      accentColor: 'text-blue-600'
    },
    {
      id: 'policy',
      icon: '📋',
      titleEn: 'Policy Support',
      titleAr: 'دعم السياسات',
      descriptionEn: 'Data-driven healthcare policy analysis',
      descriptionAr: 'تحليل سياسات الرعاية الصحية المبني على البيانات',
      promptEn: 'Analyze diabetes program cost-effectiveness for Kingdom.',
      promptAr: 'تحليل فعالية برامج السكري على مستوى المملكة.',
      color: 'from-amber-500 to-yellow-500',
      accentColor: 'text-amber-600'
    }
  ]

  const renderWorkflows = (workflows: Workflow[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {workflows.map((workflow) => (
        <div
          key={workflow.id}
          className="card p-4 hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-start gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-gradient-to-br ${workflow.color} text-white`}>
              {workflow.icon}
            </div>
            <div className="flex-1">
              <h4 className={`font-bold ${workflow.accentColor}`}>
                <span className="ltr:hidden">{workflow.titleAr}</span>
                <span className="hidden ltr:inline">{workflow.titleEn}</span>
              </h4>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                <span className="ltr:hidden">{workflow.descriptionAr}</span>
                <span className="hidden ltr:inline">{workflow.descriptionEn}</span>
              </p>
            </div>
          </div>
          <div className="mt-3 p-2 rounded-lg bg-[var(--border)] text-xs font-mono text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="ltr:hidden">{workflow.promptAr}</span>
            <span className="hidden ltr:inline">{workflow.promptEn}</span>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Hero - Live Control Center */}
      <div className="card p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border-0 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Live Control Center
              </span>
              <span className="text-xs opacity-60">HNH BrainSAIT Healthcare OS v9.1</span>
            </div>
            <h2 className="text-3xl font-bold mb-1">مستشفى حيات الوطني - نظام التشغيل</h2>
            <p className="text-lg opacity-90">HNH Operating System · Healthcare Intelligence Platform</p>
            <div className="flex flex-wrap gap-3 mt-3 text-sm">
              <span className="px-2 py-1 bg-white/10 rounded flex items-center gap-1">
                <span>🤖</span> Basma AI
              </span>
              <span className="px-2 py-1 bg-white/10 rounded flex items-center gap-1">
                <span>🏥</span> GIVC
              </span>
              <span className="px-2 py-1 bg-white/10 rounded flex items-center gap-1">
                <span>🏛️</span> NPHIES
              </span>
              <span className="px-2 py-1 bg-white/10 rounded flex items-center gap-1">
                <span>☁️</span> Oracle
              </span>
              <span className="px-2 py-1 bg-white/10 rounded flex items-center gap-1">
                <span>💰</span> SBS
              </span>
              <span className="px-2 py-1 bg-white/10 rounded flex items-center gap-1">
                <span>📋</span> ClaimLinc
              </span>
            </div>
          </div>
          <div className="text-left ltr:text-right" dir="ltr">
            <p className="text-sm opacity-80">{todayDate}</p>
            <p className="text-xs opacity-60 mt-1">System Time: AST</p>
          </div>
        </div>
      </div>

      {/* Integration Status Bar */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold flex items-center gap-2">
            <span className="text-lg">🔗</span>
            <span>System Integrations</span>
            <span className="text-sm font-normal text-[var(--text-secondary)]">حالة التكامل</span>
          </h3>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${loading ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`}></span>
            <span className="text-sm text-[var(--text-secondary)]">
              {loading ? 'Connecting...' : 'Live'}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {integrations.map((integration, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{integration.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{integration.name}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{integration.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className={`w-2 h-2 rounded-full ${getStatusColor(integration.status)}`}></span>
                <span className="text-xs font-medium">
                  {getStatusText(integration.status, false)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="card p-4 text-center border-l-4 border-l-blue-500">
          <div className="text-2xl mb-1">👤</div>
          <div className="text-3xl font-bold text-blue-600">
            {loading ? '-' : stats.total_patients.toLocaleString()}
          </div>
          <div className="text-xs mt-1 text-[var(--text-secondary)]">
            <div>المرضى</div>
            <div className="opacity-60">Patients</div>
          </div>
        </div>
        <div className="card p-4 text-center border-l-4 border-l-emerald-500">
          <div className="text-2xl mb-1">📅</div>
          <div className="text-3xl font-bold text-emerald-600">
            {loading ? '-' : stats.today_appointments}
          </div>
          <div className="text-xs mt-1 text-[var(--text-secondary)]">
            <div>مواعيد اليوم</div>
            <div className="opacity-60">Today&apos;s Appts</div>
          </div>
        </div>
        <div className="card p-4 text-center border-l-4 border-l-purple-500">
          <div className="text-2xl mb-1">👨‍⚕️</div>
          <div className="text-3xl font-bold text-purple-600">
            {loading ? '-' : stats.total_providers}
          </div>
          <div className="text-xs mt-1 text-[var(--text-secondary)]">
            <div>الأطباء</div>
            <div className="opacity-60">Providers</div>
          </div>
        </div>
        <div className="card p-4 text-center border-l-4 border-l-amber-500">
          <div className="text-2xl mb-1">📋</div>
          <div className="text-3xl font-bold text-amber-600">
            {loading ? '-' : stats.total_claims}
          </div>
          <div className="text-xs mt-1 text-[var(--text-secondary)]">
            <div>المطالبات</div>
            <div className="opacity-60">Total Claims</div>
          </div>
        </div>
        <div className="card p-4 text-center border-l-4 border-l-rose-500">
          <div className="text-2xl mb-1">⏳</div>
          <div className="text-3xl font-bold text-rose-600">
            {loading ? '-' : stats.pending_claims}
          </div>
          <div className="text-xs mt-1 text-[var(--text-secondary)]">
            <div>قيد الانتظار</div>
            <div className="opacity-60">Pending</div>
          </div>
        </div>
      </div>

      {/* Workflow Tabs */}
      <div className="card p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--border)] hover:bg-[var(--primary)]/10'
            }`}
          >
            <span className="ltr:hidden">نظرة عامة</span>
            <span className="hidden ltr:inline">Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('patient')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'patient'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                : 'bg-[var(--border)] hover:bg-blue-500/10'
            }`}
          >
            <span className="ltr:hidden">👤 المريض</span>
            <span className="hidden ltr:inline">👤 Patient</span>
          </button>
          <button
            onClick={() => setActiveTab('provider')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'provider'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                : 'bg-[var(--border)] hover:bg-emerald-500/10'
            }`}
          >
            <span className="ltr:hidden">👨‍⚕️ الطبيب</span>
            <span className="hidden ltr:inline">👨‍⚕️ Provider</span>
          </button>
          <button
            onClick={() => setActiveTab('payer')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'payer'
                ? 'bg-gradient-to-r from-purple-500 to-violet-500 text-white'
                : 'bg-[var(--border)] hover:bg-purple-500/10'
            }`}
          >
            <span className="ltr:hidden">🏛️ شركة التأمين</span>
            <span className="hidden ltr:inline">🏛️ Payer</span>
          </button>
          <button
            onClick={() => setActiveTab('government')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'government'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                : 'bg-[var(--border)] hover:bg-amber-500/10'
            }`}
          >
            <span className="ltr:hidden">🏢 الحكومة</span>
            <span className="hidden ltr:inline">🏢 Government</span>
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🏥</div>
              <h3 className="text-2xl font-bold mb-2">HNH BrainSAIT Healthcare OS</h3>
              <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                The HNH Operating System is a cutting-edge digital platform powering Al Hayat National Hospitals.
                It connects multiple critical healthcare systems including Basma AI, GIVC, NPHIES, Oracle, SBS, and ClaimLinc.
              </p>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-9 gap-3">
              {[
                { href: '/portal', icon: '🌐', labelAr: 'المركز الموحد', labelEn: 'Unified Hub' },
                { href: '/appointments', icon: '📅', labelAr: 'حجز موعد', labelEn: 'Book Appt' },
                { href: '/eligibility', icon: '✅', labelAr: 'الأهلية', labelEn: 'Eligibility' },
                { href: '/patients', icon: '👤', labelAr: 'المرضى', labelEn: 'Patients' },
                { href: '/givc', icon: '🩺', labelAr: 'GIVC', labelEn: 'Provider' },
                { href: '/sbs', icon: '💰', labelAr: 'SBS', labelEn: 'Billing' },
                { href: '/nphies', icon: '🏛️', labelAr: 'NPHIES', labelEn: 'Gov' },
                { href: '/claims', icon: '📋', labelAr: 'مطالبات', labelEn: 'Claims' },
                { href: '/knowledge', icon: '📚', labelAr: 'قاعدة المعرفة', labelEn: 'Knowledge' },
              ].map((action, i) => (
                <a
                  key={i}
                  href={action.href}
                  className="p-4 rounded-xl text-center transition-all hover:scale-[1.02] bg-[var(--border)] hover:bg-[var(--primary)]/10"
                >
                  <div className="text-3xl mb-2">{action.icon}</div>
                  <div className="font-bold text-sm">
                    <span className="ltr:hidden">{action.labelAr}</span>
                    <span className="hidden ltr:inline">{action.labelEn}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'patient' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">👤</span>
              <div>
                <h3 className="text-xl font-bold">Patient Workflows</h3>
                <p className="text-[var(--text-secondary)]">مسارات المريض</p>
              </div>
            </div>
            {renderWorkflows(patientWorkflows)}
          </div>
        )}

        {activeTab === 'provider' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">👨‍⚕️</span>
              <div>
                <h3 className="text-xl font-bold">Provider Workflows</h3>
                <p className="text-[var(--text-secondary)]">مسارات مقدم الخدمة</p>
              </div>
            </div>
            {renderWorkflows(providerWorkflows)}
          </div>
        )}

        {activeTab === 'payer' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🏛️</span>
              <div>
                <h3 className="text-xl font-bold">Payer Workflows</h3>
                <p className="text-[var(--text-secondary)]">مسارات شركة التأمين</p>
              </div>
            </div>
            {renderWorkflows(payerWorkflows)}
          </div>
        )}

        {activeTab === 'government' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🏢</span>
              <div>
                <h3 className="text-xl font-bold">Government & Regulatory</h3>
                <p className="text-[var(--text-secondary)]">مسارات الحكومة والجهات التنظيمية</p>
              </div>
            </div>
            {renderWorkflows(governmentWorkflows)}
          </div>
        )}
      </div>

      {/* Branch Quick Access */}
      <div className="card p-6">
        <h3 className="text-xl font-bold mb-4">
          <span>فروع المستشفى</span>
          <span className="text-sm font-normal mr-2 text-[var(--text-secondary)]">Hospital Branches</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { id: 'R001', name: 'الرياض', nameEn: 'Riyadh', beds: 300, depts: 24 },
            { id: 'J001', name: 'جازان', nameEn: 'Jazan', beds: 150, depts: 13 },
            { id: 'K001', name: 'خميس مشيط', nameEn: 'Khamis', beds: 180, depts: 20 },
            { id: 'M001', name: 'المدينة المنورة', nameEn: 'Madinah', beds: 200, depts: 16 },
            { id: 'U001', name: 'عنيزة', nameEn: 'Unayzah', beds: 120, depts: 14 }
          ].map((branch) => (
            <div
              key={branch.id}
              className="p-4 rounded-xl border border-[var(--border)] hover:border-[var(--primary)] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
                <span className="font-bold">
                  <span className="ltr:hidden">{branch.name}</span>
                  <span className="hidden ltr:inline">{branch.nameEn}</span>
                </span>
              </div>
              <div className="text-sm text-[var(--text-secondary)]">
                <span className="ltr:hidden">{branch.beds} سرير · {branch.depts} قسم</span>
                <span className="hidden ltr:inline">{branch.beds} beds · {branch.depts} depts</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Basma AI Assistant Banner */}
      <div className="card p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl">
              🤖
            </div>
            <div>
              <h3 className="text-xl font-bold">Basma (بسمة) - Your AI Health Assistant</h3>
              <p className="text-white/80">Multilingual AI voice assistant for appointments, eligibility, claims & clinical Q&A</p>
            </div>
          </div>
          <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-white/90 transition-colors">
            <span className="ltr:hidden">تحدث مع بسمة</span>
            <span className="hidden ltr:inline">Chat with Basma</span>
          </button>
        </div>
      </div>
    </div>
  )
}