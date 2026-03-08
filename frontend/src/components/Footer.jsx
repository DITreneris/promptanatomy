import { Link } from 'react-router-dom'
import { Zap } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'

export default function Footer() {
  const { t } = useLocale()
  // Dinamiški metai – tik einami (vienas skaičius, ne intervalas 2024–2026)
  const year = new Date().getFullYear()
  return (
    <footer className="bg-white pt-48 pb-20 px-6 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-24 mb-32">
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
            <h5 className="font-black uppercase text-xs tracking-[0.45em] text-slate-300 mb-12">{t('footer.system')}</h5>
            <ul className="space-y-6 text-sm font-black text-slate-600 uppercase tracking-widest">
              <li>
                <a href="#ekosistema" className="hover:text-brand-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded">{t('footer.ecosystem')}</a>
              </li>
              <li>
                <a href="#metodologija" className="hover:text-brand-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded">{t('footer.methodology')}</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-brand-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded">{t('footer.pricing')}</a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-black uppercase text-xs tracking-[0.45em] text-slate-300 mb-12">{t('footer.network')}</h5>
            <ul className="space-y-6 text-sm font-black text-slate-600 uppercase tracking-widest">
              <li>
                <a href="https://chat.whatsapp.com/GqjIo2lB4vG6Yps8kanyxA" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded">
                  {t('footer.support')}
                </a>
              </li>
              <li>
                <a href="https://ditreneris.github.io/biblioteka/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded">
                  {t('footer.biblioteka')}
                </a>
              </li>
              <li>
                <a href="https://ditreneris.github.io/marketingas/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded">
                  {t('footer.marketingas')}
                </a>
              </li>
              <li>
                <a href="https://ditreneris.github.io/personalas/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded">
                  {t('footer.personalas')}
                </a>
              </li>
              <li>
                <a href="https://ditreneris.github.io/ceo/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded">
                  {t('footer.ceo')}
                </a>
              </li>
              <li><span>{t('footer.linkedIn')} <span className="text-slate-300 font-normal normal-case">{t('footer.comingSoon')}</span></span></li>
              <li><span>{t('footer.discord')} <span className="text-slate-300 font-normal normal-case">{t('footer.comingSoon')}</span></span></li>
              <li><span>{t('footer.systemLog')} <span className="text-slate-300 font-normal normal-case">{t('footer.comingSoon')}</span></span></li>
            </ul>
          </div>
        </div>
        <div className="pt-20 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">
              {t('footer.copyright', { year })}
            </span>
            <span className="text-[10px] font-normal normal-case tracking-wider text-slate-400">
              {t('footer.creator')}
            </span>
            <a href="mailto:tomas@promptanatomy.app" className="text-[10px] font-normal normal-case tracking-wider text-slate-500 hover:text-brand-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded">
              tomas@promptanatomy.app
            </a>
          </div>
          <div className="flex flex-wrap gap-8 md:gap-16 text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">
            <Link to="/privacy" className="hover:text-brand-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded">{t('footer.privacyPolicy')}</Link>
            <Link to="/terms" className="hover:text-brand-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded">{t('footer.termsOfService')}</Link>
            <span>{t('footer.cookies')} <span className="text-slate-300 font-normal normal-case">{t('footer.comingSoon')}</span></span>
          </div>
        </div>
      </div>
    </footer>
  )
}
