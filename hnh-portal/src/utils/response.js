/**
 * Standardised HTTP response helpers
 */
import { SECURITY_HEADERS } from '../config.js';

/** CORS headers for all API responses */
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function mergeHeaders(extra = {}) {
  return { ...CORS_HEADERS, ...SECURITY_HEADERS, ...extra };
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
 * Handle CORS preflight requests
 */
export function handleCors() {
  return new Response(null, {
    status: 204,
    headers: mergeHeaders(),
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
