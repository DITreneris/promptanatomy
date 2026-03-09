import { Users, BookOpen, Megaphone, LayoutDashboard } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'

const FALLBACK_ICONS = [<BookOpen key="b" />, <Megaphone key="m" />, <Users key="u" />, <LayoutDashboard key="d" />]
/** URL → theme index 1–4 (ecosystem-1 … ecosystem-4 in tailwind.config) */
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
    <section id="ekosistema" className="py-20 md:py-32 bg-brand-dark px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="max-w-7xl mx-auto relative z-10 min-w-0">
        <div className="text-center mb-16 md:mb-28">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">{t('ecosystem.title')}</h2>
          <p className="text-slate-300 text-lg max-w-[600px] mx-auto font-medium mt-3 leading-relaxed">
            {t('ecosystem.paragraph')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => {
            const hasBullets = Array.isArray(item.bullets) && item.bullets.length > 0
            const ctaLabel = (typeof item.ctaLabel === 'string' && item.ctaLabel.trim()) || (typeof t('ecosystem.ctaOpen') === 'string' && t('ecosystem.ctaOpen').trim()) || null
            const useCtaLayout = hasBullets || ctaLabel

            const cardBaseClass = "group relative rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            const cardClass = `${cardBaseClass} p-10 ${useCtaLayout ? '' : 'block'}`
            const titleClass = "text-xl font-black text-white mb-2 tracking-tight"

            const content = (
              <>
                <div
                  className="absolute -bottom-10 -right-10 w-32 h-32 blur-[60px] opacity-20 transition-opacity group-hover:opacity-40 bg-white/5"
                />
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-all group-hover:scale-110 ring-2 ring-transparent group-hover:ring-2 ${ECOSYSTEM_BG_CLASSES[item.themeIndex - 1]} ${ECOSYSTEM_HOVER_RING[item.themeIndex - 1]} ${useCtaLayout ? 'mb-6' : 'mb-24'}`}
                >
                  {item.icon}
                </div>
                <h4 className={titleClass}>{item.title}</h4>
                {hasBullets && (
                  <ul className="list-disc list-inside text-slate-400 text-sm space-y-2 leading-relaxed mb-4">
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
                    className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 rounded-xl font-black text-brand-dark bg-accent-gradient hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
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
                aria-label={`${item.title}, ${t('ecosystem.stableLabel')}`}
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
