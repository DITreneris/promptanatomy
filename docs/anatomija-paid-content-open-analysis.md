# Analizė: kodėl mokamas turinys (/anatomija/) vis dar atviras

**Data:** 2026-03-19  
**Klausimas:** Kodėl https://www.promptanatomy.app/anatomija/ yra atviras visiems, nors turinys turėtų būti mokamas?

---

## 1. Architektūra (kur yra „vartos“)

| Sluoksnis | Kas vyksta šiame repo (059_home_page) |
|-----------|----------------------------------------|
| **Vercel / maršrutas** | `vercel.json`: `/anatomija/:path*` → `/anatomija/index.html`. **Nėra jokios serverio lygio apsaugos** – bet kas, atidaręs `/anatomija/`, gauna tą patį SPA (index.html + JS). |
| **API** | `api/verify-access.js` – tikrina magic link (access_tier, expires, token). Naudojamas **tik** tada, kai mokymų app (SPA) **pati** kreipiasi į šį endpointą. |
| **Mokymų app (submodulis)** | SPA iš `apps/prompt-anatomy` (DITreneris/inzinerija) buildinama ir servinama iš `frontend/dist/anatomija/`. **Prieigos kontrolė (gate) vyksta tik kliente** – SPA turi patikrinti tokeną/localStorage ir nerodyti mokamo turinio be prieigos. |

**Išvada:** Jei mokamas turinys matomas be apmokėjimo, priežastis yra **mokymų app (submodulio) logikoje**, o ne Vercel ar `verify-access` API. Serveris niekada neblokuoja `/anatomija/` – jis visada atiduoda SPA.

---

## 2. Galimos priežastys, kodėl turinys atviras

### A) Submodulio versija senesnė už „gate“ fix

CHANGELOG (šis repo) fiksuoja fix **mokymų app** repozitorijoje (inzinerija):

- Buvo **pašalintas `VITE_MVP_MODE=1` fallback**, kuris suteikdavo modulius 1–6 visiems be mokėjimo.
- Pridėtas **gate ekranas**, kai `maxAccessible === 0` (prieiga nepatikrinta).

Jei `apps/prompt-anatomy` šiame repozitorijuje nurodo į **senesnį** inzinerija commit (prieš šį fix), tada Vercel buildina būtent tą seną versiją – ir vartotojai vis dar gali matyti visą turinį.

**Ką patikrinti:**  
`git submodule status` (arba Vercel build logai) – į kokį inzinerija commit nurodo submodulis? Ar tas commit jau turi pakeitimus: `getMaxAccessibleModuleId()` be MVP fallback ir gate ekraną, kai `maxAccessible === 0`.

### B) Build be teisingo `VITE_VERIFY_ACCESS_URL`

Mokymų app turi kreiptis į magic link tikrinimą. TODO (submodulyje) mini:

- `VITE_VERIFY_ACCESS_URL` naudojamas `App.tsx`.

Jei production build'e šis kintamasis **nėra nustatytas** arba nurodo į neteisingą URL, SPA gali:

- niekada nekviesti `GET /api/verify-access`,
- arba kviesti, bet į klaidingą adresą (404) ir elgtis kaip „nėra prieigos“, bet **neparodyti** gate ekrano (pvz. rodomas pilnas UI su visais moduliais).

**Ką patikrinti:**  
Vercel → Project → Environment Variables: ar build'e (Build & Development) yra `VITE_VERIFY_ACCESS_URL` ir ar jis nurodo į `https://www.promptanatomy.app/api/verify-access` (arba tinkamą base URL). Taip pat inzinerija kode – ką daro app, jei `VITE_VERIFY_ACCESS_URL` nepasiekiamas arba neįvestas.

### C) Tiesioginis apsilankymas be parametrų

Vartotojas atidaro **https://www.promptanatomy.app/anatomija/** be `?access_tier=...&expires=...&token=...`.

Tada SPA turėtų:

1. Patikrinti `localStorage` (ar yra anksčiau išsaugotas `verified_access_tier`).
2. Jei nėra nei parametrų, nei validžios prieigos – rodyti **gate ekraną** („Prieiga ribota“ / CTA į LP/kainodarą), o ne modulių sąrašą ar turinį.

Jei mokymų app to nedaro (pvz. rodo pagrindinį ekraną su moduliais, kol asinchroniškai tikrina prieigą, arba iš viso netikrina, kai nėra URL parametrų), lankytojas be tokeno gali matyti sąrašą ar net turinį.

**Ką patikrinti:**  
Inzinerija repo: `App.tsx` (ar panašus entry) – ką rodoma **pirmą kartą** užkrovus `/anatomija/` be query params ir be nieko localStorage; ar būtinai rodomas gate, kai `maxAccessible === 0`.

### D) `VITE_MVP_MODE=1` build'e

`vercel.json` build'e naudojama:

```bash
VITE_BASE_PATH=/anatomija/ VITE_MVP_MODE=1 npm run build
```

CHANGELOG teigia, kad MVP fallback **pašalintas** inzinerija pusėje. Jei ten vis dar yra kodas, kuris pagal `VITE_MVP_MODE=1` suteikia prieigą prie visų modulių (pvz. `getMaxAccessibleModuleId()` grąžina 6), tai paaiškintų, kodėl turinys atviras.

**Ką patikrinti:**  
Inzinerija: `accessTier.ts` (arba ten, kur apskaičiuojamas max accessible module) – ar nėra jokio branch pagal `import.meta.env.VITE_MVP_MODE`.

---

## 3. Ką padaryti šiame repozitorijuje (059_home_page)

1. **Atnaujinti submodulį** į naujausią inzinerija main (arba commit, kuriame jau yra gate fix ir pašalintas MVP fallback):
   ```bash
   cd apps/prompt-anatomy && git fetch && git checkout main && git pull
   cd ../.. && git add apps/prompt-anatomy && git commit -m "chore: update prompt-anatomy submodule for access gate fix"
   ```
2. **Vercel env:** Įsitikinti, kad build'e (Build & Development) nustatytas **`VITE_VERIFY_ACCESS_URL`** (jei mokymų app jo reikalauja), pvz. `https://www.promptanatomy.app/api/verify-access`, kad SPA tikrintų prieigą per teisingą endpoint.
3. **Po deploy:** Atidaryti https://www.promptanatomy.app/anatomija/ **incognito** (be cookie/localStorage) ir patikrinti: ar rodomas gate ekranas („Prieiga ribota“ / nuoroda į LP), o ne modulių turinys.

---

## 4. Ilgalaikė idėja: serverio lygio apsauga (optional)

Kol kas **visas** apsauga – kliento pusėje (SPA). Norint stipresnės apsaugos:

- Galima pridėti **Vercel Middleware** (arba Edge Function), kuris užklausas į `/anatomija/*` (išskyrus galbūt statinius asset) peržiūri ir:
  - jei nėra cookie su session/magic link arba validžio token query – redirect į LP (`/` arba `/`#pricing),
  - arba servina „Prieiga uždrausta“ puslapį.

Tai reikalautų susitarti, kaip nustatyti cookie (pvz. po sėkmingo verify-access) ir kaip middleware tikrina prieigą. Dabar tai neįgyvendinta – visi gauna tą patį SPA.

---

## 5. Santrauka

| Priežastis | Kur tikrinti |
|------------|----------------|
| Senas submodulis be gate fix | `git submodule status`, inzinerija istorija |
| Neteisingas/trūkstamas verify URL | Vercel env `VITE_VERIFY_ACCESS_URL`, inzinerija App.tsx |
| Tiesioginis apsilankymas nerodo gate | Inzinerija: pirmas render be token/localStorage |
| MVP mode vis dar atrakina turinį | Inzinerija: accessTier / getMaxAccessibleModuleId |

**Pirmas žingsnis:** atnaujinti `apps/prompt-anatomy` į inzinerija versiją su gate fix ir įsitikinti, kad build'e nustatytas teisingas `VITE_VERIFY_ACCESS_URL`, tada perdeployinti ir patikrinti incognito.
