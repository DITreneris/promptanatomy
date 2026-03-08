# Ką dokumentuoti ir kada

- **README.md** – struktūra, paleidimas, env kintamieji. Atnaujinti, kai keičiasi setup ar endpointai.
- **TODO.md** – artimi darbai, žinomi trūkumai. Atnaujinti kartu su feature/fix.
- **docs/process/** – workflow ir taisyklės (development.md, šis failas). Keičiami retai.
- **docs/templates/** – naudoti naujiems ADR arba changelog įrašams.
- **docs/decisions/** – svarbūs architektūriniai sprendimai (ADR). Pridėti, kai priimamas sprendimas su pasekmėmis.
- **Frontend i18n:** Vertimai – `frontend/src/i18n/translations/lt.json`, `en.json`. Numatytoji kalba EN; jei vartotojas dar nepasirinko (nėra `localStorage`), kalba nustatoma pagal naršyklę (`navigator.language`/`languages`). Naujas tekstas – raktas į abu JSON ir `t('key')` per `useLocale()`. Raktų struktūra: `meta.*`, `nav.*`, `hero.*`, `methodology.*`, `ecosystem.*`, `pricing.*`, `footer.*`, `success.*`, `cancel.*`, `common.*`, `errors.*`. **Kalbos gairės (LT/EN):** prekės ženklas, terminai, tonas – [docs/language-guidelines-en-lt.md](../language-guidelines-en-lt.md).

Kas atnaujina: tas, kas daro pakeitimą. Quality-assurance-agent gali priminti patikrinti, ar doc atnaujintas.
