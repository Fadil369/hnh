'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useT } from '@/lib/i18n'
import { useRagDocs, useRagSearch } from '@/hooks/useApi'

const CATEGORY_MAP: Record<string, { ar: string; en: string }> = {
  clinical: { ar: 'سريري', en: 'Clinical' },
  nphies: { ar: 'نفيز', en: 'NPHIES Insurance' },
  'patient-guide': { ar: 'دليل المريض', en: 'Patient Guide' },
  hospitals: { ar: 'المستشفى', en: 'Hospital' },
}

export default function KnowledgePage() {
  const { t, locale } = useT()
  const { data: documents = [], isLoading } = useRagDocs()
  const search = useRagSearch()
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<number | null>(null)
  const [override, setOverride] = useState<any[] | null>(null)

  const categories = useMemo(
    () => Array.from(new Set((documents as any[]).map((d) => d.category))).filter(Boolean),
    [documents],
  )

  const visible = useMemo(() => {
    const list = override ?? documents
    return activeCategory ? (list as any[]).filter((d) => d.category === activeCategory) : list
  }, [override, documents, activeCategory])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) {
      setOverride(null)
      return
    }
    const results = await search.mutateAsync({ query, category: activeCategory ?? undefined })
    setOverride(results)
  }

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 py-10 space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Badge variant="info">Knowledge</Badge>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{t('knowledge.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('knowledge.subtitle')}</p>
        </div>
        <Badge variant="secondary" className="font-mono">{(documents as any[]).length} docs</Badge>
      </header>

      <Card>
        <CardContent className="p-3">
          <form onSubmit={handleSearch} className="flex flex-wrap gap-2">
            <div className="relative flex-1 min-w-[14rem]">
              <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('knowledge.search.placeholder')}
                className="ps-10"
                dir="auto"
              />
            </div>
            <Button type="submit" disabled={search.isPending}>
              {search.isPending ? '…' : 'Search'}
            </Button>
            {override !== null && (
              <Button type="button" variant="outline" onClick={() => { setOverride(null); setQuery('') }}>
                Clear
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeCategory === null ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveCategory(null)}
        >
          {locale === 'ar' ? 'الكل' : 'All'}
        </Button>
        {categories.map((c) => {
          const info = CATEGORY_MAP[c as string] || { ar: c, en: c }
          return (
            <Button
              key={c as string}
              variant={activeCategory === c ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(c as string)}
            >
              {locale === 'ar' ? info.ar : info.en}
            </Button>
          )
        })}
      </div>

      <div className="space-y-3">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-2xl" />)
        ) : (visible as any[]).length === 0 ? (
          <Card><CardContent className="p-10 text-center text-sm text-muted-foreground">{t('knowledge.empty')}</CardContent></Card>
        ) : (
          (visible as any[]).map((doc, index) => {
            const open = expanded === index
            const info = CATEGORY_MAP[doc.category] || { ar: doc.category, en: doc.category }
            return (
              <Card key={`${doc.title}-${index}`}>
                <button
                  type="button"
                  onClick={() => setExpanded(open ? null : index)}
                  className="flex w-full items-center justify-between gap-3 p-4 text-start transition-colors hover:bg-muted/40"
                >
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge variant="info">{locale === 'ar' ? info.ar : info.en}</Badge>
                      {doc.source ? <Badge variant="outline" className="text-xs">{doc.source}</Badge> : null}
                    </div>
                    <h2 className="truncate text-base font-semibold">{doc.title}</h2>
                  </div>
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden border-t"
                    >
                      <pre className="max-h-96 overflow-y-auto whitespace-pre-wrap bg-muted/30 p-4 font-sans text-sm leading-7">
                        {doc.content}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
