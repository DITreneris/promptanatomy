# Auditas: mobilus UI, UX ir vartotojo kelionė (LT/EN)

**Data:** 2026-03-08  
**Apimtis:** Frontend (Vite + React, Tailwind), daugiakalbis režimas LT/EN, vartotojo kelionė nuo LP iki success/cancel.

---

## 1. Mobilus UI

### 1.1 Kas gerai

- **Viewport:** `index.html` turi `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` – tinkama mobiliam rodymui.
- **Touch targets:** Dauguma CTA ir navigacijos elementų laikosi ~44–48px minimum:
  - Skip to content: `min-h` per py/px; Navbar CTA ir hamburgeris: `min-h-[44px]` / `min-w-[44px]`.
  - Hero CTA: `min-h-[44px]`; Pricing mygtukai: `min-h-[48px]`; mobile nav nuorodos: `min-h-[48px]`.
- **Responsive breakpoints:** Naudojami `sm:`, `md:`, `lg:` (Tailwind default 640px, 768px, 1024px) – grid ir layout prisitaiko.
- **Mobilus meniu:** `Navbar.jsx` – hamburgeris `< md`, drawer iš dešinės, overlay, `body overflow: hidden` atidarytam meniu, `aria-expanded` / `aria-controls` / `aria-label` (LT/EN per `t()`).
- **Overflow:** `HomePage` turi `overflow-x-hidden` – mažina horizontalų scroll mobilėje.
- **Reduced motion:** `index.css` – `prefers-reduced-motion: reduce` sumažina animacijas.

### 1.2 Explainer sekcija (WhatIsPromptAnatomy) – mobilė

| Aspektas | Įgyvendinta |
|----------|-------------|
| **TITLE** | `text-4xl md:text-5xl` – skaitoma ant mažų ekranų. |
| **VALUE** | 2 eilutės, `max-w-[720px]`, `text-lg` – pakanka vietos ir kontrasto. |
| **PROCESS (pills)** | `flex flex-wrap justify-center gap-4` – 6 pill'ai su rodyklėmis persikelia į kelias eilutes; `gap-4` (16px) atitinka touch spacing. |
| **PROOF (stat kortelės)** | `grid-cols-1 sm:grid-cols-3` – &lt;640px viena kolona (skaičius + labelis po vieną), nuo sm – trys stulpeliai; `gap-8 sm:gap-12` – mažesnis tarpas mobilėje. |
| **Section padding** | `py-20 md:py-28` – vienoda su kitomis sekcijomis, mažiau vertikalaus scroll. |
| **A11y** | PROCESS turi `aria-label` (processAriaLabel); PROOF naudoja `<figure>`/`<figcaption>` semantiką. |

### 1.3 Kitos sekcijos – mobilūs pataisymai (įgyvendinta)

| Vieta | Pakeitimas |
|-------|------------|
| **Methodology** | `py-32` → `py-20 md:py-32`; header `mb-24` → `mb-16 md:mb-24`; grid `gap-12` → `gap-8 md:gap-12`; kortelės `p-12` → `p-8 md:p-12`; H3 `text-5xl md:text-7xl` → `text-4xl md:text-5xl lg:text-7xl`. |
| **Ecosystem** | `py-32` → `py-20 md:py-32`; header `mb-28` → `mb-16 md:mb-28`. |
| **Pricing** | Plano etiketė `text-[10px]` → `text-xs` (skaitomumas, micro-auditas). |

### 1.4 Trūkumai / rekomendacijos (likusios)

| Problema | Vieta | Rekomendacija |
|----------|--------|----------------|
| **Hero antraštė** | `Hero.jsx` – `text-4xl sm:text-5xl md:text-6xl lg:text-7xl` | Dabar scale nuoseklus; ant labai mažų (&lt;360px) galima svarstyti `text-3xl` pradžioje. |
| **Footer grid** | `Footer.jsx` – `md:grid-cols-4`, `gap-16` | Mobilėje viena kolona; gap jau 16. |
| **Skip link** | `HomePage.jsx` | Focus order logiškas (skip → logo → nav → CTA). |

### 1.5 Mobile UI pataisymai (2026-03)

| Vieta | Problema | Įgyvendinta |
|-------|----------|-------------|
| **Hero kodo blokas** | Tekstas mobilėje sutrumpintas („…stra...“) dėl `overflow-hidden` ant wrapper. | `overflow-hidden` perkeltas tik ant glow wrapper (apkarpomas tik dekoratyvus gradientas); turinio blokas su `overflow-x-auto overflow-y-visible` ir `min-w-0` – tekstas laisvai wrap’ina. |
| **Hero kodo blokas** | Per mažas padding mobilėje. | `p-6 sm:p-10` → `p-5 sm:p-10`. |
| **Hero kodo viršus** | LiveFeed ir scriptName skirtingo stiliaus (vienas pill, kitas plain). | Abiem vienodas pill stilius (`bg-white/5 border border-white/10`), `gap-2` tarp jų; scriptName su `truncate` jei per ilgas. |
| **Hero kodo labeliai** | `text-xs` mobilėje sunkiau skaitomi. | Labeliai (01. Rūta, 02. Input, 03. Output): `text-sm sm:text-xs`. |
| **Navbar tagline** | „DI OPERACINĖ SISTEMA“ – `text-slate-400` per silpnas ant baltos. | Mobilėje `text-slate-500`, nuo `sm` – `text-slate-400`. |
| **Navbar** | Viršutinis padding kai ne scrolled. | `py-6` → `py-4 md:py-6`. |
| **Drawer overlay** | Stipresnis atskyrimas nuo puslapio. | Overlay `bg-black/50` → `bg-black/60`. |

---

## 2. UX (bendras)

### 2.1 Kas gerai

- **Aiškūs CTA:** „Gauti prieigą“ / „Get access“ – vienas pagrindinis veiksmas, pakartotas Hero ir Navbar.
- **Klaidos:** `handleBuy` klaidos rodomos prie Pricing, su `role="alert"` ir `aria-live="polite"`, teksto vertimai per `t()`.
- **Loading būsena:** Mygtukuose rodoma „Kraunama…“ / „Loading…“, `aria-busy`, `disabled` – vengiama dubliuotų paspaudimų.
- **Breadcrumbs:** Success ir Cancel puslapiuose – „Pradžia / …“ su `aria-current="page"`.
- **Focus matomumas:** Naudojamas `focus-visible:ring-2 focus-visible:ring-[#CFA73A]` (Navbar, Hero, Pricing, Footer, Success, Cancel).

### 2.2 Trūkumai / rekomendacijos

| Problema | Vieta | Rekomendacija / būsena |
|----------|--------|-------------------------|
| **Focus trap mobilaus meniu** | `Navbar.jsx` | **Įgyvendinta 2026-03-14:** atidaryme fokusas perkeliamas į pirmą focusable drawer viduje; Tab/Shift+Tab ciklas; Escape uždaro; uždaryme fokusas grąžinamas į hamburgerio mygtuką. |
| **Kontrastas** | TODO.md jau nurodo: slate-500 / slate-400 | Patikrinti ant baltos ir ant `#0B1320` (WCAG AA 4.5:1); pataisyti pagal auditą. |
| **Success po mokėjimo** | TODO: „nepažadėti el. laiško“ | SuccessPage tekste aiškiai nurodyti „Jei per X min negausite – susisiekite“ arba panašiai, kad vartotojas žinotų, ko tikėtis. |

---

## 3. Vartotojo kelionė (LT ir EN)

### 3.1 Kelionės žemėlapis

1. **Įėjimas:** LP (/) – Hero → scroll arba CTA „Gauti prieigą“ → scroll į #pricing.
2. **Kainodara:** Pasirinkti planą → `createCheckoutSession(planId)` → redirect į Stripe Checkout.
3. **Po mokėjimo:** Stripe nukreipia į `/success` arba `/cancel`.
4. **Success:** Pranešimas + nuoroda „Grįžti į pradžią“.
5. **Cancel:** „Vėl bandyti“ → `/#pricing` arba „Grįžti į pradžią“ → `/`.

### 3.2 Daugiakalbis režimas (LT/EN)

- **Implementacija:** `LocaleContext.jsx` – `locale` iš `localStorage`, `setLocale` atnaujina state ir storage; `t(key, params)` naudoja `lt.json` / `en.json`.
- **SEO ir a11y:** `useEffect` nustato `document.documentElement.lang`, `document.title`, `meta name="description"`, `og:title`, `og:description` pagal pasirinktą kalbą – gerai.
- **Perjungiklis:** Navbar (desktop ir mobile) – LT | EN mygtukai su `aria-pressed` ir `aria-label="Lietuvių"` / `"English"` (fiksuota EN, ne per `t()` – priimtina).

### 3.3 Kalbos perjungiklio vieta (mobile)

- **Geriausios praktikos (2025–2026):** Kalbos perjungiklis turi būti **lengvai randamas** (discoverable) – rekomenduojama pirmoji mobiliojo meniu pozicija arba šalia hamburgerio (šaltiniai: WPML „first place in phone menu“, Divi.Help „next to hamburger“, SimpleLocalize / Localizely – aiškiai matoma vieta header / meniu).
- **Įgyvendinta:** Kalbos perjungiklis perkeltas į **pirmą poziciją** mobiliajame drawer – atsidarius meniu vartotojas iškart mato LT | EN, tada nuorodas, tada CTA. Tai atitinka rekomendaciją, kad mobilėje kalba būtų pasiekiama be gilaus scroll ar kelių atidarymų.
- **Rekomendacija:** Tekstinės etiketės (LT, EN) ir `aria-label` palikti; vėliau galima svarstyti „Lietuvių / English“ pilną pavadinimą edu kontekste, jei reikia dar aiškiau.

### 3.4 Edu / daugiakalbių produktų kontekstas

- **Statistika (MoldStud ir panašūs šaltiniai):** ~76% vartotojų nori turinio gimtąja kalba; ~36% atsisako platformos be pageidaujamos kalbos. Edu ir produktų puslapiuose lengvas kalbos pasirinkimas ypač svarbus.
- **Mobilėje:** Dažnas naudojimas – perjungiklis turi būti pasiekiamas be gilaus scroll ar kelių atidarymų. Pirmoji drawer pozicija atitinka šį reikalavimą.

### 3.5 Vertimų ir kelionės nuoseklumas

| Aspektas | Būsena |
|----------|--------|
| **Struktūra raktų** | lt.json ir en.json atitinka tą pačią struktūrą (meta, common, errors, nav, hero, methodology, ecosystem, pricing, footer, success, cancel). |
| **Trūkstantys raktai** | Jei `t('key')` neranda vertimo, grąžinamas `key` – rekomenduojama peržiūra, kad visi UI teksti būtų iš raktų. |
| **Success/Cancel kelionė** | Success ir Cancel puslapiai naudoja `useLocale()` ir `t()` – kalba išlieka tokia, kokia buvo prieš redirect į Stripe (locale saugomas localStorage). Vartotojas grįžta į tą pačią kalbą – gerai. |
| **Stripe Checkout kalba** | Stripe sesijos kalba priklauso nuo backend (jei perduodama `locale` į Stripe API) – atskira backend konfigūracija. |
| **Breadcrumb** | „Pradžia“ / „Home“ ir success/cancel breadcrumb – vertima abiejose kalbose. |

### 3.6 Siūlomi patikrinimai

- **Lentelė raktų:** Paleisti patikrą (pvz. skriptą arba rankiniu būdu), kad kiekvienas raktas iš `lt.json` egzistuoja `en.json` ir atvirkščiai.
- **Ilgi tekstai EN:** Kai kurie EN sakiniai ilgesni už LT – pvz. hero subtext, methodology. Mobilėje patikrinti, kad neįeina per daug eilučių ir layout nesulūžta.
- **Klaidos pranešimai:** `errors.invalidResponse`, `errors.noCheckoutUrl`, `errors.paymentFailed` – naudojami HomePage; įsitikinti, kad abiejose kalbose aiškūs ir trumpi.

---

## 4. Vartotojo kelionė – matomumas ir suprantamumas (mobilė)

Kelionė nuo LP iki konversijos; kiekvienas žingsnis turi būti **matomas** ir **suprantamas** be per didelio scroll ar painiavos.

| Žingsnis | Kas matoma / suprantama | Mobilūs patikrinimai |
|----------|--------------------------|----------------------|
| **1. Įėjimas (LP)** | Navbar (logo, hamburgeris, CTA), Hero (antraštė, vertė, CTA) | Logo ir CTA matomi; hamburgeris atidaro meniu su LT/EN, nuorodomis, CTA. |
| **2. Kas tai / Kaip veikia / Kas viduje** | Explainer: TITLE → VALUE → PROCESS (pills) → PROOF (3 skaičiai) | Viena kolona; pills persikelia; stat kortelės po vieną (&lt;640px) arba trys (≥640px). |
| **3. Metodologija** | „Operating Model“ + 3 kortelės | Mažesnis padding ir H3 mobilėje; kortelės viena po kitos. |
| **4. Ekosistema** | 4 vertikalai su CTA | Grid 1→2→4; CTA min-h-[44px]. |
| **5. Kainodara** | Check access + planų kortelės | Viena kolona; plano etiketė text-xs; mygtukai 48px. |
| **6. Pirkimas / Success / Cancel** | Redirect į Stripe; grįžus – pranešimas | Kalba išlieka; breadcrumbs aiškūs. |
| **7. Footer** | Nuorodos, copyright, Privacy/Terms | Viena kolona; touch targets pakanka. |

Explainer struktūra (TITLE → VALUE → PROCESS → PROOF) atitinka „Kas tai → Kaip veikia → Kas viduje“ – vienu scroll matoma produkto mechanika.

---

## 5. Santrauka

| Sritis | Įvertinimas | Prioritetas tobulinti |
|--------|-------------|------------------------|
| **Mobilus UI** | Geras: viewport, touch targets, responsive, mobile menu; explainer ir sekcijų padding/grid mobilėje | Hero code block šriftas (optional); focus trap. |
| **UX** | Geras: CTA, klaidos, loading, focus ring, breadcrumbs | Focus trap mobilaus meniu; kontrastas (WCAG); Success teksto išlyga. |
| **Vartotojo kelionė LT/EN** | Geras: struktūra, lang/meta/title, success/cancel vertimi | Raktų simetrijos patikra; Stripe kalba (backend). |
| **Kelionė – matomumas** | Explainer ir sekcijos pritaikytos mobilėje; kelionė nuo Hero iki Footer aiški | Testuoti ant realių įrenginių. |

**Įgyvendinta (2025-03-09):** Explainer spacing, processAriaLabel, PROOF figure/figcaption; Methodology ir Ecosystem responsive padding/grid; Pricing plan label text-xs; audit papildytas Explainer mobile ir vartotojo kelionės skyriumi.

Rekomenduojama: focus trap mobilaus meniu; kontrasto pataisymai; Success teksto išlyga; Hero code block (optional).

---

## 6. WebView (Messenger / Instagram) – kritinis fix (2026-03-13)

### 6.1 Problema (3x raportuota)

Mobile navigation drawer turėjo sugriuvusi renderinga Messenger ir Instagram in-app browser (WebView): navigacijos drawer turinys (LT/EN, EKOSISTEMA, MOKYMAI, KAINODARA) ir foninis puslapio turinys (Ecosystem kortelės) buvo maišosi vienoje kolonnoje. Vartotojas negalėjo atskirti navigacijos nuo turinio.

### 6.2 Root cause

`overflow-x: hidden` ant `html` ir `body` (`index.css`, commit `1a7f0a3` Mar 8) sukūrė naują containing block, kuris palaužė `position: fixed` elementus (`Navbar.jsx` :45, :139) WebView aplinkose. Tai dokumentuota CSS bug (SO #47095596, #19254146).

### 6.3 Fix

| Failas | Pakeitimas |
|--------|-----------|
| `index.css` | `overflow-x: hidden` → `overflow-x: clip` + `overscroll-behavior-x: none` |
| `Navbar.jsx` | Overlay `bg-black/60` → `bg-black/80`; `backface-visibility: hidden` ant fixed nav; scroll lock: `body position: fixed` pattern vietoj tik `overflow: hidden` |
| `Ecosystem.jsx` | Responsive padding: `p-6 sm:p-10`, `pt-20 sm:pt-[100px]`, `mb-12 sm:mb-24` |

### 6.4 Testavimo reikalavimai

Prieš merge testuoti: Desktop Chrome/Firefox, Mobile Safari, **Messenger WebView**, Instagram WebView.
