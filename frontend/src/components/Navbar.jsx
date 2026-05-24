import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Zap, Menu, X } from 'lucide-react'
import { GLOSSARY_URL } from '../config'
import { useLocale } from '../i18n/LocaleContext'
import { captureEcosystemOutboundClick } from '../analytics/posthog'

const FOCUS_RING = 'focus-ring'

export default function Navbar({ onCtaClick, hasAccess = false, onTrainingClick, trainingLinkLoading = false }) {
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
    { name: t('nav.whatIs'), id: 'what-is-prompt-anatomy' },
    { name: t('nav.pricing'), id: 'pricing' },
    ...(hasAccess && onTrainingClick ? [{ name: t('nav.training'), id: null, action: onTrainingClick }] : []),
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
  const desktopSecondaryNavItems = secondaryNavItems.filter(
    (item) => item.id === 'ekosistema' || item.id === 'metodologija' || item.id === 'faq'
  )
  const allNavItems = [...primaryNavItems, ...secondaryNavItems]

  const closeMobile = () => setMobileOpen(false)

  const navLinkClass = `relative text-nav-link text-slate-600 hover:text-brand-accent transition-colors duration-200 min-h-[44px] min-w-[44px] inline-flex items-center after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-brand-accent after:transition-all after:duration-200 after:w-0 hover:after:w-full ${FOCUS_RING}`

  const renderNavItem = (item, className) => {
    if (item.action) {
      return (
        <button
          key={item.name}
          type="button"
          onClick={item.action}
          disabled={trainingLinkLoading}
          aria-busy={trainingLinkLoading}
          className={`${className} bg-transparent disabled:opacity-70`}
        >
          {item.name}
        </button>
      )
    }
    if (item.external) {
      return (
        <a
          key={item.id || item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {item.name}
        </a>
      )
    }
    if (item.href) {
      return (
        <a key={item.href} href={item.href} className={className}>
          {item.name}
        </a>
      )
    }
    return (
      <a key={item.id} href={`#${item.id}`} className={className}>
        {item.name}
      </a>
    )
  }

  return (
    <>
    <nav
      className={`fixed top-0 w-full z-[101] [-webkit-backface-visibility:hidden] backface-hidden transition-all duration-500 ${
        scrolled ? 'py-3 bg-white/70 backdrop-blur-2xl border-b border-slate-200 shadow-xs' : 'py-3 md:py-4 bg-transparent'
      }`}
      aria-label={t('nav.ariaNav')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center gap-2 min-w-0">
        <Link to={homePath} className={`flex shrink-0 items-center gap-2.5 sm:gap-3 group cursor-pointer ${FOCUS_RING} rounded-lg min-w-0`}>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-dark flex items-center justify-center text-brand-accent shadow-soft border border-white/10 shrink-0 transition-colors duration-200 group-hover:bg-brand-dark/95">
            <Zap className="icon-md sm:icon-lg fill-current" aria-hidden />
          </div>
          <span className="min-w-0 text-lg sm:text-xl font-black tracking-tight leading-none text-brand-dark break-words">
            {t('nav.brandPromptu')}{' '}
            <span className="text-brand-accent">{t('nav.brandAnatomija')}</span>
          </span>
        </Link>

        <div className="hidden min-w-0 shrink items-center justify-end gap-3 lg:flex lg:gap-4 xl:gap-6">
          {primaryNavItems.map((item) => renderNavItem(item, navLinkClass))}
          {desktopSecondaryNavItems.map((item) => renderNavItem(item, navLinkClass))}
          <div className="flex items-center gap-3 xl:gap-4 shrink-0">
            <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() => { setLocale('lt'); navigate('/lt') }}
                className={`px-2 py-1 rounded-md text-label-upper tracking-wide transition-colors duration-200 ${locale === 'lt' ? 'bg-brand-dark text-white' : 'text-slate-600 hover:text-brand-dark'} ${FOCUS_RING}`}
                aria-pressed={locale === 'lt'}
                aria-label="Lietuvių"
              >
                LT
              </button>
              <button
                type="button"
                onClick={() => { setLocale('en'); navigate('/en') }}
                className={`px-2 py-1 rounded-md text-label-upper tracking-wide transition-colors duration-200 ${locale === 'en' ? 'bg-brand-dark text-white' : 'text-slate-600 hover:text-brand-dark'} ${FOCUS_RING}`}
                aria-pressed={locale === 'en'}
                aria-label="English"
              >
                EN
              </button>
            </div>
            <button
              type="button"
              onClick={onCtaClick}
              className="btn-primary-nav"
            >
              {t('nav.cta')}
            </button>
          </div>
        </div>

        <button
          ref={hamburgerRef}
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="flex items-center justify-center p-3 lg:hidden min-h-[44px] min-w-[44px] rounded-xl text-brand-dark transition-all duration-200 hover:bg-slate-100 active:scale-[0.98] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? t('nav.ariaCloseMenu') : t('nav.ariaOpenMenu')}
        >
          {mobileOpen ? <X className="icon-lg" aria-hidden /> : <Menu className="icon-lg" aria-hidden />}
        </button>
      </div>
    </nav>

    <div
      id="mobile-nav"
      className={`fixed inset-0 z-[100] lg:hidden ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
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
          className="py-4 text-base font-bold tracking-[0.08em] text-slate-600 hover:text-brand-dark border-b border-slate-100 min-h-[48px] flex items-center transition-colors duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-sm"
        >
          {t('common.home')}
        </Link>
        <div className="mb-6 flex items-center gap-0.5 p-0.5 rounded-lg bg-slate-100 border border-slate-200 w-fit">
          <button
            type="button"
            onClick={() => { closeMobile(); setLocale('lt'); navigate('/lt') }}
            className={`px-3 py-2 rounded-md text-label-upper tracking-wide transition-colors duration-200 ${locale === 'lt' ? 'bg-brand-dark text-white' : 'text-slate-600 hover:text-brand-dark'} focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2`}
            aria-pressed={locale === 'lt'}
            aria-label="Lietuvių"
          >
            LT
          </button>
          <button
            type="button"
            onClick={() => { closeMobile(); setLocale('en'); navigate('/en') }}
            className={`px-3 py-2 rounded-md text-label-upper tracking-wide transition-colors duration-200 ${locale === 'en' ? 'bg-brand-dark text-white' : 'text-slate-600 hover:text-brand-dark'} focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2`}
            aria-pressed={locale === 'en'}
            aria-label="English"
          >
            EN
          </button>
        </div>
        {allNavItems.map((item) => {
          const mobileClass = "relative py-4 text-base font-bold tracking-[0.08em] text-slate-600 hover:text-brand-accent border-b border-slate-100 min-h-[48px] flex items-center transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-brand-accent after:transition-all after:duration-200 after:w-0 hover:after:w-full focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-sm"
          return item.action ? (
            <button
              key={item.name}
              type="button"
              disabled={trainingLinkLoading}
              aria-busy={trainingLinkLoading}
              onClick={() => {
                closeMobile()
                item.action()
              }}
              className={`${mobileClass} w-full bg-transparent text-left disabled:opacity-70`}
            >
              {item.name}
            </button>
          ) : item.external ? (
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
          className="mt-8 btn-primary-md min-h-[48px] py-4 text-base flex items-center justify-center hover:scale-[1.03]"
        >
          {t('nav.cta')}
        </button>
      </div>
    </div>
    </>
  )
}
