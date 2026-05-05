'use client'

import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'https://hnh.brainsait.org'

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([])
  const [providers, setProviders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0])
  const [formData, setFormData] = useState({
    patient_id: '',
    provider_id: '',
    clinic_code: '',
    clinic_name: '',
    appointment_date: '',
    appointment_time: '',
    appointment_type: 'new',
    reason: '',
  })

  useEffect(() => {
    void fetchAppointments()
    void fetchProviders()
  }, [selectedDate])

  const fetchAppointments = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/appointments?date=${selectedDate}`)
      const data = await res.json()
      setAppointments(data.appointments || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchProviders = async () => {
    try {
      const res = await fetch(`${API}/api/providers`)
      const data = await res.json()
      setProviders(data.providers || [])
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const createAppointment = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success) {
        setShowForm(false)
        setFormData({
          patient_id: '',
          provider_id: '',
          clinic_code: '',
          clinic_name: '',
          appointment_date: '',
          appointment_time: '',
          appointment_type: 'new',
          reason: '',
        })
        void fetchAppointments()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const statusBadge = (status: string): CSSProperties => {
    const styles: Record<string, CSSProperties> = {
      scheduled: { backgroundColor: '#fef3c7', color: '#92400e' },
      confirmed: { backgroundColor: '#dcfce7', color: '#166534' },
      completed: { backgroundColor: '#dbeafe', color: '#1d4ed8' },
      cancelled: { backgroundColor: '#fee2e2', color: '#b91c1c' },
    }
    return styles[status] || { backgroundColor: '#e2e8f0', color: '#334155' }
  }

  const statusLabel: Record<string, string> = {
    scheduled: 'مجدول',
    confirmed: 'مؤكد',
    completed: 'مكتمل',
    cancelled: 'ملغي',
  }

  return (
    <div className="space-y-6">
      <section className="panel p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="section-kicker">Appointments</div>
            <h1 className="mt-3 text-2xl font-bold">إدارة المواعيد</h1>
            <p className="text-sm text-muted">Daily appointment view, provider matching, and new booking creation.</p>
          </div>
          <button onClick={() => setShowForm((open) => !open)} className="btn-primary">
            + {showForm ? 'إلغاء' : 'حجز موعد'}
          </button>
        </div>
      </section>

      <section className="panel p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium">التاريخ | Date</span>
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="input-field w-auto" />
          <button onClick={() => void fetchAppointments()} className="btn-success text-sm">📅 عرض</button>
        </div>
      </section>

      {showForm && (
        <section className="panel p-5 md:p-6">
          <div className="mb-5">
            <div className="section-kicker">New Appointment</div>
            <h2 className="mt-3 text-xl font-bold">حجز موعد جديد</h2>
          </div>

          <form onSubmit={createAppointment} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">رقم المريض *</label>
              <input type="text" value={formData.patient_id} onChange={(e) => setFormData({ ...formData, patient_id: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">الطبيب *</label>
              <select value={formData.provider_id} onChange={(e) => setFormData({ ...formData, provider_id: e.target.value })} className="input-field" required>
                <option value="">اختر الطبيب</option>
                {providers.map((provider: any) => (
                  <option key={provider.id} value={provider.id}>{provider.first_name_en} {provider.last_name_en} - {provider.specialty}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">التاريخ *</label>
              <input type="date" value={formData.appointment_date} onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">الوقت *</label>
              <input type="time" value={formData.appointment_time} onChange={(e) => setFormData({ ...formData, appointment_time: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">نوع الموعد</label>
              <select value={formData.appointment_type} onChange={(e) => setFormData({ ...formData, appointment_type: e.target.value })} className="input-field">
                <option value="new">موعد جديد</option>
                <option value="follow_up">متابعة</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">رمز العيادة</label>
              <input type="text" value={formData.clinic_code} onChange={(e) => setFormData({ ...formData, clinic_code: e.target.value })} className="input-field" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium">سبب الزيارة</label>
              <input type="text" value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} className="input-field" />
            </div>
            <div className="md:col-span-2 flex flex-wrap gap-3">
              <button type="submit" className="btn-primary">حجز الموعد</button>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border px-4 py-2" style={{ borderColor: 'var(--border)' }}>إلغاء</button>
            </div>
          </form>
        </section>
      )}

      <section className="panel overflow-hidden">
        <div className="border-b px-5 py-4 md:px-6" style={{ borderColor: 'var(--border)' }}>
          <h2 className="text-lg font-bold">مواعيد {selectedDate}</h2>
          <p className="text-sm text-muted">{appointments.length} appointments scheduled for the selected date.</p>
        </div>

        {loading ? (
          <div className="p-10 text-center text-sm text-muted">جاري التحميل...</div>
        ) : appointments.length === 0 ? (
          <div className="p-10 text-center text-sm text-muted">لا يوجد مواعيد في هذا التاريخ</div>
        ) : (
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
                {appointments
                  .slice()
                  .sort((a: any, b: any) => a.appointment_time?.localeCompare(b.appointment_time))
                  .map((appointment: any) => (
                    <tr key={appointment.id} className="border-t hover:opacity-85" style={{ borderColor: 'var(--border)' }}>
                      <td className="p-3 text-sm font-mono">{appointment.appointment_time?.slice(0, 5)}</td>
                      <td className="p-3 text-sm font-semibold">{appointment.patient_name}</td>
                      <td className="p-3 text-sm">{appointment.clinic_name}</td>
                      <td className="p-3 text-sm">{appointment.appointment_type === 'follow_up' ? 'متابعة' : 'جديد'}</td>
                      <td className="p-3 text-sm">
                        <span className="status-badge" style={statusBadge(appointment.status)}>
                          {statusLabel[appointment.status] || appointment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
