# Agentų orkestratorius

Prieš pradedant užduotį, nustatykite, kuris agentas tinkamiausias, ir deleguokite jam (Cursor subagent).

| Užduoties tipas | Agentas | Kada naudoti |
|-----------------|---------|--------------|
| **Frontend** – UI, React, Tailwind, komponentai, `api.js` | `frontend-agent` | Keičiate tik `frontend/` dalį (puslapiai, komponentai, stiliai, API kvietimai iš UI). |
| **Backend** – API, Stripe, webhook, tokenų limitas, Python | `backend-agent` | Keičiate `backend/` (endpointai, limits.py, Stripe logika, env). |
| **Pilnas kelias / integracija** | `fullstack-agent` | Užduotis liečia ir frontend, ir backend (pvz. naujas API endpoint + naujas UI mygtukas). Koordinuokite abu sluoksnius. |
| **Klausimai** – apie projektą, dokumentaciją, procesus | `q-and-a-agent` | Reikia paaiškinti „kaip veikia“, „ką reiškia“, „kur yra X“. |
| **Kokybe** – code review, saugumas, taisyklių laikymasis | `quality-assurance-agent` | Po kodo pakeitimų arba prieš PR/merge. |

**Lean ir tokenai:** Prieš implementaciją apmąstykite ir patikrinkite kelią; nekurkite nereikalingų funkcijų. Taupykite tokenus: trumpi atsakymai, citavimas pagal failą/eilutę.

## Nuorodos į agentus

- **frontend-agent** – `.cursor/agents/frontend-agent.md`
- **backend-agent** – `.cursor/agents/backend-agent.md`
- **fullstack-agent** – `.cursor/agents/fullstack-agent.md`
- **q-and-a-agent** – `.cursor/agents/q-and-a-agent.md`
- **quality-assurance-agent** – `.cursor/agents/quality-assurance-agent.md`

## Procesas ir dokumentacija

- **Dokumentų indeksas:** [docs/INDEX.md](docs/INDEX.md) – **vienintelis** šaltinis dokumentų kelių ir paskirčių; visi doc nuorodas tikrinti per INDEX.
- **Development workflow:** [docs/process/development.md](docs/process/development.md) – kaip naudoti agentus, QA, doc atnaujinimai.
- **Definition of Done:** [docs/process/dod_system.md](docs/process/dod_system.md) – užduotis → PR merge-ready (CI + QA) → deploy smoke.
- **Ką dokumentuoti:** [docs/process/documentation.md](docs/process/documentation.md).
- **Regresijos apsauga:** [docs/golden-legacy-standard.md](docs/golden-legacy-standard.md) – prieš merge: backend `pytest`, frontend `npm run build`; ką nepalaužti.
- **LP copy (Hero, Kas yra, Navbar):** tekstai ir vieši skaičiai – `frontend/src/i18n/translations/en.json` / `lt.json`. Po reikšmingų pakeitimų – [CHANGELOG.md](CHANGELOG.md); kanoninę LP būseną (Navbar elgsena, hero bullets, WhatIs stat kortelės) atnaujinkite [docs/golden-legacy-standard.md](docs/golden-legacy-standard.md) §1–3; prekės ženklo juostą Navbar – [docs/language-guidelines-en-lt.md](docs/language-guidelines-en-lt.md) §1.
- **LP UI polish (dizaino sistema, CTA, tipografija, spacing):** prieš ad-hoc pakeitimus – [docs/design_system_roadmap2.md](docs/design_system_roadmap2.md); implementuokite fazėmis; regresija – golden-legacy + `npm run build`.

## Taisyklės

Projekto taisyklės (`.cursor/rules/`) nurodo stack, konvencijas ir rekomenduoja atitinkamą agentą pagal keičiamus failus. Reikšmingi pakeitimai – atnaujinti docs arba README; kokybei naudokite **quality-assurance-agent**.
