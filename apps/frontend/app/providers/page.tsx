'use client'

import { useEffect, useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'https://hnh.brainsait.org'

export default function ProvidersPage() {
  const [providers, setProviders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    void fetchProviders()
  }, [])

  const fetchProviders = async () => {
    try {
      const res = await fetch(`${API}/api/providers`)
      const data = await res.json()
      setProviders(data.providers || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <section className="panel p-5 md:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="section-kicker">Providers</div>
            <h1 className="mt-3 text-2xl font-bold">الأطباء ومقدمو الخدمة</h1>
            <p className="text-sm text-muted">Provider directory with specialty, department, and contact context.</p>
          </div>
          {!loading && <div className="status-pill">{providers.length} providers</div>}
        </div>
      </section>

      {loading ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="panel p-6 animate-pulse">
              <div className="mb-4 h-16 w-16 rounded-full" style={{ backgroundColor: 'var(--border)' }} />
              <div className="mb-2 h-5 w-2/3 rounded" style={{ backgroundColor: 'var(--border)' }} />
              <div className="h-4 w-1/2 rounded" style={{ backgroundColor: 'var(--border)' }} />
            </div>
          ))}
        </div>
      ) : providers.length === 0 ? (
        <div className="panel p-10 text-center text-muted">لا يوجد أطباء مسجلون | No providers registered</div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {providers.map((provider: any) => (
            <div key={provider.id} className="panel p-6 hover:-translate-y-0.5">
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full text-2xl" style={{ backgroundColor: 'var(--surface-strong)' }}>
                  {provider.gender === 'F' ? '👩‍⚕️' : '👨‍⚕️'}
                </div>
                <div>
                  <h2 className="text-lg font-bold">{provider.first_name_ar} {provider.last_name_ar}</h2>
                  <p className="text-sm text-muted">{provider.first_name_en} {provider.last_name_en}</p>
                </div>
              </div>

              <div className="space-y-3 border-t pt-4 text-sm" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium">التخصص</span>
                  <span>{provider.specialty}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium">القسم</span>
                  <span>{provider.department}</span>
                </div>
                {provider.license_number && (
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium">الترخيص</span>
                    <span className="font-mono text-xs">{provider.license_number}</span>
                  </div>
                )}
                {provider.email && (
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium">البريد</span>
                    <span className="text-xs text-muted" dir="ltr">{provider.email}</span>
                  </div>
                )}
              </div>

              <a href="/appointments" className="btn-primary mt-5 block text-center text-sm">📅 حجز موعد</a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
