import { Link } from 'react-router-dom'
import { Zap } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'
import { captureEcosystemOutboundClick } from '../analytics/posthog'
import { ORG_EMAIL, formatMailingAddressOneLine } from '../site/organization'

const footerLinkClass =
  'text-sm font-medium text-slate-600 hover:text-brand-accent transition-colors duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-sm'

function FooterColumn({ title, children }) {
  return (
    <div>
      <p className="text-label-upper text-slate-500 mb-3">{title}</p>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  )
}

function FooterLegalBar({ t, year }) {
  const legalLinks = [
    { to: '/privacy', label: t('footer.privacyPolicy') },
    { to: '/terms', label: t('footer.termsOfService') },
    { to: '/privacy#cookies', label: t('footer.cookiesLink') },
  ]

  return (
    <div className="pt-6 md:pt-8 border-t border-brand-accent/20 space-y-2">
      <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center text-xs text-slate-600">
        <span className="font-medium text-slate-600 shrink-0">{t('footer.copyrightLine1', { year })}</span>
        <span className="hidden md:inline text-slate-400" aria-hidden>
          ·
        </span>
        <a
          href={`mailto:${ORG_EMAIL}`}
          className={`${footerLinkClass} shrink-0`}
        >
          {ORG_EMAIL}
        </a>
        <span className="hidden md:inline text-slate-400" aria-hidden>
          ·
        </span>
        <nav aria-label={t('footer.legalNavAria')} className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {legalLinks.map((item, i) => (
            <span key={item.to} className="inline-flex items-center gap-3">
              {i > 0 && (
                <span className="text-slate-400 hidden sm:inline" aria-hidden>
                  ·
                </span>
              )}
              <Link to={item.to} className={footerLinkClass}>
                {item.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
      <p className="text-[11px] text-slate-500">{t('footer.creator')}</p>
      <p className="text-[11px] text-slate-500">
        {t('footer.mailingAddressInline')} {formatMailingAddressOneLine()}
      </p>
    </div>
  )
}

export default function Footer({ hasAccess = false, onTrainingClick, trainingLinkLoading = false }) {
  const { t, locale } = useLocale()
  const year = new Date().getFullYear()
  const pagePath = typeof window !== 'undefined' ? window.location.pathname : '/'

  return (
    <footer className="bg-slate-50 pt-14 md:pt-16 pb-8 md:pb-10 px-4 sm:px-6 md:px-8 border-t border-slate-100 shadow-soft-top overflow-hidden">
      <div className="max-w-7xl mx-auto min-w-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 lg:gap-x-12 gap-y-10 items-start mb-8 md:mb-10">
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-dark flex items-center justify-center text-brand-accent border border-white/10 shadow-soft shrink-0">
                <Zap className="fill-current icon-md sm:icon-lg" aria-hidden />
              </div>
              <span className="text-lg sm:text-xl font-black tracking-tight leading-none text-brand-dark">
                {t('nav.brandPromptu')}{' '}
                <span className="text-brand-accent">{t('nav.brandAnatomija')}</span>
              </span>
            </div>
            <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed max-w-[340px]">
              {t('footer.tagline')}
            </p>
          </div>

          <div className="lg:col-span-2">
            <FooterColumn title={t('footer.columnProduct')}>
              <li>
                <a href="#what-is-prompt-anatomy" className={footerLinkClass}>
                  {t('nav.whatIs')}
                </a>
              </li>
              <li>
                <a href="#metodologija" className={footerLinkClass}>
                  {t('footer.methodology')}
                </a>
              </li>
              <li>
                <a href="#ekosistema" className={footerLinkClass}>
                  {t('footer.ecosystem')}
                </a>
              </li>
              <li>
                <a href="#pricing" className={footerLinkClass}>
                  {t('footer.pricing')}
                </a>
              </li>
            </FooterColumn>
          </div>

          <div className="lg:col-span-2">
            <FooterColumn title={t('footer.columnTraining')}>
              <li>
                {hasAccess && onTrainingClick ? (
                  <button
                    type="button"
                    onClick={onTrainingClick}
                    disabled={trainingLinkLoading}
                    aria-busy={trainingLinkLoading}
                    className={`${footerLinkClass} bg-transparent text-left disabled:opacity-70`}
                  >
                    {t('footer.training')}
                  </button>
                ) : (
                  <a href="#pricing" className={footerLinkClass}>
                    {t('footer.training')}
                  </a>
                )}
              </li>
              <li>
                <a href="#faq" className={footerLinkClass}>
                  {t('footer.faq')}
                </a>
              </li>
              <li>
                <a href="#pricing" className={footerLinkClass}>
                  {t('nav.cta')}
                </a>
              </li>
            </FooterColumn>
          </div>

          <div className="sm:col-span-2 lg:col-span-4">
            <FooterColumn title={t('footer.columnNetwork')}>
              <li>
                <a
                  href="https://t.me/prompt_anatomy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLinkClass}
                >
                  {t('footer.support')}
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/staniulis/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLinkClass}
                >
                  {t('footer.linkedIn')}
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/PromptAnatom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLinkClass}
                >
                  {t('footer.twitter')}
                </a>
              </li>
              <li>
                <a
                  href="https://promptanatomy.cloud/"
                  target="_blank"
                  rel="noopener noreferrer external nofollow"
                  onClick={() =>
                    captureEcosystemOutboundClick({
                      target: 'promptanatomy_cloud',
                      placement: 'footer_network',
                      locale,
                      pagePath,
                    })
                  }
                  className={footerLinkClass}
                >
                  {t('footer.cloud')}
                </a>
              </li>
              <li>
                <a
                  href="https://promptanatomy.pro/"
                  target="_blank"
                  rel="noopener noreferrer external nofollow"
                  onClick={() =>
                    captureEcosystemOutboundClick({
                      target: 'promptanatomy_pro',
                      placement: 'footer_network',
                      locale,
                      pagePath,
                    })
                  }
                  className={footerLinkClass}
                >
                  {t('footer.pro')}
                </a>
              </li>
            </FooterColumn>
          </div>
        </div>

        <FooterLegalBar t={t} year={year} />
      </div>
    </footer>
  )
}
