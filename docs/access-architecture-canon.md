# Prieigos architektūra – kanonas

**Vieta dokumente:** vienas sutartas „tiesos“ modelis be atskiro vartotojo login. Kiti sluoksniai – tiltas į mokymų SPA, ne konkuruojanti ilgalaikė autoritetas.

**Susiję:** [payment-best-practices.md](payment-best-practices.md) (plan_value, webhook), [golden-legacy-standard.md](golden-legacy-standard.md) (kontraktai), [memo-integration-security-analysis.md](memo-integration-security-analysis.md) (HMAC).

---

## 1. Produktinis sprendimas

- **Nėra** atskiros vartotojų paskyros / prisijungimo produkte.
- **Tapatumas:** el. paštas (iš Stripe Checkout arba įvestas LP „patikrink prieigą“).
- **Tikslas:** paprastumas – prijungti pirkėją prie mokymų pagal el. paštą ir serverį patvirtintą prieigą.

---

## 2. Kanonas: kur laikoma „tiesa“ apie mokamą prieigą

| Kas | Rolė |
|-----|------|
| **Supabase lentelė `user_access`** | **Kanoninė** ilgalaikė prieiga: `email` (visada `lower(trim(...))`), `highest_plan` (0, 3, 6, 12, 15), `stripe_customer_id`. |
| **Stripe webhook** | **Vienintelis** kanalas, kuris **įrašo / atnaujina** `user_access` po sėkmingo apmokėjimo (`checkout.session.completed`). Žr. `api/stripe-webhook.js`, backend `handle_checkout_completed`. |
| **Success puslapis** | **Ne** šaltinis tiesos – prieigą DB nekuria; tik UX. |

**Taisyklė:** bet kas, kas rodo „ar šis el. paštas turi planą“ LP ar serverless API pusėje, remiasi **`user_access`**, ne Stripe API ir ne kliento localStorage.

---

## 3. Landing page ir API (skaitymas iš kanono)

- **`GET /api/access?email=`** – grąžina `highest_plan` ir išvestines laukų reikšmes iš `user_access` (`api/access.js` / backend analogas).
- **`GET /api/generate-access-link?email=`** – jei `highest_plan > 0`, generuoja mokymų URL su HMAC parametrais (`api/generate-access-link.js`).

---

## 4. Antrinis kelias po checkout (sąmoningas)

- **`GET /api/success-redirect?session_id=`** tier’ą ima iš **Stripe Checkout `session.metadata.plan`** (ir tikrina `payment_status`), **neperklausdamas** `user_access` (`api/success-redirect.js`).
- **Kodėl tai OK operaciškai:** po sėkmingo apmokėjimo webhook’as turėtų jau būti atnaujinęs DB; metadata ir DB sutampa normaliame sraute.
- **Kanonas vis tiek:** ilgalaikė būsena ir LP logika = **`user_access`**. Jei webhook vėluoja ar nepavyksta, teorinis neatitikimas galimas – tai žinoma riba (žr. [TODO.md](../TODO.md) skyrių „Vėliau – prieigos architektūra“).

---

## 5. Mokymų SPA: tiltas (ne antra DB tiesa)

- Vartotojas patenka su query: `access_tier`, `expires`, `token` (HMAC).
- **`GET /api/verify-access`** – serveris patvirtina parašą ir galiojimą.
- Po sėkmės klientas saugo patvirtintą tier (pvz. `localStorage` raktas `verified_access_tier`) – **UX / sesijos patogumui**, ne autoritetas atsiskaitymui ar LP.

**Tai nėra** Supabase Auth JWT ir nėra antras „billing“ šaltinis – tai **perdavimo ir užrakto** mechanizmas atskiroje aplikacijoje (`apps/prompt-anatomy`).

---

## 6. Santrauka vienu sakiniu

**Webhook → `user_access` = kanonas; LP ir „generuok nuorodą“ skaito DB; po checkout redirect dar gali skaityti Stripe metadata; mokymuose HMAC + verify = tiltas.**
