import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'
import { localeHomePath } from '../i18n/loadLocale'
import LocaleToggle from '../components/LocaleToggle'

export default function TermsPage() {
  const { t, locale } = useLocale()
  const homePath = localeHomePath(locale)

  return (
    <div className="min-h-screen bg-slate-50 antialiased">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-8 flex items-start justify-between gap-4">
          <nav aria-label="Breadcrumb" className="text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
            <ol className="flex items-center gap-2">
              <li><Link to={homePath} className="hover:text-brand-accent transition-colors duration-200">{t('common.home')}</Link></li>
              <li aria-hidden>/</li>
              <li className="text-brand-dark" aria-current="page">{t('legal.termsOfService')}</li>
            </ol>
          </nav>
          <LocaleToggle />
        </div>
        <h1 className="page-heading mb-2">
          {t('legal.termsOfService')}
        </h1>
        <p className="text-slate-600 text-sm mb-8">{t('legal.termsIntro')}</p>
        <p className="text-slate-600 text-sm mb-8">{t('legal.termsEcosystemNote')}</p>
        <div className="space-y-8 mb-10">
          <section>
            <h2 className="page-subheading mb-2">{t('legal.contactTitle')}</h2>
            <p className="text-slate-600 font-medium leading-relaxed">{t('legal.contactBody')}</p>
          </section>
          <section>
            <h2 className="page-subheading mb-2">{t('legal.termsScopeTitle')}</h2>
            <p className="text-slate-600 font-medium leading-relaxed">{t('legal.termsScope')}</p>
          </section>
          <section>
            <h2 className="page-subheading mb-2">{t('legal.termsInvoiceTitle')}</h2>
            <p className="text-slate-600 font-medium leading-relaxed">{t('legal.termsInvoice')}</p>
          </section>
          <section>
            <h2 className="page-subheading mb-2">{t('legal.termsVatTitle')}</h2>
            <p className="text-slate-600 font-medium leading-relaxed">{t('legal.termsVat')}</p>
          </section>
          <section>
            <h2 className="page-subheading mb-2">{t('legal.termsSupportTitle')}</h2>
            <p className="text-slate-600 font-medium leading-relaxed">{t('legal.termsSupport')}</p>
          </section>
          <section id="refunds">
            <h2 className="page-subheading mb-2">{t('legal.termsRefundTitle')}</h2>
            <p className="text-slate-600 font-medium leading-relaxed">{t('legal.termsRefund')}</p>
          </section>
        </div>
        <Link
          to={homePath}
          className="inline-flex items-center gap-2 text-brand-dark font-bold underline decoration-brand-accent/60 underline-offset-4 hover:text-brand-accent focus-ring rounded-sm"
        >
          <ArrowLeft className="icon-md" aria-hidden /> {t('common.backToHome')}
        </Link>
      </div>
    </div>
  )
}
