# Saugumas

Trumpas saugumo apžvalgos dokumentas: kas jau įdiegta, rekomendacijos ir deployment reikalavimai.

**Gili analizė (architektūra, jautrūs taškai, rizikos, MOSCOW):** [docs/security-audit-deep.md](security-audit-deep.md).

## Kas jau padaryta

- **Secrets:** Jautri reikšmės tik per aplinkos kintamuosius; backend naudoja Pydantic Settings ir `SecretStr` (Stripe raktai). `.env` failai nėra commitinami (žr. projekto `.gitignore`).
- **Stripe webhook:** Naudojamas raw body ir `Stripe-Signature` verifikacija; be `STRIPE_WEBHOOK_SECRET` – 503. Dev režime (`ALLOW_WEBHOOK_WITHOUT_SECRET=1`) payload vis tiek apdorojamas (JSON parse, `checkout.session.completed` → upsert į `user_access`), bet parašas **netikrinamas** – naudoti tik lokaliai, niekada produkcijoje.
- **CORS:** Backend – fiksuotos `allow_origins` (frontend origin + localhost). Vercel `api/` – whitelist (`FRONTEND_ORIGIN` + localhost); neleistinam origin negrąžinamas `*`.
- **Įvesties validacija:** `customer_email` – Pydantic `EmailStr`, max 254 simboliai; `text` (validate-token-limit) – max 50 000 simbolių; tokenų limitas per užklausą.
- **Rate limiting (FastAPI):** `POST /api/create-checkout-session` ir `POST /api/validate-token-limit` apriboti (30/min ir 60/min pagal IP); `GET /api/access` – 60/min.
- **Rate limiting (Vercel `api/`):** in-memory sliding window per instance ([api/lib/rate-limit.js](../api/lib/rate-limit.js)) – IP iš `X-Forwarded-For` (pirmas hop) / `X-Real-IP`. Over limit → **429** + `Retry-After`. Fail-open jei helper krenta. Limitai: `GET /api/access` **30/min**, `GET /api/generate-access-link` **20/min**, `POST /api/create-checkout-session` **30/min**. Multi-instance / shared counter → upgrade į `@upstash/ratelimit` (žr. [supabase-hardening-plan.md](supabase-hardening-plan.md) F3).
- **Security headers:** `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`.

## Produkcija ir HTTPS

- **HTTPS** turi būti užtikrintas reverse proxy / hosting lygmenyje (ne FastAPI kode). Produkcijoje backend ir frontend turi būti prieinami tik per HTTPS.
- **FRONTEND_ORIGIN** produkcijoje nustatykite į pilną frontend URL su `https://`, pvz. `https://www.promptanatomy.app` (be galinio `/`).
- **STRIPE_WEBHOOK_SECRET** būtinas produkcijoje; `ALLOW_WEBHOOK_WITHOUT_SECRET` naudokite tik lokaliai.
- **Produkcijos env checklist (prieš release):** [docs/deploy-and-webhook.md § 2](deploy-and-webhook.md#2-prieš-release-produkcijos-env-checklist).

## Rate limiting už reverse proxy

Backend naudoja SlowAPI su `get_remote_address` (kliento IP iš `request.client.host`). Už reverse proxy (Nginx, Vercel, Heroku ir kt.) visos užklausos gali atrodyti iš vieno IP (proxy), todėl rate limit gali apriboti visus vartotojus kartu. Produkcijoje rekomenduojama naudoti tikrą kliento IP iš antraščių `X-Forwarded-For` arba `X-Real-IP` kaip limiterio `key_func` – **tik jei proxy yra patikimas** ir perduoda šias antraštes kontroliuotai (kitaip galimas IP spoofing). Tai reikalauja pakeitimo `backend/main.py` ir konfigūracijos (pvz. whitelist proxy IP).

## Priklausomybės

- Periodiškai: `pip-audit` (backend), `npm audit` (frontend). Žr. [README – Priklausomybių saugumo auditą](../README.md#priklausomybių-saugumo-auditą).
- Galima naudoti Dependabot (`.github/dependabot.yml`) automatiniams atnaujinimų PR.

## Papildomi žingsniai (pageidaujama)

- **CSP (Content-Security-Policy):** Jei įvedate – reikia derinimo su Stripe (scriptai, iframe).
- **Logging / alerting:** Webhook nesėkmės jau loguojamos; galima pridėti metrikas ar alertus dideliam nesėkmių skaičiui.
