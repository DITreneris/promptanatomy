# Agentų orkestratorius

Prieš pradedant užduotį, nustatykite, kuris agentas tinkamiausias, ir deleguokite jam (Cursor subagent).

| Užduoties tipas | Agentas | Kada naudoti |
|-----------------|---------|--------------|
| **Frontend** – UI, React, Tailwind, komponentai, `api.js`, `accessDisplay.js`, hub SEO/GEO (`SeoHead`, `llms`, Org `sameAs`) | `frontend-agent` | Keičiate tik `frontend/` dalį (įskaitant LP SEO). |
| **Backend** – FastAPI `backend/`, Vercel `api/` (įsk. rate-limit), Stripe, webhook, tier | `backend-agent` | Keičiate `backend/` arba `api/*.js`. |
| **Supabase** – migracijos, RLS, CHECK, project registry | `supabase-agent` | SQL schema, multi-account; ne rankinis tier 9/12. |
| **Pilnas kelias / integracija** | `fullstack-agent` | Frontend + `api/` + submodule; deploy, access tier, Vercel build; GEO CI/post-deploy smoke. |
| **Klausimai** – apie projektą, dokumentaciją, deploy, prieigą, SEO/GEO | `q-and-a-agent` | „Kaip veikia“, „kur yra X“, tier 9/12 / corporate12 smoke / GSC / llms. |
| **Kokybe** – code review, saugumas, regresija, GEO smoke | `quality-assurance-agent` | Po pakeitimų arba prieš PR/merge. |
| **Mišrios / deploy užduotys** | **orchestrator** skill | Routing + doc-loading: `.cursor/skills/orchestrator/SKILL.md` |

**Lean ir tokenai:** Prieš implementaciją apmąstykite ir patikrinkite kelią; nekurkite nereikalingų funkcijų. Taupykite tokenus: trumpi atsakymai, citavimas pagal failą/eilutę.

## Nuorodos į agentus

Thin stubs (entry) → workflow SOT = atitinkamas `.cursor/skills/<id>/SKILL.md`.

- **frontend-agent** – `.cursor/agents/frontend-agent.md` → skill `frontend-agent`
- **backend-agent** – `.cursor/agents/backend-agent.md` → skill `backend-agent`
- **supabase-agent** – `.cursor/agents/supabase-agent.md` → skill `supabase-agent` (committed mirror: [docs/process/supabase-agent-runbook.md](docs/process/supabase-agent-runbook.md))
- **fullstack-agent** – `.cursor/agents/fullstack-agent.md` → skill `fullstack-agent`
- **q-and-a-agent** – `.cursor/agents/q-and-a-agent.md` → skill `q-and-a-agent`
- **quality-assurance-agent** – `.cursor/agents/quality-assurance-agent.md` → skill `quality-assurance-agent`

## Skills (workflow + lessons)

- **Indeksas:** [.cursor/skills/README.md](.cursor/skills/README.md)
- **Orchestrator** (routing, doc-loading, deploy pipeline): [.cursor/skills/orchestrator/SKILL.md](.cursor/skills/orchestrator/SKILL.md)
- **Skill evolution** (kur rašyti pamokas): [docs/process/skill-evolution.md](docs/process/skill-evolution.md)

Kiekvienas agentas turi thin stub `.cursor/agents/<id>.md` + `.cursor/skills/<agent-id>/SKILL.md` (+ `lessons.md` kai yra). **SKILL.md = workflow SOT.** Parent skills = marketing monorepo (LP + Vercel API + deploy); training turinys – submodulyje `apps/prompt-anatomy`.

> **Git:** `.cursor/` neį repo (`.gitignore`). Šis failas (**AGENTS.md**) ir `docs/` – commitinami; agentų/skills/rules turinį sinchronizuokite rankiniu būdu arba kopijuokite iš šablono po clone.

## Procesas ir dokumentacija

- **Dokumentų indeksas:** [docs/INDEX.md](docs/INDEX.md) – **vienintelis** šaltinis dokumentų kelių ir paskirčių; visi doc nuorodas tikrinti per INDEX.
- **Development workflow:** [docs/process/development.md](docs/process/development.md) – kaip naudoti agentus, QA, doc atnaujinimai.
- **Definition of Done:** [docs/process/dod_system.md](docs/process/dod_system.md) – užduotis → PR merge-ready (CI + QA) → deploy smoke.
- **Ką dokumentuoti:** [docs/process/documentation.md](docs/process/documentation.md).
- **Regresijos apsauga:** [docs/golden-legacy-standard.md](docs/golden-legacy-standard.md) – pytest + frontend build + submodule `build:corporate12` (VITE_MAX_BUILD_MODULE=12).
- **LP copy (Hero, Kas yra, Navbar):** tekstai ir vieši skaičiai – `frontend/src/i18n/translations/en.json` / `lt.json`. Po reikšmingų pakeitimų – [CHANGELOG.md](CHANGELOG.md); kanoninę LP būseną (Navbar elgsena, hero bullets, WhatIs stat kortelės) atnaujinkite [docs/golden-legacy-standard.md](docs/golden-legacy-standard.md) §1–3; prekės ženklo juostą Navbar – [docs/language-guidelines-en-lt.md](docs/language-guidelines-en-lt.md) §1.
- **LP UI polish (dizaino sistema, CTA, tipografija, spacing):** prieš ad-hoc pakeitimus – [docs/design_system_roadmap2.md](docs/design_system_roadmap2.md); implementuokite fazėmis; regresija – golden-legacy + `npm run build`.
- **SEO / GEO (hub):** kanonas [docs/SEO-KISS-Marry-Kill.md](docs/SEO-KISS-Marry-Kill.md); ops [docs/seo-geo-operations.md](docs/seo-geo-operations.md); citation scorecard [docs/templates/geo-citation-scorecard.md](docs/templates/geo-citation-scorecard.md). SOT: `organization.js` (Org/`sameAs`), `geo-manifest.js` (`LAST_UPDATED`, spokes). Be SSR; be spokes hub sitemap.

## Taisyklės

Projekto taisyklės (`.cursor/rules/`) – project-global, frontend.mdc, backend.mdc, **api.mdc**. Reikšmingi pakeitimai – docs arba README; kokybei **quality-assurance-agent**.
