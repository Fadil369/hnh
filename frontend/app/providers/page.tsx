'use client'

import { useState, useEffect } from 'react'

export default function ProvidersPage() {
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProviders()
  }, [])

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
      <h2 className="text-3xl font-bold">الأطباء | Providers</h2>

      {loading ? (
        <p className="text-center text-gray-500">جاري التحميل...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider: any) => (
            <div key={provider.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4 space-x-reverse mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨‍⚕️</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    {provider.first_name_ar} {provider.last_name_ar}
                  </h3>
                  <p className="text-gray-500">
                    {provider.first_name_en} {provider.last_name_en}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">التخصص:</span> {provider.specialty}</p>
                <p><span className="font-medium">القسم:</span> {provider.department}</p>
                <p><span className="font-medium">رقم الترخيص:</span> {provider.license_number}</p>
              </div>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                حجز موعد
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
