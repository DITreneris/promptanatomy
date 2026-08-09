# Skill evolution (pamokų kaupimas)

**Tikslas:** Agentai mokosi iš sesijų klaidų be doc šlamšto. Parent repo skills – `.cursor/skills/` (**lokaliai**, root `.gitignore` – ne commitinama, kaip submodulyje).

---

## Kur rašyti pamoką

| Pamokos tipas | Kur |
|---------------|-----|
| Universali taisyklė (visada galioja) | `.cursor/agents/*.md` arba atitinkamas `SKILL.md` |
| Vienkartinė / projekto specifinė | `.cursor/skills/<agent>/lessons.md` |
| Release sprendimas / „kodėl X“ | `CHANGELOG.md` |
| Regresija / testų ataskaita | `docs/test_report.md` |

---

## lessons.md formatas

Viena eilutė per pamoką:

```text
YYYY-MM-DD | kontekstas | problema | sprendimas | failai
```

Pavyzdys:

```text
2026-06-30 | magic link plan 9 | access_tier=6 | ACCESS_TIER_VALUES [3,6,9] | generate-access-link.js
```

---

## Higiena

- Kas **~4 savaites** peržiūrėti visus `lessons.md`
- Pasikartojančias pamokas **kelti** į agent.md arba SKILL.md checklist
- Pasenusias (nebegaliojančias) **šalinti**
- Indeksas: [.cursor/skills/README.md](../.cursor/skills/README.md)

### Pakeltos pamokos (2026-07-10, user_access)

| Taisyklė | Kur įrašyta |
|----------|-------------|
| Tier 9 sekimas (sąrašas, snapshot) | [user-access-tier-registry.md](../user-access-tier-registry.md) |
| Ne bulk `6→9` be explicit email sąrašo | `backend-agent/SKILL.md`, `orchestrator/SKILL.md` |
| 99 € → `highest_plan=9`, webhook dar `6` | `backend-agent/lessons.md`, registry §1 |
| Po rankinių tier pakeitimų: registry + CHANGELOG | [documentation.md](documentation.md) |
| Tier 9 = operator whitelist, ne visi 99 € | [user-access-tier-registry.md](../user-access-tier-registry.md), `backend-agent/SKILL.md` |
| CHECK turi įtraukti 9 prieš F1 hardening | `supabase-agent/SKILL.md`, migracija `20260710120000` |
| Vercel Supabase SOT | `api/lib/supabase-access.js` |

### Pakeltos pamokos (2026-07-25, SEO/GEO hardening)

| Taisyklė | Kur įrašyta |
|----------|-------------|
| Org `sameAs` sync `organization.js` + `index.html` | `frontend-agent/SKILL.md` |
| Social OG = `og-image-v2.jpg`; logo JSON-LD = `og-image.png` | `frontend-agent/SKILL.md`, golden-legacy |
| `llms.txt` SOT = `generate-geo-static.mjs` (Answer.AI shape) | `frontend-agent/SKILL.md`, CI |
| `/en` `og:url` = canonical `/` | `frontend-agent/SKILL.md` |
| GEO deploy: bump `LAST_UPDATED` + commit regenerated public assets | `fullstack-agent/SKILL.md`, `seo-geo-operations.md` §H |
| No SSR; no spokes in hub sitemap | `orchestrator/SKILL.md`, SEO-KISS Kill |
| llms GSC 0 clicks = expected | `q-and-a-agent/SKILL.md` / lessons |
| GEO PR review greps + sameAs sync | `quality-assurance-agent/SKILL.md` |
| GEO `TRAINING_SUMMARY` / pricing “6 modules” ≠ access tier 9 | `frontend-agent/SKILL.md`, `q-and-a-agent/SKILL.md`, phase-1-scope |
| Agent stubs + rules restored (tooling); SKILL.md = workflow SOT | `.cursor/agents/*.md`, `.cursor/rules/*.mdc`, AGENTS.md |

### Pakeltos pamokos (2026-07-25, F3 rate limit + A.1 Cookies)

| Taisyklė | Kur įrašyta |
|----------|-------------|
| Vercel abuse endpoints → shared `api/lib/rate-limit.js` (ne copy-paste Map) | `api.mdc`, `backend-agent/SKILL.md` |
| F3 = in-memory shipped; Upstash tik multi-instance abuse | `security.md`, `supabase-hardening-plan.md` F3, `orchestrator/SKILL.md` |
| Po F3 status change: sync Status + Moscow §13 + §15 + TODO `[A.4c]` | `quality-assurance-agent/lessons.md` |
| Footer Cookies UI = `/privacy#cookies` (ne „Netrukus“); legal review atskiras | `TODO.md` A.1 |

### Pakeltos pamokos (2026-08-08, LP audit QW / frontpage lean)

| Taisyklė | Kur įrašyta |
|----------|-------------|
| Six-Block vs five-part/Quick mode → GEO only (`llms` / `TRAINING_SUMMARY`), ne WhatIs/FAQ | `frontend-agent/SKILL.md`, `frontend-agent/lessons.md`, golden-legacy §1–3 |
| `modulesLocked` ne „later phase“ M7–12 — on-demand / temos; Stripe vis dar max 6 | `frontend-agent/SKILL.md`, `q-and-a-agent/lessons.md`, phase-1-scope |
| Demo reply SLA ≠ refund 14 d. (`forTeamsBody` 24h) | `frontend-agent/lessons.md` |
| `hero.socialProof` 600+ — keep jei savininkas apgina | `frontend-agent/lessons.md`, `q-and-a-agent/lessons.md` |
| accessDisplay caps 3/6/9/12 (corporate12) | `frontend-agent/SKILL.md`, `accessDisplay.js` |

---

## Skirtumas nuo submodulio

Submodulio `apps/prompt-anatomy` skills – training turinys (moduliai, skaidrės). **Parent** skills – LP, Vercel `api/`, deploy, submodule pin, access tier.
