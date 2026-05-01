'use client'

import { useState, useEffect } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || ''

type NphiesStatus = {
  portal: string
  facility_license: string
  connected: boolean
  stats: {
    claims_submitted: number
    pa_submitted: number
    eligibility_checks: number
  }
}

type EligibilityResult = {
  status: string
  source: string
  note?: string
  data?: unknown
}

export default function NphiesPage() {
  const [status, setStatus] = useState<NphiesStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [eligCheck, setEligCheck] = useState({ national_id: '', payer_id: '' })
  const [eligResult, setEligResult] = useState<EligibilityResult | null>(null)
  const [eligLoading, setEligLoading] = useState(false)
  const [tab, setTab] = useState<'status' | 'eligibility' | 'pa' | 'gss'>('status')

  useEffect(() => {
    fetchStatus()
  }, [])

  const fetchStatus = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/nphies/status`)
      const data = await res.json()
      setStatus(data)
    } catch { setStatus(null) }
    setLoading(false)
  }

  const checkEligibility = async (e: React.FormEvent) => {
    e.preventDefault()
    setEligLoading(true)
    setEligResult(null)
    try {
      const res = await fetch(`${API}/api/nphies/eligibility`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eligCheck),
      })
      const data = await res.json()
      setEligResult(data)
    } catch { setEligResult({ status: 'error', source: 'network' }) }
    setEligLoading(false)
  }

  const TABS = [
    { id: 'status', label: 'حالة النظام', labelEn: 'System Status', icon: '📡' },
    { id: 'eligibility', label: 'التحقق من الأهلية', labelEn: 'Eligibility Check', icon: '✅' },
    { id: 'pa', label: 'التفويض المسبق', labelEn: 'Prior Auth', icon: '🔐' },
    { id: 'gss', label: 'بيانات GSS', labelEn: 'GSS Data', icon: '📋' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-6 border-l-4 border-amber-500">
        <div className="flex items-start gap-4">
          <div className="text-4xl">🏛️</div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-3xl font-bold">NPHIES</h2>
              <span className="text-sm px-2 py-0.5 rounded bg-amber-100 text-amber-800">نفيس</span>
            </div>
            <p className="text-lg">المنصة الوطنية لتبادل التأمين الصحي</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              National Platform for Health Insurance Exchange · portal.nphies.sa
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className={`inline-block w-2 h-2 rounded-full ${status?.connected ? 'bg-green-500' : 'bg-gray-400'}`} />
              <span className="text-sm">{status?.connected ? 'متصل | Connected' : 'جاري التحقق...'}</span>
              {status?.facility_license && (
                <span className="text-xs font-mono opacity-60">رخصة: {status.facility_license}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b overflow-x-auto" style={{ borderColor: 'var(--border)' }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as typeof tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              tab === t.id
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Status Tab */}
      {tab === 'status' && (
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'مطالبات مقدمة', labelEn: 'Claims Submitted', value: status?.stats.claims_submitted ?? '—', icon: '📋', color: 'text-blue-600' },
              { label: 'تفويضات مسبقة', labelEn: 'PA Submitted', value: status?.stats.pa_submitted ?? '—', icon: '✅', color: 'text-green-600' },
              { label: 'فحوصات الأهلية', labelEn: 'Eligibility Checks', value: status?.stats.eligibility_checks ?? '—', icon: '🔍', color: 'text-amber-600' },
            ].map((card, i) => (
              <div key={i} className="card p-4 text-center">
                <div className="text-2xl mb-1">{card.icon}</div>
                <div className={`text-3xl font-bold ${card.color}`}>
                  {loading ? <span className="inline-block w-16 h-8 rounded animate-pulse bg-gray-200" /> : card.value}
                </div>
                <div className="text-sm mt-1">{card.label}</div>
                <div className="text-xs opacity-60">{card.labelEn}</div>
              </div>
            ))}
          </div>

          {/* Integration Map */}
          <div className="card p-6">
            <h3 className="text-lg font-bold mb-4">خريطة التكامل | Integration Map</h3>
            <div className="space-y-3">
              {[
                { from: 'BSMA', via: 'API Gateway', to: 'NPHIES Portal', status: 'active', desc: 'Eligibility checks for patients' },
                { from: 'SBS', via: 'Oracle Bridge', to: 'NPHIES Portal', status: 'active', desc: 'Claims submission & PA' },
                { from: 'GIVC', via: 'Oracle Bridge', to: 'NPHIES Portal', status: 'active', desc: 'Clinical PA requests' },
                { from: 'Oracle RAD', via: 'Direct', to: 'NPHIES Mirror', status: 'synced', desc: 'GSS data sync (payers, coverage)' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--bg)' }}>
                  <span className="text-sm font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">{item.from}</span>
                  <span className="text-xs opacity-60">→ {item.via} →</span>
                  <span className="text-sm font-mono font-bold px-2 py-0.5 rounded bg-green-100 text-green-800">{item.to}</span>
                  <span className="text-xs flex-1" style={{ color: 'var(--text-secondary)' }}>{item.desc}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${item.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Portal Links */}
          <div className="card p-6">
            <h3 className="text-lg font-bold mb-4">روابط NPHIES | NPHIES Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { name: 'NPHIES Portal', url: 'https://portal.nphies.sa', desc: 'Main portal' },
                { name: 'SSO Login', url: 'https://sso.nphies.sa', desc: 'Single Sign-On' },
                { name: 'NPHIES API', url: 'https://api.nphies.sa/v1', desc: 'REST API' },
                { name: 'NPHIES Mirror (Cache)', url: 'https://nphies-mirror.brainsait-fadil.workers.dev', desc: 'Brainsait cache' },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border hover:opacity-80 transition-opacity"
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}
                >
                  <span className="text-xl">🔗</span>
                  <div>
                    <div className="text-sm font-medium">{link.name}</div>
                    <div className="text-xs opacity-60">{link.desc}</div>
                  </div>
                  <span className="mr-auto text-xs opacity-40">{link.url.replace('https://', '')}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Eligibility Check Tab */}
      {tab === 'eligibility' && (
        <div className="space-y-4">
          <div className="card p-6">
            <h3 className="text-lg font-bold mb-4">التحقق من الأهلية | Eligibility Check</h3>
            <form onSubmit={checkEligibility} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">رقم الهوية الوطنية / الإقامة</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="1234567890"
                  value={eligCheck.national_id}
                  onChange={e => setEligCheck({ ...eligCheck, national_id: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">رمز جهة التأمين (اختياري)</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="INS-001"
                  value={eligCheck.payer_id}
                  onChange={e => setEligCheck({ ...eligCheck, payer_id: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="btn-primary" disabled={eligLoading}>
                  {eligLoading ? 'جاري التحقق...' : '🔍 التحقق من الأهلية'}
                </button>
              </div>
            </form>
          </div>

          {eligResult && (
            <div className={`card p-6 border-l-4 ${eligResult.status === 'eligible' ? 'border-green-500' : eligResult.status === 'error' ? 'border-red-500' : 'border-amber-500'}`}>
              <h3 className="text-lg font-bold mb-3">نتيجة التحقق | Result</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>الحالة | Status</div>
                  <div className={`text-xl font-bold ${eligResult.status === 'eligible' ? 'text-green-600' : eligResult.status === 'error' ? 'text-red-600' : 'text-amber-600'}`}>
                    {eligResult.status}
                  </div>
                </div>
                <div>
                  <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>المصدر | Source</div>
                  <div className="text-sm font-mono">{eligResult.source}</div>
                </div>
                {eligResult.note && (
                  <div className="col-span-2">
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>ملاحظة | Note</div>
                    <div className="text-sm">{eligResult.note}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* PA Tab */}
      {tab === 'pa' && (
        <div className="card p-6 text-center">
          <div className="text-4xl mb-4">🔐</div>
          <h3 className="text-xl font-bold mb-2">التفويض المسبق | Prior Authorization</h3>
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            إدارة طلبات التفويض المسبق مع NPHIES
          </p>
          <a href="/sbs" className="btn-primary inline-block">
            فتح بوابة SBS لإدارة PA
          </a>
        </div>
      )}

      {/* GSS Data Tab */}
      {tab === 'gss' && (
        <div className="card p-6">
          <h3 className="text-lg font-bold mb-4">بيانات GSS (قائمة الدافعين) | GSS Data</h3>
          <div className="p-8 text-center rounded-lg" style={{ backgroundColor: 'var(--bg)' }}>
            <div className="text-4xl mb-2">📡</div>
            <p style={{ color: 'var(--text-secondary)' }}>
              بيانات GSS متزامنة من NPHIES Mirror
            </p>
            <p className="text-sm opacity-60 mt-1">
              GSS data synced from nphies-mirror.brainsait-fadil.workers.dev
            </p>
            <button
              onClick={async () => {
                try {
                  const res = await fetch(`${API}/api/nphies/gss`)
                  const data = await res.json()
                  alert(JSON.stringify(data, null, 2).slice(0, 500) + '...')
                } catch { alert('فشل في جلب بيانات GSS') }
              }}
              className="btn-primary mt-4"
            >
              جلب بيانات GSS
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
