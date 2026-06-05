import { useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'

const FAQ_SCHEMA_SCRIPT_ID = 'faq-ldjson'

export default function Faq() {
  const { t, locale } = useLocale()
  const sectionLabel = t('faq.sectionLabel')
  const title = t('faq.title')
  const items = t('faq.items')
  const list = Array.isArray(items) ? items : []

  useEffect(() => {
    if (list.length === 0) return
    document.getElementById(FAQ_SCHEMA_SCRIPT_ID)?.remove()
    const script = document.createElement('script')
    script.id = FAQ_SCHEMA_SCRIPT_ID
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: list.map((item) => ({
        '@type': 'Question',
        name: item?.q ?? '',
        acceptedAnswer: {
          '@type': 'Answer',
          text: item?.a ?? ''
        }
      }))
    })
    document.head.appendChild(script)
    return () => {
      document.getElementById(FAQ_SCHEMA_SCRIPT_ID)?.remove()
    }
  }, [locale])

  return (
    <section
      id="faq"
      className="section-default bg-white overflow-hidden"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto min-w-0">
        {sectionLabel && (
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-brand-accent text-center mb-4">
            {sectionLabel}
          </p>
        )}
        <h2
          id="faq-heading"
          className="section-heading mb-10 text-center"
        >
          {title}
        </h2>
        <div className="space-y-3">
          {list.map((item, i) => (
            <details
              key={i}
              className="group faq-item"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
                <span className="text-lg font-bold text-brand-dark">
                  {item?.q}
                </span>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-slate-500 transition-all duration-200 group-open:rotate-180 group-hover:text-brand-accent"
                  aria-hidden="true"
                />
              </summary>
              <div className="px-6 pb-5">
                <p className="text-slate-600 font-medium leading-relaxed">
                  {item?.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
