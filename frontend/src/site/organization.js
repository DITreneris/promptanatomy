/**
 * Official org contact – single source for footer, JSON-LD, legal copy, llms.txt.
 * Keep frontend/index.html Organization (address + sameAs) in sync when changing these values.
 * Founder / publications / ecosystem GEO: frontend/src/site/geo-manifest.js
 *
 * OG assets (intentional split):
 * - Social meta (og:image / twitter:image) → og-image-v3.jpg (SeoHead, index.html)
 * - JSON-LD Organization.logo → og-image.png (this file / index.html)
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
  'Turn random AI chats into repeatable business workflows. Six-block method, 500+ templates, interactive training.'

/** Entity graph profiles for Organization.sameAs (must match index.html). */
export const ORG_SAME_AS = [
  'https://t.me/prompt_anatomy',
  'https://medium.com/@tomas.staniulis76',
  'https://promptanatomy.site',
  'https://www.linkedin.com/in/staniulis',
  'https://x.com/TStaniulis_NFT',
  'https://github.com/DITreneris/promptanatomy',
]

export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`
/** JSON-LD Organization.logo only — social cards use og-image-v3.jpg. */
export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`
export const OG_SOCIAL_IMAGE_URL = `${SITE_URL}/og-image-v3.jpg`

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
    sameAs: ORG_SAME_AS,
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
