/**
 * After vite build: writes dist/lt.html and dist/en.html with route-correct canonical,
 * hreflang and locale copy on first byte (same SPA shell as index.html).
 * Patches dist/index.html hreflang.
 *
 * Title / description / og / twitter text comes from src/i18n/translations/*.json, so a
 * crawler or AI retriever that runs no JS sees the locale's own copy instead of the EN
 * shell default. SeoHead.jsx sets the same values once React mounts.
 *
 * ADR-0003: the same script also writes a static, class-less body (H1, hero, What Is +
 * six blocks, pricing, FAQ, nav) into `#root` from the same JSON + geo-manifest, so the
 * raw HTML carries the page text without JS. React `createRoot().render()` replaces it;
 * the `html.js [data-static-shell]` guard in index.html hides it as soon as JS runs.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PUBLIC_PRICING, SIX_BLOCKS, SIX_BLOCK_SUMMARY } from '../src/site/geo-manifest.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')
const indexPath = join(distDir, 'index.html')
const enPath = join(__dirname, '..', 'src', 'i18n', 'translations', 'en.json')
const ltPath = join(__dirname, '..', 'src', 'i18n', 'translations', 'lt.json')

const SITE_URL = (process.env.VITE_SITE_URL || 'https://www.promptanatomy.app').replace(/\/$/, '')

const HREFLANG_BLOCK = `
    <link rel="alternate" hreflang="lt" href="${SITE_URL}/lt" />
    <link rel="alternate" hreflang="en" href="${SITE_URL}/" />
    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />`

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'))
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const escapeAttr = escapeHtml

/**
 * Replacement is passed as a function because locale copy may contain $& / $1,
 * which String.replace would otherwise expand. Throws instead of silently skipping:
 * a missed pattern would ship an English page under hreflang="lt".
 */
function replaceOnce(html, pattern, replacement, label) {
  pattern.lastIndex = 0
  if (!pattern.test(html)) {
    throw new Error(
      `generate-locale-static: no match for ${label} in dist/index.html — shell markup changed`,
    )
  }
  pattern.lastIndex = 0
  return html.replace(pattern, () => replacement)
}

function replaceJsonLdDescription(html, from, to) {
  if (from === to) return html
  const needle = `"description": ${JSON.stringify(from)}`
  const next = `"description": ${JSON.stringify(to)}`
  return html.replaceAll(needle, () => next)
}

/**
 * Static first-byte body (ADR-0003). Semantic HTML only — no classes, no styles.
 * Every string comes from the locale JSON or geo-manifest; nothing new is authored here.
 */
function buildStaticBody(locale, json) {
  const e = escapeHtml
  const homePath = locale === 'lt' ? '/lt' : '/'
  const hero = json.hero || {}
  const whatIs = json.whatIs || {}
  const pricing = json.pricing || {}
  const faq = json.faq || {}
  const nav = json.nav || {}
  const footer = json.footer || {}

  const heroBullets = [hero.bullet1, hero.bullet2, hero.bullet3]
    .filter(Boolean)
    .map((b) => `<li>${e(b)}</li>`)
    .join('')

  const blocks = SIX_BLOCKS.map(
    (b) => `<li><strong>${e(b[locale].name)}</strong>: ${e(b[locale].definition)}</li>`,
  ).join('')

  const plans = PUBLIC_PRICING.map((p) => {
    const bullets = (pricing.planBullets?.[p.id] || []).map((x) => `<li>${e(x)}</li>`).join('')
    const label = pricing.plans?.[p.id] || p.label
    return `<li><h3>${e(label)} – ${p.priceEur} EUR</h3><p>${e(pricing.mods || 'modules')} ${e(p.modules)}</p><ul>${bullets}</ul></li>`
  }).join('')

  const faqItems = (faq.items || [])
    .map((item) => `<h3>${e(item.q)}</h3><p>${e(item.a)}</p>`)
    .join('')

  const navLinks = [
    [`${homePath}#what-is-prompt-anatomy`, nav.whatIs],
    [`${homePath}#pricing`, footer.pricing || nav.cta],
    [`${homePath}#faq`, footer.faq],
    ['/privacy', footer.privacyPolicy],
    ['/terms', footer.termsOfService],
  ]
    .filter(([, label]) => label)
    .map(([href, label]) => `<li><a href="${e(href)}">${e(label)}</a></li>`)
    .join('')

  return (
    `<div data-static-shell>` +
    `<header><nav aria-label="${e(nav.ariaNav || 'Main navigation')}"><ul>` +
    `<li><a href="/">English</a></li><li><a href="/lt">Lietuvių</a></li>${navLinks}` +
    `</ul></nav></header>` +
    `<main>` +
    `<section><h1>${e(hero.headline1 || '')} ${e(hero.headline2 || '')}</h1>` +
    `<p>${e(hero.subtitle || '')}</p><ul>${heroBullets}</ul></section>` +
    `<section><h2>${e(whatIs.title || '')}</h2>` +
    `<p>${e(whatIs.valueLine1 || '')}</p><p>${e(whatIs.valueLine2 || '')}</p>` +
    `<p>${e(SIX_BLOCK_SUMMARY[locale])}</p><ol>${blocks}</ol></section>` +
    `<section><h2>${e(pricing.title || '')}</h2><p>${e(pricing.subtext || '')}</p>` +
    `<ul>${plans}</ul><p>${e(pricing.forTeamsBody || '')}</p></section>` +
    `<section><h2>${e(faq.title || '')}</h2>${faqItems}</section>` +
    `</main>` +
    `<footer><p>${e(footer.tagline || '')} ${e(footer.creator || '')}</p></footer>` +
    `</div>`
  )
}

function patchHomeShell(
  html,
  {
    lang,
    canonicalUrl,
    ogUrl,
    ogLocale,
    title,
    description,
    ogImageAlt,
    sourceDescription,
    staticBody,
  },
) {
  const safeTitle = escapeHtml(title)
  const safeDescription = escapeAttr(description)
  const safeOgImageAlt = escapeAttr(ogImageAlt)

  let out = html

  out = replaceOnce(out, /<html lang="[^"]*">/, `<html lang="${lang}">`, 'html lang')
  out = replaceOnce(out, /<title>[^<]*<\/title>/, `<title>${safeTitle}</title>`, 'title')
  out = replaceOnce(
    out,
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${safeDescription}" />`,
    'meta description',
  )
  out = replaceOnce(
    out,
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${safeTitle}" />`,
    'og:title',
  )
  out = replaceOnce(
    out,
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${safeDescription}" />`,
    'og:description',
  )
  out = replaceOnce(
    out,
    /<meta property="og:image:alt" content="[^"]*" \/>/,
    `<meta property="og:image:alt" content="${safeOgImageAlt}" />`,
    'og:image:alt',
  )
  out = replaceOnce(
    out,
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${safeTitle}" />`,
    'twitter:title',
  )
  out = replaceOnce(
    out,
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${safeDescription}" />`,
    'twitter:description',
  )
  out = replaceOnce(
    out,
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${escapeAttr(canonicalUrl)}" />`,
    'canonical',
  )
  out = replaceOnce(
    out,
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${escapeAttr(ogUrl)}" />`,
    'og:url',
  )

  if (out.includes('property="og:locale"')) {
    out = out.replace(
      /<meta property="og:locale" content="[^"]*" \/>/,
      () => `<meta property="og:locale" content="${ogLocale}" />`,
    )
  } else {
    out = replaceOnce(
      out,
      /<meta property="og:type" content="website" \/>/,
      `<meta property="og:type" content="website" />\n    <meta property="og:locale" content="${ogLocale}" />`,
      'og:type (og:locale anchor)',
    )
  }

  if (!out.includes('hreflang="lt"')) {
    out = out.replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      (match) => `${match}${HREFLANG_BLOCK}`,
    )
  }

  if (sourceDescription) {
    out = replaceJsonLdDescription(out, sourceDescription, description)
  }

  if (staticBody) {
    out = replaceOnce(
      out,
      /<div id="root"><\/div>/,
      `<div id="root">${staticBody}</div>`,
      'empty #root (static body)',
    )
  }

  return out
}

if (!existsSync(indexPath)) {
  console.error('generate-locale-static: dist/index.html not found. Run vite build first.')
  process.exit(1)
}

const shell = readFileSync(indexPath, 'utf8')
const en = readJson(enPath)
const lt = readJson(ltPath)

const EN_SHELL = {
  lang: 'en',
  canonicalUrl: `${SITE_URL}/`,
  ogUrl: `${SITE_URL}/`,
  ogLocale: 'en_US',
  title: en.meta.title,
  description: en.meta.description,
  ogImageAlt: 'Prompt Anatomy social preview',
  sourceDescription: en.meta.description,
  staticBody: buildStaticBody('en', en),
}

const indexHtml = patchHomeShell(shell, EN_SHELL)

const ltHtml = patchHomeShell(shell, {
  lang: 'lt',
  canonicalUrl: `${SITE_URL}/lt`,
  ogUrl: `${SITE_URL}/lt`,
  ogLocale: 'lt_LT',
  title: lt.meta.title,
  description: lt.meta.description,
  ogImageAlt: 'Promptų Anatomija social preview',
  sourceDescription: en.meta.description,
  staticBody: buildStaticBody('lt', lt),
})

const enHtml = patchHomeShell(shell, EN_SHELL)

writeFileSync(indexPath, indexHtml, 'utf8')
writeFileSync(join(distDir, 'lt.html'), ltHtml, 'utf8')
writeFileSync(join(distDir, 'en.html'), enHtml, 'utf8')

console.log(
  'generate-locale-static: patched dist/index.html; wrote dist/lt.html and dist/en.html (static first-byte body, ADR-0003)',
)
