import { API_URL } from './config'

/**
 * Create Stripe Checkout Session for the given plan. Returns checkout URL or throws.
 * @param {string} planId - Plan "1"|"2"|"3"|"4" (1–3 / 1–6 / 1–12 / 1–15 mod)
 * @param {string|null} customerEmail - Optional customer email
 */
export async function createCheckoutSession(planId, customerEmail = null) {
  const body = { plan_id: planId }
  if (customerEmail) body.customer_email = customerEmail
  const res = await fetch(`${API_URL}/api/create-checkout-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const raw = (await res.json().catch(() => ({}))).detail || res.statusText
    const detail = typeof raw === 'string' ? raw : JSON.stringify(raw)
    throw new Error(detail)
  }
  const data = await res.json().catch(() => null)
  if (!data?.url) throw new Error(data === null ? 'Invalid response' : 'No checkout URL')
  return data.url
}

/**
 * Get redirect URL for success page: magic-link to training app (access_tier, expires, token).
 * @param {string} sessionId - Stripe Checkout session ID from URL
 * @returns {Promise<string>} redirect_url
 */
export async function getSuccessRedirectUrl(sessionId) {
  const params = new URLSearchParams({ session_id: sessionId })
  const res = await fetch(`${API_URL}/api/success-redirect?${params}`)
  if (!res.ok) {
    const raw = (await res.json().catch(() => ({}))).detail || res.statusText
    const detail = typeof raw === 'string' ? raw : JSON.stringify(raw)
    throw new Error(detail)
  }
  const data = await res.json().catch(() => null)
  if (!data?.redirect_url) throw new Error(data === null ? 'Invalid response' : 'No redirect URL')
  return data.redirect_url
}

/**
 * Generate magic-link redirect URL for a user who already has access (by email).
 * Checks Supabase; returns redirect_url with access_tier, expires, token.
 * @param {string} email
 * @returns {Promise<string>} redirect_url to training app with magic link params
 */
export async function getTrainingAccessLink(email) {
  const params = new URLSearchParams({ email: email.trim() })
  const res = await fetch(`${API_URL}/api/generate-access-link?${params}`)
  if (!res.ok) {
    const raw = (await res.json().catch(() => ({}))).detail || res.statusText
    const detail = typeof raw === 'string' ? raw : JSON.stringify(raw)
    throw new Error(detail)
  }
  const data = await res.json().catch(() => null)
  if (!data?.redirect_url) throw new Error(data === null ? 'Invalid response' : 'No redirect URL')
  return data.redirect_url
}

/**
 * Get access for email: highest_plan, allowed_modules, can_upgrade_to.
 * @param {string} email
 * @returns {Promise<{ highest_plan: number, allowed_modules: number[], can_upgrade_to: number[] }>}
 */
export async function getAccess(email) {
  const params = new URLSearchParams({ email: email.trim() })
  const res = await fetch(`${API_URL}/api/access?${params}`)
  if (!res.ok) {
    const raw = (await res.json().catch(() => ({}))).detail || res.statusText
    const detail = typeof raw === 'string' ? raw : JSON.stringify(raw)
    throw new Error(detail)
  }
  const data = await res.json().catch(() => ({}))
  return {
    highest_plan: data?.highest_plan ?? 0,
    allowed_modules: Array.isArray(data?.allowed_modules) ? data.allowed_modules : [],
    can_upgrade_to: Array.isArray(data?.can_upgrade_to) ? data.can_upgrade_to : [],
  }
}
