import { Link } from 'react-router-dom'
import { Zap } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'
import { captureEcosystemOutboundClick } from '../analytics/posthog'

export default function Footer() {
  const { t, locale } = useLocale()
  // Dinamiški metai – tik einami (vienas skaičius, ne intervalas 2024–2026)
  const year = new Date().getFullYear()
  const pagePath = typeof window !== 'undefined' ? window.location.pathname : '/'
  return (
    <footer className="bg-slate-50 pt-32 pb-16 px-4 sm:px-6 md:px-8 border-t border-slate-100 shadow-soft-top overflow-hidden">
      <div className="max-w-7xl mx-auto min-w-0">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-brand-dark flex items-center justify-center text-brand-accent border border-white/10 shadow-soft">
                <Zap className="fill-current w-6 h-6" />
              </div>
              <span className="text-3xl font-black tracking-tighter uppercase text-brand-dark">{t('footer.brand')}</span>
            </div>
            <p className="text-slate-600 font-medium max-w-sm text-lg leading-relaxed italic">
              {t('footer.tagline')}
            </p>
          </div>
          <div>
            <h5 className="font-bold uppercase text-xs tracking-[0.45em] text-slate-600 mb-12">{t('footer.system')}</h5>
            <ul className="space-y-6 text-sm font-bold text-slate-600 uppercase tracking-widest">
              <li>
                <a href="#ekosistema" className="hover:text-brand-accent transition-colors duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-sm">{t('footer.ecosystem')}</a>
              </li>
              <li>
                <a href="#metodologija" className="hover:text-brand-accent transition-colors duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-sm">{t('footer.methodology')}</a>
              </li>
              <li>
                <a href="/anatomija/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-sm">{t('footer.training')}</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-brand-accent transition-colors duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-sm">{t('footer.pricing')}</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-brand-accent transition-colors duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-sm">{t('footer.faq')}</a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-black uppercase text-xs tracking-[0.45em] text-slate-600 mb-12">{t('footer.network')}</h5>
            <ul className="space-y-6 text-sm font-bold text-slate-600 uppercase tracking-widest">
              <li>
                <a href="https://t.me/prompt_anatomy" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-sm">
                  {t('footer.support')}
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/staniulis/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-sm">
                  {t('footer.linkedIn')}
                </a>
              </li>
              <li>
                <a href="https://x.com/PromptAnatom" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-sm">
                  {t('footer.twitter')}
                </a>
              </li>
              <li>
                <a href="https://promptanatomy.cloud/" target="_blank" rel="noopener noreferrer external nofollow" onClick={() => captureEcosystemOutboundClick({ target: 'promptanatomy_cloud', placement: 'footer_network', locale, pagePath })} className="hover:text-brand-accent transition-colors duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-sm">
                  {t('footer.cloud')}
                </a>
              </li>
              <li>
                <a href="https://promptanatomy.pro/" target="_blank" rel="noopener noreferrer external nofollow" onClick={() => captureEcosystemOutboundClick({ target: 'promptanatomy_pro', placement: 'footer_network', locale, pagePath })} className="hover:text-brand-accent transition-colors duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-sm">
                  {t('footer.pro')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-20 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-1">
            <span className="block text-xs font-bold uppercase tracking-[0.5em] text-slate-600">
              {t('footer.copyrightLine1', { year })}
            </span>
            <span className="block text-xs font-bold uppercase tracking-[0.5em] text-slate-600">
              {t('footer.copyrightLine2')}
            </span>
            <span className="text-xs font-normal normal-case tracking-wider text-slate-600">
              {t('footer.creator')}
            </span>
            <a href="mailto:info@promptanatomy.app" className="text-xs font-normal normal-case tracking-wider text-slate-600 hover:text-brand-accent transition-colors duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-sm">
              info@promptanatomy.app
            </a>
          </div>
          <div className="flex flex-wrap gap-8 md:gap-16 text-xs font-bold uppercase tracking-[0.35em] text-slate-600">
            <Link to="/privacy" className="hover:text-brand-accent transition-colors duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-sm">{t('footer.privacyPolicy')}</Link>
            <Link to="/terms" className="hover:text-brand-accent transition-colors duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-sm">{t('footer.termsOfService')}</Link>
            <span title={t('footer.comingSoon')}>{t('footer.cookies')} <span className="text-slate-600 font-normal normal-case">{t('footer.comingSoon')}</span></span>
          </div>
        </div>
      </div>
    </footer>
  )
}
