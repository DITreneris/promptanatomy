# Kalbos auditas: EN ir LT (gramatika, stilius, kalbos kultūra)

**Data:** 2026-03-08  
**Apimtis:** Vartotojui matomi tekstai iš `frontend/src/i18n/translations/en.json` ir `lt.json`, įvertinta gramatika, stilius, kalbos kultūra ir aiškumas vartotojo akimis.

---

## 1. Santrauka vartotojo akimis

| Aspektas | EN | LT |
|----------|----|-----|
| **Bendras įspūdis** | Aiškus, profesionalus, vienodas tonas. | Daugiausia sklandu; keli gramatiniai ir leksiniai nukrypimai gali atkreipti dėmesį. |
| **Prioritetas** | Smulkūs stiliaus patikslinimai. | Pataisyti gramatiką (narys → narių; kalbėtis → kalbėti); pasirinktinai – natūralesnės frazės. |

---

## 2. Gramatika

### 2.1 Lietuvių kalba (LT)

| Vieta | Dabartinis tekstas | Problema | Rekomendacija |
|-------|--------------------|----------|----------------|
| **hero.members** | „500+ narys“ | **Klaida:** su kiekybine skaičiumi reikia daugiskaitos kilmininko: *narys* → *narių*. „500+ narys“ skamba kaip klaida. | **„500+ narių“** |
| **hero.headline1** | „Nustok kalbėtis.“ | **Stilius/gramatika:** *Kalbėtis* – sangrąžinis veiksmažodis („talk with each other“ / „talk to oneself“). Bendresnei reikšmei „stop talking“ natūraliau **„Nustok kalbėti.“** | **„Nustok kalbėti.“** |
| **common.skipToContent** | „Praleisti į turinį“ | **Aiškumas:** „Praleisti“ gali reikšti „to miss“. Įprasta a11y frazė „Skip to content“ geriau atitinka **„Pereiti prie turinio“** (peršti į pagrindinį turinį). | **„Pereiti prie turinio“** (arba „Praleisti į pagrindinį turinį“) |
| **success.heading** | „Sėkmingas Diegimas“ | **Rašyba:** lietuviškai antraštėse dažniau nerašoma didžiosios po pirmo žodžio (nebent visi žodžiai svarbūs). | **„Sėkmingas diegimas“** arba **„Diegimas atliktas“** |
| **pricing.upgradeTo** | „Upgrade į %s“ | **Kalba:** anglų „Upgrade“ + lietuviškas „į“. Gramatiškai priimtina kaip skolinys; jei norima viskas lietuviškai – **„Pagerinti iki %s“** arba **„Atnaujinti iki %s“**. | Palikti (priimtina) arba **„Pagerinti iki %s“** |

### 2.2 Anglų kalba (EN)

| Vieta | Dabartinis tekstas | Pastaba | Rekomendacija |
|-------|--------------------|---------|----------------|
| **pricing.features** | „Certificate (from 70%)“ | Aišku, bet „70%“ gali būti neaišku – 70% ko? | Pasirinktinai: **„Certificate (from 70% score)“** arba palikti, jei kontekstas aiškus. |
| **pricing.yourAccess** | „Your access: 1–%s modules“ | Gramatiškai teisinga. | — |
| **success.body** | „If you have questions or did not receive instructions within 24 hours“ | Teisinga; sakinys ilgas. | Galima sutrumpinti: „Questions or no instructions within 24h? Contact us.“ – bet ne būtina. |

---

## 3. Stilius ir nuoseklumas

### 3.1 Tonas ir brand balsas

- **EN:** Nuoseklus, tiesus, „product / SaaS“ stilius („Stop talking.“, „Start building.“, „Get access“). Tinkama edu/produkto puslapiui.
- **LT:** Atitinka tą patį toną; po pataisų bus gramatiškai ir stilistiškai sklandesnis.

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

### Būtina (gramatika / aiškumas)

1. **LT hero.members:** „500+ narys“ → **„500+ narių“**.
2. **LT hero.headline1:** „Nustok kalbėtis.“ → **„Nustok kalbėti.“**
3. **LT common.skipToContent:** „Praleisti į turinį“ → **„Pereiti prie turinio“** (arba panaši aiškesnė frazė).
4. **LT success.heading:** „Sėkmingas Diegimas“ → **„Sėkmingas diegimas“** (arba „Diegimas atliktas“).

### Pageidautina (stilius / simetrija)

5. **LT pricing.upgradeTo:** svarstyti **„Pagerinti iki %s“** vietoj „Upgrade į %s“ jei norima viskas lietuviškai.
6. **EN pricing.features:** pasirinktinai patikslinti **„Certificate (from 70% score)“** (arba palikti, jei kontekstas pakankamai aiškus).

### Palikti kaip yra

- Brand terminai (Lifetime access, Repo, Stripe Verified, AI Powered).
- Ilgesni sakiniai success.body – skaidūs, tik pasirinktinai galima trumpinti.
- „Promptų Anatomija“ abiejose kalbose.

---

## 6. Nuorodos į failus

- Vertimai: [frontend/src/i18n/translations/lt.json](../frontend/src/i18n/translations/lt.json), [frontend/src/i18n/translations/en.json](../frontend/src/i18n/translations/en.json).
- Raktų naudojimas: `t('key')` per [LocaleContext.jsx](../frontend/src/i18n/LocaleContext.jsx); komponentai – [Navbar](../frontend/src/components/Navbar.jsx), [Hero](../frontend/src/components/Hero.jsx), [Pricing](../frontend/src/components/Pricing.jsx), [Footer](../frontend/src/components/Footer.jsx), puslapiai Success/Cancel.

---

## 7. Santrauka

Vertimai apskritai **kokybiški** ir vartotojui **suprantami**. Lietuvių kalboje rekomenduojama pataisyti **narių**, **kalbėti**, **Pereiti prie turinio** ir **Sėkmingas diegimas** (arba atitikmenis), kad būtų gramatiškai ir stilistiškai sklandu. Anglų kalboje pakanka smulkių, pasirinktinių patikslinimų. Po šių pataisų abi kalbos atitiks profesionalių edu/produkto puslapių lygį ir bus nuoseklios vartotojo akimis.

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
