import { ArrowRight, Activity } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'

const ACCENT_GRADIENT = 'linear-gradient(135deg, #CFA73A 0%, #E8B93C 100%)'

export default function Hero({ onCta }) {
  const { t } = useLocale()
  return (
    <section className="relative pt-28 md:pt-48 pb-20 md:pb-32 overflow-hidden bg-white">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -skew-x-12 translate-x-32 -z-10 border-l border-slate-100"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center min-w-0">
        <div className="relative z-10 text-left min-w-0">
          <div className="inline-flex items-center gap-3 bg-brand-dark text-white px-4 py-2 rounded-full mb-10 shadow-soft border border-white/10">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-black uppercase tracking-[0.25em]">{t('hero.systemStatus')}</span>
            <div className="w-px h-3 bg-white/20"></div>
            <span className="text-xs font-bold text-slate-400">{t('hero.commits')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-brand-dark mb-4 md:mb-6 leading-[0.85] tracking-tighter break-words">
            {t('hero.headline1')}<br />
            <span className="text-transparent bg-clip-text break-words" style={{ backgroundImage: ACCENT_GRADIENT }}>
              {t('hero.headline2')}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 font-bold mb-4 max-w-xl break-words" aria-describedby="hero-bullets">
            {t('hero.subtitle')}
          </p>
          <ul id="hero-bullets" className="list-none space-y-2 mb-8 md:mb-10 max-w-xl text-base md:text-lg text-slate-600 font-medium">
            <li className="flex items-center gap-2">
              <span className="text-brand-accent font-bold" aria-hidden="true">•</span>
              {t('hero.bullet1')}
            </li>
            <li className="flex items-center gap-2">
              <span className="text-brand-accent font-bold" aria-hidden="true">•</span>
              {t('hero.bullet2')}
            </li>
            <li className="flex items-center gap-2">
              <span className="text-brand-accent font-bold" aria-hidden="true">•</span>
              {t('hero.bullet3')}
            </li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <button
              type="button"
              onClick={onCta}
              className="group w-full sm:w-auto min-h-[44px] px-12 py-6 rounded-2xl text-xl font-black text-brand-dark transition-all duration-200 hover:shadow-glow-accent flex items-center justify-center gap-3 transform hover:-translate-y-0.5 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
              style={{ background: ACCENT_GRADIENT }}
            >
              {t('hero.cta')} <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center gap-4 text-slate-400 font-bold text-sm">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/100?u=user${i}`} alt={t('hero.avatarAlt')} />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-brand-dark font-black leading-none mb-1">{t('hero.members')}</span>
                <span className="text-xs uppercase tracking-widest opacity-60">{t('hero.community')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group perspective-1000 min-w-0">
          <div className="absolute -inset-10 bg-gradient-to-r from-brand-accent to-indigo-500 rounded-[60px] opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" aria-hidden />
          <div className="relative bg-brand-dark rounded-3xl p-6 sm:p-10 border border-white/10 shadow-soft-lg overflow-x-auto font-mono min-w-0">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-slate-500 font-black uppercase tracking-widest flex items-center gap-1.5">
                  <Activity size={10} className="text-emerald-500" /> {t('hero.liveFeed')}
                </div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t('hero.scriptName')}</div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="group/line cursor-default transition-all hover:translate-x-1">
                <div className="text-xs text-slate-600 mb-2 font-black tracking-[0.2em]">{t('hero.codeLine1')}</div>
                <div className="text-sm border-l-2 border-brand-accent/50 group-hover/line:border-brand-accent transition-colors duration-200 pl-5 py-1 break-words min-w-0">
                  <span className="text-brand-accent font-black">{t('hero.codeRole')}</span>
                  <span className="text-slate-300 ml-3 italic opacity-80 group-hover/line:opacity-100 break-all">&quot;{t('hero.codeRoleValue')}&quot;</span>
                </div>
              </div>
              <div className="group/line cursor-default transition-all hover:translate-x-1">
                <div className="text-xs text-slate-600 mb-2 font-black tracking-[0.2em]">{t('hero.codeLine2')}</div>
                <div className="text-sm border-l-2 border-indigo-500/50 group-hover/line:border-indigo-500 transition-colors pl-5 py-1 break-words min-w-0">
                  <span className="text-indigo-400 font-black">{t('hero.codeContext')}</span>
                  <span className="text-slate-300 ml-3 italic opacity-80 group-hover/line:opacity-100 break-all">&quot;{t('hero.codeContextValue')}&quot;</span>
                </div>
              </div>
              <div className="group/line cursor-default transition-all hover:translate-x-1">
                <div className="text-xs text-slate-600 mb-2 font-black tracking-[0.2em]">{t('hero.codeLine3')}</div>
                <div className="text-sm border-l-2 border-emerald-500/50 group-hover/line:border-emerald-500 transition-colors pl-5 py-1 break-words min-w-0">
                  <span className="text-emerald-400 font-black">{t('hero.codeSchema')}</span>
                  <span className="text-slate-300 ml-3 italic opacity-80 group-hover/line:opacity-100 break-all">&quot;{t('hero.codeSchemaValue')}&quot;</span>
                </div>
              </div>
              <div className="pt-8 flex items-center gap-4 text-brand-accent border-t border-white/5">
                <div className="w-2 h-2 rounded-full bg-brand-accent animate-ping"></div>
                <span className="text-xs font-black tracking-[0.2em] uppercase opacity-70">
                  {t('hero.systemInit')}<span className="animate-pulse">...</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
