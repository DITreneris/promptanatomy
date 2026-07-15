# Supabase project registry

**Paskirtis:** viena vieta – kuris Supabase projektas kam priklauso, kur migracijos, kokios env vars. Naudokite agentams ir operatoriams prieš pridedant naują Supabase account.

**Susiję:** [supabase-migrations.md](supabase-migrations.md), [user-access-tier-registry.md](user-access-tier-registry.md), [process/supabase-agent-runbook.md](process/supabase-agent-runbook.md).

---

## 1. Aktyvūs projektai

| project_key | product | env vars (Vercel / backend) | tables | migrations | tier / ops doc |
|-------------|---------|-------------------------------|--------|------------|----------------|
| `promptanatomy-app` | hub LP (`.app`) | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | `user_access` | [supabase/migrations/](../supabase/migrations/) | [user-access-tier-registry.md](user-access-tier-registry.md) |

---

## 2. Taisyklės naujiems projektams

1. **Vienas migration folder per projektą** – repo root `supabase/migrations/` hub'ui; ateityje `apps/<product>/supabase/migrations/` jei spoke turi atskirą DB.
2. **Staging → prod** – migracijas visada pirmiausia staging; agregato snapshot prieš ir po.
3. **Env vardai** – naujiems projektams: `SUPABASE_<PROJECT_KEY>_URL`, `SUPABASE_<PROJECT_KEY>_SERVICE_ROLE_KEY` (hub kol kas palikti `SUPABASE_URL` – nebreaking).
4. **Service role** – tik serverio env; niekada `VITE_*` ar frontend.
5. **MCP / Supabase CLI** – tik **staging**; ne production be explicit operatoriaus leidimo.
6. **RLS** – visoms lentelėms su vartotojo duomenimis; `REVOKE` anon/authenticated jei Data API nenaudojamas.
7. **CHECK constraints** – `highest_plan` reikšmės turi atitikti [user-access-tier-registry.md](user-access-tier-registry.md) (įskaitant operator grant `9`).

---

## 3. Naujo projekto checklist

| # | Veiksmas |
|---|----------|
| 1 | Pridėti eilutę į §1 lentelę (project_key, env, migrations kelias) |
| 2 | Sukurti baseline migraciją + hardening (RLS, REVOKE) |
| 3 | Įrašyti Vercel env (Production + Preview jei reikia) |
| 4 | Atnaujinti [docs/INDEX.md](INDEX.md) |
| 5 | `.cursor/skills/supabase-agent/SKILL.md` routing (lokaliai) |
| 6 | Staging smoke → prod |

---

## 4. Operatorius: migracijų taikymas (hub)

**Vercel ir FastAPI deploy SQL nevykdo.** Operatorius pritaiko per Supabase SQL Editor arba CLI.

### Seka (staging, tada prod)

1. `20260324120000_user_access_baseline.sql` (jei lentelės dar nėra)
2. `20260603120000_user_access_hardening.sql` (RLS, REVOKE, CHECK, trigger)
3. `20260710120000_user_access_add_plan_9_check.sql` (CHECK įtraukia `9`)

### Patikra po migracijos

```sql
select highest_plan, count(*) from user_access group by highest_plan order by 1;
```

Tikėtina prod (2026-07-10): `3`→46, `6`→28, `9`→5.

Dashboard: Table Editor → `user_access` → RLS **enabled**; Security Advisor – kritinių finding'ų nėra.

---

## 5. Susiję dokumentai

- [access-architecture-canon.md](access-architecture-canon.md)
- [supabase-hardening-plan.md](supabase-hardening-plan.md)
- [payment-best-practices.md](payment-best-practices.md) §3.4
