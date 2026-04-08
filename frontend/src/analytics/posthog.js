import posthog from 'posthog-js'
import { POSTHOG_HOST, POSTHOG_KEY } from '../config'

let initialized = false

/** Call once from main.jsx. No-op if VITE_POSTHOG_KEY is unset. */
export function initPosthog() {
  if (initialized || !POSTHOG_KEY) return
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: false,
    capture_pageleave: true,
    persistence: 'localStorage+cookie',
    person_profiles: 'identified_only',
  })
  initialized = true
}

export function isPosthogEnabled() {
  return Boolean(POSTHOG_KEY)
}

/** SPA route change → PostHog $pageview (Vercel Analytics stays separate). */
export function capturePosthogPageview() {
  if (!POSTHOG_KEY) return
  posthog.capture('$pageview')
}

/**
 * Custom funnel / product events. Never pass PII (email, full session_id, redirect URLs with tokens).
 * @param {string} event
 * @param {Record<string, unknown>} [properties]
 */
export function capturePosthogEvent(event, properties) {
  if (!POSTHOG_KEY) return
  posthog.capture(event, properties)
}
