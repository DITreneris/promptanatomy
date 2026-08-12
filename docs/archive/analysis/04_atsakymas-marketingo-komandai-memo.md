# Memo: Atsakymas marketingo puslapio komandai – kas padaryta mokymų app pusėje

**Kam:** Pagrindinės platformos (059_home_page, Stripe + Supabase) komanda  
**Nuo:** Mokymų app (Prompt Anatomy / inzinerija) kūrėjai  
**Data:** 2026-03-19  
**Tema:** Atsakymas į jūsų memo (01, 02, 03) – ką mes pakeitėme savo kode, kad mokamas turinys būtų uždarytas.

---

## 1. Trumpa santrauka

Visos jūsų prašytos užduotys **įgyvendintos**. Mokymų app dabar:

- **Pagal nutylėjimą blokuoja turinį** (rodo gate ekraną „Prieiga ribota").
- **Priima magic link** iš jūsų pusės ir tikrina per `GET /api/verify-access`.
- **Išsaugo prieigą į `localStorage`** (ne `sessionStorage`), kad vartotojas neprarastų prieigos uždarius tab'ą.
- **Nerodo modulių/turinio**, kol prieiga nepatvirtinta.

---

## 2. Kas konkrečiai pakeista

### 2.1 Pašalintas „visiems atvira" fallback

**Buvo:** Kode buvo eilutė, kuri pagal `VITE_MVP_MODE=1` (jūsų Vercel build parametras) automatiškai atrakindavo visus 6 modulius **visiems lankytojams** be jokio tikrinimo.

**Dabar:** Ši eilutė pašalinta. Pagal nutylėjimą prieiga = **0** (niekas neatrakinta). Turinys atsirakina **tik** po sėkmingos magic link verifikacijos arba jei `localStorage` jau turi patikrintą tier.

### 2.2 `sessionStorage` → `localStorage`

**Buvo:** Patikrintas `access_tier` buvo saugomas `sessionStorage` – prarasdavosi uždarius naršyklės tab'ą.

**Dabar:** Saugoma `localStorage`. Susimokėjęs vartotojas gali uždaryti tab'ą, grįžti kitą dieną ir vis tiek matyti turinį be naujo magic link.

Pridėta **vienkartinė migracija**: jei vartotojas jau turėjo reikšmę `sessionStorage`, ji automatiškai perkeliama į `localStorage` (ir iš `sessionStorage` pašalinama).

### 2.3 Gate ekranas (naujas)

Kai vartotojas neturi prieigos (`maxAccessible === 0`), vietoj modulių sąrašo rodomas **gate ekranas**:

- Pranešimas: „Prieiga ribota" (LT) / „Access restricted" (EN)
- Tekstas: „Norėdami naudoti mokymus, įsigykite prieigą."
- CTA mygtukas: **„Įsigyti prieigą"** → nukreipia į `https://www.promptanatomy.app/#pricing`

### 2.4 Magic link verifikacija (jau buvo, pataisyta)

Magic link srautas **veikia taip** (nepakitęs):

1. Vartotojas atkeliauja su URL: `?access_tier=6&expires=...&token=...`
2. Mūsų SPA kviečia `GET /api/verify-access` su šiais parametrais.
3. Jei **200** ir tier = 3 arba 6 → išsaugoma `localStorage`, moduliai atrakinami.
4. Jei **ne 200** → rodomas gate, URL parametrai išvalomi.

---

## 3. Kas lieka jūsų pusėje (nepasikeičia)

Jūsų checklist (iš 01 memo) iš mūsų pusės **viskas atlikta**:

| Checklist punktas                                                                | Statusas                                                                              |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| SPA kreipiasi į `GET /api/verify-access` su URL parametrais                      | **Padaryta**. Naudojamas `VITE_VERIFY_ACCESS_URL` arba fallback `/api/verify-access`. |
| Sėkmingas 200 → išsaugoti tier į `localStorage`, atrakinti modulius 1–3 arba 1–6 | **Padaryta**.                                                                         |
| Be magic link parametrų → tikrinti `localStorage`; jei yra – leisti prieigą      | **Padaryta**.                                                                         |
| Kai `maxAccessible === 0` → rodyti tik gate ekraną, nerodyti modulių/turinio     | **Padaryta**. Naujas `AccessGateScreen` komponentas.                                  |
| Pašalinta logika, kuri pagal `VITE_MVP_MODE=1` suteikia prieigą visiems          | **Padaryta**. Eilutė pašalinta.                                                       |

---

## 4. Ko reikia iš jūsų pusės (prieš/po deploy)

### 4.1 Prieš deploy (būtina)

1. **Atnaujinti submodulį** `apps/prompt-anatomy` į naujausią mūsų commit (kuriame yra šie pakeitimai):

   ```bash
   cd apps/prompt-anatomy && git fetch && git checkout main && git pull
   cd ../.. && git add apps/prompt-anatomy && git commit -m "chore: update prompt-anatomy submodule for access gate"
   ```

2. **Vercel env:** Įsitikinkite, kad build'e nustatytas **`VITE_VERIFY_ACCESS_URL`**:
   ```
   VITE_VERIFY_ACCESS_URL=https://www.promptanatomy.app/api/verify-access
   ```
   Jei šis kintamasis nenustatytas, mūsų kodas naudoja fallback `/api/verify-access` (reliatyvus path) — tai veiks, jei SPA servinama iš to paties domeno (`promptanatomy.app`). Bet saugiau nustatyti pilną URL.

### 4.2 Po deploy (patikrinti)

| Testas                                                                        | Laukiamas rezultatas                                                                         |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Atidaryti `/anatomija/` **incognito** (be cookie/localStorage)                | Matomas **gate ekranas** su „Prieiga ribota" ir CTA mygtuku. Moduliai/turinys **nerodomas**. |
| CTA mygtukas „Įsigyti prieigą"                                                | Nukreipia į `https://www.promptanatomy.app/#pricing`.                                        |
| Atidaryti su **validžiu magic link** (`?access_tier=6&expires=...&token=...`) | Turinys **rodomas**, moduliai 1–6 atrakinti. URL parametrai automatiškai pašalinami.         |
| Uždaryti tab'ą ir atidaryti `/anatomija/` iš naujo (tame pačiame naršyklėje)  | Turinys **vis dar rodomas** (prieiga išsaugota `localStorage`). Gate nerodomas.              |
| Atidaryti su **negaliojančiu** magic link (pasibaigęs `expires`)              | Matomas **gate ekranas**.                                                                    |

---

## 5. Ko NELIEČIAME

- **`VITE_MVP_MODE=1`** – vis dar naudojamas jūsų Vercel build'e. Tai **gerai** – šis flag dabar kontroliuoja tik build'o apimtį (kokie modulių duomenys įtraukiami: 1–6), bet **nebeatrakina prieigos**. Nereikia keisti build komandos.
- **`ACCESS_TOKEN_SECRET`** – mūsų SPA jo nenaudoja tiesiogiai. Verifikacija vyksta per jūsų `GET /api/verify-access` endpointą. Secret lieka tik jūsų serveryje.
- **Serverio maršrutas** `/anatomija/` – nieko keisti nereikia. SPA gate veikia kliento pusėje.

---

## 6. localStorage raktas (techninis detalas)

Jei kada reikės debuginti:

- **Raktas:** `verified_access_tier`
- **Reikšmės:** `"3"` (moduliai 1–3) arba `"6"` (moduliai 1–6)
- **Kur:** naršyklės `localStorage` (ne `sessionStorage`)
- **Valymas:** Jei reikia simuliuoti „naują vartotoją" – ištrinti šį raktą iš localStorage arba naudoti incognito.

---

**Klausimai:** kreiptis į mokymų app atsakingą asmenį.
