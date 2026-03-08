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

---

## 2. Nuoroda (konfigūracija, saugumas, mokėjimai, SEO)

| Dokumentas | Kelias | Paskirtis |
|------------|--------|-----------|
| Production readiness (analizė, bugai, checklist) | [docs/production-readiness-analysis.md](production-readiness-analysis.md) | Gili kodo bazės analizė prieš production; atlikti pataisymai ir rekomendacijos. |
| Saugumas | [docs/security.md](security.md) | Secrets, CORS, validacija, rate limit, headers, produkcija. |
| Saugumo auditas (gilus) | [docs/security-audit-deep.md](security-audit-deep.md) | Architektūra, jautrūs taškai, rizikos, industrijos praktikos, MOSCOW prioritetai. |
| Mokėjimų praktikos | [docs/payment-best-practices.md](payment-best-practices.md) | Plan_id/plan_value, Stripe/Supabase/Vercel konvencijos, env, pitfalls. |
| Supabase user_access | [docs/supabase-user-access.sql](supabase-user-access.sql) | SQL lentelė: email, highest_plan, stripe_customer_id. |
| SEO (KISS–Marry–Kill) | [docs/SEO-KISS-Marry-Kill.md](SEO-KISS-Marry-Kill.md) | Sitemap, robots, og:image, canonical, route meta, būsena. |
| Kainodaros planas | [docs/pricing-plan.md](pricing-plan.md) | Kainodara, geriausios praktikos, palyginimas. |
| Faze 1 apimtis (2 produktai, moduliai 7+ lock) | [docs/phase-1-scope.md](phase-1-scope.md) | Kas parduodama Faze 1; tik planai 1–2; moduliai 7–15 užrakinti. |
| Kalbos gairės (LT/EN) | [docs/language-guidelines-en-lt.md](language-guidelines-en-lt.md) | Prekės ženklas, terminai, tonas, vertimai. |
| Public assets (frontend) | [frontend/public/README.md](../frontend/public/README.md) | Og-image ir statiniai failai (sitemap, robots). |

---

## 3. Deploy ir webhook

| Dokumentas | Kelias | Paskirtis |
|------------|--------|-----------|
| Deploy ir webhook | [docs/deploy-and-webhook.md](deploy-and-webhook.md) | Kas įdiegta (Vercel, serverless webhook), troubleshooting (user_access tuščia), logai. |

---

## 4. Auditas ir kalbos

| Dokumentas | Kelias | Paskirtis |
|------------|--------|-----------|
| Mobilus UI / UX auditas | [docs/audit-mobile-ux-user-journey.md](audit-mobile-ux-user-journey.md) | Mobilus meniu, vartotojo kelionė, LT/EN. |
| Kalbos auditas (EN/LT) | [docs/audit-language-en-lt.md](audit-language-en-lt.md) | Gramatika, stilius, vertimai. |
| Premium UI/UX (MUST-SHOULD-WANT) | [docs/ux-premium-practices.md](ux-premium-practices.md) | Spalvos, šešėliai, micro-interactions, geriausios praktikos. |
| UI/UX/SEO MOSCOW planas | [docs/UI_UX_SEO_MOSCOW_PLAN.md](UI_UX_SEO_MOSCOW_PLAN.md) | Hero, konversija, SEO, turinys – ką keisti (tik front-end/turinys), ko neliesti. |

---

## 5. Kokybė ir regresija

| Dokumentas | Kelias | Paskirtis |
|------------|--------|-----------|
| Golden Legacy Standard | [docs/golden-legacy-standard.md](golden-legacy-standard.md) | Fiksuota veikianti būsena: backend kontraktai, frontend maršrutai ir LP struktūra, kas nekeičiama. Regresijos apsauga prieš pakeitimus. |

---

## 6. Procesas ir šablonai

| Dokumentas | Kelias | Paskirtis |
|------------|--------|-----------|
| Dokumentacijos įvadas | [docs/README.md](README.md) | Trumpas įvadas į docs; visi dokumentai – šis INDEX. |
| Development workflow | [docs/process/development.md](process/development.md) | Užduotis → agentas → kodas → QA → doc. |
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
| Archyvo įvadas | [docs/archive/README.md](archive/README.md) | Istorinė dokumentacija. |
| Kodo bazės analizė (istorinė) | [docs/archive/ANALIZE_KODO_BAZE.md](archive/ANALIZE_KODO_BAZE.md) | Analizė iš laikotarpio, kai buvo tik react.txt + SOT. |

---

## Greita nuoroda agentams

- **Pradėti:** AGENTS.md → agentas → docs/process/development.md
- **Klausimai:** q-and-a-agent; šaltiniai: README.md, README_SOT.md, docs/
- **Po pakeitimų:** quality-assurance-agent; doc pagal docs/process/documentation.md
- **Regresija:** docs/golden-legacy-standard.md – ką nepalaužti; pytest + frontend build prieš merge.
- **Indeksas visada:** docs/INDEX.md (šis failas)
