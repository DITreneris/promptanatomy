import { Users, BookOpen, Megaphone, LayoutDashboard, Zap, Cpu, Target } from 'lucide-react'
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

function ConnectorRow({ count }) {
  return (
    <div className="hidden lg:flex items-center justify-center gap-4 mb-2 max-w-2xl mx-auto">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-white/25" aria-hidden />
          {i < count - 1 && <span className="w-8 md:w-12 h-px bg-white/20 mx-1" aria-hidden />}
        </span>
      ))}
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
      <div className="absolute inset-0 pointer-events-none bg-ecosystem-center-glow opacity-100" aria-hidden />
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-ecosystem-grid" aria-hidden />
      <div className="max-w-7xl mx-auto relative z-10 min-w-0">
        <div className="text-center mb-16 md:mb-28">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 tracking-[-0.02em]">{t('ecosystem.title')}</h2>
          <p className="text-slate-300 text-lg max-w-[600px] mx-auto font-medium mt-3 leading-relaxed">
            {t('ecosystem.paragraph')}
          </p>
          <div className="mt-8">
            <a
              href="#pricing"
              onClick={() => capturePosthogEvent('ecosystem_cta_pricing_click', { placement: 'ecosystem_hub', locale, page_path: pagePath })}
              className="inline-flex items-center justify-center btn-primary-md min-h-[48px] px-8 py-3 hover:scale-[1.03] focus-visible:ring-offset-brand-dark"
            >
              {t('ecosystem.ctaPricing')}
            </a>
          </div>
        </div>

        <ConnectorRow count={ROW_SIZE} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.slice(0, ROW_SIZE).map((item, i) => renderCard(item, i, t, locale, pagePath))}
        </div>
        <div className="hidden lg:block h-6" aria-hidden />
        <ConnectorRow count={ROW_SIZE} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.slice(ROW_SIZE).map((item, i) => renderCard(item, i + ROW_SIZE, t, locale, pagePath))}
        </div>

        {mapLinkLabel && (
          <div className="text-center mt-12 md:mt-16">
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
              className="inline-flex items-center justify-center min-h-[44px] text-sm font-medium text-slate-300 hover:text-brand-accent underline underline-offset-4 transition-colors duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark rounded-sm"
            >
              {mapLinkLabel}
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
    'group relative card-glass overflow-hidden focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark'
  const cardClass = `${cardBaseClass} p-6 sm:p-10 ${useCtaLayout ? '' : 'block'}`
  const titleClass = 'text-xl font-black text-white mb-1 tracking-tight'

  const content = (
    <>
      <div
        className="absolute -bottom-10 -right-10 w-32 h-32 blur-[60px] opacity-20 transition-opacity group-hover:opacity-40 bg-white/5"
        aria-hidden
      />
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-ecosystem-icon-card transition-all duration-220 group-hover:scale-110 ring-2 ring-transparent group-hover:ring-2 ${ECOSYSTEM_BG_CLASSES[item.themeIndex - 1]} ${ECOSYSTEM_HOVER_RING[item.themeIndex - 1]} ${useCtaLayout ? 'mb-6' : 'mb-12 sm:mb-24'}`}
      >
        {item.icon}
      </div>
      <h4 className={titleClass}>{item.title}</h4>
      {count && <p className="text-xs font-bold text-brand-accent/90 uppercase tracking-wider mb-2">{count}</p>}
      {outcome && <p className="text-sm text-slate-300 leading-relaxed mb-4">{outcome}</p>}
      {hasBullets && (
        <ul className="list-disc list-inside text-slate-300 text-sm space-y-2 leading-relaxed mb-4">
          {item.bullets.slice(0, 2).map((bullet, bi) => (
            <li key={bi}>{bullet}</li>
          ))}
        </ul>
      )}
      {useCtaLayout && ctaLabel && item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => captureEcosystemOutboundClick({ target: item.url, placement: 'ecosystem_card', locale, pagePath })}
          className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-xl font-black text-white border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
        >
          {ctaLabel}
        </a>
      )}
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
