# Production deploy ir webhook

Vienas dokumentas: kas įdiegta produkcijoje (Vercel + Stripe webhook), kaip tikrinti ir ką daryti, jei **user_access** lentelė lieka tuščia.

---

## 1. Dabartinė setup (įgyvendinta)

- **Frontend:** Vercel build iš `frontend/`, output `frontend/dist`.
- **Webhook:** Vercel serverless `api/stripe-webhook.js` – Stripe parašas, email iš session, `metadata.plan`, Supabase upsert (`user_access`), `stripe_customer_id`.
- **Stripe Dashboard:** Webhook URL – `https://promptanatomy.app/api/stripe-webhook`, event `checkout.session.completed`. Signing secret → env `STRIPE_WEBHOOK_SECRET`.
- **Create-checkout-session ir GET /api/access:** Kol FastAPI backend nedeployintas atskirai, šie endpointai produkcijoje veikia per tą patį frontend deploy tik jei pridėti atitinkamos Vercel functions; dabar frontend naudoja `VITE_API_URL` (lokaliai `localhost:8000`). Produkcijoje reikia arba atskiro backend deploy, arba tų pačių endpointų kaip Vercel functions.

**Vercel env (būtina webhook + prieigai):** `STRIPE_WEBHOOK_SECRET`, `STRIPE_SECRET_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.

---

## 2. Prieš release: produkcijos env checklist

Prieš deploy į produkciją patikrinkite:

- **STRIPE_WEBHOOK_SECRET** – būtina; be jo webhook grąžina 503.
- **ALLOW_WEBHOOK_WITHOUT_SECRET** – **niekada** įjungti prod (tik lokaliai dev).
- **FRONTEND_ORIGIN** – pilnas https URL (pvz. `https://promptuanatomija.lt`) be galinio `/` (CORS ir redirectai).
- **HTTPS** – Vercel jau įjungia HTTPS ir HSTS; jei backend atskirai – HSTS nustatyti reverse proxy (Nginx/Cloudflare).
- **Webhook klaidų stebėjimas** – rekomenduojama stebėti Vercel Function logs (arba Sentry ir pan.) dėl 4xx/5xx webhook atsakymų.

---

## 3. Troubleshooting: kodėl user_access tuščia

Jei mokėjimas per Stripe pavyko, webhook rodo 0% klaidų, bet **user_access** lentelė Supabase tuščia – tikrink:

### 3.1 Vercel env

- **Vercel → Project → Settings → Environment Variables**
- Production (ir Preview, jei testuoji): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (service role, ne anon key).
- Po pakeitimų **Redeploy**.

### 3.2 Stripe Checkout Session – metadata.plan

Webhook įrašo į DB tik jei `session.metadata.plan` yra **plan_id** ("1"–"4") arba **plan_value** (3, 6, 12, 15). Be `metadata.plan` webhook grąžina 200, bet įrašo neįrašo.

### 3.3 Vercel function logai

**Vercel → Deployments → pasirink deployment → Functions → stripe-webhook → Logs.** Ieškok:

- `Supabase not configured` – trūksta SUPABASE_URL arba SUPABASE_SERVICE_ROLE_KEY  
- `no email` – session be `customer_details.email` ir be `client_reference_id`  
- `no metadata.plan` – session be metadata.plan  
- `user_access upsert error:` – Supabase klaida (schema, RLS, raktas)

### 3.4 Supabase lentelė

Lentelė **user_access** turi turėti: `email` (text, NOT NULL, UNIQUE), `highest_plan` (integer, NOT NULL, default 0), `stripe_customer_id` (text, nullable). Schema: [docs/supabase-user-access.sql](supabase-user-access.sql).

### 3.5 Testas iš Stripe

**Stripe Dashboard → Webhooks → endpoint → Send test webhook** → `checkout.session.completed`. Patikrink Vercel logs ir Supabase Table Editor.

---

## 4. Nuorodos

- Planų ir webhook konvencijos: [docs/payment-best-practices.md](payment-best-practices.md)
- Lentelės SQL: [docs/supabase-user-access.sql](supabase-user-access.sql)
