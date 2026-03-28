# Mokėjimų (payment) geriausios praktikos – MVP upgrade

Vienas atskaitos dokumentas: kaip žymėti planus, env, Stripe/Supabase/Vercel konvencijos, kad kiti moduliai ir ateities pakeitimai būtų nuoseklūs.

**Pilnas prieigos kanonas** (kas yra „tiesa“, LP vs mokymų tiltas): [access-architecture-canon.md](access-architecture-canon.md).

---

## 1. Planų hierarchija (vienas šaltinis tiesos)

| Koncepcija | Reikšmės | Kur naudojama |
|------------|----------|----------------|
| **plan_id** | `"1"` \| `"2"` \| `"3"` \| `"4"` | Frontend (mygtukai, API body), Stripe Price mapping |
| **plan_value** | `3` \| `6` \| `12` \| `15` | Supabase `highest_plan`, logika „moduliai 1–N“, webhook |
| **Moduliai** | 1–3, 1–6, 1–12, 1–15 | UI tekstas („1–3 moduliai“ ir t. t.) |

**Mapping (visur vienodas):**

- plan_id `"1"` → plan_value `3` (moduliai 1–3)
- plan_id `"2"` → `6` (1–6)
- plan_id `"3"` → `12` (1–12)
- plan_id `"4"` → `15` (1–15)

**Taisyklė:** Supabase ir visi palyginimai naudoja **plan_value** (skaičius). Frontend ir checkout request naudoja **plan_id** (string "1"–"4"). Kuriant naujus endpointus ar modulius – viduje konvertuoti į plan_value, į DB ir atsakymuose grąžinti plan_value.

---

## 2. Stripe konvencijos

### 2.1 Checkout Session (kuriant sesiją)

- **metadata.plan** – **būtina**. Siųsti **plan_value** kaip string: `"3"`, `"6"`, `"12"`, `"15"`. (Webhook priima ir plan_id "1"–"4" dėl suderinamumo, bet rekomenduojama siųsti plan_value.)
- **client_reference_id** – naudoti **email** (jei žinomas), kad webhook turėtų identifikatorių net jei `customer_details.email` neužpildytas.
- **customer_creation**: `"always"` – Stripe sukurs customer; tada `session.customer` bus prieinamas webhook’e.

### 2.2 Stripe Price ID

- Vienas Price vienam planui. Env pavadinimai: `STRIPE_PRICE_ID_PLAN_1` … `STRIPE_PRICE_ID_PLAN_4` (atitinka plan_id 1–4).
- Backend: `get_price_id_for_plan(plan_id)` → price_id; `plan_id_to_value(plan_id)` → plan_value.

### 2.3 Webhook

- **URL:** produkcijoje `https://<domenas>/api/stripe-webhook` (Vercel: `api/stripe-webhook.js`).
- **Event:** `checkout.session.completed`.
- **Signing secret:** env `STRIPE_WEBHOOK_SECRET` (whsec_…). Webhook **visada** tikrinti parašą (raw body + `Stripe-Signature`).
- **Source of truth:** prieigos atnaujinimas tik iš webhook, ne iš success puslapio.

---

## 3. Supabase konvencijos

### 3.1 Lentelė user_access

- **email** – text, NOT NULL, UNIQUE. Visada saugoti **lowercase** (backend/Vercel normalizuoja).
- **highest_plan** – integer, reikšmės **0, 3, 6, 12, 15**. 0 = dar nepirko.
- **stripe_customer_id** – text, nullable; saugoti iš `session.customer` webhook’e.
- **created_at / updated_at** – timestamptz; DB default arba upsert lauke nesiųsti, jei schema leidžia.

Schema: [docs/supabase-user-access.sql](supabase-user-access.sql).

### 3.2 Upsert logika

- **new_highest_plan = max(current_highest_plan, purchased_plan)**. Niekada neperrašyti mažesne reikšme.
- Upsert pagal **email** (unique); on conflict = email.

### 3.3 Env

- `SUPABASE_URL` – projekto URL (https://xxx.supabase.co).
- `SUPABASE_SERVICE_ROLE_KEY` – service role key (server-side tik; ne anon key).

---

## 4. Aplinkos kintamieji (env) – checklist

### Backend (FastAPI) – .env

| Kintamasis | Privalomas | Aprašymas |
|------------|------------|-----------|
| STRIPE_SECRET_KEY | Taip | Stripe secret (sk_test_… / sk_live_…) |
| STRIPE_WEBHOOK_SECRET | Taip (prod) | whsec_… |
| STRIPE_PRICE_ID_PLAN_1 … _4 | Taip | Stripe Price ID kiekvienam planui |
| FRONTEND_ORIGIN | Taip | Frontend URL be / (CORS, redirects) |
| SUPABASE_URL | Ne (access/upsert) | Supabase projekto URL |
| SUPABASE_SERVICE_ROLE_KEY | Ne | Service role key |
| ALLOW_WEBHOOK_WITHOUT_SECRET | Ne | Tik dev; 1 = leidžia be secret |

### Vercel (produkcija)

| Kintamasis | Aprašymas |
|------------|-----------|
| STRIPE_SECRET_KEY | Tas pats kaip backend |
| STRIPE_WEBHOOK_SECRET | Webhook signing secret |
| SUPABASE_URL | Supabase projekto URL |
| SUPABASE_SERVICE_ROLE_KEY | Service role key |

Nustatyti **Production** (ir Preview, jei reikia). Po pakeitimų – Redeploy.

### Frontend

| Kintamasis | Aprašymas |
|------------|-----------|
| VITE_API_URL | Backend/API base URL. Lokaliai: `http://localhost:8000`. Prod: jei nenustatyta – naudojamas same-origin (`window.location.origin`). |

---

## 5. API endpointų žemėlapis

| Endpoint | Hostas | Aprašymas |
|----------|--------|-----------|
| GET /api/access?email= | Vercel `api/access.js` | Grąžina highest_plan, allowed_modules, can_upgrade_to |
| POST /api/stripe-webhook | Vercel `api/stripe-webhook.js` | Stripe webhook; upsert į user_access |
| POST /api/create-checkout-session | FastAPI arba (būsimas) Vercel | Session su metadata.plan, client_reference_id; 409 jei jau turi planą |

Frontend kvietimai: `API_URL` + path. Produkcijoje be VITE_API_URL = same-origin, t. y. /api/access ir /api/stripe-webhook Vercel’e.

---

## 6. Ką nedaryti (pitfalls)

- **Nesiųsti metadata.plan** į Checkout Session – webhook neįrašys į Supabase.
- **Siųsti plan_id į metadata, bet webhook tik plan_value** – buvo „Invalid metadata.plan: 1“; dabar webhook priima abu (mapina plan_id→plan_value).
- **Pasitikėti tik success_url** – source of truth yra webhook; success page tik informuoja.
- **Saugoti plan_id Supabase** – saugoti **plan_value** (3, 6, 12, 15).
- **Env tarpas** – pvz. `KEY= value` įtraukia tarpą į reikšmę; Stripe/Supabase gali atmesiti.
- **Vercel env tik Build** – serverless funkcijoms reikia env **Runtime**; standartiškai Vercel suteikia abiem.

---

## 7. Naujų modulių / plėtros atžvilgiu

- Pridedant **naują planą** (pvz. 1–18): įtraukti į PLAN_VALUES ir PLAN_ID_TO_VALUE (backend + Vercel webhook), pridėti STRIPE_PRICE_ID_PLAN_5 (arba atitinkamą), Supabase schema lieka (highest_plan integer).
- **Proration / upgrade discount** – MVP nedarėme; vėliau reikės atskiros logikos ir galimai atskirų Price ar kuponų.
- **Prieigos tikrinimas** – GET /api/access; frontend rodo tik can_upgrade_to ir „Jau turite“ pagal highest_plan.

---

*Dokumentas: docs/payment-best-practices.md. Atnaujinta pagal MVP upgrade įgyvendinimą (2026-03).*
