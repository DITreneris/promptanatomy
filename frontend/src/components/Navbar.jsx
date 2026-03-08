import { useState, useEffect } from 'react'
import { Zap, Menu, X } from 'lucide-react'
import { GLOSSARY_URL } from '../config'
import { useLocale } from '../i18n/LocaleContext'

const FOCUS_RING = 'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFA73A] focus-visible:ring-offset-2'

export default function Navbar({ onCtaClick }) {
  const { t, locale, setLocale } = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navItems = [
    { name: t('nav.ecosystem'), id: 'ekosistema' },
    { name: t('nav.methodology'), id: 'metodologija' },
    ...(GLOSSARY_URL
      ? [{ name: t('nav.repo'), id: null, href: GLOSSARY_URL, external: true }]
      : []),
    { name: t('nav.pricing'), id: 'pricing' },
  ]

  const closeMobile = () => setMobileOpen(false)

  const navLinkClass = `text-xs font-black uppercase tracking-[0.15em] text-slate-500 hover:text-[#0B1320] transition-colors min-h-[44px] min-w-[44px] inline-flex items-center ${FOCUS_RING}`

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled ? 'py-3 bg-white/70 backdrop-blur-2xl border-b border-slate-200 shadow-sm' : 'py-6 bg-transparent'
      }`}
      aria-label={t('nav.ariaNav')}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="/" className={`flex items-center gap-4 group cursor-pointer ${FOCUS_RING} rounded-lg`}>
          <div className="w-12 h-12 rounded-2xl bg-[#0B1320] flex items-center justify-center text-[#CFA73A] shadow-2xl group-hover:scale-105 transition-all duration-500 border border-white/10">
            <Zap className="w-7 h-7 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter leading-none text-[#0B1320] flex items-center gap-2">
              {t('nav.brandPromptu')} <span className="text-[#CFA73A]">{t('nav.brandAnatomija')}</span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-slate-100 text-[8px] font-black text-slate-400 align-middle">{t('nav.version')}</span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">{t('nav.brandTagline')}</span>
          </div>
        </a>

        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.id ?? 'repo'}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={navLinkClass}
              >
                {item.name}
              </a>
            ) : (
              <a
                key={item.id ?? 'repo'}
                href={`#${item.id}`}
                className={navLinkClass}
              >
                {item.name}
              </a>
            )
          )}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() => setLocale('lt')}
                className={`px-2.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${locale === 'lt' ? 'bg-[#0B1320] text-white' : 'text-slate-500 hover:text-[#0B1320]'} ${FOCUS_RING}`}
                aria-pressed={locale === 'lt'}
                aria-label="Lietuvių"
              >
                LT
              </button>
              <button
                type="button"
                onClick={() => setLocale('en')}
                className={`px-2.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${locale === 'en' ? 'bg-[#0B1320] text-white' : 'text-slate-500 hover:text-[#0B1320]'} ${FOCUS_RING}`}
                aria-pressed={locale === 'en'}
                aria-label="English"
              >
                EN
              </button>
            </div>
            <button
              type="button"
              onClick={onCtaClick}
              className={`px-8 py-3 rounded-xl text-sm font-black text-[#0B1320] transition-all hover:shadow-[0_10px_20px_rgba(207,167,58,0.2)] hover:-translate-y-0.5 active:scale-95 bg-[#CFA73A] border border-white/20 min-h-[44px] ${FOCUS_RING}`}
            >
              {t('nav.cta')}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className={`md:hidden p-3 rounded-xl text-[#0B1320] hover:bg-slate-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${FOCUS_RING}`}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? t('nav.ariaCloseMenu') : t('nav.ariaOpenMenu')}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`fixed inset-0 z-[99] md:hidden ${mobileOpen ? 'visible' : 'invisible'}`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeMobile}
          aria-hidden
        />
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl border-l border-slate-200 flex flex-col pt-24 px-6 transition-transform duration-300 ease-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="mb-6 flex items-center gap-2 p-1 rounded-lg bg-slate-100 border border-slate-200 w-fit">
            <button
              type="button"
              onClick={() => setLocale('lt')}
              className={`px-4 py-2.5 rounded-md text-sm font-bold uppercase tracking-wider transition-colors ${locale === 'lt' ? 'bg-[#0B1320] text-white' : 'text-slate-500 hover:text-[#0B1320]'} ${FOCUS_RING}`}
              aria-pressed={locale === 'lt'}
              aria-label="Lietuvių"
            >
              LT
            </button>
            <button
              type="button"
              onClick={() => setLocale('en')}
              className={`px-4 py-2.5 rounded-md text-sm font-bold uppercase tracking-wider transition-colors ${locale === 'en' ? 'bg-[#0B1320] text-white' : 'text-slate-500 hover:text-[#0B1320]'} ${FOCUS_RING}`}
              aria-pressed={locale === 'en'}
              aria-label="English"
            >
              EN
            </button>
          </div>
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.id ?? 'repo'}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobile}
                className={`py-4 text-base font-black uppercase tracking-[0.15em] text-slate-500 hover:text-[#0B1320] border-b border-slate-100 min-h-[48px] flex items-center ${FOCUS_RING}`}
              >
                {item.name}
              </a>
            ) : (
              <a
                key={item.id ?? 'repo'}
                href={`#${item.id}`}
                onClick={closeMobile}
                className={`py-4 text-base font-black uppercase tracking-[0.15em] text-slate-500 hover:text-[#0B1320] border-b border-slate-100 min-h-[48px] flex items-center ${FOCUS_RING}`}
              >
                {item.name}
              </a>
            )
          )}
          <button
            type="button"
            onClick={() => { closeMobile(); onCtaClick() }}
            className={`mt-8 py-4 rounded-xl text-base font-black text-[#0B1320] bg-[#CFA73A] border border-white/20 min-h-[48px] flex items-center justify-center ${FOCUS_RING}`}
          >
            {t('nav.cta')}
          </button>
        </div>
      </div>
    </nav>
  )
}
