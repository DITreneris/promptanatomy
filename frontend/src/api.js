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
    const detail = (await res.json().catch(() => ({}))).detail || res.statusText
    throw new Error(detail)
  }
  const data = await res.json().catch(() => null)
  if (!data?.url) throw new Error(data === null ? 'Invalid response' : 'No checkout URL')
  return data.url
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
    const detail = (await res.json().catch(() => ({}))).detail || res.statusText
    throw new Error(detail)
  }
  return res.json()
}
