import { Users, Target, Briefcase, Cpu } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'

const COLORS = ['#2E9E7E', '#7C5CFF', '#3F6FFF', '#F38A3F']
const ICONS = [<Users key="u" />, <Target key="t" />, <Briefcase key="b" />, <Cpu key="c" />]

export default function Ecosystem() {
  const { t } = useLocale()
  const trItems = t('ecosystem.items') || []
  const items = Array.isArray(trItems) ? trItems.map((item, i) => ({ ...item, color: COLORS[i], icon: ICONS[i] })) : []

  return (
    <section id="ekosistema" className="py-32 bg-brand-dark px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-28">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">{t('ecosystem.title')}</h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto font-medium">
            {t('ecosystem.paragraph')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => {
            const cardClass = "group relative p-10 rounded-[40px] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            const content = (
              <>
                <div
                  className="absolute -bottom-10 -right-10 w-32 h-32 blur-[60px] opacity-20 transition-opacity group-hover:opacity-40"
                  style={{ backgroundColor: item.color }}
                />
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-24 shadow-2xl transition-transform group-hover:scale-110"
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon}
                </div>
                <h4 className="text-xl font-black text-white mb-2 tracking-tight">{item.title}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] opacity-60" style={{ color: item.color }}>
                    {item.count}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-[9px] font-black uppercase tracking-[0.25em] text-white/40">{t('ecosystem.stableLabel')}</span>
                </div>
              </>
            )
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
