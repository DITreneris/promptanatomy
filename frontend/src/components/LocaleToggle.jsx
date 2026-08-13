import { useLocale } from '../i18n/LocaleContext'
import { prefetchLocale } from '../i18n/loadLocale'

const FOCUS_RING = 'focus-ring'

export default function LocaleToggle() {
  const { locale, setLocale } = useLocale()

  return (
    <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-100 border border-slate-200 shrink-0">
      <button
        type="button"
        onClick={() => setLocale('lt')}
        onMouseEnter={() => prefetchLocale('lt')}
        onFocus={() => prefetchLocale('lt')}
        className={`px-2.5 py-1 rounded-md text-label-upper tracking-wide transition-colors duration-200 ${locale === 'lt' ? 'bg-brand-dark text-white' : 'text-slate-600 hover:text-brand-dark'} ${FOCUS_RING}`}
        aria-pressed={locale === 'lt'}
        aria-label="Lietuvių"
      >
        LT
      </button>
      <button
        type="button"
        onClick={() => setLocale('en')}
        onMouseEnter={() => prefetchLocale('en')}
        onFocus={() => prefetchLocale('en')}
        className={`px-2.5 py-1 rounded-md text-label-upper tracking-wide transition-colors duration-200 ${locale === 'en' ? 'bg-brand-dark text-white' : 'text-slate-600 hover:text-brand-dark'} ${FOCUS_RING}`}
        aria-pressed={locale === 'en'}
        aria-label="English"
      >
        EN
      </button>
    </div>
  )
}
