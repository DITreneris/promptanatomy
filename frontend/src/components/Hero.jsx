import { ArrowRight, Activity } from 'lucide-react'
import { useLocale } from '../i18n/LocaleContext'

const THEME = {
  colors: {
    brand: {
      accentGradient: 'linear-gradient(135deg, #CFA73A 0%, #E8B93C 100%)',
    },
  },
}

export default function Hero({ onCta }) {
  const { t } = useLocale()
  return (
    <section className="relative pt-48 pb-32 overflow-hidden bg-white">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F8FAFC] -skew-x-12 translate-x-32 -z-10 border-l border-slate-100"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
        <div className="relative z-10 text-left">
          <div className="inline-flex items-center gap-3 bg-[#0B1320] text-white px-4 py-2 rounded-full mb-10 shadow-2xl border border-white/10">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em]">{t('hero.systemStatus')}</span>
            <div className="w-px h-3 bg-white/20"></div>
            <span className="text-[9px] font-bold text-slate-400">{t('hero.commits')}</span>
          </div>

          <h1 className="text-6xl md:text-[94px] font-black text-[#0B1320] mb-8 leading-[0.85] tracking-tighter">
            {t('hero.headline1')}<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: THEME.colors.brand.accentGradient }}>
              {t('hero.headline2')}
            </span>
          </h1>

          <p className="text-xl text-slate-500 mb-14 max-w-xl leading-relaxed font-medium tracking-tight">
            {t('hero.subtext')}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <button
              type="button"
              onClick={onCta}
              className="group w-full sm:w-auto min-h-[44px] px-12 py-6 rounded-2xl text-xl font-black text-[#0B1320] bg-[#CFA73A] transition-all hover:shadow-[0_20px_40px_rgba(207,167,58,0.3)] flex items-center justify-center gap-3 transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFA73A] focus-visible:ring-offset-2"
            >
              {t('hero.cta')} <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center gap-4 text-slate-400 font-bold text-sm">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/100?u=user${i}`} alt="" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-[#0B1320] font-black leading-none mb-1">{t('hero.members')}</span>
                <span className="text-[10px] uppercase tracking-widest opacity-60">{t('hero.community')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group perspective-1000">
          <div className="absolute -inset-10 bg-gradient-to-r from-[#CFA73A] to-indigo-500 rounded-[60px] opacity-10 blur-3xl group-hover:opacity-20 transition-all duration-1000"></div>
          <div className="relative bg-[#0B1320] rounded-[40px] p-10 border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden font-mono backdrop-blur-sm">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[9px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-1.5">
                  <Activity size={10} className="text-emerald-500" /> {t('hero.liveFeed')}
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{t('hero.scriptName')}</div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="group/line cursor-default transition-all hover:translate-x-1">
                <div className="text-[10px] text-slate-600 mb-2 font-black tracking-[0.2em]">// 01: IDENTITY_LAYER</div>
                <div className="text-sm border-l-2 border-[#CFA73A]/50 group-hover/line:border-[#CFA73A] transition-colors pl-5 py-1">
                  <span className="text-[#CFA73A] font-black">ROLE:</span>
                  <span className="text-slate-300 ml-3 italic opacity-80 group-hover/line:opacity-100">"Senior AI Strategist"</span>
                </div>
              </div>
              <div className="group/line cursor-default transition-all hover:translate-x-1">
                <div className="text-[10px] text-slate-600 mb-2 font-black tracking-[0.2em]">// 02: LOGIC_CONSTRAINTS</div>
                <div className="text-sm border-l-2 border-indigo-500/50 group-hover/line:border-indigo-500 transition-colors pl-5 py-1">
                  <span className="text-indigo-400 font-black">CONTEXT:</span>
                  <span className="text-slate-300 ml-3 italic opacity-80 group-hover/line:opacity-100">"Enterprise SaaS Scaling..."</span>
                </div>
              </div>
              <div className="group/line cursor-default transition-all hover:translate-x-1">
                <div className="text-[10px] text-slate-600 mb-2 font-black tracking-[0.2em]">// 03: DATA_OUTPUT_SCHEMA</div>
                <div className="text-sm border-l-2 border-emerald-500/50 group-hover/line:border-emerald-500 transition-colors pl-5 py-1">
                  <span className="text-emerald-400 font-black">SCHEMA:</span>
                  <span className="text-slate-300 ml-3 italic opacity-80 group-hover/line:opacity-100">"JSON-Strict | Nested"</span>
                </div>
              </div>
              <div className="pt-8 flex items-center gap-4 text-[#CFA73A] border-t border-white/5">
                <div className="w-2 h-2 rounded-full bg-[#CFA73A] animate-ping"></div>
                <span className="text-[11px] font-black tracking-[0.2em] uppercase opacity-70">
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
