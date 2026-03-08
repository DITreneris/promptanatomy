# Memo integracijos analizė: saugumas, patikimumas, geriausios praktikos (2025–2026)

**Tikslas:** Įvertinti memo.md aprašytą magic-link integraciją su Mokymų sistema pagal industrijos geriausias praktikas; užtikrinti, kad būtų saugu, patikima ir nelūžtų.

**Šaltiniai:** GitHub webhook/security docs, Stripe fulfillment, Magic Link Security (MagicAuth, Authgear), HMAC timing-safe compare, URL protection (Cyril Kato).

---

## 1. Dabartinės būsenos įvertinimas

### 1.1 Stripe webhook (mūsų pusė)

| Praktika | Būsena | Šaltinis |
|----------|--------|----------|
| Verifikacija pagal raw body + parašą | ✅ Stripe `construct_event()` naudoja raw body ir HMAC | Stripe, GitHub |
| Parašo tikrinimas (timing-safe) | ✅ Stripe SDK viduje naudoja saugų palyginimą | Industrijos standartas |
| Fulfillment pagal webhook, ne tik redirect | ✅ Webhook upsertina `user_access`; success page – tik UI | Stripe: „webhooks as primary fulfillment“ |
| Idempotentiškumas | ✅ Supabase upsert pagal email – kelis kartus saugu | Stripe docs |
| Jautrios klaidos neatskleidžiamos | ✅ 400/503 grąžina `detail`, ne `err.message` | production-readiness-analysis.md |

**Išvada:** Stripe srautas atitinka geriausias praktikas. Nereikia keisti.

### 1.2 Success redirect ir fulfillment

- **Stripe rekomendacija:** Nenorėti tikėtis, kad vartotojas pasieks success page (gali nutraukti); fulfillment – per webhook.
- **Mūsų būsena:** Fulfillment (Supabase `user_access`) vyksta webhook'e. Success page tik informuoja. Memo papildomai reikalauja redirect į mokymų sistemą su tokenu – tai **papildomas** žingsnis po to, kai vartotojas jau atsidūrė mūsų `/success`.
- **Patikimumas:** Redirect su tokenu turi būti generuojamas **server-side** (pagal session_id arba webhook duomenis), kad būtų nepadirbamas. T. y. arba success URL jau su tokenu (reikia backend generuojančio URL), arba success page kreipiasi į backend „give me redirect URL for this session_id“ ir tada redirectina.

---

## 2. Memo magic-link srauto saugumas (2025–2026 praktikos)

### 2.1 Kas jau gerai (memo spec)

- **HMAC-SHA256** – tinkamas pasirinkimas (GitHub, Stripe, magic link gairės).
- **Payload** `access_tier:expires` – aiškus, deterministiškas.
- **Base64url** – tinkamas URL saugumui (be `+`, `/`, `=`).
- **Secret per env** – `ACCESS_TOKEN_SECRET`, ne kode.
- **Galiojimas** (expires) – reikalingas replay ribojimui.

### 2.2 Rekomendacijos pagal geriausias praktikas

| Aspektas | Memo | Geriausia praktika (2025–2026) | Rekomendacija |
|----------|------|--------------------------------|---------------|
| **Secret ilgis** | Min. 16 simbolių | Aukštos entropijos, 32+ bytes atsitiktiniai (pvz. 256 bit) | Naudoti 32 bytes random, base64 – saugiau nei 16 simbolių |
| **Secret generavimas** | „Sugeneruoti“ | CSPRNG (`crypto.randomBytes`, Python `secrets`) | Generuoti per `openssl rand -base64 32` arba panašiai; niekada rankinis trumpas slaptažodis |
| **Timing attack** | Nepaminėta | HMAC tikrinime naudoti constant-time compare | **Mokymų app** (verifikatorius) turi naudoti `crypto.timingSafeEqual()` (Node) arba `hmac.compare_digest()` (Python) – ne `===` / `==` |
| **Replay** | Tik `expires` | Expiry + (neprivaloma) vienkartinis naudojimas arba nonce | Dabar pakanka expiry. Jei reikia vienkartinio – mokymų app turi saugoti „panaudotus“ tokenus (pvz. hash) iki `expires` |
| **Galiojimas** | Pvz. 30 dienų | Magic link login: 5–15 min; **access grant**: 30–365 dienų priimtina | 30 dienų sutarta – OK; dokumentuoti sutartą reikšmę |
| **HTTPS** | Nėra aiškiai | Visas redirect ir tikrinimas tik per HTTPS | Užtikrinti, kad `promptanatomy.app` ir mokymų app būtų tik HTTPS |

### 2.3 Patikimumas (nelūžtų)

- **Token generavimas:** Daryti **server-side** (backend arba Vercel serverless), niekada tik kliente. Session ID iš success page perduoti į backend; backend patikrina session (arba webhook jau įrašė) ir grąžina redirect URL su tokenu.
- **Session tikrinimas:** Prieš generuojant tokeną – patikrinti `payment_status === 'paid'` (Stripe session) arba kad webhook jau atnaujino `user_access`, kad vartotojas negalėtų pakartoti su senu session_id.
- **Klaidos:** Jei session nepatvirtintas arba netinkamas – negrąžinti tokeno; rodyti bendrą klaidos pranešimą ir nuorodą į support.

---

## 3. Konkretūs žingsniai (saugiau, patikimiau)

### 3.1 Mūsų platforma (pagrindinė)

1. **ACCESS_TOKEN_SECRET**
   - Sugeneruoti: `openssl rand -base64 32` (arba Python `secrets.token_urlsafe(32)`).
   - Laikyti tik env (backend/Vercel); niekada į repo.

2. **Redirect URL generavimas**
   - Vieta: backend endpointas (pvz. `GET /api/success-redirect?session_id=...`) arba Vercel serverless (pvz. `api/success-redirect.js`), kuris:
     - Tikrina `session_id` per Stripe API (`payment_status === 'paid'`);
     - Nustato `access_tier` (3 arba 6) iš `metadata.plan` arba Supabase;
     - Skaičiuoja `expires` (pvz. now + 30 dienų, sutarta reikšmė);
     - Skaičiuoja `token` (HMAC-SHA256(payload, secret), base64url);
     - Grąžina 302 į `https://www.promptanatomy.app/?access_tier=...&expires=...&token=...` arba JSON `{ redirect_url }` success page naudojimui.
   - Success page: po užkrovimo kreipiasi į šį endpoint su `session_id` iš query; gauna redirect URL ir atlikia `window.location = redirect_url` (arba rodo mygtuką „Eiti į mokymus“).

3. **Idempotentiškumas**
   - Tas pats session_id kelis kartus – tas pats redirect URL (deterministinis), OK. Webhook jau atnaujino `user_access` vieną kartą.

### 3.2 Mokymų sistemos komanda (perduoti reikalavimus)

- **Verifikacija:** Naudoti **timing-safe** palyginimą HMAC tikrinant (Node: `crypto.timingSafeEqual`, Python: `hmac.compare_digest`). Nepalyginti tokenų per `==` arba `===`.
- **Expires:** Atmesti užklausas, kuriose `expires < now()` (serverio laiku).
- **access_tier:** Priimti tik `3` arba `6` (Phase 1); kitas – 400.
- **HTTPS:** Tikrinti tik per HTTPS; jei gaunama per proxy – tikėti `X-Forwarded-Proto: https`.

### 3.3 Dokumentuoti

- **Memo papildymas (arba atskiras doc):**
  - Secret: 32 bytes random, base64; saugoti kaip `ACCESS_TOKEN_SECRET`.
  - Galiojimas: sutarta dienų skaičius (pvz. 30); `expires = purchase_time + (N * 86400)`.
  - Verifikatorius: būtinai timing-safe compare.
- **Sutartis su mokymų komanda:** Kas generuoja `ACCESS_TOKEN_SECRET`; viena reikšmė abiejose sistemose; sutartas N dienų.

---

## 4. Santrauka – ar saugu, patikima, nelūžtų

| Kriterijus | Įvertinimas |
|------------|-------------|
| **Saugumas** | Memo spec pakanka, jei: secret 32+ bytes, tikrinime timing-safe compare, viskas per HTTPS. |
| **Patikimumas** | Fulfillment per webhook (jau yra); redirect su tokenu – papildomas server-side žingsnis, nepriklausomas nuo to, ar vartotojas atsidaro success page. |
| **Nelūžtų** | Token generuojamas tik po patikrinto apmokėjimo; expires ir HMAC apsaugo nuo replay ir klastojimo. |

**Rekomenduojama eiga:** Įgyvendinti success-redirect endpoint (backend arba Vercel) pagal §3.1; sutarti su mokymų komanda §3.2 ir dokumentuoti §3.3. Memo palikti kaip pagrindinę spec, šį dokumentą – kaip saugumo ir patikimumo gaires.

---

## 5. Nuorodos

- [memo.md](../memo.md) – magic link spec
- [docs/security.md](security.md) – bendras saugumas
- [docs/deploy-and-webhook.md](deploy-and-webhook.md) – webhook ir env
- GitHub: [Validating webhook deliveries](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries); [Best practices for webhooks](https://docs.github.com/en/webhooks/using-webhooks/best-practices-for-using-webhooks)
- Stripe: [Fulfill orders](https://docs.stripe.com/payments/checkout/fulfill-orders); [Custom success page](https://docs.stripe.com/payments/checkout/custom-success-page)
