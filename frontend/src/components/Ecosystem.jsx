import { Users, BookOpen, Megaphone, LayoutDashboard } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'
import { APP_VERSION } from '../config'

const FALLBACK_ICONS = [<BookOpen key="b" />, <Megaphone key="m" />, <Users key="u" />, <LayoutDashboard key="d" />]
/** URL → theme index 1–4 (ecosystem-1 … ecosystem-4 in index.css @theme) */
const ECOSYSTEM_URL_INDEX = {
  'https://ditreneris.github.io/biblioteka/': 4,
  'https://ditreneris.github.io/marketingas/': 2,
  'https://ditreneris.github.io/personalas/': 1,
  'https://ditreneris.github.io/ceo/': 3,
}
const ECOSYSTEM_URL_ICON = {
  'https://ditreneris.github.io/biblioteka/': <BookOpen key="b" />,
  'https://ditreneris.github.io/marketingas/': <Megaphone key="m" />,
  'https://ditreneris.github.io/personalas/': <Users key="u" />,
  'https://ditreneris.github.io/ceo/': <LayoutDashboard key="d" />,
}
const ECOSYSTEM_BG_CLASSES = ['bg-ecosystem-1', 'bg-ecosystem-2', 'bg-ecosystem-3', 'bg-ecosystem-4']
const ECOSYSTEM_HOVER_RING = ['group-hover:ring-ecosystem-1', 'group-hover:ring-ecosystem-2', 'group-hover:ring-ecosystem-3', 'group-hover:ring-ecosystem-4']

export default function Ecosystem() {
  const { t } = useLocale()
  const trItems = t('ecosystem.items') || []
  const rawItems = Array.isArray(trItems)
    ? trItems.map((item, i) => {
        const themeIndex = (item.url && ECOSYSTEM_URL_INDEX[item.url]) ?? ((i % 4) + 1)
        const icon = (item.url && ECOSYSTEM_URL_ICON[item.url]) ?? FALLBACK_ICONS[i % FALLBACK_ICONS.length]
        return {
          ...item,
          themeIndex,
          icon,
        }
      })
    : []
  const items = rawItems

  return (
    <section id="ekosistema" className="pt-20 sm:pt-[100px] pb-20 md:pb-28 bg-brand-dark px-4 sm:px-6 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" aria-hidden />
      <div className="absolute inset-0 pointer-events-none bg-ecosystem-center-glow opacity-100" aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden
      />
      <div className="max-w-7xl mx-auto relative z-10 min-w-0">
        <div className="text-center mb-16 md:mb-28">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 tracking-[-0.02em]">{t('ecosystem.title')}</h2>
          <p className="text-slate-300 text-lg max-w-[600px] mx-auto font-medium mt-3 leading-relaxed">
            {t('ecosystem.paragraph')}
          </p>
        </div>

        {/* OS backbone: connector dots + lines */}
        <div className="hidden lg:flex items-center justify-center gap-4 mb-2 max-w-3xl mx-auto">
          {items.map((_, i) => (
            <span key={i} className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-white/25" aria-hidden />
              {i < items.length - 1 && (
                <span className="w-8 md:w-12 h-px bg-white/20 mx-1" aria-hidden />
              )}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => {
            const hasBullets = Array.isArray(item.bullets) && item.bullets.length > 0
            const outcome = typeof item.outcome === 'string' && item.outcome.trim() ? item.outcome.trim() : null
            const ctaLabel = (typeof t('ecosystem.ctaOpen') === 'string' && t('ecosystem.ctaOpen').trim()) || null
            const useCtaLayout = hasBullets || ctaLabel

            const cardBaseClass = "group relative rounded-3xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] backdrop-blur-md hover:border-[rgba(255,200,0,0.5)] hover:shadow-ecosystem-card-rim hover:-translate-y-1.5 transition-all duration-220 overflow-hidden focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            const cardClass = `${cardBaseClass} p-6 sm:p-10 ${useCtaLayout ? '' : 'block'}`
            const titleClass = "text-xl font-black text-white mb-2 tracking-tight"

            const content = (
              <>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 blur-[60px] opacity-20 transition-opacity group-hover:opacity-40 bg-white/5" aria-hidden />
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-ecosystem-icon-card transition-all duration-220 group-hover:scale-110 ring-2 ring-transparent group-hover:ring-2 ${ECOSYSTEM_BG_CLASSES[item.themeIndex - 1]} ${ECOSYSTEM_HOVER_RING[item.themeIndex - 1]} ${useCtaLayout ? 'mb-6' : 'mb-12 sm:mb-24'}`}
                >
                  {item.icon}
                </div>
                <h4 className={titleClass}>{item.title}</h4>
                {outcome && (
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {outcome}
                  </p>
                )}
                {hasBullets && (
                  <ul className="list-disc list-inside text-slate-300 text-sm space-y-2 leading-relaxed mb-4">
                    {(item.bullets.slice(0, 2)).map((bullet, bi) => (
                      <li key={bi}>{bullet}</li>
                    ))}
                  </ul>
                )}
                {useCtaLayout && ctaLabel && item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
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
                className={`${cardClass} cursor-pointer`}
                aria-label={`${item.title}, ${APP_VERSION} Stable`}
              >
                {content}
              </a>
            ) : (
              <div key={i} className={cardClass}>
                {content}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
