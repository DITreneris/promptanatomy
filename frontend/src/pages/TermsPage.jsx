import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { translateLocale } from '../i18n/LocaleContext'

export default function TermsPage() {
  const t = (key, params) => translateLocale('en', key, params)

  return (
    <div className="min-h-screen bg-slate-50 antialiased">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-brand-accent transition-colors duration-200">{t('common.home')}</Link></li>
            <li aria-hidden>/</li>
            <li className="text-brand-dark" aria-current="page">{t('legal.termsOfService')}</li>
          </ol>
        </nav>
        <h1 className="text-3xl md:text-4xl font-black text-brand-dark tracking-tight mb-2">
          {t('legal.termsOfService')}
        </h1>
        <p className="text-slate-600 text-sm mb-8">{t('legal.termsIntro')}</p>
        <p className="text-slate-600 text-sm mb-8">
          These terms cover Prompt Anatomy ecosystem domains used for education, services, and routing to the main checkout flow.
        </p>
        <div className="space-y-8 mb-10">
          <section>
            <h2 className="text-lg font-bold text-brand-dark uppercase tracking-wide mb-2">{t('legal.termsScopeTitle')}</h2>
            <p className="text-slate-600 font-medium leading-relaxed">{t('legal.termsScope')}</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-brand-dark uppercase tracking-wide mb-2">{t('legal.termsInvoiceTitle')}</h2>
            <p className="text-slate-600 font-medium leading-relaxed">{t('legal.termsInvoice')}</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-brand-dark uppercase tracking-wide mb-2">{t('legal.termsVatTitle')}</h2>
            <p className="text-slate-600 font-medium leading-relaxed">{t('legal.termsVat')}</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-brand-dark uppercase tracking-wide mb-2">{t('legal.termsSupportTitle')}</h2>
            <p className="text-slate-600 font-medium leading-relaxed">{t('legal.termsSupport')}</p>
          </section>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-brand-accent font-bold hover:underline focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-sm"
        >
          <ArrowLeft className="w-5 h-5" /> {t('common.backToHome')}
        </Link>
      </div>
    </div>
  )
}
