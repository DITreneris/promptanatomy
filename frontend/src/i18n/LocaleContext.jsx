import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { getInitialLocale, loadLocale, normalizeLocale, STORAGE_KEY } from './loadLocale'
import { translateMessages } from './translateCore'

const LocaleContext = createContext(null)

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(getInitialLocale)
  const [messages, setMessages] = useState(null)
  const [localeReady, setLocaleReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    loadLocale(locale)
      .then((data) => {
        if (!cancelled) {
          setMessages(data)
          setLocaleReady(true)
        }
      })
      .catch(() => {
        if (!cancelled) setLocaleReady(true)
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
      if (!messages) return key
      return translateMessages(messages, key, params)
    },
    [messages]
  )

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, localeReady }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
