'use client'

import { useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'https://hnh.brainsait.org'

export default function SBSPage() {
  const [tab, setTab] = useState<'dashboard' | 'claims' | 'appeals'>('dashboard')
  const [branch, setBranch] = useState('r001')
  const [dashboard, setDashboard] = useState<any>(null)
  const [rejectedClaims, setRejectedClaims] = useState<any[]>([])
  const [appealClaimId, setAppealClaimId] = useState('')
  const [appealResult, setAppealResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const loadDashboard = async () => {
    setLoading(true)
    try {
      const [dashboardRes, rejectedRes] = await Promise.all([
        fetch(`${API}/api/rcm/dashboard/${branch}`),
        fetch(`${API}/api/rcm/claims/rejected?branch=${branch}`),
      ])
      setDashboard(await dashboardRes.json())
      const rejectedData = await rejectedRes.json()
      setRejectedClaims(rejectedData.claims || rejectedData.rejected_claims || [])
    } catch (error) {
      console.error('Failed to load RCM data', error)
      setDashboard(null)
      setRejectedClaims([])
    } finally {
      setLoading(false)
    }
  }

  const generateAppeal = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/rcm/appeal/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claim_id: appealClaimId }),
      })
      setAppealResult(await res.json())
    } catch (error) {
      console.error('Failed to generate appeal', error)
      setAppealResult({ success: false, error: 'Failed to generate appeal' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <section className="panel-hero px-6 py-7 text-white md:px-8">
        <div className="subtle-grid" />
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="section-kicker border border-white/10 bg-white/10 text-white">SBS Revenue Cycle</div>
            <h1 className="mt-4 text-3xl font-bold md:text-4xl">الفواتير والتأمين وإدارة دورة الإيرادات</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/80 md:text-base">
              واجهة تشغيل مخصصة للـ RCM، مراجعة المطالبات المرفوضة، وتوليد مسودات الاستئناف من نفس مساحة العمل.
            </p>
          </div>
          <div className="status-pill border-white/10 bg-white/10 text-white">RCM · Appeals · Claims QA</div>
        </div>
      </section>

      <section className="panel p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <select value={branch} onChange={(e) => setBranch(e.target.value)} className="input-field w-full md:w-auto">
            <option value="r001">Riyadh</option>
            <option value="m001">Madinah</option>
            <option value="j001">Jazan</option>
            <option value="k001">Khamis</option>
            <option value="u001">Unayzah</option>
          </select>
          <button onClick={() => void loadDashboard()} className="btn-primary" disabled={loading}>{loading ? 'جاري التحميل...' : 'تحميل لوحة RCM'}</button>
          <a href="/claims" className="status-pill" style={{ color: 'var(--primary)' }}>Open claims page</a>
        </div>
      </section>

      <section className="panel p-5 md:p-6">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'dashboard', label: 'Dashboard', labelAr: 'لوحة RCM' },
            { id: 'claims', label: 'Rejected Claims', labelAr: 'المطالبات المرفوضة' },
            { id: 'appeals', label: 'Appeals', labelAr: 'الاستئناف' },
          ].map((item) => {
            const active = tab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id as typeof tab)}
                className="rounded-full px-4 py-2 text-sm font-semibold"
                style={active
                  ? { backgroundColor: 'var(--primary)', color: 'white' }
                  : { backgroundColor: 'var(--surface-muted)', color: 'var(--text)', border: '1px solid var(--border)' }}
              >
                <div>{item.labelAr}</div>
                <div className="text-[11px] opacity-75">{item.label}</div>
              </button>
            )
          })}
        </div>
      </section>

      {tab === 'dashboard' && (
        <section className="panel p-5 md:p-6">
          <div className="mb-5">
            <div className="section-kicker">Dashboard</div>
            <h2 className="mt-3 text-xl font-bold">مؤشرات دورة الإيرادات</h2>
          </div>

          {!dashboard ? (
            <div className="text-sm text-muted">قم بتحميل لوحة RCM لعرض البيانات.</div>
          ) : (
            <pre className="panel-soft overflow-x-auto p-4 text-sm">{JSON.stringify(dashboard, null, 2)}</pre>
          )}
        </section>
      )}

      {tab === 'claims' && (
        <section className="panel p-5 md:p-6">
          <div className="mb-5">
            <div className="section-kicker">Rejected Claims</div>
            <h2 className="mt-3 text-xl font-bold">المطالبات المرفوضة</h2>
          </div>

          {rejectedClaims.length === 0 ? (
            <div className="text-sm text-muted">لا توجد مطالبات مرفوضة محملة حالياً.</div>
          ) : (
            <pre className="panel-soft overflow-x-auto p-4 text-sm">{JSON.stringify(rejectedClaims, null, 2)}</pre>
          )}
        </section>
      )}

      {tab === 'appeals' && (
        <section className="panel p-5 md:p-6">
          <div className="mb-5">
            <div className="section-kicker">Appeal Drafting</div>
            <h2 className="mt-3 text-xl font-bold">توليد الاستئناف</h2>
          </div>

          <form onSubmit={generateAppeal} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Claim ID</label>
              <input value={appealClaimId} onChange={(e) => setAppealClaimId(e.target.value)} className="input-field" placeholder="CLM-001" dir="ltr" />
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'جاري التوليد...' : 'توليد الاستئناف'}</button>
          </form>

          {appealResult && (
            <pre className="panel-soft mt-4 overflow-x-auto p-4 text-sm">{JSON.stringify(appealResult, null, 2)}</pre>
          )}
        </section>
      )}
    </div>
  )
}
