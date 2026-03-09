import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'

export default function CancelPage() {
  const { t } = useLocale()

  useEffect(() => {
    document.title = t('cancel.metaTitle')
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', t('cancel.metaDescription'))
    const robots = document.querySelector('meta[name="robots"]')
    if (robots) robots.setAttribute('content', 'noindex, nofollow')
    return () => {
      document.title = t('meta.title')
      const d = document.querySelector('meta[name="description"]')
      if (d) d.setAttribute('content', t('meta.description'))
      const r = document.querySelector('meta[name="robots"]')
      if (r) r.setAttribute('content', 'index, follow')
    }
  }, [t])

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 antialiased overflow-hidden relative">
      <nav aria-label="Breadcrumb" className="relative z-10 mb-8 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
        <ol className="flex items-center gap-2">
          <li><Link to="/" className="hover:text-brand-accent transition-colors duration-200">{t('common.home')}</Link></li>
          <li aria-hidden>/</li>
          <li className="text-brand-dark" aria-current="page">{t('cancel.breadcrumb')}</li>
        </ol>
      </nav>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="max-w-xl w-full bg-white rounded-3xl p-12 md:p-16 text-center shadow-xl border border-slate-100 relative z-10">
        <h2 className="text-3xl font-black text-brand-dark mb-6 tracking-tight">
          {t('cancel.heading')}
        </h2>
        <p className="text-slate-600 mb-10 text-lg font-medium leading-relaxed">
          {t('cancel.body')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/#pricing"
            className="min-h-[44px] inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-lg font-black text-brand-dark bg-accent-gradient hover:shadow-glow-accent active:scale-[0.98] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          >
            {t('cancel.tryAgain')} <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
          <Link
            to="/"
            className="min-h-[44px] inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-lg font-black text-slate-600 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          >
            <ArrowLeft className="w-5 h-5" /> {t('common.backToHome')}
          </Link>
        </div>
      </div>
    </div>
  )
}
