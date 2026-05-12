'use client'

import { motion } from 'framer-motion'
import { GitBranch, Star, GitFork, AlertCircle, Bell, RefreshCw, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { useT } from '@/lib/i18n'
import { useGithubAll } from '@/hooks/useApi'

export default function GithubPage() {
  const { t, locale } = useT()
  const { data, isLoading, refetch, isFetching } = useGithubAll()

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-6 py-10 space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Badge variant="info">GitHub</Badge>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{t('github.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('github.subtitle')}</p>
        </div>
        <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
          <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
          {t('github.refresh')}
        </Button>
      </header>

      <Tabs defaultValue="activity">
        <TabsList>
          <TabsTrigger value="activity">{t('github.tab.activity')}</TabsTrigger>
          <TabsTrigger value="repo">{t('github.tab.repo')}</TabsTrigger>
          <TabsTrigger value="notifications">{t('github.tab.notifications')}</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-3">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-20" />)
          ) : (data?.events ?? []).length === 0 ? (
            <Card><CardContent className="p-10 text-center text-sm text-muted-foreground">
              {locale === 'ar' ? 'لا يوجد نشاط حديث' : 'No recent activity'}
            </CardContent></Card>
          ) : (
            data!.events.slice(0, 30).map((e: any, idx: number) => (
              <motion.div key={e.id ?? idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02 }}>
                <Card>
                  <CardContent className="flex items-center gap-3 p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={e.actor?.avatar_url} alt="" className="h-8 w-8 rounded-full" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        <span className="font-mono">{e.actor?.login}</span>
                        <span className="mx-1 text-muted-foreground">{e.type}</span>
                        <span className="font-mono text-xs text-muted-foreground">{e.repo?.name}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{e.created_at?.split('T').join(' ').split('.')[0]}</p>
                    </div>
                    <Badge variant="outline">{e.type}</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </TabsContent>

        <TabsContent value="repo">
          {isLoading ? (
            <Skeleton className="h-40" />
          ) : !data?.repo ? (
            <Card><CardContent className="p-10 text-center text-sm text-muted-foreground">
              {locale === 'ar' ? 'لا توجد بيانات' : 'No repository data'}
            </CardContent></Card>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-mono text-base">{data.repo.full_name}</CardTitle>
                    <CardDescription>{data.repo.description}</CardDescription>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <a href={data.repo.html_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Open
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <Stat icon={Star} label="Stars" value={data.repo.stars} />
                <Stat icon={GitFork} label="Forks" value={data.repo.forks} />
                <Stat icon={AlertCircle} label="Issues" value={data.repo.open_issues} />
                <Stat icon={GitBranch} label="Lang" value={data.repo.language || '—'} />
              </CardContent>
            </Card>
          )}

          {(data?.workflows ?? []).length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              {data!.workflows.slice(0, 8).map((w: any) => (
                <Card key={w.id ?? w.name}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{w.name}</p>
                      <p className="text-xs text-muted-foreground">{w.state ?? w.status}</p>
                    </div>
                    <Badge variant={w.state === 'active' ? 'success' : 'secondary'}>{w.state ?? '—'}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : null}
        </TabsContent>

        <TabsContent value="notifications" className="space-y-3">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20" />)
          ) : (data?.notifications ?? []).length === 0 ? (
            <Card><CardContent className="p-10 text-center text-sm text-muted-foreground">
              <Bell className="mx-auto mb-3 h-6 w-6" />
              {locale === 'ar' ? 'لا توجد إشعارات' : 'No notifications'}
            </CardContent></Card>
          ) : (
            data!.notifications.map((n: any, idx: number) => (
              <motion.div key={n.id ?? idx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02 }}>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{n.subject?.title}</p>
                        <p className="font-mono text-xs text-muted-foreground">{n.repository?.full_name}</p>
                      </div>
                      {n.unread ? <Badge variant="info">unread</Badge> : <Badge variant="outline">read</Badge>}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground capitalize">{n.reason}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: number | string }) {
  return (
    <div className="rounded-lg border bg-card p-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground"><Icon className="h-3.5 w-3.5" />{label}</div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
    </div>
  )
}
