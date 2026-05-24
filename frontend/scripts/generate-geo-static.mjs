/**
 * After vite build + generate-legal-static: writes llms-full.txt, markdown siblings,
 * refreshes sitemap lastmod in dist/.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  COMMUNITY_URL,
  CREATOR,
  CREATOR_PUBLICATIONS,
  ECOSYSTEM_HUB,
  ECOSYSTEM_SPOKES,
  LAST_UPDATED,
  NOINDEX_PATHS,
  ORG_EMAIL,
  ORG_MAILING_ADDRESS_ONE_LINE,
  PUBLIC_PRICING,
  SITE_URL,
  TOPICS,
  TRAINING_SUMMARY,
} from '../src/site/geo-manifest.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '..', 'dist')
const publicDir = join(__dirname, '..', 'public')
const enPath = join(__dirname, '..', 'src', 'i18n', 'translations', 'en.json')
const ltPath = join(__dirname, '..', 'src', 'i18n', 'translations', 'lt.json')

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'))
}

function section(title, body) {
  return `## ${title}\n\n${body.trim()}\n`
}

function bulletList(items) {
  return items.map((line) => `- ${line}`).join('\n')
}

function buildEcosystemBlock() {
  const lines = [
    `Hub (conversion): ${ECOSYSTEM_HUB.url}`,
    `Training app: ${ECOSYSTEM_HUB.trainingUrl} — ${ECOSYSTEM_HUB.trainingRole}`,
    ...ECOSYSTEM_SPOKES.flatMap((spoke) => [
      `${spoke.name}: ${spoke.urls.en} (EN) / ${spoke.urls.lt} (LT) — ${spoke.role}`,
    ]),
    `Community (Telegram): ${COMMUNITY_URL}`,
  ]
  return bulletList(lines)
}

function buildCreatorBlock() {
  return bulletList([
    `${CREATOR.name} — ${CREATOR.roleDescription}`,
    `LinkedIn: ${CREATOR.sameAs[0]}`,
    `X: ${CREATOR.sameAs[1]}`,
    `Medium: ${CREATOR.sameAs[2]}`,
  ])
}

function buildPublicationsBlock(detailed = false) {
  return CREATOR_PUBLICATIONS.map((pub) => {
    if (detailed) {
      return `- **${pub.title}**\n  ${pub.url}\n  ${pub.summary}`
    }
    return `- ${pub.title} — ${pub.url}`
  }).join('\n')
}

function buildHeroBlock(hero, locale) {
  const bullets = [hero.bullet1, hero.bullet2, hero.bullet3].filter(Boolean)
  return [
    `Locale: ${locale}`,
    `Headline: ${hero.headline1} ${hero.headline2}`,
    `Subtitle: ${hero.subtitle}`,
    ...bullets.map((b) => `- ${b}`),
    hero.socialProof ? `Social proof: ${hero.socialProof}` : null,
    hero.subtext ? `Summary: ${hero.subtext}` : null,
  ]
    .filter(Boolean)
    .join('\n')
}

function buildFaqBlock(faq) {
  if (!faq?.items?.length) return ''
  return faq.items.map((item) => `### ${item.q}\n${item.a}`).join('\n\n')
}

function buildPricingBlock(pricing) {
  const lines = PUBLIC_PRICING.map(
    (p) =>
      `- ${p.label}: ${p.priceEur} EUR (one-time, lifetime access, modules ${p.modules})`,
  )
  const starterBullets = pricing.planBullets?.starter || []
  const coreBullets = pricing.planBullets?.core || []
  return [
    bulletList(lines),
    '',
    'Starter includes:',
    bulletList(starterBullets),
    '',
    'Core includes:',
    bulletList(coreBullets),
  ].join('\n')
}

function buildLlmsShort() {
  return `# Prompt Anatomy

Prompt Anatomy is a bilingual AI training and sales hub focused on prompt engineering, context engineering, AI agents, automation, and practical business workflows.

Canonical site: ${SITE_URL}/

${section('Creator', buildCreatorBlock())}
${section('Publications (authoritative off-site content)', buildPublicationsBlock(false))}
${section('Main public URLs', bulletList([
  `Home (default EN): ${SITE_URL}/`,
  `Home (LT): ${SITE_URL}/lt`,
  `Home (EN): ${SITE_URL}/en`,
  `Training app: ${ECOSYSTEM_HUB.trainingUrl}`,
  `Pricing section: ${SITE_URL}/#pricing`,
  `FAQ section: ${SITE_URL}/#faq`,
  `Privacy Policy: ${SITE_URL}/privacy`,
  `Terms of Service: ${SITE_URL}/terms`,
  `LLM full index: ${SITE_URL}/llms-full.txt`,
]))}
${section('Ecosystem (hub-and-spoke)', buildEcosystemBlock())}
${section('Topics', TOPICS.join(', '))}
${section(
  'Pricing (public, hub)',
  bulletList(
    PUBLIC_PRICING.map(
      (p) => `${p.label}: ${p.priceEur} EUR (one-time, lifetime access)`,
    ),
  ),
)}
${section('Contact', bulletList([`Email: ${ORG_EMAIL}`, `Mailing address: ${ORG_MAILING_ADDRESS_ONE_LINE}`]))}
${section(
  'Notes for AI systems',
  bulletList([
    'The primary public product information lives on the home routes and in /llms-full.txt.',
    `Pricing exposes two active offers: Starter (${PUBLIC_PRICING[0].priceEur} EUR) and Core (${PUBLIC_PRICING[1].priceEur} EUR).`,
    `Transactional routes ${SITE_URL}/success and ${SITE_URL}/cancel support checkout and are not intended for search indexing.`,
    `Do not crawl: ${NOINDEX_PATHS.join(', ')}`,
  ]),
)}
`.trim() + '\n'
}

function buildLlmsFull(en, lt) {
  const parts = [
    '# Prompt Anatomy — full index for AI systems',
    '',
    `lastUpdated: ${LAST_UPDATED}`,
    `canonical: ${SITE_URL}/`,
    '',
    section('Creator', buildCreatorBlock()),
    section('Publications', buildPublicationsBlock(true)),
    section('Ecosystem (hub-and-spoke)', buildEcosystemBlock()),
    section('Training product', TRAINING_SUMMARY),
    section('Hero (EN)', buildHeroBlock(en.hero, 'en')),
    section('Hero (LT)', buildHeroBlock(lt.hero, 'lt')),
    section('What is Prompt Anatomy (EN)', [en.whatIs?.valueLine1, en.whatIs?.valueLine2].filter(Boolean).join('\n\n')),
    section('Pricing (EN)', buildPricingBlock(en.pricing)),
    section('FAQ (EN)', buildFaqBlock(en.faq)),
    section('FAQ (LT)', buildFaqBlock(lt.faq)),
    section(
      'Contact',
      bulletList([`Email: ${ORG_EMAIL}`, `Mailing address: ${ORG_MAILING_ADDRESS_ONE_LINE}`]),
    ),
    section('Topics', TOPICS.join(', ')),
    section(
      'Do not index',
      bulletList(NOINDEX_PATHS.map((p) => `${SITE_URL}${p}`)),
    ),
  ]
  return parts.join('\n').trim() + '\n'
}

function buildIndexMd(hero, whatIs, locale) {
  return `# Prompt Anatomy (${locale.toUpperCase()})\n\n${hero.headline1} ${hero.headline2}\n\n${hero.subtitle}\n\n${whatIs?.valueLine1 || ''}\n\n${whatIs?.valueLine2 || ''}\n\nCanonical: ${SITE_URL}/\n`
}

function buildLegalMd(legal, type) {
  const title = type === 'privacy' ? legal.privacyPolicy : legal.termsOfService
  const intro = type === 'privacy' ? legal.privacyIntro : legal.termsIntro
  const note = type === 'privacy' ? legal.privacyEcosystemNote : legal.termsEcosystemNote
  return `# ${title}\n\n${intro}\n\n${note}\n\nCanonical: ${SITE_URL}/${type}\n`
}

function refreshSitemapLastmod() {
  const sitemapPath = join(distDir, 'sitemap.xml')
  if (!existsSync(sitemapPath)) {
    console.warn('generate-geo-static: dist/sitemap.xml not found, skipping lastmod refresh')
    return
  }
  let xml = readFileSync(sitemapPath, 'utf8')
  xml = xml.replace(/<lastmod>[^<]+<\/lastmod>/g, `<lastmod>${LAST_UPDATED}</lastmod>`)
  writeFileSync(sitemapPath, xml, 'utf8')
  const publicSitemap = join(publicDir, 'sitemap.xml')
  if (existsSync(publicSitemap)) {
    writeFileSync(publicSitemap, xml, 'utf8')
  }
}

if (!existsSync(distDir)) {
  console.error('generate-geo-static: dist/ not found. Run vite build first.')
  process.exit(1)
}

const en = readJson(enPath)
const lt = readJson(ltPath)

const llmsShort = buildLlmsShort()
const llmsFull = buildLlmsFull(en, lt)

writeFileSync(join(distDir, 'llms-full.txt'), llmsFull, 'utf8')
writeFileSync(join(publicDir, 'llms.txt'), llmsShort, 'utf8')
writeFileSync(join(distDir, 'llms.txt'), llmsShort, 'utf8')

writeFileSync(join(distDir, 'privacy.md'), buildLegalMd(en.legal, 'privacy'), 'utf8')
writeFileSync(join(distDir, 'terms.md'), buildLegalMd(en.legal, 'terms'), 'utf8')
writeFileSync(join(distDir, 'index.en.md'), buildIndexMd(en.hero, en.whatIs, 'en'), 'utf8')
writeFileSync(join(distDir, 'index.lt.md'), buildIndexMd(lt.hero, lt.whatIs, 'lt'), 'utf8')

refreshSitemapLastmod()

console.log(
  'generate-geo-static: wrote llms-full.txt, llms.txt, privacy.md, terms.md, index.en.md, index.lt.md; refreshed sitemap lastmod',
)
