import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'

export default function SuccessPage() {
  const { t } = useLocale()

  useEffect(() => {
    document.title = t('success.metaTitle')
    const desc = document.querySelector('meta[name="description"]')
    if (desc) desc.setAttribute('content', t('success.metaDescription'))
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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 antialiased">
      <nav aria-label="Breadcrumb" className="relative z-10 mb-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
        <ol className="flex items-center gap-2">
          <li><Link to="/" className="hover:text-brand-accent transition-colors duration-200">{t('common.home')}</Link></li>
          <li aria-hidden>/</li>
          <li className="text-brand-dark" aria-current="page">{t('success.breadcrumb')}</li>
        </ol>
      </nav>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="max-w-2xl w-full bg-brand-dark rounded-[64px] p-2 shadow-soft-lg border border-white/5 relative z-10">
        <div className="bg-white rounded-[54px] p-16 md:p-28 text-center shadow-inner">
          <div className="w-32 h-32 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-12 shadow-[0_20px_40px_rgba(16,185,129,0.1)] border-4 border-white">
            <ShieldCheck size={64} strokeWidth={1.5} />
          </div>
          <h2 className="text-5xl font-black text-[#0B1320] mb-8 tracking-tighter uppercase leading-none">
            {t('success.heading')}
          </h2>
          <p className="text-slate-500 mb-14 text-xl font-medium leading-relaxed italic max-w-sm mx-auto">
            {t('success.body')}
          </p>
          <Link
            to="/"
            className="block w-full min-h-[48px] py-6 bg-brand-dark text-white rounded-[24px] font-black uppercase tracking-widest text-sm hover:brightness-110 transition-all duration-200 shadow-soft-lg hover:scale-[1.02] active:scale-[0.98] transform text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          >
            {t('common.backToHome')}
          </Link>
        </div>
      </div>
    </div>
  )
}
