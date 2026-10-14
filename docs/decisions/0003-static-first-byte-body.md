# ADR-0003: Statinis body pirmame baite (be SSR, be prerender plugin)

**Data:** 2026-10-14.

## Kontekstas

Hub `index.html` body = `<div id="root"></div>`. Pirmame baite yra tik meta, canonical, hreflang ir JSON-LD ([generate-locale-static.mjs](../../frontend/scripts/generate-locale-static.mjs) nuo 2026-09-15); H1, hero, „Kas yra“, kainos ir FAQ atsiranda tik po JS. Penki išoriniai auditai (CRO / GEO / E-E-A-T / intl / tech SEO, 2026-10-14) ir 2026-10 GEO scorecard (#10: „Claude fetches `.app`, gets metadata only (JS)“) tai pažymi kaip vienintelę tikrą techninę skylę. Kanonas: [SEO-KISS-Marry-Kill.md](../SEO-KISS-Marry-Kill.md) KILL „SSR / Next.js“ ir „pilnas pre-render (Puppeteer / vite-plugin-prerender)“; hub sitemap **4 URL**; LP copy fiksuota [golden-legacy-standard.md](../golden-legacy-standard.md) §1–3.

## Galimybės

- A: SSR / Next.js migracija — KILL (stack permaina, be konversijos naudos).
- B: `vite-plugin-prerender` / Puppeteer snapshot — KILL (nauja priklausomybė, headless Chrome CI, lėtesnis build, snapshot drift vs React).
- C: Tas pats post-build skriptas (`generate-locale-static.mjs`) iš `en.json` / `lt.json` + `geo-manifest.js` įrašo semantinį HTML (H1, hero, „Kas yra“ su šešiais blokais, kainos, FAQ, nav nuorodos) į `#root`. React `createRoot().render()` perrašo (ne `hydrateRoot` — mismatch rizikos nėra). Inline guard `html.js [data-static-shell]{display:none}` paslepia statinį bloką tik kai JS vykdomas, todėl naršyklė nemato mirksėjimo, o crawleris be JS mato tekstą.

## Sprendimas

Pasirinkta **C**. Ribos:

- Tik `/`, `/lt`, `/en` (tas pats shell → ir SPA fallback maršrutai gauna EN bloką, bet jie `noindex` ir blokas paslėptas, kai JS veikia).
- Turinys **tik** iš esamų i18n raktų ir `SIX_BLOCKS` / `PUBLIC_PRICING` — jokios naujos LP kopijos, jokių naujų URL, sitemap lieka 4.
- Be klasių / stilių statiniame HTML; vienintelė CSS taisyklė — guard `index.html` `<head>`.
- Ne SSR, ne prerender priklausomybė; KISS KILL eilutės lieka galioti.

## Pasekmės

- Teigiamos: H1 / metodika / kainos / FAQ matomi `curl`, AI retrieveriams ir Googlebot raw HTML; LT pirmame baite — LT tekstas; CI gali tai asertinti.
- Neigiamos / ribos: HTML padidėja ~6–10 KB gzip (JS bundle biudžeto neliečia — `check-bundle-size.mjs` matuoja tik `dist/assets/*.js`); statinio bloko tekstas dubliuoja React, todėl keičiant i18n raktus pakanka `npm run build` — atskiro šaltinio nėra. Statinis blokas nėra dizaino sistema — jo niekas nemato naršyklėje su JS.
