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
/** Base URL for SEO (canonical, og:url, hreflang). */
export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://www.promptanatomy.app'

/** Single source for app version and Hero script name; change here to update Navbar, Hero, Ecosystem. */
export const APP_VERSION = 'v1.3'
export const SCRIPT_NAME = `anatomu_os_${APP_VERSION}.sh`
