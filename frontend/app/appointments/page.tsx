'use client'

import { useState, useEffect } from 'react'

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([])
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0])
  const [formData, setFormData] = useState({
    patient_id: '', provider_id: '', clinic_code: '', clinic_name: '',
    appointment_date: '', appointment_time: '', appointment_type: 'new', reason: '',
  })

  useEffect(() => {
    fetchAppointments()
    fetchProviders()
  }, [selectedDate])

  const fetchAppointments = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.API_URL}/api/appointments?date=${selectedDate}`)
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
      const res = await fetch(`${process.env.API_URL}/api/providers`)
      const data = await res.json()
      setProviders(data.providers || [])
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const createAppointment = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`${process.env.API_URL}/api/appointments`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success) {
        setShowForm(false)
        setFormData({ patient_id: '', provider_id: '', clinic_code: '', clinic_name: '', appointment_date: '', appointment_time: '', appointment_type: 'new', reason: '' })
        fetchAppointments()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      scheduled: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      confirmed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
      completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    }
    return styles[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
  }
  const statusLabel: Record<string, string> = {
    scheduled: 'مجدول', confirmed: 'مؤكد', completed: 'مكتمل', cancelled: 'ملغي',
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">
          <span>المواعيد</span>
          <span className="text-lg font-normal mr-2" style={{ color: 'var(--text-secondary)' }}>Appointments</span>
        </h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          + {showForm ? 'إلغاء' : 'حجز موعد'}
        </button>
      </div>

      <div className="card p-4">
        <div className="flex gap-3 items-center flex-wrap">
          <span className="font-medium">التاريخ | Date:</span>
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="input-field w-auto" />
          <button onClick={fetchAppointments} className="btn-success text-sm">📅 عرض</button>
        </div>
      </div>

      {showForm && (
        <div className="card p-6">
          <h3 className="text-xl font-bold mb-4">حجز موعد جديد | New Appointment</h3>
          <form onSubmit={createAppointment} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">رقم المريض *</label>
              <input type="text" value={formData.patient_id} onChange={(e) => setFormData({...formData, patient_id: e.target.value})} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">الطبيب *</label>
              <select value={formData.provider_id} onChange={(e) => setFormData({...formData, provider_id: e.target.value})} className="input-field" required>
                <option value="">اختر الطبيب</option>
                {providers.map((p: any) => (
                  <option key={p.id} value={p.id}>{p.first_name_en} {p.last_name_en} - {p.specialty}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">التاريخ *</label>
              <input type="date" value={formData.appointment_date} onChange={(e) => setFormData({...formData, appointment_date: e.target.value})} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">الوقت *</label>
              <input type="time" value={formData.appointment_time} onChange={(e) => setFormData({...formData, appointment_time: e.target.value})} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">نوع الموعد</label>
              <select value={formData.appointment_type} onChange={(e) => setFormData({...formData, appointment_type: e.target.value})} className="input-field">
                <option value="new">موعد جديد</option>
                <option value="follow_up">متابعة</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">رمز العيادة</label>
              <input type="text" value={formData.clinic_code} onChange={(e) => setFormData({...formData, clinic_code: e.target.value})} className="input-field" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">سبب الزيارة</label>
              <input type="text" value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} className="input-field" />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="btn-primary">حجز الموعد</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg border" style={{ borderColor: 'var(--border)' }}>إلغاء</button>
            </div>
          </form>
        </div>
      )}

      <div className="card p-4">
        <h3 className="text-lg font-bold mb-4">
          مواعيد {selectedDate}
          <span className="text-sm font-normal mr-2" style={{ color: 'var(--text-secondary)' }}>
            {appointments.length} موعد
          </span>
        </h3>
        {loading ? (
          <p className="text-center py-8" style={{ color: 'var(--text-secondary)' }}>جاري التحميل...</p>
        ) : appointments.length === 0 ? (
          <p className="text-center py-8" style={{ color: 'var(--text-secondary)' }}>لا يوجد مواعيد في هذا التاريخ</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}>
                  <th className="p-3 text-right text-sm font-medium">الوقت</th>
                  <th className="p-3 text-right text-sm font-medium">المريض</th>
                  <th className="p-3 text-right text-sm font-medium">العيادة</th>
                  <th className="p-3 text-right text-sm font-medium">النوع</th>
                  <th className="p-3 text-right text-sm font-medium">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {appointments.sort((a: any, b: any) => a.appointment_time?.localeCompare(b.appointment_time)).map((apt: any) => (
                  <tr key={apt.id} className="border-b hover:opacity-80 transition-opacity" style={{ borderColor: 'var(--border)' }}>
                    <td className="p-3 text-sm font-mono">{apt.appointment_time?.slice(0, 5)}</td>
                    <td className="p-3 text-sm font-medium">{apt.patient_name}</td>
                    <td className="p-3 text-sm">{apt.clinic_name}</td>
                    <td className="p-3 text-sm">{apt.appointment_type === 'follow_up' ? 'متابعة' : 'جديد'}</td>
                    <td className="p-3 text-sm">
                      <span className={`status-badge ${statusBadge(apt.status)}`}>
                        {statusLabel[apt.status] || apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
