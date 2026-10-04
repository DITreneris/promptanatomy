import { ArrowRight } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'

function ArrowConnector() {
  return <ArrowRight className="icon-md text-ink-faint shrink-0" aria-hidden />
}

export default function WhatIsPromptAnatomy() {
  const { t } = useLocale()
  const processBlocks = t('whatIs.processBlocks') || []
  const blocks = Array.isArray(processBlocks) ? processBlocks : []

  return (
    <section
      id="what-is-prompt-anatomy"
      className="section-default bg-canvas overflow-hidden"
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
        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-brand-accent/5 rounded-2xl px-8 py-8 sm:px-10 sm:py-8 border border-stroke/60 shadow-hero-value">
            <p className="text-lead text-ink-strong">
              {t('whatIs.valueLine1')}
            </p>
            <p className="text-lead text-ink-strong mt-2">
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

        {/* 3. PROCESS – six equal block pills */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-3 mb-12" role="list" aria-label={t('whatIs.processAriaLabel')}>
          {blocks.map((label, i) => {
            const pillClass = 'px-4 py-2 rounded-full bg-canvas-muted border border-stroke text-sm font-bold text-ink-strong shadow-soft transition-all duration-ui hover:-translate-y-1'
            return (
              <span key={i} className="inline-flex items-center gap-4">
                <span className={pillClass} role="listitem">
                  {label}
                </span>
                {i < blocks.length - 1 && (
                  <span className="hidden lg:inline-flex items-center self-center">
                    <ArrowConnector />
                  </span>
                )}
              </span>
            )
          })}
        </div>

        {/* 4. PROOF – 3 stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          <figure className="text-center m-0 card-density transition-all duration-overlay hover:-translate-y-1 hover:shadow-soft-lg">
            <p className="text-stat mb-2">
              {t('whatIs.stat1Number')}
            </p>
            <figcaption className="text-ink-muted font-medium text-sm md:text-base">
              {t('whatIs.stat1Label')}
            </figcaption>
          </figure>
          <figure className="text-center m-0 card-density transition-all duration-overlay hover:-translate-y-1 hover:shadow-soft-lg">
            <p className="text-stat mb-2">
              {t('whatIs.stat2Number')}
            </p>
            <figcaption className="text-ink-muted font-medium text-sm md:text-base">
              {t('whatIs.stat2Label')}
            </figcaption>
          </figure>
          <figure className="text-center m-0 card-density transition-all duration-overlay hover:-translate-y-1 hover:shadow-soft-lg">
            <p className="text-stat mb-2">
              {t('whatIs.stat3Number')}
            </p>
            <figcaption className="text-ink-muted font-medium text-sm md:text-base">
              {t('whatIs.stat3Label')}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
