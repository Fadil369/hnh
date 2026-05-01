'use client'

import { useState, useEffect } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || ''

type Visit = {
  id: number
  patient_name: string
  mrn: string
  visit_type: string
  chief_complaint: string
  diagnosis_code: string
  status: string
  visit_date: string
  provider_name: string
}

type Order = {
  id: number
  patient_name: string
  order_type: string
  order_item: string
  priority: string
  status: string
  order_date: string
}

type LabResult = {
  id: number
  patient_name: string
  test_name: string
  result_value: string
  result_unit: string
  abnormal_flag: string
  status: string
  result_date: string
}

export default function GIVCPage() {
  const [tab, setTab] = useState<'visits' | 'orders' | 'labs' | 'prescriptions'>('visits')
  const [visits, setVisits] = useState<Visit[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [labResults, setLabResults] = useState<LabResult[]>([])
  const [loading, setLoading] = useState(false)
  const [showVisitForm, setShowVisitForm] = useState(false)
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [visitForm, setVisitForm] = useState({ patient_id: '', provider_id: '', visit_type: 'opd', chief_complaint: '' })
  const [orderForm, setOrderForm] = useState({ visit_id: '', patient_id: '', provider_id: '', order_type: 'lab', order_item: '', priority: 'routine' })

  useEffect(() => {
    if (tab === 'visits') fetchVisits()
    if (tab === 'orders') fetchOrders()
    if (tab === 'labs') fetchLabs()
  }, [tab])

  const fetchVisits = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/visits?status=open`)
      const data = await res.json()
      setVisits(data.visits || [])
    } catch { setVisits([]) }
    setLoading(false)
  }

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/orders`)
      const data = await res.json()
      setOrders(data.orders || [])
    } catch { setOrders([]) }
    setLoading(false)
  }

  const fetchLabs = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/lab-results`)
      const data = await res.json()
      setLabResults(data.lab_results || [])
    } catch { setLabResults([]) }
    setLoading(false)
  }

  const createVisit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API}/api/visits`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitForm),
      })
      const data = await res.json()
      if (data.success) { setShowVisitForm(false); fetchVisits() }
    } catch {}
  }

  const createOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API}/api/orders`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderForm),
      })
      const data = await res.json()
      if (data.success) { setShowOrderForm(false); fetchOrders() }
    } catch {}
  }

  const TABS = [
    { id: 'visits', label: 'الزيارات', labelEn: 'Visits', icon: '🏥' },
    { id: 'orders', label: 'الطلبات', labelEn: 'Orders (CPOE)', icon: '📋' },
    { id: 'labs', label: 'نتائج المختبر', labelEn: 'Lab Results', icon: '🔬' },
    { id: 'prescriptions', label: 'الوصفات', labelEn: 'Prescriptions', icon: '💊' },
  ]

  const priorityBadge = (p: string) => {
    const s: Record<string, string> = {
      routine: 'bg-gray-100 text-gray-700',
      urgent: 'bg-orange-100 text-orange-800',
      stat: 'bg-red-100 text-red-800',
    }
    return s[p] || s.routine
  }

  const statusBadge = (s: string) => {
    const m: Record<string, string> = {
      open: 'bg-blue-100 text-blue-800',
      ordered: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      final: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    }
    return m[s] || 'bg-gray-100 text-gray-700'
  }

  const abnormalBadge = (flag: string) => {
    if (!flag || flag === 'N') return ''
    return flag.startsWith('H') ? 'text-red-600 font-bold' : 'text-blue-600 font-bold'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-6 border-l-4 border-emerald-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-3xl">🩺</span>
              <h2 className="text-3xl font-bold">GIVC</h2>
              <span className="text-sm px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Provider Portal</span>
            </div>
            <p className="text-lg">بوابة مقدمي الخدمة الطبية</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Clinical Workstation · Oracle RAD Connected</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowVisitForm(true)} className="btn-primary text-sm">
              + زيارة جديدة
            </button>
            <button onClick={() => setShowOrderForm(true)} className="px-4 py-2 rounded-lg border text-sm" style={{ borderColor: 'var(--border)' }}>
              + طلب جديد
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b" style={{ borderColor: 'var(--border)' }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as typeof tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              tab === t.id
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            {t.icon} {t.label}
            <span className="mr-1 opacity-60 text-xs">({t.labelEn})</span>
          </button>
        ))}
      </div>

      {/* Visit Form */}
      {showVisitForm && (
        <div className="card p-6">
          <h3 className="text-lg font-bold mb-4">زيارة / مقابلة جديدة | New Visit</h3>
          <form onSubmit={createVisit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">رقم المريض</label>
              <input type="text" className="input-field" value={visitForm.patient_id}
                onChange={e => setVisitForm({ ...visitForm, patient_id: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">رقم الطبيب</label>
              <input type="text" className="input-field" value={visitForm.provider_id}
                onChange={e => setVisitForm({ ...visitForm, provider_id: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">نوع الزيارة</label>
              <select className="input-field" value={visitForm.visit_type}
                onChange={e => setVisitForm({ ...visitForm, visit_type: e.target.value })}>
                <option value="opd">عيادة خارجية (OPD)</option>
                <option value="emergency">طوارئ</option>
                <option value="inpatient">دخيل</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">الشكوى الرئيسية</label>
              <input type="text" className="input-field" value={visitForm.chief_complaint}
                onChange={e => setVisitForm({ ...visitForm, chief_complaint: e.target.value })} required />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="btn-primary">فتح الزيارة</button>
              <button type="button" onClick={() => setShowVisitForm(false)} className="px-4 py-2 rounded-lg border" style={{ borderColor: 'var(--border)' }}>إلغاء</button>
            </div>
          </form>
        </div>
      )}

      {/* Order Form */}
      {showOrderForm && (
        <div className="card p-6">
          <h3 className="text-lg font-bold mb-4">طلب طبي جديد (CPOE) | New Order</h3>
          <form onSubmit={createOrder} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">رقم الزيارة</label>
              <input type="text" className="input-field" value={orderForm.visit_id}
                onChange={e => setOrderForm({ ...orderForm, visit_id: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">رقم المريض</label>
              <input type="text" className="input-field" value={orderForm.patient_id}
                onChange={e => setOrderForm({ ...orderForm, patient_id: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">نوع الطلب</label>
              <select className="input-field" value={orderForm.order_type}
                onChange={e => setOrderForm({ ...orderForm, order_type: e.target.value })}>
                <option value="lab">مختبر</option>
                <option value="radiology">أشعة</option>
                <option value="pharmacy">صيدلية</option>
                <option value="procedure">إجراء</option>
                <option value="consultation">استشارة</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">الأولوية</label>
              <select className="input-field" value={orderForm.priority}
                onChange={e => setOrderForm({ ...orderForm, priority: e.target.value })}>
                <option value="routine">روتين</option>
                <option value="urgent">عاجل</option>
                <option value="stat">إسعاف</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">الطلب / الإجراء</label>
              <input type="text" className="input-field" value={orderForm.order_item}
                onChange={e => setOrderForm({ ...orderForm, order_item: e.target.value })} required />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" className="btn-primary">إنشاء الطلب</button>
              <button type="button" onClick={() => setShowOrderForm(false)} className="px-4 py-2 rounded-lg border" style={{ borderColor: 'var(--border)' }}>إلغاء</button>
            </div>
          </form>
        </div>
      )}

      {/* Tab Content */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="p-12 text-center" style={{ color: 'var(--text-secondary)' }}>جاري التحميل...</div>
        ) : tab === 'visits' ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}>
                  <th className="p-3 text-right text-sm font-medium">المريض</th>
                  <th className="p-3 text-right text-sm font-medium">الرقم الطبي</th>
                  <th className="p-3 text-right text-sm font-medium">النوع</th>
                  <th className="p-3 text-right text-sm font-medium">الشكوى</th>
                  <th className="p-3 text-right text-sm font-medium">الطبيب</th>
                  <th className="p-3 text-right text-sm font-medium">الحالة</th>
                  <th className="p-3 text-right text-sm font-medium">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {visits.length === 0 ? (
                  <tr><td colSpan={7} className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>لا توجد زيارات مفتوحة</td></tr>
                ) : visits.map(v => (
                  <tr key={v.id} className="border-b hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 transition-colors" style={{ borderColor: 'var(--border)' }}>
                    <td className="p-3 text-sm font-medium">{v.patient_name || `#${v.id}`}</td>
                    <td className="p-3 text-sm font-mono text-xs">{v.mrn}</td>
                    <td className="p-3 text-sm">{v.visit_type}</td>
                    <td className="p-3 text-sm">{v.chief_complaint}</td>
                    <td className="p-3 text-sm">{v.provider_name}</td>
                    <td className="p-3">
                      <span className={`status-badge text-xs ${statusBadge(v.status)}`}>{v.status}</span>
                    </td>
                    <td className="p-3 text-sm" style={{ color: 'var(--text-secondary)' }}>{v.visit_date?.split('T')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : tab === 'orders' ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}>
                  <th className="p-3 text-right text-sm font-medium">المريض</th>
                  <th className="p-3 text-right text-sm font-medium">النوع</th>
                  <th className="p-3 text-right text-sm font-medium">الطلب</th>
                  <th className="p-3 text-right text-sm font-medium">الأولوية</th>
                  <th className="p-3 text-right text-sm font-medium">الحالة</th>
                  <th className="p-3 text-right text-sm font-medium">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr><td colSpan={6} className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>لا توجد طلبات</td></tr>
                ) : orders.map(o => (
                  <tr key={o.id} className="border-b" style={{ borderColor: 'var(--border)' }}>
                    <td className="p-3 text-sm">{o.patient_name || `#${o.id}`}</td>
                    <td className="p-3 text-sm">{o.order_type}</td>
                    <td className="p-3 text-sm font-medium">{o.order_item}</td>
                    <td className="p-3">
                      <span className={`status-badge text-xs ${priorityBadge(o.priority)}`}>{o.priority}</span>
                    </td>
                    <td className="p-3">
                      <span className={`status-badge text-xs ${statusBadge(o.status)}`}>{o.status}</span>
                    </td>
                    <td className="p-3 text-sm" style={{ color: 'var(--text-secondary)' }}>{o.order_date?.split('T')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : tab === 'labs' ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}>
                  <th className="p-3 text-right text-sm font-medium">المريض</th>
                  <th className="p-3 text-right text-sm font-medium">الاختبار</th>
                  <th className="p-3 text-right text-sm font-medium">النتيجة</th>
                  <th className="p-3 text-right text-sm font-medium">الوحدة</th>
                  <th className="p-3 text-right text-sm font-medium">الحالة</th>
                  <th className="p-3 text-right text-sm font-medium">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {labResults.length === 0 ? (
                  <tr><td colSpan={6} className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>لا توجد نتائج</td></tr>
                ) : labResults.map(lr => (
                  <tr key={lr.id} className="border-b" style={{ borderColor: 'var(--border)' }}>
                    <td className="p-3 text-sm">{lr.patient_name}</td>
                    <td className="p-3 text-sm font-medium">{lr.test_name}</td>
                    <td className={`p-3 text-sm font-mono ${abnormalBadge(lr.abnormal_flag)}`}>
                      {lr.result_value} {lr.abnormal_flag && lr.abnormal_flag !== 'N' && `(${lr.abnormal_flag})`}
                    </td>
                    <td className="p-3 text-sm">{lr.result_unit}</td>
                    <td className="p-3">
                      <span className={`status-badge text-xs ${statusBadge(lr.status)}`}>{lr.status}</span>
                    </td>
                    <td className="p-3 text-sm" style={{ color: 'var(--text-secondary)' }}>{lr.result_date?.split('T')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>
            <div className="text-4xl mb-4">💊</div>
            <p>الوصفات الطبية — Prescriptions</p>
            <a href="/prescriptions" className="btn-primary mt-4 inline-block text-sm">عرض الوصفات</a>
          </div>
        )}
      </div>
    </div>
  )
}
