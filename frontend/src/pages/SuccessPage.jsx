import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'
import { getSuccessRedirectUrl } from '../api'

export default function SuccessPage() {
  const { t } = useLocale()
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')?.trim() || null
  const [redirectUrl, setRedirectUrl] = useState(null)
  const [loading, setLoading] = useState(!!sessionId)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!sessionId) return
    getSuccessRedirectUrl(sessionId)
      .then((url) => {
        setRedirectUrl(url)
        setError(null)
      })
      .catch((err) => {
        setError(err?.message || t('success.redirectError'))
        setRedirectUrl(null)
      })
      .finally(() => setLoading(false))
  }, [sessionId, t])

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 antialiased overflow-hidden relative">
      <nav aria-label="Breadcrumb" className="relative z-10 mb-8 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
        <ol className="flex items-center gap-2">
          <li><Link to="/" className="hover:text-brand-accent transition-colors duration-200">{t('common.home')}</Link></li>
          <li aria-hidden>/</li>
          <li className="text-brand-dark" aria-current="page">{t('success.breadcrumb')}</li>
        </ol>
      </nav>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="max-w-2xl w-full bg-brand-dark rounded-3xl p-2 shadow-soft-lg border border-white/5 relative z-10">
        <div className="bg-white rounded-3xl p-16 md:p-28 text-center shadow-inner">
          <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_20px_40px_rgba(16,185,129,0.1)] border-4 border-white">
            <ShieldCheck size={48} strokeWidth={1.5} />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark mb-8 tracking-tighter uppercase leading-none">
            {t('success.heading')}
          </h2>
          <p className="text-slate-600 mb-4 text-xl font-medium leading-relaxed italic max-w-sm mx-auto">
            {t('success.body')}
          </p>
          <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
            {t('success.emailDisclaimer')}
          </p>
          <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
            {t('success.nextTime')}
          </p>
          {!sessionId && (
            <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
              {t('success.noSession')}
            </p>
          )}
          {loading && (
            <p className="text-slate-500 text-sm mb-8" aria-live="polite">
              {t('success.redirecting')}
            </p>
          )}
          {error && (
            <p className="text-amber-700 text-sm mb-6 max-w-sm mx-auto" role="alert">
              {error}
            </p>
          )}
          <div className="flex flex-col gap-4">
            {redirectUrl && (
              <a
                href={redirectUrl}
                className="block w-full min-h-[48px] py-6 bg-brand-dark text-white rounded-3xl font-black uppercase tracking-widest text-sm hover:brightness-110 transition-all duration-200 shadow-soft-lg hover:scale-[1.02] active:scale-[0.98] transform text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
              >
                {t('success.goToTraining')}
              </a>
            )}
            <Link
              to="/"
              className="inline-block mt-2 py-3 text-brand-dark font-bold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded"
            >
              {t('common.backToHome')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
