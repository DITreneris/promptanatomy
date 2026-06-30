# Agentų orkestratorius

Prieš pradedant užduotį, nustatykite, kuris agentas tinkamiausias, ir deleguokite jam (Cursor subagent).

| Užduoties tipas | Agentas | Kada naudoti |
|-----------------|---------|--------------|
| **Frontend** – UI, React, Tailwind, komponentai, `api.js`, `accessDisplay.js` | `frontend-agent` | Keičiate tik `frontend/` dalį. |
| **Backend** – FastAPI `backend/`, Vercel `api/`, Stripe, webhook, tier | `backend-agent` | Keičiate `backend/` arba `api/*.js`. |
| **Pilnas kelias / integracija** | `fullstack-agent` | Frontend + `api/` + submodule; deploy, access tier, Vercel build. |
| **Klausimai** – apie projektą, dokumentaciją, deploy, prieigą | `q-and-a-agent` | „Kaip veikia“, „kur yra X“, tier 9 / prod smoke. |
| **Kokybe** – code review, saugumas, regresija | `quality-assurance-agent` | Po pakeitimų arba prieš PR/merge. |
| **Mišrios / deploy užduotys** | **orchestrator** skill | Routing + doc-loading: `.cursor/skills/orchestrator/SKILL.md` |

**Lean ir tokenai:** Prieš implementaciją apmąstykite ir patikrinkite kelią; nekurkite nereikalingų funkcijų. Taupykite tokenus: trumpi atsakymai, citavimas pagal failą/eilutę.

## Nuorodos į agentus

- **frontend-agent** – `.cursor/agents/frontend-agent.md`
- **backend-agent** – `.cursor/agents/backend-agent.md`
- **fullstack-agent** – `.cursor/agents/fullstack-agent.md`
- **q-and-a-agent** – `.cursor/agents/q-and-a-agent.md`
- **quality-assurance-agent** – `.cursor/agents/quality-assurance-agent.md`

## Skills (workflow + lessons)

- **Indeksas:** [.cursor/skills/README.md](.cursor/skills/README.md)
- **Orchestrator** (routing, doc-loading, deploy pipeline): [.cursor/skills/orchestrator/SKILL.md](.cursor/skills/orchestrator/SKILL.md)
- **Skill evolution** (kur rašyti pamokas): [docs/process/skill-evolution.md](docs/process/skill-evolution.md)

Kiekvienas agentas turi `.cursor/skills/<agent-id>/SKILL.md` + `lessons.md` (lokaliai). Parent skills = marketing monorepo (LP + Vercel API + deploy); training turinys – submodulyje `apps/prompt-anatomy`.

> **Git:** `.cursor/` neį repo (`.gitignore`). Šis failas (**AGENTS.md**) ir `docs/` – commitinami; agentų/skills turinį sinchronizuokite rankiniu būdu arba kopijuokite iš šablono po clone.

## Procesas ir dokumentacija

- **Dokumentų indeksas:** [docs/INDEX.md](docs/INDEX.md) – **vienintelis** šaltinis dokumentų kelių ir paskirčių; visi doc nuorodas tikrinti per INDEX.
- **Development workflow:** [docs/process/development.md](docs/process/development.md) – kaip naudoti agentus, QA, doc atnaujinimai.
- **Definition of Done:** [docs/process/dod_system.md](docs/process/dod_system.md) – užduotis → PR merge-ready (CI + QA) → deploy smoke.
- **Ką dokumentuoti:** [docs/process/documentation.md](docs/process/documentation.md).
- **Regresijos apsauga:** [docs/golden-legacy-standard.md](docs/golden-legacy-standard.md) – pytest + frontend build + submodule `build:production` (VITE_MAX_BUILD_MODULE=9).
- **LP copy (Hero, Kas yra, Navbar):** tekstai ir vieši skaičiai – `frontend/src/i18n/translations/en.json` / `lt.json`. Po reikšmingų pakeitimų – [CHANGELOG.md](CHANGELOG.md); kanoninę LP būseną (Navbar elgsena, hero bullets, WhatIs stat kortelės) atnaujinkite [docs/golden-legacy-standard.md](docs/golden-legacy-standard.md) §1–3; prekės ženklo juostą Navbar – [docs/language-guidelines-en-lt.md](docs/language-guidelines-en-lt.md) §1.
- **LP UI polish (dizaino sistema, CTA, tipografija, spacing):** prieš ad-hoc pakeitimus – [docs/design_system_roadmap2.md](docs/design_system_roadmap2.md); implementuokite fazėmis; regresija – golden-legacy + `npm run build`.

## Taisyklės

Projekto taisyklės (`.cursor/rules/`) – project-global, frontend.mdc, backend.mdc, **api.mdc**. Reikšmingi pakeitimai – docs arba README; kokybei **quality-assurance-agent**.
