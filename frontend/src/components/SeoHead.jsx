import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { translateLocale, useLocale } from '../i18n/LocaleContext'
import { SITE_URL } from '../config'

const HOME_ROUTES = ['/', '/en', '/lt']
const NOINDEX_ROUTES = ['/success', '/cancel']
const ROUTE_SCHEMA_SCRIPT_ID = 'route-seo-ldjson'
const OG_IMAGE_URL = `${SITE_URL}/og-image.png`
const ORGANIZATION_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`
const ROUTE_LAST_MODIFIED = {
  '/privacy': '2026-03-14',
  '/terms': '2026-03-14',
  default: '2026-03-16',
}
const VISIBLE_OFFERS = [
  { id: 'starter', labelKey: 'starter', mods: '1–3', price: 39 },
  { id: 'core', labelKey: 'core', mods: '1–6', price: 99 },
]

function ensurePropertyMeta(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function removePropertyMeta(property) {
  document.querySelector(`meta[property="${property}"]`)?.remove()
}

function ensureNamedMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
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

function ensureJsonLd(id, payload) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.id = id
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(payload)
}

function getCanonicalUrl(pathname) {
  return pathname === '/' ? `${SITE_URL}/` : `${SITE_URL}${pathname}`
}

function getRouteLocale(pathname, locale) {
  if (pathname === '/lt') return 'lt'
  if (pathname === '/privacy' || pathname === '/terms') return 'en'
  if (pathname === '/' || pathname === '/en') return 'en'
  return locale === 'lt' ? 'lt' : 'en'
}

function getRouteTitle(pathname, t) {
  if (pathname === '/privacy') return translateLocale('en', 'legal.privacyTitle')
  if (pathname === '/terms') return translateLocale('en', 'legal.termsTitle')
  if (pathname === '/success') return t('success.metaTitle')
  if (pathname === '/cancel') return t('cancel.metaTitle')
  return t('meta.title')
}

function getRouteDescription(pathname, t) {
  if (pathname === '/privacy') return translateLocale('en', 'legal.privacyDescription')
  if (pathname === '/terms') return translateLocale('en', 'legal.termsDescription')
  if (pathname === '/success') return t('success.metaDescription')
  if (pathname === '/cancel') return t('cancel.metaDescription')
  return t('meta.description')
}

function getWebPageSchema({ canonicalUrl, pathname, title, description, routeLocale }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: title,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANIZATION_ID },
    inLanguage: routeLocale,
    dateModified: ROUTE_LAST_MODIFIED[pathname] || ROUTE_LAST_MODIFIED.default,
  }
}

function getHomeSchema({ canonicalUrl, description, routeLocale, t }) {
  const courseId = `${canonicalUrl}#course`
  const course = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': courseId,
    name: routeLocale === 'lt' ? 'Promptų Anatomija' : 'Prompt Anatomy',
    description,
    provider: { '@id': ORGANIZATION_ID },
    url: canonicalUrl,
    inLanguage: ['lt', 'en'],
  }

  const offers = VISIBLE_OFFERS.map((offer) => {
    const bullets = t(`pricing.planBullets.${offer.labelKey}`)
    return {
      '@context': 'https://schema.org',
      '@type': 'Offer',
      '@id': `${canonicalUrl}#${offer.id}-offer`,
      name: `${t(`pricing.plans.${offer.labelKey}`)} (${offer.mods} ${t('pricing.mods')})`,
      description: Array.isArray(bullets) && bullets.length > 0 ? bullets.join(' · ') : t('pricing.subtext'),
      price: String(offer.price),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: `${canonicalUrl}#pricing`,
      itemOffered: { '@id': courseId },
    }
  })

  return [course, ...offers]
}

export default function SeoHead() {
  const { pathname } = useLocation()
  const { locale, t } = useLocale()

  useEffect(() => {
    const canonicalUrl = getCanonicalUrl(pathname)
    const routeLocale = getRouteLocale(pathname, locale)
    const title = getRouteTitle(pathname, t)
    const description = getRouteDescription(pathname, t)
    const robots = NOINDEX_ROUTES.includes(pathname) ? 'noindex, nofollow' : 'index, follow'

    document.documentElement.lang = routeLocale
    document.title = title
    ensureNamedMeta('description', description)
    ensureNamedMeta('robots', robots)
    ensureCanonical(canonicalUrl)
    ensurePropertyMeta('og:title', title)
    ensurePropertyMeta('og:description', description)
    ensurePropertyMeta('og:type', 'website')
    ensurePropertyMeta('og:url', canonicalUrl)
    ensurePropertyMeta('og:image', OG_IMAGE_URL)
    ensurePropertyMeta('og:image:alt', routeLocale === 'lt' ? 'Promptų Anatomija social preview' : 'Prompt Anatomy social preview')
    ensureNamedMeta('twitter:card', 'summary_large_image')
    ensureNamedMeta('twitter:title', title)
    ensureNamedMeta('twitter:description', description)
    ensureNamedMeta('twitter:image', OG_IMAGE_URL)
    ensurePropertyMeta('og:locale', routeLocale === 'en' ? 'en_US' : 'lt_LT')

    if (HOME_ROUTES.includes(pathname)) {
      ensurePropertyMeta('og:locale:alternate', routeLocale === 'en' ? 'lt_LT' : 'en_US')
      ensureHreflang('lt', `${SITE_URL}/lt`)
      ensureHreflang('en', `${SITE_URL}/en`)
      ensureHreflang('x-default', `${SITE_URL}/`)
    } else {
      removePropertyMeta('og:locale:alternate')
      removeHreflangLinks()
    }

    const routeSchema = [
      getWebPageSchema({ canonicalUrl, pathname, title, description, routeLocale }),
      ...(HOME_ROUTES.includes(pathname) ? getHomeSchema({ canonicalUrl, description, routeLocale, t }) : []),
    ]
    ensureJsonLd(ROUTE_SCHEMA_SCRIPT_ID, routeSchema)

    return () => {
      removeHreflangLinks()
      document.getElementById(ROUTE_SCHEMA_SCRIPT_ID)?.remove()
    }
  }, [pathname, locale, t])

  return null
}
