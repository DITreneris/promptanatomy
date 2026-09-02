/** Hub → first-party spoke attribution. Do not put these params in i18n or geo-manifest URLs. */

export const APP_UTM_SOURCE = 'app'

export const APP_UTM_MEDIUM = {
  footerNetwork: 'footer_network',
  navbarMobile: 'navbar_mobile',
  ecosystemCard: 'ecosystem_card',
  ecosystemSiteMap: 'ecosystem_site_map',
}

/** Tab-napping guard only. Referer must reach sibling Vercel analytics. */
export const FIRST_PARTY_REL = 'noopener'
export const THIRD_PARTY_REL = 'noopener noreferrer'

function hostnameOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

export function isFirstPartySibling(url) {
  const host = hostnameOf(url)
  return host.startsWith('promptanatomy.') && host !== 'promptanatomy.app'
}

export function withAppUtm(url, medium) {
  if (!url || !medium) return url
  let parsed
  try {
    parsed = new URL(url)
  } catch {
    return url
  }
  if (!parsed.searchParams.has('utm_source')) {
    parsed.searchParams.set('utm_source', APP_UTM_SOURCE)
  }
  if (!parsed.searchParams.has('utm_medium')) {
    parsed.searchParams.set('utm_medium', medium)
  }
  return parsed.toString()
}

export function siblingHref(url, medium) {
  return isFirstPartySibling(url) ? withAppUtm(url, medium) : url
}

export function outboundRel(url) {
  return isFirstPartySibling(url) ? FIRST_PARTY_REL : THIRD_PARTY_REL
}
