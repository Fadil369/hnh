'use client'

import { useState, useEffect } from 'react'

export default function ClaimsPage() {
  const [claims, setClaims] = useState([])
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
    fetchClaims()
  }, [])

  const fetchClaims = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.API_URL}/api/claims`)
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
      const res = await fetch(`${process.env.API_URL}/api/claims`, {
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
        fetchClaims()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
      submitted: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      approved: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
      rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      paid: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
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
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">
          <span>المطالبات</span>
          <span className="text-lg font-normal mr-2" style={{ color: 'var(--text-secondary)' }}>Claims</span>
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          + {showForm ? 'إلغاء' : 'مطالبة جديدة'}
        </button>
      </div>

      {showForm && (
        <div className="card p-6">
          <h3 className="text-xl font-bold mb-4">مطالبة جديدة | New Claim</h3>
          <form onSubmit={createClaim} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">رقم المريض</label>
              <input
                type="text"
                value={formData.patient_id}
                onChange={(e) => setFormData({...formData, patient_id: e.target.value})}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">نوع المطالبة</label>
              <select
                value={formData.claim_type}
                onChange={(e) => setFormData({...formData, claim_type: e.target.value})}
                className="input-field"
              >
                <option value="professional">مهنية</option>
                <option value="institutional">مؤسسية</option>
                <option value="pharmacy">صيدلية</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">رقم الدافع</label>
              <input
                type="text"
                value={formData.payer_id}
                onChange={(e) => setFormData({...formData, payer_id: e.target.value})}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">اسم جهة الدفع</label>
              <input
                type="text"
                value={formData.payer_name}
                onChange={(e) => setFormData({...formData, payer_name: e.target.value})}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">المبلغ (SAR)</label>
              <input
                type="number"
                step="0.01"
                value={formData.total_amount}
                onChange={(e) => setFormData({...formData, total_amount: e.target.value})}
                className="input-field"
                required
              />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="btn-primary">إنشاء المطالبة</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg border" style={{ borderColor: 'var(--border)' }}>إلغاء</button>
            </div>
          </form>
        </div>
      )}

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}>
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
                <tr><td colSpan={7} className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>جاري التحميل...</td></tr>
              ) : claims.length === 0 ? (
                <tr><td colSpan={7} className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>لا توجد مطالبات</td></tr>
              ) : (
                claims.map((claim: any) => (
                  <tr key={claim.id} className="border-b" style={{ borderColor: 'var(--border)' }}>
                    <td className="p-3 text-sm font-mono">{claim.claim_number}</td>
                    <td className="p-3 text-sm">{claim.patient_name || `#${claim.patient_id}`}</td>
                    <td className="p-3 text-sm">{claim.claim_type}</td>
                    <td className="p-3 text-sm">{claim.payer_name}</td>
                    <td className="p-3 text-sm font-mono">{parseFloat(claim.total_amount).toLocaleString()} SAR</td>
                    <td className="p-3 text-sm">
                      <span className={`status-badge ${statusBadge(claim.status)}`}>
                        {statusLabels[claim.status] || claim.status}
                      </span>
                    </td>
                    <td className="p-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {claim.created_at?.split('T')[0]}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
