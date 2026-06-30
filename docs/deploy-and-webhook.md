# Production deploy ir webhook

Vienas dokumentas: kas įdiegta produkcijoje (Vercel + Stripe webhook), kaip tikrinti ir ką daryti, jei **user_access** lentelė lieka tuščia.

---

## 1. Dabartinė setup (įgyvendinta)

- **Viešas domenas (canonical):** `https://www.promptanatomy.app` – naudoti visur produkcijoje (FRONTEND_ORIGIN, canonical, sitemap, webhook URL, dokumentacija).

### 1.1 Apex (`promptanatomy.app`) ir www

- Skelbimuose ir viešose nuorodose naudoti **tik** canonical `https://www.promptanatomy.app` (su `www`).
- **Apex** (`https://promptanatomy.app`) DNS / Vercel domenų nustatymuose turėtų arba rodyti tą patį deploy, arba **301** į `https://www.promptanatomy.app`, kad nebūtų timeout, skirtingos paskirties URL ar „sulūžusios“ grandinės botams ir peržiūroms.

- **Frontend:** Vercel build iš `frontend/`, output `frontend/dist`.
- **Webhook:** Vercel serverless `api/stripe-webhook.js` – Stripe parašas, email iš session, `metadata.plan`, Supabase upsert (`user_access`), `stripe_customer_id`.
- **Stripe Dashboard:** Webhook URL – `https://www.promptanatomy.app/api/stripe-webhook`, event `checkout.session.completed`. Signing secret → env `STRIPE_WEBHOOK_SECRET`.
- **Create-checkout-session ir GET /api/access:** Kol FastAPI backend nedeployintas atskirai, šie endpointai produkcijoje veikia per tą patį frontend deploy tik jei pridėti atitinkamos Vercel functions; dabar frontend naudoja `VITE_API_URL` (lokaliai `localhost:8000`). Produkcijoje reikia arba atskiro backend deploy, arba tų pačių endpointų kaip Vercel functions.
- **Success-redirect (magic-link):** Vercel serverless `api/success-redirect.js` – pagal `session_id` grąžina `redirect_url` į mokymų app su `access_tier`, `expires`, `token`. Jei Stripe Checkout sesijoje yra pirkėjo el. paštas, JSON gali turėti neprivalomą `customer_email` (Success puslapis gali įrašyti į naršyklės saugyklą LP formai). Reikia env: `ACCESS_TOKEN_SECRET`, `STRIPE_SECRET_KEY`; optional: `TRAINING_REDIRECT_BASE`, `ACCESS_TOKEN_EXPIRY_DAYS`.
- **Training app (submodulis):** `apps/prompt-anatomy` → [DITreneris/inzinerija](https://github.com/DITreneris/inzinerija) (commit `a95b2fa`, package `1.4.1`). Vercel build metu: `installCommand` inicijuoja submodulį (`git submodule update --init --recursive`, `HUSKY=0` submodulyje), `buildCommand` buildina frontend, po to training app su `VITE_BASE_PATH=/anatomy/`, `VITE_MAX_BUILD_MODULE=9`, `npx vite build` (be `VITE_MVP_MODE`), rezultatas kopijuojamas į `frontend/dist/anatomy/`. Maršrutas `/anatomy/*` aptarnaujamas iš to katalogo; `/anatomija/*` → **301** į `/anatomy/*`. Rekomenduojama Vercel build env: `VITE_PUBLIC_SITE_URL=https://www.promptanatomy.app`; Production: `TRAINING_REDIRECT_BASE=https://www.promptanatomy.app/anatomy` (žr. submodulio `docs/deployment/MARKETING_HANDOFF_CHECKLIST.md`).

**Vercel env (būtina webhook + prieigai + success-redirect):** `STRIPE_WEBHOOK_SECRET`, `STRIPE_SECRET_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ACCESS_TOKEN_SECRET` (bendras su mokymų app; success-redirect funkcijai). Optional: `ACCESS_TOKEN_EXPIRY_DAYS`.

**Vercel env (training kelias, rekomenduojama Production):** `TRAINING_REDIRECT_BASE=https://www.promptanatomy.app/anatomy` (be galinio `/`). Jei Dashboard vis dar rodo seną `/anatomija` – magic link ir success-redirect nukreips į seną kelią net po deploy; atnaujinkite **prieš** arba **kartu** su merge į `main`.

---

## 2. Prieš release: produkcijos env checklist

Prieš deploy į produkciją patikrinkite:

- **Submodulio build** – įsitikinkite, kad training app buildina lokaliai: `cd apps/prompt-anatomy && VITE_BASE_PATH=/anatomy/ VITE_MAX_BUILD_MODULE=9 npm run build:production` (Windows: nustatykite env kintamuosius atitinkamai arba naudokite cross-env).
- **STRIPE_WEBHOOK_SECRET** – būtina; be jo webhook grąžina 503.
- **ALLOW_WEBHOOK_WITHOUT_SECRET** – **niekada** įjungti prod (tik lokaliai dev).
- **FRONTEND_ORIGIN** – pilnas https URL (pvz. `https://www.promptanatomy.app`) be galinio `/` (CORS ir redirectai).
- **HTTPS** – Vercel jau įjungia HTTPS ir HSTS; jei backend atskirai – HSTS nustatyti reverse proxy (Nginx/Cloudflare).
- **Webhook klaidų stebėjimas** – rekomenduojama stebėti Vercel Function logs (arba Sentry ir pan.) dėl 4xx/5xx webhook atsakymų.

### 2.1 Vercel build failed (CI žalias, Preview/Prod raudonas)

1. **Dashboard override:** *Settings → Build & Deployment* – jei **Build Command** / **Install Command** užpildyti ranka, jie **perrašo** [`vercel.json`](../vercel.json). Palikite tuščius (naudokite repo config) arba nukopijuokite komandas iš `vercel.json`.
2. **`VITE_MVP_MODE=1` Production env:** pašalinkite – kitaip training build gali eiti į M1–6 profilį arba konfliktuoti su `VITE_MAX_BUILD_MODULE=9`.
3. **Submoduliai:** *Settings → Git* – įjunkite **Include Git Submodules**. Build log turi rodyti `apps/prompt-anatomy` commit `a95b2fa` (package `1.4.1`).
4. **Husky:** submodulio `npm ci` Vercel'e naudoja `HUSKY=0` (žr. `vercel.json` `installCommand`).
5. **Logai:** Deployments → failed build → Build Logs – ieškokite `validate:schema`, `husky`, `submodule`, `ENOMEM` / timeout. Build/install logika – [`scripts/vercel-build.sh`](../scripts/vercel-build.sh), [`scripts/vercel-install.sh`](../scripts/vercel-install.sh) (Vercel `buildCommand` ≤256 simb.).

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

LP **Check** el. paštui naudoja **`GET /api/access`** (lentelė **`user_access`**). Jei vartotojas mato **„No access found“**, bet „yra Supabase“ – žr. operacinį checklist [docs/test_report.md](test_report.md) (2026-03-23 įrašas).

**Vercel → Deployments → pasirink deployment → Functions → stripe-webhook → Logs.** Ieškok:

- `Supabase not configured` – trūksta SUPABASE_URL arba SUPABASE_SERVICE_ROLE_KEY  
- `no email` – session be `customer_details.email` ir be `client_reference_id`  
- `no metadata.plan` – session be metadata.plan  
- `user_access upsert error:` – Supabase klaida (schema, RLS, raktas)

### 3.4 Supabase lentelė

Lentelė **user_access** turi turėti: `email` (text, NOT NULL, UNIQUE), `highest_plan` (integer, NOT NULL, default 0), `stripe_customer_id` (text, nullable). DDL kanonas: [supabase/migrations/](../supabase/migrations/) (baseline migracija); santrauka: [docs/supabase-user-access.sql](supabase-user-access.sql). **Vercel deploy SQL nevykdo** – migracijas pritaikykite Supabase (žr. [docs/supabase-migrations.md](supabase-migrations.md)).

### 3.5 Testas iš Stripe

**Stripe Dashboard → Webhooks → endpoint → Send test webhook** → `checkout.session.completed`. Patikrink Vercel logs ir Supabase Table Editor.

### 3.6 Logai: Node DEP0169 (`url.parse`)

Jei loguose matote **`[DEP0169] DeprecationWarning`** dėl **`url.parse()`**, bet HTTP statusas **200** – tai dažniausiai **Node įspėjimas**, ne API klaida; Vercel jį gali rodyti kaip „Error“. Šiame repo **`api/*` handleriai `url.parse` nenaudoja**; tikslų šaltinį (stack trace) galima gauti su laikinu env **`NODE_OPTIONS=--trace-deprecation`** (žr. pilną diagnostiką: [docs/diagnostics-dep0169-vercel.md](diagnostics-dep0169-vercel.md)).

---

## 4. Vercel Firewall (masiniai skeneriai) ir saugos antraštės

Masininiai botai dažnai zondina neegzistuojančius WordPress/PHP kelius (`/wp-admin/setup-config.php` ir pan.). Mūsų statinis SPA per [vercel.json](../vercel.json) rewrite gali jiems vis tiek grąžinti `index.html` – Edge **Firewall** sumažina triukšmą ir apkrovą.

### 4.1 Įjungti Firewall taisykles (Vercel Dashboard)

Atlikite projekte **promptanatomy** (arba atitinkamame Vercel projekte):

1. **Vercel → Project → Firewall** (arba Security / WAF, priklausomai nuo UI versijos).
2. Pridėkite šabloną **[Block WordPress URLs](https://vercel.com/templates/vercel-firewall/block-wordpress-urls-firewall-rule)** ([šaltinis GitHub](https://github.com/vercel/firewall-templates/tree/main/wordpress-firewall-rule)).
3. Papildomai – **Custom rule**, jei reikia: kelias atitinka `.*\.php($|\?)` arba **Contains** `wp-login`, `xmlrpc.php` – veiksmas **Deny** (arba **Challenge**, jei planas leidžia).
4. **Netaikykite** plataus blokavimo visiems `User-Agent` „botams“ – kenktų SEO (`/robots.txt`, paieškos indeksavimas).
5. Path taisyklės **neturėtų** liesti **`/api/*`** – Stripe webhook (`POST /api/stripe-webhook`) ir kiti serverless maršrutai turi likti pasiekiami.

**Produkcijoje įjungta (Vercel Firewall):** užklausos su **`.php`**, keliais su **`wp-login`**, ir **`xmlrpc`** – **blocked** (atitinka masinius WordPress/PHP zondus; `/api/*` lieka atskiru keliu ir šių taisyklių paprastai neliečia).

### 4.2 Saugos antraštės (repo)

Root [vercel.json](../vercel.json) turi `headers` visiems keliams: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`. **Content-Security-Policy** čia sąmoningai neįtraukta (inline JSON-LD, `@vercel/analytics`, optional X pixel – reikalautų atskiros CSP iteracijos).

### 4.3 Regresijos patikra po Firewall pakeitimų

Po naujų Firewall taisyklių visada patikrinkite produkcijoje (arba preview su tomis pačiomis taisyklėmis):

- [ ] **Stripe webhook:** Dashboard → Webhooks → Send test event `checkout.session.completed` → Vercel Function loguose 200, be netikėtų blokavimų.
- [ ] **Checkout:** Pricing → mokėjimo srautas iki Stripe Checkout puslapio.
- [ ] **Success / magic link:** grįžimas su `session_id` → `GET /api/success-redirect` veikia.
- [ ] **`/anatomy/`** – puslapis kraunasi, navigacija ir asset’ai; **`/anatomija/`** → 301 į `/anatomy/`.

---

## 5. Nuorodos

- Planų ir webhook konvencijos: [docs/payment-best-practices.md](payment-best-practices.md)
- Lentelės SQL: [docs/supabase-user-access.sql](supabase-user-access.sql)
