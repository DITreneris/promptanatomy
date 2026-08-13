import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'
import { localeHomePath } from '../i18n/loadLocale'
import LocaleToggle from '../components/LocaleToggle'

export default function PrivacyPage() {
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
              <li className="text-brand-dark" aria-current="page">{t('legal.privacyPolicy')}</li>
            </ol>
          </nav>
          <LocaleToggle />
        </div>
        <h1 className="page-heading mb-2">
          {t('legal.privacyPolicy')}
        </h1>
        <p className="text-slate-600 text-sm mb-8">{t('legal.privacyIntro')}</p>
        <p className="text-slate-600 text-sm mb-8">{t('legal.privacyEcosystemNote')}</p>
        <div className="space-y-8 mb-10">
          <section>
            <h2 className="page-subheading mb-2">{t('legal.contactTitle')}</h2>
            <p className="text-slate-600 font-medium leading-relaxed">{t('legal.contactBody')}</p>
          </section>
          <section>
            <h2 className="page-subheading mb-2">{t('legal.privacyPrinciplesTitle')}</h2>
            <p className="text-slate-600 font-medium leading-relaxed">{t('legal.privacyPrinciples')}</p>
          </section>
          <section>
            <h2 className="page-subheading mb-2">{t('legal.privacyDataTitle')}</h2>
            <p className="text-slate-600 font-medium leading-relaxed">{t('legal.privacyData')}</p>
          </section>
          <section>
            <h2 className="page-subheading mb-2">{t('legal.privacyAnalyticsTitle')}</h2>
            <p className="text-slate-600 font-medium leading-relaxed">{t('legal.privacyAnalyticsBody')}</p>
          </section>
          <section>
            <h2 className="page-subheading mb-2">{t('legal.privacyAdvertisingTitle')}</h2>
            <p className="text-slate-600 font-medium leading-relaxed">{t('legal.privacyAdvertisingBody')}</p>
          </section>
          <section id="cookies">
            <h2 className="page-subheading mb-2">{t('legal.privacyCookiesTitle')}</h2>
            <p className="text-slate-600 font-medium leading-relaxed">{t('legal.privacyCookiesBody')}</p>
          </section>
          <section>
            <h2 className="page-subheading mb-2">{t('legal.privacyRightsTitle')}</h2>
            <p className="text-slate-600 font-medium leading-relaxed">{t('legal.privacyRights')}</p>
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
