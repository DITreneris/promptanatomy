/**
 * Vercel serverless function: Stripe webhook.
 * Stripe Dashboard → Webhooks → URL: https://<your-domain>/api/stripe-webhook
 * Event: checkout.session.completed
 * Requires env: STRIPE_WEBHOOK_SECRET, STRIPE_SECRET_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

const PLAN_VALUES = [3, 6, 12, 15];
/** plan_id "1"|"2"|"3"|"4" → plan_value 3|6|12|15 */
const PLAN_ID_TO_VALUE = { '1': 3, '2': 6, '3': 12, '4': 15 };

/** Accepts plan_value string "3"|"6"|"12"|"15" (from Session metadata) or plan_id "1"|"2"|"3"|"4". */
function toPlanValue(planStr) {
  const s = String(planStr).trim();
  const num = parseInt(s, 10);
  if (Number.isInteger(num) && PLAN_VALUES.includes(num)) return num;
  if (PLAN_ID_TO_VALUE[s] != null) return PLAN_ID_TO_VALUE[s];
  return null;
}

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function getEmailFromSession(session) {
  const details = session.customer_details || {};
  if (details.email) return details.email;
  if (session.customer_email) return session.customer_email;
  if (session.client_reference_id) return session.client_reference_id;
  return null;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).send('Method not allowed');
  }

  const sig = req.headers['stripe-signature'] || '';
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.warn('STRIPE_WEBHOOK_SECRET not set');
    return res.status(503).json({ detail: 'Webhook not configured' });
  }

  let event;
  try {
    const rawBody = await getRawBody(req);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    console.warn('Stripe webhook verification failed:', err.message);
    return res.status(400).json({ detail: 'Invalid signature or payload' });
  }

  if (event.type !== 'checkout.session.completed') {
    return res.status(200).json({ received: true });
  }

  const session = event.data.object;
  const email = getEmailFromSession(session);
  if (!email) {
    console.warn('Checkout completed but no email, session:', session.id);
    return res.status(200).json({ received: true });
  }

  const planStr = session.metadata?.plan;
  if (planStr == null || planStr === '') {
    console.warn('Checkout completed but no metadata.plan, session:', session.id);
    return res.status(200).json({ received: true });
  }

  const purchasedPlan = toPlanValue(planStr);
  if (purchasedPlan == null) {
    console.warn('Invalid metadata.plan:', planStr, 'session:', session.id);
    return res.status(200).json({ received: true });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase not configured; SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing in Vercel env');
    return res.status(200).json({ received: true });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const normalizedEmail = email.trim().toLowerCase();

  let current = 0;
  try {
    const { data: row } = await supabase
      .from('user_access')
      .select('highest_plan')
      .eq('email', normalizedEmail)
      .maybeSingle();
    if (row?.highest_plan != null) current = row.highest_plan;
  } catch (e) {
    console.error('get user_access failed:', e.message, e.code);
  }

  const newHighest = Math.max(current, purchasedPlan);
  const row = {
    email: normalizedEmail,
    highest_plan: newHighest,
  };
  if (session.customer) row.stripe_customer_id = session.customer;

  try {
    const { error } = await supabase.from('user_access').upsert(row, { onConflict: 'email' });
    if (error) {
      console.error('user_access upsert error:', error.message, error.code, error.details);
    }
  } catch (e) {
    console.error('user_access upsert exception:', e.message);
  }

  res.status(200).json({ received: true });
}
