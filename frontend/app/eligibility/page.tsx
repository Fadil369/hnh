'use client'

import { useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || ''

type EligibilityResult = {
  status?: string
  source?: string
  note?: string
  eligibility?: {
    status?: string
    payer_name?: string
    policy_number?: string
    class_type?: string
    coverage_limit?: string | number
    note?: string
  }
}

export default function EligibilityPage() {
  const [form, setForm] = useState({ national_id: '', patient_id: '', payer_id: '' })
  const [result, setResult] = useState<EligibilityResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const checkEligibility = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.national_id && !form.patient_id) {
      setError('يرجى إدخال رقم الهوية أو رقم المريض')
      return
    }
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch(`${API}/api/eligibility`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      setResult(data)
    } catch {
      setError('فشل الاتصال بخدمة التحقق من الأهلية')
    }
    setLoading(false)
  }

  const eligStatus = result?.eligibility?.status || result?.status
  const isEligible = eligStatus === 'eligible'
  const isPending = eligStatus === 'pending'

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="card p-6 gradient-hero text-white border-0">
        <div className="flex items-center gap-3">
          <span className="text-3xl">✅</span>
          <div>
            <h2 className="text-2xl font-bold">التحقق من الأهلية التأمينية</h2>
            <p className="opacity-80">Insurance Eligibility Verification · NPHIES + Oracle</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="card p-6">
        <h3 className="text-lg font-bold mb-4">أدخل بيانات التحقق | Enter Verification Details</h3>
        <form onSubmit={checkEligibility} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              رقم الهوية الوطنية / الإقامة <span className="opacity-60">(National ID / Iqama)</span>
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="1234567890"
              value={form.national_id}
              onChange={e => setForm({ ...form, national_id: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              رقم المريض <span className="opacity-60">(Patient ID — optional)</span>
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="HNH-..."
              value={form.patient_id}
              onChange={e => setForm({ ...form, patient_id: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              رمز جهة التأمين <span className="opacity-60">(Payer Code — optional)</span>
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="INS-001"
              value={form.payer_id}
              onChange={e => setForm({ ...form, payer_id: e.target.value })}
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
              ⚠️ {error}
            </div>
          )}

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'جاري التحقق...' : '🔍 التحقق من الأهلية'}
          </button>
        </form>
      </div>

      {/* Result */}
      {result && (
        <div className={`card p-6 border-2 ${
          isEligible ? 'border-green-400' : isPending ? 'border-amber-400' : 'border-red-400'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{isEligible ? '✅' : isPending ? '⏳' : '❌'}</span>
            <div>
              <h3 className="text-xl font-bold">
                {isEligible ? 'مؤهل للتأمين' : isPending ? 'في الانتظار' : 'غير مؤهل'}
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {isEligible ? 'Eligible for Insurance Coverage' : isPending ? 'Pending Verification' : 'Not Eligible'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'المصدر', labelEn: 'Source', value: result.source },
              { label: 'الحالة', labelEn: 'Status', value: eligStatus },
              { label: 'جهة التأمين', labelEn: 'Payer', value: result.eligibility?.payer_name },
              { label: 'رقم الوثيقة', labelEn: 'Policy No.', value: result.eligibility?.policy_number },
              { label: 'فئة التغطية', labelEn: 'Class', value: result.eligibility?.class_type },
              { label: 'حد التغطية', labelEn: 'Coverage Limit', value: result.eligibility?.coverage_limit?.toString() },
            ].filter(item => item.value).map((item, i) => (
              <div key={i}>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.label} | {item.labelEn}</div>
                <div className="text-sm font-medium mt-0.5">{item.value}</div>
              </div>
            ))}
          </div>

          {(result.note || result.eligibility?.note) && (
            <div className="mt-4 p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--bg)' }}>
              <span className="font-medium">ملاحظة: </span>
              {result.note || result.eligibility?.note}
            </div>
          )}
        </div>
      )}

      {/* Info Box */}
      <div className="card p-4 text-sm" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-secondary)' }}>
        <p className="font-medium mb-1">معلومات الخدمة</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>التحقق الفوري عبر Oracle Bridge + NPHIES</li>
          <li>نتائج محفوظة لمدة 24 ساعة (كاش)</li>
          <li>مدعوم بـ: NPHIES Portal · Oracle RAD</li>
        </ul>
      </div>
    </div>
  )
}
