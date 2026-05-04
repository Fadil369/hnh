/**
 * AI Search Route — HNH Portal v9.1.0
 * BrainSAIT AutoRAG Integration
 *
 * Routes:
 *   POST /api/search   → AI-powered answer + sources (aiSearch)
 *   GET  /api/search   → Vector semantic search (?q=query)
 *
 * Uses AutoRAG "brainsait-ai-search" via env.AI binding (Worker AI)
 * Embedding model: @cf/qwen/qwen3-embedding-0.6b (1024 dims, hybrid)
 */

import { json } from '../utils/response.js';

const AUTORAG_NAME = 'brainsait-ai-search';

export async function handleSearch(req, env) {
  try {
    let query = '';
    let mode = 'ai'; // 'ai' | 'vector'

    if (req.method === 'GET') {
      const url = new URL(req.url);
      query = (url.searchParams.get('q') || '').trim();
      mode = url.searchParams.get('mode') || 'vector';
    } else {
      const body = await req.json().catch(() => ({}));
      query = (body.query || body.q || '').trim();
      mode = body.mode || 'ai';
    }

    if (!query || query.length < 2) {
      return json({ success: false, message: 'Query too short — minimum 2 characters' }, 400);
    }

    if (mode === 'ai') {
      // Full AI-powered answer with cited sources
      const result = await env.AI.autorag(AUTORAG_NAME).aiSearch({
        query,
        stream: false,
      });

      return json({
        success: true,
        query,
        mode: 'ai',
        answer: result.response || null,
        sources: (result.data || []).map(d => ({
          id: d.id,
          content: d.content?.slice(0, 500),
          filename: d.filename,
          score: d.score,
        })),
        model: AUTORAG_NAME,
        timestamp: new Date().toISOString(),
      });
    } else {
      // Vector-only similarity search
      const result = await env.AI.autorag(AUTORAG_NAME).search({ query });

      return json({
        success: true,
        query,
        mode: 'vector',
        answer: null,
        sources: (result.data || []).map(d => ({
          id: d.id,
          content: d.content?.slice(0, 500),
          filename: d.filename,
          score: d.score,
        })),
        model: AUTORAG_NAME,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (e) {
    console.error('Search error:', e.message);
    // Graceful degradation — return empty result set, not a 503
    return json({
      success: false,
      message: 'Search temporarily unavailable',
      error: e.message,
      query: '',
    }, 503);
  }
}
