import { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Methodology from '../components/Methodology'
import Ecosystem from '../components/Ecosystem'
import Pricing from '../components/Pricing'
import Footer from '../components/Footer'
import { createCheckoutSession, getAccess } from '../api'
import { useLocale } from '../i18n/LocaleContext'

export default function HomePage() {
  const { t } = useLocale()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [access, setAccess] = useState(null)
  const [customerEmail, setCustomerEmail] = useState('')
  const [accessLoading, setAccessLoading] = useState(false)
  const [accessError, setAccessError] = useState(null)

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCheckAccess = async () => {
    const email = customerEmail.trim()
    if (!email || !email.includes('@')) return
    setAccessError(null)
    setAccessLoading(true)
    try {
      const data = await getAccess(email)
      setAccess(data)
      setAccessLoading(false)
    } catch (e) {
      setAccessError(e.message === 'Access check not configured' ? t('errors.accessNotConfigured') : e.message)
      setAccess(null)
      setAccessLoading(false)
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
      const msg = e.message
      setError(
        msg === 'Already purchased this plan or higher' ? t('errors.alreadyPurchased') :
        msg === 'Invalid response' ? t('errors.invalidResponse') :
        msg === 'No checkout URL' ? t('errors.noCheckoutUrl') :
        msg || t('errors.paymentFailed')
      )
      setLoading(false)
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#0B1320] font-sans selection:bg-[#CFA73A]/30 antialiased overflow-x-hidden">
      <a
        href="#main-content"
        className="absolute left-6 top-4 z-[200] py-3 px-4 bg-[#CFA73A] text-[#0B1320] font-black rounded-xl -translate-y-24 focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#0B1320] focus:ring-offset-2 transition-transform duration-200"
      >
        {t('common.skipToContent')}
      </a>
      <Navbar onCtaClick={scrollToPricing} />
      <main id="main-content" tabIndex={-1}>
        <Hero onCta={scrollToPricing} />
        <Methodology />
        <Ecosystem />
        <section id="pricing" className="py-32 bg-white px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <label htmlFor="access-email" className="block text-sm font-bold text-slate-700 mb-2">
                {t('pricing.checkAccess')}
              </label>
              <div className="flex flex-wrap gap-3 items-center">
                <input
                  id="access-email"
                  type="email"
                  placeholder={t('pricing.emailPlaceholder')}
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCheckAccess()}
                  className="flex-1 min-w-[200px] px-4 py-3 rounded-xl border border-slate-200 text-[#0B1320] focus:outline-none focus:ring-2 focus:ring-[#CFA73A] focus:border-transparent"
                  aria-describedby={accessError ? 'access-error' : undefined}
                />
                <button
                  type="button"
                  onClick={handleCheckAccess}
                  disabled={accessLoading}
                  aria-busy={accessLoading}
                  className="px-6 py-3 rounded-xl font-bold bg-[#0B1320] text-white hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#CFA73A] focus:ring-offset-2 disabled:opacity-70"
                >
                  {accessLoading ? t('pricing.loading') : t('pricing.checkAccess')}
                </button>
              </div>
              {accessError && (
                <p id="access-error" className="mt-2 text-red-600 text-sm" role="alert">
                  {accessError}
                </p>
              )}
              {access && access.highest_plan > 0 && (
                <p className="mt-3 text-slate-700 font-medium">
                  {t('pricing.yourAccess').replace('%s', access.highest_plan)}
                </p>
              )}
            </div>
            <Pricing
              onBuy={handleBuy}
              loading={loading}
              error={error}
              access={access}
              customerEmail={customerEmail.trim() || undefined}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
