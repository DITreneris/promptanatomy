# Webhook → Supabase: kodėl lentelė tuščia

Jei mokėjimas per Stripe pavyko, webhook rodo 0% klaidų, bet **user_access** lentelė Supabase tuščia, tikrink šiuos dalykus.

## 1. Vercel env kintamieji

- **Vercel → Project → Settings → Environment Variables**
- Turi būti nustatyti **Production** (ir Preview, jei testuoji preview URL):
  - `SUPABASE_URL` = `https://xxx.supabase.co`
  - `SUPABASE_SERVICE_ROLE_KEY` = service role raktas (ne anon key)
- Po pakeitimų **redeploy** (Deployments → … → Redeploy).

## 2. Stripe Checkout Session turi turėti metadata.plan

Webhook įrašo į DB tik jei `session.metadata.plan` yra **plan_id** ("1", "2", "3", "4") arba **plan_value** (3, 6, 12, 15). Webhook viduje mapina: "1"→3, "2"→6, "3"→12, "4"→15.

- Jei checkout buvo sukurtas **be** metadata.plan, webhook grąžina 200, bet įrašo neįrašo.
- Jei buvo klaida „Invalid metadata.plan: 1“ – seniau webhook priimdavo tik 3,6,12,15; dabar priima ir "1","2","3","4" (mapina į plan_value).

## 3. Vercel function logai

Po bandymo apmokėti (arba po „Send test webhook“ Stripe):

- **Vercel → Project → Deployments → pasirink paskutinį → Functions → stripe-webhook → Logs**
- Ieškok žinučių:
  - `Supabase not configured` – trūksta SUPABASE_URL arba SUPABASE_SERVICE_ROLE_KEY
  - `no email` – session neturi customer_details.email nei client_reference_id
  - `no metadata.plan` – session be metadata.plan
  - `user_access upsert error:` – Supabase klaida (pvz. stulpelis neegzistuoja, RLS, raktas)

## 4. Lentelės struktūra Supabase

Lentelė **user_access** turi turėti bent:

- `email` (text, NOT NULL, UNIQUE)
- `highest_plan` (integer, NOT NULL, default 0)
- `stripe_customer_id` (text, nullable)

Jei kuri nors iš jų trūksta arba pavadinimas kitaip (pvz. `highestPlan`), upsert gali kirsti. Naudok schemą iš [docs/supabase-user-access.sql](supabase-user-access.sql).

## 5. Testas iš Stripe

- **Stripe Dashboard → Webhooks → pasirink endpoint → Send test webhook**
- Pasirink **checkout.session.completed**
- Patikrink Vercel logs ir Supabase Table Editor – turėtų atsirasti įrašas (test event gali turėti fiktyvų email).
