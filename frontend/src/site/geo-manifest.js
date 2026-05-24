/**
 * GEO / SEO manifest — single source for llms.txt, llms-full.txt, build scripts, JSON-LD sync.
 * Not imported by React components.
 *
 * Sync rules:
 * - When ecosystem.items URLs change in en.json / lt.json, update ECOSYSTEM_SPOKES here.
 * - When organization.js postal address changes, update ORG_MAILING_ADDRESS_ONE_LINE.
 * - When new Medium articles ship, append to CREATOR_PUBLICATIONS.
 * - Bump LAST_UPDATED on meaningful GEO/content deploys.
 */

export const SITE_URL = 'https://www.promptanatomy.app'

export const LAST_UPDATED = '2026-05-24'

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
  trainingUrl: `${SITE_URL}/anatomija/`,
  trainingRole: 'Interactive training app (6 modules, 6-block methodology)',
}

export const ECOSYSTEM_SPOKES = [
  {
    name: 'Prompt library (.info)',
    urls: { en: 'https://www.promptanatomy.info/en/', lt: 'https://www.promptanatomy.info/lt/' },
    role: 'Spin-off — prompt library and quick value demonstration',
  },
  {
    name: 'Content system (.space)',
    urls: { en: 'https://www.promptanatomy.space/en/', lt: 'https://www.promptanatomy.space/' },
    role: 'Spoke — marketing content prompts and templates',
  },
  {
    name: 'Operations center (.ceo)',
    urls: { en: 'https://www.promptanatomy.ceo/', lt: 'https://www.promptanatomy.ceo/' },
    role: 'Spoke — CEO/COO leadership and operations prompts',
  },
  {
    name: 'PromptAnatomy Cloud',
    urls: { en: 'https://promptanatomy.cloud/', lt: 'https://promptanatomy.cloud/' },
    role: 'Spoke — educational and practical flow routing to hub',
  },
  {
    name: 'PromptAnatomy Pro',
    urls: { en: 'https://promptanatomy.pro/', lt: 'https://promptanatomy.pro/' },
    role: 'Spoke — B2B, teams, and professional services routing to hub',
  },
  {
    name: 'Recruitment system (HR)',
    urls: { en: 'https://ditreneris.github.io/personalas/', lt: 'https://ditreneris.github.io/personalas/' },
    role: 'Legacy spoke — HR and recruitment prompts (until migrated)',
  },
]

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
  'Prompt Anatomy training is an interactive course with 6 modules built on a 6-block prompt system: theory, knowledge checks, practical business scenarios, context engineering, advanced tests, and a capstone project. Available in Lithuanian and English at /anatomija/.'

export const FOUNDER_ID = `${SITE_URL}/#founder`
export const ORGANIZATION_ID = `${SITE_URL}/#organization`
