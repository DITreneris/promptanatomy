# Promptų Anatomija – Home (pardavimų puslapis)

Marketinginis tinklalapis ir minimalus backend mokėjimams per Stripe. Tikslas: konvertuoti lankytojus ir rinkti mokėjimus už mokymų turinį „Promptų anatomija“.

## Struktūra

- **frontend/** – Vite + React, landing puslapis, pricing, CTA → Stripe Checkout, puslapiai `/success` ir `/cancel`.
- **backend/** – FastAPI, entry point `backend/main.py`: `GET /health`, `GET /api/access` (prieiga pagal email), `POST /api/create-checkout-session`, `POST /api/webhooks/stripe`, `POST /api/validate-token-limit`. Konfigūracija per Pydantic Settings (`backend/core/config.py`). MVP upgrade: Supabase lentelė `user_access` (highest_plan), webhook įrašo prieigą, checkout blokuoja jei jau turi planą – žr. [docs/supabase-user-access.sql](docs/supabase-user-access.sql).

## Reikalavimai

- Node.js 18+ (frontend)
- Python 3.10+ (backend)
- Stripe paskyra (test režimui – test raktai)

## Greitas startas

### 1. Backend

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# Linux/macOS: source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Redaguokite .env: STRIPE_*, FRONTEND_ORIGIN; MVP upgrade – SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (žr. lentelę žemiau)
uvicorn main:app --reload --port 8000
```

Backend: `http://localhost:8000`. Health: `GET http://localhost:8000/health`.

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Jei backend kitame porte – nustatykite VITE_API_URL (default http://localhost:8000)
npm run dev
```

Frontend: `http://localhost:5173`

### 3. Stripe

- **Dashboard:** Sukurkite Product ir 4 vienkartinius Price (39, 99, 149, 199 EUR). Nukopijuokite Price ID į `backend/.env` kaip `STRIPE_PRICE_ID_PLAN_1`, `_2`, `_3`, `_4`.
- **Webhook (lokaliai):** Naudokite Stripe CLI:
  ```bash
  stripe listen --forward-to localhost:8000/api/webhooks/stripe
  ```
  Pasiimkite webhook signing secret (`whsec_...`) ir įrašykite į `STRIPE_WEBHOOK_SECRET`.
- **Produkcijoje (Vercel):** Stripe Dashboard → Webhooks → Add endpoint, URL `https://www.promptanatomy.app/api/stripe-webhook`, event `checkout.session.completed`. Vercel serverless funkcija: `api/stripe-webhook.js`. Būtina `STRIPE_WEBHOOK_SECRET` (Vercel env). **Atskiras FastAPI backend:** URL būtų `https://<backend-domain>/api/webhooks/stripe`. Lokaliai galima naudoti `ALLOW_WEBHOOK_WITHOUT_SECRET=1` (tik dev).

## Aplinkos kintamieji

### Backend (`backend/.env`)

| Kintamasis | Aprašymas |
|------------|-----------|
| `STRIPE_SECRET_KEY` | Stripe secret key (test arba live) |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret (`whsec_...`) |
| `STRIPE_PRICE_ID_PLAN_1` … `_4` | Stripe Price ID kiekvienam planui (39 / 99 / 149 / 199 EUR); žr. `backend/.env.example` |
| `FRONTEND_ORIGIN` | Frontend URL be `/` (pvz. `http://localhost:5173` arba `https://www.promptanatomy.app`) |
| `MAX_TOKENS_PER_REQUEST` | (Optional) Maks. tokenai per užklausą `/api/validate-token-limit`; default 4096. |
| `ALLOW_WEBHOOK_WITHOUT_SECRET` | (Optional) Jei `1` – webhook priimamas be secret (tik development). Produkcijoje nenaudoti. |
| `SUPABASE_URL` | (Optional) Supabase projekto URL – prieigos tikrinimui ir webhook upsert į `user_access`. |
| `SUPABASE_SERVICE_ROLE_KEY` | (Optional) Supabase service role key – backend naudoja tik serverio pusėje. |
| `ACCESS_TOKEN_SECRET` | (Optional) Bendras secret su mokymų app – magic-link redirect (`GET /api/success-redirect`). Sugeneruoti: `openssl rand -base64 32`. |
| `TRAINING_REDIRECT_BASE` | (Optional) Base URL į mokymų app (default `https://www.promptanatomy.app/anatomija`). |
| `ACCESS_TOKEN_EXPIRY_DAYS` | (Optional) Kiek dienų galioja magic-link (default 30). |

### Frontend (`frontend/.env`)

| Kintamasis | Aprašymas |
|------------|-----------|
| `VITE_API_URL` | Backend / API base URL. Lokaliai default `http://localhost:8000`. Produkcijoje (Vercel) jei nenustatyta – naudojamas `window.location.origin`, t. y. kvietimai eina į tą patį domeną (`/api/access`, `/api/stripe-webhook`). |
| `VITE_GLOSSARY_URL` | (Optional) Training app žodyno nuoroda; jei nustatyta, meniu „Repo“ atidaro šią nuorodą naujame skirtuke |

## Daugiakalbis režimas (LT/EN)

Frontende įdiegtas LT/EN perjungimas (Navbar). Numatytoji kalba – **EN**; pirmą kartą atėjusiam vartotojui kalba nustatoma automatiškai pagal naršyklės kalbą (`navigator.language` / `navigator.languages`). Vėliau galima pridėti kitas kalbas pagal tą patį principą. Vertimai – `frontend/src/i18n/translations/lt.json`, `en.json`. Pasirinkimas išsaugomas į `localStorage` ir atnaujina `document.lang`, `<title>` ir meta. Naujam tekstui – raktas į abu JSON ir `t('key')` per `useLocale()` (`frontend/src/i18n/LocaleContext.jsx`).

## Backend testai

```bash
cd backend
pip install -r requirements.txt
python -m pytest tests/ -v
```
(Jei naudojate venv, pirmiausia: `python -m venv .venv` ir aktyvuokite jį.)

## Priklausomybių saugumo auditą

Prieš release arba periodiškai paleiskite auditą, kad patikrintumėte žinomas pažeidžiamumų duomenų bazėse:

- **Backend:** `pip install pip-audit` tada `pip-audit` (backend venv aktyvuotas).
- **Frontend:** `cd frontend && npm audit` (galima `npm audit --production` tik production dependencies; `npm audit fix` – ne kritiniams atnaujinimams).

Iš repo šaknies: `npm run audit:frontend`, `npm run audit:backend` (jei įdiegta `pip-audit`).

Daugiau saugumo praktikų: [docs/security.md](docs/security.md).

## Build ir preview

```bash
# Frontend
cd frontend && npm run build && npm run preview

# Backend – produkcijoje naudokite, pvz.:
# uvicorn main:app --host 0.0.0.0 --port 8000
```

## Dokumentacija

- **Dokumentų indeksas** (visi dokumentai, žmonėms ir agentams): [docs/INDEX.md](docs/INDEX.md)
- Produkto turinio aprašas: [README_SOT.md](README_SOT.md)
- Vėlesni darbai ir patikslinimai: [TODO.md](TODO.md)
