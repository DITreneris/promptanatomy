# Home page – gili OK/FAIL analizė

**Data:** 2026-03-08  
**Apimtis:** Pagrindinis puslapis (LP) promptanatomy.app – struktūra, turinys, navigacija, kopija, UI/UX, techninis atitikimas.

---

## 1. Struktūra ir turinys

| Kriterijus | Būsena | Pastabos |
|------------|--------|-----------|
| LP sekcijų eilė (Hero → Kas yra → Metodologija → Ekosistema → Kainodara → Footer) | **OK** | HomePage.jsx; „Kas yra“ po Hero, prieš Metodologiją; nav be „Kas yra“. |
| Semantika: `<main>`, `<section>`, `id` sekcijoms | **OK** | `#main-content`, `#what-is`, `#metodologija`, `#ekosistema`, `#pricing`. |
| H1 vienas per puslapį (Hero) | **OK** | Hero turi vieną h1. |
| H2 sekcijoms (Kas yra, Metodologija, Ekosistema, Kainodara) | **OK** | WhatIsPromptAnatomy, Methodology, Ecosystem, Pricing – h2/h3 naudojami. |
| „Kas yra“ sekcija matoma be scroll (above the fold) | **FAIL** | Ekrane – tik hero + dalis turinio; „Kas yra“ dažnai žemiau. Priklauso nuo viewport; desktop OK, mažesniuose – ne. |
| Nav nuorodos → teisingi section id | **OK** | `#ekosistema`, `#metodologija`, `#pricing` – atitinka. |
| Nav be „Kas yra“ (less is more) | **OK** | „Kas yra“ pašalinta iš nav; sekcija lieka puslapyje po Ecosystem, prieš Pricing (2026-03). |

---

## 2. Navigacija ir CTA

| Kriterijus | Būsena | Pastabos |
|------------|--------|-----------|
| Brand (logo + PROMPTŲ ANATOMIJA v2.4 + tagline) | **OK** | Navbar; lt.json `nav.brand*`, `nav.version`. |
| Nav elementai: Ekosistema, Metodologija, Kainodara (+ Repo jei GLOSSARY_URL) | **OK** | Uppercase per Tailwind; CTA „Žiūrėti planus“. |
| LT/EN perjungiklis | **OK** | `aria-pressed`, `aria-label`; LocaleContext. |
| CTA scroll į #pricing | **OK** | `scrollToPricing`, smooth scroll. |
| Skip to content | **OK** | Focus – atsiranda, `#main-content`. |
| Mobilus meniu (hamburgeris, drawer) | **OK** | body overflow, aria-expanded, aria-controls (docs/audit-mobile). |
| Focus trap mobilaus meniu | **OK** | Įgyvendinta 2026-03-14: fokusas drawer viduje atidaryme, Tab ciklas, Escape uždaro, fokusas grąžinamas į hamburgerį (audit-mobile). |

---

## 3. Kopija ir kalbos (Copy & i18n)

| Kriterijus | Būsena | Pastabos |
|------------|--------|-----------|
| Visas tekstas per i18n (lt.json / en.json) | **OK** | Nėra hardcoded LP teksto komponentuose. |
| LT terminas DI, EN – AI | **OK** | language-guidelines. |
| „6 blokų“ kartojimai | **FAIL** | copy-audit-lp: 4× (whatIs.intro, whatIs.bullet1, methodology.paragraph, pricing.features). Sumažinti iki 2× (whatIs + pricing). |
| Esmė pirmoje eilutėje (brand + rezultatas) | **FAIL** | whatIs.intro pradeda nuo metodikos; rekomenduota pradėti nuo „Promptų Anatomija – …“ (aiškus, nuspėjamas, patikrinamas). |
| Hero vs Kas yra: vienas aiškus produktas | **WARN** | UI_UX_SEO_MOSCOW: „neaišku – kursas, SaaS ar community“. Hero bulletai + Kas yra – pakanka, bet galima stiprinti vieną „sistema“ messaging. |
| Micro copy (commit'ai, success heading, moduliai 7–15) | **FAIL** | micro-ui-ux-audit: „commit'ai“ gramatika; success heading vs breadcrumb nevienodi; „Moduliai 7–15 – vėlesnėje fazėje“ sklandumui. |

---

## 4. UI/UX ir prieinamumas

| Kriterijus | Būsena | Pastabos |
|------------|--------|-----------|
| Touch targets ≥44px | **OK** | CTA, nav, hamburgeris, pricing mygtukai – min-h-[44px] / 48px. |
| Focus visible (ring) | **OK** | focus-visible:ring-2 focus-visible:ring-brand-accent. |
| Klaidos (access, checkout): role="alert", vertimai | **OK** | accessError, error per t(); scroll į pricing po klaidos. |
| Loading būsenos (aria-busy, disabled) | **OK** | Check access, Get access. |
| Reduced motion | **OK** | index.css prefers-reduced-motion. |
| Kontrastas (WCAG AA) | **OK** | Footer creator, cookies/coming-soon ir nuorodos – text-slate-500 (2026-03-13). |
| Šriftų hierarchija / per daug font-black | **WARN** | micro-ui-ux-audit: daug 900; rekomenduota dalį – font-bold. |
| Hero H1 scale (mažuose viewport) | **WARN** | Audit: text-4xl→md:text-6xl lg:text-7xl naudojamas; 94px pašalintas – OK. |
| Overflow-x-hidden | **OK** | HomePage – mažina horizontalų scroll. |
| Ekosistemos kortelės (outcome, 3 bulletai, CTA, primary hierarchija) | **OK** | Outcome-based copy, viena primary kortelė (lg:col-span-2), CTA mygtukas; ikonos BookOpen, Megaphone, Users, LayoutDashboard. |

---

## 5. Techninis ir atitikimas

| Kriterijus | Būsena | Pastabos |
|------------|--------|-----------|
| Maršrutai (/, /en, /success, /cancel, /privacy, /terms) | **OK** | App.jsx; golden-legacy. |
| API: getAccess, createCheckoutSession per api.js | **OK** | HomePage – ne tiesioginis fetch. |
| Prieigos forma prieš planus (email, Check access) | **OK** | Optional; rodo highest_plan, can_upgrade_to. |
| Phase 1 planai (tik 2: 1–3, 1–6 moduliai) | **OK** | Pricing.jsx PLANS filter; PHASE1_MAX_MODULES. |
| Build ir testai | **OK** | golden-legacy: frontend build, pytest – regresijos apsauga. |

---

## 6. Santrauka

| Kategorija | OK | FAIL | WARN |
|------------|----|------|------|
| Struktūra ir turinys | 6 | 1 | 0 |
| Navigacija ir CTA | 7 | 0 | 0 |
| Kopija ir kalbos | 3 | 3 | 1 |
| UI/UX ir prieinamumas | 8 | 0 | 2 |
| Techninis | 5 | 0 | 0 |
| **Iš viso** | **28** | **4** | **3** |

---

## 7. Prioritetai (rekomenduoti žingsniai)

**MUST (FAIL → OK)**  
1. **Copy:** Įgyvendinti copy-audit-lp rekomendacijas – „6 blokų“ 2×, whatIs.intro pirmą sakinį nuo brand + rezultato.  
2. **Nav:** Pridėti nuorodą į „Kas yra“ (pvz. „Kas yra“ → `#what-is`) – **įgyvendinta 2026-03-13.**  
3. **Micro copy:** Taisyti „commit'ai“, success heading/breadcrumb vienodumą, moduliai 7–15 sakinį (micro-ui-ux-audit).

**SHOULD (WARN / UX)**  
4. **Focus trap:** Mobilaus meniu atidaryme laikyti fokusą drawer viduje, uždaryti su Escape – **įgyvendinta 2026-03-14.**  
5. **Kontrastas:** Footer copyright – pakeisti į slate-500 arba slate-600 – **įgyvendinta 2026-03-13.**  
6. **Tipografija:** Sumažinti font-black naudojimą kur nereikia (subheadings, antriniai blokai) – **įgyvendinta 2026-03-14.**

**NICE**  
7. „Kas yra“ above the fold – optional layout/turinio sutrumpinimas mažiems ekranams.  
8. Vienas aiškus „sistema“ messaging (Hero/Kas yra) – pagal UI_UX_SEO_MOSCOW.

---

## 8. Nuorodos į esamus auditus

- [copy-audit-lp.md](copy-audit-lp.md) – 6 blokų kartojimai, esmė.  
- [micro-ui-ux-audit.md](micro-ui-ux-audit.md) – šriftai, spalvos, micro copy.  
- [audit-mobile-ux-user-journey.md](audit-mobile-ux-user-journey.md) – mobilus meniu, focus trap.  
- [golden-legacy-standard.md](golden-legacy-standard.md) – LP struktūra, regresija.  
- [UI_UX_SEO_MOSCOW_PLAN.md](UI_UX_SEO_MOSCOW_PLAN.md) – Hero aiškumas, SEO.

**Indeksas:** Šis dokumentas įtrauktas į [docs/INDEX.md](INDEX.md) skyrių „Auditas ir kalbos“.
