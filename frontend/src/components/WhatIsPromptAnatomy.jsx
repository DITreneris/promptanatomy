import { useLocale } from '../i18n/LocaleContext'

function ArrowConnector() {
  return (
    <svg className="w-5 h-5 text-slate-400 shrink-0" aria-hidden viewBox="0 0 20 20" fill="none">
      <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function WhatIsPromptAnatomy() {
  const { t } = useLocale()
  const processBlocks = t('whatIs.processBlocks') || []
  const blocks = Array.isArray(processBlocks) ? processBlocks : []

  return (
    <section
      id="what-is-prompt-anatomy"
      className="section-default bg-slate-50 overflow-hidden"
      aria-labelledby="what-is-heading"
    >
      <div className="max-w-4xl mx-auto text-center min-w-0">
        {/* 1. TITLE */}
        <h2
          id="what-is-heading"
          className="section-heading mb-6"
        >
          {t('whatIs.title')}
        </h2>

        {/* 2. VALUE – hero definition block (premium SaaS weight) */}
        <div className="max-w-[820px] mx-auto mb-8">
          <div className="bg-brand-accent/5 rounded-2xl px-8 py-8 sm:px-10 sm:py-8 border border-slate-200/60 shadow-hero-value">
            <p className="text-lg text-slate-700 font-medium leading-[1.6]">
              {t('whatIs.valueLine1')}
            </p>
            <p className="text-lg text-slate-700 font-medium leading-[1.6] mt-2">
              {t('whatIs.valueLine2')}
            </p>
          </div>
          <p className="mt-6">
            <a
              href="#pricing"
              className="text-base font-bold text-brand-dark underline decoration-brand-accent/60 underline-offset-4 hover:text-brand-accent focus-ring rounded-sm"
            >
              {t('whatIs.ctaPricing')} →
            </a>
          </p>
        </div>

        {/* 3. PROCESS – pipeline pills (INPUT = active step) */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-3 mb-12" role="list" aria-label={t('whatIs.processAriaLabel')}>
          {blocks.map((label, i) => {
            const isActive = i === 1
            const pillClass = isActive
              ? 'px-4 py-2 rounded-full bg-brand-accent/15 border-2 border-brand-accent/40 text-sm font-bold text-brand-dark shadow-soft ring-2 ring-brand-accent/20 transition-all duration-150'
              : 'px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-sm font-bold text-slate-700 shadow-soft transition-all duration-150 hover:-translate-y-0.5'
            return (
              <span key={i} className="inline-flex items-center gap-4">
                <span className={pillClass} role="listitem">
                  {label}
                </span>
                {i < blocks.length - 1 && (
                  <span className="inline-flex items-center self-center">
                    <ArrowConnector />
                  </span>
                )}
              </span>
            )
          })}
        </div>

        {/* 4. PROOF – 3 stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          <figure className="text-center m-0 card-density transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg">
            <p className="text-stat mb-2">
              {t('whatIs.stat1Number')}
            </p>
            <figcaption className="text-slate-600 font-medium text-sm md:text-base">
              {t('whatIs.stat1Label')}
            </figcaption>
          </figure>
          <figure className="text-center m-0 card-density transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg">
            <p className="text-stat mb-2">
              {t('whatIs.stat2Number')}
            </p>
            <figcaption className="text-slate-600 font-medium text-sm md:text-base">
              {t('whatIs.stat2Label')}
            </figcaption>
          </figure>
          <figure className="text-center m-0 card-density transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg">
            <p className="text-stat mb-2">
              {t('whatIs.stat3Number')}
            </p>
            <figcaption className="text-slate-600 font-medium text-sm md:text-base">
              {t('whatIs.stat3Label')}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
