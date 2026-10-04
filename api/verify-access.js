/**
 * Vercel serverless: GET /api/verify-access?access_tier=3|6|9|12&expires=UNIX_TS&token=BASE64URL_HMAC
 * Optional email: when non-blank after trim + lowercase, the payload is
 * `email:access_tier:expires`. When absent or blank, the payload stays
 * `access_tier:expires`.
 * Magic link access verification – HMAC-signed token.
 * Accepted tiers: 3, 6, 9, 12 (corporate12 / Supabase Phase 1). Returns 200 { access_tier } or 400/401.
 * Env: ACCESS_TOKEN_SECRET (shared secret, min 16 chars)
 */
const { normalizeMagicLinkEmail, verifyMagicLink } = require('./lib/magic-link');

const VALID_TIERS = [3, 6, 9, 12];

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
  const email = normalizeMagicLinkEmail(req.query.email);

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

  if (!verifyMagicLink(accessTier, expires, token, secret, email)) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ access_tier: tierNum });
};
