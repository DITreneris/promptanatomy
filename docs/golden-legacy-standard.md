# Golden Legacy Standard – regresijos apsauga

**Tikslas:** Fiksuoti veikiančią būseną ir kritinius kelius, kad pakeitimai nepalaužtų to, kas jau veikia. Prieš didesnius refaktorinimus ar naujas funkcijas – patikrinti, kad šis standartas išlieka tenkinamas.

**Data fiksavimo:** 2026-03-19 (atnaujinta pagal CHANGELOG Unreleased: Navbar tankumas, Hero badge/bullets, Footer #faq, XPixel)

---

## 1. Kas laikoma „veikiančiu“

- LP rodomas, visos sekcijos matomos (Hero, Kas yra Prompt Anatomy, Methodology, Ecosystem, Pricing, Footer). **Navbar (desktop):** viršutiniame meniu rodomi **Kas yra Promptų Anatomija** / **What is Prompt Anatomy** (#what-is, `nav.whatIs`) ir **Kainodara** (#pricing) + LT/EN + CTA; kai vartotojas turi prieigą (`hasAccess` iš HomePage, t. y. `access?.highest_plan > 0`), papildomai rodomas **Mokymai** (nuoroda į `/anatomija/`, naujas tabas). Ecosystem, Methodology, Repo, Training, FAQ – tik **mobile drawer** (visi pasiekiami). **Footer** System skyriuje – nuoroda į #faq (`footer.faq`). **Hero:** badge rodo tik „Sistemos būsena: stabili“ (be commitų skaičiaus); antraštė LT „Pradėk kurti.“; 3 bullet'ai (i18n `hero.bullet1`–`hero.bullet3`, sąrašas `Hero.jsx` per `HERO_BULLET_KEYS`). Skip link ir prieigos forma naudoja `focus-visible:ring`; Methodology – `brand-dark` / `brand-accent` tokenai; Footer kritinis tekstas – `text-slate-500`; blink-caret – `var(--color-brand-accent)` (index.css).
- Kalbos perjungimas LT/EN veikia; LT naudoja DI, EN – AI (pagal [language-guidelines-en-lt.md](language-guidelines-en-lt.md)). Locale-aware URL: `/lt` ir `/en` rodo atitinkamą kalbą; perjungus kalbą Navbar nukreipia į `/lt` arba `/en` (share'inamas linkas atspindi kalbą).
- SEO: `SeoHead.jsx` nustato canonical ir og:url pagal pathname; ant home route'ų (`/`, `/lt`, `/en`) – hreflang (lt, en, x-default). Twitter Card ir og:url įdiegti (`index.html` + dinamiškai). **og-image.png** – socialiniam preview (Twitter, LinkedIn, Facebook) laikomas `frontend/public/og-image.png`; build kopijuoja į `dist/`; `index.html` nurodo `og:image` ir `twitter:image` į `https://www.promptanatomy.app/og-image.png`. Nepašalinti failo iš `public/`.
- Checkout srautas: prieigos tikrinimas (email) → planų pasirinkimas → Stripe Checkout → success/cancel puslapiai.
- Prieigos srautas (susimokėjus): LP „Eiti į mokymus" → `GET /api/generate-access-link?email=...` → magic link su HMAC tokenu → training app atrakina modulius.
- Backend API ir webhook atsako pagal aprašytas sutartis (žr. skyrių 2–3).
- Frontend build (`npm run build`) ir backend testai (`pytest`) eina sėkmingai.
- Training app build (`cd apps/prompt-anatomy && npm run build`) eina sėkmingai.
- Prieigos tikrinimas LP: email su `highest_plan === 0` rodo amber bloką „Prieiga nerasta" + CTA „Gauti prieigą".

---

## 2. Backend – kritiniai kontraktai

**Būtina nekeisti (arba keisti tik su atitinkamais testų/doc atnaujinimais):**

| Endpoint / elgsena | Tikėtinas atsakymas / elgsena | Testas |
|--------------------|-------------------------------|--------|
| `GET /health` | 200, `{"status": "ok"}` | `TestHealth.test_health_returns_200_and_ok` |
| `GET /api/success-redirect` be `session_id` arba netinkamas session | 400, detail "session_id required" / "Invalid or unpaid session" | (rankinis arba testas) |
| `GET /api/success-redirect?session_id=cs_xxx` (validus paid session) | 200, `{ "redirect_url": "https://...?access_tier=...&expires=...&token=..." }` | (rankinis arba testas) |
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
| `GET /api/verify-access` be parametrų | 400, `{"error": "Missing access_tier, expires, or token"}` | (rankinis) |
| `GET /api/verify-access?access_tier=3&expires=...&token=...` (validus) | 200, `{"access_tier": 3}` | (rankinis) |
| `GET /api/verify-access` su pasibaigusiu token | 401, `{"error": "Link expired"}` | (rankinis) |
| `GET /api/generate-access-link` be `email` | 400, `{"detail": "Valid email required"}` | (rankinis) |
| `GET /api/generate-access-link?email=...` (neturi prieigos) | 404, `{"detail": "No access found for this email"}` | (rankinis) |
| `GET /api/generate-access-link?email=...` (turi prieigą Supabase) | 200, `{"redirect_url": "https://...?access_tier=...&expires=...&token=..."}` | (rankinis) |

**Kaip tikrinti:** `cd backend && pytest` – visi testai turi praeiti.

**Žinomos aplinkos pastabos:**
- `test_api.py` gali failinti lokaliai dėl `wrapt` paketo nesuderinamumo su Python 3.11+ (`formatargspec` pašalintas iš `inspect`). Fix: `pip install --upgrade wrapt` arba naudoti venv su tinkamomis versijomis. CI/Vercel aplinkoje problema nepasireiškia.
- `backend/token_limits.py` (anksčiau `limits.py`) – pervadinta, nes senas pavadinimas shadino `limits` PyPI paketą, naudojamą `slowapi`. **Nekurti naujo `limits.py` failo backend/ šaknyje.**
- `core/config.py` – `Settings` klasės konstantos (`PLAN_VALUES`, `PHASE1_PLAN_IDS`, `PHASE1_PLAN_VALUES`, `PLAN_ID_TO_VALUE`) turi `ClassVar` anotacijas. **Naujoms konstantoms Settings klasėje – visada naudoti `ClassVar`.**

---

## 3. Frontend – kritiniai keliai

**Maršrutai (App.jsx):**

| Kelias | Komponentas / elgsena |
|--------|------------------------|
| `/` | HomePage (LP, locale iš localStorage/naršyklės) |
| `/lt` | HomePage su locale LT (forceLocale="lt") |
| `/en` | HomePage su locale EN (forceLocale="en") |
| `/success` | SuccessPage |
| `/cancel` | CancelPage |
| `/privacy` | PrivacyPage |
| `/terms` | TermsPage |
| bet koks kitas | Redirect į `/` |

**LP struktūra (HomePage):**

- Skip link → `#main-content`.
- Navbar: `primaryNavItems` priklauso nuo `hasAccess` (perduodamas iš HomePage): bazė – Kas yra Promptų Anatomija / What is Prompt Anatomy (#what-is, `nav.whatIs`), Kainodara #pricing; jei `hasAccess === true` – įtraukiamas ir Mokymai (nuoroda į `/anatomija/` su `target="_blank"` – LP lieka atidarytas). Desktop viršutinis meniu rodo šiuos punktus; `secondaryNavItems` (Ecosystem, Methodology, Repo jei config, Training, FAQ) – tik mobile drawer (`allNavItems`). Brand, kalbos LT|EN su navigate į `/lt`/`/en`, CTA. Logo ir „Home“ – locale-aware (`/lt` arba `/en`).
- Hero (h1, badge „Sistemos būsena: stabili“, subtitle, 4 bullet, CTA scroll į pricing; kodo blokas su typing animacija).
- WhatIsPromptAnatomy (section id what-is; h2, value, 6 blokų piliai, 3 stat kortelės) – po Hero, prieš Methodology.
- Methodology (section id metodologija).
- Ecosystem (section id ekosistema).
- Pricing (section id pricing, prieigos forma, 2 planai Phase 1; „Eiti į mokymus" mygtukas kviečia `/api/generate-access-link` ir nukreipia tame pačiame lange į training app su magic link – same-tab navigation reikalinga iOS/Safari, kur `window.open` po async dažnai blokuojamas).
- Footer (brand, tagline; System: Ekosistema, Metodologija, Mokymai (`/anatomija/`, naujas tabas), Kainodara, DUK (#faq); Network: Support/WhatsApp, LinkedIn, X (Twitter); legal, copyright).

**i18n:** Visi raktai naudojami iš `lt.json` / `en.json`; nėra hardcoded teksto komponentuose (Hero, WhatIs, Methodology, Ecosystem, Pricing, Footer, Navbar, Success, Cancel). LT – terminas DI; EN – AI.

**SEO (SeoHead):** Ant `/`, `/lt`, `/en` – canonical ir og:url atitinka dabartinį URL; hreflang linkai (lt, en, x-default) injektuojami į head. Ant success/cancel – hreflang pašalinami.

**X (Twitter) pixel:** Komponentas `XPixel.jsx` – įkelia X conversion tracking base tag tik kai `VITE_X_PIXEL_ID` nustatytas (config `X_PIXEL_ID`); be jo – dev be tracking. `App.jsx` – `<XPixel />` šaknyje.

**Kaip tikrinti:** `cd frontend && npm run build` – build turi pavykti. `cd apps/prompt-anatomy && npm run build` – training app build turi pavykti. Rankinis smoke: atidaryti `/`, `/lt`, `/en`, `/success`, `/cancel`, perjungti kalbą (turėtų navigate į `/lt` arba `/en`), scroll į pricing, patikrinti prieigos formą. Magic link flow: patikrinti prieigą su susimokėjusio vartotojo email → spausti „Eiti į mokymus" → turi nukreipti į training app su `access_tier`, `expires`, `token` parametrais → moduliai atrakinti.

**UX smoke (po P0-P3 fix'ų):**
- Email be prieigos (`highest_plan === 0`) → amber blokas „Prieiga nerasta" + CTA „Gauti prieigą →" (scroll į pricing).
- Email su prieiga (`highest_plan > 0`) → žalias blokas su progress bar + „Eiti į mokymus →" (magic link per `getTrainingAccessLink`; **navigacija tame pačiame lange** – `window.location.href`, kad veiktų iOS/Safari). Desktop Navbar su `hasAccess` rodo **Mokymai** į `/anatomija/` – **naujas tabas** (statinė nuoroda, ne magic link).
- „Eiti į mokymus" mygtukas rodo loading state (`trainingLinkLoading`).
- `/cancel` puslapis – „Bandyti dar kartą" nuoroda scroll'ina į `#pricing` (ne SPA navigate + hash).
- `/success` be `session_id` – informacinis pranešimas „Jei ką tik sumokėjai – palauk".
- Magic link su netinkamu/pasibaigusiu tokenu → „Grįžti į pradžią" nuoroda (ne Retry mygtukas).
- Klaidos `api.js` – `detail` visada string (typeof safety).
- Hero kodo blokas – typing animacija veikia (staggered fade-in + typing + blinking cursor + SYSTEM INIT fade-in po pabaigos).
- Mobile drawer: (1) scroll ~500px, atidaryti meniu -- navbar neblyksteli (scrolled state islaikomas); (2) uzdaryti meniu -- puslapis grizta i ta pacia scroll pozicija; (3) atidaryti meniu is virso (scrollY=0) ir uzdaryti -- scrollinimas veikia; (4) drawer overlay tamsus, baltas panelis desiniajame sone -- turi buti matomas bet kurioje scroll pozicijoje.

---

## 4. Kas nekeičiama (golden legacy)

- **React + Vite** – struktūra, routing (React Router), build pipeline. Nėra migracijos į Next.js ar SSR (pagal [UI_UX_SEO_MOSCOW_PLAN.md](UI_UX_SEO_MOSCOW_PLAN.md) WON'T).
- **Stripe flow** – create-checkout-session → Stripe Checkout → success/cancel; webhook `checkout.session.completed` → Supabase `user_access`. Nepažeisti endpointų kontraktų.
- **Magic link flow** – `success-redirect.js` ir `generate-access-link.js` naudoja tą pačią `buildMagicLinkToken()` logiką (HMAC-SHA256, base64url, `ACCESS_TOKEN_SECRET`). `verify-access.js` tikrina tokeną. Keičiant vieno token formatą – keisti visus tris.
- **API:** `api.js` – `getAccess`, `createCheckoutSession`, `getSuccessRedirectUrl`, `getTrainingAccessLink`; backend atsakymų formatai (JSON su `url`, `highest_plan`, `can_upgrade_to`, `redirect_url` ir t. t.).
- **Env:** Backend – Pydantic Settings, `STRIPE_*`, `SUPABASE_*`, `FRONTEND_ORIGIN`. Frontend – `VITE_API_URL` (optional), `VITE_X_PIXEL_ID` (optional, X conversion tracking; jei tuščias – XPixel neįkelia skripto). Nepašalinti naudojamų kintamųjų.
- **Backend failo pavadinimas:** `token_limits.py` (ne `limits.py`). `limits` vardas shadina PyPI paketą – neleistina.
- **Training app submodule:** `apps/prompt-anatomy` → `DITreneris/inzinerija`. Magic link tier validacija naudoja `VALID_MAX_MODULE_IDS` iš `constants/pricing.ts` (ne hardcoded reikšmes).
- **LT kalba:** visur vartotojui matomas tekstas – „Tu" forma (ne „Jūs"). Terminas „DI" (ne „AI").
- **api.js error handling:** `detail` iš backend visada konvertuojamas į string (`typeof raw === 'string' ? raw : JSON.stringify(raw)`).
- **Hero animacija:** `Hero.jsx` naudoja `phase` state (0→4) su `useEffect` + `setInterval` typing logika. CSS keyframes `fadeInUp` ir `blink-caret` yra `index.css`. Animacija gerbia `prefers-reduced-motion` (JS `matchMedia` check + CSS override). **Nekeisti timing sekos be vizualinio testavimo.** 0 išorinių priklausomybių.
- **Mobile drawer (Navbar.jsx):** `#mobile-nav` div **privalo buti sibling `<nav>` elemento, NE vaikas**. Komponentas grazina `<>...</>` fragmenta su `<nav>` ir `<div id="mobile-nav">` greta. Priezastis: kai `scrolled=true`, `<nav>` gauna `backdrop-blur-2xl` (`backdrop-filter`), kuris pagal CSS spec sukuria nauja containing block -- jei drawer yra vaikas, jo `position: fixed` tampa relatyvus siaurum navbar, o ne viewport. **Scroll lock mechanizmas:** (1) `useLayoutEffect` (ne `useEffect`) su `[mobileOpen]` -- sinchroniskai pries paint; (2) Scroll pozicija saugoma `savedScrollY` ref (ne `body.style.top`); (3) `mobileOpenRef` guard scroll handleryje -- neleidzia `scrolled` flipinti kai body tampa `position: fixed`; (4) `window.scrollTo({ behavior: 'instant' })` -- aplenkia CSS `scroll-behavior: smooth`; (5) Close salyga tikrina `document.body.style.position === 'fixed'` (ne `savedScrollY > 0`, nes scrollY gali buti 0). Atskiras unmount-only `useEffect([], [])` isvalo body styles tik unmount metu.
- **Ecosystem CTA:** EN naudoja trumpą formą („Open dashboard", „Open library", „Create content", „Assess candidates"). **Nevartoti ilgų CTA tekstų (>18 simb.) -- persilaužia mobilėje.**
- **SEO (SeoHead):** `frontend/src/components/SeoHead.jsx` – atnaujina canonical, og:url, og:locale, hreflang pagal pathname ir locale. Naudoja `SITE_URL` iš `config.js`. HOME_ROUTES = `['/', '/lt', '/en']`. Keičiant home route'us ar hreflang strategiją – atnaujinti SeoHead ir sitemap.

---

## 5. Deploy procesas (GitHub → Vercel)

1. **Submodulis pirmas:** `git -C apps/prompt-anatomy add -A && commit && push origin main` (į `DITreneris/inzinerija`).
2. **Parent repo:** `git add -A && commit && push origin main` (į `DITreneris/promptanatomy`). Commit'e turi būti atnaujintas submodule reference.
3. **Vercel:** auto-deploy iš GitHub main branch. `vercel.json` – `installCommand` su `git submodule update --init --recursive`, build'ina abu frontendus.
4. **Regresijos prieš push:** `frontend: npm run build`, `apps/prompt-anatomy: npm run build`, `backend: pytest`.
5. **GitHub Actions:** pull request ir push į `main` paleidžia [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) (job **Golden Legacy**): `frontend` — `npm ci` + `npm run build`; `apps/prompt-anatomy` — `npm ci` + `npm run build` su `VITE_BASE_PATH=/anatomija/`, `VITE_MVP_MODE=1`, `HUSKY=0` (submodulio husky nevykdomas CI); `backend` — `pip install -r requirements.txt` + `pytest`. Submoduliai: `actions/checkout` su `submodules: recursive`.
6. **Branch protection (rankinis GitHub):** rekomenduojama įjungti *required status check* jobui **Golden Legacy** (workflow **CI**), kad merge be žalio CI nebūtų galimas. Kelias: *Settings → Rules → Rulesets* (arba *Branches → Branch protection*) — pridėti taisyklę `main` ir pažymėti reikiamą check.

---

## 6. Kada atnaujinti šį dokumentą

- Pridedant naujus backend endpointus arba keičiant atsakymo formatus – įrašyti į 2 skyrių ir atnaujinti/pridėti testus.
- Pridedant naujus frontend maršrutus ar LP sekcijas – atnaujinti 3 skyrių.
- Pakeitus „WON'T“ (pvz. priimant SSR) – atnaujinti 4 skyrių ir roadmap.

- Pridedant naujus UX srautus ar keičiant error handling – atnaujinti 3 skyriaus „UX smoke" sąrašą.
- Po kiekvieno deploy – patikrinti ar 5 skyriaus procesas vis dar aktualus.


**Regresijos tikrinimas:** prieš merge/release – paleisti `backend`: `pytest`, `frontend`: `npm run build`, `apps/prompt-anatomy`: `npm run build`; tas pats rinkinys automatiškai CI (žr. 5 skyrių). Pagal poreikį – rankinis smoke pagal 3 skyrių.
