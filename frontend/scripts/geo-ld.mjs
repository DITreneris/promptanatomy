/**
 * Shared JSON-LD fragments for founder + publications (index.html, legal static pages).
 * Keep in sync with frontend/src/site/geo-manifest.js
 */
import {
  CREATOR,
  CREATOR_PUBLICATIONS,
  FOUNDER_ID,
  SITE_URL,
} from '../src/site/geo-manifest.js'

export function getFounderJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: CREATOR.name,
    jobTitle: CREATOR.jobTitle,
    sameAs: CREATOR.sameAs,
  }
}

export function getPublicationArticleJsonLd(pub, index) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_URL}/#publication-${index + 1}`,
    headline: pub.title,
    url: pub.url,
    author: { '@id': FOUNDER_ID },
    publisher: { '@type': 'Organization', name: 'Medium' },
  }
}

/** Person + Article nodes to append alongside WebPage on legal routes */
export function getGeoJsonLdExtra() {
  return [getFounderJsonLd(), ...CREATOR_PUBLICATIONS.map(getPublicationArticleJsonLd)]
}
