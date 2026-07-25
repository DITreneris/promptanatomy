# Development workflow

1. **Užduotis** – nustatykite scope (frontend / backend / api / supabase / abu). Žiūrėkite [AGENTS.md](../../AGENTS.md) – kuris agentas tinkamas.
2. **Agentai** – deleguokite pagal failus: frontend-agent, backend-agent, **supabase-agent** (SQL/RLS/CHECK), arba fullstack-agent. Workflow SOT: `.cursor/skills/<id>/SKILL.md` (stub: `.cursor/agents/<id>.md`).
3. **Kodas** – implementacija laikantis `.cursor/rules/` (project-global, frontend.mdc, backend.mdc, **api.mdc**). **DoD Lygis A:** [dod_system.md](dod_system.md) §2.
4. **SEO/GEO** – jei keitėte `SeoHead`, `organization.js`, `geo-manifest.js`, `llms`/sitemap generatorius ar i18n FAQ/meta: CI GEO smoke turi likti žalias; po deploy – [seo-geo-operations.md](../seo-geo-operations.md) §E.
5. **Kokybe** – po reikšmingų pakeitimų paleiskite **quality-assurance-agent** (code review, saugumas, taisyklių laikymasis). **DoD Lygis B:** [dod_system.md](dod_system.md) §3.
6. **CI** – PR į `main`: workflow **CI** / job **Golden Legacy** turi būti žalias (tas pats regresijos rinkinys kaip [golden-legacy-standard.md](../golden-legacy-standard.md) 5 skyriuje).
7. **Dokumentacija** – jei pakeitimas liečia API, konfigūraciją, procesą ar **LP viešą copy** (Hero, WhatIs, Navbar skaičiai), atnaujinkite README, TODO arba `docs/` pagal [documentation.md](documentation.md) (įskaitant [golden-legacy-standard.md](../golden-legacy-standard.md) §1–3 ir [CHANGELOG.md](../../CHANGELOG.md), kai keičiasi kanoniniai faktai).
8. **Deploy** – po merge: produkcijos smoke ir env. **DoD Lygis C:** [dod_system.md](dod_system.md) §4.

Klausimams apie projektą ar dokumentaciją naudokite **q-and-a-agent**. Pilnas DoD checklist: [dod_system.md](dod_system.md) §6.
