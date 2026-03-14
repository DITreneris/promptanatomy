import { useEffect } from 'react'
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
        <dl className="space-y-10">
          {list.map((item, i) => (
            <div key={i}>
              <dt className="text-lg font-bold text-brand-dark mb-2">
                {item?.q}
              </dt>
              <dd className="text-slate-600 font-medium leading-relaxed">
                {item?.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
