import { ArrowRight, Users, BookOpen, Megaphone, LayoutDashboard, Zap, Cpu, Target } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'
import { captureEcosystemOutboundClick, capturePosthogEvent } from '../analytics/posthog'
import { ECOSYSTEM_DISCOVERY_SITE } from '../site/geo-manifest'

const ECOSYSTEM_MAP_URL = `${ECOSYSTEM_DISCOVERY_SITE}/#ecosystem`

const FALLBACK_ICONS = [<Zap key="z" />, <BookOpen key="b" />, <Target key="t" />, <Users key="u" />, <LayoutDashboard key="d" />, <Cpu key="c" />]
/** URL → theme index 1–4 (phase: 1=Adopt, 2=Apply, 3=Scale) */
const ECOSYSTEM_URL_INDEX = {
  'https://promptanatomy.cloud/': 1,
  'https://www.promptanatomy.info/lt/': 1,
  'https://www.promptanatomy.info/en/': 1,
  'https://www.promptanatomy.space/': 2,
  'https://www.promptanatomy.space/en/': 2,
  'https://promptanatomy.help/': 2,
  'https://www.promptanatomy.ceo/': 3,
  'https://promptanatomy.pro/': 3,
}
const ECOSYSTEM_URL_ICON = {
  'https://promptanatomy.cloud/': <Zap key="z" />,
  'https://www.promptanatomy.info/lt/': <BookOpen key="b" />,
  'https://www.promptanatomy.info/en/': <BookOpen key="b" />,
  'https://www.promptanatomy.space/': <Megaphone key="m" />,
  'https://www.promptanatomy.space/en/': <Megaphone key="m" />,
  'https://promptanatomy.help/': <Users key="u" />,
  'https://www.promptanatomy.ceo/': <LayoutDashboard key="d" />,
  'https://promptanatomy.pro/': <Cpu key="c" />,
}
const ECOSYSTEM_BG_CLASSES = ['bg-ecosystem-1', 'bg-ecosystem-2', 'bg-ecosystem-3', 'bg-ecosystem-4']
const ECOSYSTEM_HOVER_RING = ['group-hover:ring-ecosystem-1', 'group-hover:ring-ecosystem-2', 'group-hover:ring-ecosystem-3', 'group-hover:ring-ecosystem-4']

const ROW_SIZE = 3

const PHASE_LEGEND = [
  { key: 'ecosystem.phaseAdopt', colorClass: 'bg-ecosystem-1' },
  { key: 'ecosystem.phaseApply', colorClass: 'bg-ecosystem-2' },
  { key: 'ecosystem.phaseScale', colorClass: 'bg-ecosystem-3' },
]

function HubConnectors({ variant = 'row' }) {
  if (variant === 'between') {
    return (
      <div className="hidden lg:block relative h-6 mb-2 max-w-7xl mx-auto" aria-hidden>
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full hub-connector-line" />
      </div>
    )
  }

  return (
    <div className="hidden lg:block relative h-10 mb-2 max-w-7xl mx-auto px-4" aria-hidden>
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-5 hub-connector-line" />
      <div className="absolute left-[16.666%] right-[16.666%] top-5 h-px hub-connector-line" />
      <div className="absolute left-[16.666%] top-5 w-px h-5 hub-connector-line -translate-x-1/2" />
      <div className="absolute left-1/2 top-5 w-px h-5 hub-connector-line -translate-x-1/2" />
      <div className="absolute left-[83.333%] top-5 w-px h-5 hub-connector-line -translate-x-1/2" />
    </div>
  )
}

function HubCore({ t }) {
  return (
    <div className="flex flex-col items-center mb-8 md:mb-10">
      <div className="hub-core-pill">
        <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-brand-accent" aria-hidden="true" />
        <span className="text-label-upper text-slate-100">{t('ecosystem.hubCoreLabel')}</span>
      </div>
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-accent/80">
        {t('ecosystem.hubCoreSub')}
      </p>
      <div className="hidden lg:flex flex-wrap items-center justify-center gap-4 mt-4">
        {PHASE_LEGEND.map(({ key, colorClass }) => (
          <span key={key} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <span className={`w-2 h-2 rounded-full shrink-0 ${colorClass}`} aria-hidden />
            {t(key)}
          </span>
        ))}
      </div>
      <HubConnectors variant="row" />
    </div>
  )
}

export default function Ecosystem() {
  const { t, locale } = useLocale()
  const pagePath = typeof window !== 'undefined' ? window.location.pathname : '/'
  const trItems = t('ecosystem.items') || []
  const rawItems = Array.isArray(trItems)
    ? trItems.map((item, i) => {
        const themeIndex = (item.url && ECOSYSTEM_URL_INDEX[item.url]) ?? ((i % 3) + 1)
        const icon = (item.url && ECOSYSTEM_URL_ICON[item.url]) ?? FALLBACK_ICONS[i % FALLBACK_ICONS.length]
        return {
          ...item,
          themeIndex,
          icon,
        }
      })
    : []
  const items = rawItems
  const mapLinkLabel = typeof t('ecosystem.mapLink') === 'string' ? t('ecosystem.mapLink').trim() : ''

  return (
    <section id="ekosistema" className="section-dark">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('/noise.svg')]" aria-hidden />
      <div className="absolute inset-0 pointer-events-none bg-ecosystem-center-glow opacity-70" aria-hidden />
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-ecosystem-grid" aria-hidden />
      <div className="max-w-7xl mx-auto relative z-10 min-w-0">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-[-0.02em]">{t('ecosystem.title')}</h2>
          <p className="text-slate-300 text-lg max-w-[600px] mx-auto font-medium leading-relaxed">
            {t('ecosystem.paragraph')}
          </p>
          <div className="mt-6">
            <a
              href="#pricing"
              onClick={() => capturePosthogEvent('ecosystem_cta_pricing_click', { placement: 'ecosystem_hub', locale, page_path: pagePath })}
              className="inline-flex items-center justify-center btn-primary-md min-h-[48px] px-8 py-3 hover:scale-[1.03] focus-visible:ring-offset-brand-dark"
            >
              {t('ecosystem.ctaPricing')}
            </a>
          </div>
        </div>

        <HubCore t={t} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {items.slice(0, ROW_SIZE).map((item, i) => renderCard(item, i, t, locale, pagePath))}
        </div>

        <HubConnectors variant="between" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {items.slice(ROW_SIZE).map((item, i) => renderCard(item, i + ROW_SIZE, t, locale, pagePath))}
        </div>

        {mapLinkLabel && (
          <div className="text-center mt-10 md:mt-12">
            <a
              href={ECOSYSTEM_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                captureEcosystemOutboundClick({
                  target: ECOSYSTEM_DISCOVERY_SITE,
                  placement: 'ecosystem_site_map',
                  locale,
                  pagePath,
                })
              }
              className="btn-ecosystem-outline"
            >
              {mapLinkLabel}
              <ArrowRight className="icon-sm" aria-hidden />
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

function renderCard(item, i, t, locale, pagePath) {
  const hasBullets = Array.isArray(item.bullets) && item.bullets.length > 0
  const outcome = typeof item.outcome === 'string' && item.outcome.trim() ? item.outcome.trim() : null
  const count = typeof item.count === 'string' && item.count.trim() ? item.count.trim() : null
  const ctaLabel = (typeof t('ecosystem.ctaOpen') === 'string' && t('ecosystem.ctaOpen').trim()) || null
  const useCtaLayout = hasBullets || ctaLabel

  const cardBaseClass =
    'group relative card-density-dark overflow-hidden focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark'
  const cardClass = `${cardBaseClass} ${useCtaLayout ? '' : 'block'}`

  const body = (
    <>
      <div
        className="absolute -bottom-10 -right-10 w-32 h-32 blur-[60px] opacity-15 transition-opacity group-hover:opacity-30 bg-white/5"
        aria-hidden
      />
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-ecosystem-icon-card transition-all duration-220 group-hover:scale-105 ring-2 ring-transparent group-hover:ring-2 ${ECOSYSTEM_BG_CLASSES[item.themeIndex - 1]} ${ECOSYSTEM_HOVER_RING[item.themeIndex - 1]} mb-4`}
      >
        {item.icon}
      </div>
      <h4 className="text-xl font-black text-white mb-1 tracking-tight">{item.title}</h4>
      {count && (
        <p className="text-xs font-black text-brand-accent uppercase tracking-wider mb-2">{count}</p>
      )}
      {outcome && (
        <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-3">{outcome}</p>
      )}
      {hasBullets && (
        <ul className="list-disc list-inside text-slate-200 text-sm md:text-base space-y-1.5 leading-relaxed mb-4">
          {item.bullets.slice(0, 2).map((bullet, bi) => (
            <li key={bi}>{bullet}</li>
          ))}
        </ul>
      )}
    </>
  )

  const cta = useCtaLayout && ctaLabel && item.url && (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => captureEcosystemOutboundClick({ target: item.url, placement: 'ecosystem_card', locale, pagePath })}
      className="btn-ecosystem-outline mt-auto w-full sm:w-auto"
    >
      {ctaLabel}
    </a>
  )

  const content = (
    <>
      {body}
      {cta}
    </>
  )

  if (useCtaLayout) {
    return (
      <div key={i} className={cardClass}>
        {content}
      </div>
    )
  }
  return item.url ? (
    <a
      key={i}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => captureEcosystemOutboundClick({ target: item.url, placement: 'ecosystem_card', locale, pagePath })}
      className={`${cardClass} cursor-pointer`}
      aria-label={item.title}
    >
      {content}
    </a>
  ) : (
    <div key={i} className={cardClass}>
      {content}
    </div>
  )
}
