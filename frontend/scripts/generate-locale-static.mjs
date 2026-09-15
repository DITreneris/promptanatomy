/**
 * After vite build: writes dist/lt.html and dist/en.html with route-correct canonical,
 * hreflang and locale copy on first byte (same SPA shell as index.html).
 * Patches dist/index.html hreflang.
 *
 * Title / description / og / twitter text comes from src/i18n/translations/*.json, so a
 * crawler or AI retriever that runs no JS sees the locale's own copy instead of the EN
 * shell default. SeoHead.jsx sets the same values once React mounts.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

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

function patchHomeShell(
  html,
  { lang, canonicalUrl, ogUrl, ogLocale, title, description, ogImageAlt, sourceDescription },
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
})

const enHtml = patchHomeShell(shell, EN_SHELL)

writeFileSync(indexPath, indexHtml, 'utf8')
writeFileSync(join(distDir, 'lt.html'), ltHtml, 'utf8')
writeFileSync(join(distDir, 'en.html'), enHtml, 'utf8')

console.log('generate-locale-static: patched dist/index.html; wrote dist/lt.html and dist/en.html')
