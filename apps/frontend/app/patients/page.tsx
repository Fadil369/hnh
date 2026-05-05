'use client'

import { useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'https://hnh.brainsait.org'

interface PatientForm {
  national_id: string
  first_name_ar: string
  first_name_en: string
  last_name_ar: string
  last_name_en: string
  date_of_birth: string
  gender: string
  phone: string
  email: string
}

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [patients, setPatients] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<PatientForm>({
    national_id: '',
    first_name_ar: '',
    first_name_en: '',
    last_name_ar: '',
    last_name_en: '',
    date_of_birth: '',
    gender: 'M',
    phone: '',
    email: '',
  })

  const searchPatients = async () => {
    if (!searchQuery.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/patients?search=${encodeURIComponent(searchQuery)}`)
      const data = await res.json()
      setPatients(data.patients || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const createPatient = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload = {
        ...formData,
        mrn: `MRN-${Date.now()}`,
        full_name_ar: `${formData.first_name_ar} ${formData.last_name_ar}`,
        full_name_en: `${formData.first_name_en} ${formData.last_name_en}`,
      }
      const res = await fetch(`${API}/api/patients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success) {
        setShowForm(false)
        setFormData({
          national_id: '',
          first_name_ar: '',
          first_name_en: '',
          last_name_ar: '',
          last_name_en: '',
          date_of_birth: '',
          gender: 'M',
          phone: '',
          email: '',
        })
        void searchPatients()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="space-y-6">
      <section className="panel p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="section-kicker">Patient Registry</div>
            <h1 className="mt-3 text-2xl font-bold">إدارة المرضى</h1>
            <p className="text-sm text-muted">Search the registry, review patient records, and create new patient profiles.</p>
          </div>
          <button onClick={() => setShowForm((open) => !open)} className="btn-primary">
            + {showForm ? 'إلغاء' : 'تسجيل مريض'}
          </button>
        </div>
      </section>

      <section className="panel p-5 md:p-6">
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            type="text"
            placeholder="ابحث بالاسم، الرقم الطبي، أو رقم الهوية..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && void searchPatients()}
            className="input-field"
            dir="auto"
          />
          <button onClick={() => void searchPatients()} className="btn-success" disabled={loading}>
            {loading ? 'جاري البحث...' : '🔍 بحث'}
          </button>
        </div>
      </section>

      {showForm && (
        <section className="panel p-5 md:p-6">
          <div className="mb-5">
            <div className="section-kicker">New Patient</div>
            <h2 className="mt-3 text-xl font-bold">تسجيل مريض جديد</h2>
          </div>

          <form onSubmit={createPatient} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">الاسم الأول (عربي) *</label>
              <input type="text" value={formData.first_name_ar} onChange={(e) => setFormData({ ...formData, first_name_ar: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">الاسم الأول (English) *</label>
              <input type="text" value={formData.first_name_en} onChange={(e) => setFormData({ ...formData, first_name_en: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">اسم العائلة (عربي) *</label>
              <input type="text" value={formData.last_name_ar} onChange={(e) => setFormData({ ...formData, last_name_ar: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">اسم العائلة (English) *</label>
              <input type="text" value={formData.last_name_en} onChange={(e) => setFormData({ ...formData, last_name_en: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">رقم الهوية *</label>
              <input type="text" value={formData.national_id} onChange={(e) => setFormData({ ...formData, national_id: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">تاريخ الميلاد *</label>
              <input type="date" value={formData.date_of_birth} onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">الجنس *</label>
              <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="input-field">
                <option value="M">ذكر</option>
                <option value="F">أنثى</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">رقم الجوال *</label>
              <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="input-field" required dir="ltr" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium">البريد الإلكتروني</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="input-field" dir="ltr" />
            </div>
            <div className="md:col-span-2 flex flex-wrap gap-3">
              <button type="submit" className="btn-primary">تسجيل المريض</button>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border px-4 py-2" style={{ borderColor: 'var(--border)' }}>إلغاء</button>
            </div>
          </form>
        </section>
      )}

      <section className="panel overflow-hidden">
        <div className="border-b px-5 py-4 md:px-6" style={{ borderColor: 'var(--border)' }}>
          <h2 className="text-lg font-bold">نتائج البحث</h2>
          <p className="text-sm text-muted">Search results and patient registry records.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr style={{ backgroundColor: 'var(--surface-muted)' }}>
                <th className="p-3 text-right text-sm font-medium">الرقم الطبي</th>
                <th className="p-3 text-right text-sm font-medium">الاسم</th>
                <th className="p-3 text-right text-sm font-medium">الهوية</th>
                <th className="p-3 text-right text-sm font-medium">الجوال</th>
                <th className="p-3 text-right text-sm font-medium">الجنس</th>
                <th className="p-3 text-right text-sm font-medium">العمر</th>
              </tr>
            </thead>
            <tbody>
              {patients.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-sm text-muted">ابحث عن مريض لعرض النتائج</td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-sm text-muted">جاري التحميل...</td>
                </tr>
              )}
              {patients.map((patient: any) => {
                const age = patient.date_of_birth ? Math.floor((Date.now() - new Date(patient.date_of_birth).getTime()) / 31557600000) : ''
                return (
                  <tr key={patient.id} className="border-t hover:opacity-85" style={{ borderColor: 'var(--border)' }}>
                    <td className="p-3 text-sm font-mono">{patient.mrn}</td>
                    <td className="p-3 text-sm font-semibold">{patient.full_name_ar}</td>
                    <td className="p-3 text-sm">{patient.national_id}</td>
                    <td className="p-3 text-sm" dir="ltr">{patient.phone}</td>
                    <td className="p-3 text-sm">{patient.gender === 'M' ? 'ذكر' : 'أنثى'}</td>
                    <td className="p-3 text-sm text-muted">{age ? `${age} سنة` : '-'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
