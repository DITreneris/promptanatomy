# Memo: sujungimas su Mokymų sistema (Prompt Anatomy)

**Kam:** kūrėjams pagrindinės platformos (Stripe + backend + Supabase)  
**Tikslas:** po sėkmingo apmokėjimo nukreipti vartotoją į mokymų sistemą su „magic link“ – URL su pasirašytu tokenu. Mokymų app (promptanatomy.app) patikrins tokeną ir atvers atitinkamą prieigą.

---

## 1. Produktai ir prieiga

| Jūsų produktas | Kaina | access_tier | Ką atrakina mokymuose |
|----------------|-------|--------------|------------------------|
| Moduliai 1–3   | 39 EUR | `3`         | 1, 2, 3 moduliai       |
| Moduliai 4–6   | 99 EUR | `6`         | 1–6 moduliai           |

Po Stripe apmokėjimo vartotoją reikia nukreipti į mokymų sistemą su šiuo URL (žr. skyrių 2).

---

## 2. Redirect URL formatas

**Base URL:** `https://www.promptanatomy.app/`

**Query parametrai (visi privalomi):**

| Parametras     | Reikšmė |
|----------------|---------|
| `access_tier`  | `3` arba `6` (pagal įsigytą produktą) |
| `expires`      | Unix timestamp (sekundės), iki kada nuoroda galioja. Pvz. pirkimo laikas + 30 dienų. |
| `token`        | Pasirašytas HMAC (žr. skyrių 3). |

**Pavyzdys:**  
`https://www.promptanatomy.app/?access_tier=6&expires=1735689600&token=Abc123...`

---

## 3. Tokeno generavimas (jūsų pusėje)

1. **Secret:** naudokite bendrą paslaptį, sutartą su mokymų sistemos savininku. Env kintamasis: **`ACCESS_TOKEN_SECRET`** (min. 16 simbolių). Ta pati reikšmė bus nustatyta ir mokymų app (Vercel), kad galėtų patikrinti tokeną.

2. **Payload:**  
   `payload = access_tier + ":" + expires`  
   Pvz. `6:1735689600`.

3. **Signature:**  
   `signature = HMAC-SHA256(payload, ACCESS_TOKEN_SECRET)`  
   (binary result).

4. **Token (base64url):**  
   - Enkoduoti signature į Base64.  
   - Pakeisti: `+` → `-`, `/` → `_`.  
   - Pašalinti galinius `=`.

5. Gautą `token` reikšmę įdėti į redirect URL kaip query parametrą `token`.

**Pseudo-kodas:**

```
expires = floor(now() / 1000) + (30 * 86400)   // pvz. 30 dienų
payload = access_tier + ":" + expires
signature = HMAC-SHA256(payload, ACCESS_TOKEN_SECRET)
token = base64url(signature)
redirect_url = "https://www.promptanatomy.app/?access_tier=" + access_tier + "&expires=" + expires + "&token=" + token
```

---

## 4. Kur ir kada tai padaryti

- **Kada:** iš karto po sėkmingo Stripe mokėjimo (pvz. success redirect handler arba po `checkout.session.completed` apdorojimo).
- **Kur:** ten, kur dabar nukreipiate vartotoją po pirkimo. Vietoj (arba papildomai) esamo success URL – nukreipti į `https://www.promptanatomy.app/?access_tier=...&expires=...&token=...`.
- **Supabase:** savo įrašus (pirkimai, vartotojai) galite toliau daryti kaip dabar. Mokymų sistema tokeną tikrina tik per HMAC; ji tiesiogiai nekreipiasi į jūsų Supabase.

---

## 5. Ko reikia sutarti su mokymų sistemos komanda

1. **Bendras secret:** viena reikšmė `ACCESS_TOKEN_SECRET` (sugeneruota, pvz. 32 bytes random, base64). Jūs – naudojate tokeno generavimui; jie – nustato tą pačią reikšmę Vercel env mokymų projekte.
2. **Galiojimas:** kiek dienų nuo pirkimo galioja nuoroda (pvz. 30 ar 365). Jūs apskaičiuojate `expires` pagal savo politiką.

---

## 6. Trumpas checklist jūsų įgyvendinimui

- [ ] Gauti/sugeneruoti `ACCESS_TOKEN_SECRET` ir saugiai laikyti env (backend).
- [ ] Po Stripe success nustatyti `access_tier` (3 arba 6) pagal įsigytą produktą.
- [ ] Apskaičiuoti `expires` (Unix timestamp).
- [ ] Apskaičiuoti `token` (HMAC-SHA256 + base64url).
- [ ] Nukreipti vartotoją į `https://www.promptanatomy.app/?access_tier=...&expires=...&token=...`.

---

**Klausimai:** kreiptis į mokymų sistemos (Prompt Anatomy) atsakingą asmenį.
