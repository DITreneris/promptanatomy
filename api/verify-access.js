/**
 * Vercel serverless: GET /api/verify-access?access_tier=3|6&expires=UNIX_TS&token=BASE64URL_HMAC
 * Magic link access verification – HMAC-signed token.
 * Phase 1: only access_tier 3 or 6 accepted. Returns 200 { access_tier } or 400/401.
 * Env: ACCESS_TOKEN_SECRET (shared secret, min 16 chars)
 */
const crypto = require('crypto');

const VALID_TIERS = [3, 6];

const ALLOWED_ORIGINS = [
  process.env.FRONTEND_ORIGIN?.replace(/\/$/, ''),
  process.env.TRAINING_REDIRECT_BASE?.replace(/\/$/, ''),
  'http://localhost:5173',
  'http://127.0.0.1:5173',
].filter(Boolean);

function setCorsHeaders(req, res) {
  const origin = (req.headers.origin || req.headers.referer?.replace(/\/$/, '') || '').trim();
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function base64UrlEncode(buffer) {
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function verifyToken(accessTier, expires, token, secret) {
  const payload = `${accessTier}:${expires}`;
  const expectedHmac = crypto.createHmac('sha256', secret).update(payload).digest();
  const expectedB64 = base64UrlEncode(expectedHmac);
  if (token.length === 0 || token.length !== expectedB64.length) return false;
  return crypto.timingSafeEqual(Buffer.from(token, 'utf8'), Buffer.from(expectedB64, 'utf8'));
}

module.exports = async function handler(req, res) {
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret || secret.length < 16) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const accessTier = (req.query.access_tier || '').trim();
  const expires = (req.query.expires || '').trim();
  const token = (req.query.token || '').trim();

  if (!accessTier || !expires || !token) {
    return res.status(400).json({ error: 'Missing access_tier, expires, or token' });
  }

  const tierNum = parseInt(accessTier, 10);
  if (!Number.isInteger(tierNum) || !VALID_TIERS.includes(tierNum)) {
    return res.status(400).json({ error: 'Invalid access_tier' });
  }

  const expiresNum = parseInt(expires, 10);
  if (!Number.isInteger(expiresNum)) {
    return res.status(400).json({ error: 'Invalid expires' });
  }

  const nowSec = Math.floor(Date.now() / 1000);
  if (nowSec >= expiresNum) {
    return res.status(401).json({ error: 'Link expired' });
  }

  if (!verifyToken(accessTier, expires, token, secret)) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ access_tier: tierNum });
};
