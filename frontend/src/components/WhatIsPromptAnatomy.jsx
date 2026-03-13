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
      id="what-is"
      className="py-20 md:py-28 bg-slate-50 px-4 sm:px-6 overflow-hidden"
      aria-labelledby="what-is-heading"
    >
      <div className="max-w-4xl mx-auto text-center min-w-0">
        {/* 1. TITLE */}
        <h2
          id="what-is-heading"
          className="text-4xl md:text-5xl font-black text-brand-dark tracking-[-0.02em] leading-[1.1] mb-6"
        >
          {t('whatIs.title')}
        </h2>

        {/* 2. VALUE – soft highlight container */}
        <div className="max-w-[720px] mx-auto mb-8">
          <div className="bg-brand-accent/10 rounded-lg px-5 py-4 border border-brand-accent/20">
            <p className="text-lg text-slate-700 font-medium leading-relaxed">
              {t('whatIs.valueLine1')}
            </p>
            <p className="text-lg text-slate-700 font-medium leading-relaxed mt-2">
              {t('whatIs.valueLine2')}
            </p>
          </div>
        </div>

        {/* 3. PROCESS – pills with connector arrows */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-12" role="list" aria-label={t('whatIs.processAriaLabel')}>
          {blocks.map((label, i) => (
            <span key={i} className="inline-flex items-center gap-4">
              <span className="px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-sm font-bold text-slate-700 shadow-[0_2px_6px_rgba(0,0,0,0.05),0_0_0_1px_rgba(255,196,0,0.15)] transition-all duration-150 hover:-translate-y-0.5">
                {label}
              </span>
              {i < blocks.length - 1 && <ArrowConnector />}
            </span>
          ))}
        </div>

        {/* 4. PROOF – 3 stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          <figure className="text-center m-0 bg-white rounded-2xl p-6 shadow-stat-card transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg">
            <p className="text-5xl md:text-[56px] font-black text-brand-dark leading-none mb-2" aria-hidden="true">
              {t('whatIs.stat1Number')}
            </p>
            <figcaption className="text-slate-600 font-medium text-sm md:text-base">
              {t('whatIs.stat1Label')}
            </figcaption>
          </figure>
          <figure className="text-center m-0 bg-white rounded-2xl p-6 shadow-stat-card transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg">
            <p className="text-5xl md:text-[56px] font-black text-brand-dark leading-none mb-2" aria-hidden="true">
              {t('whatIs.stat2Number')}
            </p>
            <figcaption className="text-slate-600 font-medium text-sm md:text-base">
              {t('whatIs.stat2Label')}
            </figcaption>
          </figure>
          <figure className="text-center m-0 bg-white rounded-2xl p-6 shadow-stat-card transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg">
            <p className="text-5xl md:text-[56px] font-black text-brand-dark leading-none mb-2" aria-hidden="true">
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
