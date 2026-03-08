# Saugumas

Trumpas saugumo apžvalgos dokumentas: kas jau įdiegta, rekomendacijos ir deployment reikalavimai.

## Kas jau padaryta

- **Secrets:** Jautri reikšmės tik per aplinkos kintamuosius; backend naudoja Pydantic Settings ir `SecretStr` (Stripe raktai). `.env` failai nėra commitinami (žr. projekto `.gitignore`).
- **Stripe webhook:** Naudojamas raw body ir `Stripe-Signature` verifikacija; be `STRIPE_WEBHOOK_SECRET` – 503. Dev režime (`ALLOW_WEBHOOK_WITHOUT_SECRET=1`) payload vis tiek apdorojamas (JSON parse, `checkout.session.completed` → upsert į `user_access`), bet parašas **netikrinamas** – naudoti tik lokaliai, niekada produkcijoje.
- **CORS:** Fiksuotos `allow_origins` (frontend origin + localhost); `allow_headers` susiaurintas iki `Content-Type`, `Authorization`.
- **Įvesties validacija:** `customer_email` – Pydantic `EmailStr`, max 254 simboliai; `text` (validate-token-limit) – max 50 000 simbolių; tokenų limitas per užklausą.
- **Rate limiting:** `POST /api/create-checkout-session` ir `POST /api/validate-token-limit` apriboti (30/min ir 60/min pagal IP).
- **Security headers:** `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`.

## Produkcija ir HTTPS

- **HTTPS** turi būti užtikrintas reverse proxy / hosting lygmenyje (ne FastAPI kode). Produkcijoje backend ir frontend turi būti prieinami tik per HTTPS.
- **FRONTEND_ORIGIN** produkcijoje nustatykite į pilną frontend URL su `https://`, pvz. `https://promptuanatomija.lt` (be galinio `/`).
- **STRIPE_WEBHOOK_SECRET** būtinas produkcijoje; `ALLOW_WEBHOOK_WITHOUT_SECRET` naudokite tik lokaliai.

## Rate limiting už reverse proxy

Backend naudoja SlowAPI su `get_remote_address` (kliento IP iš `request.client.host`). Už reverse proxy (Nginx, Vercel, Heroku ir kt.) visos užklausos gali atrodyti iš vieno IP (proxy), todėl rate limit gali apriboti visus vartotojus kartu. Produkcijoje rekomenduojama naudoti tikrą kliento IP iš antraščių `X-Forwarded-For` arba `X-Real-IP` kaip limiterio `key_func` – **tik jei proxy yra patikimas** ir perduoda šias antraštes kontroliuotai (kitaip galimas IP spoofing). Tai reikalauja pakeitimo `backend/main.py` ir konfigūracijos (pvz. whitelist proxy IP).

## Priklausomybės

- Periodiškai: `pip-audit` (backend), `npm audit` (frontend). Žr. [README – Priklausomybių saugumo auditą](../README.md#priklausomybių-saugumo-auditą).
- Galima naudoti Dependabot (`.github/dependabot.yml`) automatiniams atnaujinimų PR.

## Papildomi žingsniai (pageidaujama)

- **CSP (Content-Security-Policy):** Jei įvedate – reikia derinimo su Stripe (scriptai, iframe).
- **Logging / alerting:** Webhook nesėkmės jau loguojamos; galima pridėti metrikas ar alertus dideliam nesėkmių skaičiui.
