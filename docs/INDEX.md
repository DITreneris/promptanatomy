# Dokumentų indeksas

Vienas įėjimas į visus projekto dokumentus. Naudokite šį indeksą norėdami greitai rasti reikiamą failą (žmonės ir agentai).

---

## Projektas ir paleidimas

| Dokumentas | Kelias | Paskirtis |
|------------|--------|-----------|
| Pagrindinis README | [README.md](../README.md) | Struktūra, reikalavimai, paleidimas (backend/frontend), env, Stripe setup, backend testai. |
| Produkto aprašas (SOT) | [README_SOT.md](../README_SOT.md) | Turinys, moduliai, technologijos, deployment. |
| Darbų sąrašas | [TODO.md](../TODO.md) | Artimi darbai, žinomi trūkumai. Atnaujinti kartu su pakeitimais. |
| Changelog | [CHANGELOG.md](../CHANGELOG.md) | Pridėta / pakeista / taisymai pagal šabloną docs/templates/changelog-entry.md. |
| Kodo bazės analizė | [ANALIZE_KODO_BAZE.md](../ANALIZE_KODO_BAZE.md) | Istorinė analizė, spragos, rekomendacijos. |
| Mobilus UI / UX / vartotojo kelionė (LT–EN) auditas | [docs/audit-mobile-ux-user-journey.md](audit-mobile-ux-user-journey.md) | Mobilus UI, UX ir vartotojo kelionės auditas (LT/EN). |
| Kainodaros planas | [docs/pricing-plan.md](pricing-plan.md) | Produkto kainodara, geriausios praktikos, palyginimas su ES/pasauliu, klausimai patikslinimui. |
| Supabase user_access (MVP upgrade) | [docs/supabase-user-access.sql](supabase-user-access.sql) | SQL lentelės `user_access` kūrimui; highest_plan, email, stripe_customer_id. |
| Saugumas | [docs/security.md](security.md) | Kas įdiegta (secrets, CORS, validacija, rate limit, headers), produkcija (HTTPS), auditą, pageidaujami žingsniai. |
| Frontend i18n (LT/EN) | [README.md](../README.md#daugiakalbis-režimas-lten) | Vertimai `frontend/src/i18n/translations/`; kaip pridėti naują tekstą – docs/process/documentation.md. |

---

## Agentai ir orkestracija

| Dokumentas | Kelias | Paskirtis |
|------------|--------|-----------|
| Agentų orkestratorius | [AGENTS.md](../AGENTS.md) | Kuris agentas kada: frontend, backend, fullstack, q-and-a, quality-assurance. Lean ir tokenai. Nuorodos į agentus ir docs. |
| Frontend agentas | [.cursor/agents/frontend-agent.md](../.cursor/agents/frontend-agent.md) | React, Vite, Tailwind, api.js. |
| Backend agentas | [.cursor/agents/backend-agent.md](../.cursor/agents/backend-agent.md) | FastAPI, Stripe, limits.py. |
| Fullstack agentas | [.cursor/agents/fullstack-agent.md](../.cursor/agents/fullstack-agent.md) | Koordinacija frontend + backend. |
| Q&A agentas | [.cursor/agents/q-and-a-agent.md](../.cursor/agents/q-and-a-agent.md) | Klausimai apie projektą, dokumentaciją, procesus. |
| QA agentas | [.cursor/agents/quality-assurance-agent.md](../.cursor/agents/quality-assurance-agent.md) | Code review, saugumas, doc atnaujinimai. |

---

## Procesas ir dokumentacijos taisyklės

| Dokumentas | Kelias | Paskirtis |
|------------|--------|-----------|
| Development workflow | [docs/process/development.md](process/development.md) | Žingsniai: užduotis → agentas → kodas → QA → doc. |
| Ką dokumentuoti ir kada | [docs/process/documentation.md](process/documentation.md) | Kur atnaujinti README, TODO, docs; kas atnaujina. |
| ADR katalogas | [docs/decisions/](decisions/) | Architektūriniai sprendimai (ADR); šablonas – docs/templates/adr-template.md. |

---

## Šablonai

| Dokumentas | Kelias | Paskirtis |
|------------|--------|-----------|
| ADR šablonas | [docs/templates/adr-template.md](templates/adr-template.md) | Architecture Decision Record: kontekstas, galimybės, sprendimas, pasekmės. |
| Changelog įrašas | [docs/templates/changelog-entry.md](templates/changelog-entry.md) | Prideta / Pakeista / Taisymai. |

---

## Cursor taisyklės (rules)

| Taisyklė | Kelias | Scope |
|----------|--------|--------|
| Projektas (global) | [.cursor/rules/project-global.mdc](../.cursor/rules/project-global.mdc) | Visada: stack, secrets, dokumentacija, lean ir tokenai. |
| Frontend | [.cursor/rules/frontend.mdc](../.cursor/rules/frontend.mdc) | `frontend/**/*.{js,jsx}`. |
| Backend | [.cursor/rules/backend.mdc](../.cursor/rules/backend.mdc) | `backend/**/*.py`. |

---

## Greita nuoroda agentams

- **Pradėti darbą:** AGENTS.md → pasirinkti agentą → docs/process/development.md.
- **Klausimai apie projektą:** q-and-a-agent; šaltiniai: README.md, README_SOT.md, docs/, .cursor/rules.
- **Po pakeitimų:** quality-assurance-agent; doc atnaujinimai pagal docs/process/documentation.md.
- **Indeksas visada:** `docs/INDEX.md` (šis failas).
