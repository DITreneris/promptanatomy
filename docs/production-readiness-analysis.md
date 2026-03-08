# Production readiness – kodo bazės analizė

**Data:** 2026-03-08  
**Tikslas:** Bugų, neatitikimų ir production rizikų identifikavimas.

---

## 1. Atlikti pataisymai

| Problema | Vieta | Pataisymas |
|----------|--------|------------|
| API klaidų atsakymas naudojo `error` vietoj `detail` | `api/access.js` 405 | Grąžinamas `{ detail: 'Method not allowed' }` – frontend `api.js` naudoja `detail`. |
| Webhook 400 atsakyme buvo grąžinamas `err.message` | `api/stripe-webhook.js` | Vietoj to grąžinama bendra žinutė: `{ detail: 'Invalid signature or payload' }` (neišduoti vidinės Stripe klaidos). |
| Webhook 503 naudojo `error` | `api/stripe-webhook.js` | Pakeista į `detail` dėl nuoseklumo. |
| CORS `allow_origins` su tuščiu `FRONTEND_ORIGIN` | `backend/main.py` | Filtruojami tušti stringai – `origins` neturi tuščio elemento. |

---

## 2. Rastos problemos (likusios / rekomendacijos)

### 2.1 Backend

- **Rate limit už reverse proxy:** SlowAPI naudoja `get_remote_address` (kliento IP). Už Nginx/Vercel visi gali atrodyti iš vieno IP – rate limit gali apriboti visus. Produkcijoje: naudoti `X-Forwarded-For` / `X-Real-IP` kaip limiterio `key_func` **tik jei** proxy yra patikimas (docs/security.md § Rate limiting).
- **Stripe klaidos:** `create_checkout_session` catch'ina `stripe.error.StripeError` ir grąžina 502 su "Payment provider error" – gerai, nes neatskleidžiama vidinė klaida.
- **Validacija:** Pydantic `EmailStr`, `Literal["1","2"]`, `max_length=50_000` – atitinka golden-legacy ir saugumo praktikas.

### 2.2 Vercel API (`api/*.js`)

- **create-checkout-session:** Netinkamam `plan_id` grąžinamas **400** ("Only plans 1 and 2..."); FastAPI – **422**. Nuoseklumui galima Vercel grąžinti 422, bet funkcionaliai abu teisingi (frontend gauna tinkamą klaidos tekstą).
- **Priklausomybės:** Root `package.json` turi `stripe` ir `@supabase/supabase-js` – Vercel build naudoja šias priklausomybes `api/` funkcijoms.

### 2.3 Frontend

- **Klaidos:** `api.js` naudoja `(await res.json().catch(() => ({}))).detail || res.statusText` – jei backend/Vercel grąžina `detail`, viskas veikia. Po pataisymų Vercel naudoja `detail`.
- **config.js:** `getApiUrl()` – jei nėra `VITE_API_URL`, naudoja `window.location.origin` (same-origin), tinkama Vercel deploy.

### 2.4 Saugumas

- **Secrets:** Jokie raktai kode; backend – Pydantic `SecretStr`, env per `.env`; `.gitignore` – `.env`, `backend/.env`, `frontend/.env`.
- **Webhook:** Backend ir Vercel – signature verification; produkcijoje `STRIPE_WEBHOOK_SECRET` būtinas, `ALLOW_WEBHOOK_WITHOUT_SECRET` tik dev.
- **CORS:** Backend ir Vercel – whitelist (FRONTEND_ORIGIN + localhost); ne `*`.

### 2.5 Testai ir build

- **Backend:** `cd backend && python -m pytest tests/ -v` – paleisti su aktyvuotu venv (įdiegti `pip install -r requirements.txt`).
- **Frontend:** `cd frontend && npm run build` – turi pavykti; regresijai žr. docs/golden-legacy-standard.md.

---

## 3. Production checklist (santrauka)

- [ ] **Env:** Backend/Vercel – `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `FRONTEND_ORIGIN` (pvz. `https://www.promptanatomy.app`), Supabase (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`). Žr. [deploy-and-webhook.md](deploy-and-webhook.md) § 2.
- [ ] **ALLOW_WEBHOOK_WITHOUT_SECRET** – produkcijoje **ne** naudoti.
- [ ] **Stripe webhook URL** – nukreipti į deployintą backend arba Vercel `https://<domain>/api/stripe-webhook`, event `checkout.session.completed`.
- [ ] **HTTPS** – užtikrintas hostingo (Vercel) pusėje.
- [ ] Prieš release: `pytest` (backend) + `npm run build` (frontend); pagal poreikį – rankinis smoke pagal [golden-legacy-standard.md](golden-legacy-standard.md).

---

## 4. Prieš deploy – greitas tikrinimas

- [ ] **Vercel env (būtina):** `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `FRONTEND_ORIGIN` (pvz. `https://www.promptanatomy.app`), `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`. Be `FRONTEND_ORIGIN` – CORS api/access ir api/create-checkout-session blokuos production origin.
- [ ] **Backend (jei deployinamas atskirai):** `backend/.env` su tais pačiais kintamaisiais; `uvicorn main:app --host 0.0.0.0`.
- [ ] **Regresija:** `cd backend && python -m pytest tests/ -v` (su aktyvuotu venv), `cd frontend && npm run build`.
- [ ] **Stripe webhook:** Po deploy – Stripe Dashboard → Send test webhook `checkout.session.completed`; patikrinti Vercel Function logs ir Supabase `user_access`.
- [ ] **Nekomituoti:** `frontend/dist/` (jau .gitignore); jokie `.env` su realiais raktais.

## 5. Nuorodos

- [docs/security.md](security.md) – saugumo praktikos
- [docs/deploy-and-webhook.md](deploy-and-webhook.md) – deploy ir webhook troubleshooting
- [docs/golden-legacy-standard.md](golden-legacy-standard.md) – regresijos apsauga
