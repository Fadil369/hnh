/**
 * GitHub REST API Integration
 * Embraces GitHub Activity, Feeds, Notifications, Models (AI inference + embeddings)
 * https://docs.github.com/en/rest
 */

import { json } from '../utils/response.js';

const GITHUB_API = 'https://api.github.com';
const GITHUB_MODELS_API = 'https://models.inference.ai.azure.com';
const DEFAULT_ORG = 'Fadil369';
const DEFAULT_REPO = 'hnh';

function githubHeaders(env) {
  const headers = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'HNH-BrainSAIT-OS/9.2',
  };
  if (env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function githubFetch(url, env, init = {}) {
  const res = await fetch(url, {
    ...init,
    headers: { ...githubHeaders(env), ...(init.headers || {}) },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`GitHub API ${res.status}: ${errText}`);
  }
  return res.json();
}

/**
 * GET /api/github/activity
 * Returns recent public events for the org/repo
 */
export async function getGitHubActivity(req, env, ctx, p, url) {
  try {
    const qp = url || new URL(req.url);
    const owner = qp.searchParams.get('owner') || DEFAULT_ORG;
    const repo = qp.searchParams.get('repo') || DEFAULT_REPO;
    const perPage = Math.min(Number(qp.searchParams.get('per_page') || 30), 100);
    const page = Number(qp.searchParams.get('page') || 1);

    const endpoint = repo !== '_org'
      ? `${GITHUB_API}/repos/${owner}/${repo}/events?per_page=${perPage}&page=${page}`
      : `${GITHUB_API}/orgs/${owner}/events?per_page=${perPage}&page=${page}`;

    const events = await githubFetch(endpoint, env);
    const mapped = (Array.isArray(events) ? events : []).map(e => ({
      id: e.id,
      type: e.type,
      actor: { login: e.actor?.login, avatar_url: e.actor?.avatar_url },
      repo: { name: e.repo?.name, url: e.repo?.url },
      payload_summary: summarisePayload(e.type, e.payload),
      created_at: e.created_at,
      public: e.public,
    }));

    return json({ success: true, owner, repo, events: mapped, count: mapped.length });
  } catch (e) {
    console.error('GitHub activity error:', e);
    return json({ success: false, error: e.message }, 502);
  }
}

/**
 * GET /api/github/feeds
 * Returns GitHub activity feed links (ATOM/RSS)
 */
export async function getGitHubFeeds(req, env) {
  try {
    const feeds = await githubFetch(`${GITHUB_API}/feeds`, env);
    return json({ success: true, feeds });
  } catch (e) {
    console.error('GitHub feeds error:', e);
    return json({ success: false, error: e.message }, 502);
  }
}

/**
 * GET /api/github/notifications
 * Returns unread notifications for the authenticated user
 * Requires GITHUB_TOKEN with notifications scope
 */
export async function getGitHubNotifications(req, env, ctx, p, url) {
  if (!env.GITHUB_TOKEN) {
    return json({ success: false, error: 'GITHUB_TOKEN not configured' }, 503);
  }
  try {
    const qp = url || new URL(req.url);
    const all = qp.searchParams.get('all') === 'true';
    const since = qp.searchParams.get('since') || '';
    const perPage = Math.min(Number(qp.searchParams.get('per_page') || 30), 50);

    let endpoint = `${GITHUB_API}/notifications?per_page=${perPage}&all=${all}`;
    if (since) endpoint += `&since=${encodeURIComponent(since)}`;

    const notifications = await githubFetch(endpoint, env);
    const mapped = (Array.isArray(notifications) ? notifications : []).map(n => ({
      id: n.id,
      unread: n.unread,
      reason: n.reason,
      subject: { title: n.subject?.title, type: n.subject?.type, url: n.subject?.url },
      repository: { full_name: n.repository?.full_name, html_url: n.repository?.html_url },
      updated_at: n.updated_at,
    }));

    return json({ success: true, notifications: mapped, count: mapped.length });
  } catch (e) {
    console.error('GitHub notifications error:', e);
    return json({ success: false, error: e.message }, 502);
  }
}

/**
 * POST /api/github/models/chat
 * Proxy to GitHub Models Inference API (marketplace models)
 * Requires GITHUB_TOKEN with models:read scope
 */
export async function githubModelsChat(req, env) {
  if (!env.GITHUB_TOKEN) {
    return json({ success: false, error: 'GITHUB_TOKEN not configured' }, 503);
  }
  try {
    const body = await req.json();
    const { messages, model = 'gpt-4o-mini', max_tokens = 800, temperature = 0.7, stream = false } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return json({ success: false, error: 'messages array is required' }, 400);
    }

    const res = await fetch(`${GITHUB_MODELS_API}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
      },
      body: JSON.stringify({ model, messages, max_tokens, temperature, stream }),
      signal: AbortSignal.timeout(30000),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      return json({ success: false, error: `GitHub Models API error ${res.status}: ${errText}` }, res.status);
    }

    const data = await res.json();
    return json({
      success: true,
      model: data.model || model,
      response: data.choices?.[0]?.message?.content || '',
      usage: data.usage || null,
      finish_reason: data.choices?.[0]?.finish_reason || 'stop',
    });
  } catch (e) {
    console.error('GitHub Models chat error:', e);
    return json({ success: false, error: e.message }, 502);
  }
}

/**
 * POST /api/github/models/embeddings
 * Proxy to GitHub Models Embeddings API
 * Requires GITHUB_TOKEN with models:read scope
 */
export async function githubModelsEmbeddings(req, env) {
  if (!env.GITHUB_TOKEN) {
    return json({ success: false, error: 'GITHUB_TOKEN not configured' }, 503);
  }
  try {
    const body = await req.json();
    const { input, model = 'text-embedding-3-small' } = body;

    if (!input) {
      return json({ success: false, error: 'input is required' }, 400);
    }

    const res = await fetch(`${GITHUB_MODELS_API}/embeddings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
      },
      body: JSON.stringify({ model, input }),
      signal: AbortSignal.timeout(20000),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      return json({ success: false, error: `GitHub Embeddings API error ${res.status}: ${errText}` }, res.status);
    }

    const data = await res.json();
    return json({
      success: true,
      model: data.model || model,
      embeddings: data.data || [],
      usage: data.usage || null,
    });
  } catch (e) {
    console.error('GitHub Models embeddings error:', e);
    return json({ success: false, error: e.message }, 502);
  }
}

/**
 * GET /api/github/repo
 * Returns repository metadata and health
 */
export async function getGitHubRepo(req, env, ctx, p, url) {
  try {
    const qp = url || new URL(req.url);
    const owner = qp.searchParams.get('owner') || DEFAULT_ORG;
    const repo = qp.searchParams.get('repo') || DEFAULT_REPO;

    const [repoData, releases, workflows] = await Promise.allSettled([
      githubFetch(`${GITHUB_API}/repos/${owner}/${repo}`, env),
      githubFetch(`${GITHUB_API}/repos/${owner}/${repo}/releases?per_page=3`, env),
      githubFetch(`${GITHUB_API}/repos/${owner}/${repo}/actions/workflows`, env),
    ]);

    const r = repoData.status === 'fulfilled' ? repoData.value : null;
    const rel = releases.status === 'fulfilled' ? releases.value : [];
    const wf = workflows.status === 'fulfilled' ? workflows.value : null;

    return json({
      success: true,
      repo: r ? {
        name: r.name, full_name: r.full_name, description: r.description,
        html_url: r.html_url, default_branch: r.default_branch,
        stars: r.stargazers_count, forks: r.forks_count, open_issues: r.open_issues_count,
        language: r.language, topics: r.topics, updated_at: r.updated_at,
        license: r.license?.name || null,
      } : null,
      latest_releases: Array.isArray(rel) ? rel.map(r => ({
        tag: r.tag_name, name: r.name, published_at: r.published_at, prerelease: r.prerelease,
      })) : [],
      workflows: wf?.workflows ? wf.workflows.map(w => ({
        id: w.id, name: w.name, state: w.state, path: w.path,
      })) : [],
    });
  } catch (e) {
    console.error('GitHub repo error:', e);
    return json({ success: false, error: e.message }, 502);
  }
}

// --- Helper ---

function summarisePayload(type, payload) {
  if (!payload) return null;
  switch (type) {
    case 'PushEvent':
      return {
        ref: payload.ref,
        commits: (payload.commits || []).map(c => ({ sha: c.sha?.slice(0, 7), message: c.message })),
      };
    case 'PullRequestEvent':
      return { action: payload.action, title: payload.pull_request?.title, number: payload.number };
    case 'IssuesEvent':
      return { action: payload.action, title: payload.issue?.title, number: payload.issue?.number };
    case 'CreateEvent':
      return { ref_type: payload.ref_type, ref: payload.ref };
    case 'DeleteEvent':
      return { ref_type: payload.ref_type, ref: payload.ref };
    case 'ReleaseEvent':
      return { action: payload.action, tag: payload.release?.tag_name, name: payload.release?.name };
    case 'WorkflowRunEvent':
      return { action: payload.action, name: payload.workflow_run?.name, conclusion: payload.workflow_run?.conclusion };
    default:
      return null;
  }
}
