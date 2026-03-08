/**
 * Vercel serverless: GET /api/access?email=...
 * Returns { highest_plan, allowed_modules, can_upgrade_to } from Supabase user_access.
 * Requires env: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */
const { createClient } = require('@supabase/supabase-js');

const PLAN_VALUES = [3, 6, 12, 15];
/** Phase 1: only offer upgrade to 3 or 6 (docs/phase-1-scope.md). */
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

  const email = (req.query.email || '').trim();
  if (!email || !email.includes('@')) {
    return res.status(400).json({ detail: 'Valid email required' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return res.status(503).json({ detail: 'Access check not configured' });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const normalizedEmail = email.toLowerCase();

  let highest_plan = 0;
  try {
    const { data: row } = await supabase
      .from('user_access')
      .select('highest_plan')
      .eq('email', normalizedEmail)
      .maybeSingle();
    if (row?.highest_plan != null) highest_plan = row.highest_plan;
  } catch (e) {
    console.error('get user_access failed:', e.message);
    return res.status(502).json({ detail: 'Database error' });
  }

  const allowed_modules = highest_plan > 0 ? Array.from({ length: highest_plan }, (_, i) => i + 1) : [];
  const can_upgrade_to = PHASE1_PLAN_VALUES.filter((p) => p > highest_plan);

  return res.status(200).json({
    highest_plan: highest_plan,
    allowed_modules: allowed_modules,
    can_upgrade_to: can_upgrade_to,
  });
};
