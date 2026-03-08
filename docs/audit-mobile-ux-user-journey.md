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

### 1.2 Trūkumai / rekomendacijos

| Problema | Vieta | Rekomendacija |
|----------|--------|----------------|
| **Hero antraštė per didelė ant mažų ekranų** | `Hero.jsx` – `text-6xl` (mobile) iki `md:text-[94px]` | Ant labai mažų ekranų (pvz. &lt;360px) `text-6xl` gali būti per didelis; apsvarstyti `text-4xl sm:text-5xl md:text-6xl lg:text-[94px]` arba `clamp()` per Tailwind arbitrary value. |
| **Hero code block** | Dešinė kolona – daug teksto, maži šriftai (`text-[9px]`, `text-[10px]`) | Mobilėje skaitytumą pagerintų šiek tiek didesnis fontas arba sutrumpintas turinys tik mobile. |
| **Pricing kortelės** | `Pricing.jsx` – `md:grid-cols-2 lg:grid-cols-4` | Ant mažų ekranų viena kolona – gerai; galima pridėti horizontalų scroll su snap (optional) jei norima palyginti planus vieno ekrano ribose. |
| **Footer grid** | `Footer.jsx` – `md:grid-cols-4`, `gap-24` | Mobilėje viena kolona, `gap-24` gali atrodyti per didelis; galima `gap-12 md:gap-24`. |
| **Skip link pozicija** | `HomePage.jsx` – `-translate-y-24 focus:translate-y-0` | Veikia; įsitikinti, kad focus order (Tab) yra logiškas po Navbar (skip → logo → nav → CTA). |

---

## 2. UX (bendras)

### 2.1 Kas gerai

- **Aiškūs CTA:** „Gauti prieigą“ / „Get access“ – vienas pagrindinis veiksmas, pakartotas Hero ir Navbar.
- **Klaidos:** `handleBuy` klaidos rodomos prie Pricing, su `role="alert"` ir `aria-live="polite"`, teksto vertimai per `t()`.
- **Loading būsena:** Mygtukuose rodoma „Kraunama…“ / „Loading…“, `aria-busy`, `disabled` – vengiama dubliuotų paspaudimų.
- **Breadcrumbs:** Success ir Cancel puslapiuose – „Pradžia / …“ su `aria-current="page"`.
- **Focus matomumas:** Naudojamas `focus-visible:ring-2 focus-visible:ring-[#CFA73A]` (Navbar, Hero, Pricing, Footer, Success, Cancel).

### 2.2 Trūkumai / rekomendacijos

| Problema | Vieta | Rekomendacija |
|----------|--------|----------------|
| **Focus trap mobilaus meniu** | `Navbar.jsx` – drawer atidaromas, bet fokusas neįtrapintas | Kai `mobileOpen === true`, fokusą laikyti drawer viduje ir uždaryti su Escape; naudoti `useEffect` + `ref` į pirmą nuorodą/mygtuką ir `focus()` atidaryme. |
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

## 4. Santrauka

| Sritis | Įvertinimas | Prioritetas tobulinti |
|--------|-------------|------------------------|
| **Mobilus UI** | Geras: viewport, touch targets, responsive, mobile menu, reduced motion | Hero antraštė ir code block ant labai mažų ekranų; footer gap. |
| **UX** | Geras: CTA, klaidos, loading, focus ring, breadcrumbs | Focus trap mobilaus meniu; kontrastas (WCAG); Success teksto išlyga. |
| **Vartotojo kelionė LT/EN** | Geras: vienoda struktūra, lang/meta/title atnaujinami, success/cancel vertimi | Vertimų raktų simetrijos patikra; Stripe Checkout kalba (backend). |

Rekomenduojama: prioritetu įdiegti focus trap mobilaus meniu ir (jei dar nepadaryta) kontrasto pataisymus; tada – Success teksto išlygą ir Hero/footer smulkesnius mobile pakeitimus.
