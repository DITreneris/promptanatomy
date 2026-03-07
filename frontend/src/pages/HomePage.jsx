import { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Methodology from '../components/Methodology'
import Ecosystem from '../components/Ecosystem'
import Pricing from '../components/Pricing'
import Footer from '../components/Footer'
import { createCheckoutSession } from '../api'
import { useLocale } from '../i18n/LocaleContext'

export default function HomePage() {
  const { t } = useLocale()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleBuy = async (planId) => {
    setError(null)
    setLoading(true)
    try {
      const url = await createCheckoutSession(planId)
      window.location.href = url
      setTimeout(() => setLoading(false), 10_000)
    } catch (e) {
      const msg = e.message
      setError(
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
        <Pricing onBuy={handleBuy} loading={loading} error={error} />
      </main>
      <Footer />
    </div>
  )
}
