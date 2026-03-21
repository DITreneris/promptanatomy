import { ArrowRight, CheckCircle, Lock, ShieldCheck, Cpu, Globe } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'

/** Phase 1: only 2 products (1–3 and 1–6 modules); modules 7+ locked. */
const PHASE1_MAX_MODULES = 6
const PLANS_ALL = [
  { id: '1', mods: '1–3', price: 39, labelKey: 'starter', planValue: 3 },
  { id: '2', mods: '1–6', price: 99, labelKey: 'core', planValue: 6 },
  { id: '3', mods: '1–12', price: 149, labelKey: 'extended', planValue: 12 },
  { id: '4', mods: '1–15', price: 199, labelKey: 'full', planValue: 15 },
]
const PLANS = PLANS_ALL.filter((p) => p.planValue <= PHASE1_MAX_MODULES)

export default function Pricing({ onBuy, loading, error, access, customerEmail, onGoToTraining, trainingLinkLoading }) {
  const { t } = useLocale()
  const features = t('pricing.features') || []
  const trustSignals = t('pricing.trustSignals') || []
  const highest_plan = access?.highest_plan ?? 0
  const can_upgrade_to = access?.can_upgrade_to ?? []

  const plansToShow = access
    ? PLANS.filter((p) => p.planValue > highest_plan && can_upgrade_to.includes(p.planValue))
    : PLANS

  const showModulesLockedNote = true

  const getButtonState = (plan) => {
    if (!access) return { action: 'buy', label: t('pricing.getAccess') }
    if (plan.planValue <= highest_plan) return { action: 'owned', label: t('pricing.alreadyHave') }
    if (can_upgrade_to.includes(plan.planValue)) return { action: 'upgrade', label: t('pricing.upgradeTo').replace('%s', plan.mods) }
    return null
  }

  return (
    <>
      <div className="text-center mb-8 md:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.25em] text-amber-800 mb-4 md:mb-6 bg-[rgba(255,193,7,0.15)] border border-[rgba(255,193,7,0.35)]">
          <Globe size={10} className="text-amber-600" /> {t('pricing.badge')}
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-brand-dark tracking-tighter mb-3 md:mb-4">
          {t('pricing.title')}
        </h2>
        <p className="text-slate-600 text-base md:text-lg font-medium max-w-xl mx-auto">
          {t('pricing.subtext')}
        </p>
        <p className="text-slate-500 text-sm font-medium mt-2">
          {t('pricing.cumulativeNote')}
        </p>
        {Array.isArray(trustSignals) && trustSignals.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6 text-slate-600 font-medium">
            {trustSignals.map((item, i) => (
              <span key={i} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm">
                <CheckCircle size={16} className="text-emerald-500 shrink-0" aria-hidden />
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10 md:mb-16">
        {plansToShow.map((plan) => {
          const state = getButtonState(plan)
          const isOwned = state?.action === 'owned'
          const isUpgradeOrBuy = state?.action === 'upgrade' || state?.action === 'buy'
          const isCore = plan.labelKey === 'core'
          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl border-2 p-8 shadow-pricing-card hover:shadow-soft-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col ${isCore ? 'bg-linear-to-b from-[rgba(255,193,7,0.08)] to-[rgba(255,193,7,0.02)] border-[rgba(255,193,7,0.5)]' : 'bg-white border-slate-100 hover:border-brand-accent/30'}`}
            >
              {isCore && (
                <span className="absolute top-6 right-6 px-3 py-1 rounded-full bg-[rgba(255,193,7,0.15)] border border-[rgba(255,193,7,0.35)] text-amber-800 text-xs font-bold uppercase tracking-widest">
                  {t('pricing.recommended')}
                </span>
              )}
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
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
              <p className="text-[44px] font-extrabold leading-none text-brand-dark mb-6">
                {plan.price}<span className="text-xl font-bold text-slate-500"> €</span>
              </p>
              {isOwned ? (
                <button
                  type="button"
                  disabled={trainingLinkLoading}
                  aria-busy={trainingLinkLoading}
                  aria-live={trainingLinkLoading ? 'polite' : undefined}
                  onClick={() => onGoToTraining?.()}
                  className="mt-auto block w-full py-4 text-center font-bold rounded-2xl border-2 border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-200 disabled:opacity-70"
                >
                  {trainingLinkLoading ? t('pricing.loading') : `${t('pricing.goToTraining')} →`}
                </button>
              ) : isUpgradeOrBuy ? (
                <button
                  type="button"
                  onClick={() => onBuy(plan.id, customerEmail)}
                  disabled={loading}
                  aria-busy={loading}
                  aria-live={loading ? 'polite' : undefined}
                  className="mt-auto w-full min-h-[48px] py-4 rounded-2xl text-base font-black text-brand-dark bg-cta-gradient shadow-pricing-cta hover:scale-[1.05] hover:shadow-pricing-cta active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
                >
                  {loading ? t('pricing.loading') : <>{state.label} <ArrowRight size={18} /></>}
                </button>
              ) : null}
            </div>
          )
        })}
      </div>

      {plansToShow.length === 0 && access && highest_plan >= PHASE1_MAX_MODULES && (
        <p className="text-center text-slate-600 font-medium mb-16">
          {t('pricing.alreadyHave')} – {t('pricing.yourAccess').replace('%s', String(PHASE1_MAX_MODULES))}
        </p>
      )}

      {showModulesLockedNote && (
        <p className="text-center text-slate-400 text-sm font-medium mb-6 flex items-center justify-center gap-2">
          <Lock size={14} aria-hidden />
          {t('pricing.modulesLocked')}
        </p>
      )}

      <div className="mb-10 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 md:p-8 text-center">
        <h3 className="text-lg md:text-xl font-bold text-brand-dark tracking-tight mb-2">
          {t('pricing.forTeamsTitle')}
        </h3>
        <p className="text-slate-600 text-sm md:text-base font-medium mb-4 max-w-xl mx-auto">
          {t('pricing.forTeamsBody')}
        </p>
        <a
          href={`mailto:info@promptanatomy.app?subject=${encodeURIComponent(t('pricing.forTeamsMailSubject'))}`}
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl text-base font-bold text-brand-dark bg-white border-2 border-slate-200 hover:border-brand-accent/40 hover:bg-slate-50 transition-all duration-200 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          aria-label={t('pricing.forTeamsCta')}
        >
          {t('pricing.forTeamsCta')} <ArrowRight size={18} aria-hidden />
        </a>
      </div>

      <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100 mb-10">
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
        <p className="mb-6 text-red-600 text-sm font-medium text-center" role="alert" aria-live="polite">
          {error}
        </p>
      )}

      <div className="flex flex-wrap justify-center gap-14 text-slate-400">
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em]">
          <Lock size={14} /> {t('pricing.stripeVerified')}
        </div>
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em]">
          <ShieldCheck size={14} /> {t('pricing.refundContact')}
        </div>
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em]">
          <Cpu size={14} /> {t('pricing.aiPowered')}
        </div>
      </div>
    </>
  )
}
