# TODO – Promptų Anatomija Home

**Atnaujinta:** 2026-03-07. Žingsniai iš kodo bazės analizės – prioritetai ir seka.

---

## Veiksmų planas (žingsniai)

### 1. Deploy (kritinis – webhook veiks tik su viešu URL)
- [ ] Pasirinkti hostą (Vercel frontend + backend arba atskiras serveris).
- [ ] Pridėti deploy konfigūraciją (Vercel ar kt.) ir produkcijos env: `FRONTEND_ORIGIN`, backend URL, domenai.
- [ ] Po deploy: Stripe Dashboard → Webhooks → Add endpoint → `https://<backend-domain>/api/webhooks/stripe`, event `checkout.session.completed`; įrašyti signing secret į `STRIPE_WEBHOOK_SECRET`.

### 2. SuccessPage – nepažadėti el. laiško
- [ ] Pakeisti tekstą: nepažadėti el. laiško, kol jis neįdiegtas, arba pridėti išlygą („Jei per X min negausite – susisiekite“).

### 3. Webhook – struktūra ir dokumentacija
- [x] Išskirti `checkout.session.completed` apdorojimą; webhook įrašo į Supabase `user_access` (highest_plan).
- [x] Docs: [docs/supabase-user-access.sql](docs/supabase-user-access.sql) – lentelė; env `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.

### 4. Webhook → DB + prieiga (MVP atlikta)
- [x] Po apmokėjimo: upsert į Supabase `user_access` (email, highest_plan, stripe_customer_id). GET `/api/access?email=` grąžina prieigą ir `can_upgrade_to`. Checkout blokuoja (409) jei jau turi tą patį/aukštesnį planą.
- [ ] Magic link / email – įgyvendinti kartu su Training App repo.

### 5. Kiti (turinyje ir UX)
- [ ] Skaičiai LP – žr. skyrių **Skaičiai** žemiau.
- [ ] `VITE_GLOSSARY_URL` – žr. **Žodynas (Repo)**.
- [ ] Footer, kontrastas, focus trap – žr. **Frontend UX**.
- [x] **Daugiakalbis režimas (LT/EN)** – įdiegta (LocaleContext, lt.json/en.json, kalbos perjungiklis Navbar, localStorage, document lang/meta). Žr. README § Daugiakalbis režimas.

---

## Mokėjimas / prieiga

Detalus kontekstas: skyriai **Kol kas negalima**, **Kainodara ir teisė** žemiau.

*(Backend: įdiegta Pydantic Settings, GET /health, pytest testai, webhook be secret grąžina 503 jei ne ALLOW_WEBHOOK_WITHOUT_SECRET.)*

## Kol kas negalima (priklauso nuo išorės)

- **Webhook → DB + prieiga:** MVP įdiegta – Supabase `user_access`, webhook upsert, GET /api/access, checkout 409 jei jau nusipirkta. Lentelė: [docs/supabase-user-access.sql](docs/supabase-user-access.sql).
- **Magic link:** Siųsti prisijungimo nuorodą po apmokėjimo – reikia Supabase Auth arba email provider. Įgyvendinsime kartu su webhook.
- **Prieigos tikrinimas:** Atlieka Training App (app.promptuanatomija.lt); šiame repo tik webhook sukuria prieigą.
- **Login į mokymų app:** Magic link / passwordless – įgyvendinamas Training App repo su Supabase Auth.

## Kainodara ir teisė

- **Grąžinimo taisyklės:** Kol nėra parašytų sąlygų – LP neįvardinti „Money-Back Policy“ arba pakeisti į „Grąžinimo sąlygos – susisiekite“. Planas: [docs/pricing-plan.md](docs/pricing-plan.md) § 4.4, 6.4.

## Skaičiai

Pradiniai skaičiai LP („2,481 Commits“, „500+ narys“, „12 modulių“, „500+ Repo“, „Liko 14 licencijų“) – patikslinti vėliau; atnaujinti į realius ar sutartus (žingsnis 5).

## Žodynas (Repo)

Kai Training App bus paruoštas – nustatyti tikrą žodyno URL į frontend env: `VITE_GLOSSARY_URL` (pvz. `https://app.promptuanatomija.lt/glossary`). Kol ne – meniu „Repo“ nerodomas (navbar rodo „Repo“ tik kai `VITE_GLOSSARY_URL` nustatytas).

## Architektūra ir hostinimas

- Projekto architektūra (repo struktūra, domainai) – pagal System Architecture Concept (minimalios trinties konceptas).
- Hostinimo sprendimas – žingsnis 1 (Vercel, Hetzner, ir t. t.).

## Priežiūra

- Jei frontend bus plėčiamas į TypeScript (`.ts`/`.tsx`), atnaujinti `.cursor/rules/frontend.mdc` globs.

## Frontend UX (likę iš audito plano)

- **Kontrastas:** Patikrinti slate-500 / slate-400 ant baltos ir ant #0B1320 (WCAG AA 4.5:1); jei reikia – pakoreguoti spalvas.
- **Footer:** Kai bus tikri URL – pakeisti „Netrukus“ atgal į nuorodas (LinkedIn, Discord HQ, System Log, Legal, Cookies).
- **Focus trap:** Jei bus pridedami modaliniai langai – įvesti focus trap ir Escape uždarymą.
