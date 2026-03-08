import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import lt from './translations/lt.json'
import en from './translations/en.json'

const translations = { lt, en }
const STORAGE_KEY = 'locale'
const VALID_LOCALES = ['lt', 'en']

function normalizeLocale(value) {
  const v = (value || '').toLowerCase().trim()
  return VALID_LOCALES.includes(v) ? v : 'lt'
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

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(() => {
    if (typeof window === 'undefined') return 'lt'
    return normalizeLocale(window.localStorage?.getItem(STORAGE_KEY))
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
      const tr = translations[loc] || translations.lt
      return translate(tr, key, params)
    },
    [locale]
  )

  useEffect(() => {
    const loc = normalizeLocale(locale)
    document.documentElement.lang = loc
    const tr = translations[loc] || translations.lt
    const title = translate(tr, 'meta.title')
    const description = translate(tr, 'meta.description')
    document.title = title
    let metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', description)
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', title)
    let ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', description)
  }, [locale])

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
