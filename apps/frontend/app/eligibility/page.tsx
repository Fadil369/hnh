'use client'

import { useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'https://hnh.brainsait.org'

type EligibilityResult = {
  success?: boolean
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
      const res = await fetch(`${API}/api/eligibility/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      setResult(data)
    } catch {
      setError('فشل الاتصال بخدمة التحقق من الأهلية')
    } finally {
      setLoading(false)
    }
  }

  const eligStatus = result?.eligibility?.status || result?.status
  const isEligible = eligStatus === 'eligible'
  const isPending = eligStatus === 'pending'

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="panel-hero px-6 py-7 text-white md:px-8">
        <div className="subtle-grid" />
        <div className="relative z-10 flex items-start gap-4">
          <div className="text-4xl">✅</div>
          <div>
            <div className="section-kicker border border-white/10 bg-white/10 text-white">Eligibility</div>
            <h1 className="mt-3 text-3xl font-bold">التحقق من الأهلية التأمينية</h1>
            <p className="mt-2 text-sm text-white/80">Insurance eligibility verification powered by the live HNH API layer.</p>
          </div>
        </div>
      </section>

      <section className="panel p-5 md:p-6">
        <div className="mb-5">
          <div className="section-kicker">Verification Form</div>
          <h2 className="mt-3 text-xl font-bold">أدخل بيانات التحقق</h2>
        </div>

        <form onSubmit={checkEligibility} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">رقم الهوية الوطنية / الإقامة</label>
            <input type="text" className="input-field" placeholder="1234567890" value={form.national_id} onChange={(e) => setForm({ ...form, national_id: e.target.value })} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">رقم المريض</label>
            <input type="text" className="input-field" placeholder="P001" value={form.patient_id} onChange={(e) => setForm({ ...form, patient_id: e.target.value })} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">رمز جهة التأمين</label>
            <input type="text" className="input-field" placeholder="INS-001" value={form.payer_id} onChange={(e) => setForm({ ...form, payer_id: e.target.value })} />
          </div>

          {error && <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">⚠️ {error}</div>}

          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? 'جاري التحقق...' : '🔍 التحقق من الأهلية'}
          </button>
        </form>
      </section>

      {result && (
        <section className="panel p-5 md:p-6" style={{ borderColor: isEligible ? '#4ade80' : isPending ? '#f59e0b' : '#f87171' }}>
          <div className="mb-5 flex items-center gap-4">
            <div className="text-4xl">{isEligible ? '✅' : isPending ? '⏳' : '❌'}</div>
            <div>
              <h2 className="text-xl font-bold">{isEligible ? 'مؤهل للتأمين' : isPending ? 'في الانتظار' : 'غير مؤهل'}</h2>
              <p className="text-sm text-muted">{isEligible ? 'Eligible for coverage' : isPending ? 'Pending verification' : 'Not eligible'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              { label: 'المصدر', labelEn: 'Source', value: result.source },
              { label: 'الحالة', labelEn: 'Status', value: eligStatus },
              { label: 'جهة التأمين', labelEn: 'Payer', value: result.eligibility?.payer_name },
              { label: 'رقم الوثيقة', labelEn: 'Policy No.', value: result.eligibility?.policy_number },
              { label: 'فئة التغطية', labelEn: 'Class', value: result.eligibility?.class_type },
              { label: 'حد التغطية', labelEn: 'Coverage Limit', value: result.eligibility?.coverage_limit?.toString() },
            ].filter((item) => item.value).map((item) => (
              <div key={item.label} className="panel-soft p-4">
                <div className="text-xs text-muted">{item.label} · {item.labelEn}</div>
                <div className="mt-1 text-sm font-semibold">{item.value}</div>
              </div>
            ))}
          </div>

          {(result.note || result.eligibility?.note) && (
            <div className="panel-soft mt-4 p-4 text-sm">
              <span className="font-semibold">ملاحظة: </span>
              {result.note || result.eligibility?.note}
            </div>
          )}
        </section>
      )}

      <section className="panel-soft p-4 text-sm text-muted">
        <p className="mb-2 font-semibold">معلومات الخدمة</p>
        <ul className="list-inside list-disc space-y-1">
          <li>التحقق يتم عبر المسار الحي في `hnh-unified`</li>
          <li>يدعم رقم الهوية أو رقم المريض</li>
          <li>يمكن استخدام رمز الدافع لتقييد التحقق عند الحاجة</li>
        </ul>
      </section>
    </div>
  )
}
