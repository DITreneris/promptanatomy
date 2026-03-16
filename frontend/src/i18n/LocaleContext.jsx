import { createContext, useContext, useState, useCallback } from 'react'
import lt from './translations/lt.json'
import en from './translations/en.json'

const translations = { lt, en }
const STORAGE_KEY = 'locale'
const VALID_LOCALES = ['lt', 'en']
const DEFAULT_LOCALE = 'en'

/** Map browser language to supported locale; used only when user has no stored preference. */
function detectBrowserLocale() {
  if (typeof window === 'undefined' || !window.navigator) return DEFAULT_LOCALE
  const lang = window.navigator.language || window.navigator.userLanguage || ''
  const codes = [lang, ...(window.navigator.languages || [])].map((l) => (l || '').toLowerCase().split('-')[0])
  return codes.some((c) => c === 'lt') ? 'lt' : DEFAULT_LOCALE
}

function normalizeLocale(value) {
  const v = (value || '').toLowerCase().trim()
  return VALID_LOCALES.includes(v) ? v : DEFAULT_LOCALE
}

function getNested(obj, path) {
  return path.split('.').reduce((o, k) => o?.[k], obj)
}

function translate(tr, key, params = {}) {
  let value = getNested(tr, key)
  if (value == null) return key
  if (typeof value !== 'string') return value
  Object.keys(params).forEach((k) => {
    value = value.replace(new RegExp(`{{${k}}}`, 'g'), String(params[k]))
  })
  return value
}

const LocaleContext = createContext(null)

export function translateLocale(locale, key, params) {
  const loc = normalizeLocale(locale)
  const tr = translations[loc] || translations[DEFAULT_LOCALE]
  return translate(tr, key, params)
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_LOCALE
    const stored = window.localStorage?.getItem(STORAGE_KEY)
    if (stored && VALID_LOCALES.includes((stored || '').toLowerCase().trim())) {
      return normalizeLocale(stored)
    }
    return detectBrowserLocale()
  })

  const setLocale = useCallback((next) => {
    const value = normalizeLocale(next)
    setLocaleState(value)
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, value)
    }
  }, [])

  const t = useCallback(
    (key, params) => {
      const loc = normalizeLocale(locale)
      const tr = translations[loc] || translations[DEFAULT_LOCALE]
      return translate(tr, key, params)
    },
    [locale]
  )
  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
