'use client'

import { useEffect, useState, useCallback } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || 'https://hnh.brainsait.org'

interface GitHubEvent {
  id: string
  type: string
  actor: { login: string; avatar_url: string }
  repo: { name: string; url: string }
  payload_summary: Record<string, unknown> | null
  created_at: string
  public: boolean
}

interface GitHubRepo {
  name: string
  full_name: string
  description: string
  html_url: string
  stars: number
  forks: number
  open_issues: number
  language: string
  topics: string[]
  updated_at: string
}

interface WorkflowInfo {
  id: number
  name: string
  state: string
  path: string
}

interface Notification {
  id: string
  unread: boolean
  reason: string
  subject: { title: string; type: string; url: string }
  repository: { full_name: string; html_url: string }
  updated_at: string
}

function eventIcon(type: string) {
  const icons: Record<string, string> = {
    PushEvent: '📤',
    PullRequestEvent: '🔀',
    IssuesEvent: '🐛',
    CreateEvent: '✨',
    DeleteEvent: '🗑️',
    ReleaseEvent: '🚀',
    WorkflowRunEvent: '⚙️',
    ForkEvent: '🍴',
    WatchEvent: '⭐',
    IssueCommentEvent: '💬',
    PullRequestReviewEvent: '👁️',
    PullRequestReviewCommentEvent: '💬',
    CommitCommentEvent: '💬',
    MemberEvent: '👤',
    PublicEvent: '🌐',
  }
  return icons[type] || '📌'
}

function eventLabel(type: string) {
  return type.replace('Event', '').replace(/([A-Z])/g, ' $1').trim()
}

function timeAgo(iso: string) {
  const d = new Date(iso)
  const diff = Math.floor((Date.now() - d.getTime()) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

function notificationIcon(reason: string) {
  const icons: Record<string, string> = {
    assign: '👤', author: '✍️', comment: '💬', ci_activity: '⚙️',
    invitation: '📨', mention: '📢', review_requested: '👁️',
    security_alert: '🔐', state_change: '🔄', subscribed: '🔔',
    team_mention: '👥',
  }
  return icons[reason] || '🔔'
}

export default function GitHubPage() {
  const [events, setEvents] = useState<GitHubEvent[]>([])
  const [repo, setRepo] = useState<GitHubRepo | null>(null)
  const [workflows, setWorkflows] = useState<WorkflowInfo[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'activity' | 'repo' | 'notifications'>('activity')
  const [error, setError] = useState<string | null>(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [evRes, repoRes, notifRes] = await Promise.allSettled([
        fetch(`${API}/api/github/activity`).then(r => r.json()),
        fetch(`${API}/api/github/repo`).then(r => r.json()),
        fetch(`${API}/api/github/notifications`).then(r => r.json()),
      ])

      if (evRes.status === 'fulfilled' && evRes.value.success) {
        setEvents(evRes.value.events || [])
      }
      if (repoRes.status === 'fulfilled' && repoRes.value.success) {
        setRepo(repoRes.value.repo)
        setWorkflows(repoRes.value.workflows || [])
      }
      if (notifRes.status === 'fulfilled' && notifRes.value.success) {
        setNotifications(notifRes.value.notifications || [])
      }
    } catch (e) {
      setError('Failed to load GitHub data. Check API connectivity.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void fetchAll() }, [fetchAll])

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="panel-hero px-6 py-7 text-white md:px-8">
        <div className="subtle-grid" />
        <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="section-kicker border border-white/10 bg-white/10 text-white">
              🐙 GitHub Integration
            </div>
            <h1 className="mt-4 text-3xl font-bold md:text-4xl">
              منصة GitHub — النشاط والإشعارات والنماذج
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-white/78 md:text-base">
              تابع نشاط المستودع، الإشعارات الفعّالة، وحالة سير العمل — مباشرة عبر واجهة GitHub REST API.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="status-pill border-white/10 bg-white/10 text-white">
              <span className={`h-2.5 w-2.5 rounded-full ${loading ? 'bg-amber-500 animate-pulse' : 'bg-emerald-400'}`} />
              {loading ? 'جارٍ التحديث' : 'مباشر'}
            </span>
            <button
              onClick={() => void fetchAll()}
              className="nav-chip border border-white/10 bg-white/10 text-white"
            >
              <span>🔄</span>
              <span>تحديث</span>
            </button>
            <a
              href="https://github.com/Fadil369/hnh"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-chip border border-white/10 bg-white/10 text-white"
            >
              <span>🐙</span>
              <span>GitHub ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* Error banner */}
      {error && (
        <div className="panel p-4 border border-amber-400/30" style={{ backgroundColor: 'rgba(245,158,11,0.06)' }}>
          <p className="text-sm text-amber-700 dark:text-amber-300">⚠️ {error}</p>
        </div>
      )}

      {/* Repo summary cards */}
      {repo && (
        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="metric-card">
            <div className="text-2xl">⭐</div>
            <div className="metric-value mt-3 text-amber-500">{repo.stars}</div>
            <div className="mt-2 text-xs text-muted">Stars</div>
          </div>
          <div className="metric-card">
            <div className="text-2xl">🍴</div>
            <div className="metric-value mt-3 text-blue-500">{repo.forks}</div>
            <div className="mt-2 text-xs text-muted">Forks</div>
          </div>
          <div className="metric-card">
            <div className="text-2xl">🐛</div>
            <div className="metric-value mt-3 text-rose-500">{repo.open_issues}</div>
            <div className="mt-2 text-xs text-muted">Open Issues</div>
          </div>
          <div className="metric-card">
            <div className="text-2xl">⚙️</div>
            <div className="metric-value mt-3 text-violet-500">{workflows.length}</div>
            <div className="mt-2 text-xs text-muted">Workflows</div>
          </div>
        </section>
      )}

      {/* Workflows */}
      {workflows.length > 0 && (
        <section className="panel p-5">
          <div className="mb-4">
            <div className="section-kicker">CI/CD</div>
            <h2 className="mt-2 text-lg font-bold">سير العمل الآلي</h2>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {workflows.map(wf => (
              <div key={wf.id} className="panel-soft flex items-center gap-3 p-4">
                <span className="text-xl">⚙️</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{wf.name}</p>
                  <p className="text-xs text-muted truncate">{wf.path}</p>
                </div>
                <span
                  className="text-xs font-semibold px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: wf.state === 'active' ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)',
                    color: wf.state === 'active' ? '#059669' : '#d97706',
                  }}
                >
                  {wf.state}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tabs */}
      <section className="panel p-5">
        <div className="mb-5 flex flex-wrap gap-2">
          {(['activity', 'repo', 'notifications'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="rounded-full px-4 py-2 text-sm font-semibold"
              style={activeTab === tab
                ? { backgroundColor: 'var(--primary)', color: 'white' }
                : { backgroundColor: 'var(--surface-muted)', color: 'var(--text)', border: '1px solid var(--border)' }}
            >
              {tab === 'activity' && '📊 النشاط الأخير'}
              {tab === 'repo' && '📁 معلومات المستودع'}
              {tab === 'notifications' && `🔔 الإشعارات ${notifications.length > 0 ? `(${notifications.filter(n => n.unread).length})` : ''}`}
            </button>
          ))}
        </div>

        {/* Activity tab */}
        {activeTab === 'activity' && (
          <div className="space-y-3">
            {loading && (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="panel-soft p-4 animate-pulse">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-current opacity-10" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 rounded bg-current opacity-10 w-3/4" />
                        <div className="h-2 rounded bg-current opacity-10 w-1/2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!loading && events.length === 0 && (
              <p className="text-sm text-muted text-center py-8">
                لا توجد أحداث حديثة. تأكد من ضبط GITHUB_TOKEN في متغيرات البيئة.
              </p>
            )}
            {events.map(ev => (
              <div key={ev.id} className="panel-soft flex items-start gap-4 p-4">
                <div className="flex-shrink-0">
                  {ev.actor.avatar_url ? (
                    <img
                      src={ev.actor.avatar_url}
                      alt={ev.actor.login}
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full text-xl" style={{ backgroundColor: 'var(--surface-strong)' }}>
                      {eventIcon(ev.type)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-semibold text-sm">{ev.actor.login}</span>
                      <span className="text-muted text-sm"> · {eventLabel(ev.type)}</span>
                      <span className="ml-2 text-lg">{eventIcon(ev.type)}</span>
                    </div>
                    <span className="text-xs text-muted flex-shrink-0">{timeAgo(ev.created_at)}</span>
                  </div>
                  <p className="text-xs text-muted mt-1 truncate">{ev.repo.name}</p>
                  {ev.payload_summary && (
                    <div className="mt-2 text-xs text-muted space-y-0.5">
                      {ev.type === 'PushEvent' && Array.isArray((ev.payload_summary as any).commits) && (
                        (ev.payload_summary as any).commits.slice(0, 3).map((c: any) => (
                          <p key={c.sha} className="truncate">
                            <code className="opacity-60">{c.sha}</code> {c.message}
                          </p>
                        ))
                      )}
                      {ev.type === 'PullRequestEvent' && (
                        <p>#{(ev.payload_summary as any).number} — {(ev.payload_summary as any).title}</p>
                      )}
                      {ev.type === 'IssuesEvent' && (
                        <p>#{(ev.payload_summary as any).number} — {(ev.payload_summary as any).title}</p>
                      )}
                      {ev.type === 'ReleaseEvent' && (
                        <p>🚀 {(ev.payload_summary as any).tag} — {(ev.payload_summary as any).name}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Repo tab */}
        {activeTab === 'repo' && repo && (
          <div className="space-y-4">
            <div className="panel-soft p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold">{repo.full_name}</h3>
                  <p className="mt-1 text-sm text-muted">{repo.description}</p>
                </div>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-chip"
                  style={{ backgroundColor: 'var(--surface-strong)', color: 'var(--text)' }}
                >
                  Open ↗
                </a>
              </div>

              {repo.topics && repo.topics.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {repo.topics.map(t => (
                    <span key={t} className="status-pill" style={{ backgroundColor: 'rgba(99,102,241,0.1)', color: '#6366f1' }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 text-sm">
                <div className="panel-soft p-3 text-center">
                  <div className="text-lg">💻</div>
                  <div className="font-semibold mt-1">{repo.language || 'Mixed'}</div>
                  <div className="text-xs text-muted">Language</div>
                </div>
                <div className="panel-soft p-3 text-center">
                  <div className="text-lg">⭐</div>
                  <div className="font-semibold mt-1">{repo.stars}</div>
                  <div className="text-xs text-muted">Stars</div>
                </div>
                <div className="panel-soft p-3 text-center">
                  <div className="text-lg">🍴</div>
                  <div className="font-semibold mt-1">{repo.forks}</div>
                  <div className="text-xs text-muted">Forks</div>
                </div>
                <div className="panel-soft p-3 text-center">
                  <div className="text-lg">🐛</div>
                  <div className="font-semibold mt-1">{repo.open_issues}</div>
                  <div className="text-xs text-muted">Issues</div>
                </div>
              </div>

              <p className="mt-4 text-xs text-muted">
                آخر تحديث: {repo.updated_at ? new Date(repo.updated_at).toLocaleDateString('ar-SA') : 'غير معروف'}
              </p>
            </div>
          </div>
        )}

        {/* Notifications tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-3">
            {loading && (
              <p className="text-sm text-muted text-center py-8">جارٍ تحميل الإشعارات…</p>
            )}
            {!loading && notifications.length === 0 && (
              <p className="text-sm text-muted text-center py-8">
                لا توجد إشعارات. تأكد من ضبط GITHUB_TOKEN مع صلاحية notifications.
              </p>
            )}
            {notifications.map(n => (
              <div
                key={n.id}
                className="panel-soft flex items-start gap-4 p-4"
                style={n.unread ? { borderLeft: '3px solid var(--primary)' } : {}}
              >
                <span className="text-xl flex-shrink-0">{notificationIcon(n.reason)}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold text-sm truncate">{n.subject.title}</p>
                    <span className="text-xs text-muted flex-shrink-0">{timeAgo(n.updated_at)}</span>
                  </div>
                  <p className="text-xs text-muted mt-1">
                    {n.repository.full_name} · {n.subject.type} · {n.reason}
                  </p>
                  {n.unread && (
                    <span className="mt-2 inline-block status-pill text-xs" style={{ backgroundColor: 'rgba(99,102,241,0.1)', color: '#6366f1' }}>
                      غير مقروء
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* GitHub Models info */}
      <section className="panel p-5 md:p-6">
        <div className="mb-5">
          <div className="section-kicker">🤖 GitHub Models</div>
          <h2 className="mt-3 text-xl font-bold">نماذج الذكاء الاصطناعي عبر GitHub</h2>
          <p className="text-sm text-muted mt-2">
            يمكن استخدام نماذج GPT-4o، Llama، Mistral وغيرها مباشرة عبر GitHub Models API — متاحة من خلال نقطة النهاية{' '}
            <code className="text-xs">/api/github/models/chat</code> و{' '}
            <code className="text-xs">/api/github/models/embeddings</code>.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            { icon: '💬', name: 'gpt-4o-mini', desc: 'Fast, efficient chat completions', category: 'Chat' },
            { icon: '🧠', name: 'gpt-4o', desc: 'Flagship multimodal model', category: 'Chat' },
            { icon: '📐', name: 'text-embedding-3-small', desc: 'Compact embeddings for semantic search', category: 'Embeddings' },
          ].map(m => (
            <div key={m.name} className="panel-soft p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{m.icon}</span>
                <div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--surface-strong)', color: 'var(--primary)' }}>{m.category}</span>
                  <p className="font-semibold text-sm mt-2">{m.name}</p>
                  <p className="text-xs text-muted mt-1">{m.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 panel-soft p-4 text-xs text-muted">
          <strong>ملاحظة:</strong> هذه الميزة تتطلب ضبط <code>GITHUB_TOKEN</code> مع صلاحية{' '}
          <code>models:read</code> في متغيرات بيئة Worker.
          <br />
          <a
            href="https://docs.github.com/en/rest/models/inference?apiVersion=2022-11-28"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold"
            style={{ color: 'var(--primary)' }}
          >
            توثيق GitHub Models ↗
          </a>
        </div>
      </section>
    </div>
  )
}
