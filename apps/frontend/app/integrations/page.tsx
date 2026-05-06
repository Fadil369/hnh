'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { useT } from '@/lib/i18n'
import { useHealth } from '@/hooks/useApi'

type Category = 'core' | 'government' | 'ai' | 'digital' | 'communication' | 'developer'

interface IntegrationDef {
  key: string
  label: string
  labelAr: string
  category: Category
  path: string[]
}

const INTEGRATIONS: IntegrationDef[] = [
  { key: 'd1', label: 'Cloudflare D1', labelAr: 'كلاودفلير D1', category: 'core', path: ['core', 'd1'] },
  { key: 'kv', label: 'Cloudflare KV', labelAr: 'كلاودفلير KV', category: 'core', path: ['core', 'kv'] },
  { key: 'r2', label: 'Cloudflare R2', labelAr: 'كلاودفلير R2', category: 'core', path: ['core', 'r2'] },
  { key: 'queue', label: 'Cloudflare Queues', labelAr: 'طوابير كلاودفلير', category: 'core', path: ['core', 'queue'] },

  { key: 'nphies', label: 'NPHIES', labelAr: 'نفيز', category: 'government', path: ['government', 'nphies'] },
  { key: 'wasfaty', label: 'Wasfaty', labelAr: 'وصفتي', category: 'government', path: ['government', 'wasfaty'] },
  { key: 'sehhaty', label: 'Sehhaty', labelAr: 'صحتي', category: 'government', path: ['government', 'sehhaty'] },

  { key: 'openai', label: 'OpenAI', labelAr: 'أوبن إيه آي', category: 'ai', path: ['ai', 'openai'] },
  { key: 'anthropic', label: 'Anthropic', labelAr: 'أنثروبيك', category: 'ai', path: ['ai', 'anthropic'] },
  { key: 'azure', label: 'Azure AI', labelAr: 'أزور AI', category: 'ai', path: ['ai', 'azure'] },

  { key: 'fhir', label: 'FHIR R4', labelAr: 'FHIR R4', category: 'digital', path: ['digital', 'fhir'] },
  { key: 'hl7', label: 'HL7 v2', labelAr: 'HL7 v2', category: 'digital', path: ['digital', 'hl7'] },

  { key: 'twilio', label: 'Twilio', labelAr: 'تويليو', category: 'communication', path: ['communication', 'twilio'] },
  { key: 'sendgrid', label: 'SendGrid', labelAr: 'سيند جريد', category: 'communication', path: ['communication', 'sendgrid'] },

  { key: 'github', label: 'GitHub', labelAr: 'جيت هاب', category: 'developer', path: ['developer', 'github'] },
  { key: 'sentry', label: 'Sentry', labelAr: 'سنتري', category: 'developer', path: ['developer', 'sentry'] },
]

function statusOf(value: any): { variant: 'success' | 'destructive' | 'secondary'; icon: typeof CheckCircle2; label: string } {
  if (!value) return { variant: 'secondary', icon: AlertTriangle, label: 'unknown' }
  if (value === true) return { variant: 'success', icon: CheckCircle2, label: 'online' }
  if (typeof value === 'string') {
    if (/healthy|online|ok|connected|active/i.test(value)) return { variant: 'success', icon: CheckCircle2, label: value }
    if (/degraded|warn/i.test(value)) return { variant: 'secondary', icon: AlertTriangle, label: value }
    return { variant: 'destructive', icon: XCircle, label: value }
  }
  if (typeof value === 'object' && 'status' in value) return statusOf(value.status)
  return { variant: 'secondary', icon: AlertTriangle, label: 'unknown' }
}

function pick(obj: any, path: string[]): any {
  return path.reduce((acc, k) => (acc != null ? acc[k] : undefined), obj)
}

export default function IntegrationsPage() {
  const { t, locale } = useT()
  const { data: health, isLoading, refetch, isFetching } = useHealth()
  const [filter, setFilter] = useState<'all' | Category>('all')

  const items = useMemo(() => {
    return INTEGRATIONS.filter((i) => filter === 'all' || i.category === filter).map((i) => {
      const value = health ? pick((health as any).integrations ?? health, i.path) : undefined
      return { ...i, value, status: statusOf(value) }
    })
  }, [filter, health])

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 py-10 space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Badge variant="info">Integrations</Badge>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{t('integrations.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('integrations.subtitle')}</p>
        </div>
        <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
          <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
          {t('integrations.refresh')}
        </Button>
      </header>

      <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
        <TabsList className="flex flex-wrap h-auto">
          <TabsTrigger value="all">{t('integrations.filter.all')}</TabsTrigger>
          <TabsTrigger value="core">{t('integrations.filter.core')}</TabsTrigger>
          <TabsTrigger value="government">{t('integrations.filter.government')}</TabsTrigger>
          <TabsTrigger value="ai">{t('integrations.filter.ai')}</TabsTrigger>
          <TabsTrigger value="digital">{t('integrations.filter.digital')}</TabsTrigger>
          <TabsTrigger value="communication">{t('integrations.filter.communication')}</TabsTrigger>
          <TabsTrigger value="developer">{t('integrations.filter.developer')}</TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} className="h-28" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((i, idx) => {
            const Icon = i.status.icon
            return (
              <motion.div
                key={i.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <CardTitle className="text-base">{locale === 'ar' ? i.labelAr : i.label}</CardTitle>
                        <CardDescription className="capitalize">{i.category}</CardDescription>
                      </div>
                      <Badge variant={i.status.variant}>
                        <Icon className="h-3 w-3" />
                        {i.status.label}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="font-mono text-xs text-muted-foreground break-all">
                      {typeof i.value === 'object'
                        ? JSON.stringify(i.value).slice(0, 160)
                        : String(i.value ?? '—')}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
