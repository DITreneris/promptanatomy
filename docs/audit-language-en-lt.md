# Kalbos auditas: EN ir LT (gramatika, stilius, kalbos kultūra)

**Data:** 2026-03-08  
**Paskutinis atnaujinimas (auditas po turinio pakeitimų):** 2026-03-08  
**Apimtis:** Vartotojui matomi tekstai iš `frontend/src/i18n/translations/en.json` ir `lt.json`, įvertinta gramatika, stilius, kalbos kultūra ir aiškumas. Apima hero, whatIs, methodology, ecosystem, pricing, footer, legal, success, cancel, errors, nav, common.

---

## 1. Santrauka vartotojo akimis

| Aspektas | EN | LT |
|----------|----|-----|
| **Bendras įspūdis** | Aiškus, profesionalus, vienodas tonas. Terminai nuoseklūs (AI, brand). | Sklandu; ankstesnės gramatinės pataisos įgyvendintos. DI naudojamas nuosekliai. |
| **Prioritetas** | Pasirinktinai: klausimo ženklas whatIs.title; smulkūs stiliaus patikslinimai. | Pasirinktinai: prekės ženklo rašyba „Promptų Anatomija“ (didžioji A) citatose; whatIs.title – pilnas LT. |
| **Naujas turinys (whatIs, avatarAlt)** | whatIs.* – teisinga, AI nuoseklus. avatarAlt – aiškus. | whatIs.* – teisinga, DI nuoseklus. avatarAlt – „Bendruomenės nario avataras“ gerai. |

---

## 2. Gramatika

### 2.1 Lietuvių kalba (LT)

Ankstesnės rekomendacijos **jau įgyvendintos** (žr. skyrių 8): hero.members, hero.headline1, common.skipToContent, success.heading, pricing.upgradeTo, ecosystem.title, pricing.features (sertifikatas), hero.valueLine, pricing.planBullets.starter (AI→DI).

| Vieta | Dabartinis tekstas | Pastaba | Rekomendacija |
|-------|--------------------|----------|----------------|
| **pricing.subtext** | „…mokymų „Promptų anatomija“ pagal…“ | Prekės ženkle citatoje dažnai didžioji: *Anatomija*. | Pasirinktinai: **„Promptų Anatomija“** (didžioji A). |
| **whatIs.title** | „Kas yra Prompt Anatomy“ | Brand anglų kalba. Pilnas LT: „Kas yra Promptų Anatomija“. | Palikti (brand) arba **„Kas yra Promptų Anatomija“**. |
| **pricing.yourAccess** | „Jūsų prieiga: 1–%s moduliai“ | Su skaičiumi (3, 6) – „3 moduliai“ teisinga. | — |

### 2.2 Anglų kalba (EN)

| Vieta | Dabartinis tekstas | Pastaba | Rekomendacija |
|-------|--------------------|---------|----------------|
| **whatIs.title** | „What is Prompt Anatomy“ | Klausimo forma – galima „?“ | Pasirinktinai: **„What is Prompt Anatomy?“** |
| **pricing.features** (certificate) | „Certificate (from 70% score)“ | Jau pataisyta. | — |
| **pricing.yourAccess** | „Your access: 1–%s modules“ | Gramatiškai teisinga. | — |

---

## 3. Stilius ir nuoseklumas

### 3.1 Tonas ir brand balsas

- **EN:** Nuoseklus, tiesus, „product / SaaS“ stilius („Stop talking.“, „Start building.“, „Get access“). Tinkama edu/produkto puslapiui.
- **LT:** Atitinka tą patį toną; ankstesnės pataisos įgyvendintos – gramatiškai ir stilistiškai sklandu, DI nuosekliai.

### 3.2 Nuoseklumas tarp kalbų

| Aspektas | Būsena |
|----------|--------|
| **Terminai** | „Lifetime access“, „Repo“, „Stripe Verified“, „AI Powered“ – palikti abiejose kalbose (brand/techn.). Gerai. |
| **Produkto pavadinimas** | „Promptų Anatomija“ naudojamas abejuose failuose – gerai. |
| **Formalumas** | Abi kalbos „you“ / „jūs“ (kreipiamasis), vienodas lygis. |

### 3.3 Trumpumai ir skaitomumas

- **LT:** „per 24 val.“ – sutrumpinimas priimtinas UI kontekste; jei norima formaliau – „per 24 valandas“.
- **EN:** „24 hours“ – pilna forma, aišku.

### 3.4 AI / DI nuoseklumas (pagal [language-guidelines-en-lt.md](language-guidelines-en-lt.md))

| Kalba | Terminas | Paskirtis |
|-------|----------|-----------|
| **LT** | **DI** (dirbtinis intelektas) | Visur vartotojui matomame tekste: „DI operacinė sistema“, „DI Powered“, „DI agentai“, „DI prompt pagrindai“ ir t. t. |
| **EN** | **AI** | Tarptautiniam vartotojui: „AI Operating System“, „AI Powered“, „AI agents“ ir t. t. |

Audito metu patikrinti, kad LT vertime nėra likusių „AI“ ten, kur kalbama apie produktą ar bendruomenę (pvz. hero.valueLine, pricing.planBullets.starter). EN lieka „AI“.

---

## 4. Kalbos kultūra ir natūralumas

### 4.1 Hero (LT)

- **„Pradėk programuoti.“** vs EN **„Start building.“**  
  „Building“ plačiau = kurti, statyti; „programuoti“ = to program. Jei produktas apie AI/kodą – abu priimtina. Jei norima artimesnė EN reikšmei – galima **„Pradėk kurti.“**
- **„Išmok valdyti DI kaip operacinę sistemą“** – natūralu, gerai (LT: DI).

### 4.2 Metodologija (LT)

- **„Atsisakykite atsitiktinių rezultatų.“** – gerai.
- **„Sukurta sistema integruojama į verslo procesus“** – prasme „the system is integrated“; EN „The system integrates“. Abu priimtina; LT versija pabrėžia rezultatą.

### 4.3 Kainodara ir teisėdinis (abiejose)

- **„Refund terms – contact us“ / „Grąžinimo sąlygos – susisiekite“** – aišku, vienodas lygis.
- **„Built for Professionals.“** – sąmoningas didžiosios (brand); palikti.

---

## 5. Rekomendacijos pagal prioritetą

### Įgyvendinta (būtina – žr. skyrių 8)

1. LT hero.members, hero.headline1, common.skipToContent, success.heading, pricing.upgradeTo, ecosystem.title, pricing.features (sertifikatas), hero.valueLine, pricing.planBullets.starter (AI→DI).

### Pageidautina (po naujo turinio)

2. **LT pricing.subtext:** „Promptų anatomija“ → **„Promptų Anatomija“** (didžioji A brand citatoje).
3. **LT whatIs.title:** palikti „Kas yra Prompt Anatomy“ (brand) arba **„Kas yra Promptų Anatomija“** (pilnas LT).
4. **EN whatIs.title:** **„What is Prompt Anatomy?“** (klausimo ženklas).

### Palikti kaip yra

- Brand terminai (Lifetime access, Repo, Stripe Verified, AI/DI Powered).
- whatIs.*, hero.avatarAlt – naujas turinys, gramatiškai ir DI/AI nuosekliai teisingas.
- „Promptų Anatomija“ / „Prompt Anatomy“ pagal kalbą.

---

## 6. Nuorodos į failus

- Vertimai: [frontend/src/i18n/translations/lt.json](../frontend/src/i18n/translations/lt.json), [frontend/src/i18n/translations/en.json](../frontend/src/i18n/translations/en.json).
- Raktų naudojimas: `t('key')` per [LocaleContext.jsx](../frontend/src/i18n/LocaleContext.jsx); komponentai – [Navbar](../frontend/src/components/Navbar.jsx), [Hero](../frontend/src/components/Hero.jsx), [WhatIsPromptAnatomy](../frontend/src/components/WhatIsPromptAnatomy.jsx), [Methodology](../frontend/src/components/Methodology.jsx), [Ecosystem](../frontend/src/components/Ecosystem.jsx), [Pricing](../frontend/src/components/Pricing.jsx), [Footer](../frontend/src/components/Footer.jsx), puslapiai Success/Cancel.

---

## 7. Santrauka

Vertimai **kokybiški** ir vartotojui **suprantami**. Ankstesnės būtinos pataisos (LT gramatika, DI/AI nuoseklumas) **įgyvendintos**. Naujas turinys (whatIs.*, hero.avatarAlt) – gramatiškai teisingas, DI (LT) ir AI (EN) naudojami nuosekliai. Pasirinktini patikslinimai: LT – „Promptų Anatomija“ didžiąja A citatose, whatIs.title pilnas LT; EN – whatIs.title su „?“.

---

## 8. Įgyvendintos pataisos (po peržiūros)

| Raktas | Buvo | Pataisyta |
|--------|------|-----------|
| **LT** common.skipToContent | Praleisti į turinį | Pereiti prie turinio |
| **LT** hero.headline1 | Nustok kalbėtis. | Nustok kalbėti. |
| **LT** hero.members | 500+ narys | 500+ narių |
| **LT** success.heading | Sėkmingas Diegimas | Sėkmingas diegimas |
| **LT** pricing.upgradeTo | Upgrade į %s | Pagerinti iki %s |
| **LT** ecosystem.title | Vertikalūs Varikliai | Vertikalūs varikliai |
| **LT** pricing.features (sertifikatas) | Sertifikatas (nuo 70%) | Sertifikatas (nuo 70% įvertinimo) |
| **EN** pricing.features (certificate) | Certificate (from 70%) | Certificate (from 70% score) |
| **LT** hero.valueLine | Išmok naudoti AI 10x efektyviau | Išmok naudoti DI 10x efektyviau (DI/AI nuoseklumas) |
| **LT** pricing.planBullets.starter | AI prompt pagrindai | DI prompt pagrindai (DI/AI nuoseklumas) |
| **Naujas turinys (2026-03-08)** | — | whatIs.* (LT/EN) – patikrinta, gramatika ir DI/AI teisingi. hero.avatarAlt – pridėtas (LT/EN). |
