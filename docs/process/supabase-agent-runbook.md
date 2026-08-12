# Supabase agent runbook (committed mirror)

**Lokalius agent skills:** `.cursor/skills/supabase-agent/SKILL.md` (ne commitinama). Šis failas – komandos SOT migracijoms, RLS ir multi-project registrui.

**Indeksas:** [docs/INDEX.md](../INDEX.md) §2. **Projektų registras:** [supabase-project-registry.md](../supabase-project-registry.md).

---

## Kada naudoti supabase-agent

| Užduotis | Agentas |
|----------|---------|
| SQL migracija, RLS, CHECK | **supabase-agent** |
| Rankinis tier 9/12, bulk import | **backend-agent** |
| LP magic link UI | **frontend-agent** |
| Deploy + smoke | **fullstack-agent** |

---

## Prieš migraciją

1. Perskaityti [supabase-project-registry.md](../supabase-project-registry.md) – teisingas projektas.
2. **Staging pirmiausia** – niekada tiesiai į prod naujo CHECK/RLS.
3. Agregatas prieš/po:
   ```sql
   select highest_plan, count(*) from user_access group by highest_plan order by 1;
   ```
4. Migracijos kanonas: [supabase/migrations/](../../supabase/migrations/) – ne redaguoti pritaikytų failų.

---

## CHECK ir tier 9/12

- Prod naudoja `highest_plan=9` **operator grant** ir `highest_plan=12` **operator/corporate grant** – ne webhook default iš Phase 1 checkout.
- CHECK turi įtraukti `9` ir `12` (istorinis 9 papildymas: `20260710120000_user_access_add_plan_9_check.sql`; corporate12 kelias turi išlikti suderintas su parent `VALID_TIERS` / `ACCESS_TIER_VALUES` `[3, 6, 9, 12]`).
- **Nekeisti** webhook plan 2 → 6 semantikos (99 € default = moduliai 1–6).

---

## RLS / hardening

- `enable row level security` + `revoke all ... from anon, authenticated` – jei frontend nenaudoja Data API.
- `service_role` bypassina RLS – serverio API elgsena nesikeičia.
- Detalus planas (archyvas): [archive/analysis/supabase-hardening-plan.md](../archive/analysis/supabase-hardening-plan.md) F1.

---

## Webhook patikimumas

- Vercel [api/stripe-webhook.js](../../api/stripe-webhook.js): Supabase read/upsert klaida → **500** (Stripe retry).
- Supabase nekonfigūruotas (dev/preview) → **200** + log (kaip anksčiau).
- Shared lib: [api/lib/supabase-access.js](../../api/lib/supabase-access.js).

---

## MCP / CLI

- Supabase MCP ir CLI – **staging** projektui.
- Production schema keitimai – operatorius per SQL Editor arba `db push` su review.
- External: [Supabase Postgres Agent Skills](https://supabase.com/blog/postgres-best-practices-for-ai-agents).

---

## Po pakeitimų (DoD)

1. [CHANGELOG.md](../../CHANGELOG.md) `[Unreleased]`
2. [supabase-migrations.md](../supabase-migrations.md) jei nauja migracija
3. `pytest` + `npm run build` + `npm run diagnose:dep0169`
4. Registry snapshot jei tier counts pasikeitė
