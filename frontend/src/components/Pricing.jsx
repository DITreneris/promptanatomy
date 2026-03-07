import { ArrowRight, CheckCircle, Lock, ShieldCheck, Cpu, Globe } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'

const PLANS = [
  { id: '1', mods: '1–3', price: 39, labelKey: 'starter' },
  { id: '2', mods: '1–6', price: 99, labelKey: 'core' },
  { id: '3', mods: '1–12', price: 149, labelKey: 'extended' },
  { id: '4', mods: '1–15', price: 199, labelKey: 'full' },
]

export default function Pricing({ onBuy, loading, error }) {
  const { t } = useLocale()
  const features = t('pricing.features') || []

  return (
    <section id="pricing" className="py-32 bg-white px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-[9px] font-black uppercase tracking-[0.25em] text-slate-500 mb-6 border border-slate-200">
            <Globe size={10} className="text-[#CFA73A]" /> {t('pricing.badge')}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#0B1320] tracking-tighter mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-slate-500 text-lg font-medium max-w-xl mx-auto">
            {t('pricing.subtext')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-[32px] border-2 border-slate-100 p-8 shadow-sm hover:border-[#CFA73A]/40 hover:shadow-md transition-all flex flex-col"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                {t(`pricing.plans.${plan.labelKey}`)}
              </span>
              <p className="text-slate-600 font-bold mb-1">{plan.mods} {t('pricing.mods')}</p>
              <p className="text-4xl font-black text-[#0B1320] mb-6">
                {plan.price}<span className="text-xl font-bold text-slate-500"> €</span>
              </p>
              <button
                type="button"
                onClick={() => onBuy(plan.id)}
                disabled={loading}
                aria-busy={loading}
                className="mt-auto w-full min-h-[48px] py-4 rounded-2xl text-base font-black text-[#0B1320] bg-[#CFA73A] hover:brightness-105 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFA73A] focus-visible:ring-offset-2"
              >
                {loading ? t('pricing.loading') : <>{t('pricing.getAccess')} <ArrowRight size={18} /></>}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 rounded-[40px] p-10 border border-slate-100 mb-10">
          <p className="text-slate-600 font-bold mb-6">{t('pricing.allPlansInclude')}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {(Array.isArray(features) ? features : []).map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                  <CheckCircle size={14} className="text-emerald-600" />
                </div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <p className="mb-4 text-red-600 text-sm font-medium text-center" role="alert" aria-live="polite">
            {error}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-14 opacity-40 grayscale">
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em]">
            <Lock size={14} /> {t('pricing.stripeVerified')}
          </div>
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em]">
            <ShieldCheck size={14} /> {t('pricing.refundContact')}
          </div>
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em]">
            <Cpu size={14} /> {t('pricing.aiPowered')}
          </div>
        </div>
      </div>
    </section>
  )
}
