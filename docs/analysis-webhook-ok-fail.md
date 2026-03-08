# Webhook analizė: kas OK / kas FAIL

## OK

- **Backend (FastAPI) webhook logika** – `backend/main.py`: `POST /api/webhooks/stripe` su Stripe parašo tikrinimu (raw body + `Stripe-Signature`), email iš `customer_details` / `client_reference_id`, `metadata.plan`, `new_highest = max(current, purchased)`, Supabase upsert, `stripe_customer_id` saugojimas.
- **Supabase** – lentelė `user_access`, `db.py` (get_user_access, upsert_user_access), env SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY.
- **Frontend** – GET /api/access, „Patikrinti prieigą“, can_upgrade_to, checkout su email.
- **Vercel env** – STRIPE_WEBHOOK_SECRET, STRIPE_SECRET_KEY, SUPABASE_* nustatyti.

## FAIL

- **Vercel deployina tik frontend** – `vercel.json`: build tik iš `frontend/`, output `frontend/dist`. Backend (FastAPI) **nėra** deployinamas į Vercel; repo šaknyje nėra `api/` katalogo.
- **Stripe webhook neturi kur eiti** – jei Stripe nukreiptas į `https://promptanatomy.app/api/stripe-webhook` arba `/api/webhooks/stripe`, atsakymas 404, nes Vercel projekte šių endpointų nėra.
- **Create-checkout-session ir GET /api/access** – frontend naudoja `VITE_API_URL` (default localhost:8000). Produkcijoje jei nėra atskiro backend deploy, šie kvietimai taip pat neturi kur eiti (arba eina į neegzistuojantį URL).

## Sprendimas (įgyvendinta)

- Pridėtas **Vercel serverless function** `api/stripe-webhook.js`: raw body + Stripe parašo tikrinimas, email iš session, `metadata.plan`, `new_highest = max(current, purchased)`, Supabase upsert (`onConflict: 'email'`), `stripe_customer_id` saugojimas.
- Šaknies `package.json` – priklausomybės `stripe`, `@supabase/supabase-js` API funkcijai.
- `vercel.json` – `installCommand` pakeistas į `npm install && cd frontend && npm install`, kad būtų įdiegiamos ir šaknies priklausomybės.

**Stripe Dashboard:** Webhook endpoint URL – `https://promptanatomy.app/api/stripe-webhook` (event `checkout.session.completed`). Signing secret – į `STRIPE_WEBHOOK_SECRET` (jau Vercel env).

**Create-checkout-session ir GET /api/access:** kol FastAPI backend nedeployintas atskirai, šie endpointai produkcijoje dar neveiks (frontend naudoja `VITE_API_URL`). Galimi žingsniai: deployinti backend atskirai arba pridėti šiuos endpointus kaip Vercel functions.
