/**
 * GEO / SEO manifest — single source for llms.txt, llms-full.txt, build scripts, JSON-LD sync.
 * Not imported by React components.
 *
 * Sync rules:
 * - When ecosystem.items URLs change in en.json / lt.json, update ECOSYSTEM_SPOKES here.
 * - SeoHead.jsx ItemList and generate-geo-static.mjs must use getEcosystemItemList / ECOSYSTEM_DISCOVERY.
 * - When organization.js postal address changes, update ORG_MAILING_ADDRESS_ONE_LINE.
 * - When new Medium articles ship, append to CREATOR_PUBLICATIONS.
 * - Bump LAST_UPDATED on meaningful GEO/content deploys.
 */

export const SITE_URL = 'https://www.promptanatomy.app'

export const LAST_UPDATED = '2026-06-06'

/** Marketing / discovery site — full 9-domain map, quiz, Anatomizer (not a spoke). */
export const ECOSYSTEM_DISCOVERY_SITE = 'https://promptanatomy.site'

export const ORG_EMAIL = 'info@promptanatomy.app'

export const ORG_MAILING_ADDRESS_ONE_LINE =
  'Prompt Anatomy, 1311 Park St, Unit #654, Alameda, CA 94501, US'

export const CREATOR = {
  name: 'Tomas Staniulis',
  jobTitle: 'Founder',
  roleDescription: 'Founder and creator of the Prompt Anatomy ecosystem',
  sameAs: [
    'https://www.linkedin.com/in/staniulis',
    'https://x.com/TStaniulis_NFT',
    'https://medium.com/@tomas.staniulis76',
  ],
}

export const CREATOR_PUBLICATIONS = [
  {
    title: 'Beyond the Chatbox: Mastering the Prompt Anatomy AI Operating System',
    url: 'https://medium.com/@tomas.staniulis76/beyond-the-chatbox-mastering-the-prompt-anatomy-ai-operating-system-ad955724804e',
    summary:
      'Founder essay on moving from ad-hoc AI chat to a repeatable Prompt Anatomy operating system for business workflows.',
  },
  {
    title: 'Context Architecture Will Define AI Winners in 2026',
    url: 'https://medium.com/@tomas.staniulis76/context-architecture-will-define-ai-winners-in-2026-73b0dadab300',
    summary:
      'Thought leadership on context engineering and why structured context design separates effective AI adopters in 2026.',
  },
]

export const ECOSYSTEM_HUB = {
  url: `${SITE_URL}/`,
  role: 'Hub — pricing, checkout, access, conversion',
  trainingUrl: `${SITE_URL}/anatomy/`,
  trainingRole: 'Interactive training app (6 modules, 6-block methodology)',
}

export const ECOSYSTEM_SPOKES = [
  {
    name: 'PromptAnatomy Cloud (.cloud)',
    urls: { en: 'https://promptanatomy.cloud/', lt: 'https://promptanatomy.cloud/' },
    role: 'Spoke — Enter: onboarding and first lesson, routing to hub',
  },
  {
    name: 'Prompt library (.info)',
    urls: { en: 'https://www.promptanatomy.info/en/', lt: 'https://www.promptanatomy.info/lt/' },
    role: 'Spoke — Use: prompt library and daily automation workflows',
  },
  {
    name: 'Content system (.space)',
    urls: { en: 'https://www.promptanatomy.space/en/', lt: 'https://www.promptanatomy.space/' },
    role: 'Spoke — Create: marketing content prompts and templates',
  },
  {
    name: 'HR system (.help)',
    urls: { en: 'https://promptanatomy.help/', lt: 'https://promptanatomy.help/' },
    role: 'Spoke — Hire: HR, recruitment, and people operations prompts',
  },
  {
    name: 'Operations center (.ceo)',
    urls: { en: 'https://www.promptanatomy.ceo/', lt: 'https://www.promptanatomy.ceo/' },
    role: 'Spoke — Manage: CEO/COO leadership and operations prompts',
  },
  {
    name: 'PromptAnatomy Pro (.pro)',
    urls: { en: 'https://promptanatomy.pro/', lt: 'https://promptanatomy.pro/' },
    role: 'Spoke — Decide: B2B scaling and enterprise AI workflows routing to hub',
  },
  {
    name: 'Knowledge hub (.blog)',
    urls: { en: 'https://promptanatomy.blog/', lt: 'https://promptanatomy.blog/' },
    role: 'Spoke — Deepen: articles, canvases, and systems-thinking content',
  },
  {
    name: 'Playground (.lol)',
    urls: { en: 'https://promptanatomy.lol/', lt: 'https://promptanatomy.lol/' },
    role: 'Spoke — Play: structured sandbox for low-stakes prompt experiments',
  },
]

/** Discovery — not a spoke; full map lives on .site */
export const ECOSYSTEM_DISCOVERY = {
  name: 'Ecosystem discovery map (.site)',
  url: ECOSYSTEM_DISCOVERY_SITE,
  role: 'Discovery — full 9-domain journey map, maturity quiz, Prompt Builder',
}

/** JSON-LD + AI index: 8 spokes then discovery (9 ListItems). */
export function getEcosystemItemList(locale = 'en') {
  const pick = (spoke) => (locale === 'lt' ? spoke.urls.lt : spoke.urls.en)
  return [
    ...ECOSYSTEM_SPOKES.map((spoke) => ({ name: spoke.name, url: pick(spoke) })),
    { name: ECOSYSTEM_DISCOVERY.name, url: ECOSYSTEM_DISCOVERY.url },
  ]
}

export const COMMUNITY_URL = 'https://t.me/prompt_anatomy'

export const TOPICS = [
  'prompt engineering',
  'context engineering',
  'context architecture',
  'AI agents',
  'AI automation',
  'AI training',
  'AI operating system',
  'Lithuanian',
  'English',
]

export const PUBLIC_PRICING = [
  { id: 'starter', label: 'Starter', priceEur: 39, modules: '1–3' },
  { id: 'core', label: 'Core', priceEur: 99, modules: '1–6' },
]

export const NOINDEX_PATHS = ['/success', '/cancel', '/api/']

export const TRAINING_SUMMARY =
  'Prompt Anatomy training is an interactive course with 6 modules built on a 6-block prompt system: theory, knowledge checks, practical business scenarios, context engineering, advanced tests, and a capstone project. Available in Lithuanian and English at /anatomy/.'

export const FOUNDER_ID = `${SITE_URL}/#founder`
export const ORGANIZATION_ID = `${SITE_URL}/#organization`
