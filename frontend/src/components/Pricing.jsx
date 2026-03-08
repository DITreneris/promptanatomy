import { ArrowRight, CheckCircle, Lock, ShieldCheck, Cpu, Globe } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'

const PLANS = [
  { id: '1', mods: '1–3', price: 39, labelKey: 'starter', planValue: 3 },
  { id: '2', mods: '1–6', price: 99, labelKey: 'core', planValue: 6 },
  { id: '3', mods: '1–12', price: 149, labelKey: 'extended', planValue: 12 },
  { id: '4', mods: '1–15', price: 199, labelKey: 'full', planValue: 15 },
]

export default function Pricing({ onBuy, loading, error, access, customerEmail }) {
  const { t } = useLocale()
  const features = t('pricing.features') || []
  const highest_plan = access?.highest_plan ?? 0
  const can_upgrade_to = access?.can_upgrade_to ?? []

  const plansToShow = access
    ? PLANS.filter((p) => p.planValue > highest_plan && can_upgrade_to.includes(p.planValue))
    : PLANS

  const getButtonState = (plan) => {
    if (!access) return { action: 'buy', label: t('pricing.getAccess') }
    if (plan.planValue <= highest_plan) return { action: 'owned', label: t('pricing.alreadyHave') }
    if (can_upgrade_to.includes(plan.planValue)) return { action: 'upgrade', label: t('pricing.upgradeTo').replace('%s', plan.mods) }
    return null
  }

  return (
    <>
      <div className="text-center mb-8 md:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-[9px] font-black uppercase tracking-[0.25em] text-slate-500 mb-4 md:mb-6 border border-slate-200">
          <Globe size={10} className="text-brand-accent" /> {t('pricing.badge')}
        </div>
        <h2 className="text-2xl md:text-5xl font-black text-brand-dark tracking-tighter mb-3 md:mb-4">
          {t('pricing.title')}
        </h2>
        <p className="text-slate-500 text-base md:text-lg font-medium max-w-xl mx-auto">
          {t('pricing.subtext')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 md:mb-16">
        {plansToShow.map((plan) => {
          const state = getButtonState(plan)
          const isOwned = state?.action === 'owned'
          const isUpgradeOrBuy = state?.action === 'upgrade' || state?.action === 'buy'
          return (
            <div
              key={plan.id}
              className="bg-white rounded-[32px] border-2 border-slate-100 p-8 shadow-soft hover:border-brand-accent/30 hover:shadow-soft-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                {t(`pricing.plans.${plan.labelKey}`)}
              </span>
              <p className="text-slate-600 font-bold mb-3">{plan.mods} {t('pricing.mods')}</p>
              {(() => {
                const bullets = t(`pricing.planBullets.${plan.labelKey}`)
                const list = Array.isArray(bullets) ? bullets : []
                return list.length > 0 ? (
                  <ul className="space-y-2 mb-4 text-sm text-slate-700 font-medium">
                    {list.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-emerald-500 shrink-0" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null
              })()}
              <p className="text-4xl font-black text-brand-dark mb-6">
                {plan.price}<span className="text-xl font-bold text-slate-500"> €</span>
              </p>
              {isOwned ? (
                <div className="mt-auto py-4 text-center text-slate-500 font-bold rounded-2xl border border-slate-200 bg-slate-50">
                  {state.label}
                </div>
              ) : isUpgradeOrBuy ? (
                <button
                  type="button"
                  onClick={() => onBuy(plan.id, customerEmail)}
                  disabled={loading}
                  aria-busy={loading}
                  className="mt-auto w-full min-h-[48px] py-4 rounded-2xl text-base font-black text-brand-dark bg-brand-accent hover:shadow-glow-accent active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
                >
                  {loading ? t('pricing.loading') : <>{state.label} <ArrowRight size={18} /></>}
                </button>
              ) : null}
            </div>
          )
        })}
      </div>

      {plansToShow.length === 0 && access && highest_plan >= 15 && (
        <p className="text-center text-slate-600 font-medium mb-16">
          {t('pricing.alreadyHave')} – {t('pricing.yourAccess').replace('%s', '15')}
        </p>
      )}

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

      <div className="flex flex-wrap justify-center gap-14 text-slate-400">
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
    </>
  )
}
