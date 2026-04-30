'use client'

import { useState, useEffect } from 'react'

interface RAGDoc {
  title: string
  content: string
  category: string
  source: string
  lang: string
}

const CATEGORY_MAP: Record<string, { labelAr: string, labelEn: string, icon: string }> = {
  'clinical': { labelAr: 'سريري', labelEn: 'Clinical', icon: '🏥' },
  'nphies': { labelAr: 'نفيس', labelEn: 'NPHIES Insurance', icon: '🛡️' },
  'patient-guide': { labelAr: 'دليل المريض', labelEn: 'Patient Guide', icon: '📋' },
  'hospitals': { labelAr: 'المستشفى', labelEn: 'Hospital', icon: '🏨' },
}

export default function KnowledgePage() {
  const [documents, setDocuments] = useState<RAGDoc[]>([])
  const [filtered, setFiltered] = useState<RAGDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [expandedDoc, setExpandedDoc] = useState<number | null>(null)
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.BSMA_API}/basma/rag/documents`)
      const data = await res.json()
      const docs = data?.documents || data?.results || []
      setDocuments(docs)
      setFiltered(docs)
    } catch {
      console.error('Failed to fetch RAG documents')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setFiltered(documents)
      return
    }
    setSearching(true)
    try {
      const res = await fetch(`${process.env.BSMA_API}/basma/rag/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery,
          limit: 20,
          category: activeCategory || undefined,
        }),
      })
      const data = await res.json()
      setFiltered(data?.results || [])
    } catch {
      console.error('Search failed')
    } finally {
      setSearching(false)
    }
  }

  const filterByCategory = (cat: string | null) => {
    setActiveCategory(cat)
    if (!cat) {
      setFiltered(documents)
    } else {
      setFiltered(documents.filter(d => d.category === cat))
    }
  }

  const categories = Array.from(new Set(documents.map(d => d.category))).filter(Boolean)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">قاعدة المعرفة | Knowledge Base</h2>
        <span className="text-sm text-gray-500">{documents.length} وثيقة | documents</span>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="ابحث في قاعدة المعرفة... | Search knowledge base..."
            className="flex-1 border rounded-lg px-4 py-2"
            dir="auto"
          />
          <button
            onClick={handleSearch}
            disabled={searching}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {searching ? '...' : 'بحث'}
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => filterByCategory(null)}
          className={`px-4 py-2 rounded-lg text-sm transition ${
            activeCategory === null ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          الكل | All
        </button>
        {categories.map(cat => {
          const info = CATEGORY_MAP[cat] || { labelAr: cat, labelEn: cat, icon: '📄' }
          return (
            <button
              key={cat}
              onClick={() => filterByCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {info.icon} {info.labelAr} | {info.labelEn}
            </button>
          )
        })}
      </div>

      {/* Documents */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-gray-500">جاري التحميل...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500">لا توجد نتائج</p>
        ) : (
          filtered.map((doc, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md">
              <button
                onClick={() => setExpandedDoc(expandedDoc === i ? null : i)}
                className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition text-right"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {CATEGORY_MAP[doc.category]?.labelAr || doc.category}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                      {doc.source}
                    </span>
                  </div>
                  <h3 className="font-bold mt-1">{doc.title}</h3>
                </div>
                <span className="text-gray-400 ml-2">{expandedDoc === i ? '▲' : '▼'}</span>
              </button>
              {expandedDoc === i && (
                <div className="px-4 pb-4 border-t pt-3">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed max-h-96 overflow-y-auto">
                    {doc.content}
                  </pre>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
