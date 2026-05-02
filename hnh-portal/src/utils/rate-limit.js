/**
 * In-memory rate limiter
 * Note: For production across many users, use Durable Objects or KV-based rate limiting.
 */
import { CONFIG } from '../config.js';

const requestCounts = new Map();

export function rateLimit(ip) {
  const now = Date.now();
  const windowStart = now - CONFIG.RATE_LIMIT_WINDOW_MS;

  // Clean stale entries
  for (const [key, entry] of requestCounts) {
    if (entry.timestamp < windowStart) {
      requestCounts.delete(key);
    }
  }

  const entry = requestCounts.get(ip) || { count: 0, timestamp: now };

  // Reset if outside window
  if (entry.timestamp < windowStart) {
    entry.count = 0;
    entry.timestamp = now;
  }

  entry.count++;
  requestCounts.set(ip, entry);

  return entry.count <= CONFIG.RATE_LIMIT_MAX_REQUESTS;
}
