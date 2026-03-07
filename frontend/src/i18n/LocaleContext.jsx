import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import lt from './translations/lt.json'
import en from './translations/en.json'

const translations = { lt, en }
const STORAGE_KEY = 'locale'

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
    return window.localStorage?.getItem(STORAGE_KEY) || 'lt'
  })

  const setLocale = useCallback((next) => {
    setLocaleState(next)
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, next)
    }
  }, [])

  const t = useCallback(
    (key, params) => {
      const tr = translations[locale] || translations.lt
      return translate(tr, key, params)
    },
    [locale]
  )

  useEffect(() => {
    document.documentElement.lang = locale
    const title = translate(translations[locale] || translations.lt, 'meta.title')
    const description = translate(translations[locale] || translations.lt, 'meta.description')
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
