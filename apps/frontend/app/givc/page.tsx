'use client'

import { useEffect, useMemo, useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'https://hnh.brainsait.org'

export default function GIVCPage() {
  const [providers, setProviders] = useState<any[]>([])
  const [appointments, setAppointments] = useState<any[]>([])
  const [health, setHealth] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0])
  const [form, setForm] = useState({ patient_id: '', provider_id: '', complaint: '' })
  const [workflowLoading, setWorkflowLoading] = useState(false)
  const [workflowResult, setWorkflowResult] = useState<any>(null)

  useEffect(() => {
    void loadData()
  }, [selectedDate])

  const loadData = async () => {
    setLoading(true)
    try {
      const [providersRes, appointmentsRes, healthRes] = await Promise.all([
        fetch(`${API}/api/providers`),
        fetch(`${API}/api/appointments?date=${selectedDate}`),
        fetch(`${API}/api/health`),
      ])

      const providersData = await providersRes.json()
      const appointmentsData = await appointmentsRes.json()
      const healthData = await healthRes.json()

      setProviders(providersData.providers || [])
      setAppointments(appointmentsData.appointments || [])
      setHealth(healthData)
    } catch (error) {
      console.error('Failed to load GIVC data', error)
      setProviders([])
      setAppointments([])
      setHealth(null)
    } finally {
      setLoading(false)
    }
  }

  const runClinicalDecision = async (e: React.FormEvent) => {
    e.preventDefault()
    setWorkflowLoading(true)
    setWorkflowResult(null)
    try {
      const res = await fetch(`${API}/api/workflows/provider/clinical-decision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: form.patient_id,
          provider_id: form.provider_id,
          chief_complaint: form.complaint,
        }),
      })
      setWorkflowResult(await res.json())
    } catch (error) {
      console.error('Failed to run provider workflow', error)
      setWorkflowResult({ success: false, error: 'Failed to run workflow' })
    } finally {
      setWorkflowLoading(false)
    }
  }

  const todayScheduled = useMemo(
    () => appointments.filter((item) => item.status === 'scheduled' || item.status === 'confirmed'),
    [appointments]
  )

  return (
    <div className="space-y-6">
      <section className="panel-hero px-6 py-7 text-white md:px-8">
        <div className="subtle-grid" />
        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="section-kicker border border-white/10 bg-white/10 text-white">GIVC Provider Operations</div>
            <h1 className="mt-4 text-3xl font-bold md:text-4xl">بوابة مقدمي الخدمة الطبية</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/80 md:text-base">
              سطح تشغيل موحد للمزودين يتابع شبكة الأطباء، جدول اليوم، ومساعد القرار السريري المرتبط بمسارات الذكاء الاصطناعي.
            </p>
          </div>
          <div className="status-pill border-white/10 bg-white/10 text-white">
            {health?.integrations?.givc_portal?.status || 'connected'} · {health?.stats?.total_providers || providers.length} providers
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="metric-card"><div className="text-2xl">👨‍⚕️</div><div className="metric-value mt-3 text-emerald-600">{loading ? '-' : providers.length}</div><div className="mt-2 text-xs text-muted">Provider directory</div></div>
        <div className="metric-card"><div className="text-2xl">📅</div><div className="metric-value mt-3 text-blue-600">{loading ? '-' : appointments.length}</div><div className="mt-2 text-xs text-muted">Appointments on {selectedDate}</div></div>
        <div className="metric-card"><div className="text-2xl">✅</div><div className="metric-value mt-3 text-violet-600">{loading ? '-' : todayScheduled.length}</div><div className="mt-2 text-xs text-muted">Scheduled or confirmed</div></div>
        <div className="metric-card"><div className="text-2xl">🔗</div><div className="metric-value mt-3 text-amber-600">{health?.integrations?.oracle_bridge === 'connected' ? 'Live' : '-'}</div><div className="mt-2 text-xs text-muted">Oracle bridge status</div></div>
      </section>

      <section className="panel p-5 md:p-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="section-kicker">Today's Schedule</div>
            <h2 className="mt-3 text-xl font-bold">جدول العيادات والزيارات</h2>
          </div>
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="input-field w-auto" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr style={{ backgroundColor: 'var(--surface-muted)' }}>
                <th className="p-3 text-right text-sm font-medium">الوقت</th>
                <th className="p-3 text-right text-sm font-medium">المريض</th>
                <th className="p-3 text-right text-sm font-medium">العيادة</th>
                <th className="p-3 text-right text-sm font-medium">النوع</th>
                <th className="p-3 text-right text-sm font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="p-10 text-center text-sm text-muted">جاري التحميل...</td></tr>
              ) : appointments.length === 0 ? (
                <tr><td colSpan={5} className="p-10 text-center text-sm text-muted">لا توجد مواعيد في هذا اليوم</td></tr>
              ) : (
                appointments.map((item) => (
                  <tr key={item.id} className="border-t" style={{ borderColor: 'var(--border)' }}>
                    <td className="p-3 text-sm font-mono">{item.appointment_time?.slice(0, 5)}</td>
                    <td className="p-3 text-sm font-semibold">{item.patient_name}</td>
                    <td className="p-3 text-sm">{item.clinic_name}</td>
                    <td className="p-3 text-sm">{item.appointment_type}</td>
                    <td className="p-3 text-sm"><span className="status-pill">{item.status}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="panel p-5 md:p-6">
          <div className="mb-5">
            <div className="section-kicker">Provider Directory</div>
            <h2 className="mt-3 text-xl font-bold">شبكة المزودين</h2>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {providers.slice(0, 8).map((provider) => (
              <div key={provider.id} className="panel-soft p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: 'var(--surface-strong)' }}>
                    {provider.gender === 'F' ? '👩‍⚕️' : '👨‍⚕️'}
                  </div>
                  <div>
                    <div className="font-semibold">{provider.first_name_ar} {provider.last_name_ar}</div>
                    <div className="text-xs text-muted">{provider.specialty || 'Provider'}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-5 md:p-6">
          <div className="mb-5">
            <div className="section-kicker">AI Quick Assist</div>
            <h2 className="mt-3 text-xl font-bold">مساعد القرار السريري</h2>
          </div>

          <form onSubmit={runClinicalDecision} className="space-y-3">
            <div>
              <label className="mb-1 block text-sm font-medium">رقم المريض</label>
              <input value={form.patient_id} onChange={(e) => setForm({ ...form, patient_id: e.target.value })} className="input-field" placeholder="P001" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">رقم المزود</label>
              <input value={form.provider_id} onChange={(e) => setForm({ ...form, provider_id: e.target.value })} className="input-field" placeholder="DR001" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">الشكوى الرئيسية</label>
              <input value={form.complaint} onChange={(e) => setForm({ ...form, complaint: e.target.value })} className="input-field" placeholder="chest pain" />
            </div>
            <button type="submit" className="btn-primary w-full" disabled={workflowLoading}>
              {workflowLoading ? 'جاري التحليل...' : 'تشغيل المسار السريري'}
            </button>
          </form>

          {workflowResult && (
            <div className="panel-soft mt-4 p-4 text-sm leading-7">
              {workflowResult.ai_summary || workflowResult.summary || workflowResult.error || JSON.stringify(workflowResult, null, 2)}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
