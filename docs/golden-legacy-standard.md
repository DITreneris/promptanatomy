# Golden Legacy Standard – regresijos apsauga

**Tikslas:** Fiksuoti veikiančią būseną ir kritinius kelius, kad pakeitimai nepalaužtų to, kas jau veikia. Prieš didesnius refaktorinimus ar naujas funkcijas – patikrinti, kad šis standartas išlieka tenkinamas.

**Data fiksavimo:** 2026-05-24 (Hero badge kategorija; Navbar Variant B; Hero subtitle + 3 bullets). **Atnaujinta 2026-06-05:** LP copy chirurgija; proof skaičiai — **500+** biblioteka (hero bullet, WhatIs stat, pricing features), **600+** social proof (`hero.socialProof`). **Atnaujinta 2026-08-07:** refund trust → `/terms#refunds`; `#access` return path; **600+** palikta. **Atnaujinta 2026-08-08:** Six-Block/Quick mode — tik GEO (`llms` / `TRAINING_SUMMARY`), ne WhatIs/FAQ (frontpage lean). **Atnaujinta 2026-08-12:** Hero CTA hierarchija – pirminis nemokamas `.cloud` workflow, antrinis `#pricing`. **Atnaujinta 2026-08-13:** QW3a atšauktas – Hero primary `hero.cta` vėl `#pricing` tame pačiame tabe (be secondary, be outbound). **Atnaujinta 2026-08-13:** LP copy lean – komandų blokas 399 € mokymai (1 darbo diena ≠ grąžinimų 14 d.; be piloto / SLA / Telegram); `#access` viena instrukcija `pricing.returningBody`. **Atnaujinta 2026-08-13:** Ekosistema chrome lean – tik `ecosystem.title` + 6 kortelės + `mapLink` (LT „Peržiūrėti ekosistemą“, EN „See the ecosystem“); be pastraipos, `ctaPricing`, `workflowHint`, hub pill, phase legend/eyebrow, `trustLine`. **Atnaujinta 2026-08-13:** Footer tipo skalė – 4× `lg:col-span-3`; `footer.tagline` ≠ `whatIs.valueLine1`; legal `text-xs`; typeface = OS sans ([ADR-0001](decisions/0001-lp-system-typeface.md)). **Atnaujinta 2026-08-13:** LT/EN copy (tu + bendratis CTA; same key ≠ same sentence) ir legal SPA locale (`/privacy` `/terms`); static HTML lieka EN.

---

## 1. Kas laikoma „veikiančiu“

- LP rodomas, visos sekcijos matomos (Hero, Kas yra Prompt Anatomy, Methodology, Pricing, Ecosystem, FAQ, Footer). **Navbar (desktop, ≥ `lg`):** kairėje – ikona + vienos eilutės wordmark (Title Case: `nav.brandPromptu` + `nav.brandAnatomija` su spalvų splitu), **be** versijos ženkliuko ir **be** tagline juostoje (pozicija – Hero `hero.subtitle`). Viršutiniame meniu – **Kas yra Promptų Anatomija** / **What is Prompt Anatomy** (#what-is-prompt-anatomy), **Ekosistema** / **Ecosystem** (#ekosistema); kai vartotojas turi prieigą (`hasAccess` iš HomePage, t. y. `access?.highest_plan > 0`) – trečias punktas **Mokymai** / **Training** (magic-link per `getTrainingAccessLink`, ne statinis `/anatomy/`). **Be** Pricing, Methodology, FAQ viršutiniame meniu. + LT/EN + CTA; nuorodos **sentence case** (ne viso teksto `uppercase`). **Cloud**, **Pro**, **Repo** (jei config), ir **„Jau turiu prieigą“** / **I already have access** (`nav.alreadyHaveAccess` → `#access`) – tik **mobile drawer** (`drawerOnlyNavItems`). **Footer** – 4 lygios kolonos (`lg:grid-cols-12`, kiekviena `lg:col-span-3`): Brand (nav wordmark split + `footer.tagline` be brand echo, ≠ WhatIs `valueLine1`), **Produktas** (`footer.whatIs` „Kas tai“ / „What it is“, Metodologija, Ekosistema, Kainodara), **Mokymai** (Mokymai, **Continue training** / **Tęsti mokymus** → `#access`, DUK, `nav.cta` → #pricing), **Tinklas** (Telegram, LinkedIn, X, Cloud, Pro); legal bar `text-xs` (© · email · legal · adresas; be `text-[11px]`). **Hero:** badge – produkto kategorija (`hero.badge`: LT „6 blokų DI sistema“, EN „6-Block AI System“); antraštė LT „Pradėk kurti.“; **3** bullet'ai (i18n `hero.bullet1`–`hero.bullet3`, rodomi nuo `sm`, sąrašas `Hero.jsx` per `HERO_BULLET_KEYS`); subtitle – `hero.subtitle` (EN/LT atskirai); CTA `hero.cta` = pricing intent (EN „Choose a plan“, LT „Rinktis planą“, `href="#pricing"`, tas pats tabas; **be** secondary CTA ir **be** outbound į `.cloud`); social proof **600+** (`hero.socialProof`) — kanonas. Skip link ir prieigos forma naudoja `focus-visible:ring`; Methodology – `brand-dark` / `brand-accent` tokenai; Footer kritinis tekstas – `text-slate-500`; blink-caret – `var(--color-brand-accent)` (index.css).
- Kalbos perjungimas LT/EN veikia; LT naudoja DI, EN – AI (pagal [language-guidelines-en-lt.md](language-guidelines-en-lt.md)). Locale-aware URL: `/lt` ir `/en` rodo atitinkamą kalbą; perjungus kalbą Navbar nukreipia į `/lt` arba `/en` (share'inamas linkas atspindi kalbą).
- SEO: `SeoHead.jsx` nustato canonical ir og:url pagal pathname; ant home route'ų (`/`, `/lt`, `/en`) – hreflang (lt→`/lt`, en→`/`, x-default→`/`). `/en` canonical **ir** `og:url` konsoliduoti į `/` (`generate-locale-static.mjs` `en.html`). Build: `lt.html` / `en.html` pirmam HTML byte. Twitter Card įdiegti (`index.html` + dinamiškai). **Social OG:** `og-image-v2.jpg` (`og:image` / `twitter:image`). **JSON-LD logo:** `og-image.png` (`Organization.logo`) — intentional split; abu failai `frontend/public/`. Home WebPage `dateModified` ← `LAST_UPDATED` ([geo-manifest.js](../frontend/src/site/geo-manifest.js)). Organization `sameAs` — [organization.js](../frontend/src/site/organization.js) + `index.html`.
- Checkout srautas: prieigos tikrinimas (email) → planų pasirinkimas → Stripe Checkout → success/cancel puslapiai.
- Prieigos srautas (susimokėjus): LP „Eiti į mokymus" → `GET /api/generate-access-link?email=...` → magic link su HMAC tokenu → training app atrakina modulius. **Kanonas** (kas yra „tiesa“, antriniai keliai): [access-architecture-canon.md](access-architecture-canon.md).
- Backend API ir webhook atsako pagal aprašytas sutartis (žr. skyrių 2–3).
- Frontend build (`cd frontend && npm run build`) ir backend testai (`pytest`) eina sėkmingai.
- Training app build (`cd apps/prompt-anatomy && VITE_BASE_PATH=/anatomy/ VITE_MAX_BUILD_MODULE=12 npm run build:corporate12`) eina sėkmingai.
- Prieigos tikrinimas LP: email su `highest_plan === 0` rodo amber bloką „Prieiga nerasta" + CTA „Gauti prieigą".

---

## 2. Backend – kritiniai kontraktai

**Būtina nekeisti (arba keisti tik su atitinkamais testų/doc atnaujinimais):**

| Endpoint / elgsena | Tikėtinas atsakymas / elgsena | Testas |
|--------------------|-------------------------------|--------|
| `GET /health` | 200, `{"status": "ok"}` | `TestHealth.test_health_returns_200_and_ok` |
| `GET /api/success-redirect` be `session_id` arba netinkamas session | 400, detail "session_id required" / "Invalid or unpaid session" | (rankinis arba testas) |
| `GET /api/success-redirect?session_id=cs_xxx` (validus paid session) | 200, `{ "redirect_url": "https://...?access_tier=...&expires=...&token=..." }`; neprivalomas `customer_email` (Stripe sesijos el. paštas, LP `localStorage`) | (rankinis arba testas) |
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
| `/` | HomePage (LP, `forceLocale="en"` — ne localStorage/naršyklė) |
| `/lt` | HomePage su locale LT (forceLocale="lt") |
| `/en` | HomePage su locale EN (forceLocale="en"); share URL, canonical/`og:url` → `/` |
| `/success` | SuccessPage |
| `/cancel` | CancelPage |
| `/privacy` | PrivacyPage |
| `/terms` | TermsPage |
| bet koks kitas | Redirect į `/` |

**LP struktūra (HomePage):**

- Skip link → `#main-content`.
- Navbar: `mainNavItems` – Kas yra (#what-is-prompt-anatomy), Ekosistema (#ekosistema); jei `hasAccess === true` – Mokymai (magic link per `handleGoToTraining`). Desktop (`lg+`) rodo tik `mainNavItems`. `drawerOnlyNavItems` (`nav.alreadyHaveAccess` → `#access`, Cloud, Pro, Repo jei config) – papildomai mobile drawer (`allNavItems`). Brand (viena eilutė, be versijos/tagline), kalbos LT|EN su navigate į `/lt`/`/en`, CTA. Logo ir „Home“ – locale-aware (`/lt` arba `/en`). Checkout: `/success` primary CTA – `btn-primary-lg`; `/cancel` secondary – `btn-secondary`.
- Hero (h1, `hero.badge`, `hero.subtitle`, 3 bullet per `HERO_BULLET_KEYS` (rodomi nuo `sm`), vienas primary CTA `hero.cta` → `#pricing` tame pačiame tabe (EN „Choose a plan“, LT „Rinktis planą“); **be** secondary CTA; **600+** `hero.socialProof`; kodo blokas su typing animacija). `.cloud` / `.pro` outbound lieka Ecosystem / Footer / mobile drawer.
- WhatIsPromptAnatomy (section id what-is-prompt-anatomy; h2, `whatIs.valueLine2` – 6-block methodology + 500+ library + GPT/agents guide; be „interaktyvių“ ir be „atsitiktin*“ echo (tik Hero subtitle), mid-funnel nuoroda `#pricing`, 6 blokų piliai, 3 stat kortelės: **500+** šablonai ir promptai – `whatIs.stat1Number` / `stat1Label`; skaičiai skaitomi screen reader) – po Hero, prieš Methodology. `footer.tagline` — trumpas WhatIs variantas **be** brand echo (`whatIs.valueLine1` palieka brandą sakinyje). Prieigos forma – `#access` kortelė `#pricing` sekcijoje; viena instrukcija (`pricing.returningBody` – nuoroda į mokymus atsidaro čia, ne el. paštu; lauko etiketė `checkAccess` = el. paštas; be `accessHow` / `accessStepsHint`). FAQ – be `faq.sectionLabel` eyebrow (tik h2); **9** klausimai (`faq.items`), gilesni atsakymai (~60–90 ž.) su hub/spoke kontekstu (įsk. lifetime access); Six-Block vs five-part/Quick mode — **ne** FAQ/WhatIs, tik GEO (`llms.txt` / `TRAINING_SUMMARY`); `<details>` accordion + FAQPage JSON-LD iš to paties i18n.
- Methodology (section id metodologija; dekoratyvus label `<p>`, pagrindinis pavadinimas `<h2>`; be papildomo `mt-20`).
- Pricing (section id pricing, prieigos forma `id="access"`, 2 planai Phase 1; trust eilutė `pricing.refundContact` → `/terms#refunds`; komandų blokas `forTeamsBody` – LT „Mokymai komandai — 399 €. 15 min. pokalbis: info@promptanatomy.app. Atsakome per 1 darbo dieną.“ (1 d. d. ≠ grąžinimų 14 d.; be piloto / SLA / Telegram); „Eiti į mokymus" mygtukas kviečia `/api/generate-access-link` ir nukreipia tame pačiame lange į training app su magic link – same-tab navigation reikalinga iOS/Safari, kur `window.open` po async dažnai blokuojamas).
- Ecosystem (section id ekosistema, `section-dark-ecosystem`): header tik `ecosystem.title` (be pastraipos, be `ctaPricing`, be `workflowHint`); **6** kortelės (`ecosystem.items`) — cloud, info, space, help, ceo, pro; grid **3+3** (`lg:grid-cols-3`, `gap-8`); kiekviena kortelė — `card-density-dark-premium` (`shadow-ecosystem-card-rest`, `min-h-[200px]`): `title` (`text-lg`) + `outcome` (`line-clamp-2`) + tag pills (`ecosystem-tag-pill`, iki 2) + CTA footer (`mt-auto pt-3`, `aria-label` su `opensInNewTab`, be matomo teksto po CTA); **be** phase eyebrow / hub pill / phase legend; **Enter** — `card-featured-ecosystem` (`border-2`), `badge-premium` (`startHere`, `top-6 right-6`), full-width `min-h-[48px]` `btn-primary` + `shadow-ecosystem-cta`, icon glow; kitos 5 — `card-phase-accent-*` top rim, `btn-ecosystem-secondary` + `ArrowRight`, `shadow-ecosystem-icon-depth`; po grid — `mapLink` (LT „Peržiūrėti ekosistemą“, EN „See the ecosystem“) → `promptanatomy.site/#ecosystem` (be `trustLine`). Anchor: `scroll-margin-top`. Fazinės spalvos ant ikonų/rim: Adopt (1), Apply (2), Scale (3) — be žodinių etikečių.
- Footer ([Footer.jsx](frontend/src/components/Footer.jsx)): `pt-14 md:pt-16`, 4 lygios kolonos (`lg:col-span-3`) – Brand (`nav.brandPromptu`/`brandAnatomija`, `footer.tagline` ≠ `whatIs.valueLine1`), Produktas (`footer.whatIs` → #what-is-prompt-anatomy, #metodologija, #ekosistema, #pricing), Mokymai (Mokymai magic link jei `hasAccess`, `footer.alreadyHaveAccess` → `#access`, #faq, `nav.cta`), Tinklas (Telegram, LinkedIn, X, Cloud/Pro su PostHog `footer_network`); legal bar – `copyrightLine1`, mailto, privacy/terms/cookies, `creator`, `formatMailingAddressOneLine()` visur `text-xs`; be `copyrightLine2`. Typeface: OS sans ([ADR-0001](decisions/0001-lp-system-typeface.md)).
- Terms: Refunds sekcija `id="refunds"` ([TermsPage.jsx](frontend/src/pages/TermsPage.jsx) + static legal generator). Privacy/Terms **KISS:** crawler / direct URL / refresh → EN `privacy.html` / `terms.html` (Vercel rewrite; GEO taip pat `privacy.md` / `terms.md`). In-app navigacija iš LP (Footer `Link`, be refresh) → SPA `useLocale()` + `LocaleToggle`; Home / Back — `localeHomePath` (`/lt` arba `/en`, ne `/`). Static generatoriaus Home nuoroda lieka `/` (EN). Canonical `/privacy` `/terms`; nėra `/lt/privacy`. Browser locale detect — tik ne-home keliams (`getInitialLocale`).

**i18n:** Visi raktai naudojami iš `lt.json` / `en.json`; nėra hardcoded teksto komponentuose (Hero, WhatIs, Methodology, Ecosystem, Pricing, Footer, Navbar, Success, Cancel, Privacy, Terms). LT – terminas DI, kreipinys **tu**, mygtukai **bendratis**; EN – AI. Tas pats raktas ≠ tas pats sakinys ([language-guidelines-en-lt.md](language-guidelines-en-lt.md)). `whatIs.title` EN — „What is Prompt Anatomy?“; `nav.whatIs` be „?“. EN 6-oji ekosistemos kortelė `title` = **Deploy** (sutampa su `cta`). `pricing.modulesLocked` — moduliai **7–12** pagal poreikį (ne 15).

**SEO (SeoHead):** Ant `/`, `/lt`, `/en` – canonical ir og:url atitinka dabartinį URL; hreflang linkai (lt, en, x-default) injektuojami į head. Ant success/cancel – hreflang pašalinami.

**X (Twitter) pixel:** Komponentas `XPixel.jsx` – įkelia X conversion tracking base tag tik kai `VITE_X_PIXEL_ID` nustatytas (config `X_PIXEL_ID`); be jo – dev be tracking. `App.jsx` – `<XPixel />` šaknyje.

**Kaip tikrinti:** `cd frontend && npm run build` – build turi pavykti. `cd apps/prompt-anatomy && VITE_BASE_PATH=/anatomy/ VITE_MAX_BUILD_MODULE=12 npm run build:corporate12` – training app build turi pavykti. Rankinis smoke: atidaryti `/`, `/lt`, `/en`, `/success`, `/cancel`, perjungti kalbą (turėtų navigate į `/lt` arba `/en`), scroll į pricing, patikrinti prieigos formą, paspausti `.cloud`/`.pro` nuorodas iš **Navbar** arba **Footer** (turi atsidaryti naujame tabe). Magic link flow: patikrinti prieigą su susimokėjusio vartotojo email → spausti „Eiti į mokymus" → turi nukreipti į training app su `access_tier`, `expires`, `token` parametrais → moduliai atrakinti.

**UX smoke (po P0-P3 fix'ų):**
- Email be prieigos (`highest_plan === 0`) → amber blokas „Prieiga nerasta" + CTA „Gauti prieigą →" (scroll į pricing).
- Email su prieiga (`highest_plan > 0`) → žalias blokas su progress bar + „Eiti į mokymus →" (magic link per `getTrainingAccessLink`; **navigacija tame pačiame lange** – `window.location.href`, kad veiktų iOS/Safari). Desktop Navbar ir Footer su `hasAccess` rodo **Mokymai** kaip magic-link veiksmą, ne statinę `/anatomy/` nuorodą.
- **Tier 9 (plan 9):** rodoma **9/9** (ne 9/6); progress bar **≤100%**; konteineris `overflow-hidden`. Implementacija: [`accessDisplay.js`](../frontend/src/utils/accessDisplay.js) (`moduleDisplayCap`, `accessProgressPercent`). Magic link: `access_tier=9` kai `highest_plan=9`.
- **Tier 12 (plan 12 / corporate12):** rodoma **12/12**; magic link `access_tier=12` kai `highest_plan=12` (operator grant). Prod training bundle M1–12 (`build:corporate12`).
- „Eiti į mokymus" / „Mokymai" veiksmai rodo loading/disabled state (`trainingLinkLoading`).
- `/cancel` puslapis – „Bandyti dar kartą“ eina į `localeHomePath` (`/lt` arba `/en`), tada scroll'ina į `#pricing` (ne SPA navigate + hash; ne `/`, kuris force-setina EN).
- `/success` be `session_id` – informacinis pranešimas „Jei ką tik sumokėjai – palauk".
- Magic link su netinkamu/pasibaigusiu tokenu → „Grįžti į pradžią" nuoroda (ne Retry mygtukas).
- Klaidos `api.js` – `detail` visada string (typeof safety).
- Hero primary CTA – `href="#pricing"`, tas pats tabas; **nėra** `promptanatomy.cloud` ir **nėra** `target="_blank"` ant Hero mygtuko; šalia CTA – 600+ social proof, be antro mygtuko.
- Hero kodo blokas – typing animacija veikia (staggered fade-in + typing + blinking cursor + `hero.terminalOutcome` fade-in po pabaigos); be `SCRIPT_NAME` etiketės.
- Mobile drawer: (1) scroll ~500px, atidaryti meniu -- navbar neblyksteli (scrolled state islaikomas); (2) uzdaryti meniu -- puslapis grizta i ta pacia scroll pozicija; (3) atidaryti meniu is virso (scrollY=0) ir uzdaryti -- scrollinimas veikia; (4) drawer overlay tamsus, baltas panelis desiniajame sone -- turi buti matomas bet kurioje scroll pozicijoje.

---

## 4. Kas nekeičiama (golden legacy)

- **React + Vite** – struktūra, routing (React Router), build pipeline. Nėra migracijos į Next.js ar SSR (pagal [UI_UX_SEO_MOSCOW_PLAN.md](archive/audits/UI_UX_SEO_MOSCOW_PLAN.md) WON'T).
- **Stripe flow** – create-checkout-session → Stripe Checkout → success/cancel; webhook `checkout.session.completed` → Supabase `user_access`. Nepažeisti endpointų kontraktų.
- **Magic link flow** – `success-redirect.js` ir `generate-access-link.js` naudoja tą pačią `buildMagicLinkToken()` logiką (HMAC-SHA256, base64url, `ACCESS_TOKEN_SECRET`). `verify-access.js` tikrina tokeną. Keičiant vieno token formatą – keisti visus tris.
- **API:** `api.js` – `getAccess`, `createCheckoutSession`, `getSuccessRedirectUrl` (grąžina `{ redirect_url, customer_email? }`), `getTrainingAccessLink`; backend atsakymų formatai (JSON su `url`, `highest_plan`, `can_upgrade_to`, `redirect_url` ir t. t.).
- **Env:** Backend – Pydantic Settings, `STRIPE_*`, `SUPABASE_*`, `FRONTEND_ORIGIN`. Frontend – `VITE_API_URL` (optional), `VITE_X_PIXEL_ID` (optional, X conversion tracking; jei tuščias – XPixel neįkelia skripto). Nepašalinti naudojamų kintamųjų.
- **Backend failo pavadinimas:** `token_limits.py` (ne `limits.py`). `limits` vardas shadina PyPI paketą – neleistina.
- **Training app submodule:** `apps/prompt-anatomy` → `DITreneris/inzinerija` (dabartinis pin: `c35a1f5` / `v1.6.2`; upstream package `1.6.2` + Horizon B corporate12 marketing pin; Node 24 toolchain). Production profilis: [`scripts/vercel-build.sh`](../scripts/vercel-build.sh) / CI naudoja `VITE_MAX_BUILD_MODULE=12` ir `npm run build:corporate12` (M1–12 bundle). Magic link tier validacija: parent [`api/verify-access.js`](../api/verify-access.js) / [`generate-access-link.js`](../api/generate-access-link.js) `VALID_TIERS` / `ACCESS_TIER_VALUES` `[3, 6, 9, 12]`; submodulyje – `constants/pricing.ts`. Corporate15 / tier 15 neaktyvuojami.
- **LT kalba:** visur vartotojui matomas tekstas – „Tu" forma (ne „Jūs"). Mygtukai / CTA – bendratis; antraštės – tu liepiamoji. Terminas „DI" (ne „AI").
- **api.js error handling:** `detail` iš backend visada konvertuojamas į string (`typeof raw === 'string' ? raw : JSON.stringify(raw)`).
- **Hero animacija:** `Hero.jsx` naudoja `phase` state (0→4) su `useEffect` + `setInterval` typing logika. CSS keyframes `fadeInUp` ir `blink-caret` yra `index.css`. Animacija gerbia `prefers-reduced-motion` (JS `matchMedia` check + CSS override). **Nekeisti timing sekos be vizualinio testavimo.** 0 išorinių priklausomybių.
- **Mobile drawer (Navbar.jsx):** `#mobile-nav` div **privalo buti sibling `<nav>` elemento, NE vaikas**. Komponentas grazina `<>...</>` fragmenta su `<nav>` ir `<div id="mobile-nav">` greta. Priezastis: kai `scrolled=true`, `<nav>` gauna `backdrop-blur-2xl` (`backdrop-filter`), kuris pagal CSS spec sukuria nauja containing block -- jei drawer yra vaikas, jo `position: fixed` tampa relatyvus siaurum navbar, o ne viewport. **Scroll lock mechanizmas:** (1) `useLayoutEffect` (ne `useEffect`) su `[mobileOpen]` -- sinchroniskai pries paint; (2) Scroll pozicija saugoma `savedScrollY` ref (ne `body.style.top`); (3) `mobileOpenRef` guard scroll handleryje -- neleidzia `scrolled` flipinti kai body tampa `position: fixed`; (4) `window.scrollTo({ behavior: 'instant' })` -- aplenkia CSS `scroll-behavior: smooth`; (5) Close salyga tikrina `document.body.style.position === 'fixed'` (ne `savedScrollY > 0`, nes scrollY gali buti 0). Atskiras unmount-only `useEffect([], [])` isvalo body styles tik unmount metu.
- **Ecosystem CTA:** Per-item `cta` kiekvienoje kortelėje (LT: Pradėti / Naudoti / Kurti / Atrinkti / Valdyti / Diegti; EN: Start / Use / Create / Hire / Manage / Deploy); EN 6-oji kortelė `title` = Deploy; **neviršyti ~12 simb.** ant mobilės. **Enter** (index 0) — `card-featured-ecosystem`, `startHere` badge, full-width `btn-primary` + `shadow-ecosystem-cta`; kiti — `btn-ecosystem-secondary` + `ArrowRight`. Outbound CTA — `aria-label` su `opensInNewTab` (be matomo eilutės po mygtuku). `ecosystem.ctaOpen` — tik fallback. `ecosystem.mapLink` — vienintelė sekcijos chrome nuoroda po grid (→ `.site`); be `ctaPricing` šioje sekcijoje (kainodara = nav/hero/`#pricing`).
- **SEO (SeoHead):** `frontend/src/components/SeoHead.jsx` – atnaujina canonical, og:url, og:locale, hreflang pagal pathname ir locale. Naudoja `SITE_URL` iš `config.js`. HOME_ROUTES = `['/', '/lt', '/en']`. Home JSON-LD `ItemList` — **9 items** (8 spokes + discovery) iš `getEcosystemItemList(routeLocale)` ([geo-manifest.js](../frontend/src/site/geo-manifest.js)). Keičiant home route'us ar hreflang strategiją – atnaujinti SeoHead ir sitemap.
- **Statinių URL po deploy:** `GET https://www.promptanatomy.app/sitemap.xml` → **200** ir galiojantis XML; `robots.txt`, `llms.txt`, **`llms-full.txt`** – taip pat 200. `robots.txt` turi turėti `PerplexityBot`, `OAI-SearchBot`. `llms.txt` — Answer.AI shape: H1 `# Prompt Anatomy`, blockquote `>`, markdown links (`[Home EN](...)`, `[Full LLM index](...)`), `## Optional`. `index.html` – `Person` (#founder Tomas Staniulis) + Organization `sameAs`. Po `en.json` `legal.*` pakeitimo – `cd frontend && npm run build` ir patikrinti, kad `dist/privacy.html` / `dist/terms.html` yra **EN** (generuojami `scripts/generate-legal-static.mjs` tik iš `en.json`; Vercel rewrite duoda juos crawleriams ir full-load). LT legal – tik SPA client-nav `useLocale()`, ne atskiras URL. GEO manifest: `frontend/src/site/geo-manifest.js`; org entity: `frontend/src/site/organization.js`; build: `scripts/generate-geo-static.mjs`.

---

## 5. Deploy procesas (GitHub → Vercel)

1. **Submodulis pirmas:** `git -C apps/prompt-anatomy add -A && commit && push origin main` (į `DITreneris/inzinerija`).
2. **Parent repo:** `git add -A && commit && push origin main` (į `DITreneris/promptanatomy`). Commit'e turi būti atnaujintas submodule reference.
3. **Vercel:** auto-deploy iš GitHub main branch. `vercel.json` – `installCommand` su `git submodule update --init --recursive`, build'ina abu frontendus.
4. **Regresijos prieš push:** `frontend: npm run build`, `apps/prompt-anatomy: npm run build:corporate12` (`VITE_MAX_BUILD_MODULE=12`), `backend: pytest`.
5. **GitHub Actions:** pull request ir push į `main` paleidžia [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) (job **Golden Legacy**): `frontend` — `npm ci` + `npm run build`; `apps/prompt-anatomy` — `npm ci` + `npm run build:corporate12` su `VITE_BASE_PATH=/anatomy/`, `VITE_MAX_BUILD_MODULE=12`, `HUSKY=0` (submodulio husky nevykdomas CI); `backend` — `pip install -r requirements.txt` + `pytest`. Submoduliai: `actions/checkout` su `submodules: recursive`.
6. **Branch ruleset (rankinis GitHub):** žr. §5.1.

### 5.1 Ruleset `main` — žingsnis po žingsnio

Repozitorija: *Settings → Code and automation → Rules → Rulesets* → **New ruleset** → **New branch ruleset**.

| Laukas | Rekomenduojama reikšmė |
|--------|-------------------------|
| **Ruleset name** | pvz. `main-require-ci` |
| **Enforcement status** | **Active** (ne „Disabled“; „Evaluate“ — tik bandymui) |
| **Bypass list** | Palik tuščią arba tik admin / būtinas bot’as (pvz. prireikus release bot’ui) |

**Target branches:** **Add target** → *Include by pattern* → įrašyk `main` (arba *Default branch*, jei ji yra `main`).

**Rules** (slink žemyn ir įjunk reikiamus):

1. **Require a pull request before merging** — įjungti, jei nori, kad pakeitimai į `main` eitų per PR (rekomenduojama komandai).
2. **Require status checks to pass** — **įjungti**. Po to:
   - **Add checks** → paieškoje įvesk `Golden Legacy` arba `CI`.
   - Pasirink jobą, kuris atitinka workflow [`.github/workflows/ci.yml`](../.github/workflows/ci.yml): job pavadinimas faile yra **`Golden Legacy`**, workflow pavadinimas **`CI`**. GitHub sąraše dažnai matysis kaip **`Golden Legacy`** arba **`CI / Golden Legacy`**.
   - Jei sąraše nieko nėra: paleisk bent vieną sėkmingą **Actions** run ant `main` ir grįžk čia — check’ai atsiranda po pirmo paleidimo.

Papildomai (nebūtina, bet naudinga):

- **Block force pushes** — apsauga nuo `git push --force` į `main`.
- **Require linear history** — tik jei nori griežtos linijinės istorijos (gali apsunkinti merge strategijas).

**Išsaugoti:** **Create** / **Save changes**.

*Klasikinė alternatyva:* *Settings → Branches → Add branch protection rule* — branch name pattern `main`, įjungti *Require status checks to pass* ir pasirinkti tą patį **Golden Legacy** check.

**Pastaba:** seni raudoni workflow run’ai istorijoje lieka raudoni; svarbu, kad **paskutinis** run ant `main` būtų žalias.

---

## 6. Kada atnaujinti šį dokumentą

- Pridedant naujus backend endpointus arba keičiant atsakymo formatus – įrašyti į 2 skyrių ir atnaujinti/pridėti testus.
- Pridedant naujus frontend maršrutus ar LP sekcijas – atnaujinti 3 skyrių.
- Pakeitus „WON'T“ (pvz. priimant SSR) – atnaujinti 4 skyrių ir roadmap.

- Pridedant naujus UX srautus ar keičiant error handling – atnaujinti 3 skyriaus „UX smoke" sąrašą.
- Po kiekvieno deploy – patikrinti ar 5 skyriaus procesas vis dar aktualus.


**Regresijos tikrinimas:** prieš merge/release – paleisti `backend`: `pytest`, `frontend`: `npm run build`, `apps/prompt-anatomy`: `npm run build:corporate12` (`VITE_MAX_BUILD_MODULE=12`); tas pats rinkinys automatiškai CI (žr. 5 skyrių). Pagal poreikį – rankinis smoke pagal 3 skyrių.
