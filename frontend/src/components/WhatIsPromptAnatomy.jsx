import { useLocale } from '../i18n/LocaleContext'

export default function WhatIsPromptAnatomy() {
  const { t } = useLocale()
  const bullets = [
    t('whatIs.bullet1'),
    t('whatIs.bullet2'),
    t('whatIs.bullet3'),
  ]
  return (
    <section id="what-is" className="py-16 md:py-24 bg-white px-4 sm:px-6 border-b border-slate-100 overflow-hidden" aria-labelledby="what-is-heading">
      <div className="max-w-3xl mx-auto text-center min-w-0">
        <h2 id="what-is-heading" className="text-3xl md:text-4xl font-black text-brand-dark tracking-tight mb-6">
          {t('whatIs.title')}
        </h2>
        <p className="text-lg text-slate-600 font-medium mb-8 leading-relaxed">
          {t('whatIs.intro')}
        </p>
        <p className="text-base font-bold text-slate-600 mb-3">
          {t('whatIs.listLabel')}
        </p>
        <ul className="list-none space-y-3 text-left inline-block">
          {bullets.map((text, i) => (
            <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-brand-accent shrink-0" aria-hidden="true" />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
