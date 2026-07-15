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

---

## Skirtumas nuo submodulio

Submodulio `apps/prompt-anatomy` skills – training turinys (moduliai, skaidrės). **Parent** skills – LP, Vercel `api/`, deploy, submodule pin, access tier.
