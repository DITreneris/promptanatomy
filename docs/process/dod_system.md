# Definition of Done (DoD) sistema

**Tikslas:** Viena aiški „baigta“ apibrėžtis visiems darbams – nuo vieno agento užduoties iki merge ir deploy. Sujungia tai, kas šiandien išskaidyta per [development.md](development.md), [documentation.md](documentation.md), [quality-assurance-agent](../../.cursor/agents/quality-assurance-agent.md), [golden-legacy-standard.md](../golden-legacy-standard.md) ir CI.

**Principai (lean):**
- DoD **proporcingas** pakeitimui – docs-only fix nereikalauja rankinio UX smoke.
- **Automatiniai vartai** (CI) – privalomi merge; **rankiniai** – pagal riziką ir pakeitimo tipą.
- Kanonas lieka atskiruose doc: regresija – [golden-legacy-standard.md](../golden-legacy-standard.md); LP UI – [design_system_roadmap2.md](../design_system_roadmap2.md) + [design-system-qa.md](design-system-qa.md); saugumas – [security.md](../security.md).

---

## 1. Trys DoD lygiai

| Lygis | Kada | Kas patvirtina |
|-------|------|----------------|
| **A. Užduotis atlikta** | Implementuojantis agentas / developer baigia scope | Tas, kas darė (frontend / backend / fullstack agentas) |
| **B. PR merge-ready** | Prieš merge į `main` | **quality-assurance-agent** + žalias CI |
| **C. Release / deploy done** | Po push į `main` ir Vercel deploy | Operatorius (rankinis smoke + monitoring) |

---

## 2. Lygis A – Užduotis atlikta (implementacija)

**Visiems pakeitimams (būtina):**

- [ ] Scope atitinka užduotį; nėra nereikalingo kodo („ateičiai“ modulių).
- [ ] Laikomasi `.cursor/rules/` ([project-global](../../.cursor/rules/project-global.mdc), [frontend](../../.cursor/rules/frontend.mdc), [backend](../../.cursor/rules/backend.mdc), [api](../../.cursor/rules/api.mdc)).
- [ ] Jokių secretų kode; nauji env – tik `.env.example` (be realių reikšmių).
- [ ] Pakeitimai **minimalūs** – tik tai, ko reikalauja užduotis.
- [ ] **Skills:** prieš „padaryta“ – peržiūrėti atitinkamą `.cursor/skills/<agent>/SKILL.md`; nauja sesijos pamoka → `lessons.md` ([skill-evolution.md](skill-evolution.md)).

**Pagal sluoksnį (jei liečia):**

| Sluoksnis | Kriterijai |
|-----------|------------|
| **Frontend** | Funkciniai komponentai + hooks; API tik per `frontend/src/api.js`; Tailwind; prieigos UI – `accessDisplay.js` (ne hardcoded `/6`). |
| **Backend (FastAPI)** | Pydantic request/response; `HTTPException`; config iš env; `logger` (ne `print`); webhook – raw body + signature; `token_limits.py`. |
| **Vercel `api/`** | Handler `res.status().json()`; CORS whitelist; tier `[3, 6, 9]`; JSON `detail` errors. |
| **Fullstack** | Kontraktas `api.js` ↔ `api/*.js`; E2E srautas patikrintas (Check access → magic link → `/anatomy/`). |

**Lokalus greitas patikrinimas (rekomenduojama prieš QA):**

```bash
# Jei keitėte atitinkamą dalį:
cd backend && pytest
cd frontend && npm run build
cd apps/prompt-anatomy && VITE_BASE_PATH=/anatomy/ VITE_MAX_BUILD_MODULE=9 npm run build:production   # jei liečia training / submodule
```

---

## 3. Lygis B – PR merge-ready

### 3.1 Automatiniai vartai (privaloma)

CI job **Golden Legacy** ([`.github/workflows/ci.yml`](../../.github/workflows/ci.yml)) turi būti **žalias**:

| Step | Ką tikrina |
|------|------------|
| `frontend` build | LP kompiliuojasi |
| Bundle size budget | [performance-baseline.md](../performance-baseline.md) – critical-path gzip |
| GEO smoke | `llms-full.txt`, `robots.txt` (PerplexityBot), manifest turinys |
| Training app build | `apps/prompt-anatomy` su `VITE_BASE_PATH=/anatomy/` |
| `backend` pytest | API kontraktai ir regresija |

*GitHub branch ruleset:* rekomenduojama **Require status checks** → `Golden Legacy` ([golden-legacy-standard.md §5.1](../golden-legacy-standard.md)).

### 3.2 QA agentas (privaloma reikšmingiems pakeitimams)

Paleiskite **quality-assurance-agent** prieš merge, jei keitėte:

- `frontend/`, `backend/`, `api/`, `vercel.json`, CI, submodulį, i18n copy, Stripe/webhook, Supabase migracijas.

**QA prioritetai:** critical (must fix) → warnings → suggestions. Žr. agento checklist: [.cursor/agents/quality-assurance-agent.md](../../.cursor/agents/quality-assurance-agent.md).

### 3.3 Dokumentacija (pagal pakeitimo tipą)

| Pakeitimo tipas | Privaloma atnaujinti |
|-----------------|----------------------|
| Setup, env, endpointai | [README.md](../../README.md), [backend/.env.example](../../backend/.env.example) |
| Artimi darbai / trūkumai | [TODO.md](../../TODO.md) |
| Architektūrinis sprendimas | ADR [docs/decisions/](../decisions/) |
| **LP viešas copy** (Hero, WhatIs, Navbar skaičiai) | `en.json` + `lt.json`, [CHANGELOG.md](../../CHANGELOG.md), [golden-legacy-standard.md §1–3](../golden-legacy-standard.md), [language-guidelines-en-lt.md §1](../language-guidelines-en-lt.md) jei brand row |
| LP UI / dizaino sistema | [design_system_roadmap2.md](../design_system_roadmap2.md) checklist; [design-system-qa.md](design-system-qa.md) jei vizualinis scope |
| API kontraktai / maršrutai | [golden-legacy-standard.md §2–3](../golden-legacy-standard.md) + pytest |
| Deploy / webhook elgsena | [deploy-and-webhook.md](../deploy-and-webhook.md) |
| Naujas docs failas | [docs/INDEX.md](../INDEX.md) |

Pilnas sąrašas: [documentation.md](documentation.md).

### 3.4 Rankiniai vartai (pagal riziką)

**Visada rekomenduojama** (LP / checkout / prieiga):

- [ ] Smoke pagal [golden-legacy-standard.md §3](../golden-legacy-standard.md) – maršrutai `/`, `/lt`, `/en`, kalbos perjungimas, pricing forma, magic link flow (jei liečia).

**Jei keitėte UI / Navbar / Hero / Pricing:**

- [ ] [design-system-qa.md](design-system-qa.md) – viewport 375 / 768 / 1280, mobile drawer, a11y smoke.

**Jei keitėte mokėjimus / webhook / `user_access`:**

- [ ] Sutampa su [access-architecture-canon.md](../access-architecture-canon.md) ir [payment-best-practices.md](../payment-best-practices.md).
- [ ] Webhook naudoja tą pačią magic-link logiką visuose keliuose (žr. golden-legacy §4).

**Jei keitėte SEO / GEO:**

- [ ] `npm run build` generuoja `dist/sitemap.xml`, `llms-full.txt`; statiniai URL 200 po deploy (golden-legacy §4).

**Jei keitėte Supabase schemą:**

- [ ] Migracija `supabase/migrations/`; [supabase-migrations.md](../supabase-migrations.md); nevykdyti SQL per Vercel/FastAPI deploy.

**Docs-only pakeitimai:** pakanka Lygio A + INDEX nuorodos; CI neprivalomas, jei nekeičiamas kodas (bet rekomenduojama, jei PR maišo doc + kodą).

---

## 4. Lygis C – Release / deploy done

Po sėkmingo merge į `main` ir Vercel auto-deploy:

1. **Submodulio tvarka** (jei keitėte training app): pirmiausia push submodulyje, tada parent repo su atnaujinta reference ([golden-legacy-standard.md §5](../golden-legacy-standard.md)).
2. **Produkcijos smoke** (operatorius):
   - [ ] LP atsidaro; `/lt`, `/en` veikia.
   - [ ] Checkout arba prieigos forma (jei liečia release scope).
   - [ ] `GET /health` (jei backend deploy).
   - [ ] Statiniai: `/sitemap.xml`, `/robots.txt`, `/llms-full.txt` → 200.
3. **Env** Vercel / backend: nauji kintamieji įdiegti ([deploy-and-webhook.md](../deploy-and-webhook.md)).
4. **Changelog / versija:** reikšmingam release – [CHANGELOG.md](../../CHANGELOG.md); versijavimas – [versioning-and-release.md](../versioning-and-release.md).
5. **Po deploy metrikos** (periodiškai, ne kiekvienam hotfix): [test_report.md](../test_report.md), performance/Lighthouse – [performance-baseline.md](../performance-baseline.md).

---

## 5. DoD pagal agentą

| Agentas | Lygis A atsakomybė | Kada kviesti kitą |
|---------|-------------------|-------------------|
| [frontend-agent](../../.cursor/agents/frontend-agent.md) | UI, i18n, `api.js` kvietimai iš komponentų | Backend endpoint reikalingas → backend / fullstack |
| [backend-agent](../../.cursor/agents/backend-agent.md) | API, Stripe, webhook, `token_limits.py` | UI reikalingas → frontend / fullstack |
| [fullstack-agent](../../.cursor/agents/fullstack-agent.md) | Kontraktas + E2E | Scope tik viename sluoksnyje → specialistas |
| [quality-assurance-agent](../../.cursor/agents/quality-assurance-agent.md) | — | **Lygis B** – review prieš merge |
| [q-and-a-agent](../../.cursor/agents/q-and-a-agent.md) | — | Klausimai apie procesą / doc (ne implementacija) |

Orkestratorius: [AGENTS.md](../../AGENTS.md). Workflow: [development.md](development.md).

---

## 6. Greitas PR checklist (copy-paste)

```markdown
## Definition of Done

### Scope
- [ ] Pakeitimas atitinka užduotį; lean diff

### Automated
- [ ] CI Golden Legacy žalias (frontend + training build + pytest + bundle budget)

### Code quality
- [ ] `.cursor/rules/` laikomasi; jokių secretų
- [ ] QA agentas (jei reikšmingas kodas): critical = 0

### Docs
- [ ] README / TODO / docs / CHANGELOG / golden-legacy §1–3 (pagal documentation.md)

### Manual (jei taikoma)
- [ ] golden-legacy §3 smoke
- [ ] design-system-qa (UI)
- [ ] payment / access canon (Stripe/webhook)
- [ ] Supabase migracija pritaikyta

### Deploy (po merge)
- [ ] Vercel žalias; produkcijos smoke
```

---

## 7. Išimtys ir waiver

- **Skubus hotfix produkcijoje:** minimalus fix + CI žalias; likęs smoke ir doc atnaujinimas per 24–48 h.
- **WIP / draft PR:** Lygis B netaikomas; pažymėti draft, CI gali būti raudonas tik laikinai.
- **Docs / archyvas only:** Lygis B – INDEX + nuorodos; CI neprivalomas, jei nėra kodo pakeitimų.

Waiver fiksuokite PR komentare: kas praleista, kas ir kada bus užbaigta.

---

## 8. Susiję dokumentai

| Dokumentas | Rolė DoD sistemoje |
|------------|-------------------|
| [docs/INDEX.md](../INDEX.md) | Vienintelis doc kelių indeksas |
| [development.md](development.md) | Workflow: užduotis → agentas → QA → merge |
| [documentation.md](documentation.md) | Ką ir kur atnaujinti |
| [golden-legacy-standard.md](../golden-legacy-standard.md) | Regresijos kanonas + CI aprašymas |
| [design-system-qa.md](design-system-qa.md) | LP vizualinis / a11y QA |
| [security.md](../security.md) | Saugumo DoD papildymai |
| [deploy-and-webhook.md](../deploy-and-webhook.md) | Deploy DoD |

**Atnaujinimo taisyklė:** keičiant CI, agentų checklist ar merge procesą – atnaujinkite šį failą ir [docs/INDEX.md](../INDEX.md).
