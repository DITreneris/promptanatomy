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
  ECOSYSTEM_DISCOVERY,
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

function mdLink(label, url, note) {
  return note ? `- [${label}](${url}): ${note}` : `- [${label}](${url})`
}

function buildEcosystemBlock() {
  const lines = [
    `Hub (conversion): ${ECOSYSTEM_HUB.url}`,
    `Training app: ${ECOSYSTEM_HUB.trainingUrl} — ${ECOSYSTEM_HUB.trainingRole}`,
    `${ECOSYSTEM_DISCOVERY.name}: ${ECOSYSTEM_DISCOVERY.url} — ${ECOSYSTEM_DISCOVERY.role}`,
    ...ECOSYSTEM_SPOKES.flatMap((spoke) => [
      `${spoke.name}: ${spoke.urls.en} (EN) / ${spoke.urls.lt} (LT) — ${spoke.role}`,
    ]),
    `Community (Telegram): ${COMMUNITY_URL}`,
  ]
  return bulletList(lines)
}

function buildEcosystemShortLinks() {
  return [
    mdLink('Hub (conversion)', ECOSYSTEM_HUB.url, ECOSYSTEM_HUB.role),
    mdLink('Training app', ECOSYSTEM_HUB.trainingUrl, ECOSYSTEM_HUB.trainingRole),
    mdLink(ECOSYSTEM_DISCOVERY.name, ECOSYSTEM_DISCOVERY.url, ECOSYSTEM_DISCOVERY.role),
    ...ECOSYSTEM_SPOKES.map((spoke) =>
      mdLink(spoke.name, spoke.urls.en, `${spoke.role} (LT: ${spoke.urls.lt})`),
    ),
    mdLink('Community (Telegram)', COMMUNITY_URL, 'Public practitioner support group'),
  ].join('\n')
}

function buildCreatorBlock() {
  return bulletList([
    `${CREATOR.name} — ${CREATOR.roleDescription}`,
    `LinkedIn: ${CREATOR.sameAs[0]}`,
    `X: ${CREATOR.sameAs[1]}`,
    `Medium: ${CREATOR.sameAs[2]}`,
  ])
}

function buildCreatorShortLinks() {
  return [
    mdLink(`${CREATOR.name} — LinkedIn`, CREATOR.sameAs[0], CREATOR.roleDescription),
    mdLink(`${CREATOR.name} — X`, CREATOR.sameAs[1], 'Founder profile'),
    mdLink(`${CREATOR.name} — Medium`, CREATOR.sameAs[2], 'Authoritative essays'),
  ].join('\n')
}

function buildPublicationsBlock(detailed = false) {
  return CREATOR_PUBLICATIONS.map((pub) => {
    if (detailed) {
      return `- **${pub.title}**\n  ${pub.url}\n  ${pub.summary}`
    }
    return `- ${pub.title} — ${pub.url}`
  }).join('\n')
}

function buildPublicationsShortLinks() {
  return CREATOR_PUBLICATIONS.map((pub) => mdLink(pub.title, pub.url, pub.summary)).join('\n')
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
  const pricingLines = PUBLIC_PRICING.map((p) =>
    mdLink(
      `${p.label} (${p.priceEur} EUR)`,
      `${SITE_URL}/#pricing`,
      `One-time, lifetime access, modules ${p.modules}`,
    ),
  ).join('\n')

  return `# Prompt Anatomy

> Bilingual AI training hub: prompt engineering, context architecture, agents, automation. Canonical: ${SITE_URL}/

Prompt Anatomy (\`promptanatomy.app\`) is the conversion hub for LT/EN checkout, access, and the interactive training app. The Six-Block Method is the Prompt Anatomy canon; five-part tools on ecosystem spokes are Quick mode and map onto the six blocks. For exhaustive FAQ, hero, and pricing copy, prefer ${SITE_URL}/llms-full.txt. Ecosystem spokes are free workflow tools that route back to this hub.

${section(
  'Main',
  [
    mdLink('Home EN', `${SITE_URL}/`, 'Default English landing (canonical)'),
    mdLink('Home LT', `${SITE_URL}/lt`, 'Lithuanian landing'),
    mdLink('Home EN share URL', `${SITE_URL}/en`, 'Routable share URL; canonical consolidates to /'),
    mdLink('Pricing', `${SITE_URL}/#pricing`, 'Starter and Core offers'),
    mdLink('FAQ', `${SITE_URL}/#faq`, 'Common questions and answers'),
    mdLink('Full LLM index', `${SITE_URL}/llms-full.txt`, 'Complete AI dump: FAQ LT/EN, hero, pricing'),
  ].join('\n'),
)}
${section('Creator', buildCreatorShortLinks())}
${section('Publications', buildPublicationsShortLinks())}
${section('Ecosystem', buildEcosystemShortLinks())}
${section('Pricing', pricingLines)}
${section(
  'Contact',
  bulletList([`Email: ${ORG_EMAIL}`, `Mailing address: ${ORG_MAILING_ADDRESS_ONE_LINE}`]),
)}
${section('Topics', TOPICS.join(', '))}
${section(
  'Optional',
  [
    mdLink('Privacy Policy', `${SITE_URL}/privacy`, 'Legal — secondary for AI context'),
    mdLink('Terms of Service', `${SITE_URL}/terms`, 'Legal — secondary for AI context'),
    mdLink('Training app', ECOSYSTEM_HUB.trainingUrl, 'Interactive course; disallowed in robots.txt for hub crawl focus'),
    `- Do not index transactional routes: ${NOINDEX_PATHS.map((p) => `${SITE_URL}${p}`).join(', ')}`,
    `- lastUpdated: ${LAST_UPDATED}`,
  ].join('\n'),
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
