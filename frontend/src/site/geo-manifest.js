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

export const LAST_UPDATED = '2026-10-14'

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
      'Founder essay on moving from ad-hoc AI chat to a repeatable Prompt Anatomy training system for business workflows.',
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
  trainingRole:
    'Interactive training app (modules 1–12, 6-block methodology; Stripe Core checkout sells 1–6; 7–12 via operator/corporate tier 9/12 grants)',
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

/** Lithuanian retrieval terms for llms.txt — keep in GEO, not LP FAQ. */
export const TOPICS_LT = [
  'DI mokymai',
  'promptų inžinerija',
  'konteksto inžinerija',
  '6 blokų metodika',
  'Promptų Anatomija',
  'DI agentai',
  'DI automatizavimas',
]

/**
 * Short LT block for llms.txt (first-byte AI index). Facts only — no new LP copy.
 * Starter/Core euros live on .app; 399 EUR is the IVS workshop, not a Stripe SKU.
 */
export const LLMS_LT_SUMMARY =
  'Promptų Anatomija (promptanatomy.app) – dvikalbė DI mokymų sistema: 6 blokų metodika, interaktyvūs mokymai ir lifetime prieiga. Checkout čia: Starter 39 EUR (moduliai 1–3) ir Core 99 EUR (moduliai 1–6), vienkartinis mokėjimas. 399 EUR yra IVS seminaras komandai, ne viešas Stripe planas. Prieiga – Check formoje naršyklėje, laiško su nuoroda nesiunčiame. Kasdienė promptų biblioteka – promptanatomy.info, ne .cloud (Enter pamoka).'

/**
 * Six-Block Method — canonical one-sentence definitions for AI retrieval (llms.txt, llms-full.txt,
 * static first-byte body). Order is the method order. REASONING = observable criteria and steps,
 * not a demand to expose a model's private chain of thought. Keep EN and LT in sync.
 */
export const SIX_BLOCKS = [
  {
    id: 'META',
    en: {
      name: 'META',
      definition: "Defines the AI's role, the task objective, and the operating boundaries.",
      keywords: ['role', 'task objective', 'scope'],
    },
    lt: {
      name: 'META',
      definition: 'Apibrėžia DI vaidmenį, užduoties tikslą ir veikimo ribas.',
      keywords: ['vaidmuo', 'užduoties tikslas', 'ribos'],
    },
  },
  {
    id: 'INPUT',
    en: {
      name: 'INPUT',
      definition: 'Specifies the source data, context, and information the AI may use.',
      keywords: ['context engineering', 'input specification', 'source data'],
    },
    lt: {
      name: 'INPUT',
      definition: 'Nurodo šaltinio duomenis, kontekstą ir informaciją, kuria DI gali naudotis.',
      keywords: ['konteksto inžinerija', 'įvesties specifikacija', 'šaltinio duomenys'],
    },
  },
  {
    id: 'OUTPUT',
    en: {
      name: 'OUTPUT',
      definition: 'Defines the expected deliverable, its structure, and its format.',
      keywords: ['output schema', 'structured response', 'deliverable'],
    },
    lt: {
      name: 'OUTPUT',
      definition: 'Apibrėžia laukiamą rezultatą, jo struktūrą ir formatą.',
      keywords: ['rezultato schema', 'struktūruotas atsakymas', 'rezultatas'],
    },
  },
  {
    id: 'REASONING',
    en: {
      name: 'REASONING',
      definition:
        'Specifies the decision process, evaluation criteria, and constraints as observable steps.',
      keywords: ['decision logic', 'evaluation criteria', 'workflow steps'],
    },
    lt: {
      name: 'REASONING',
      definition:
        'Nurodo sprendimo eigą, vertinimo kriterijus ir apribojimus kaip stebimus žingsnius.',
      keywords: ['sprendimo logika', 'vertinimo kriterijai', 'proceso žingsniai'],
    },
  },
  {
    id: 'QUALITY',
    en: {
      name: 'QUALITY',
      definition: 'Establishes checks that verify accuracy, completeness, and compliance before use.',
      keywords: ['validation', 'quality assurance', 'review checklist'],
    },
    lt: {
      name: 'QUALITY',
      definition: 'Nustato patikras, kurios prieš naudojimą patvirtina tikslumą, išsamumą ir atitiktį.',
      keywords: ['validacija', 'kokybės kontrolė', 'peržiūros sąrašas'],
    },
  },
  {
    id: 'ADVANCED',
    en: {
      name: 'ADVANCED',
      definition:
        'Adds specialised capabilities such as tools, retrieval, automation, or multi-step agent workflows when the task needs them.',
      keywords: ['AI agents', 'RAG', 'tool use', 'automation'],
    },
    lt: {
      name: 'ADVANCED',
      definition:
        'Prideda specializuotas galimybes – įrankius, paiešką, automatizavimą ar kelių žingsnių agentų procesus, kai užduočiai to reikia.',
      keywords: ['DI agentai', 'RAG', 'įrankių naudojimas', 'automatizavimas'],
    },
  },
]

/** Six-Block Method, one paragraph per locale — quotable definition for AI answer systems. */
export const SIX_BLOCK_SUMMARY = {
  en: 'The Prompt Anatomy Six-Block Method is a structured way to design repeatable AI tasks for individuals and teams. It separates the role and objective (META), the source context (INPUT), the deliverable requirements (OUTPUT), the decision criteria (REASONING), the validation rules (QUALITY), and advanced workflow capabilities (ADVANCED), so AI instructions are easier to reuse, evaluate, and improve.',
  lt: 'Promptų Anatomijos šešių blokų metodika – struktūruotas būdas kurti pakartojamas DI užduotis žmonėms ir komandoms. Ji atskiria vaidmenį ir tikslą (META), šaltinio kontekstą (INPUT), rezultato reikalavimus (OUTPUT), sprendimo kriterijus (REASONING), patikros taisykles (QUALITY) ir pažangias proceso galimybes (ADVANCED), todėl DI instrukcijas lengviau pakartoti, įvertinti ir tobulinti.',
}

/**
 * Spoke five-part schema is Quick mode, not a second method. Explicit mapping so AI answer
 * systems stop citing the five names as the Prompt Anatomy canon (scorecard #22/#23).
 */
export const QUICK_MODE_NOTE = {
  en: 'Ecosystem spokes use a five-part Quick mode (role, context, reasoning, result, quality check). It maps onto the Six-Block Method: role → META, context → INPUT, reasoning → REASONING, result → OUTPUT, quality check → QUALITY. ADVANCED exists only in the full method taught on promptanatomy.app.',
  lt: 'Ekosistemos spoke’ai naudoja penkių dalių Quick režimą (vaidmuo, kontekstas, mąstymas, rezultatas, kokybės kontrolė). Jis atitinka šešių blokų metodiką: vaidmuo → META, kontekstas → INPUT, mąstymas → REASONING, rezultatas → OUTPUT, kokybės kontrolė → QUALITY. ADVANCED yra tik pilnoje metodikoje, kurios mokoma promptanatomy.app.',
}

export const PUBLIC_PRICING = [
  { id: 'starter', label: 'Starter', priceEur: 39, modules: '1–3' },
  { id: 'core', label: 'Core', priceEur: 99, modules: '1–6' },
]

export const NOINDEX_PATHS = ['/success', '/cancel', '/api/']

export const TRAINING_SUMMARY =
  'Prompt Anatomy training is an interactive course at /anatomy/ covering modules 1–12 on the Six-Block Method (Meta, Input, Output, Reasoning, Quality, Advanced): theory, knowledge checks, practical business scenarios, context engineering, advanced tests, agent workflows, and a capstone project (Lithuanian and English). The training system inventory includes 300+ interactive slides and 40+ interactive tools. The Six-Block Method is the Prompt Anatomy canon; five-part tools on ecosystem spokes are Quick mode and map onto the six blocks. Public Stripe checkout sells Starter (1–3) and Core (1–6); modules 7–9 are granted via operator tier 9, and modules 10–12 via operator/corporate tier 12, not separate public Stripe SKUs.'

export const FOUNDER_ID = `${SITE_URL}/#founder`
export const ORGANIZATION_ID = `${SITE_URL}/#organization`
