'use client'

import { useState, useEffect } from 'react'

interface Integration {
  name: string
  nameAr: string
  description: string
  descriptionAr: string
  status: string
  url?: string
  icon: string
  category: 'core' | 'ai' | 'communication' | 'digital' | 'government'
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

export default function IntegrationsPage() {
  const [health, setHealth] = useState<HealthData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    fetchHealthData()
  }, [])

  const fetchHealthData = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}/api/health`)
      const data = await res.json()
      setHealth(data)
    } catch (error) {
      console.error('Failed to fetch health:', error)
    } finally {
      setLoading(false)
    }
  }

  const allIntegrations: Integration[] = [
    // Core Systems
    { name: 'Oracle Bridge', nameAr: 'جسر أوراكل', description: 'Enterprise Cloud Infrastructure', descriptionAr: 'بنية تحتية سحابية مؤسسية', status: health?.integrations?.oracle_bridge || 'unknown', url: 'https://oracle-bridge.brainsait.org', icon: '☁️', category: 'core' },
    { name: 'NPHIES Mirror', nameAr: 'مرآة نفيز', description: 'National Health Insurance Exchange', descriptionAr: 'منصة التأمين الصحي الوطنية', status: health?.integrations?.nphies_mirror || 'unknown', url: 'https://nphies-mirror.brainsait-fadil.workers.dev', icon: '🏛️', category: 'government' },
    { name: 'ClaimLinc', nameAr: 'كلايم لينك', description: 'Claims Processing & Adjudication', descriptionAr: 'معالجة وفصل المطالبات', status: health?.integrations?.claimlinc || 'unknown', icon: '📋', category: 'core' },
    { name: 'GIVC Portal', nameAr: 'بوابة جيفك', description: 'Revenue Cycle Management', descriptionAr: 'إدارة دورة الإيرادات', status: health?.integrations?.givc_portal?.status || 'unknown', icon: '🏥', category: 'core' },
    { name: 'SBS Portal', nameAr: 'بوابة SBS', description: 'Saudi Billing System', descriptionAr: 'نظام الفوترة السعودي', status: health?.integrations?.sbs_portal || 'unknown', url: 'https://sbs.elfadil.com', icon: '💰', category: 'core' },
    { name: 'Basma Portal', nameAr: 'بوابة بسمة', description: 'AI Assistant Portal', descriptionAr: 'بوابة المساعد الذكي', status: health?.integrations?.basma_portal || 'unknown', url: 'https://bsma.elfadil.com', icon: '🤖', category: 'ai' },
    
    // Digital Health
    { name: 'Home Care', nameAr: 'رعاية منزلية', description: 'Home Healthcare Services', descriptionAr: 'خدمات الرعاية المنزلية', status: health?.integrations?.homecare || 'unknown', url: 'https://homecare.hayathospitals.com', icon: '🏠', category: 'digital' },
    { name: 'Telehealth', nameAr: 'تطبيب عن بعد', description: 'Virtual Consultations', descriptionAr: 'استشارات افتراضية', status: health?.integrations?.telehealth || 'unknown', url: 'https://telehealth.brainsait.org', icon: '📹', category: 'digital' },
    { name: 'Academy', nameAr: 'الأكاديمية', description: 'Healthcare Training', descriptionAr: 'التدريب الصحي', status: health?.integrations?.academy || 'unknown', url: 'https://academy.hayathospitals.com', icon: '🎓', category: 'digital' },
    { name: 'Maillinc', nameAr: 'مايلينك', description: 'Email Communications', descriptionAr: 'اتصالات البريد الإلكتروني', status: health?.integrations?.maillinc || 'unknown', icon: '📧', category: 'communication' },
    
    // AI & Communication (configuration status)
    { name: 'ElevenLabs', nameAr: 'إليفن لابس', description: 'Text-to-Speech (TTS)', descriptionAr: 'تحويل النص إلى كلام', status: health?.integrations?.elevenlabs || 'unknown', icon: '🎤', category: 'ai' },
    { name: 'DeepSeek', nameAr: 'ديب سيك', description: 'AI Language Model', descriptionAr: 'نموذج اللغة الذكي', status: health?.integrations?.deepseek || 'unknown', icon: '🧠', category: 'ai' },
    { name: 'Twilio', nameAr: 'تويليو', description: 'SMS & Voice Calls', descriptionAr: 'رسائل نصية ومكالمات صوتية', status: health?.integrations?.twilio || 'unknown', icon: '📱', category: 'communication' },
    { name: 'WhatsApp', nameAr: 'واتساب', description: 'Business Messaging', descriptionAr: 'المراسلة الأعمال', status: health?.integrations?.whatsapp || 'unknown', icon: '💬', category: 'communication' },
  ]

  const categories = [
    { id: 'all', name: 'All', nameAr: 'الكل', icon: '🔗' },
    { id: 'core', name: 'Core Systems', nameAr: 'الأنظمة الأساسية', icon: '⚙️' },
    { id: 'government', name: 'Government', nameAr: 'الحكومي', icon: '🏛️' },
    { id: 'ai', name: 'AI Services', nameAr: 'خدمات الذكاء', icon: '🤖' },
    { id: 'digital', name: 'Digital Health', nameAr: 'الصحة الرقمية', icon: '🏥' },
    { id: 'communication', name: 'Communication', nameAr: 'الاتصالات', icon: '📡' },
  ]

  const filteredIntegrations = selectedCategory === 'all' 
    ? allIntegrations 
    : allIntegrations.filter(i => i.category === selectedCategory)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-emerald-500'
      case 'configured': return 'bg-blue-500'
      case 'degraded': return 'bg-amber-500'
      case 'warning': return 'bg-amber-500'
      case 'offline': return 'bg-red-500'
      case 'not_configured': return 'bg-gray-400'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected': return 'Connected'
      case 'configured': return 'Configured'
      case 'degraded': return 'Degraded'
      case 'warning': return 'Warning'
      case 'offline': return 'Offline'
      case 'not_configured': return 'Not Configured'
      default: return 'Unknown'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-6 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white border-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">HNH BrainSAIT Integration Hub</h2>
            <p className="text-slate-300">Central control for all connected systems and services</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`px-2 py-1 rounded text-xs ${loading ? 'bg-amber-500' : 'bg-emerald-500'}`}>
                {loading ? 'Connecting...' : 'Live'}
              </span>
              <span className="text-xs opacity-70">v{health?.version || '9.2.0'}</span>
            </div>
          </div>
          <button 
            onClick={fetchHealthData}
            className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      {health?.stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          <div className="card p-3 text-center">
            <div className="text-2xl">👤</div>
            <div className="text-xl font-bold text-blue-600">{health.stats.total_patients || 0}</div>
            <div className="text-xs text-[var(--text-secondary)]">Patients</div>
          </div>
          <div className="card p-3 text-center">
            <div className="text-2xl">📅</div>
            <div className="text-xl font-bold text-emerald-600">{health.stats.today_appointments || 0}</div>
            <div className="text-xs text-[var(--text-secondary)]">Today's Appts</div>
          </div>
          <div className="card p-3 text-center">
            <div className="text-2xl">👨‍⚕️</div>
            <div className="text-xl font-bold text-purple-600">{health.stats.total_providers || 0}</div>
            <div className="text-xs text-[var(--text-secondary)]">Providers</div>
          </div>
          <div className="card p-3 text-center">
            <div className="text-2xl">📋</div>
            <div className="text-xl font-bold text-amber-600">{health.stats.total_claims || 0}</div>
            <div className="text-xs text-[var(--text-secondary)]">Claims</div>
          </div>
          <div className="card p-3 text-center">
            <div className="text-2xl">⏳</div>
            <div className="text-xl font-bold text-rose-600">{health.stats.pending_claims || 0}</div>
            <div className="text-xs text-[var(--text-secondary)]">Pending</div>
          </div>
          <div className="card p-3 text-center">
            <div className="text-2xl">📹</div>
            <div className="text-xl font-bold text-indigo-600">{health.stats.today_telehealth || 0}</div>
            <div className="text-xs text-[var(--text-secondary)]">Telehealth</div>
          </div>
          <div className="card p-3 text-center">
            <div className="text-2xl">🏠</div>
            <div className="text-xl font-bold text-teal-600">{health.stats.today_homecare || 0}</div>
            <div className="text-xs text-[var(--text-secondary)]">Home Care</div>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === cat.id
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--border)] hover:bg-[var(--primary)]/10'
            }`}
          >
            {cat.icon} <span className="ltr:hidden">{cat.nameAr}</span><span className="hidden ltr:inline">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Integration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIntegrations.map((integration, idx) => (
          <div
            key={idx}
            className="card p-4 hover:shadow-lg transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-[var(--border)] flex items-center justify-center text-2xl">
                {integration.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold">
                    <span className="ltr:hidden">{integration.nameAr}</span>
                    <span className="hidden ltr:inline">{integration.name}</span>
                  </h4>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(integration.status)}`}></div>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  <span className="ltr:hidden">{integration.descriptionAr}</span>
                  <span className="hidden ltr:inline">{integration.description}</span>
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-medium">{getStatusText(integration.status)}</span>
                  {integration.url && (
                    <a 
                      href={integration.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-[var(--primary)] hover:underline"
                    >
                      Open →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Descriptions */}
      {health?.services && (
        <div className="card p-6">
          <h3 className="text-xl font-bold mb-4">
            <span>قائمة الخدمات</span>
            <span className="text-sm font-normal mr-2 text-[var(--text-secondary)]">Service Directory</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(health.services).map(([key, desc]) => (
              <div key={key} className="flex items-center gap-3 p-3 rounded-lg bg-[var(--border)]">
                <span className="font-mono text-sm text-[var(--primary)]">{key}</span>
                <span className="text-sm text-[var(--text-secondary)]">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}