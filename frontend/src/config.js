/**
 * Frontend config from env. Vite exposes only VITE_* to client.
 * In production (Vercel), if VITE_API_URL is not set, use same origin so /api/access and future API routes work.
 */
function getApiUrl() {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL
  if (typeof window !== 'undefined' && window.location?.origin) return window.location.origin
  return 'http://localhost:8000'
}
export const API_URL = getApiUrl()
export const GLOSSARY_URL = import.meta.env.VITE_GLOSSARY_URL || ''
/** X (Twitter) conversion tracking pixel ID. When set, base code is loaded on all pages. */
export const X_PIXEL_ID = import.meta.env.VITE_X_PIXEL_ID || ''
/** PostHog project API key (Project API Key). When unset, PostHog is disabled. */
export const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY || ''
/** PostHog ingest host. EU projects: https://eu.i.posthog.com */
export const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com'
/** Base URL for SEO (canonical, og:url, hreflang). */
export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://www.promptanatomy.app'

/** After successful LP „Patikrink prieigą“, email saved for restore on next visit (navbar Mokymai, forma). */
export const LP_ACCESS_EMAIL_STORAGE_KEY = 'pa_lp_access_email'

/** Single source for app version and Hero script name; change here to update Navbar, Hero, Ecosystem. */
export const APP_VERSION = 'v1.3'
export const SCRIPT_NAME = `${APP_VERSION}_os.sh`
