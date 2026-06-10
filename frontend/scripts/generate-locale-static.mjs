/**
 * After vite build: writes dist/lt.html and dist/en.html with route-correct canonical
 * and hreflang on first byte (same SPA shell as index.html). Patches dist/index.html hreflang.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')
const indexPath = join(distDir, 'index.html')

const SITE_URL = (process.env.VITE_SITE_URL || 'https://www.promptanatomy.app').replace(/\/$/, '')

const HREFLANG_BLOCK = `
    <link rel="alternate" hreflang="lt" href="${SITE_URL}/lt" />
    <link rel="alternate" hreflang="en" href="${SITE_URL}/" />
    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />`

function patchHomeShell(html, { lang, canonicalUrl, ogUrl, ogLocale }) {
  let out = html
  out = out.replace(/<html lang="[^"]*">/, `<html lang="${lang}">`)
  out = out.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${canonicalUrl}" />`,
  )
  out = out.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${ogUrl}" />`,
  )

  if (out.includes('property="og:locale"')) {
    out = out.replace(/<meta property="og:locale" content="[^"]*" \/>/, `<meta property="og:locale" content="${ogLocale}" />`)
  } else {
    out = out.replace(
      /<meta property="og:type" content="website" \/>/,
      `<meta property="og:type" content="website" />\n    <meta property="og:locale" content="${ogLocale}" />`,
    )
  }

  if (!out.includes('hreflang="lt"')) {
    out = out.replace(/<link rel="canonical" href="[^"]*" \/>/, (match) => `${match}${HREFLANG_BLOCK}`)
  }

  return out
}

if (!existsSync(indexPath)) {
  console.error('generate-locale-static: dist/index.html not found. Run vite build first.')
  process.exit(1)
}

const shell = readFileSync(indexPath, 'utf8')

const indexHtml = patchHomeShell(shell, {
  lang: 'en',
  canonicalUrl: `${SITE_URL}/`,
  ogUrl: `${SITE_URL}/`,
  ogLocale: 'en_US',
})

const ltHtml = patchHomeShell(shell, {
  lang: 'lt',
  canonicalUrl: `${SITE_URL}/lt`,
  ogUrl: `${SITE_URL}/lt`,
  ogLocale: 'lt_LT',
})

const enHtml = patchHomeShell(shell, {
  lang: 'en',
  canonicalUrl: `${SITE_URL}/`,
  ogUrl: `${SITE_URL}/en`,
  ogLocale: 'en_US',
})

writeFileSync(indexPath, indexHtml, 'utf8')
writeFileSync(join(distDir, 'lt.html'), ltHtml, 'utf8')
writeFileSync(join(distDir, 'en.html'), enHtml, 'utf8')

console.log('generate-locale-static: patched dist/index.html; wrote dist/lt.html and dist/en.html')
