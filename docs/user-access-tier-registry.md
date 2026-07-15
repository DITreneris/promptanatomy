# user_access – highest_plan sekimo lentelė

**Paskirtis:** viena vieta operatoriui – ką reiškia `highest_plan`, kur tikrinti Supabase, kas turi tier 9. Atnaujinkite po rankinių pakeitimų ar Stripe korekcijų.

**Šaltinis tiesai:** Supabase lentelė `user_access` (ne Excel, ne Stripe Dashboard vienas).

---

## 1. Reikšmės (kanonas)

| `highest_plan` | Moduliai | Tipinis šaltinis | Stripe kaina (LP Faze 1) |
|----------------|----------|------------------|---------------------------|
| `0` | nėra | — | — |
| `3` | 1–3 | Stripe plan 1, bulk import `--plan 3` | 39 € |
| `6` | 1–6 | Stripe plan 2 (webhook **6**), bulk `--plan 6`, rankinis grant | 99 € (default) |
| `9` | 1–9 | **Tik operatoriaus** upsert – atrinkti geriausi klientai; training app M1–9 | — |
| `12` / `15` | 1–12 / 1–15 | Ateities planai | 149 € / 199 € |

**99 € (Stripe plan 2):** webhook visada įrašo **`highest_plan=6`** (moduliai 1–6). **`highest_plan=9`** – **ne** automatinis 99 € rezultatas; tik **explicit operatoriaus grant** atrinktiems klientams (§3 sąrašas). Ne bulk `6→9` be email whitelist.

**Magic link:** `highest_plan` 3 / 6 / 9 → `access_tier` toks pat (`api/generate-access-link.js`, `api/verify-access.js`).

---

## 2. Kur sekti

| Vieta | Kaip |
|-------|------|
| **Supabase** → Table Editor → `user_access` | Stulpeliai: `email`, `highest_plan`, `stripe_customer_id`, `updated_at` |
| **SQL (agregatas)** | `select highest_plan, count(*) from user_access group by highest_plan order by 1;` |
| **SQL (tier 9 sąrašas)** | `select email, stripe_customer_id, updated_at from user_access where highest_plan = 9 order by email;` |
| **LP patikra** | „Patikrinti prieigą“ → 3/3, 6/6 arba 9/9 (`accessDisplay.js`) |
| **Bulk import** | [bulk-import-user-access.md](bulk-import-user-access.md), `scripts/import_user_access.py` |
| **Vienas email** | `backend/db.py` → `upsert_user_access` (lokaliai su `backend/.env`) |

---

## 3. Tier 9 kanoninis sąrašas (2026-07-10)

| Email | Šaltinis | Pastaba |
|-------|----------|---------|
| `jaunius.jakaitis@gmail.com` | Stripe 99 € | `stripe_customer_id` užpildytas |
| `andrius.kvaksys@gmail.com` | Stripe 99 € | `stripe_customer_id` užpildytas |
| `lauris.zilinskas@gmail.com` | Stripe 99 € | `stripe_customer_id` užpildytas |
| `norbertas@vip.lt` | Rankinis | Be Stripe ID |
| `tomas.staniulis76@gmail.com` | Rankinis | Be Stripe ID |

**Neįtraukti į tier 9** (liko `6`): akademijos / cgates bulk, `vytautas.zlatkus@gmail.com` (Stripe, bet ne 99 € sąraše operatoriaus).

### Snapshot (2026-07-10)

| `highest_plan` | Vartotojų sk. |
|----------------|---------------|
| 3 | 46 |
| 6 | 28 |
| 9 | 5 |

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

### Atstatyti per klaidą pakeltus (9 → 6)

Tik tiems, kurie neturėtų būti tier 9 – ne `greatest` masiniu UPDATE be peržiūros.

### Po pakeitimų

1. Atnaujinkite §3 lentelę šiame faile (data + snapshot).
2. Įrašas [CHANGELOG.md](../CHANGELOG.md) `[Unreleased]` → Operacijos / Supabase.
3. LP smoke: 1–2 email iš kiekvieno tier.

---

## 5. Susiję dokumentai

- [access-architecture-canon.md](access-architecture-canon.md) – architektūra
- [payment-best-practices.md](payment-best-practices.md) – Stripe / webhook konvencijos
- [supabase-user-access.sql](supabase-user-access.sql) – DDL santrauka
- [golden-legacy-standard.md](golden-legacy-standard.md) §3 – tier 9 LP UI (9/9)
