'use client'

import { useEffect, useMemo, useState } from 'react'

interface Integration {
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  status: string
  url?: string
  icon: string
  category: 'core' | 'ai' | 'communication' | 'digital' | 'government' | 'developer'
}

interface HealthData {
  success: boolean
  version: string
  stats: {
    total_patients: number
    today_appointments: number
    total_providers: number
    total_claims: number
    pending_claims: number
    today_telehealth: number
    today_homecare: number
  }
  integrations: Record<string, any>
  services: Record<string, string>
}

const API = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'https://hnh.brainsait.org'

export default function IntegrationsPage() {
  const [health, setHealth] = useState<HealthData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    void fetchHealthData()
  }, [])

  const fetchHealthData = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/health`)
      const data = await res.json()
      setHealth(data)
    } catch (error) {
      console.error('Failed to fetch health:', error)
    } finally {
      setLoading(false)
    }
  }

  const allIntegrations: Integration[] = [
    { name: 'Oracle Bridge', nameAr: 'جسر أوراكل', description: 'Enterprise cloud infrastructure', descriptionAr: 'بنية تحتية سحابية مؤسسية', status: health?.integrations?.oracle_bridge || 'unknown', url: 'https://oracle-bridge.brainsait.org', icon: '☁️', category: 'core' },
    { name: 'NPHIES Mirror', nameAr: 'مرآة نفيز', description: 'National Health Insurance Exchange mirror', descriptionAr: 'مرآة منصة التأمين الصحي الوطنية', status: health?.integrations?.nphies_mirror || 'unknown', url: 'https://nphies-mirror.brainsait-fadil.workers.dev', icon: '🏛️', category: 'government' },
    { name: 'ClaimLinc', nameAr: 'كلايم لينك', description: 'Claims processing and adjudication', descriptionAr: 'معالجة وفصل المطالبات', status: health?.integrations?.claimlinc || 'unknown', icon: '📋', category: 'core' },
    { name: 'GIVC Portal', nameAr: 'بوابة جيفك', description: 'Revenue cycle operations', descriptionAr: 'عمليات دورة الإيرادات', status: health?.integrations?.givc_portal?.status || 'unknown', icon: '🏥', category: 'core' },
    { name: 'SBS Portal', nameAr: 'بوابة SBS', description: 'Saudi billing system', descriptionAr: 'نظام الفوترة السعودي', status: health?.integrations?.sbs_portal || 'unknown', url: 'https://sbs.elfadil.com', icon: '💰', category: 'core' },
    { name: 'Basma Portal', nameAr: 'بوابة بسمة', description: 'AI assistant portal', descriptionAr: 'بوابة المساعد الذكي', status: health?.integrations?.basma_portal || 'unknown', url: 'https://bsma.elfadil.com', icon: '🤖', category: 'ai' },
    { name: 'Home Care', nameAr: 'الرعاية المنزلية', description: 'Home healthcare services', descriptionAr: 'خدمات الرعاية المنزلية', status: health?.integrations?.homecare || 'unknown', url: 'https://homecare.hayathospitals.com', icon: '🏠', category: 'digital' },
    { name: 'Telehealth', nameAr: 'التطبيب عن بعد', description: 'Virtual consultations', descriptionAr: 'الاستشارات الافتراضية', status: health?.integrations?.telehealth || 'unknown', url: 'https://telehealth.brainsait.org', icon: '📹', category: 'digital' },
    { name: 'Academy', nameAr: 'الأكاديمية', description: 'Healthcare training services', descriptionAr: 'خدمات التدريب الصحي', status: health?.integrations?.academy || 'unknown', url: 'https://academy.hayathospitals.com', icon: '🎓', category: 'digital' },
    { name: 'Maillinc', nameAr: 'مايلينك', description: 'Email communications', descriptionAr: 'اتصالات البريد الإلكتروني', status: health?.integrations?.maillinc || 'unknown', icon: '📧', category: 'communication' },
    { name: 'ElevenLabs', nameAr: 'إليفن لابس', description: 'Text to speech configuration', descriptionAr: 'تهيئة تحويل النص إلى كلام', status: health?.integrations?.elevenlabs || 'unknown', icon: '🎤', category: 'ai' },
    { name: 'DeepSeek', nameAr: 'ديب سيك', description: 'AI language model configuration', descriptionAr: 'تهيئة نموذج اللغة الذكي', status: health?.integrations?.deepseek || 'unknown', icon: '🧠', category: 'ai' },
    { name: 'Twilio', nameAr: 'تويليو', description: 'SMS and voice communication', descriptionAr: 'رسائل واتصالات صوتية', status: health?.integrations?.twilio || 'unknown', icon: '📱', category: 'communication' },
    { name: 'WhatsApp', nameAr: 'واتساب', description: 'Business messaging channel', descriptionAr: 'قناة المراسلة للأعمال', status: health?.integrations?.whatsapp || 'unknown', icon: '💬', category: 'communication' },
    { name: 'GitHub REST API', nameAr: 'واجهة GitHub', description: 'Activity, Models AI inference, Notifications & Feeds', descriptionAr: 'نشاط المنصة، نماذج الذكاء الاصطناعي، الإشعارات والتغذية', status: health?.integrations?.github || 'unknown', url: 'https://github.com/Fadil369/hnh', icon: '🐙', category: 'developer' },
    { name: 'GitHub Models', nameAr: 'نماذج GitHub', description: 'GPT-4o, Llama, Mistral via GitHub Marketplace', descriptionAr: 'نماذج AI المتاحة عبر GitHub Marketplace', status: health?.integrations?.github || 'unknown', icon: '🤖', category: 'ai' },
  ]

  const categories = [
    { id: 'all', name: 'All systems', nameAr: 'جميع الأنظمة', icon: '🔗' },
    { id: 'core', name: 'Core systems', nameAr: 'الأنظمة الأساسية', icon: '⚙️' },
    { id: 'government', name: 'Government', nameAr: 'الحكومي', icon: '🏛️' },
    { id: 'ai', name: 'AI services', nameAr: 'خدمات الذكاء', icon: '🤖' },
    { id: 'digital', name: 'Digital health', nameAr: 'الصحة الرقمية', icon: '🏥' },
    { id: 'communication', name: 'Communication', nameAr: 'الاتصالات', icon: '📡' },
    { id: 'developer', name: 'Developer', nameAr: 'المطورون', icon: '🐙' },
  ]

  const filteredIntegrations = useMemo(
    () => selectedCategory === 'all' ? allIntegrations : allIntegrations.filter((item) => item.category === selectedCategory),
    [selectedCategory, health]
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-emerald-500'
      case 'configured':
        return 'bg-blue-500'
      case 'degraded':
      case 'warning':
        return 'bg-amber-500'
      case 'offline':
        return 'bg-red-500'
      case 'not_configured':
        return 'bg-slate-400'
      default:
        return 'bg-slate-500'
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

  return (
    <div className="space-y-6">
      <section className="panel-hero px-6 py-7 text-white md:px-8">
        <div className="subtle-grid" />
        <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="section-kicker border border-white/10 bg-white/10 text-white">Integration Hub</div>
            <h1 className="mt-4 text-3xl font-bold md:text-4xl">خريطة التكامل والاتصال المباشر</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/78 md:text-base">
              شاشة مراجعة وتشخيص لكل الخدمات المرتبطة بالنظام التشغيلي: البوابات، الذكاء الاصطناعي، الرسائل،
              الصحة الرقمية، والجهات الحكومية.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="status-pill border-white/10 bg-white/10 text-white">
              <span className={`h-2.5 w-2.5 rounded-full ${loading ? 'bg-amber-500 animate-pulse' : 'bg-emerald-400'}`} />
              {loading ? 'Refreshing' : 'Live snapshot'}
            </span>
            <button onClick={() => void fetchHealthData()} className="nav-chip border border-white/10 bg-white/10 text-white">
              <span>🔄</span>
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </section>

      {health?.stats && (
        <section className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
          <div className="metric-card"><div className="text-2xl">👤</div><div className="metric-value mt-3 text-blue-600">{health.stats.total_patients || 0}</div><div className="mt-2 text-xs text-muted">Patients</div></div>
          <div className="metric-card"><div className="text-2xl">📅</div><div className="metric-value mt-3 text-emerald-600">{health.stats.today_appointments || 0}</div><div className="mt-2 text-xs text-muted">Today's appts</div></div>
          <div className="metric-card"><div className="text-2xl">👨‍⚕️</div><div className="metric-value mt-3 text-violet-600">{health.stats.total_providers || 0}</div><div className="mt-2 text-xs text-muted">Providers</div></div>
          <div className="metric-card"><div className="text-2xl">📋</div><div className="metric-value mt-3 text-amber-600">{health.stats.total_claims || 0}</div><div className="mt-2 text-xs text-muted">Claims</div></div>
          <div className="metric-card"><div className="text-2xl">⏳</div><div className="metric-value mt-3 text-rose-600">{health.stats.pending_claims || 0}</div><div className="mt-2 text-xs text-muted">Pending</div></div>
          <div className="metric-card"><div className="text-2xl">📹</div><div className="metric-value mt-3 text-indigo-600">{health.stats.today_telehealth || 0}</div><div className="mt-2 text-xs text-muted">Telehealth</div></div>
          <div className="metric-card"><div className="text-2xl">🏠</div><div className="metric-value mt-3 text-teal-600">{health.stats.today_homecare || 0}</div><div className="mt-2 text-xs text-muted">Home care</div></div>
        </section>
      )}

      <section className="panel p-5 md:p-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="section-kicker">Filters</div>
            <h2 className="mt-3 text-xl font-bold">تصفية المجالات</h2>
            <p className="text-sm text-muted">Review one operational layer at a time to spot gaps faster.</p>
          </div>
          <div className="text-sm text-muted">Version {health?.version || '9.2.0'}</div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const active = selectedCategory === category.id
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full px-4 py-2 text-sm font-semibold"
                style={active
                  ? { backgroundColor: 'var(--primary)', color: 'white' }
                  : { backgroundColor: 'var(--surface-muted)', color: 'var(--text)', border: '1px solid var(--border)' }}
              >
                <div>{category.icon} {category.nameAr}</div>
                <div className="text-[11px] opacity-75">{category.name}</div>
              </button>
            )
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredIntegrations.map((integration) => (
          <div key={integration.name} className="panel p-5 hover:-translate-y-0.5">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl" style={{ backgroundColor: 'var(--surface-strong)' }}>
                {integration.icon}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="bilingual-label">
                    <strong>{integration.nameAr}</strong>
                    <span>{integration.name}</span>
                  </div>
                  <span className={`mt-1 h-3.5 w-3.5 rounded-full ${getStatusColor(integration.status)}`} />
                </div>

                <p className="mt-3 text-sm text-muted">{integration.descriptionAr}</p>
                <p className="text-xs text-muted">{integration.description}</p>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="status-pill">{getStatusText(integration.status)}</span>
                  {integration.url && (
                    <a href={integration.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>
                      Open ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {health?.services && (
        <section className="panel p-5 md:p-6">
          <div className="mb-5">
            <div className="section-kicker">Service Directory</div>
            <h2 className="mt-3 text-xl font-bold">دليل الخدمات</h2>
            <p className="text-sm text-muted">Short descriptions of the service domains exposed by the operating system.</p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {Object.entries(health.services).map(([key, desc]) => (
              <div key={key} className="panel-soft flex items-start gap-3 p-4">
                <span className="rounded-xl px-3 py-1 text-xs font-semibold" style={{ backgroundColor: 'var(--surface-strong)', color: 'var(--primary)' }}>{key}</span>
                <span className="text-sm text-muted">{desc}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
