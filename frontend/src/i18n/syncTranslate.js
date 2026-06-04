import en from './translations/en.json'
import { translateMessages } from './translateCore'

/** Shared EN messages (legal/SEO sync path + loadLocale en). */
export function getEnMessages() {
  return en
}

/**
 * Synchronous translate for legal/SEO paths (EN-canonical).
 * LT locale requests fall back to EN (legal routes are EN-only).
 */
export function translateLocale(_locale, key, params) {
  return translateMessages(en, key, params)
}
