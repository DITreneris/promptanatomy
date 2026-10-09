import { POSTHOG_HOST, POSTHOG_KEY } from '../config'
import { scheduleIdleTask } from '../utils/idle'

let initPromise = null

const SECRET_QUERY_KEY = /^(?:session_id|token|email|access_tier|expires)$/i

/** Drop Checkout and magic-link secrets from a URL. Other query params stay. */
export function urlWithoutSecrets(value) {
  if (typeof value !== 'string' || !value.includes('?')) return value
  const secretQuery = /([?&](?:session_id|token|email|access_tier|expires)=)[^&#\s"]*/gi
  if (!/^https?:\/\//i.test(value)) return value.replace(secretQuery, '$1')
  try {
    const url = new URL(value)
    let dirty = false
    for (const key of [...url.searchParams.keys()]) {
      if (SECRET_QUERY_KEY.test(key)) {
        url.searchParams.delete(key)
        dirty = true
      }
    }
    return dirty ? url.toString() : value
  } catch {
    return value.replace(secretQuery, '$1')
  }
}

function redactEventSecrets(event) {
  if (!event || typeof event !== 'object') return event
  if (event.event === '$snapshot') {
    const current = event.properties?.$current_url
    if (typeof current === 'string' && /\/success(?:[?#]|$)/.test(current)) return null
  }
  const properties = event.properties
  if (!properties || typeof properties !== 'object') return event
  for (const [key, value] of Object.entries(properties)) {
    if (typeof value === 'string') properties[key] = urlWithoutSecrets(value)
  }
  return event
}

function getInitPromise() {
  if (!POSTHOG_KEY) return null
  if (!initPromise) {
    initPromise = import('posthog-js')
      .then(({ default: posthog }) => {
        posthog.init(POSTHOG_KEY, {
          api_host: POSTHOG_HOST,
          capture_pageview: false,
          capture_pageleave: true,
          persistence: 'localStorage+cookie',
          person_profiles: 'identified_only',
          autocapture: {
            url_ignorelist: [/\/success(?:[?#]|$)/],
          },
          before_send: redactEventSecrets,
        })
        return posthog
      })
      .catch(() => null)
  }
  return initPromise
}

/** Schedule PostHog load off the critical path. No-op if VITE_POSTHOG_KEY is unset. */
export function schedulePosthogInit() {
  if (!POSTHOG_KEY) return
  scheduleIdleTask(() => {
    void getInitPromise()
  })
}

export function isPosthogEnabled() {
  return Boolean(POSTHOG_KEY)
}

/**
 * SPA route change → PostHog $pageview (Vercel Analytics stays separate).
 * On /success the URL is path-only so session_id never leaves the browser.
 */
export function capturePosthogPageview(pathname) {
  if (!POSTHOG_KEY) return
  const path = pathname || (typeof window !== 'undefined' ? window.location.pathname : '/')
  const properties =
    path === '/success' && typeof window !== 'undefined'
      ? { $current_url: `${window.location.origin}${path}`, $pathname: path }
      : undefined
  void getInitPromise()?.then((ph) => ph?.capture('$pageview', properties))
}

/**
 * Custom funnel / product events. Never pass PII (email, full session_id, redirect URLs with tokens).
 * @param {string} event
 * @param {Record<string, unknown>} [properties]
 */
export function capturePosthogEvent(event, properties) {
  if (!POSTHOG_KEY) return
  void getInitPromise()?.then((ph) => ph?.capture(event, properties))
}

export function captureEcosystemOutboundClick({ target, placement, locale, pagePath }) {
  capturePosthogEvent('ecosystem_outbound_click', {
    target,
    placement,
    locale,
    page_path: pagePath,
  })
}
