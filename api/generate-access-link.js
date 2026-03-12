/**
 * Vercel serverless: GET /api/generate-access-link?email=...
 * Checks Supabase user_access for the email, generates a magic-link redirect URL
 * if the user has a valid plan. Returns { redirect_url } or 404 if no access.
 * Env: ACCESS_TOKEN_SECRET, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 * Optional: TRAINING_REDIRECT_BASE, ACCESS_TOKEN_EXPIRY_DAYS
 */
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

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
    return res.status(503).json({ detail: 'Access link generation not configured' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return res.status(503).json({ detail: 'Access link generation not configured' });
  }

  const email = (req.query.email || '').trim().toLowerCase();
  if (!email || !email.includes('@')) {
    return res.status(400).json({ detail: 'Valid email required' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  let highestPlan = 0;
  try {
    const { data: row } = await supabase
      .from('user_access')
      .select('highest_plan')
      .eq('email', email)
      .maybeSingle();
    if (row?.highest_plan != null) highestPlan = row.highest_plan;
  } catch (e) {
    console.error('generate-access-link: Supabase query failed', e.message);
    return res.status(502).json({ detail: 'Database error' });
  }

  if (highestPlan <= 0) {
    return res.status(404).json({ detail: 'No access found for this email' });
  }

  const accessTier = PHASE1_PLAN_VALUES.includes(highestPlan)
    ? highestPlan
    : PHASE1_PLAN_VALUES.filter((v) => v <= highestPlan).pop() || highestPlan;

  const expiryDays = parseInt(process.env.ACCESS_TOKEN_EXPIRY_DAYS || '30', 10) || 30;
  const expires = Math.floor(Date.now() / 1000) + expiryDays * 86400;
  const token = buildMagicLinkToken(accessTier, expires, secret);
  const base = (process.env.TRAINING_REDIRECT_BASE || 'https://www.promptanatomy.app/anatomija').replace(/\/$/, '');
  const redirectUrl = `${base}/?access_tier=${accessTier}&expires=${expires}&token=${token}`;

  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ redirect_url: redirectUrl });
};
