import { useState, useEffect, useMemo } from 'react'
import { ArrowRight } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'

const HERO_BULLET_KEYS = ['hero.bullet1', 'hero.bullet2', 'hero.bullet3']
const TYPING_MS = 55
const LINE_PAUSE_MS = 300
const START_DELAY_MS = 400

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

export default function Hero({ onCta }) {
  const { t, locale } = useLocale()
  const prefersReducedMotion = usePrefersReducedMotion()

  const fullTexts = useMemo(
    () => [
      t('hero.codeRoleValue'),
      t('hero.codeContextValue'),
      t('hero.codeSchemaValue'),
    ],
    [t, locale]
  )

  const [phase, setPhase] = useState(0)
  const [displayed, setDisplayed] = useState(['', '', ''])

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayed(fullTexts)
      setPhase(4)
      return
    }

    let cancelled = false
    const timers = []

    const schedule = (fn, delay) => {
      timers.push(setTimeout(() => {
        if (!cancelled) fn()
      }, delay))
    }

    setDisplayed(['', '', ''])
    setPhase(0)

    const typeLine = (lineIndex) => {
      const target = fullTexts[lineIndex]
      if (!target) {
        if (lineIndex < 2) schedule(() => typeLine(lineIndex + 1), LINE_PAUSE_MS)
        else schedule(() => setPhase(4), LINE_PAUSE_MS)
        return
      }

      setPhase(lineIndex + 1)
      let charIdx = 0

      const tick = () => {
        charIdx += 1
        setDisplayed((prev) => {
          const next = [...prev]
          next[lineIndex] = target.slice(0, charIdx)
          return next
        })
        if (charIdx < target.length) {
          schedule(tick, TYPING_MS)
        } else if (lineIndex < 2) {
          schedule(() => typeLine(lineIndex + 1), LINE_PAUSE_MS)
        } else {
          schedule(() => setPhase(4), LINE_PAUSE_MS)
        }
      }

      tick()
    }

    schedule(() => typeLine(0), START_DELAY_MS)

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [prefersReducedMotion, fullTexts])

  const lineVisible = (lineIdx) => phase > lineIdx

  return (
    <section className="relative pt-24 md:pt-44 pb-20 md:pb-32 overflow-hidden bg-hero-bg">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('/noise.svg')]"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/80 -skew-x-12 translate-x-32 -z-10 border-l border-slate-100"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center min-w-0">
        <div className="relative z-10 text-left min-w-0">
          <p className="inline-flex items-center gap-2.5 bg-brand-dark text-white px-4 py-2 rounded-full mb-8 md:mb-10 shadow-soft border border-white/10 border-brand-accent/25">
            <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-brand-accent" aria-hidden="true" />
            <span className="text-label-upper text-slate-100">
              {t('hero.badge')}
            </span>
          </p>

          <h1 className="max-[359px]:text-3xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-brand-dark mb-4 md:mb-6 leading-[0.95] tracking-tighter break-words">
            {t('hero.headline1')}<br />
            <span className="text-transparent bg-clip-text bg-accent-gradient break-words">
              {t('hero.headline2')}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 font-bold mb-4 max-w-xl break-words" aria-describedby="hero-bullets">
            {t('hero.subtitle')}
          </p>
          <ul id="hero-bullets" className="hidden sm:block list-none space-y-2 mb-8 md:mb-10 max-w-xl text-base md:text-lg text-slate-600 font-medium">
            {HERO_BULLET_KEYS.map((key) => (
              <li key={key} className="flex items-center gap-2">
                <span className="text-brand-accent font-bold" aria-hidden="true">•</span>
                {t(key)}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 sm:gap-6 items-stretch sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onCta}
              className="group w-full sm:w-auto btn-primary-lg flex items-center justify-center gap-3"
            >
              {t('hero.cta')} <ArrowRight className="icon-lg group-hover:translate-x-1 transition-transform" aria-hidden />
            </button>

            <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/90 px-4 py-3 text-sm font-semibold text-slate-600 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
              <span>{t('hero.socialProof')}</span>
            </div>
          </div>
        </div>

        <div className="relative group perspective-1000 min-w-0 rounded-3xl">
          <div className="absolute inset-0 overflow-hidden rounded-3xl" aria-hidden>
            <div className="absolute -inset-10 bg-linear-to-r from-brand-accent to-brand-dark rounded-[60px] opacity-5 blur-2xl md:opacity-10 md:blur-3xl group-hover:opacity-10 md:group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
          </div>
          <div className="relative bg-brand-dark rounded-3xl p-5 sm:p-10 border border-white/10 shadow-soft-lg overflow-x-auto overflow-y-visible font-mono min-w-0">
            <div className="flex items-center mb-12 gap-3 shrink-0">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>

            <div className="space-y-6">
              <div
                className="group/line cursor-default transition-all hover:translate-x-1"
                style={{ opacity: lineVisible(0) ? 1 : 0, transform: lineVisible(0) ? 'none' : 'translateY(8px)', transition: 'opacity 0.3s ease-out, transform 0.3s ease-out' }}
              >
                <div className="text-sm sm:text-xs text-slate-400 mb-1 font-black tracking-[0.2em]">{t('hero.codeLine1')}</div>
                <div className="text-sm border-l-2 border-brand-accent/50 group-hover/line:border-brand-accent transition-colors duration-200 pl-5 py-1 break-words min-w-0">
                  <span className="text-brand-accent font-black">{t('hero.codeRole')}</span>
                  <span className="text-slate-200 italic break-words">
                    {displayed[0] && <>&quot;{displayed[0]}&quot;</>}
                    {phase === 1 && <span className="animate-blink-caret pl-px">&nbsp;</span>}
                  </span>
                </div>
              </div>
              <div
                className="group/line cursor-default transition-all hover:translate-x-1"
                style={{ opacity: lineVisible(1) ? 1 : 0, transform: lineVisible(1) ? 'none' : 'translateY(8px)', transition: 'opacity 0.3s ease-out, transform 0.3s ease-out' }}
              >
                <div className="text-sm sm:text-xs text-slate-400 mb-1 font-black tracking-[0.2em]">{t('hero.codeLine2')}</div>
                <div className="text-sm border-l-2 border-indigo-500/50 group-hover/line:border-indigo-500 transition-colors pl-5 py-1 break-words min-w-0">
                  <span className="text-indigo-300 font-black">{t('hero.codeContext')}</span>
                  <span className="text-slate-200 italic break-words">
                    {displayed[1] && <>&quot;{displayed[1]}&quot;</>}
                    {phase === 2 && <span className="animate-blink-caret pl-px">&nbsp;</span>}
                  </span>
                </div>
              </div>
              <div
                className="group/line cursor-default transition-all hover:translate-x-1"
                style={{ opacity: lineVisible(2) ? 1 : 0, transform: lineVisible(2) ? 'none' : 'translateY(8px)', transition: 'opacity 0.3s ease-out, transform 0.3s ease-out' }}
              >
                <div className="text-sm sm:text-xs text-slate-400 mb-1 font-black tracking-[0.2em]">{t('hero.codeLine3')}</div>
                <div className="text-sm border-l-2 border-emerald-500/50 group-hover/line:border-emerald-500 transition-colors pl-5 py-1 break-words min-w-0">
                  <span className="text-emerald-300 font-black">{t('hero.codeSchema')}</span>
                  <span className="text-slate-200 italic break-words">
                    {displayed[2] && <>&quot;{displayed[2]}&quot;</>}
                    {phase === 3 && <span className="animate-blink-caret pl-px">&nbsp;</span>}
                  </span>
                </div>
              </div>
              <div
                className="pt-8 flex items-start gap-3 border-t border-white/5"
                style={{ opacity: phase >= 4 ? 1 : 0, transition: 'opacity 0.5s ease-out' }}
              >
                <div className="mt-1.5 w-2 h-2 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
                <span className="text-label-upper leading-snug tracking-[0.14em] sm:tracking-[0.18em] text-slate-200 break-words min-w-0">
                  {t('hero.terminalOutcome')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
