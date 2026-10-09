/**
 * Vercel serverless: GET /api/success-redirect?session_id=...
 * Returns { redirect_url }; optional customer_email when Stripe session has it (LP localStorage).
 * Requires paid Stripe Checkout session.
 * Env: ACCESS_TOKEN_SECRET, STRIPE_SECRET_KEY; optional TRAINING_REDIRECT_BASE, ACCESS_TOKEN_EXPIRY_DAYS
 */
const Stripe = require('stripe');
const { captureApiException } = require('./lib/sentry');
const {
  normalizeMagicLinkEmail,
  signMagicLink,
  buildTrainingMagicLinkUrl,
  isMagicLinkRedeemed,
  metadataWithMagicLinkRedeemed,
} = require('./lib/magic-link');

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

module.exports = async function handler(req, res) {
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, OPTIONS');
    return res.status(405).json({ detail: 'Method not allowed' });
  }

  try {
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

    const stripe = new Stripe(stripeKey);
    let session;
    try {
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

    if (isMagicLinkRedeemed(session.metadata)) {
      res.setHeader('Cache-Control', 'no-store');
      return res.status(409).json({ detail: 'Link already issued' });
    }

    try {
      await stripe.checkout.sessions.update(sessionId, {
        metadata: metadataWithMagicLinkRedeemed(session.metadata),
      });
    } catch (e) {
      console.error('success-redirect: redeem mark failed', e.message);
      await captureApiException(e, { route: 'success-redirect', status: 502 });
      return res.status(502).json({ detail: 'Redirect error' });
    }

    const expiryDays = parseInt(process.env.ACCESS_TOKEN_EXPIRY_DAYS || '30', 10) || 30;
    const expires = Math.floor(Date.now() / 1000) + expiryDays * 86400;
    const stripeEmail = session.customer_email || session.customer_details?.email || '';
    const boundEmail = normalizeMagicLinkEmail(stripeEmail);
    const token = signMagicLink(accessTier, expires, secret, boundEmail);
    const base = (process.env.TRAINING_REDIRECT_BASE || 'https://www.promptanatomy.app/anatomy').replace(/\/$/, '');
    const redirectUrl = buildTrainingMagicLinkUrl({
      base,
      accessTier,
      expires,
      token,
      email: boundEmail,
    });

    const customerEmail = stripeEmail.trim() || undefined;

    const payload = { redirect_url: redirectUrl };
    if (customerEmail) payload.customer_email = customerEmail;
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json(payload);
  } catch (e) {
    console.error('success-redirect: unexpected error', e.message);
    await captureApiException(e, { route: 'success-redirect', status: 500 });
    return res.status(500).json({ detail: 'Redirect error' });
  }
};
