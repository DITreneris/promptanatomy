import { getEnMessages } from './syncTranslate'

export const STORAGE_KEY = 'locale'
export const VALID_LOCALES = ['lt', 'en']
export const DEFAULT_LOCALE = 'en'

const loaders = {
  lt: () => import('./translations/lt.json').then((mod) => mod.default),
  en: () => Promise.resolve(getEnMessages()),
}

/** @type {Map<string, Promise<Record<string, unknown>>>} */
const cache = new Map()

export function normalizeLocale(value) {
  const v = (value || '').toLowerCase().trim()
  return VALID_LOCALES.includes(v) ? v : DEFAULT_LOCALE
}

/** Map browser language to supported locale; used only when user has no stored preference. */
export function detectBrowserLocale() {
  if (typeof window === 'undefined' || !window.navigator) return DEFAULT_LOCALE
  const lang = window.navigator.language || window.navigator.userLanguage || ''
  const codes = [lang, ...(window.navigator.languages || [])].map((l) =>
    (l || '').toLowerCase().split('-')[0]
  )
  return codes.some((c) => c === 'lt') ? 'lt' : DEFAULT_LOCALE
}

/** Route-aware locale for first paint (matches HomePage forceLocale on /, /en, /lt). */
export function getInitialLocale() {
  if (typeof window === 'undefined') return DEFAULT_LOCALE
  const path = window.location.pathname
  if (path === '/lt') return 'lt'
  if (path === '/' || path === '/en') return 'en'
  try {
    const stored = window.localStorage?.getItem(STORAGE_KEY)
    if (stored && VALID_LOCALES.includes(normalizeLocale(stored))) {
      return normalizeLocale(stored)
    }
  } catch {
    /* private mode */
  }
  return detectBrowserLocale()
}

/**
 * Load locale messages (cached). Returns a promise of the JSON default export.
 * @param {string} locale
 */
export function loadLocale(locale) {
  const loc = normalizeLocale(locale)
  if (!cache.has(loc)) {
    cache.set(loc, loaders[loc]())
  }
  return cache.get(loc)
}

/** Warm inactive locale for faster LT/EN toggle. */
export function prefetchLocale(locale) {
  void loadLocale(locale)
}
