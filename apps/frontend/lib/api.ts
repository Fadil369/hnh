import { z, ZodTypeAny } from 'zod'

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.trim() ||
  process.env.API_URL?.trim() ||
  'https://hnh.brainsait.org'

export class ApiError extends Error {
  status: number
  body?: unknown
  constructor(message: string, status: number, body?: unknown) {
    super(message); this.name = 'ApiError'; this.status = status; this.body = body
  }
}

export interface ApiOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
  body?: unknown
  query?: Record<string, string | number | boolean | undefined | null>
  signal?: AbortSignal
  headers?: Record<string, string>
}

function buildUrl(path: string, query?: ApiOptions['query']) {
  const url = new URL(path.startsWith('http') ? path : `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`)
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v === undefined || v === null || v === '') continue
      url.searchParams.set(k, String(v))
    }
  }
  return url.toString()
}

export async function api<T = unknown>(path: string, opts: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, query, signal, headers } = opts
  const res = await fetch(buildUrl(path, query), {
    method,
    headers: {
      'Accept': 'application/json',
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal,
    credentials: 'omit',
  })
  const text = await res.text()
  let parsed: unknown = undefined
  try { parsed = text ? JSON.parse(text) : undefined } catch { parsed = text }
  if (!res.ok) {
    const message =
      (parsed && typeof parsed === 'object' && 'message' in parsed && typeof (parsed as any).message === 'string')
        ? (parsed as any).message
        : `HTTP ${res.status} ${res.statusText}`
    throw new ApiError(message, res.status, parsed)
  }
  return parsed as T
}

/** Validate API response with a Zod schema, falling back to raw on failure. */
export function safeParse<S extends ZodTypeAny>(schema: S, data: unknown): { data: z.infer<S>; valid: boolean } {
  const result = schema.safeParse(data)
  if (result.success) return { data: result.data, valid: true }
  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
    console.warn('[api] schema mismatch:', result.error.issues.slice(0, 3))
  }
  return { data: data as z.infer<S>, valid: false }
}
