'use client'

import { useState, useEffect } from 'react'

interface Stats {
  patients: number
  appointments: number
  providers: number
  departments: number
}

export default function Home() {
  const [stats, setStats] = useState<Stats>({ patients: 0, appointments: 0, providers: 0, departments: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [patients, appointments, providers, departments] = await Promise.all([
        fetch(`${process.env.API_URL}/api/patients`).then(r => r.json()),
        fetch(`${process.env.API_URL}/api/appointments`).then(r => r.json()),
        fetch(`${process.env.API_URL}/api/providers`).then(r => r.json()),
        fetch(`${process.env.API_URL}/api/departments`).then(r => r.json()),
      ])
      setStats({
        patients: patients.patients?.length || 0,
        appointments: appointments.appointments?.length || 0,
        providers: providers.providers?.length || 0,
        departments: departments.departments?.length || 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-l from-blue-600 to-blue-800 text-white rounded-lg p-8">
        <h2 className="text-4xl font-bold mb-4">مرحباً بكم في مستشفى حيات الوطني</h2>
        <p className="text-xl">بوابة خدمات المرضى - فرع غرنطا</p>
        <p className="mt-2 text-blue-200">Hayat National Hospital - Gharnata Branch Patient Portal</p>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-4xl font-bold text-blue-600">{loading ? '...' : stats.patients}</div>
          <div className="text-gray-600 mt-2">المرضى المسجلون</div>
          <div className="text-sm text-gray-400">Registered Patients</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-4xl font-bold text-green-600">{loading ? '...' : stats.appointments}</div>
          <div className="text-gray-600 mt-2">المواعيد اليوم</div>
          <div className="text-sm text-gray-400">Today's Appointments</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-4xl font-bold text-purple-600">{loading ? '...' : stats.providers}</div>
          <div className="text-gray-600 mt-2">الأطباء</div>
          <div className="text-sm text-gray-400">Providers</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-4xl font-bold text-orange-600">{loading ? '...' : stats.departments}</div>
          <div className="text-gray-600 mt-2">الأقسام</div>
          <div className="text-sm text-gray-400">Departments</div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold mb-4">خدمات سريعة | Quick Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/appointments" className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg text-center transition">
            <div className="text-3xl mb-2">📅</div>
            <div className="font-bold">حجز موعد</div>
            <div className="text-sm text-gray-500">Book Appointment</div>
          </a>
          <a href="/patients" className="bg-green-50 hover:bg-green-100 p-4 rounded-lg text-center transition">
            <div className="text-3xl mb-2">👤</div>
            <div className="font-bold">بحث عن مريض</div>
            <div className="text-sm text-gray-500">Search Patient</div>
          </a>
          <a href="/providers" className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg text-center transition">
            <div className="text-3xl mb-2">👨‍⚕️</div>
            <div className="font-bold">البحث عن طبيب</div>
            <div className="text-sm text-gray-500">Find Doctor</div>
          </a>
        </div>
      </section>

      {/* Departments */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold mb-4">الأقسام الطبية | Departments</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {['طوارئ', 'باطنية', 'جراحة', 'عظام', 'أطفال', 'نساء', 'قلب', 'جلدية', 'أسنان', 'عيون'].map((dept) => (
            <div key={dept} className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg text-center cursor-pointer transition">
              {dept}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
