import { createContext, useContext, useState, useCallback, useLayoutEffect } from 'react'
import {
  getInitialLocale,
  getSyncMessagesForInitialPaint,
  loadLocale,
  normalizeLocale,
  STORAGE_KEY,
} from './loadLocale'
import { getEnMessages } from './syncTranslate'
import { translateMessages } from './translateCore'

const LocaleContext = createContext(null)

export function LocaleProvider({ children }) {
  const initialLocale = getInitialLocale()
  const [locale, setLocaleState] = useState(initialLocale)
  const [loadedLocale, setLoadedLocale] = useState(() => (initialLocale === 'en' ? 'en' : null))
  const [messages, setMessages] = useState(getSyncMessagesForInitialPaint)

  useLayoutEffect(() => {
    let cancelled = false
    const loc = normalizeLocale(locale)

    loadLocale(loc)
      .then((data) => {
        if (!cancelled) {
          setMessages(data)
          setLoadedLocale(loc)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setMessages(loc === 'en' ? getEnMessages() : null)
          setLoadedLocale(loc)
        }
      })

    return () => {
      cancelled = true
    }
  }, [locale])

  const setLocale = useCallback((next) => {
    const value = normalizeLocale(next)
    setLocaleState(value)
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, value)
      }
    } catch {
      /* private mode */
    }
  }, [])

  const t = useCallback(
    (key, params) => {
      if (!messages) return ''
      return translateMessages(messages, key, params)
    },
    [messages]
  )

  const localeReady = loadedLocale === locale

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, localeReady }}>
      {localeReady ? (
        children
      ) : (
        <div className="min-h-screen bg-white" aria-busy="true" aria-live="polite" />
      )}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
