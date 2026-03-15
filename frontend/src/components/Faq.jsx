import { useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'

const FAQ_SCHEMA_SCRIPT_ID = 'faq-ldjson'

export default function Faq() {
  const { t, locale } = useLocale()
  const title = t('faq.title')
  const items = t('faq.items')
  const list = Array.isArray(items) ? items : []

  useEffect(() => {
    if (list.length === 0) return
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
      className="py-20 md:py-28 bg-white px-4 sm:px-6 md:px-8 overflow-hidden"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-4xl mx-auto min-w-0">
        <h2
          id="faq-heading"
          className="text-4xl md:text-5xl font-black text-brand-dark tracking-[-0.02em] leading-[1.1] mb-12"
        >
          {title}
        </h2>
        <div className="space-y-4">
          {list.map((item, i) => (
            <details
              key={i}
              className="group rounded-2xl border border-slate-200 bg-slate-50/70 transition-colors duration-200 open:bg-white open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
                <span className="text-lg font-bold text-brand-dark">
                  {item?.q}
                </span>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 group-open:rotate-180"
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
