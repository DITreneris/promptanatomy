# Architecture Decision Records (ADR)

Architektūriniai sprendimai su pasekmėmis laikomi čia. Naudokite [docs/templates/adr-template.md](../templates/adr-template.md) naujiems įrašams.

| ADR | Sprendimas |
|-----|------------|
| [0001-lp-system-typeface.md](0001-lp-system-typeface.md) | LP typeface = OS sans (`ui-sans-serif, system-ui`); webfontas tik su atskiru performance PR. |
| [0002-hub-glossary-wont.md](0002-hub-glossary-wont.md) | Viešas training Žodynėlis ant hub `.app` = WON’T (ne `/glossary`, ne sitemap plėtra). |
| [0003-static-first-byte-body.md](0003-static-first-byte-body.md) | Statinis body `#root` iš i18n + `geo-manifest` pirmame baite (`generate-locale-static.mjs`); ne SSR, ne prerender plugin; sitemap lieka 4. |
