'use client'

import { useState, useEffect } from 'react'

interface Stats {
  patients: number
  appointments: number
  providers: number
  departments: number
  claims: number
}

export default function Home() {
  const [stats, setStats] = useState<Stats>({ patients: 0, appointments: 0, providers: 0, departments: 0, claims: 0 })
  const [loading, setLoading] = useState(true)
  const [todayDate] = useState(() => new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [patients, appointments, providers, departments, claims] = await Promise.all([
        fetch(`${process.env.API_URL}/api/patients`).then(r => r.json()).catch(() => ({ patients: [] })),
        fetch(`${process.env.API_URL}/api/appointments`).then(r => r.json()).catch(() => ({ appointments: [] })),
        fetch(`${process.env.API_URL}/api/providers`).then(r => r.json()).catch(() => ({ providers: [] })),
        fetch(`${process.env.API_URL}/api/departments`).then(r => r.json()).catch(() => ({ departments: [] })),
        fetch(`${process.env.API_URL}/api/claims`).then(r => r.json()).catch(() => ({ claims: [] })),
      ])
      setStats({
        patients: patients.patients?.length || 0,
        appointments: appointments.appointments?.length || 0,
        providers: providers.providers?.length || 0,
        departments: departments.departments?.length || 0,
        claims: claims.claims?.length || 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { labelAr: 'المرضى المسجلون', labelEn: 'Registered Patients', value: stats.patients, color: 'from-blue-500 to-blue-700', textColor: 'text-blue-600', icon: '👤' },
    { labelAr: 'المواعيد اليوم', labelEn: "Today's Appointments", value: stats.appointments, color: 'from-emerald-500 to-emerald-700', textColor: 'text-emerald-600', icon: '📅' },
    { labelAr: 'الأطباء', labelEn: 'Providers', value: stats.providers, color: 'from-purple-500 to-purple-700', textColor: 'text-purple-600', icon: '👨‍⚕️' },
    { labelAr: 'الأقسام', labelEn: 'Departments', value: stats.departments, color: 'from-orange-500 to-orange-700', textColor: 'text-orange-600', icon: '🏛️' },
    { labelAr: 'المطالبات', labelEn: 'Claims', value: stats.claims, color: 'from-rose-500 to-rose-700', textColor: 'text-rose-600', icon: '📋' },
  ]

  const quickActions = [
    { href: '/appointments', icon: '📅', labelAr: 'حجز موعد', labelEn: 'Book Appointment', color: 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30' },
    { href: '/patients', icon: '👤', labelAr: 'تسجيل مريض', labelEn: 'Register Patient', color: 'bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30' },
    { href: '/providers', icon: '👨‍⚕️', labelAr: 'البحث عن طبيب', labelEn: 'Find Doctor', color: 'bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30' },
    { href: '/claims', icon: '📋', labelAr: 'إنشاء مطالبة', labelEn: 'Create Claim', color: 'bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/30' },
    { href: '/knowledge', icon: '📚', labelAr: 'قاعدة المعرفة', labelEn: 'Knowledge Base', color: 'bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30' },
  ]

  const departments = ['طوارئ', 'باطنية', 'جراحة', 'عظام', 'أطفال', 'نساء', 'قلب', 'جلدية', 'أسنان', 'عيون', 'مسالك', 'مخ وأعصاب']

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="card p-6 gradient-hero text-white border-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-1">مرحباً بكم في مستشفى حيات الوطني</h2>
            <p className="text-lg opacity-90">بوابة خدمات المرضى - فرع غرنطا</p>
            <p className="text-sm opacity-70 mt-1">Hayat National Hospital - Gharnata Branch Patient Portal</p>
          </div>
          <div className="text-left" dir="ltr">
            <p className="text-sm opacity-80">{todayDate}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statCards.map((card, i) => (
          <div key={i} className="card p-4 text-center">
            <div className="text-2xl mb-1">{card.icon}</div>
            <div className={`text-3xl font-bold ${card.textColor}`}>
              {loading ? (
                <span className="inline-block w-12 h-8 rounded animate-pulse" style={{ backgroundColor: 'var(--border)' }} />
              ) : card.value}
            </div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              <div>{card.labelAr}</div>
              <div className="opacity-60">{card.labelEn}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h3 className="text-xl font-bold mb-4">
          <span>خدمات سريعة</span>
          <span className="text-sm font-normal mr-2" style={{ color: 'var(--text-secondary)' }}>Quick Services</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {quickActions.map((action, i) => (
            <a
              key={i}
              href={action.href}
              className={`${action.color} p-4 rounded-xl text-center transition-all hover:scale-[1.02]`}
            >
              <div className="text-3xl mb-2">{action.icon}</div>
              <div className="font-bold text-sm">{action.labelAr}</div>
              <div className="text-xs opacity-60">{action.labelEn}</div>
            </a>
          ))}
        </div>
      </div>

      {/* Departments */}
      <div className="card p-6">
        <h3 className="text-xl font-bold mb-4">
          <span>الأقسام الطبية</span>
          <span className="text-sm font-normal mr-2" style={{ color: 'var(--text-secondary)' }}>Departments</span>
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {departments.map((dept, i) => (
            <div
              key={i}
              className="p-3 rounded-xl text-center text-sm font-medium cursor-pointer transition-all hover:scale-[1.05]"
              style={{ backgroundColor: 'var(--border)' }}
            >
              {dept}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
