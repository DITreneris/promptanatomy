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

---

## Skirtumas nuo submodulio

Submodulio `apps/prompt-anatomy` skills – training turinys (moduliai, skaidrės). **Parent** skills – LP, Vercel `api/`, deploy, submodule pin, access tier.
