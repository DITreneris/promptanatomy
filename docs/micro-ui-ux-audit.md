# Micro UI, Micro UX, Micro Copy – auditas

Detali peržiūra: šriftai, dydžiai, spalvos, tarpai, mikro kopija. Ką galima patobulinti atskirai.

---

## 1. Šriftai (typography)

| Problema | Kur | Rekomendacija |
|----------|-----|----------------|
| **Nėra aiškaus font stack** | `index.css`, `tailwind.config.js` | Nurodyti `font-family` (pvz. `Inter`, `Plus Jakarta Sans` arba `font-sans` su `ui-sans-serif, system-ui…`). Dabar lieka Tailwind default. |
| **Per daug labai mažų dydžių** | Hero badge `text-[10px]`, `text-[9px]`, Navbar version `text-[8px]`, Footer `text-[10px]` | Unifikuoti mažą tekstą: vienas „small label“ dydis (pvz. `text-xs` = 12px), nebent tikrai reikia 10px – tada vienas tokenas (pvz. `text-[10px]`). `text-[8px]` išvengti (skaitomumas). |
| **Hero H1 šuolis** | `Hero.jsx`: `text-4xl` → `md:text-[94px]` | Per didelis šuolis tarp breakpointų. Naudoti scale: pvz. `text-4xl sm:text-5xl md:text-6xl lg:text-7xl` arba `md:text-[72px]` vietoj 94px. |
| **Viskas labai „heavy“** | Daug `font-black` (900) | Vietomis naudoti `font-bold` (700): subheadings, antriniai blokai, footer linkai – skirtingi svoriai padarys hierarchiją aiškesnę. |
| **Section label stilius** | Methodology: `text-xs font-black uppercase tracking-[0.4em] italic` | Italic + uppercase + labai platūs raidės – retas derinys. Ar tikrai reikia italic? Jei taip – palikti; jei ne – nuimti italic dėl skaitomumo. |
| **Line-height** | Skirtingi `leading-tight`, `leading-none`, `leading-relaxed` | Apibrėžti tipografijos taisykles: headings `leading-tight` arba `leading-none`, body `leading-relaxed`. Dabar naudojama ad-hoc. |

**Prioritetas:** Font stack + vienas mažas dydis (xs/10px) + H1 scale.

---

## 2. Dydžiai (sizes)

| Problema | Kur | Rekomendacija |
|----------|-----|----------------|
| **Heading scale nenuoseklus** | Skirtingi komponentai naudoja `text-2xl`–`text-7xl` + custom `94px` | Nuspręsti scale: H1 (1 dydis), H2 sekcijoms (1 dydis), H3/H4 kortelėms. Custom px naudoti tik išimtinai. |
| **Rounded per daug variantų** | `rounded-xl`, `rounded-2xl`, `rounded-[24px]`, `rounded-[32px]`, `rounded-[40px]`, `rounded-[48px]`, `rounded-[54px]`, `rounded-[64px]` | Sumažinti iki 2–3: pvz. `rounded-2xl` (16px), `rounded-3xl` (24px), dideliems blokams vienas „hero rounded“ (pvz. 32px arba 40px). |
| **Ikono dydžiai** | 10, 14, 16, 18, 28, 64 px | Scale: small 16, medium 20, large 24–28; hero/success 48–64. Pakeisti į `size={16|20|24|48}` ir tą patį naudoti visur. |
| **Touch targets** | `min-h-[44px]` / `min-h-[48px]` | Gerai. Palikti 44px minimumą mygtukams ir nuorodoms. |

**Prioritetas:** Heading scale + rounded sumažinimas iki 2–3.

---

## 3. Spalvos (colors)

| Problema | Kur | Rekomendacija |
|----------|-----|----------------|
| **Hardcoded hex** | `#F8FAFC` (Hero, Success, Cancel, Privacy), Ecosystem `#2E9E7E`, `#7C5CFF`… | `#F8FAFC` → `slate-50` arba į `tailwind.config` kaip `background: { page: '#F8FAFC' }`. Ecosystem spalvas į config kaip semantic (pvz. `ecosystem.1` …). |
| **Kontrastas ant baltų** | `text-slate-300`, `text-slate-400` body/paragraph | Ant white: 400 mažesniems tekstams ok; 300 – tik labai dideliems arba ne kritiniam tekstui. Footer copyright `text-slate-300` – svarstyti `slate-500` arba `slate-600` dėl WCAG. |
| **Klaidos / įspėjimai** | `text-red-600`, `text-amber-700` | Gerai. Palikti; jei reikia – vienas „error“ tokenas config. |
| **Accent gradient** | Hero, mygtukai: `#CFA73A` → `#E8B93C` | **Įgyvendinta:** `tailwind.config.js` – `backgroundImage['accent-gradient']`; visi primary CTA naudoja `bg-accent-gradient`. |
| **Ecosystem hex** | `#2E9E7E`, `#7C5CFF` ir kt. | **Įgyvendinta:** perkelta į `tailwind.config.js` kaip `colors.ecosystem` (1–4); Ecosystem.jsx naudoja theme klases. |

**Prioritetas:** `#F8FAFC` → token, footer copyright kontrastas.

---

## 4. Tarpai (spacing)

| Problema | Kur | Rekomendacija |
|----------|-----|----------------|
| **Section padding skirtingas** | `py-16 md:py-24`, `py-32`, `pt-28 md:pt-48 pb-20 md:pb-32` | Apibrėžti 2–3: section default `py-20 md:py-28`, section large `py-24 md:py-32`, hero atskirai. |
| **Gap scale** | gap-2, 3, 4, 6, 8, 10, 12, 24 | Naudoti 4, 6, 8, 12 (arba 6, 8, 12, 16) nuosekliau; 10 ir 24 – tik kur tikrai reikia. |
| **Footer** | `pt-48 pb-20`, `gap-24`, `mb-32` | Labai dideli. Svarstyti `pt-32 pb-16`, `gap-16`, `mb-24`. |
| **Methodology** | `mb-28`, `gap-12` | `mb-28` = 7rem – nestandartinė. Pvz. `mb-24` arba `mb-32` (8rem). |
| **Container padding** | `px-6` visur | Gerai. Gal `px-6 md:px-8` dideliuose ekranuose. |

**Prioritetas:** Section padding scale + footer sumažinimas.

---

## 5. Micro copy (tekstas, etiketės)

| Problema | Kur | Rekomendacija |
|----------|-----|----------------|
| **LT: „commit'ai“** | `hero.commits` | Gramatiškai geriau „2 481 commit'ų“ arba „2 481 komitas“. |
| **LT success heading** | `success.heading` „Sėkmingas diegimas“ vs breadcrumb „Apmokėjimas sėkmingas“ | Suvienodinti: arba abu „Apmokėjimas sėkmingas“, arba abu „Sėkmingas diegimas“. |
| **EN „Installation complete“** | Success page | Gali skambėti kaip „software install“. „Payment complete“ arba „You’re all set“ – aiškiau. |
| **Moduliai 7–15** | `pricing.modulesLocked` LT | „Moduliai 7–15 – vėlesnėje fazėje.“ → „Moduliai 7–15 bus vėlesnėje fazėje.“ arba „Ateityje.“ – sklandesnis sakinys. |
| **Nav vs section** | EN: nav „Method“, section „Methodology“; LT: „Metodologija“ vs „Metodas“ | Pavadinimus suvienodinti tarp nav ir sekcijos (arba abu „Metodologija“, arba abu „Metodas“). |
| **Pricing badge** | „Lifetime System Access“ abiejose kalbose | LT gal „Prieiga visam laikui“ arba palikti EN kaip brand. |
| **Footer „kūrėjas“** | `creator` lowercase | Jei intentional – ok; jei ne – „Kūrėjas: Tomas Staniulis“. |

**Prioritetas:** Success heading/breadcrumb vienodumas + „commit'ai“ + moduliai 7–15 sakinys.

---

## 6. Micro UI / UX detalės

| Problema | Kur | Rekomendacija |
|----------|-----|----------------|
| **Success page: du vienodos svarbos CTA** | „Eiti į mokymus“ ir „Grįžti į pradžią“ abu dideli | Antrąjį (Back to home) padaryti secondary: mažesnis mygtukas arba link stilius, kad primary būtų vienas. |
| **Coming soon elementai** | Footer: LinkedIn, Discord, System Log | Pridėti `aria-disabled="true"` arba `title="Coming soon"` + vizualiai ne clickable (cursor default). |
| **Check access input** | Label „Patikrink prieigą“ + mygtukas ta pati frazė | Mygtuke gal „Tikrinti“ / „Check“ – trumpiau ir aiškiau veiksmas. |
| **Loading mygtuke** | „Kraunama…“ / „Loading…“ | Gerai. Gal pridėti `aria-live="polite"` ant mygtuko, kai disabled + loading. |
| **Error žinutė** | Po pricing bloku | Jau `role="alert"`. Gal šiek tiek didesnis atstumas nuo kortelių (mb-6). |
| **Skip to content** | Focus ring `focus:ring-brand-accent` | Gerai. Patikrinti, kad `focus:ring-offset-2` su tamsiu fonu matosi. |

**Prioritetas:** Success page CTA hierarchija + „Check“ mygtukas + Coming soon prieinamumas.

---

## Santrauka prioritetais

1. **Tipografija:** font stack, vienas mažas dydis (xs/10px), H1 responsive scale, mažiau font-black.
2. **Dydžiai:** heading scale, mažiau rounded variantų, ikonų scale.
3. **Spalvos:** `#F8FAFC` → token, footer copyright kontrastas.
4. **Tarpai:** section padding scale, footer mažesni pt/pb/gap.
5. **Micro copy:** success heading/breadcrumb, „commit'ai“, moduliai 7–15, nav vs section pavadinimai.
6. **Micro UX:** Success CTA hierarchija, Check mygtukas „Tikrinti“, Coming soon aria/title.

Jei nori, galiu išrašyti konkrečius pakeitimus failuose (pvz. tik tipografiją arba tik micro copy).

---

## Įgyvendinta (2025-03-08)

- **Tailwind:** `fontFamily.sans`, `fontSize.label`; visur `#F8FAFC` → `slate-50`.
- **Tipografija:** maži dydžiai → `text-xs`; Hero H1 scale `text-4xl … lg:text-7xl`; Footer nuorodos `font-bold`; Methodology section label be italic; Footer copyright/h5 → `text-slate-500`.
- **Rounded:** suvienodinta į `rounded-3xl` (Ecosystem, Methodology, Pricing, Hero, Success, Cancel).
- **Tarpai:** Footer `pt-32 pb-16`, `gap-16 mb-24`; Methodology `mb-24`; Pricing error `mb-6`.
- **Micro copy:** LT commits „2 480 commit'ų“, success.heading „Apmokėjimas sėkmingas“, modulesLocked „Moduliai 7–15 bus vėlesnės fazės metu.“; EN success.heading „Payment complete“; nav/footer methodology „Metodologija“/„Methodology“; `pricing.checkButton` „Tikrinti“/„Check“.
- **Micro UX:** Success „Back to home“ secondary (link stilius); HomePage check mygtukas naudoja `checkButton`; Footer coming soon elementai su `title={t('footer.comingSoon')}`.
