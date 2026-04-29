import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Zap, Menu, X } from 'lucide-react'
import { GLOSSARY_URL, APP_VERSION } from '../config'
import { useLocale } from '../i18n/LocaleContext'
import { captureEcosystemOutboundClick } from '../analytics/posthog'

const FOCUS_RING = 'focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2'

export default function Navbar({ onCtaClick, hasAccess = false }) {
  const { t, locale, setLocale } = useLocale()
  const location = useLocation()
  const navigate = useNavigate()
  const homePath = locale === 'en' ? '/en' : '/lt'
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileOpenRef = useRef(false)
  const savedScrollY = useRef(0)
  const drawerRef = useRef(null)
  const hamburgerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (mobileOpenRef.current) return
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [])

  useLayoutEffect(() => {
    mobileOpenRef.current = mobileOpen
    if (mobileOpen) {
      savedScrollY.current = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${savedScrollY.current}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else if (document.body.style.position === 'fixed') {
      const restoreY = savedScrollY.current
      savedScrollY.current = 0
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      window.scrollTo({ top: restoreY, behavior: 'instant' })
    }
  }, [mobileOpen])

  // Focus: move into drawer on open, restore to hamburger on close
  useEffect(() => {
    if (!mobileOpen) return
    const frame = requestAnimationFrame(() => {
      const first = drawerRef.current?.querySelector('a[href], button:not([disabled])')
      if (first) first.focus()
    })
    return () => {
      cancelAnimationFrame(frame)
      hamburgerRef.current?.focus()
    }
  }, [mobileOpen])

  // Escape closes drawer
  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeMobile()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  // Focus trap: Tab cycles within drawer
  useEffect(() => {
    if (!mobileOpen || !drawerRef.current) return
    const getFocusables = () => {
      const sel = 'a[href], button:not([disabled])'
      return Array.from(drawerRef.current.querySelectorAll(sel))
    }
    const onKeyDown = (e) => {
      if (e.key !== 'Tab') return
      const focusables = getFocusables()
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  const primaryNavItems = [
    { name: t('nav.whatIs'), id: 'what-is' },
    { name: t('nav.pricing'), id: 'pricing' },
    ...(hasAccess ? [{ name: t('nav.training'), id: null, href: '/anatomija/', external: true }] : []),
  ]
  // „Mokymai“ tik primaryNavItems kai hasAccess – vienodai desktop ir mobile (be dublikato).
  const secondaryNavItems = [
    { name: t('nav.ecosystem'), id: 'ekosistema' },
    { name: t('nav.methodology'), id: 'metodologija' },
    { name: t('nav.cloud'), id: null, href: 'https://promptanatomy.cloud/', external: true },
    { name: t('nav.pro'), id: null, href: 'https://promptanatomy.pro/', external: true },
    ...(GLOSSARY_URL
      ? [{ name: t('nav.repo'), id: null, href: GLOSSARY_URL, external: true }]
      : []),
    { name: t('nav.faq'), id: 'faq' },
  ]
  const allNavItems = [...primaryNavItems, ...secondaryNavItems]

  const closeMobile = () => setMobileOpen(false)

  const navLinkClass = `relative text-xs font-bold uppercase tracking-[0.15em] text-slate-600 hover:text-brand-accent transition-colors duration-200 min-h-[44px] min-w-[44px] inline-flex items-center after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-brand-accent after:transition-all after:duration-200 after:w-0 hover:after:w-full ${FOCUS_RING}`

  return (
    <>
    <nav
      className={`fixed top-0 w-full z-100 [-webkit-backface-visibility:hidden] backface-hidden transition-all duration-500 ${
        scrolled ? 'py-3 bg-white/70 backdrop-blur-2xl border-b border-slate-200 shadow-xs' : 'py-4 md:py-6 bg-transparent'
      }`}
      aria-label={t('nav.ariaNav')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center gap-2 min-w-0">
        <Link to={homePath} className={`flex items-center gap-3 sm:gap-4 group cursor-pointer min-w-0 ${FOCUS_RING} rounded-lg`}>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-brand-dark flex items-center justify-center text-brand-accent shadow-soft-lg drop-shadow-logo-glow group-hover:scale-105 group-hover:shadow-glow-accent transition-all duration-300 border border-white/10 shrink-0">
            <Zap className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
          </div>
          <div className="flex flex-col min-w-0 overflow-visible">
            <span className="text-lg sm:text-2xl font-black tracking-tighter leading-tight text-brand-dark flex items-center gap-2 wrap-break-word">
              {t('nav.brandPromptu')} <span className="text-brand-accent">{t('nav.brandAnatomija')}</span>
              <span className="hidden sm:inline-flex items-center shrink-0 px-1.5 py-0.5 rounded-sm bg-slate-100 text-xs font-black text-slate-600 leading-none">{APP_VERSION}</span>
            </span>
            <span className="text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-slate-600 wrap-break-word">{t('nav.brandTagline')}</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center space-x-10">
          {primaryNavItems.map((item) =>
            item.external ? (
              <a
                key={item.id || item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={navLinkClass}
              >
                {item.name}
              </a>
            ) : item.href ? (
              <a
                key={item.href}
                href={item.href}
                className={navLinkClass}
              >
                {item.name}
              </a>
            ) : (
              <a
                key={item.id}
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
                onClick={() => { setLocale('lt'); navigate('/lt') }}
                className={`px-2.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${locale === 'lt' ? 'bg-brand-dark text-white' : 'text-slate-600 hover:text-brand-dark'} ${FOCUS_RING}`}
                aria-pressed={locale === 'lt'}
                aria-label="Lietuvių"
              >
                LT
              </button>
              <button
                type="button"
                onClick={() => { setLocale('en'); navigate('/en') }}
                className={`px-2.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${locale === 'en' ? 'bg-brand-dark text-white' : 'text-slate-600 hover:text-brand-dark'} ${FOCUS_RING}`}
                aria-pressed={locale === 'en'}
                aria-label="English"
              >
                EN
              </button>
            </div>
            <button
              type="button"
              onClick={onCtaClick}
              className="px-8 py-3 rounded-xl text-sm font-black text-brand-dark bg-cta-gradient shadow-cta-shadow transition-all duration-200 hover:shadow-cta-shadow hover:scale-[1.03] active:scale-[0.98] border border-white/20 min-h-[44px] focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus:outline-hidden"
            >
              {t('nav.cta')}
            </button>
          </div>
        </div>

        <button
          ref={hamburgerRef}
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden p-3 rounded-xl text-brand-dark hover:bg-slate-100 active:scale-[0.98] transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? t('nav.ariaCloseMenu') : t('nav.ariaOpenMenu')}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </nav>

    <div
      id="mobile-nav"
      className={`fixed inset-0 z-99 md:hidden ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!mobileOpen}
    >
      {/* Overlay without backdrop-blur-sm to avoid mobile GPU freeze */}
      <div
        className={`absolute inset-0 bg-black/80 transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={closeMobile}
        aria-hidden
      />
      <div
        ref={drawerRef}
        className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl border-l border-slate-200 flex flex-col pt-24 px-6 transition-transform duration-300 ease-out ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <Link
          to={homePath}
          onClick={() => {
            closeMobile()
            if (['/', '/en', '/lt'].includes(location.pathname)) {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
          className="py-4 text-base font-bold uppercase tracking-[0.15em] text-slate-600 hover:text-brand-dark border-b border-slate-100 min-h-[48px] flex items-center transition-colors duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-sm"
        >
          {t('common.home')}
        </Link>
        <div className="mb-6 flex items-center gap-2 p-1 rounded-lg bg-slate-100 border border-slate-200 w-fit">
          <button
            type="button"
            onClick={() => { closeMobile(); setLocale('lt'); navigate('/lt') }}
            className={`px-4 py-2.5 rounded-md text-sm font-bold uppercase tracking-wider transition-colors duration-200 ${locale === 'lt' ? 'bg-brand-dark text-white' : 'text-slate-600 hover:text-brand-dark'} focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2`}
            aria-pressed={locale === 'lt'}
            aria-label="Lietuvių"
          >
            LT
          </button>
          <button
            type="button"
            onClick={() => { closeMobile(); setLocale('en'); navigate('/en') }}
            className={`px-4 py-2.5 rounded-md text-sm font-bold uppercase tracking-wider transition-colors duration-200 ${locale === 'en' ? 'bg-brand-dark text-white' : 'text-slate-600 hover:text-brand-dark'} focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2`}
            aria-pressed={locale === 'en'}
            aria-label="English"
          >
            EN
          </button>
        </div>
        {allNavItems.map((item) => {
          const mobileClass = "relative py-4 text-base font-bold uppercase tracking-[0.15em] text-slate-600 hover:text-brand-accent border-b border-slate-100 min-h-[48px] flex items-center transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-brand-accent after:transition-all after:duration-200 after:w-0 hover:after:w-full focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-sm"
          return item.external ? (
            <a
              key={item.id || item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (item.href?.includes('promptanatomy.cloud')) captureEcosystemOutboundClick({ target: 'promptanatomy_cloud', placement: 'navbar_mobile', locale, pagePath: location.pathname })
                if (item.href?.includes('promptanatomy.pro')) captureEcosystemOutboundClick({ target: 'promptanatomy_pro', placement: 'navbar_mobile', locale, pagePath: location.pathname })
                closeMobile()
              }}
              className={mobileClass}
            >
              {item.name}
            </a>
          ) : item.href ? (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMobile}
              className={mobileClass}
            >
              {item.name}
            </a>
          ) : (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={closeMobile}
              className={mobileClass}
            >
              {item.name}
            </a>
          )
        })}
        <button
          type="button"
          onClick={() => { closeMobile(); onCtaClick() }}
          className="mt-8 py-4 rounded-xl text-base font-black text-brand-dark bg-cta-gradient shadow-cta-shadow border border-white/20 min-h-[48px] flex items-center justify-center hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
        >
          {t('nav.cta')}
        </button>
      </div>
    </div>
    </>
  )
}
