import React from 'react'
import { Search, Layers, Zap } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'

const ICONS = [<Search key="s" />, <Layers key="l" />, <Zap key="z" />]

export default function Methodology() {
  const { t } = useLocale()
  const items = t('methodology.items') || []
  const itemsWithIcons = Array.isArray(items) ? items.map((item, i) => ({ ...item, icon: ICONS[i] })) : []

  return (
    <section id="metodologija" className="py-32 bg-[#F8FAFC] px-6 border-y border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-28 gap-12">
          <div className="max-w-2xl">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-brand-accent mb-8 italic">{t('methodology.sectionLabel')}</h2>
            <h3 className="text-5xl md:text-7xl font-black text-brand-dark tracking-tighter leading-none">
              {t('methodology.titleLine1')} <br /> {t('methodology.titleLine2')}
            </h3>
          </div>
          <p className="text-slate-600 font-medium text-lg max-w-sm leading-relaxed border-l-2 border-slate-200 pl-8">
            {t('methodology.paragraph')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {itemsWithIcons.map((item, i) => (
            <div
              key={i}
              className="group p-12 rounded-[48px] bg-white border border-slate-200/50 hover:border-brand-accent/40 transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-0.5"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-dark text-brand-accent flex items-center justify-center mb-10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-glow-accent">
                {React.cloneElement(item.icon, { size: 28 })}
              </div>
              <h4 className="text-2xl font-black text-brand-dark mb-6 tracking-tight">{item.title}</h4>
              <p className="text-slate-600 font-medium leading-relaxed opacity-90">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
