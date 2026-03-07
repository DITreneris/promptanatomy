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
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#CFA73A] mb-8 italic">{t('methodology.sectionLabel')}</h2>
            <h3 className="text-5xl md:text-7xl font-black text-[#0B1320] tracking-tighter leading-none">
              {t('methodology.titleLine1')} <br /> {t('methodology.titleLine2')}
            </h3>
          </div>
          <p className="text-slate-500 font-medium text-lg max-w-sm leading-relaxed border-l-2 border-slate-200 pl-8">
            {t('methodology.paragraph')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {itemsWithIcons.map((item, i) => (
            <div
              key={i}
              className="group p-12 rounded-[48px] bg-white border border-slate-200/50 hover:border-[#CFA73A]/40 transition-all duration-700 hover:shadow-2xl hover:shadow-[#CFA73A]/5"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#0B1320] text-[#CFA73A] flex items-center justify-center mb-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_10px_30px_rgba(207,167,58,0.2)]">
                {React.cloneElement(item.icon, { size: 28 })}
              </div>
              <h4 className="text-2xl font-black text-[#0B1320] mb-6 tracking-tight">{item.title}</h4>
              <p className="text-slate-500 font-medium leading-relaxed opacity-80">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
