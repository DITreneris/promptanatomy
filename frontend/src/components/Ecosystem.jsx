import { ArrowRight, Users, BookOpen, Megaphone, LayoutDashboard, Zap, Cpu, Target } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'
import { captureEcosystemOutboundClick } from '../analytics/posthog'
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
const PRIMARY_CARD_INDEX = 0

const PHASE_ACCENT_CLASSES = ['card-phase-accent-1', 'card-phase-accent-2', 'card-phase-accent-3', 'card-phase-accent-3']

function parseTagList(tags) {
  if (!tags || typeof tags !== 'string') return []
  return tags.split('·').map((s) => s.trim()).filter(Boolean)
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
    <section id="ekosistema" className="section-dark-ecosystem">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('/noise.svg')]" aria-hidden />
      <div className="absolute inset-0 pointer-events-none bg-ecosystem-center-glow opacity-70" aria-hidden />
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-ecosystem-grid" aria-hidden />
      <div className="max-w-7xl mx-auto relative z-10 min-w-0">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-white mb-4 tracking-[-0.02em]">{t('ecosystem.title')}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
          {items.slice(0, ROW_SIZE).map((item, i) => renderCard(item, i, t, locale, pagePath))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8 mt-7 lg:mt-8">
          {items.slice(ROW_SIZE).map((item, i) => renderCard(item, i + ROW_SIZE, t, locale, pagePath))}
        </div>

        {mapLinkLabel && (
          <div className="text-center mt-8 md:mt-10">
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
  const tagsRaw =
    (typeof item.tags === 'string' && item.tags.trim()) ||
    (Array.isArray(item.bullets) && item.bullets.length > 0 ? item.bullets.join(' · ') : null)
  const tagList = parseTagList(tagsRaw)
  const outcome = typeof item.outcome === 'string' && item.outcome.trim() ? item.outcome.trim() : null
  const ctaLabel =
    (typeof item.cta === 'string' && item.cta.trim()) ||
    (typeof t('ecosystem.ctaOpen') === 'string' && t('ecosystem.ctaOpen').trim()) ||
    null
  const useCtaLayout = Boolean(tagList.length > 0 || ctaLabel)
  const isPrimaryCard = i === PRIMARY_CARD_INDEX
  const iconShadowClass = isPrimaryCard ? 'shadow-ecosystem-icon-card' : 'shadow-ecosystem-icon-depth'
  const opensInNewTab =
    typeof t('ecosystem.opensInNewTab') === 'string' ? t('ecosystem.opensInNewTab').trim() : ''
  const ctaAriaLabel = opensInNewTab
    ? `${item.title} — ${ctaLabel} (${opensInNewTab})`
    : `${item.title} — ${ctaLabel}`

  const phaseAccentClass = !isPrimaryCard ? (PHASE_ACCENT_CLASSES[item.themeIndex - 1] ?? PHASE_ACCENT_CLASSES[0]) : ''
  const cardBaseClass =
    'group relative card-density-dark-premium overflow-hidden focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark'
  const cardClass = `${cardBaseClass}${isPrimaryCard ? ' card-featured-ecosystem' : ''}${phaseAccentClass ? ` ${phaseAccentClass}` : ''} ${useCtaLayout ? '' : 'block'}`

  const body = (
    <>
      {isPrimaryCard && (
        <span className="absolute top-6 right-6 badge-premium">{t('ecosystem.startHere')}</span>
      )}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${iconShadowClass} transition-all duration-220 group-hover:scale-105 ring-2 ring-transparent group-hover:ring-2 ${ECOSYSTEM_BG_CLASSES[item.themeIndex - 1]} ${ECOSYSTEM_HOVER_RING[item.themeIndex - 1]} mb-3`}
      >
        {item.icon}
      </div>
      <h4 className="text-lg font-bold text-white mb-1 tracking-tight">{item.title}</h4>
      {outcome && (
        <p className="text-sm text-white/80 font-medium mb-2 leading-relaxed line-clamp-2">{outcome}</p>
      )}
      {tagList.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {tagList.map((tag) => (
            <span key={tag} className="ecosystem-tag-pill">
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  )

  const ctaClass = isPrimaryCard
    ? 'w-full min-h-[48px] py-3 rounded-2xl text-base btn-primary shadow-ecosystem-cta hover:scale-[1.03] hover:shadow-ecosystem-cta flex items-center justify-center focus-visible:ring-offset-brand-dark'
    : 'btn-ecosystem-secondary'

  const cta = useCtaLayout && ctaLabel && item.url && (
    <div className="mt-auto pt-3">
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ctaAriaLabel}
        onClick={() => captureEcosystemOutboundClick({ target: item.url, placement: 'ecosystem_card', locale, pagePath })}
        className={ctaClass}
      >
        {ctaLabel}
        {!isPrimaryCard && <ArrowRight className="icon-sm" aria-hidden />}
      </a>
    </div>
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
