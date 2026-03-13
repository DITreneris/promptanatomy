import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLocale } from '../i18n/LocaleContext'
import { SITE_URL } from '../config'

const HOME_ROUTES = ['/', '/en', '/lt']

function ensureMeta(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function ensureCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function ensureHreflang(hreflang, href) {
  let el = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'alternate')
    el.setAttribute('hreflang', hreflang)
    el.setAttribute('data-seo-hreflang', '')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function removeHreflangLinks() {
  document.querySelectorAll('link[data-seo-hreflang]').forEach((el) => el.remove())
}

export default function SeoHead() {
  const { pathname } = useLocation()
  const { locale } = useLocale()

  useEffect(() => {
    const canonicalUrl = pathname === '/' ? `${SITE_URL}/` : `${SITE_URL}${pathname}`
    ensureCanonical(canonicalUrl)
    ensureMeta('og:url', canonicalUrl)

    if (HOME_ROUTES.includes(pathname)) {
      ensureMeta('og:locale', locale === 'en' ? 'en_US' : 'lt_LT')
      ensureMeta('og:locale:alternate', locale === 'en' ? 'lt_LT' : 'en_US')
      ensureHreflang('lt', `${SITE_URL}/lt`)
      ensureHreflang('en', `${SITE_URL}/en`)
      ensureHreflang('x-default', `${SITE_URL}/`)
    } else {
      removeHreflangLinks()
    }

    return () => {
      removeHreflangLinks()
    }
  }, [pathname, locale])

  return null
}
