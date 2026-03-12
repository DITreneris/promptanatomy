/**
 * Vercel serverless: GET /api/success-redirect?session_id=...
 * Returns { redirect_url } for magic-link to training app (access_tier, expires, token).
 * Requires paid Stripe Checkout session.
 * Env: ACCESS_TOKEN_SECRET, STRIPE_SECRET_KEY; optional TRAINING_REDIRECT_BASE, ACCESS_TOKEN_EXPIRY_DAYS
 */
const Stripe = require('stripe');
const crypto = require('crypto');

/** Phase 1: only 3 and 6 (docs/phase-1-scope.md). */
const PHASE1_PLAN_VALUES = [3, 6];

const ALLOWED_ORIGINS = [
  process.env.FRONTEND_ORIGIN?.replace(/\/$/, ''),
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

function base64url(buffer) {
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function buildMagicLinkToken(accessTier, expires, secret) {
  const payload = `${accessTier}:${expires}`;
  const sig = crypto.createHmac('sha256', secret).update(payload).digest();
  return base64url(sig);
}

module.exports = async function handler(req, res) {
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, OPTIONS');
    return res.status(405).json({ detail: 'Method not allowed' });
  }

  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    return res.status(503).json({ detail: 'Redirect not configured' });
  }

  const sessionId = (req.query.session_id || '').trim();
  if (!sessionId) {
    return res.status(400).json({ detail: 'session_id required' });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return res.status(503).json({ detail: 'Redirect not configured' });
  }

  let session;
  try {
    const stripe = new Stripe(stripeKey);
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch (e) {
    console.warn('success-redirect: Stripe retrieve failed', e.message);
    return res.status(400).json({ detail: 'Invalid or unpaid session' });
  }

  if (session.payment_status !== 'paid') {
    return res.status(400).json({ detail: 'Invalid or unpaid session' });
  }

  const planStr = session.metadata?.plan;
  if (planStr == null || planStr === '') {
    return res.status(400).json({ detail: 'Invalid or unpaid session' });
  }

  const accessTier = parseInt(planStr, 10);
  if (!Number.isInteger(accessTier) || !PHASE1_PLAN_VALUES.includes(accessTier)) {
    return res.status(400).json({ detail: 'Invalid or unpaid session' });
  }

  const expiryDays = parseInt(process.env.ACCESS_TOKEN_EXPIRY_DAYS || '30', 10) || 30;
  const expires = Math.floor(Date.now() / 1000) + expiryDays * 86400;
  const token = buildMagicLinkToken(accessTier, expires, secret);
  const base = (process.env.TRAINING_REDIRECT_BASE || 'https://www.promptanatomy.app/anatomija').replace(/\/$/, '');
  const redirectUrl = `${base}/?access_tier=${accessTier}&expires=${expires}&token=${token}`;

  return res.status(200).json({ redirect_url: redirectUrl });
};
