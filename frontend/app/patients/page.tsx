'use client'

import { useState } from 'react'

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    mrn: '',
    national_id: '',
    first_name_ar: '',
    first_name_en: '',
    last_name_ar: '',
    last_name_en: '',
    full_name_ar: '',
    full_name_en: '',
    date_of_birth: '',
    gender: 'M',
    phone: '',
    email: '',
  })

  const searchPatients = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.API_URL}/api/patients?search=${searchQuery}`)
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
      formData.full_name_ar = `${formData.first_name_ar} ${formData.last_name_ar}`
      formData.full_name_en = `${formData.first_name_en} ${formData.last_name_en}`
      formData.mrn = `MRN-${Date.now()}`
      
      const res = await fetch(`${process.env.API_URL}/api/patients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (data.success) {
        alert('تم تسجيل المريض بنجاح | Patient registered successfully')
        setShowForm(false)
        searchPatients()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">المرضى | Patients</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + تسجيل مريض جديد
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="بحث بالاسم، الرقم، أو الهوية..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2"
            dir="rtl"
          />
          <button
            onClick={searchPatients}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            بحث
          </button>
        </div>
      </div>

      {/* Registration Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">تسجيل مريض جديد | New Patient Registration</h3>
          <form onSubmit={createPatient} className="grid grid-cols-1 md:grid-cols-2 gap-4" dir="rtl">
            <div>
              <label className="block text-sm font-medium mb-1">الاسم الأول (عربي)</label>
              <input
                type="text"
                value={formData.first_name_ar}
                onChange={(e) => setFormData({...formData, first_name_ar: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">الاسم الأول (إنجليزي)</label>
              <input
                type="text"
                value={formData.first_name_en}
                onChange={(e) => setFormData({...formData, first_name_en: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">اسم العائلة (عربي)</label>
              <input
                type="text"
                value={formData.last_name_ar}
                onChange={(e) => setFormData({...formData, last_name_ar: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">اسم العائلة (إنجليزي)</label>
              <input
                type="text"
                value={formData.last_name_en}
                onChange={(e) => setFormData({...formData, last_name_en: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">رقم الهوية الوطنية</label>
              <input
                type="text"
                value={formData.national_id}
                onChange={(e) => setFormData({...formData, national_id: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">تاريخ الميلاد</label>
              <input
                type="date"
                value={formData.date_of_birth}
                onChange={(e) => setFormData({...formData, date_of_birth: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">الجنس</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="M">ذكر</option>
                <option value="F">أنثى</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">رقم الجوال</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                تسجيل المريض
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Patients List */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-xl font-bold mb-4">قائمة المرضى | Patients List</h3>
        {loading ? (
          <p className="text-center text-gray-500">جاري التحميل...</p>
        ) : patients.length === 0 ? (
          <p className="text-center text-gray-500">لا يوجد مرضى مسجلون</p>
        ) : (
          <table className="w-full" dir="rtl">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-right">الرقم</th>
                <th className="p-2 text-right">الاسم</th>
                <th className="p-2 text-right">الهوية</th>
                <th className="p-2 text-right">الجوال</th>
                <th className="p-2 text-right">الجنس</th>
                <th className="p-2 text-right">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient: any) => (
                <tr key={patient.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{patient.mrn}</td>
                  <td className="p-2">{patient.full_name_ar}</td>
                  <td className="p-2">{patient.national_id}</td>
                  <td className="p-2">{patient.phone}</td>
                  <td className="p-2">{patient.gender === 'M' ? 'ذكر' : 'أنثى'}</td>
                  <td className="p-2">
                    <button className="text-blue-600 hover:underline">عرض</button>
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
