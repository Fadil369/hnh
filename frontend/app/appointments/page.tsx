'use client'

import { useState, useEffect } from 'react'

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([])
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success) {
        alert('تم حجز الموعد بنجاح | Appointment booked successfully')
        setShowForm(false)
        fetchAppointments()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">المواعيد | Appointments</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + حجز موعد جديد
        </button>
      </div>

      {/* Date Selector */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex gap-4 items-center">
          <label className="font-medium">التاريخ:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />
          <button
            onClick={fetchAppointments}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            عرض المواعيد
          </button>
        </div>
      </div>

      {/* Booking Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">حجز موعد جديد | New Appointment</h3>
          <form onSubmit={createAppointment} className="grid grid-cols-1 md:grid-cols-2 gap-4" dir="rtl">
            <div>
              <label className="block text-sm font-medium mb-1">رقم المريض</label>
              <input
                type="text"
                value={formData.patient_id}
                onChange={(e) => setFormData({...formData, patient_id: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">الطبيب</label>
              <select
                value={formData.provider_id}
                onChange={(e) => setFormData({...formData, provider_id: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
                required
              >
                <option value="">اختر الطبيب</option>
                {providers.map((p: any) => (
                  <option key={p.id} value={p.id}>
                    {p.first_name_en} {p.last_name_en} - {p.specialty}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">التاريخ</label>
              <input
                type="date"
                value={formData.appointment_date}
                onChange={(e) => setFormData({...formData, appointment_date: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">الوقت</label>
              <input
                type="time"
                value={formData.appointment_time}
                onChange={(e) => setFormData({...formData, appointment_time: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">نوع الموعد</label>
              <select
                value={formData.appointment_type}
                onChange={(e) => setFormData({...formData, appointment_type: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="new">موعد جديد</option>
                <option value="follow_up">متابعة</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">سبب الزيارة</label>
              <input
                type="text"
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                حجز الموعد
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Appointments List */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-xl font-bold mb-4">مواعيد اليوم | Today's Appointments</h3>
        {loading ? (
          <p className="text-center text-gray-500">جاري التحميل...</p>
        ) : appointments.length === 0 ? (
          <p className="text-center text-gray-500">لا يوجد مواعيد في هذا التاريخ</p>
        ) : (
          <table className="w-full" dir="rtl">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-right">الوقت</th>
                <th className="p-2 text-right">المريض</th>
                <th className="p-2 text-right">الطبيب</th>
                <th className="p-2 text-right">العيادة</th>
                <th className="p-2 text-right">الحالة</th>
                <th className="p-2 text-right">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt: any) => (
                <tr key={apt.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{apt.appointment_time}</td>
                  <td className="p-2">{apt.patient_name}</td>
                  <td className="p-2">{apt.provider_name}</td>
                  <td className="p-2">{apt.clinic_name}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-sm ${
                      apt.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                      apt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {apt.status === 'scheduled' ? 'مجدول' :
                       apt.status === 'confirmed' ? 'مؤكد' : apt.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <button className="text-blue-600 hover:underline">تأكيد</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
