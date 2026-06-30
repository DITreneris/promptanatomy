# Ką dokumentuoti ir kada

- **README.md** – struktūra, paleidimas, env kintamieji. Atnaujinti, kai keičiasi setup ar endpointai.
- **TODO.md** – artimi darbai, žinomi trūkumai. Atnaujinti kartu su feature/fix.
- **docs/process/** – workflow ir taisyklės (development.md, [dod_system.md](dod_system.md), [skill-evolution.md](skill-evolution.md), šis failas). Keičiami retai.
- **docs/templates/** – naudoti naujiems ADR arba changelog įrašams.
- **docs/decisions/** – svarbūs architektūriniai sprendimai (ADR). Pridėti, kai priimamas sprendimas su pasekmėmis.
- **Frontend i18n:** Vertimai – `frontend/src/i18n/translations/lt.json`, `en.json`. Numatytoji kalba EN; jei vartotojas dar nepasirinko (nėra `localStorage`), kalba nustatoma pagal naršyklę (`navigator.language`/`languages`). Naujas tekstas – raktas į abu JSON ir `t('key')` per `useLocale()`. Raktų struktūra: `meta.*`, `nav.*`, `hero.*`, `whatIs.*`, `methodology.*`, `ecosystem.*`, `pricing.*`, `footer.*`, `success.*`, `cancel.*`, `common.*`, `errors.*`. **Kalbos gairės (LT/EN):** prekės ženklas, terminai, tonas – [docs/language-guidelines-en-lt.md](../language-guidelines-en-lt.md). **LP kanonas ir regresija:** po reikšmingų Hero / WhatIs / Navbar copy ar viešų skaičių – [CHANGELOG.md](../../CHANGELOG.md) ir [docs/golden-legacy-standard.md](../golden-legacy-standard.md) §1–3.
- **LP design system (UI polish):** Aktyvus auditas ir fazinis roadmap – [docs/design_system_roadmap2.md](../design_system_roadmap2.md). Po Phase implementacijos – pažymėti checklist doc'e; stat/copy pakeitimai – golden-legacy §1–3.
- **Agentai / skills:** Keičiant elgseną – atnaujinkite lokaliai `.cursor/` (gitignore); repo – [AGENTS.md](../../AGENTS.md), [docs/INDEX.md](../INDEX.md) §7, [skill-evolution.md](skill-evolution.md).

Kas atnaujina: tas, kas daro pakeitimą. Quality-assurance-agent gali priminti patikrinti, ar doc atnaujintas. **DoD doc matrica pagal pakeitimo tipą:** [dod_system.md](dod_system.md) §3.3.
