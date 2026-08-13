# Ką dokumentuoti ir kada

- **README.md** – struktūra, paleidimas, env kintamieji. Atnaujinti, kai keičiasi setup ar endpointai.
- **TODO.md** – artimi darbai, žinomi trūkumai. Atnaujinti kartu su feature/fix.
- **docs/process/** – workflow ir taisyklės (development.md, [dod_system.md](dod_system.md), [skill-evolution.md](skill-evolution.md), šis failas). Keičiami retai.
- **docs/templates/** – naudoti naujiems ADR arba changelog įrašams.
- **docs/decisions/** – svarbūs architektūriniai sprendimai (ADR). Pridėti, kai priimamas sprendimas su pasekmėmis.
- **Frontend i18n:** Vertimai – `frontend/src/i18n/translations/lt.json`, `en.json`. Home `/` ir `/en` — `forceLocale="en"`; `/lt` — LT. Browser locale (`navigator.language`) tik kai kelias nėra `/`, `/en`, `/lt` (`getInitialLocale`). Naujas tekstas – raktas į abu JSON ir `t('key')` per `useLocale()`. Raktų struktūra: `meta.*`, `nav.*`, `hero.*`, `whatIs.*`, `methodology.*`, `ecosystem.*`, `pricing.*`, `faq.*`, `footer.*`, `legal.*`, `success.*`, `cancel.*`, `common.*`, `errors.*`. Tas pats raktas ≠ tas pats sakinys; frontpage neilginti. **Kalbos gairės (LT/EN):** prekės ženklas, tu/bendratis, skoliniai, legal SPA vs static EN – [docs/language-guidelines-en-lt.md](../language-guidelines-en-lt.md). **Legal KISS:** crawler / refresh / direct URL → EN `privacy.html` / `terms.html`; GEO dump → `privacy.md` / `terms.md`; in-app Footer `Link` → SPA `useLocale()` + toggle. **LP kanonas ir regresija:** po reikšmingų Hero / WhatIs / Navbar / Ecosystem copy ar viešų skaičių – [CHANGELOG.md](../../CHANGELOG.md) ir [docs/golden-legacy-standard.md](../golden-legacy-standard.md) §1–3.
- **LP design system (UI polish):** Aktyvus auditas ir fazinis roadmap – [docs/design_system_roadmap2.md](../design_system_roadmap2.md). Po Phase implementacijos – pažymėti checklist doc'e; stat/copy pakeitimai – golden-legacy §1–3.
- **Supabase user_access (rankiniai tier pakeitimai):** Atnaujinkite [docs/user-access-tier-registry.md](../user-access-tier-registry.md) §3 (sąrašas + snapshot) ir [CHANGELOG.md](../../CHANGELOG.md); SQL konvencijos – [supabase-user-access.sql](../supabase-user-access.sql).

Kas atnaujina: tas, kas daro pakeitimą. Quality-assurance-agent gali priminti patikrinti, ar doc atnaujintas. **DoD doc matrica pagal pakeitimo tipą:** [dod_system.md](dod_system.md) §3.3.
