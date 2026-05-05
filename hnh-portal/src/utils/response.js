/**
 * Standardised HTTP response helpers
 */
import { SECURITY_HEADERS } from '../config.js';

/**
 * Approved origins for CORS — healthcare-grade security.
 * Wildcard patterns allow all subdomains of brainsait.org
 */
const ALLOWED_ORIGINS = [
  'https://hnh.brainsait.org',
  'https://telehealth.brainsait.org',
  'https://basma.brainsait.org',
  'https://sbs.elfadil.com',
  'https://bsma.elfadil.com',
  'https://stitch-doctor-dashboard.brainsait-fadil.workers.dev',
  'https://brainsait-realtime-hub.brainsait-fadil.workers.dev',
  'https://nphies-mirror.brainsait-fadil.workers.dev',
  'https://maillinc.brainsait-fadil.workers.dev',
];

/** Suffix match for *.brainsait.org and *.brainsait-fadil.workers.dev */
const ALLOWED_SUFFIXES = [
  '.brainsait.org',
  '.brainsait-fadil.workers.dev',
  '.elfadil.com',
];

/**
 * Validate the request origin and return it if allowed, otherwise null.
 * Falls back to the primary site URL for non-browser / missing origin requests.
 */
export function getAllowedOrigin(requestOrOrigin) {
  const origin = typeof requestOrOrigin === 'string'
    ? requestOrOrigin
    : (requestOrOrigin?.headers?.get('Origin') || '');

  if (!origin) return 'https://hnh.brainsait.org'; // server-to-server / non-browser

  // Exact match
  if (ALLOWED_ORIGINS.includes(origin)) return origin;

  // Suffix match (*.brainsait.org etc)
  try {
    const url = new URL(origin);
    if (url.protocol === 'https:' && ALLOWED_SUFFIXES.some(s => url.hostname.endsWith(s))) {
      return origin;
    }
  } catch { /* invalid origin */ }

  // Development: allow localhost
  if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
    return origin;
  }

  return null; // denied
}

/** Build CORS headers for a given origin */
function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || 'https://hnh.brainsait.org',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Vary': 'Origin',
  };
}

function mergeHeaders(extra = {}, origin) {
  return { ...corsHeaders(origin), ...SECURITY_HEADERS, ...extra };
}

/**
 * JSON success response
 */
export function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: mergeHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      ...extraHeaders,
    }),
  });
}

/**
 * Error response
 */
export function err(message, status = 500, extra = {}) {
  return json({ error: true, message, ...extra }, status);
}

/**
 * HTML page response with caching
 */
export function html(content, status = 200, extraHeaders = {}, cacheSeconds = 0) {
  return new Response(content, {
    status,
    headers: mergeHeaders({
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      ...extraHeaders,
    }),
  });
}

/**
 * Handle CORS preflight requests.
 * Validates origin against the allowlist; rejects unauthorized origins.
 */
export function handleCors(request) {
  const origin = getAllowedOrigin(request);
  if (!origin) {
    return new Response(null, { status: 403, headers: { 'Content-Type': 'text/plain' } });
  }
  return new Response(null, {
    status: 204,
    headers: mergeHeaders({}, origin),
  });
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitize(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

/**
 * Sanitize object fields
 */
export function sanitizeFields(obj, fields) {
  const sanitized = { ...obj };
  for (const field of fields) {
    if (sanitized[field]) sanitized[field] = sanitize(sanitized[field]);
  }
  return sanitized;
}
