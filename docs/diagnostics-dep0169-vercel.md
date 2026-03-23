# Diagnostika: Node DEP0169 (`url.parse`) Vercel loguose

## Kas rodoma

Produkcijoje Vercel **Logs** gali rodyti „Error“ su tekstu:

`(node:N) [DEP0169] DeprecationWarning: 'url.parse()' behavior is not standardized...`

**HTTP atsakas dažnai lieka 200** – tai **įspėjimas** (stderr), ne aplikacijos klaida. Vercel UI dažnai jį klasifikuoja kaip error.

## Ką patikrinome šiame repo (2026-03-23)

| Tikrinimas | Rezultatas |
|------------|------------|
| `api/*.js` – tiesioginis `url.parse()` / `require('url')` | **Nerasta** |
| `node_modules` (root priklausomybės) – tekstinė paieška `url.parse(` | **Nerasta** (greitas šaltinių scan) |
| `require('./api/access.js')` su **Node 24** ir `--trace-deprecation` | **Įspėjimo nėra** (tik modulio įkėlimas) |
| `createClient()` iš `@supabase/supabase-js` su Node 22 ir 24 + `--trace-deprecation` | **Įspėjimo nėra** (minimalus testas) |

**Lokalus Node** (developerių mašina) dažnai **v20** – ten DEP0169 gali **nebūti matomas** arba rečiau trigerintis nei Vercel runtime (pvz. **Node 22.x / 24.x**).

## Tikėtina priežastis

Įspėjimas atsiranda, kai **bet kuri** įkelta biblioteka arba **Node/Vercel serverless sluoksnis** iškviečia seną **`url.parse()`** API. Kadangi repo `api` handleriuose ir matomose priklausomybėse to neradome, **tikėtiniausia**:

1. **Vercel funkcijos runtime / užklausos apdorojimas** (ne jūsų repo kodas), arba  
2. **Transityvi priklausomybė** / elgsena tik **užklausos metu** (ne tik `require()`), kurios pilnai neatkartojame lokaliai be mock Supabase atsakymo.

## Kaip gauti tikslų šaltinį (stack trace) produkcijoje

1. **Vercel → Project → Settings → Environment Variables**  
2. Production: pridėti **`NODE_OPTIONS`** = **`--trace-deprecation`**  
3. **Redeploy**  
4. Pakartoti užklausą į `/api/access` (ar kitą funkciją) ir **Logs** – po įspėjimo bus **failo kelias** (`.../node_modules/...` arba Node vidinis).

**Po diagnostikos** rekomenduojama **`NODE_OPTIONS` pašalinti** (triukšmingesni logai, galimas našumo pėdsakas – minimalus).

## Lokali pakartoti (repo šaknyje)

```bash
npm run diagnose:dep0169
```

Jei įspėjimo nėra – tai **normalu**: Vercel Node versija / pilnas užklausos kelias skiriasi.

## Ką daryti toliau

- **Skubėti nereikia**, jei tik 200 ir nėra funkcionalių regresijų.  
- Jei stack trace rodo **konkretų npm paketą** – atnaujinti tą paketą arba sekti upstream issue.  
- Jei rodo **Vercel** – sekti [Vercel changelog](https://vercel.com/changelog) / support; jūsų `api/*.js` keisti nereikia, kol šaltinis ne jūsų kodas.

## Nuorodos

- Node issue (kontekstas): [nodejs/node#61816](https://github.com/nodejs/node/issues/61816) (DEP0169, `url.parse` / `url.resolve`)
