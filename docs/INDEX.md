# Dokumentų indeksas

**Vienintelis įėjimas** į projekto dokumentus – visi keliai ir paskirtys čia. Naudokite agentai ir žmonės. Lean struktūra – production deploy. Cursor taisyklės ir agentai remiasi šiuo indeksu.

---

## 1. Paleidimas ir projektas

| Dokumentas | Kelias | Paskirtis |
|------------|--------|-----------|
| Pagrindinis README | [README.md](../README.md) | Struktūra, reikalavimai, paleidimas (backend/frontend), env, Stripe, testai. |
| Produkto aprašas (SOT) | [README_SOT.md](../README_SOT.md) | Turinys, moduliai, technologijos, deployment. |
| Roadmap | [roadmap.md](../roadmap.md) | Fazės, prioritetai, deploy ir webhook žingsniai; nuoroda į phase-1-scope. |
| Darbų sąrašas | [TODO.md](../TODO.md) | Artimi darbai, žinomi trūkumai. |
| Changelog | [CHANGELOG.md](../CHANGELOG.md) | Pridėta / pakeista / taisymai. Šablonas: [templates/changelog-entry.md](templates/changelog-entry.md). |
| Versijų ir release valdymas | [docs/versioning-and-release.md](versioning-and-release.md) | Kur laikoma versija (config.js, package.json), SemVer, release žingsniai, git tag. |

---

## 2. Nuoroda (kanonas, saugumas, mokėjimai, SEO)

| Dokumentas | Kelias | Paskirtis |
|------------|--------|-----------|
| Saugumas | [docs/security.md](security.md) | Secrets, CORS, validacija, rate limit, headers, produkcija. |
| Saugumo auditas (gilus) | [docs/security-audit-deep.md](security-audit-deep.md) | Architektūra, jautrūs taškai, rizikos, industrijos praktikos, MOSCOW prioritetai. |
| Prieigos architektūra (kanonas) | [docs/access-architecture-canon.md](access-architecture-canon.md) | Viena tiesa: `user_access` po webhook; LP / magic link / antriniai keliai. |
| Mokėjimų praktikos | [docs/payment-best-practices.md](payment-best-practices.md) | Plan_id/plan_value, Stripe/Supabase/Vercel konvencijos, env, pitfalls. |
| Memo integracija (saugumas, 2025–2026) | [docs/memo-integration-security-analysis.md](memo-integration-security-analysis.md) | Magic-link su Mokymų sistema: HMAC, timing-safe, secret, redirect; geriausios praktikos. |
| Supabase user_access | [docs/supabase-user-access.sql](supabase-user-access.sql) | SQL lentelė: email, highest_plan, stripe_customer_id (santrauka). |
| Supabase migracijos | [docs/supabase-migrations.md](supabase-migrations.md) | Kanonas: `supabase/migrations/`; kaip pritaikyti; Vercel/FastAPI nevykdo SQL. |
| Bulk import (Excel → user_access) | [docs/bulk-import-user-access.md](bulk-import-user-access.md) | Akademijos dalyvių įkėlimas: `scripts/import_user_access.py`. |
| Supabase patobulinimų planas | [docs/supabase-hardening-plan.md](supabase-hardening-plan.md) | Detalus F0–F7 planas (RLS, webhook, rate limit); dalis įgyvendinta minimaliai. |
| SEO (KISS–Marry–Kill) | [docs/SEO-KISS-Marry-Kill.md](SEO-KISS-Marry-Kill.md) | Sitemap, robots, og:image, llms-full, GEO manifest, būsena. |
| Ekosistemos valdymas (hub-and-spoke) | [docs/ecosystem-governance.md](ecosystem-governance.md) | Domenų rolės, SEO/GEO/AI nekonkuravimo taisyklės, KPI minimumas. |
| Ekosistemos kanonas (9 domenų) | [docs/ecosystem-canon.md](ecosystem-canon.md) | Pipeline, LP 6 kortelės, sync taisyklės su geo-manifest ir i18n. |
| Kainodaros planas | [docs/pricing-plan.md](pricing-plan.md) | Kainodara, geriausios praktikos, palyginimas. |
| Faze 1 apimtis (2 produktai, moduliai 7+ lock) | [docs/phase-1-scope.md](phase-1-scope.md) | Kas parduodama Faze 1; tik planai 1–2; moduliai 7–15 užrakinti. |
| Kalbos gairės (LT/EN) | [docs/language-guidelines-en-lt.md](language-guidelines-en-lt.md) | Prekės ženklas, terminai, tonas, vertimai. |
| Public assets (frontend) | [frontend/public/README.md](../frontend/public/README.md) | Og-image ir statiniai failai (sitemap, robots). |
| Logo / favicon gairės | [docs/design/logo-favicon.md](design/logo-favicon.md) | Šaltinis, spalvos, dydžiai, Kiss–Marry–Kill taisyklės; generavimo scriptas. |
| Frontpage design system (aktyvus) | [docs/design_system_roadmap2.md](design_system_roadmap2.md) | LP dizaino sistema: **v1.0** (Phases 1–7 shipped), Primer benchmark §14, `@theme` + functional tokens, agentų checklist. QA: [process/design-system-qa.md](process/design-system-qa.md). |

*Istorinės analizės ir uždaryti auditai: [docs/archive/README.md](archive/README.md) (taip pat §4 žemiau).*

---

## 3. Deploy ir webhook

| Dokumentas | Kelias | Paskirtis |
|------------|--------|-----------|
| Deploy ir webhook | [docs/deploy-and-webhook.md](deploy-and-webhook.md) | Kas įdiegta (Vercel, serverless webhook), Vercel Firewall + saugos antraštės, troubleshooting (user_access tuščia), logai. |
| Vercel DEP0169 diagnostika (`url.parse` logai) | [docs/diagnostics-dep0169-vercel.md](diagnostics-dep0169-vercel.md) | Kas tai, repo tikrinimai, `NODE_OPTIONS=--trace-deprecation` produkcijoje, tolimesni žingsniai. |
| Test report | [docs/test_report.md](test_report.md) | SSL/TLS, LP prieigos tikrinimas (`user_access` / „No access found“), atsiliepimų fiksavimas (produkcija). |
| Production analytics (14d benchmark, archyvas) | [docs/archive/snapshots/production-analytics-14d-benchmark.md](archive/snapshots/production-analytics-14d-benchmark.md) | Post-deploy ~14 d. serverio metrikos (snapshot). |
| GSC snapshot (2026-06-04) | [docs/archive/snapshots/gsc-2026-06-04.md](archive/snapshots/gsc-2026-06-04.md) | 28d pages CTR/impressions; `/anatomija/` redirect check; Queries export checklist. |

---

## 4. Archyvuoti auditai ir analizės

| Dokumentas | Kelias | Paskirtis |
|------------|--------|-----------|
| Archyvo katalogas ir failų sąrašas | [docs/archive/README.md](archive/README.md) | Uždaryti LP/UI/SEO auditai, prieš-produkcinės analizės, metrikų snapshot'ai. |

---

## 5. Kokybė ir regresija

| Dokumentas | Kelias | Paskirtis |
|------------|--------|-----------|
| Golden Legacy Standard | [docs/golden-legacy-standard.md](golden-legacy-standard.md) | Fiksuota veikianti būsena: backend kontraktai, frontend maršrutai ir **LP vieša būsena** (Navbar, Hero, WhatIs statai, i18n raktai §1–3). Kas nekeičiama. Regresijos apsauga prieš pakeitimus. Automatinis CI: [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) (`main`, PR). |
| LP load-speed (baseline + budget) | [docs/performance-baseline.md](performance-baseline.md) | Bundle gzip matavimai, 180 KB critical-path biudžetas, Phase 1–3 roadmap, Lighthouse placeholder. |

---

## 6. Procesas ir šablonai

| Dokumentas | Kelias | Paskirtis |
|------------|--------|-----------|
| Dokumentacijos įvadas | [docs/README.md](README.md) | Trumpas įvadas į docs; visi dokumentai – šis INDEX. |
| Development workflow | [docs/process/development.md](process/development.md) | Užduotis → agentas → kodas → QA → doc. |
| Definition of Done (DoD) | [docs/process/dod_system.md](process/dod_system.md) | Vieninga „baigta“ sistema: užduotis → PR merge-ready → deploy; agentai, CI, checklist. |
| Ką dokumentuoti ir kada | [docs/process/documentation.md](process/documentation.md) | Kur atnaujinti README, TODO, docs; i18n raktai. |
| ADR katalogas | [docs/decisions/](decisions/) | Architektūriniai sprendimai. Šablonas žemiau. |
| ADR šablonas | [docs/templates/adr-template.md](templates/adr-template.md) | Architecture Decision Record. |
| Changelog įrašo šablonas | [docs/templates/changelog-entry.md](templates/changelog-entry.md) | Prideta / Pakeista / Taisymai. |

---

## 7. Cursor (agentai ir taisyklės)

Agentai ir `.cursor/rules/` remiasi **šiuo indeksu** (docs/INDEX.md) – dokumentų keliai ir paskirtys. Atnaujinant docs, palaikykite INDEX atitiktį.

| Dokumentas | Kelias | Paskirtis |
|------------|--------|-----------|
| Agentų orkestratorius | [AGENTS.md](../AGENTS.md) | Kuris agentas kada; lean ir tokenai; nuorodos į agentus; INDEX ir golden-legacy. |
| Frontend agentas | [.cursor/agents/frontend-agent.md](../.cursor/agents/frontend-agent.md) | React, Vite, Tailwind, api.js. |
| Backend agentas | [.cursor/agents/backend-agent.md](../.cursor/agents/backend-agent.md) | FastAPI, Stripe, limits. |
| Fullstack agentas | [.cursor/agents/fullstack-agent.md](../.cursor/agents/fullstack-agent.md) | Koordinacija frontend + backend. |
| Q&A agentas | [.cursor/agents/q-and-a-agent.md](../.cursor/agents/q-and-a-agent.md) | Klausimai apie projektą, dokumentaciją. |
| QA agentas | [.cursor/agents/quality-assurance-agent.md](../.cursor/agents/quality-assurance-agent.md) | Code review, saugumas, doc. |
| Taisyklės (rules) | [.cursor/rules/](../.cursor/rules/) | project-global.mdc, frontend.mdc, backend.mdc. |

---

## 8. Archyvas

| Dokumentas | Kelias | Paskirtis |
|------------|--------|-----------|
| Archyvo įvadas ir sąrašas | [docs/archive/README.md](archive/README.md) | Istorinė dokumentacija; `analysis/`, `audits/`, `snapshots/`. |
| Kodo bazės analizė (istorinė) | [docs/archive/ANALIZE_KODO_BAZE.md](archive/ANALIZE_KODO_BAZE.md) | Analizė iš laikotarpio, kai buvo tik react.txt + SOT. |

---

## Greita nuoroda agentams

- **Pradėti:** AGENTS.md → agentas → docs/process/development.md
- **Baigta (DoD):** docs/process/dod_system.md – Lygis A (implementacija) → B (PR + CI + QA) → C (deploy smoke)
- **Klausimai:** q-and-a-agent; šaltiniai: README.md, README_SOT.md, docs/
- **Po pakeitimų:** quality-assurance-agent; doc pagal docs/process/documentation.md
- **Regresija:** docs/golden-legacy-standard.md – ką nepalaužti; pytest + abu frontend build prieš merge; CI (`.github/workflows/ci.yml`) ant `main` / PR.
- **Indeksas visada:** docs/INDEX.md (šis failas)
