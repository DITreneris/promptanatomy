# Ką dokumentuoti ir kada

- **README.md** – struktūra, paleidimas, env kintamieji. Atnaujinti, kai keičiasi setup ar endpointai.
- **TODO.md** – artimi darbai, žinomi trūkumai. Atnaujinti kartu su feature/fix.
- **docs/process/** – workflow ir taisyklės (development.md, šis failas). Keičiami retai.
- **docs/templates/** – naudoti naujiems ADR arba changelog įrašams.
- **docs/decisions/** – svarbūs architektūriniai sprendimai (ADR). Pridėti, kai priimamas sprendimas su pasekmėmis.
- **Frontend i18n:** Vertimai – `frontend/src/i18n/translations/lt.json`, `en.json`. Naujas user-facing tekstas – pridėti raktą į abu failus ir naudoti `t('key')` (hook `useLocale()`). Raktų struktūra: `meta.*`, `nav.*`, `hero.*`, `methodology.*`, `ecosystem.*`, `pricing.*`, `footer.*`, `success.*`, `cancel.*`, `common.*`, `errors.*`.

Kas atnaujina: tas, kas daro pakeitimą. Quality-assurance-agent gali priminti patikrinti, ar doc atnaujintas.
