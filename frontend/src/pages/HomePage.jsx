import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import WhatIsPromptAnatomy from '../components/WhatIsPromptAnatomy'
import Methodology from '../components/Methodology'
import Ecosystem from '../components/Ecosystem'
import Pricing from '../components/Pricing'
import Footer from '../components/Footer'
import { createCheckoutSession, getAccess, getTrainingAccessLink } from '../api'
import { useLocale } from '../i18n/LocaleContext'

export default function HomePage({ forceLocale }) {
  const { t, setLocale } = useLocale()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (forceLocale === 'en' || location.pathname === '/en') setLocale('en')
    else if (forceLocale === 'lt' || location.pathname === '/lt') setLocale('lt')
  }, [forceLocale, location.pathname, setLocale])
  const [error, setError] = useState(null)
  const [access, setAccess] = useState(null)
  const [customerEmail, setCustomerEmail] = useState('')
  const [accessLoading, setAccessLoading] = useState(false)
  const [accessError, setAccessError] = useState(null)
  const [trainingLinkLoading, setTrainingLinkLoading] = useState(false)

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCheckAccess = async () => {
    const email = customerEmail.trim()
    if (!email || !email.includes('@')) {
      setAccessError(t('errors.validEmailRequired'))
      return
    }
    setAccessError(null)
    setAccessLoading(true)
    try {
      const data = await getAccess(email)
      setAccess(data)
      setAccessLoading(false)
    } catch (e) {
      const msg = e.message || ''
      const accessErrorMsg =
        msg === 'Access check not configured' ? t('errors.accessNotConfigured') :
        msg === 'Valid email required' ? t('errors.validEmailRequired') :
        /fetch|network/i.test(msg) ? t('errors.networkError') :
        msg
      setAccessError(accessErrorMsg)
      setAccess(null)
      setAccessLoading(false)
    }
  }

  const handleGoToTraining = async () => {
    setTrainingLinkLoading(true)
    try {
      const url = await getTrainingAccessLink(customerEmail)
      // Same-tab navigation: reliable on iOS/Safari (window.open after async is often blocked)
      window.location.href = url
    } catch (e) {
      const msg = e?.message || ''
      const errorMsg =
        msg === 'No access found for this email' ? t('errors.noAccessForEmail') :
        /fetch|network/i.test(msg) ? t('errors.networkError') :
        t('errors.noAccessForEmail')
      setAccessError(errorMsg)
    } finally {
      setTrainingLinkLoading(false)
    }
  }

  const handleBuy = async (planId, email = null) => {
    setError(null)
    setLoading(true)
    try {
      const url = await createCheckoutSession(planId, email || customerEmail || undefined)
      window.location.href = url
      setTimeout(() => setLoading(false), 10_000)
    } catch (e) {
      const msg = e.message || ''
      setError(
        msg === 'Already purchased this plan or higher' ? t('errors.alreadyPurchased') :
        msg === 'Invalid response' ? t('errors.invalidResponse') :
        msg === 'No checkout URL' ? t('errors.noCheckoutUrl') :
        msg === 'Payment provider error' ? t('errors.paymentUnavailable') :
        msg === 'Valid email required' ? t('errors.validEmailRequired') :
        /fetch|network/i.test(msg) ? t('errors.networkError') :
        msg || t('errors.paymentFailed')
      )
      setLoading(false)
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen w-full max-w-[100vw] bg-white text-brand-dark font-sans selection:bg-brand-accent/30 antialiased overflow-x-hidden">
      <a
        href="#main-content"
        className="absolute left-6 top-4 z-[200] py-3 px-4 bg-accent-gradient text-brand-dark font-black rounded-xl -translate-y-24 focus:outline-none focus-visible:translate-y-0 focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 transition-transform duration-200"
      >
        {t('common.skipToContent')}
      </a>
      <Navbar onCtaClick={scrollToPricing} />
      <main id="main-content" tabIndex={-1}>
        <Hero onCta={scrollToPricing} />
        <div className="h-px bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent" aria-hidden />
        <Methodology />
        <Ecosystem />
        <WhatIsPromptAnatomy />
        <section id="pricing" className="py-16 md:py-32 bg-pricing-section px-4 sm:px-6 overflow-hidden">
          <div className="max-w-5xl mx-auto min-w-0">
            <div className="mb-6 md:mb-10 p-[14px] md:p-5 rounded-xl bg-[rgba(15,23,42,0.04)] border border-slate-200/60">
              <label htmlFor="access-email" className="block text-sm font-bold text-slate-700 mb-2">
                {t('pricing.checkAccess')}
              </label>
              <div className="flex flex-wrap gap-3 items-center">
                <input
                  id="access-email"
                  type="email"
                  autoComplete="email"
                  placeholder={t('pricing.emailPlaceholder')}
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCheckAccess()}
                  className="flex-1 min-w-[200px] px-4 py-3 rounded-xl border border-slate-200 text-brand-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:border-transparent transition-shadow duration-200"
                  aria-describedby={accessError ? 'access-error' : undefined}
                />
                <button
                  type="button"
                  onClick={handleCheckAccess}
                  disabled={accessLoading}
                  aria-busy={accessLoading}
                  className="px-6 py-3 rounded-xl font-bold bg-brand-dark text-white hover:brightness-110 active:scale-[0.98] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:opacity-70"
                >
                  {accessLoading ? t('pricing.loading') : t('pricing.checkButton')}
                </button>
              </div>
              {accessError && (
                <p id="access-error" className="mt-2 text-red-600 text-sm" role="alert">
                  {accessError}
                </p>
              )}
              {access && access.highest_plan > 0 && (
                <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-emerald-800">
                      {t('pricing.yourAccess').replace('%s', access.highest_plan)}
                    </span>
                    <span className="text-xs font-bold text-emerald-600">
                      {access.highest_plan}/6
                    </span>
                  </div>
                  <div className="w-full h-2 bg-emerald-100 rounded-full mb-3">
                    <div
                      className="h-2 bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${(access.highest_plan / 6) * 100}%` }}
                    />
                  </div>
                  <button
                    type="button"
                    disabled={trainingLinkLoading}
                    onClick={handleGoToTraining}
                    className="block w-full py-3 rounded-xl text-center font-black text-sm text-brand-dark bg-accent-gradient hover:shadow-glow-accent active:scale-[0.98] transition-all duration-200 disabled:opacity-70"
                  >
                    {trainingLinkLoading ? t('pricing.loading') : `${t('pricing.goToTraining')} →`}
                  </button>
                </div>
              )}
              {access && access.highest_plan === 0 && (
                <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <p className="text-sm font-bold text-amber-800 mb-1">
                    {t('pricing.noAccessFound')}
                  </p>
                  <p className="text-sm text-amber-700 mb-3">
                    {t('pricing.noAccessBody')}
                  </p>
                  <button
                    type="button"
                    onClick={scrollToPricing}
                    className="block w-full py-3 rounded-xl text-center font-black text-sm text-brand-dark bg-accent-gradient hover:shadow-glow-accent active:scale-[0.98] transition-all duration-200"
                  >
                    {t('pricing.getAccess')} →
                  </button>
                </div>
              )}
            </div>
            <Pricing
              onBuy={handleBuy}
              loading={loading}
              error={error}
              access={access}
              customerEmail={customerEmail.trim() || undefined}
              onGoToTraining={handleGoToTraining}
              trainingLinkLoading={trainingLinkLoading}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
