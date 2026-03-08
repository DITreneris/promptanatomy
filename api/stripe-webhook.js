/**
 * Vercel serverless function: Stripe webhook.
 * Stripe Dashboard → Webhooks → URL: https://<your-domain>/api/stripe-webhook
 * Event: checkout.session.completed
 * Requires env: STRIPE_WEBHOOK_SECRET, STRIPE_SECRET_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */
const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

const PLAN_VALUES = [3, 6, 12, 15];

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
    return res.status(503).json({ error: 'Webhook not configured' });
  }

  let event;
  try {
    const rawBody = await getRawBody(req);
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    console.warn('Stripe webhook verification failed:', err.message);
    return res.status(400).json({ error: err.message });
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
  if (!planStr) {
    console.warn('Checkout completed but no metadata.plan, session:', session.id);
    return res.status(200).json({ received: true });
  }

  const purchasedPlan = parseInt(planStr, 10);
  if (!Number.isInteger(purchasedPlan) || !PLAN_VALUES.includes(purchasedPlan)) {
    console.warn('Invalid metadata.plan:', planStr, 'session:', session.id);
    return res.status(200).json({ received: true });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase not configured; skipping user_access upsert');
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
    console.warn('get user_access failed:', e.message);
  }

  const newHighest = Math.max(current, purchasedPlan);
  const row = {
    email: normalizedEmail,
    highest_plan: newHighest,
    updated_at: new Date().toISOString(),
  };
  if (session.customer) row.stripe_customer_id = session.customer;

  try {
    await supabase.from('user_access').upsert(row, { onConflict: 'email' });
  } catch (e) {
    console.warn('user_access upsert failed:', e.message);
  }

  res.status(200).json({ received: true });
}
