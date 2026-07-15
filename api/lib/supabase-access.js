/**
 * Shared Supabase user_access helpers for Vercel api/* handlers.
 * SOT for PLAN_VALUES on the JS stack; keep backend/core/config.py in sync.
 */
const { createClient } = require('@supabase/supabase-js');

const PLAN_VALUES = [3, 6, 12, 15];
/** Phase 1: only offer upgrade to 3 or 6 (docs/phase-1-scope.md). */
const PHASE1_PLAN_VALUES = [3, 6];
/** plan_id "1"|"2"|"3"|"4" → plan_value 3|6|12|15 */
const PLAN_ID_TO_VALUE = { '1': 3, '2': 6, '3': 12, '4': 15 };

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) return null;
  return createClient(supabaseUrl, supabaseKey);
}

function isSupabaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

async function getUserAccess(supabase, email) {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) return null;
  const { data: row, error } = await supabase
    .from('user_access')
    .select('highest_plan, stripe_customer_id')
    .eq('email', normalizedEmail)
    .maybeSingle();
  if (error) throw error;
  if (row?.highest_plan != null) {
    return {
      highest_plan: row.highest_plan,
      stripe_customer_id: row.stripe_customer_id ?? null,
    };
  }
  return null;
}

async function getUserHighestPlan(supabase, email) {
  const access = await getUserAccess(supabase, email);
  return access?.highest_plan ?? 0;
}

async function upsertUserAccess(supabase, { email, highestPlan, stripeCustomerId }) {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) {
    return { error: new Error('Invalid email') };
  }
  const row = {
    email: normalizedEmail,
    highest_plan: highestPlan,
  };
  if (stripeCustomerId) row.stripe_customer_id = stripeCustomerId;
  return supabase.from('user_access').upsert(row, { onConflict: 'email' });
}

/** Accepts plan_value string "3"|"6"|"12"|"15" (from Session metadata) or plan_id "1"|"2"|"3"|"4". */
function toPlanValue(planStr) {
  const s = String(planStr).trim();
  const num = parseInt(s, 10);
  if (Number.isInteger(num) && PLAN_VALUES.includes(num)) return num;
  if (PLAN_ID_TO_VALUE[s] != null) return PLAN_ID_TO_VALUE[s];
  return null;
}

function planIdToValue(planId) {
  return PLAN_ID_TO_VALUE[String(planId)] ?? null;
}

function buildAccessResponse(highestPlan) {
  const allowed_modules =
    highestPlan > 0 ? Array.from({ length: highestPlan }, (_, i) => i + 1) : [];
  const can_upgrade_to = PHASE1_PLAN_VALUES.filter((p) => p > highestPlan);
  return {
    highest_plan: highestPlan,
    allowed_modules,
    can_upgrade_to,
  };
}

module.exports = {
  PLAN_VALUES,
  PHASE1_PLAN_VALUES,
  PLAN_ID_TO_VALUE,
  normalizeEmail,
  getSupabaseClient,
  isSupabaseConfigured,
  getUserAccess,
  getUserHighestPlan,
  upsertUserAccess,
  toPlanValue,
  planIdToValue,
  buildAccessResponse,
};
