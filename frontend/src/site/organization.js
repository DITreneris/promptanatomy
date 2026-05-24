/**
 * Official org contact – single source for footer, JSON-LD, legal copy, llms.txt.
 * Keep frontend/index.html Organization.address in sync when changing these values.
 * Founder / publications / ecosystem GEO: frontend/src/site/geo-manifest.js
 */
import { SITE_URL } from '../config'

export const ORG_NAME = 'Prompt Anatomy'
export const ORG_NAME_LT = 'Promptų anatomija'
export const ORG_EMAIL = 'info@promptanatomy.app'

export const ORG_STREET = '1311 Park St'
export const ORG_UNIT = 'Unit #654'
export const ORG_STREET_ADDRESS = `${ORG_STREET}, ${ORG_UNIT}`
export const ORG_LOCALITY = 'Alameda'
export const ORG_REGION = 'CA'
export const ORG_POSTAL_CODE = '94501'
export const ORG_COUNTRY = 'US'

const ORG_DESCRIPTION =
  'Learn to run AI like an operating system. Prompt engineering, automation and AI agents for real business results.'

export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`

/** Lines for visible mailing address (footer, legal). */
export function formatMailingAddressLines() {
  return [ORG_NAME, ORG_STREET, ORG_UNIT, `${ORG_LOCALITY}, ${ORG_REGION} ${ORG_POSTAL_CODE}`]
}

/** Single-line mailing address for llms.txt and meta copy. */
export function formatMailingAddressOneLine() {
  return `${ORG_NAME}, ${ORG_STREET_ADDRESS}, ${ORG_LOCALITY}, ${ORG_REGION} ${ORG_POSTAL_CODE}, ${ORG_COUNTRY}`
}

export function getOrganizationPostalAddressSchema() {
  return {
    '@type': 'PostalAddress',
    streetAddress: ORG_STREET_ADDRESS,
    addressLocality: ORG_LOCALITY,
    addressRegion: ORG_REGION,
    postalCode: ORG_POSTAL_CODE,
    addressCountry: ORG_COUNTRY,
  }
}

export function getOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: ORG_NAME_LT,
    alternateName: ORG_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: OG_IMAGE_URL,
    },
    description: ORG_DESCRIPTION,
    address: getOrganizationPostalAddressSchema(),
    contactPoint: {
      '@type': 'ContactPoint',
      email: ORG_EMAIL,
      contactType: 'customer service',
    },
  }
}

export function getWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: ORG_NAME,
    description: ORG_DESCRIPTION,
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: ['en', 'lt'],
  }
}
