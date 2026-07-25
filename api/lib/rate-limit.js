/**
 * In-memory sliding-window rate limit for Vercel api/* handlers (per instance).
 * Over limit → 429 + Retry-After. Fail-open on unexpected errors.
 * Multi-instance upgrade path: @upstash/ratelimit (see docs/security.md).
 */

const buckets = new Map();

function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff.trim()) {
    return xff.split(',')[0].trim();
  }
  if (Array.isArray(xff) && xff[0]) {
    return String(xff[0]).split(',')[0].trim();
  }
  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.trim()) {
    return realIp.trim();
  }
  return req.socket?.remoteAddress || req.connection?.remoteAddress || 'unknown';
}

/**
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 * @param {{ key: string, limit: number, windowSec?: number }} opts
 * @returns {boolean} true if request may proceed; false if 429 already sent
 */
function rateLimit(req, res, { key, limit, windowSec = 60 }) {
  try {
    const ip = getClientIp(req);
    const bucketKey = `${key}:${ip}`;
    const now = Date.now();
    const windowMs = windowSec * 1000;
    let timestamps = buckets.get(bucketKey);
    if (!timestamps) {
      timestamps = [];
      buckets.set(bucketKey, timestamps);
    }
    const cutoff = now - windowMs;
    while (timestamps.length && timestamps[0] <= cutoff) {
      timestamps.shift();
    }
    if (timestamps.length >= limit) {
      const retryAfterSec = Math.max(1, Math.ceil((timestamps[0] + windowMs - now) / 1000));
      res.setHeader('Retry-After', String(retryAfterSec));
      res.status(429).json({ detail: 'Too many requests' });
      return false;
    }
    timestamps.push(now);
    return true;
  } catch (e) {
    console.error('rateLimit fail-open:', e.message);
    return true;
  }
}

module.exports = { rateLimit, getClientIp };
