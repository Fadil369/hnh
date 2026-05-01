'use client'

import { useState, useEffect } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || ''

type RCMSummary = {
  total_claims: number
  approval_rate: string
  billed: number
  approved: number
  paid: number
  pending_pa: number
  eligibility_checks_30d: number
}

type ClaimStatus = Record<string, { count: number; total: number }>

type RecentClaim = {
  claim_number: string
  status: string
  total_amount: number
  payer_name: string
  patient_name: string
}

type PA = {
  id: number
  patient_name: string
  mrn: string
  pa_number: string
  request_type: string
  status: string
  created_at: string
  nphies_pa_id: string
}

export default function SBSPage() {
  const [tab, setTab] = useState<'rcm' | 'claims' | 'pa' | 'contracts'>('rcm')
  const [rcm, setRCM] = useState<{ summary: RCMSummary; claims_by_status: ClaimStatus; recent_claims: RecentClaim[] } | null>(null)
  const [pa, setPA] = useState<PA[]>([])
  const [loading, setLoading] = useState(false)
  const [showPAForm, setShowPAForm] = useState(false)
  const [paForm, setPAForm] = useState({ patient_id: '', insurance_id: '', request_type: 'medication', request_details: '' })

  useEffect(() => {
    if (tab === 'rcm') fetchRCM()
    if (tab === 'pa') fetchPA()
  }, [tab])

  const fetchRCM = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/rcm`)
      const data = await res.json()
      setRCM(data)
    } catch { setRCM(null) }
    setLoading(false)
  }

  const fetchPA = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/prior-auth`)
      const data = await res.json()
      setPA(data.prior_authorizations || [])
    } catch { setPA([]) }
    setLoading(false)
  }

  const submitPA = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API}/api/prior-auth`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paForm),
      })
      const data = await res.json()
      if (data.success) { setShowPAForm(false); fetchPA() }
    } catch {}
  }

  const TABS = [
    { id: 'rcm', label: 'لوحة RCM', labelEn: 'RCM Dashboard', icon: '📊' },
    { id: 'claims', label: 'المطالبات', labelEn: 'Claims', icon: '📋' },
    { id: 'pa', label: 'التفويض المسبق', labelEn: 'Prior Auth', icon: '✅' },
    { id: 'contracts', label: 'العقود', labelEn: 'Contracts', icon: '📑' },
  ]

  const statusBadge = (s: string) => {
    const m: Record<string, string> = {
      approved: 'bg-green-100 text-green-800',
      paid: 'bg-emerald-100 text-emerald-800',
      rejected: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800',
      submitted: 'bg-blue-100 text-blue-800',
      draft: 'bg-gray-100 text-gray-700',
    }
    return m[s] || 'bg-gray-100 text-gray-700'
  }

  const fmt = (n: number) => n ? `${n.toLocaleString('ar-SA')} ر.س` : '0 ر.س'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-6 border-l-4 border-violet-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-3xl">💰</span>
              <h2 className="text-3xl font-bold">SBS</h2>
              <span className="text-sm px-2 py-0.5 rounded bg-violet-100 text-violet-800">Billing & Insurance</span>
            </div>
            <p className="text-lg">نظام الفواتير والتأمين وإدارة دورة الإيرادات</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Revenue Cycle Management · NPHIES · Oracle Billing</p>
          </div>
          <div className="flex gap-2">
            <a href="/claims" className="btn-primary text-sm">+ مطالبة جديدة</a>
            <button onClick={() => setShowPAForm(true)} className="px-4 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)' }}>
              + تفويض مسبق
            </button>
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
                ? 'border-violet-500 text-violet-600'
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            {t.icon} {t.label}
            <span className="mr-1 opacity-60 text-xs">({t.labelEn})</span>
          </button>
        ))}
      </div>

      {/* PA Form */}
      {showPAForm && (
        <div className="card p-6">
          <h3 className="text-lg font-bold mb-4">طلب تفويض مسبق | Prior Authorization</h3>
          <form onSubmit={submitPA} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">رقم المريض</label>
              <input type="text" className="input-field" value={paForm.patient_id}
                onChange={e => setPAForm({ ...paForm, patient_id: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">رقم التأمين</label>
              <input type="text" className="input-field" value={paForm.insurance_id}
                onChange={e => setPAForm({ ...paForm, insurance_id: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">نوع الطلب</label>
              <select className="input-field" value={paForm.request_type}
                onChange={e => setPAForm({ ...paForm, request_type: e.target.value })}>
                <option value="medication">دواء</option>
                <option value="procedure">إجراء</option>
                <option value="admission">دخول</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">تفاصيل الطلب</label>
              <input type="text" className="input-field" value={paForm.request_details}
                onChange={e => setPAForm({ ...paForm, request_details: e.target.value })} required />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="btn-primary">إرسال إلى NPHIES</button>
              <button type="button" onClick={() => setShowPAForm(false)} className="px-4 py-2 rounded-lg border" style={{ borderColor: 'var(--border)' }}>إلغاء</button>
            </div>
          </form>
        </div>
      )}

      {/* Tab Content */}
      {loading ? (
        <div className="card p-12 text-center" style={{ color: 'var(--text-secondary)' }}>جاري التحميل...</div>
      ) : tab === 'rcm' ? (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'إجمالي المطالبات', labelEn: 'Total Claims', value: rcm?.summary.total_claims ?? '—', icon: '📋', color: 'text-blue-600' },
              { label: 'معدل الموافقة', labelEn: 'Approval Rate', value: rcm?.summary.approval_rate ?? '—', icon: '✅', color: 'text-green-600' },
              { label: 'إجمالي الفاتورة', labelEn: 'Total Billed', value: fmt(rcm?.summary.billed ?? 0), icon: '💵', color: 'text-violet-600' },
              { label: 'PA معلقة', labelEn: 'Pending PA', value: rcm?.summary.pending_pa ?? '—', icon: '⏳', color: 'text-amber-600' },
            ].map((card, i) => (
              <div key={i} className="card p-4 text-center">
                <div className="text-2xl mb-1">{card.icon}</div>
                <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
                <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                  <div>{card.label}</div>
                  <div className="opacity-60">{card.labelEn}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Claims by Status */}
          <div className="card p-6">
            <h3 className="text-lg font-bold mb-4">المطالبات حسب الحالة | Claims by Status</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(rcm?.claims_by_status || {}).map(([status, data]) => (
                <div key={status} className={`p-4 rounded-xl border ${statusBadge(status).replace('text-', 'border-').replace('-800', '-300').replace('-700', '-300')}`}
                  style={{ backgroundColor: 'var(--bg)' }}>
                  <div className="flex justify-between items-start">
                    <span className={`status-badge text-xs ${statusBadge(status)}`}>{status}</span>
                    <span className="text-xl font-bold">{data.count}</span>
                  </div>
                  <div className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>{fmt(data.total)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Claims */}
          <div className="card overflow-hidden">
            <div className="p-4 border-b font-bold" style={{ borderColor: 'var(--border)' }}>
              آخر المطالبات | Recent Claims
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}>
                    <th className="p-3 text-right text-sm font-medium">رقم المطالبة</th>
                    <th className="p-3 text-right text-sm font-medium">المريض</th>
                    <th className="p-3 text-right text-sm font-medium">جهة الدفع</th>
                    <th className="p-3 text-right text-sm font-medium">المبلغ</th>
                    <th className="p-3 text-right text-sm font-medium">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {(rcm?.recent_claims || []).length === 0 ? (
                    <tr><td colSpan={5} className="p-6 text-center" style={{ color: 'var(--text-secondary)' }}>لا توجد مطالبات</td></tr>
                  ) : (rcm?.recent_claims || []).map((c, i) => (
                    <tr key={i} className="border-b" style={{ borderColor: 'var(--border)' }}>
                      <td className="p-3 text-sm font-mono">{c.claim_number}</td>
                      <td className="p-3 text-sm">{c.patient_name}</td>
                      <td className="p-3 text-sm">{c.payer_name}</td>
                      <td className="p-3 text-sm font-mono">{fmt(c.total_amount)}</td>
                      <td className="p-3"><span className={`status-badge text-xs ${statusBadge(c.status)}`}>{c.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : tab === 'claims' ? (
        <div className="card p-8 text-center" style={{ color: 'var(--text-secondary)' }}>
          <div className="text-4xl mb-4">📋</div>
          <p>عرض وإدارة جميع المطالبات</p>
          <a href="/claims" className="btn-primary mt-4 inline-block text-sm">فتح صفحة المطالبات الكاملة</a>
        </div>
      ) : tab === 'pa' ? (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}>
                  <th className="p-3 text-right text-sm font-medium">رقم PA</th>
                  <th className="p-3 text-right text-sm font-medium">المريض</th>
                  <th className="p-3 text-right text-sm font-medium">النوع</th>
                  <th className="p-3 text-right text-sm font-medium">NPHIES Ref</th>
                  <th className="p-3 text-right text-sm font-medium">الحالة</th>
                  <th className="p-3 text-right text-sm font-medium">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {pa.length === 0 ? (
                  <tr><td colSpan={6} className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>لا يوجد تفويض مسبق</td></tr>
                ) : pa.map(p => (
                  <tr key={p.id} className="border-b" style={{ borderColor: 'var(--border)' }}>
                    <td className="p-3 text-sm font-mono">{p.pa_number}</td>
                    <td className="p-3 text-sm">{p.patient_name || `#${p.id}`}</td>
                    <td className="p-3 text-sm">{p.request_type}</td>
                    <td className="p-3 text-sm font-mono text-xs">{p.nphies_pa_id || '—'}</td>
                    <td className="p-3"><span className={`status-badge text-xs ${statusBadge(p.status)}`}>{p.status}</span></td>
                    <td className="p-3 text-sm" style={{ color: 'var(--text-secondary)' }}>{p.created_at?.split('T')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card p-6">
          <h3 className="text-lg font-bold mb-4">العقود والتعريفات | Contracts & Tariffs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'عقود نشطة', value: '—', color: 'text-green-600', note: 'Active Contracts' },
              { label: 'عقود منتهية', value: '—', color: 'text-red-600', note: 'Expired Contracts' },
              { label: 'إجمالي الدافعين', value: '—', color: 'text-blue-600', note: 'Total Payers' },
            ].map((c, i) => (
              <div key={i} className="card p-4 text-center">
                <div className={`text-3xl font-bold ${c.color}`}>{c.value}</div>
                <div className="text-sm mt-1">{c.label}</div>
                <div className="text-xs opacity-60">{c.note}</div>
              </div>
            ))}
          </div>
          <div className="text-center py-8" style={{ color: 'var(--text-secondary)' }}>
            <div className="text-4xl mb-2">📑</div>
            <p>بيانات العقود متاحة من خلال Oracle Bridge</p>
            <p className="text-sm opacity-60">Contract data available via Oracle Bridge integration</p>
          </div>
        </div>
      )}
    </div>
  )
}
