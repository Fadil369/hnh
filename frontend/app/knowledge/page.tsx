'use client'

import { useEffect, useState } from 'react'

interface RAGDoc {
  title: string
  content: string
  category: string
  source: string
  lang: string
}

const BSMA_API = process.env.NEXT_PUBLIC_BSMA_API || process.env.BSMA_API || 'https://bsma.elfadil.com'

const CATEGORY_MAP: Record<string, { labelAr: string; labelEn: string; icon: string }> = {
  clinical: { labelAr: 'سريري', labelEn: 'Clinical', icon: '🏥' },
  nphies: { labelAr: 'نفيز', labelEn: 'NPHIES Insurance', icon: '🛡️' },
  'patient-guide': { labelAr: 'دليل المريض', labelEn: 'Patient Guide', icon: '📋' },
  hospitals: { labelAr: 'المستشفى', labelEn: 'Hospital', icon: '🏨' },
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
    void fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BSMA_API}/basma/rag/documents`)
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
      const next = activeCategory ? documents.filter((doc) => doc.category === activeCategory) : documents
      setFiltered(next)
      return
    }

    setSearching(true)
    try {
      const res = await fetch(`${BSMA_API}/basma/rag/search`, {
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

  const filterByCategory = (category: string | null) => {
    setActiveCategory(category)
    if (!category) {
      setFiltered(documents)
      return
    }
    setFiltered(documents.filter((doc) => doc.category === category))
  }

  const categories = Array.from(new Set(documents.map((doc) => doc.category))).filter(Boolean)

  return (
    <div className="space-y-6">
      <section className="panel p-5 md:p-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="section-kicker">Knowledge Base</div>
            <h1 className="mt-3 text-2xl font-bold">قاعدة المعرفة</h1>
            <p className="text-sm text-muted">Search Basma RAG knowledge across clinical, patient, and NPHIES content.</p>
          </div>
          <div className="status-pill">{documents.length} documents</div>
        </div>
      </section>

      <section className="panel p-5 md:p-6">
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && void handleSearch()}
            placeholder="ابحث في قاعدة المعرفة... | Search knowledge base..."
            className="input-field"
            dir="auto"
          />
          <button onClick={() => void handleSearch()} disabled={searching} className="btn-success">
            {searching ? 'جاري البحث...' : 'بحث'}
          </button>
        </div>
      </section>

      <section className="panel p-5 md:p-6">
        <div className="mb-4">
          <div className="section-kicker">Categories</div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => filterByCategory(null)} className="rounded-full px-4 py-2 text-sm font-semibold" style={activeCategory === null ? { backgroundColor: 'var(--primary)', color: 'white' } : { backgroundColor: 'var(--surface-muted)', color: 'var(--text)', border: '1px solid var(--border)' }}>
            الكل · All
          </button>
          {categories.map((category) => {
            const info = CATEGORY_MAP[category] || { labelAr: category, labelEn: category, icon: '📄' }
            return (
              <button key={category} onClick={() => filterByCategory(category)} className="rounded-full px-4 py-2 text-sm font-semibold" style={activeCategory === category ? { backgroundColor: 'var(--primary)', color: 'white' } : { backgroundColor: 'var(--surface-muted)', color: 'var(--text)', border: '1px solid var(--border)' }}>
                {info.icon} {info.labelAr} · {info.labelEn}
              </button>
            )
          })}
        </div>
      </section>

      <section className="space-y-4">
        {loading ? (
          <div className="panel p-10 text-center text-sm text-muted">جاري التحميل...</div>
        ) : filtered.length === 0 ? (
          <div className="panel p-10 text-center text-sm text-muted">لا توجد نتائج</div>
        ) : (
          filtered.map((doc, index) => (
            <div key={`${doc.title}-${index}`} className="panel overflow-hidden">
              <button
                onClick={() => setExpandedDoc(expandedDoc === index ? null : index)}
                className="flex w-full items-center justify-between p-5 text-right hover:opacity-90"
              >
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="status-pill">{CATEGORY_MAP[doc.category]?.labelAr || doc.category}</span>
                    <span className="status-pill">{doc.source}</span>
                  </div>
                  <h2 className="text-lg font-bold">{doc.title}</h2>
                </div>
                <span className="text-muted">{expandedDoc === index ? '▲' : '▼'}</span>
              </button>
              {expandedDoc === index && (
                <div className="border-t px-5 pb-5 pt-4" style={{ borderColor: 'var(--border)' }}>
                  <pre className="max-h-96 overflow-y-auto whitespace-pre-wrap rounded-2xl p-4 font-sans text-sm leading-7" style={{ backgroundColor: 'var(--surface-muted)', color: 'var(--text)' }}>
                    {doc.content}
                  </pre>
                </div>
              )}
            </div>
          ))
        )}
      </section>
    </div>
  )
}
