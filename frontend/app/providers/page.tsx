'use client'

import { useState, useEffect } from 'react'

export default function ProvidersPage() {
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchProviders() }, [])

  const fetchProviders = async () => {
    try {
      const res = await fetch(`${process.env.API_URL}/api/providers`)
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
      <h2 className="text-3xl font-bold">
        <span>الأطباء</span>
        <span className="text-lg font-normal mr-2" style={{ color: 'var(--text-secondary)' }}>Providers</span>
        {!loading && (
          <span className="text-base font-normal mr-2" style={{ color: 'var(--text-secondary)' }}>
            ({providers.length})
          </span>
        )}
      </h2>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="card p-6 animate-pulse">
              <div className="w-16 h-16 rounded-full mb-4" style={{ backgroundColor: 'var(--border)' }} />
              <div className="h-5 w-2/3 rounded mb-2" style={{ backgroundColor: 'var(--border)' }} />
              <div className="h-4 w-1/2 rounded" style={{ backgroundColor: 'var(--border)' }} />
            </div>
          ))}
        </div>
      ) : providers.length === 0 ? (
        <div className="card p-8 text-center" style={{ color: 'var(--text-secondary)' }}>
          لا يوجد أطباء مسجلون | No providers registered
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider: any) => (
            <div key={provider.id} className="card p-6 hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl" style={{ backgroundColor: 'var(--border)' }}>
                  {provider.gender === 'F' ? '👩‍⚕️' : '👨‍⚕️'}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{provider.first_name_ar} {provider.last_name_ar}</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {provider.first_name_en} {provider.last_name_en}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm border-t pt-3" style={{ borderColor: 'var(--border)' }}>
                <div className="flex justify-between">
                  <span className="font-medium">التخصص:</span>
                  <span>{provider.specialty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">القسم:</span>
                  <span>{provider.department}</span>
                </div>
                {provider.license_number && (
                  <div className="flex justify-between">
                    <span className="font-medium">الترخيص:</span>
                    <span className="font-mono text-xs">{provider.license_number}</span>
                  </div>
                )}
                {provider.email && (
                  <div className="flex justify-between">
                    <span className="font-medium">البريد:</span>
                    <span className="text-xs" dir="ltr">{provider.email}</span>
                  </div>
                )}
              </div>
              <a href="/appointments" className="mt-4 block w-full text-center py-2 rounded-lg btn-primary text-sm">
                📅 حجز موعد
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
