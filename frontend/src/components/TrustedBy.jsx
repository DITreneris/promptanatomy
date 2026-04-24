import { useLocale } from '../i18n/LocaleContext'

/** Official client logos: replace files in /public/logos/trusted/ when brand assets arrive. */
const TRUSTED_CLIENTS = [
  { id: 'pigu', src: '/logos/trusted/pigu.svg', alt: 'Pigu.lt' },
  { id: '220lv', src: '/logos/trusted/220lv.svg', alt: '220.lv' },
  { id: 'kaup24', src: '/logos/trusted/kaup24.svg', alt: 'Kaup24.ee' },
  { id: 'hobbyhall', src: '/logos/trusted/hobbyhall.svg', alt: 'Hobbyhall.fi' },
  { id: 'apvalaus-kvadratas', src: '/logos/trusted/apvalaus-kvadratas.svg', alt: 'Apvalaus kvadrato mokykla' },
  { id: 'senoji-baldine', src: '/logos/trusted/senoji-baldine.svg', alt: 'Senoji baldinė' },
  { id: 'bagfactory', src: '/logos/trusted/bagfactory.svg', alt: 'Bagfactory' },
]

export default function TrustedBy() {
  const { t } = useLocale()

  return (
    <section
      id="trusted-by"
      className="py-12 md:py-16 bg-white px-4 sm:px-6 md:px-8 overflow-hidden"
      aria-labelledby="trusted-by-heading"
    >
      <div className="max-w-7xl mx-auto min-w-0">
        <h2
          id="trusted-by-heading"
          className="text-center text-xs md:text-sm font-black uppercase tracking-[0.2em] text-slate-500 mb-8 md:mb-10"
        >
          {t('trustedBy.title')}
        </h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-8 md:gap-x-10 md:gap-y-10 items-center justify-items-center list-none p-0 m-0">
          {TRUSTED_CLIENTS.map(({ id, src, alt }) => (
            <li key={id} className="flex h-14 md:h-16 min-h-[44px] items-center justify-center w-full">
              <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                className="max-h-full w-auto max-w-[140px] md:max-w-[160px] object-contain opacity-85 motion-safe:transition-opacity motion-safe:duration-200 hover:opacity-100 grayscale hover:grayscale-0 motion-reduce:grayscale-0 motion-reduce:hover:opacity-100"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
