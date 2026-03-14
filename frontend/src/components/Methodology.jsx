import React from 'react'
import { Search, Layers, Zap } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'

const ICONS = [<Search key="s" />, <Layers key="l" />, <Zap key="z" />]

function ProcessArrow() {
  return (
    <div className="hidden md:flex items-center justify-center flex-shrink-0 w-8 text-slate-300" aria-hidden>
      <svg className="w-5 h-5 opacity-35" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 4l6 6-6 6" />
      </svg>
    </div>
  )
}

export default function Methodology() {
  const { t } = useLocale()
  const items = t('methodology.items') || []
  const itemsWithIcons = Array.isArray(items) ? items.map((item, i) => ({ ...item, icon: ICONS[i], step: String(i + 1).padStart(2, '0') })) : []

  return (
    <section id="metodologija" className="py-20 md:py-28 mt-20 bg-gradient-to-b from-slate-50 to-slate-100/80 px-4 sm:px-6 md:px-8 border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto min-w-0">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 md:mb-24 gap-12">
          <div className="max-w-2xl">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-accent mb-8">{t('methodology.sectionLabel')}</h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none bg-gradient-to-r from-brand-dark to-slate-700 bg-clip-text text-transparent">
              {t('methodology.titleLine1')} <br /> {t('methodology.titleLine2')}
            </h3>
          </div>
          <div className="bg-brand-accent/10 rounded-lg pl-4 pr-5 py-4 border-l-4 border-brand-accent max-w-sm">
            <p className="text-slate-700 font-medium text-lg leading-relaxed">
              {t('methodology.paragraph')}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-8">
          {itemsWithIcons.map((item, i) => (
            <React.Fragment key={i}>
              <div
                className="group flex-1 min-w-0 p-8 md:p-10 rounded-2xl bg-white shadow-methodology-card border border-slate-100 transition-all duration-[180ms] hover:-translate-y-1.5 hover:shadow-soft-lg hover:border-brand-accent/20"
              >
                <div className="w-14 h-14 rounded-[14px] bg-brand-dark text-brand-accent flex items-center justify-center mb-8 transition-all duration-[180ms] group-hover:rotate-[4deg] group-hover:shadow-[0_0_0_4px_rgba(207,167,58,0.12)] shadow-[0_0_0_4px_rgba(207,167,58,0.08)]">
                  {React.cloneElement(item.icon, { size: 26 })}
                </div>
                <span className="text-xs font-bold text-slate-400 tracking-widest mb-2 block">{item.step}</span>
                <h4 className="text-2xl font-bold text-brand-dark mb-4 tracking-tight">{item.title}</h4>
                <p className="text-[#475569] font-medium leading-relaxed text-base">{item.desc}</p>
              </div>
              {i < itemsWithIcons.length - 1 && <ProcessArrow />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
