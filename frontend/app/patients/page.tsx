'use client'

import { useState } from 'react'

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    national_id: '', first_name_ar: '', first_name_en: '',
    last_name_ar: '', last_name_en: '',
    date_of_birth: '', gender: 'M', phone: '', email: '',
  })

  const searchPatients = async () => {
    if (!searchQuery.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`${process.env.API_URL}/api/patients?search=${encodeURIComponent(searchQuery)}`)
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
      const res = await fetch(`${process.env.API_URL}/api/patients`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success) {
        setShowForm(false)
        setFormData({ national_id: '', first_name_ar: '', first_name_en: '', last_name_ar: '', last_name_en: '', date_of_birth: '', gender: 'M', phone: '', email: '' })
        searchPatients()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">
          <span>المرضى</span>
          <span className="text-lg font-normal mr-2" style={{ color: 'var(--text-secondary)' }}>Patients</span>
        </h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          + {showForm ? 'إلغاء' : 'تسجيل مريض'}
        </button>
      </div>

      <div className="card p-4">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="ابحث بالاسم، الرقم الطبي، أو الهوية..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchPatients()}
            className="input-field flex-1"
            dir="auto"
          />
          <button onClick={searchPatients} className="btn-success" disabled={loading}>
            {loading ? '...' : '🔍 بحث'}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="card p-6">
          <h3 className="text-xl font-bold mb-4">تسجيل مريض جديد | New Patient Registration</h3>
          <form onSubmit={createPatient} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">الاسم الأول (عربي) *</label>
              <input type="text" value={formData.first_name_ar} onChange={(e) => setFormData({...formData, first_name_ar: e.target.value})} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">الاسم الأول (إنجليزي) *</label>
              <input type="text" value={formData.first_name_en} onChange={(e) => setFormData({...formData, first_name_en: e.target.value})} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">اسم العائلة (عربي) *</label>
              <input type="text" value={formData.last_name_ar} onChange={(e) => setFormData({...formData, last_name_ar: e.target.value})} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">اسم العائلة (إنجليزي) *</label>
              <input type="text" value={formData.last_name_en} onChange={(e) => setFormData({...formData, last_name_en: e.target.value})} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">رقم الهوية *</label>
              <input type="text" value={formData.national_id} onChange={(e) => setFormData({...formData, national_id: e.target.value})} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">تاريخ الميلاد *</label>
              <input type="date" value={formData.date_of_birth} onChange={(e) => setFormData({...formData, date_of_birth: e.target.value})} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">الجنس *</label>
              <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="input-field">
                <option value="M">ذكر</option>
                <option value="F">أنثى</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">رقم الجوال *</label>
              <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="input-field" required />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="btn-primary">تسجيل المريض</button>
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
                <th className="p-3 text-right text-sm font-medium">الرقم</th>
                <th className="p-3 text-right text-sm font-medium">الاسم</th>
                <th className="p-3 text-right text-sm font-medium">الهوية</th>
                <th className="p-3 text-right text-sm font-medium">الجوال</th>
                <th className="p-3 text-right text-sm font-medium">الجنس</th>
                <th className="p-3 text-right text-sm font-medium">العمر</th>
              </tr>
            </thead>
            <tbody>
              {patients.length === 0 && !loading && (
                <tr><td colSpan={6} className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>ابحث عن مريض لعرض النتائج</td></tr>
              )}
              {loading && (
                <tr><td colSpan={6} className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>جاري التحميل...</td></tr>
              )}
              {patients.map((p: any) => {
                const age = p.date_of_birth ? Math.floor((Date.now() - new Date(p.date_of_birth).getTime()) / 31557600000) : ''
                return (
                  <tr key={p.id} className="border-b hover:opacity-80 transition-opacity" style={{ borderColor: 'var(--border)' }}>
                    <td className="p-3 text-sm font-mono">{p.mrn}</td>
                    <td className="p-3 text-sm font-medium">{p.full_name_ar}</td>
                    <td className="p-3 text-sm">{p.national_id}</td>
                    <td className="p-3 text-sm" dir="ltr">{p.phone}</td>
                    <td className="p-3 text-sm">{p.gender === 'M' ? 'ذكر' : 'أنثى'}</td>
                    <td className="p-3 text-sm" style={{ color: 'var(--text-secondary)' }}>{age} سنة</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
