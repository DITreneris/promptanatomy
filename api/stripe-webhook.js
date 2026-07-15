/**
 * Vercel serverless function: Stripe webhook.
 * Stripe Dashboard → Webhooks → URL: https://<your-domain>/api/stripe-webhook
 * Event: checkout.session.completed
 * Requires env: STRIPE_WEBHOOK_SECRET, STRIPE_SECRET_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */
const Stripe = require('stripe');
const {
  getSupabaseClient,
  isSupabaseConfigured,
  getUserHighestPlan,
  upsertUserAccess,
  toPlanValue,
  normalizeEmail,
} = require('./lib/supabase-access');

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

  if (!isSupabaseConfigured()) {
    console.error('Supabase not configured; SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing in Vercel env');
    return res.status(200).json({ received: true });
  }

  const supabase = getSupabaseClient();
  const normalizedEmail = normalizeEmail(email);

  let current = 0;
  try {
    current = await getUserHighestPlan(supabase, normalizedEmail);
  } catch (e) {
    console.error('get user_access failed:', e.message, e.code);
    return res.status(500).json({ detail: 'Database error' });
  }

  const newHighest = Math.max(current, purchasedPlan);
  const stripeCustomerId = session.customer || undefined;

  try {
    const { error } = await upsertUserAccess(supabase, {
      email: normalizedEmail,
      highestPlan: newHighest,
      stripeCustomerId,
    });
    if (error) {
      console.error('user_access upsert error:', error.message, error.code, error.details);
      return res.status(500).json({ detail: 'Database error' });
    }
  } catch (e) {
    console.error('user_access upsert exception:', e.message);
    return res.status(500).json({ detail: 'Database error' });
  }

  return res.status(200).json({ received: true });
};
