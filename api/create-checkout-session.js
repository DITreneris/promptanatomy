/**
 * Vercel serverless: POST /api/create-checkout-session
 * Body: { plan_id: "1"|"2"|"3"|"4", customer_email?: string }
 * Returns { url } for Stripe Checkout redirect.
 * Requires env: STRIPE_SECRET_KEY, STRIPE_PRICE_ID_PLAN_1..4, FRONTEND_ORIGIN
 * Optional: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY for access check (409 if already purchased).
 */
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

const PLAN_VALUES = [3, 6, 12, 15];
const PLAN_ID_TO_VALUE = { '1': 3, '2': 6, '3': 12, '4': 15 };

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function getPriceId(planId) {
  const key = `STRIPE_PRICE_ID_PLAN_${planId}`;
  return process.env[key] || null;
}

function planIdToValue(planId) {
  return PLAN_ID_TO_VALUE[String(planId)] ?? null;
}

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || req.headers.referer?.replace(/\/$/, '') || '*';
  Object.entries(corsHeaders(origin)).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ detail: 'Method not allowed' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return res.status(503).json({ detail: 'Checkout not configured' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
  } catch {
    return res.status(400).json({ detail: 'Invalid JSON' });
  }

  const planId = body.plan_id;
  if (!['1', '2', '3', '4'].includes(planId)) {
    return res.status(400).json({ detail: `Invalid plan_id ${planId}` });
  }

  const priceId = getPriceId(planId);
  if (!priceId) {
    return res.status(400).json({ detail: `Plan ${planId} not configured` });
  }

  const planValue = planIdToValue(planId);
  if (planValue == null) {
    return res.status(400).json({ detail: `Invalid plan_id ${planId}` });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const customerEmail = (body.customer_email || '').trim();

  if (supabaseUrl && supabaseKey && customerEmail && customerEmail.includes('@')) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data: row } = await supabase
        .from('user_access')
        .select('highest_plan')
        .eq('email', customerEmail.toLowerCase())
        .maybeSingle();
      const current = row?.highest_plan ?? 0;
      if (current >= planValue) {
        return res.status(409).json({ detail: 'Already purchased this plan or higher' });
      }
    } catch (e) {
      console.error('create-checkout-session: access check failed', e.message);
    }
  }

  const frontendOrigin = (process.env.FRONTEND_ORIGIN || origin || '').replace(/\/$/, '') || 'http://localhost:5173';

  try {
    const stripe = new Stripe(secretKey);
    const sessionParams = {
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${frontendOrigin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendOrigin}/cancel`,
      customer_creation: 'always',
      metadata: { plan: String(planValue) },
    };
    if (customerEmail) {
      sessionParams.customer_email = customerEmail;
      sessionParams.client_reference_id = customerEmail;
    }
    const session = await stripe.checkout.sessions.create(sessionParams);
    return res.status(200).json({ url: session.url });
  } catch (e) {
    console.error('create-checkout-session: Stripe error', e.message);
    return res.status(502).json({ detail: 'Payment provider error' });
  }
};
