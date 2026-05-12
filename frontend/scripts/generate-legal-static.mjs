/**
 * After `vite build`, writes dist/privacy.html and dist/terms.html from en.json
 * so crawlers get real body text + correct canonical on first byte.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')
const enPath = join(__dirname, '..', 'src', 'i18n', 'translations', 'en.json')

const SITE_URL = (process.env.VITE_SITE_URL || 'https://www.promptanatomy.app').replace(/\/$/, '')
const ROUTE_LAST_MODIFIED = '2026-03-14'
const ORGANIZATION_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`
const OG_IMAGE_URL = `${SITE_URL}/og-image.png`

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escapeAttr(s) {
  return escapeHtml(s)
}

function safeJsonLd(obj) {
  return JSON.stringify(obj).replace(/</g, '\\u003c')
}

function readEn() {
  return JSON.parse(readFileSync(enPath, 'utf8'))
}

function webPageSchema({ path, title, description }) {
  const canonicalUrl = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: title,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANIZATION_ID },
    inLanguage: 'en',
    dateModified: ROUTE_LAST_MODIFIED,
  }
}

function headBlock({ title, description, path }) {
  const url = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
  const ld = [webPageSchema({ path, title, description })]
  const ogImageAlt = 'Prompt Anatomy social preview'

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeAttr(description)}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="${escapeAttr(url)}" />
  <meta property="og:title" content="${escapeAttr(title)}" />
  <meta property="og:description" content="${escapeAttr(description)}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${escapeAttr(url)}" />
  <meta property="og:image" content="${escapeAttr(OG_IMAGE_URL)}" />
  <meta property="og:image:alt" content="${escapeAttr(ogImageAlt)}" />
  <meta property="og:locale" content="en_US" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeAttr(title)}" />
  <meta name="twitter:description" content="${escapeAttr(description)}" />
  <meta name="twitter:image" content="${escapeAttr(OG_IMAGE_URL)}" />
  <script type="application/ld+json">${safeJsonLd(ld)}</script>
  <style>
    :root { --brand-dark: #0b1320; --brand-accent: #cfa73a; --muted: #475569; }
    body { margin: 0; font-family: ui-sans-serif, system-ui, sans-serif; background: #f8fafc; color: var(--brand-dark); -webkit-font-smoothing: antialiased; }
    .wrap { max-width: 42rem; margin: 0 auto; padding: 4rem 1.5rem; }
    nav[aria-label="Breadcrumb"] { margin-bottom: 2rem; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); }
    nav ol { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; }
    nav a { color: var(--muted); text-decoration: none; }
    nav a:hover { color: var(--brand-accent); }
    h1 { font-size: clamp(1.875rem, 4vw, 2.25rem); font-weight: 900; letter-spacing: -0.025em; margin: 0 0 0.5rem; color: var(--brand-dark); }
    .lead { font-size: 0.875rem; color: var(--muted); margin: 0 0 2rem; line-height: 1.6; }
    .sections { display: flex; flex-direction: column; gap: 2rem; margin-bottom: 2.5rem; }
    section h2 { font-size: 1.125rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 0.5rem; color: var(--brand-dark); }
    section p { margin: 0; font-weight: 500; line-height: 1.625; color: var(--muted); }
    .back { display: inline-flex; align-items: center; gap: 0.5rem; font-weight: 700; color: var(--brand-accent); text-decoration: none; }
    .back:hover { text-decoration: underline; }
    .back svg { width: 1.25rem; height: 1.25rem; flex-shrink: 0; }
  </style>
</head>`
}

function backArrowSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`
}

function privacyBody(L) {
  return `<body>
  <div class="wrap">
    <nav aria-label="Breadcrumb">
      <ol>
        <li><a href="${escapeAttr(`${SITE_URL}/`)}">${escapeHtml(L.common.home)}</a></li>
        <li aria-hidden="true">/</li>
        <li aria-current="page">${escapeHtml(L.legal.privacyPolicy)}</li>
      </ol>
    </nav>
    <article>
      <h1>${escapeHtml(L.legal.privacyPolicy)}</h1>
      <p class="lead">${escapeHtml(L.legal.privacyIntro)}</p>
      <p class="lead">${escapeHtml(L.legal.privacyEcosystemNote)}</p>
      <div class="sections">
        <section>
          <h2>${escapeHtml(L.legal.privacyPrinciplesTitle)}</h2>
          <p>${escapeHtml(L.legal.privacyPrinciples)}</p>
        </section>
        <section>
          <h2>${escapeHtml(L.legal.privacyDataTitle)}</h2>
          <p>${escapeHtml(L.legal.privacyData)}</p>
        </section>
        <section>
          <h2>${escapeHtml(L.legal.privacyRightsTitle)}</h2>
          <p>${escapeHtml(L.legal.privacyRights)}</p>
        </section>
      </div>
    </article>
    <a class="back" href="${escapeAttr(`${SITE_URL}/`)}">${backArrowSvg()}${escapeHtml(L.common.backToHome)}</a>
  </div>
</body>
</html>`
}

function termsBody(L) {
  return `<body>
  <div class="wrap">
    <nav aria-label="Breadcrumb">
      <ol>
        <li><a href="${escapeAttr(`${SITE_URL}/`)}">${escapeHtml(L.common.home)}</a></li>
        <li aria-hidden="true">/</li>
        <li aria-current="page">${escapeHtml(L.legal.termsOfService)}</li>
      </ol>
    </nav>
    <article>
      <h1>${escapeHtml(L.legal.termsOfService)}</h1>
      <p class="lead">${escapeHtml(L.legal.termsIntro)}</p>
      <p class="lead">${escapeHtml(L.legal.termsEcosystemNote)}</p>
      <div class="sections">
        <section>
          <h2>${escapeHtml(L.legal.termsScopeTitle)}</h2>
          <p>${escapeHtml(L.legal.termsScope)}</p>
        </section>
        <section>
          <h2>${escapeHtml(L.legal.termsInvoiceTitle)}</h2>
          <p>${escapeHtml(L.legal.termsInvoice)}</p>
        </section>
        <section>
          <h2>${escapeHtml(L.legal.termsVatTitle)}</h2>
          <p>${escapeHtml(L.legal.termsVat)}</p>
        </section>
        <section>
          <h2>${escapeHtml(L.legal.termsSupportTitle)}</h2>
          <p>${escapeHtml(L.legal.termsSupport)}</p>
        </section>
      </div>
    </article>
    <a class="back" href="${escapeAttr(`${SITE_URL}/`)}">${backArrowSvg()}${escapeHtml(L.common.backToHome)}</a>
  </div>
</body>
</html>`
}

if (!existsSync(distDir)) {
  console.error('generate-legal-static: dist/ not found. Run vite build first.')
  process.exit(1)
}

const L = readEn()

const privacyHtml =
  headBlock({
    title: L.legal.privacyTitle,
    description: L.legal.privacyDescription,
    path: '/privacy',
  }) + privacyBody(L)

const termsHtml =
  headBlock({
    title: L.legal.termsTitle,
    description: L.legal.termsDescription,
    path: '/terms',
  }) + termsBody(L)

writeFileSync(join(distDir, 'privacy.html'), privacyHtml, 'utf8')
writeFileSync(join(distDir, 'terms.html'), termsHtml, 'utf8')
console.log('generate-legal-static: wrote dist/privacy.html and dist/terms.html')
