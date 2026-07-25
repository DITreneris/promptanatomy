/**
 * Vercel serverless: GET /api/access?email=...
 * Returns { highest_plan, allowed_modules, can_upgrade_to } from Supabase user_access.
 * Requires env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */
const {
  getSupabaseClient,
  getUserHighestPlan,
  buildAccessResponse,
} = require('./lib/supabase-access');
const { rateLimit } = require('./lib/rate-limit');

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

  if (!rateLimit(req, res, { key: 'access', limit: 30, windowSec: 60 })) {
    return;
  }

  const email = (req.query.email || '').trim();
  if (!email || !email.includes('@')) {
    return res.status(400).json({ detail: 'Valid email required' });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return res.status(503).json({ detail: 'Access check not configured' });
  }

  let highest_plan = 0;
  try {
    highest_plan = await getUserHighestPlan(supabase, email);
  } catch (e) {
    console.error('get user_access failed:', e.message);
    return res.status(502).json({ detail: 'Database error' });
  }

  return res.status(200).json(buildAccessResponse(highest_plan));
};
