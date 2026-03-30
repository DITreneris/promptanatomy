# Memo: Inzinerija komandai – prieigos „vartos“ (gate) sutvarkymas

**Kam:** Mokymų app (Prompt Anatomy / inzinerija) kūrėjams  
**Nuo:** Pagrindinės platformos (059_home_page, Stripe + Supabase) komanda  
**Tema:** Ką jūsų pusėje reikia sukonfigūruoti, kad mokamas turinys būtų uždarytas lankytojams be prieigos, bet **susimokėję vartotojai visada turėtų prieigą**.

**Svarbu:** Serverio konfigūracijos mūsų pusėje **nekeičiame**. Maršrutas `/anatomija/` visada aptarnauja tą patį SPA visiems. Prieigos kontrolė vyksta **tik jūsų aplikacijoje** (kliento pusėje): jūs nusprendžiate, kada rodyti „Prieiga ribota“, o kada – turinį.

---

## 1. Dabartinė problema

Dabar **mokamas turinys atviras visiems**: bet kas, atidaręs `https://www.promptanatomy.app/anatomija/`, gali matyti turinį be apmokėjimo. Priežastis – jūsų SPA nerodo „vartų“ (gate) lankytojams, kurie neturi validžios prieigos.

---

## 2. Ko NEREIKIA daryti (kad sistema neužsidarytų visiškai)

**Neperrakinkite susimokėjusių vartotojų.** Turi būti taip:

- **Jei vartotojas atėjo su validžiu magic link** (URL su `access_tier`, `expires`, `token`) – po sėkmingo tikrinimo **leisti prieigą** ir (pagal nutylėjimą) išsaugoti rezultatą (pvz. `verified_access_tier`) į `localStorage`, kad vėliau nebereikėtų nuorodos.
- **Jei vartotojas jau turi validžią prieigą** (pvz. anksčiau patikrintas tokenas išsaugotas `localStorage`) – **visada leisti prieigą**, nerodyti gate.
- **Gate („Prieiga ribota“) rodyti tik tada**, kai:
  - nėra magic link parametrų URL **arba** tokenas netinkamas / pasibaigęs,
  - **ir** nėra validžios prieigos `localStorage` (arba ji pasibaigė).

Trumpai: **uždaryti tik tiems, kurie tikrai neturi prieigos; atrakinti visus, kurie turi validžią nuorodą arba išsaugotą prieigą.**

---

## 3. Ką reikia sukonfigūruoti / įgyvendinti jūsų pusėje

### 3.1 Tikrinti prieigą per mūsų API

Mes jau turime endpointą **`GET /api/verify-access`**, kuris tikrina magic link parametrus:

- **URL:** `https://www.promptanatomy.app/api/verify-access` (produkcijoje).  
  Jūsų build'e turi būti nustatytas **`VITE_VERIFY_ACCESS_URL`** į šį adresą, kad SPA kreiptųsi į teisingą vietą (ne į savo origin be path arba į neteisingą domeną).
- **Query:** `?access_tier=3|6&expires=UNIX_TIMESTAMP&token=BASE64URL_HMAC`
- **200** – prieiga validi, atsakyme `{ "access_tier": 3 }` arba `{ "access_tier": 6 }`. Tada išsaugoti į `localStorage` ir atrakinti atitinkamus modulius.
- **400/401** – netinkami parametrai arba pasibaigęs linkas. Nerodyti turinio; rodyti gate.

Detalūs parametrų ir HMAC formatas – žr. [mokymu_komanda_memo.md](../../mokymu_komanda_memo.md).

### 3.2 Pirmas apsilankymas (be parametrų)

Kai vartotojas atidaro **`/anatomija/`** be jokių query parametrų:

1. Patikrinti `localStorage`: ar yra anksčiau išsaugota validži prieiga (pvz. `verified_access_tier` ir galiojimas).
2. Jei **yra** validži – rodyti turinį, atrakinti modulius pagal tier.
3. Jei **nėra** – rodyti **gate ekraną** („Prieiga ribota“ arba panašų tekstą + nuorodą į pagrindinį puslapį / kainodarą), **nerodyti** modulių sąrašo ar turinio.

### 3.3 Pašalinti „visiems atvira“ logiką

- **`VITE_MVP_MODE=1`** naudojamas build'e (mūsų Vercel build). Jūsų kode **neturėtų būti** tokios logikos: „jei `VITE_MVP_MODE=1`, duoti prieigą prie visų modulių be tikrinimo“. Toks fallback anksčiau lėmė, kad visi matė turinį. Default turi būti: **prieiga 0**, kol nėra validžios magic link verifikacijos arba validžios reikšmės iš `localStorage`.

### 3.4 Gate ekranas

Kai **`maxAccessible === 0`** (arba panašus jūsų kintamasis – prieiga nepatikrinta arba negalioja):

- Rodyti vieną aiškų **gate ekraną**: pvz. „Prieiga ribota“, „Norėdami naudoti mokymus, įsigykite prieigą“, ir CTA mygtuką / nuorodą į `https://www.promptanatomy.app/#pricing` (arba pagrindinį puslapį).
- Nerodyti modulių sąrašo, nei vidinio turinio, kol prieiga nepatvirtinta.

---

## 4. Build ir env (jūsų pusėje)

- **`VITE_VERIFY_ACCESS_URL`** – build metu (Vercel arba kur buildinate) nustatyti į `https://www.promptanatomy.app/api/verify-access`, kad SPA tikrintų magic link per mūsų API. Be šio kintamojo arba su neteisingu URL verifikacija gali neveikti ir vartotojai gali matyti gate net su validžiu linku (arba atvirkščiai – netikrinti ir viską atidaryti).
- **`ACCESS_TOKEN_SECRET`** – jūsų pusėje **nereikia** (verifikacija vyksta mūsų `GET /api/verify-access`). Jūs tik siunčiate parametrus į mūsų API ir naudojate atsakymą.

---

## 5. Santrauka – kas turi vykti

| Situacija | Laukiamas elgesys |
|----------|--------------------|
| Atėjo su validžiu magic link (URL su `access_tier`, `expires`, `token`) | Kviesti `GET /api/verify-access`; jei 200 – išsaugoti tier į `localStorage`, atrakinti modulius. **Leisti prieigą.** |
| Jau turi validžią reikšmę `localStorage` (pvz. anksčiau patikrintas tier) | **Leisti prieigą**, rodyti turinį pagal tier. **Nerodyti gate.** |
| Atėjo be parametrų ir nėra nieko `localStorage` | Rodyti **gate** („Prieiga ribota“ + CTA į LP/kainodarą). **Nerodyti turinio.** |
| Tokenas netinkamas arba pasibaigęs (`expires` praeityje) | Rodyti **gate**. Galima pasiūlyti „Grįžti į pradžią“ / nuorodą į LP. |

---

## 6. Checklist jūsų komandai

- [ ] SPA kreipiasi į `GET /api/verify-access` su URL parametrais; naudojamas `VITE_VERIFY_ACCESS_URL` (build env) = `https://www.promptanatomy.app/api/verify-access`.
- [ ] Sėkmingas 200 atsakymas – išsaugoti `access_tier` (arba panašiai) į `localStorage` ir atrakinti modulius 1–3 arba 1–6.
- [ ] Kai nėra magic link parametrų – tikrinti `localStorage`; jei ten validži tier – leisti prieigą.
- [ ] Kai `maxAccessible === 0` (nėra validžios prieigos) – rodyti **tik** gate ekraną, nerodyti modulių/turinio.
- [ ] Pašalinta bet kuri logika, kuri pagal `VITE_MVP_MODE=1` suteikia prieigą visiems be tikrinimo.
- [ ] Patikrinti: lankytojas be tokeno (incognito) mato gate; lankytojas su validžiu magic link – mato turinį; vartotojas su išsaugota prieiga – ir toliau mato turinį.

---

**Klausimai:** kreiptis į pagrindinės platformos atsakingą asmenį.

**Nuorodos:** Magic link formato ir HMAC spec – [mokymu_komanda_memo.md](../../mokymu_komanda_memo.md). Analizė, kodėl turinys dabar atviras – [anatomija-paid-content-open-analysis.md](anatomija-paid-content-open-analysis.md).
