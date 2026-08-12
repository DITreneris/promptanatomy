# Gili saugumo analizė – Promptų Anatomija Home

**Data:** 2026-03-08.  
**Apimtis:** architektūra, jautrūs taškai, rizikos, industrijos praktikos, MOSCOW prioritetai.

---

## 1. Architektūra (saugumo požiūriu)

| Komponentas | Technologija | Paskirtis |
|-------------|--------------|-----------|
| **Frontend** | Vite + React, Tailwind | LP, pricing, checkout mygtukai; kvietimai tik per `api.js` į backend arba Vercel `/api/*`. |
| **Backend** | FastAPI (Python) | `/health`, `/api/access`, `/api/create-checkout-session`, `/api/validate-token-limit`, `/api/webhooks/stripe`. Secrets per Pydantic Settings + `SecretStr`. |
| **Vercel serverless** | Node.js `api/*.js` | Alternatyva backend'ui: `api/access.js`, `api/create-checkout-session.js`, `api/stripe-webhook.js`. Env per `process.env`. |
| **Išorės paslaugos** | Stripe, Supabase | Mokėjimai; prieigos duomenys `user_access` (email, highest_plan). |

**Du deployment scenarijai:**

- **A:** Frontend (Vercel) + atskiras FastAPI backend (Hetzner/Railway/kt.) – CORS iš `FRONTEND_ORIGIN`, rate limit pagal IP (už proxy reikia `X-Forwarded-For`).
- **B:** Vercel frontend + Vercel serverless (`api/`) – same-origin; CORS whitelist (`FRONTEND_ORIGIN` + localhost).

**Kritiniai duomenų srautai:**

1. **Checkout:** naršyklė → POST create-checkout-session (plan_id, customer_email) → Stripe Session → redirect į Stripe → po apmokėjimo webhook → Supabase `user_access` upsert.
2. **Prieiga:** naršyklė → GET /api/access?email= → Supabase (service role) → atsakymas (highest_plan, allowed_modules, can_upgrade_to).

---

## 2. Jautrūs taškai (santrauka)

| Sritis | Vieta | Būsena |
|--------|--------|--------|
| **Slaptažodžiai** | Backend: `core/config.py`, `main.py`; Vercel: `process.env` | SecretStr / env; `.env` ne commitinami. ✅ |
| **Stripe** | Webhook: raw body + `Stripe-Signature`; checkout: tik nustatyti planai | Backend ir Vercel – parašo tikrinimas; dev režime backend gali be secret (dokumentuota). ✅ |
| **Supabase** | `db.py`, `api/access.js`, `api/create-checkout-session.js`, `api/stripe-webhook.js` | Service role tik serverio pusėje; RLS netaikomas service role (normalu). ✅ |
| **CORS** | Backend: fiksuoti origins; Vercel api: whitelist | Backend ir Vercel – leidžiami tik `FRONTEND_ORIGIN` + localhost; neleistinam origin ne grąžinamas `*`. ✅ |
| **Rate limiting** | SlowAPI pagal `get_remote_address` | Už reverse proxy – vienas IP visiems. ⚠️ |
| **GET /api/access?email=** | Email query string | Logai, istorija, Referer – PII atodanga (OWASP, GDPR). ⚠️ |
| **CSRF** | Nėra | Nėra cookie-based auth – mažesnė rizika; jei vėliau pridedami cookies – reikės. 📋 |
| **Security headers** | Backend middleware | X-Frame-Options, X-Content-Type-Options, Referrer-Policy. ✅ |
| **Įvesties validacija** | Pydantic (EmailStr, max_length), Vercel – rankinė | Backend tvirtas; Vercel – bazinė (email `includes('@')`). ✅ |
| **Klaidos** | HTTPException, be stack trace | Vartotojui nerodomi vidiniai detalės. ✅ |

---

## 3. Kas jau gerai (įdiegta)

- **Secrets:** Tik per env; backend – `SecretStr`, jokie raktai kode ar atsakymuose.
- **Stripe webhook:** Raw body naudojamas; `construct_event` / `constructEvent` su signing secret; timestamp tolerance (replay apsauga) įmontuota Stripe SDK (pvz. 5 min).
- **CORS (backend):** Konkretūs `allow_origins` (FRONTEND_ORIGIN + localhost), `allow_credentials=True`, riboti methods/headers.
- **Validacija:** Email – Pydantic `EmailStr` (backend), max 254; tekstas token limit – max 50k; plan_id – whitelist (Phase 1: "1"|"2").
- **Rate limiting:** 60/min (access, validate-token-limit), 30/min (create-checkout-session).
- **Security headers:** X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy.
- **Webhook be secret:** Produkcijoje 503; dev – tik su `ALLOW_WEBHOOK_WITHOUT_SECRET=1` (dokumentuota).
- **Supabase:** Service role naudojamas tik backend/Vercel serverless – niekada frontende.

---

## 4. Rizikos ir spragos (detaliau)

### 4.1 CORS Vercel `api/` – whitelist (įgyvendinta)

**Kodas:** `api/access.js`, `api/create-checkout-session.js`:  
Leidžiami origin – `FRONTEND_ORIGIN` + `http://localhost:5173`, `http://127.0.0.1:5173`. `Access-Control-Allow-Origin` nustatomas tik jei request `origin` yra whitelist'e; kitaip antraštė nestatoma (cross-origin iš neleistino šaltinio blokuojamas naršyklėje).

### 4.2 Rate limiting už reverse proxy

**Backend:** `get_remote_address` → `request.client.host`. Už Nginx/Vercel/Heroku visi vartotojai gali matytis kaip vienas IP – limitas 30/min checkout gali apriboti visus.

**Dokumentuota:** `docs/security.md` – rekomenduojama naudoti `X-Forwarded-For` / `X-Real-IP` tik iš patikimo proxy (kitaip – IP spoofing).

**Rekomendacija (MUST produkcijai su atskiru backend):** Konfigūruoti patikimą proxy ir `key_func`, skaitančią tikrą kliento IP iš antraščių (ir proxy whitelist).

### 4.3 Email GET užklausos URL (PII)

**GET /api/access?email=** – el. paštas perduodamas query string. OWASP / GDPR:

- Serverio ir proxy logai gali saugoti pilną URL (PII).
- Naršyklės istorija, referrer – galimas PII nutekėjimas.
- Geriausia praktika – jautrius duomenis siųsti kūne (POST) arba neeksponuoti tiesiogiai.

**Rekomendacija (SHOULD):** Peržiūrėti ar įmanoma POST /api/access su email body; arba išlaikyti GET bet griežtai apriboti logavimą (ne loguoti query string) ir dokumentuoti riziką.

### 4.4 Webhook idempotentiškumas (dublikatai)

Stripe gali siųsti tą patį eventą kelis kartus. Dabartinė logika: upsert pagal email + `max(current, purchased)` – tai idempotentška to paties vartotojo atžvilgiu. Jei vėliau bus kita logika (pvz. vienkartiniai kreditai), reikėtų naudoti `event.id` kaip idempotency key (įrašyti apdorotus event ID ir neperdirbti).

**Rekomendacija (COULD):** Lentelė `processed_webhook_events(id)` ir tikrinti prieš upsert – apsauga nuo bet kokių dublikatų.

### 4.5 Vercel env – jautrūs kintamieji

Vercel funkcijose naudojami `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`. Turi būti nustatomi kaip **Environment Variables** (Production/Preview), ne build-time viešinimui. Vercel default – env prieinami ir build, ir runtime; svarbu neeksponuoti per `VITE_*` (frontend).

**Patikrinti:** Frontende naudojami tik `VITE_API_URL`, `VITE_GLOSSARY_URL` – be secret. ✅

### 4.6 Supabase lentelė be RLS

`user_access` – nėra RLS politikos. Prieiga į lentelę – tik per backend/Vercel su **service role**. Service role RLS bypass'inti vis tiek būtų; svarbu, kad prie lentelės niekada nebūtų kreipiamasi su anon key iš kliento. Dabartinė architektūra tai užtikrina.

**Rekomendacija:** Jei kada nors atsiras anon key prieiga prie tos pačios DB – įvesti RLS, kad `user_access` būtų nepasiekiama per anon.

---

## 5. Nuorodos į industrijos / GitHub praktikas

- **Stripe webhook:** [Stripe – Receiving Webhooks / Signatures](https://docs.stripe.com/webhooks/signatures) – raw body, signing secret, timestamp tolerance (replay apsauga). Projektas atitinka.
- **Stripe replay / idempotency:** [Stripe Webhook Duplicate Events](https://www.hooktunnel.com/blog/stripe-webhook-duplicate-events) – rekomenduojama event ID idempotency; dabartinis upsert pagal email pakanka paprastam atvejui.
- **CORS su credentials:** FastAPI/OWASP – su `allow_credentials=True` negalima `allow_origins=["*"]`; reikia konkrečių origin. Backend tai laikosi; Vercel api – origin gali būti `*` kai Origin antraštės nėra.
- **Supabase service role:** [Supabase – Service Role](https://supabase.com/docs/guides/troubleshooting/performing-administration-tasks-on-the-server-side-with-the-servicerole-secret-BYM4Fa) – tik serverio pusėje; niekada frontende. Projektas laikosi.
- **PII užklausos:** OWASP ASVS 8.3.1 – jautrų duomenų ne query string; GDPR – mažinti PII loguose. GET /api/access?email= – silpna vieta.
- **Rate limit už proxy:** Dažna praktika – naudoti `X-Forwarded-For` / `X-Real-IP` iš vieno patikimo proxy ir (jei įmanoma) proxy IP whitelist.

---

## 6. MOSCOW – saugumo sprendimai

### MUST (būtina – produkcijos saugumui)

| # | Priemonė | Aprašymas |
|---|----------|-----------|
| M1 | **STRIPE_WEBHOOK_SECRET produkcijoje** | Niekada neleisti webhook be signing secret prod. Jau įdiegta (503 be secret); užtikrinti env. |
| M2 | **HTTPS visur** | Frontend ir backend tik per HTTPS. Užtikrinti hosting / reverse proxy lygmenyje. |
| M3 | **FRONTEND_ORIGIN produkcijoje** | Nustatyti pilną https frontend URL (be `/`); CORS ir redirect'ai teisingi. |
| M4 | **Rate limit už proxy (jei atskiras backend)** | Jei deploy už Nginx/Vercel proxy – naudoti tikrą kliento IP iš `X-Forwarded-For` / `X-Real-IP` per patikimą proxy; dokumentuota `docs/security.md`. |

### SHOULD (rekomenduojama – artimiausiu laiku)

| # | Priemonė | Aprašymas |
|---|----------|-----------|
| S1 | **CORS Vercel api/** | Įgyvendinta: whitelist (`FRONTEND_ORIGIN` + localhost); neleistinam origin ne grąžinamas `*`. |
| S2 | **Email ne GET query** | Peržiūrėti POST /api/access su email body (arba minimalus logavimas + dokumentuota PII rizika). |
| S3 | **Priklausomybių auditą** | `pip-audit` (backend), `npm audit` (frontend); Dependabot ar periodinis atnaujinimas. Jau minima README. |
| S4 | **Webhook nesėkmių alertai** | Didelį webhook klaidų skaičių signalizuoti (log aggregation / Sentry). |

### COULD (geriau turėti)

| # | Priemonė | Aprašymas |
|---|----------|-----------|
| C1 | **Webhook event idempotency** | Lentelė apdorotų Stripe event ID – išvengti bet kokių dublikatų. |
| C2 | **CSP** | Content-Security-Policy derinant su Stripe (script, frame); dažnai reikalauja kruopštaus derinimo. |
| C3 | **Strict-Transport-Security** | HSTS antraštė (dažnai nustatoma reverse proxy). |

### WON'T (šiuo etapu neprioritetas)

| # | Priemonė | Priežastis |
|----|----------|------------|
| W1 | **CSRF tokenai** | Nėra cookie-based sesijų; API naudoja tik JSON. Jei vėliau pridedami cookies – įvesti CSRF. |
| W2 | **Viruskas input sanitization/XSS backend** | Atgalinis API grąžina JSON; XSS rizika – frontend. Backend validacija (Pydantic) pakanka. |

---

## 7. Veiksmų santrauka

1. **Produkcijos paruošimas:** M1–M4 (webhook secret, HTTPS, FRONTEND_ORIGIN, rate limit už proxy).
2. **Artimiausi pakeitimai:** S1 (CORS Vercel), S2 (email GET→POST arba logavimo politika), S3 (audit), S4 (alertai).
3. **Vėlesni patobulinimai:** C1 (idempotency), C2 (CSP), C3 (HSTS).

Šis dokumentas – nuoroda giliam auditui; trumpesnis kas įdiegta ir produkcijos reikalavimai – [docs/security.md](security.md).
