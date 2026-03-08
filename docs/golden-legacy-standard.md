# Golden Legacy Standard – regresijos apsauga

**Tikslas:** Fiksuoti veikiančią būseną ir kritinius kelius, kad pakeitimai nepalaužtų to, kas jau veikia. Prieš didesnius refaktorinimus ar naujas funkcijas – patikrinti, kad šis standartas išlieka tenkinamas.

**Data fiksavimo:** 2026-03-08

---

## 1. Kas laikoma „veikiančiu“

- LP rodomas, visos sekcijos matomos (Hero, Kas yra Prompt Anatomy, Methodology, Ecosystem, Pricing, Footer).
- Kalbos perjungimas LT/EN veikia; LT naudoja DI, EN – AI (pagal [language-guidelines-en-lt.md](language-guidelines-en-lt.md)).
- Checkout srautas: prieigos tikrinimas (email) → planų pasirinkimas → Stripe Checkout → success/cancel puslapiai.
- Backend API ir webhook atsako pagal aprašytas sutartis (žr. skyrių 2–3).
- Frontend build (`npm run build`) ir backend testai (`pytest`) eina sėkmingai.

---

## 2. Backend – kritiniai kontraktai

**Būtina nekeisti (arba keisti tik su atitinkamais testų/doc atnaujinimais):**

| Endpoint / elgsena | Tikėtinas atsakymas / elgsena | Testas |
|--------------------|-------------------------------|--------|
| `GET /health` | 200, `{"status": "ok"}` | `TestHealth.test_health_returns_200_and_ok` |
| `GET /api/access` be `email` | 400, detail apie email | `TestGetAccess.test_missing_email_returns_400` |
| `GET /api/access?email=invalid` | 400 | `TestGetAccess.test_invalid_email_returns_400` |
| `GET /api/access` (Supabase nekonfigūruotas) | 503, "not configured" | `TestGetAccess.test_access_not_configured_returns_503` |
| `GET /api/access?email=...` (su DB) | 200, `highest_plan`, `allowed_modules`, `can_upgrade_to` | `TestGetAccess.test_returns_access_shape_*` |
| `POST /api/create-checkout-session` be `plan_id` | 422 | `TestCreateCheckoutSession.test_missing_plan_id_returns_422` |
| `POST /api/create-checkout-session` netinkamas `plan_id` (Phase 1: tik "1", "2") | 422 planams "0", "3", "4", "5" | `TestCreateCheckoutSession.test_invalid_plan_id_returns_422` |
| `POST /api/create-checkout-session` netinkamas `customer_email` | 422 | `TestCreateCheckoutSession.test_invalid_customer_email_returns_422` |
| Checkout nekonfigūruotas (Stripe) | 503 | `TestCreateCheckoutSession.test_checkout_not_configured_returns_503` |
| Jau įsigytas planas (Supabase) | 409, "already" | `TestCreateCheckoutSession.test_already_purchased_returns_409` |
| `POST /api/webhooks/stripe` be secret (jei reikalaujama) | 503 | (webhook testai pagal backend) |
| `POST /api/validate-token-limit` | 200 + `ok`, `tokens`; 429 virš limito; 422 per ilgas text | `TestValidateTokenLimit.*` |

**Kaip tikrinti:** `cd backend && pytest` – visi testai turi praeiti.

---

## 3. Frontend – kritiniai keliai

**Maršrutai (App.jsx):**

| Kelias | Komponentas / elgsena |
|--------|------------------------|
| `/` | HomePage (LP, locale iš localStorage/naršyklės) |
| `/en` | HomePage su locale EN (ne 404) |
| `/success` | SuccessPage |
| `/cancel` | CancelPage |
| `/privacy` | PrivacyPage |
| `/terms` | TermsPage |
| bet koks kitas | Redirect į `/` |

**LP struktūra (HomePage):**

- Skip link → `#main-content`.
- Navbar (brand, nuorodos, kalbos LT|EN, CTA).
- Hero (h1, subtitle, 3 bullet, CTA scroll į pricing).
- WhatIsPromptAnatomy (h2, intro, 4 bullet).
- Methodology (section id metodologija).
- Ecosystem (section id ekosistema).
- Pricing (section id pricing, prieigos forma, 2 planai Phase 1).
- Footer (brand, tagline, nuorodos, legal, copyright).

**i18n:** Visi raktai naudojami iš `lt.json` / `en.json`; nėra hardcoded teksto komponentuose (Hero, WhatIs, Methodology, Ecosystem, Pricing, Footer, Navbar, Success, Cancel). LT – terminas DI; EN – AI.

**Kaip tikrinti:** `cd frontend && npm run build` – build turi pavykti. Rankinis smoke: atidaryti `/`, `/en`, `/success`, `/cancel`, perjungti kalbą, scroll į pricing, patikrinti prieigos formą.

---

## 4. Kas nekeičiama (golden legacy)

- **React + Vite** – struktūra, routing (React Router), build pipeline. Nėra migracijos į Next.js ar SSR (pagal [UI_UX_SEO_MOSCOW_PLAN.md](UI_UX_SEO_MOSCOW_PLAN.md) WON'T).
- **Stripe flow** – create-checkout-session → Stripe Checkout → success/cancel; webhook `checkout.session.completed` → Supabase `user_access`. Nepažeisti endpointų kontraktų.
- **API:** `api.js` – `getAccess`, `createCheckoutSession`; backend atsakymų formatai (JSON su `url`, `highest_plan`, `can_upgrade_to` ir t. t.).
- **Env:** Backend – Pydantic Settings, `STRIPE_*`, `SUPABASE_*`, `FRONTEND_ORIGIN`. Frontend – `VITE_API_URL` (optional). Nepašalinti naudojamų kintamųjų.

---

## 5. Kada atnaujinti šį dokumentą

- Pridedant naujus backend endpointus arba keičiant atsakymo formatus – įrašyti į 2 skyrių ir atnaujinti/pridėti testus.
- Pridedant naujus frontend maršrutus ar LP sekcijas – atnaujinti 3 skyrių.
- Pakeitus „WON'T“ (pvz. priimant SSR) – atnaujinti 4 skyrių ir roadmap.

**Regresijos tikrinimas:** prieš merge/release – paleisti `backend`: `pytest`, `frontend`: `npm run build`; pagal poreikį – rankinis smoke pagal 3 skyrių.
