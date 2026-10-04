import React from 'react'
import { Search, Layers, Zap, ArrowRight } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'

const ICONS = [
  <Search key="s" className="icon-lg" />,
  <Layers key="l" className="icon-lg" />,
  <Zap key="z" className="icon-lg" />
]

function ProcessArrow() {
  return (
    <div className="hidden lg:flex items-center justify-center shrink-0 w-8 text-ink-faint" aria-hidden>
      <ArrowRight className="icon-md opacity-55" aria-hidden />
    </div>
  )
}

export default function Methodology() {
  const { t } = useLocale()
  const items = t('methodology.items') || []
  const itemsWithIcons = Array.isArray(items) ? items.map((item, i) => ({ ...item, icon: ICONS[i], step: String(i + 1).padStart(2, '0') })) : []

  return (
    <section id="metodologija" className="section-default bg-linear-to-b from-canvas to-canvas-muted/80 border-y border-stroke-subtle overflow-hidden">
      <div className="max-w-7xl mx-auto min-w-0">
        <div className="section-header-gap flex flex-col lg:flex-row justify-between items-end gap-12">
          <div className="max-w-2xl">
            <p className="text-label-upper text-amber-800 mb-8">{t('methodology.sectionLabel')}</p>
            <h2 className="section-heading">
              {t('methodology.titleLine1')} <br /> {t('methodology.titleLine2')}
            </h2>
          </div>
          <div className="bg-brand-accent/10 rounded-lg pl-4 pr-5 py-4 border-l-4 border-brand-accent max-w-sm">
            <p className="text-lead text-ink-strong whitespace-pre-line">
              {t('methodology.paragraph')}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-8">
          {itemsWithIcons.map((item, i) => (
            <React.Fragment key={i}>
              <div
                className="group flex-1 min-w-0 flex flex-col min-h-[280px] card-density transition-all duration-overlay hover:-translate-y-1 hover:shadow-soft-lg hover:border-brand-accent/20"
              >
                <div className="w-14 h-14 rounded-xl bg-brand-dark text-brand-accent flex items-center justify-center mb-6 transition-all duration-ui group-hover:rotate-[4deg] shadow-accent-ring group-hover:shadow-accent-ring-hover">
                  {item.icon}
                </div>
                <span className="text-label-upper text-ink-muted mb-2 block">{item.step}</span>
                <h3 className="text-2xl font-bold text-brand-dark mb-4 tracking-tight">{item.title}</h3>
                <p className="text-ink-muted font-medium leading-relaxed text-base">{item.desc}</p>
              </div>
              {i < itemsWithIcons.length - 1 && <ProcessArrow />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
