# Dokumentų indeksas

**Vienintelis įėjimas** į projekto dokumentus – visi keliai ir paskirtys čia. Lean struktūra – tik aktyvūs operaciniai SOT; istorija → [archive/README.md](archive/README.md).

---

## 1. Paleidimas ir projektas

| Dokumentas | Kelias | Paskirtis |
|------------|--------|-----------|
| Pagrindinis README | [README.md](../README.md) | Struktūra, paleidimas, env, Stripe, testai. |
| Training content / vizija | [README_SOT.md](../README_SOT.md) | Mokymų turinio vizija (gali atsilikti nuo hub M1–12). Deploy SOT = README + golden-legacy. |
| Roadmap | [roadmap.md](../roadmap.md) | Foundation Faze 1–3 + horizontas iki **2027-01-01**. |
| Darbų sąrašas | [TODO.md](../TODO.md) | Atviri darbai su tag'ais `[A.x]`…`[D.x]`. |
| Changelog | [CHANGELOG.md](../CHANGELOG.md) | Pridėta / pakeista / taisymai. |
| Versijų ir release | [versioning-and-release.md](versioning-and-release.md) | SemVer, release žingsniai, git tag. |
| Magic-link spec (root) | [memo.md](../memo.md) | HMAC URL formatas platforma → training SPA. |

---

## 2. Kanonas ir regresija

| Dokumentas | Kelias | Paskirtis |
|------------|--------|-----------|
| Golden Legacy Standard | [golden-legacy-standard.md](golden-legacy-standard.md) | Fiksuota LP būsena, backend kontraktai, CI regresija. |
| Faze 1 apimtis | [phase-1-scope.md](phase-1-scope.md) | Checkout produktai (max mod 6); ne training tier limit. |
| Prieigos architektūra | [access-architecture-canon.md](access-architecture-canon.md) | `user_access` po webhook; LP / magic link. |
| Kalbos gairės (LT/EN) | [language-guidelines-en-lt.md](language-guidelines-en-lt.md) | Prekės ženklas, tu/bendratis, legal SPA vs static EN. |
| LP design system | [design_system_roadmap2.md](design_system_roadmap2.md) | Dizaino sistema **v1.0** + **v1.1 hygiene** (2026-08-13). QA: [process/design-system-qa.md](process/design-system-qa.md). Typeface: [ADR-0001](decisions/0001-lp-system-typeface.md) (OS sans, be webfonto). |
| Load-speed biudžetas | [performance-baseline.md](performance-baseline.md) | Bundle gzip, critical-path biudžetas. |
| user_access tier registry | [user-access-tier-registry.md](user-access-tier-registry.md) | highest_plan 3/6/9/12; operator snapshot. |

---

## 3. Operacijos (deploy, saugumas, mokėjimai, Supabase)

| Dokumentas | Kelias | Paskirtis |
|------------|--------|-----------|
| Deploy ir webhook | [deploy-and-webhook.md](deploy-and-webhook.md) | Vercel, webhook, env checklist, troubleshooting. |
| Saugumas (live SOT) | [security.md](security.md) | Secrets, CORS, rate limit, headers, produkcija. |
| Mokėjimų praktikos | [payment-best-practices.md](payment-best-practices.md) | plan_id/plan_value, Stripe/Supabase konvencijos. |
| Supabase user_access SQL | [supabase-user-access.sql](supabase-user-access.sql) | Lentelės santrauka. |
| Supabase migracijos | [supabase-migrations.md](supabase-migrations.md) | `supabase/migrations/` kanonas. |
| Supabase project registry | [supabase-project-registry.md](supabase-project-registry.md) | Multi-account žemėlapis, operator checklist. |
| Supabase agent runbook | [process/supabase-agent-runbook.md](process/supabase-agent-runbook.md) | Migracijos, RLS, webhook reliability. |
| Bulk import | [bulk-import-user-access.md](bulk-import-user-access.md) | Excel → `user_access` (`scripts/import_user_access.py`). |
| Training submodule pin | [apps/prompt-anatomy/docs/deployment/MARKETING_SUBMODULE_PIN_CORPORATE12.md](../apps/prompt-anatomy/docs/deployment/MARKETING_SUBMODULE_PIN_CORPORATE12.md) | Corporate12 cutover; pin: golden-legacy §4. |

---

## 4. SEO / GEO / ekosistema

| Dokumentas | Kelias | Paskirtis |
|------------|--------|-----------|
| SEO (KISS–Marry–Kill) | [SEO-KISS-Marry-Kill.md](SEO-KISS-Marry-Kill.md) | Sitemap, llms, Org sameAs, GEO manifest. |
| SEO / GEO operacijos | [seo-geo-operations.md](seo-geo-operations.md) | GSC, IndexNow, post-deploy smoke. |
| GEO citation scorecard | [templates/geo-citation-scorecard.md](templates/geo-citation-scorecard.md) | Monthly AI citation prompts; snapshots → archive. |
| Ekosistemos kanonas | [ecosystem-canon.md](ecosystem-canon.md) | 9 domenų pipeline, LP kortelės. |
| Ekosistemos valdymas | [ecosystem-governance.md](ecosystem-governance.md) | Hub-and-spoke taisyklės, KPI. |
| Sibling memo (footer) | [sibling_memo.md](sibling_memo.md) | QW1b handoff spoke repo. |
| Logo / favicon | [design/logo-favicon.md](design/logo-favicon.md) | Spalvos, dydžiai, generavimas. |
| Public assets | [frontend/public/README.md](../frontend/public/README.md) | Og-image, sitemap, robots. |

---

## 5. Procesas, šablonai, agentai

| Dokumentas | Kelias | Paskirtis |
|------------|--------|-----------|
| Docs įvadas | [README.md](README.md) | Trumpas įvadas; visi keliai – šis INDEX. |
| Development workflow | [process/development.md](process/development.md) | Užduotis → agentas → kodas → QA → doc. |
| Definition of Done | [process/dod_system.md](process/dod_system.md) | Užduotis → PR → deploy smoke. |
| Skill evolution | [process/skill-evolution.md](process/skill-evolution.md) | lessons.md formatas, agentų higiena. |
| Ką dokumentuoti | [process/documentation.md](process/documentation.md) | README, TODO, CHANGELOG, i18n. |
| ADR katalogas | [decisions/](decisions/) | Architektūriniai sprendimai. |
| Šablonai | [templates/](templates/) | ADR, changelog, GEO scorecard. |
| Agentų orkestratorius | [AGENTS.md](../AGENTS.md) | Routing, skills, lean taisyklės. |

---

## 6. Archyvas

Istorinės analizės, auditai, snapshot'ai, vienkartinės diagnostikos – **[archive/README.md](archive/README.md)**. Ten: pre-launch gate'ai, LP auditai, GSC/PageSpeed/GEO baseline, security/hardening planai, root memo failai.

**Nenaudokite archyvo kaip kasdienio SOT** – grįžkite į §1–5 arba [archive/README.md](archive/README.md) tik istoriniam kontekstui.

---

## Greita nuoroda agentams

- **Pradėti:** AGENTS.md → agentas → process/development.md
- **Baigta:** process/dod_system.md (Lygis A → B → C)
- **Klausimai:** q-and-a-agent; deploy SOT = README + golden-legacy (ne README_SOT)
- **Regresija:** golden-legacy-standard.md + CI (`.github/workflows/ci.yml`)
- **Indeksas:** docs/INDEX.md (šis failas)
