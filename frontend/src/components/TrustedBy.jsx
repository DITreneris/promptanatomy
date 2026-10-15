import { useEffect, useState } from 'react'
import { useLocale } from '../i18n/LocaleContext'
import { LOGOS } from './trustedByLogos'

/**
 * Static grid instead of the marquee when the user asked for reduced motion or the
 * device has no hover (touch): there the marquee could not be paused (WCAG 2.2.2).
 */
const STATIC_QUERIES = ['(prefers-reduced-motion: reduce)', '(hover: none)']

function matchesAnyStaticQuery() {
  return typeof window !== 'undefined' && STATIC_QUERIES.some((q) => window.matchMedia(q).matches)
}

function useStaticLogoBand() {
  const [isStatic, setIsStatic] = useState(matchesAnyStaticQuery)

  useEffect(() => {
    const lists = STATIC_QUERIES.map((q) => window.matchMedia(q))
    const onChange = () => setIsStatic(lists.some((mq) => mq.matches))
    lists.forEach((mq) => mq.addEventListener('change', onChange))
    return () => lists.forEach((mq) => mq.removeEventListener('change', onChange))
  }, [])

  return isStatic
}

function LogoImg({ logo, lockSize = false }) {
  return (
    <img
      src={logo.src}
      alt={logo.alt}
      width={logo.w}
      height={logo.h}
      loading="lazy"
      decoding="async"
      className={`${logo.size} w-auto object-contain grayscale opacity-70${lockSize ? ' max-w-none' : ''}`}
    />
  )
}

/**
 * The trailing `pr-*` equals the internal gap, so one row = logos + gaps + one closing gap.
 * The track has no gap of its own: two rows make it exactly 2x one row and
 * `translateX(-50%)` lands on the clone's first logo without a seam jump.
 */
function LogoRow({ clone = false }) {
  return (
    <ul
      aria-hidden={clone || undefined}
      className="flex items-center gap-x-8 pr-8 sm:gap-x-10 sm:pr-10 m-0 p-0 list-none"
    >
      {LOGOS.map((logo) => (
        <li key={clone ? `${logo.src}-clone` : logo.src}>
          <LogoImg logo={clone ? { ...logo, alt: '' } : logo} lockSize />
        </li>
      ))}
    </ul>
  )
}

export default function TrustedBy() {
  const { t } = useLocale()
  const isStatic = useStaticLogoBand()

  return (
    <section
      id="trusted-by"
      aria-labelledby="trusted-by-heading"
      className="section-band bg-white px-4 sm:px-6 md:px-8"
    >
      <div className="max-w-5xl mx-auto min-w-0">
        <h2 id="trusted-by-heading" className="text-label-upper text-ink-soft text-center mb-6 md:mb-8">
          {t('trustedBy.title')}
        </h2>
        {isStatic ? (
          <ul className="grid grid-cols-2 sm:grid-cols-4 items-center justify-items-center gap-x-4 gap-y-6 sm:gap-x-8 sm:gap-y-8 list-none m-0 p-0">
            {LOGOS.map((logo) => (
              <li key={logo.src}>
                <LogoImg logo={logo} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="logo-marquee-viewport">
            <div className="logo-marquee-track flex w-max items-center">
              <LogoRow />
              <LogoRow clone />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
