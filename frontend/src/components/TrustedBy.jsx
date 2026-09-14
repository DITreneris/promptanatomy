import { useLocale } from '../i18n/LocaleContext'

/** Tvarka: Pigu.lt ir Cgates atidaro mobilias 3+3 eilutes (atpažįstami inkarai). */
const LOGOS = [
  { src: '/logo/pigu.webp', alt: 'Pigu.lt', w: 324, h: 96, size: 'h-6 sm:h-7' },
  { src: '/logo/rizikos_cesija.webp', alt: 'Rizikos Cesija', w: 229, h: 96, size: 'h-8 sm:h-9' },
  { src: '/logo/apk.webp', alt: 'Apvalaus Kvadrato Mokykla', w: 213, h: 96, size: 'h-8 sm:h-9' },
  { src: '/logo/cgates.webp', alt: 'Cgates', w: 349, h: 96, size: 'h-6 sm:h-7' },
  { src: '/logo/senoji_baldine.webp', alt: 'Senoji Baldinė', w: 234, h: 96, size: 'h-8 sm:h-9' },
  { src: '/logo/hitus_legal.webp', alt: 'Hitus Legal', w: 130, h: 96, size: 'h-10 sm:h-11' },
]

export default function TrustedBy() {
  const { t } = useLocale()

  return (
    <section
      id="trusted-by"
      aria-labelledby="trusted-by-heading"
      className="bg-white px-4 sm:px-6 md:px-8 py-10 md:py-12"
    >
      <div className="max-w-5xl mx-auto min-w-0">
        <h2 id="trusted-by-heading" className="text-label-upper text-slate-500 text-center mb-6 md:mb-8">
          {t('trustedBy.title')}
        </h2>
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6 sm:gap-x-6 md:gap-x-8 lg:gap-x-10 list-none m-0 p-0">
          {LOGOS.map((logo) => (
            <li key={logo.src}>
              <img
                src={logo.src}
                alt={logo.alt}
                width={logo.w}
                height={logo.h}
                loading="lazy"
                decoding="async"
                className={`${logo.size} w-auto object-contain grayscale opacity-70`}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
