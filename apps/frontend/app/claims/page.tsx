'use client'

import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'https://hnh.brainsait.org'

export default function ClaimsPage() {
  const [claims, setClaims] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    patient_id: '',
    claim_type: 'professional',
    payer_id: '',
    payer_name: '',
    total_amount: '',
  })

  useEffect(() => {
    void fetchClaims()
  }, [])

  const fetchClaims = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/claims`)
      const data = await res.json()
      setClaims(data.claims || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const createClaim = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API}/api/claims`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          total_amount: parseFloat(formData.total_amount),
        }),
      })
      const data = await res.json()
      if (data.success) {
        setShowForm(false)
        setFormData({ patient_id: '', claim_type: 'professional', payer_id: '', payer_name: '', total_amount: '' })
        void fetchClaims()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const statusBadge = (status: string): CSSProperties => {
    const styles: Record<string, CSSProperties> = {
      draft: { backgroundColor: '#e2e8f0', color: '#334155' },
      submitted: { backgroundColor: '#dbeafe', color: '#1d4ed8' },
      approved: { backgroundColor: '#dcfce7', color: '#166534' },
      rejected: { backgroundColor: '#fee2e2', color: '#b91c1c' },
      paid: { backgroundColor: '#dcfce7', color: '#166534' },
    }
    return styles[status] || styles.draft
  }

  const statusLabels: Record<string, string> = {
    draft: 'مسودة',
    submitted: 'مقدمة',
    approved: 'معتمدة',
    rejected: 'مرفوضة',
    paid: 'مدفوعة',
  }

  return (
    <div className="space-y-6">
      <section className="panel p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="section-kicker">Claims</div>
            <h1 className="mt-3 text-2xl font-bold">إدارة المطالبات</h1>
            <p className="text-sm text-muted">Create claims, review payer data, and monitor submission status.</p>
          </div>
          <button onClick={() => setShowForm((open) => !open)} className="btn-primary">
            + {showForm ? 'إلغاء' : 'مطالبة جديدة'}
          </button>
        </div>
      </section>

      {showForm && (
        <section className="panel p-5 md:p-6">
          <div className="mb-5">
            <div className="section-kicker">New Claim</div>
            <h2 className="mt-3 text-xl font-bold">إنشاء مطالبة جديدة</h2>
          </div>

          <form onSubmit={createClaim} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">رقم المريض</label>
              <input type="text" value={formData.patient_id} onChange={(e) => setFormData({ ...formData, patient_id: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">نوع المطالبة</label>
              <select value={formData.claim_type} onChange={(e) => setFormData({ ...formData, claim_type: e.target.value })} className="input-field">
                <option value="professional">مهنية</option>
                <option value="institutional">مؤسسية</option>
                <option value="pharmacy">صيدلية</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">رقم الدافع</label>
              <input type="text" value={formData.payer_id} onChange={(e) => setFormData({ ...formData, payer_id: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">اسم جهة الدفع</label>
              <input type="text" value={formData.payer_name} onChange={(e) => setFormData({ ...formData, payer_name: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">المبلغ (SAR)</label>
              <input type="number" step="0.01" value={formData.total_amount} onChange={(e) => setFormData({ ...formData, total_amount: e.target.value })} className="input-field" required />
            </div>
            <div className="md:col-span-2 flex flex-wrap gap-3">
              <button type="submit" className="btn-primary">إنشاء المطالبة</button>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border px-4 py-2" style={{ borderColor: 'var(--border)' }}>إلغاء</button>
            </div>
          </form>
        </section>
      )}

      <section className="panel overflow-hidden">
        <div className="border-b px-5 py-4 md:px-6" style={{ borderColor: 'var(--border)' }}>
          <h2 className="text-lg font-bold">قائمة المطالبات</h2>
          <p className="text-sm text-muted">Submitted and draft claims across the connected payer workflow.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px]">
            <thead>
              <tr style={{ backgroundColor: 'var(--surface-muted)' }}>
                <th className="p-3 text-right text-sm font-medium">رقم المطالبة</th>
                <th className="p-3 text-right text-sm font-medium">المريض</th>
                <th className="p-3 text-right text-sm font-medium">النوع</th>
                <th className="p-3 text-right text-sm font-medium">جهة الدفع</th>
                <th className="p-3 text-right text-sm font-medium">المبلغ</th>
                <th className="p-3 text-right text-sm font-medium">الحالة</th>
                <th className="p-3 text-right text-sm font-medium">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="p-10 text-center text-sm text-muted">جاري التحميل...</td></tr>
              ) : claims.length === 0 ? (
                <tr><td colSpan={7} className="p-10 text-center text-sm text-muted">لا توجد مطالبات</td></tr>
              ) : (
                claims.map((claim: any) => (
                  <tr key={claim.id} className="border-t hover:opacity-85" style={{ borderColor: 'var(--border)' }}>
                    <td className="p-3 text-sm font-mono">{claim.claim_number}</td>
                    <td className="p-3 text-sm font-semibold">{claim.patient_name || `#${claim.patient_id}`}</td>
                    <td className="p-3 text-sm">{claim.claim_type}</td>
                    <td className="p-3 text-sm">{claim.payer_name}</td>
                    <td className="p-3 text-sm font-mono">{parseFloat(claim.total_amount).toLocaleString()} SAR</td>
                    <td className="p-3 text-sm">
                      <span className="status-badge" style={statusBadge(claim.status)}>
                        {statusLabels[claim.status] || claim.status}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-muted">{claim.created_at?.split('T')[0]}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
