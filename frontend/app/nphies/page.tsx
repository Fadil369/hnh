'use client'

import { useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'https://hnh.brainsait.org'

export default function NphiesPage() {
  const [tab, setTab] = useState<'eligibility' | 'transactions' | 'gss'>('eligibility')
  const [eligCheck, setEligCheck] = useState({ national_id: '', payer_id: '' })
  const [eligResult, setEligResult] = useState<any>(null)
  const [eligLoading, setEligLoading] = useState(false)
  const [transactionBody, setTransactionBody] = useState('{\n  "member_id": "P001"\n}')
  const [transactionType, setTransactionType] = useState<'270' | '278' | '837'>('270')
  const [transactionResult, setTransactionResult] = useState<any>(null)
  const [transactionLoading, setTransactionLoading] = useState(false)
  const [gssData, setGssData] = useState<any>(null)
  const [gssLoading, setGssLoading] = useState(false)

  const checkEligibility = async (e: React.FormEvent) => {
    e.preventDefault()
    setEligLoading(true)
    setEligResult(null)
    try {
      const res = await fetch(`${API}/api/eligibility/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eligCheck),
      })
      setEligResult(await res.json())
    } catch {
      setEligResult({ success: false, error: 'Network error' })
    } finally {
      setEligLoading(false)
    }
  }

  const submitTransaction = async (e: React.FormEvent) => {
    e.preventDefault()
    setTransactionLoading(true)
    setTransactionResult(null)
    try {
      const parsed = JSON.parse(transactionBody)
      const res = await fetch(`${API}/api/nphies/${transactionType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed),
      })
      setTransactionResult(await res.json())
    } catch (error) {
      setTransactionResult({ success: false, error: error instanceof Error ? error.message : 'Invalid payload' })
    } finally {
      setTransactionLoading(false)
    }
  }

  const loadGss = async () => {
    setGssLoading(true)
    try {
      const res = await fetch('https://nphies-mirror.brainsait-fadil.workers.dev/mirror/status')
      setGssData(await res.json())
    } catch {
      setGssData({ success: false, error: 'Unable to load GSS mirror status' })
    } finally {
      setGssLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <section className="panel-hero px-6 py-7 text-white md:px-8">
        <div className="subtle-grid" />
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="section-kicker border border-white/10 bg-white/10 text-white">NPHIES Control</div>
            <h1 className="mt-4 text-3xl font-bold md:text-4xl">المنصة الوطنية لتبادل التأمين الصحي</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/80 md:text-base">
              تشغيل التحقق من الأهلية، معاملات 270/278/837، ومراجعة حالة المرآة الحكومية من نفس مساحة العمل.
            </p>
          </div>
          <a href="https://portal.nphies.sa" target="_blank" rel="noopener noreferrer" className="status-pill border-white/10 bg-white/10 text-white">
            portal.nphies.sa ↗
          </a>
        </div>
      </section>

      <section className="panel p-5 md:p-6">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'eligibility', label: 'Eligibility', labelAr: 'التحقق من الأهلية' },
            { id: 'transactions', label: 'Transactions', labelAr: 'المعاملات' },
            { id: 'gss', label: 'GSS Mirror', labelAr: 'مرآة GSS' },
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

      {tab === 'eligibility' && (
        <section className="panel p-5 md:p-6">
          <div className="mb-5">
            <div className="section-kicker">Eligibility</div>
            <h2 className="mt-3 text-xl font-bold">فحص الأهلية عبر المسار الحي</h2>
          </div>

          <form onSubmit={checkEligibility} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">رقم الهوية / الإقامة</label>
              <input value={eligCheck.national_id} onChange={(e) => setEligCheck({ ...eligCheck, national_id: e.target.value })} className="input-field" placeholder="1234567890" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">رمز الدافع</label>
              <input value={eligCheck.payer_id} onChange={(e) => setEligCheck({ ...eligCheck, payer_id: e.target.value })} className="input-field" placeholder="INS-001" />
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="btn-primary" disabled={eligLoading}>{eligLoading ? 'جاري التحقق...' : 'التحقق من الأهلية'}</button>
            </div>
          </form>

          {eligResult && (
            <pre className="panel-soft mt-4 overflow-x-auto p-4 text-sm">{JSON.stringify(eligResult, null, 2)}</pre>
          )}
        </section>
      )}

      {tab === 'transactions' && (
        <section className="panel p-5 md:p-6">
          <div className="mb-5">
            <div className="section-kicker">Transactions</div>
            <h2 className="mt-3 text-xl font-bold">إرسال المعاملات</h2>
          </div>

          <form onSubmit={submitTransaction} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">نوع المعاملة</label>
              <select value={transactionType} onChange={(e) => setTransactionType(e.target.value as typeof transactionType)} className="input-field w-full md:w-auto">
                <option value="270">270 Eligibility</option>
                <option value="278">278 Prior Auth</option>
                <option value="837">837 Claim</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Payload JSON</label>
              <textarea value={transactionBody} onChange={(e) => setTransactionBody(e.target.value)} className="input-field min-h-56 font-mono text-sm" dir="ltr" />
            </div>
            <button type="submit" className="btn-primary" disabled={transactionLoading}>{transactionLoading ? 'جاري الإرسال...' : 'إرسال المعاملة'}</button>
          </form>

          {transactionResult && (
            <pre className="panel-soft mt-4 overflow-x-auto p-4 text-sm">{JSON.stringify(transactionResult, null, 2)}</pre>
          )}
        </section>
      )}

      {tab === 'gss' && (
        <section className="panel p-5 md:p-6">
          <div className="mb-5">
            <div className="section-kicker">Mirror Status</div>
            <h2 className="mt-3 text-xl font-bold">حالة مرآة GSS</h2>
          </div>

          <button onClick={() => void loadGss()} className="btn-primary" disabled={gssLoading}>{gssLoading ? 'جاري الجلب...' : 'جلب حالة المرآة'}</button>

          {gssData && (
            <pre className="panel-soft mt-4 overflow-x-auto p-4 text-sm">{JSON.stringify(gssData, null, 2)}</pre>
          )}
        </section>
      )}
    </div>
  )
}
