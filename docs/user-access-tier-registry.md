# user_access – highest_plan sekimo lentelė

**Paskirtis:** viena vieta operatoriui – ką reiškia `highest_plan`, kur tikrinti Supabase, kas turi tier 9 / 12. Atnaujinkite po rankinių pakeitimų ar Stripe korekcijų.

**Šaltinis tiesai:** Supabase lentelė `user_access` (ne Excel, ne Stripe Dashboard vienas).

---

## 1. Reikšmės (kanonas)

| `highest_plan` | Moduliai | Tipinis šaltinis | Stripe kaina (LP Faze 1) |
|----------------|----------|------------------|---------------------------|
| `0` | nėra | — | — |
| `3` | 1–3 | Stripe plan 1, bulk import `--plan 3` | 39 € |
| `6` | 1–6 | Stripe plan 2 (webhook **6**), bulk `--plan 6`, rankinis grant | 99 € (default) |
| `9` | 1–9 | **Tik operatoriaus** upsert – atrinkti geriausi klientai; training app M1–9 | — |
| `12` | 1–12 | **Tik operatoriaus** upsert (Agentų kelias / corporate12 Phase 1); prod bundle M1–12 | — (Stripe €199 = Phase 2) |
| `15` | 1–15 | Ateities planas (corporate15) | — |

**99 € (Stripe plan 2):** webhook visada įrašo **`highest_plan=6`** (moduliai 1–6). **`highest_plan=9`** / **`12`** – **ne** automatinis Stripe rezultatas; tik **explicit operatoriaus grant**. Ne bulk `6→9` ar `9→12` be email whitelist.

**Magic link:** `highest_plan` 3 / 6 / 9 / **12** → `access_tier` toks pat (`api/generate-access-link.js`, `api/verify-access.js`). Prod build: `build:corporate12` (`VITE_MAX_BUILD_MODULE=12`).

---

## 2. Kur sekti

| Vieta | Kaip |
|-------|------|
| **Supabase** → Table Editor → `user_access` | Stulpeliai: `email`, `highest_plan`, `stripe_customer_id`, `updated_at` |
| **SQL (agregatas)** | `select highest_plan, count(*) from user_access group by highest_plan order by 1;` |
| **SQL (tier 9 sąrašas)** | `select email, stripe_customer_id, updated_at from user_access where highest_plan = 9 order by email;` |
| **SQL (tier 12 sąrašas)** | `select email, stripe_customer_id, updated_at from user_access where highest_plan = 12 order by email;` |
| **LP patikra** | „Patikrinti prieigą“ → 3/3, 6/6, 9/9 arba 12/12 (`accessDisplay.js`) |
| **Bulk import** | [bulk-import-user-access.md](bulk-import-user-access.md), `scripts/import_user_access.py` |
| **Vienas email** | `backend/db.py` → `upsert_user_access` (lokaliai su `backend/.env`) |

---

## 3. Operatoriaus grant sąrašas

### Tier 9 (2026-07-30)

| Email | Šaltinis | Pastaba |
|-------|----------|---------|
| `jaunius.jakaitis@gmail.com` | Stripe 99 € | `stripe_customer_id` užpildytas |
| `andrius.kvaksys@gmail.com` | Stripe 99 € | `stripe_customer_id` užpildytas |
| `lauris.zilinskas@gmail.com` | Stripe 99 € | `stripe_customer_id` užpildytas |
| `kestutis@vip.lt` | Rankinis | 2026-07-30, naujas grant |
| `liudvikas.staniulis@gmail.com` | Rankinis | 2026-07-30, 6→9 |
| `darius.martinonis@cgates.lt` | Rankinis | Operator grant |
| `laura.andriuskeviciene@cgates.lt` | Rankinis | Operator grant |

### Tier 12 (2026-08-13)

| Email | Šaltinis | Pastaba |
|-------|----------|---------|
| `norbertas@vip.lt` | Rankinis | Be Stripe ID; 9→12 |
| `tomas.staniulis76@gmail.com` | Rankinis | Be Stripe ID; 9→12 |

### Snapshot (2026-08-13)

| `highest_plan` | Vartotojų sk. |
|----------------|---------------|
| 3 | 2 |
| 6 | 102 |
| 9 | 7 |
| 12 | 2 |

*2026-08-13:* `tomas.staniulis76@gmail.com`, `norbertas@vip.lt` 9→**12**. Ankstesni: 2026-08-10 → 2/102/9 (+`liudmila.surkova@rizika.lt` → 6); 2026-08-06 → 2/101/9; 2026-07-30 → 2/88/9.*

---

## 4. Operacijos

### Pakelti vieną email į tier 9

```sql
insert into user_access (email, highest_plan)
values (lower('user@example.com'), 9)
on conflict (email) do update set
  highest_plan = greatest(user_access.highest_plan, excluded.highest_plan),
  updated_at = now();
```

### Pakelti vieną email į tier 12 (corporate12 / Agentų kelias)

```sql
insert into user_access (email, highest_plan)
values (lower('user@example.com'), 12)
on conflict (email) do update set
  highest_plan = greatest(user_access.highest_plan, excluded.highest_plan),
  updated_at = now();
```

Po grant: `generate-access-link` → `access_tier=12`; LP rodo 12/12; `/anatomy/` atrakina M1–12 (reikia prod `build:corporate12`). **Python** `upsert_user_access` perrašo `highest_plan` (nėra `greatest()`): pirmiau `get_user_access`, rašyti tik jei `current` = laukta (pvz. 9). SQL Editor – `greatest()` kaip čia. Smoke: **naujas** LP „Eiti į mokymus“ — senas `localStorage.verified_access_tier=9` ir nepasibaigęs HMAC `access_tier=9` lieka 9.

### Atstatyti per klaidą pakeltus (9 → 6 arba 12 → 9)

Tik tiems, kurie neturėtų būti tier 9/12 – ne `greatest` masiniu UPDATE be peržiūros.

### Po pakeitimų

1. Atnaujinkite §3 lentelę šiame faile (data + snapshot).
2. Įrašas [CHANGELOG.md](../CHANGELOG.md) `[Unreleased]` → Operacijos / Supabase.
3. LP smoke: 1–2 email iš kiekvieno tier.

---

## 5. Susiję dokumentai

- [access-architecture-canon.md](access-architecture-canon.md) – architektūra
- [payment-best-practices.md](payment-best-practices.md) – Stripe / webhook konvencijos
- [supabase-user-access.sql](supabase-user-access.sql) – DDL santrauka
- [golden-legacy-standard.md](golden-legacy-standard.md) §3 – tier 9/12 LP UI (9/9, 12/12)
