# Memo: Mokymų komandai – magic link integracija

**Kam:** Mokymų sistemos (Prompt Anatomy) kūrėjams  
**Nuo:** Pagrindinės platformos (Stripe + Supabase) komanda  
**Tema:** Ką jūsų pusėje reikia įgyvendinti, kad priimtumėte vartotojus po apmokėjimo (saugiai ir pagal sutartą formatą).

**Statusas:** Mūsų pusėje integracija įdiegta: po sėkmingo apmokėjimo vartotojui rodomas success puslapis, tada nukreipiame (mygtuku „Eiti į mokymus“) į jūsų nurodytą URL su `access_tier`, `expires` ir `token`. Jums reikia: nustatyti tą patį `ACCESS_TOKEN_SECRET`, įgyvendinti tokeno tikrinimą (timing-safe) ir pagal `access_tier` atrakinti modulius.

---

## 1. Kas vyksta iš mūsų pusės

Po sėkmingo Stripe apmokėjimo vartotoją nukreipsime į jūsų aplikaciją su **vienu URL**, kuriame bus:

- `access_tier` – įsigytas prieigos lygis (`3` arba `6`)
- `expires` – Unix timestamp (sekundės), iki kada nuoroda galioja
- `token` – HMAC-SHA256 parašas (base64url), apsaugantis nuo klastojimo

Jūsų užduotis – šį URL priimti, **patikrinti** tokeną ir `expires`, ir pagal `access_tier` atrakinti atitinkamus modulius.

---

## 2. URL formatas, kurį siųsime

**Pavyzdys:**

```
https://www.promptanatomy.app/?access_tier=6&expires=1735689600&token=Abc123...
```

**Query parametrai (visi privalomi):**

| Parametras    | Reikšmė |
|---------------|---------|
| `access_tier` | `3` arba `6` (Phase 1: tik šie du) |
| `expires`     | Unix timestamp (sekundės), iki kada nuoroda galioja |
| `token`       | HMAC-SHA256(payload, ACCESS_TOKEN_SECRET), užkoduotas base64url |

**Payload, kurį pasirašome:** `access_tier + ":" + expires`, pvz. `6:1735689600`.

**Base64url:** Base64, pakeičiame `+` → `-`, `/` → `_`, pašaliname galinius `=`.

---

## 3. Ką reikia įgyvendinti jūsų pusėje

### 3.1 Bendras secret

- Sutarsime **vieną** reikšmę **`ACCESS_TOKEN_SECRET`** (rekomenduojame 32 bytes atsitiktiniai, pvz. base64).
- Mes – naudosime generuojant `token`.
- Jūs – nustatysite **tą pačią** reikšmę savo Vercel (arba hosting) env ir naudosite tikrinant.

### 3.2 Verifikacija (būtina)

1. **Payload:** Sudėkite iš URL: `payload = access_tier + ":" + expires` (string).
2. **Apskaičiuokite tikėtiną parašą:**  
   `expectedSignature = HMAC-SHA256(payload, ACCESS_TOKEN_SECRET)` (binary).
3. **Base64url:** Užkoduokite `expectedSignature` į base64url (taip pat kaip mes).
4. **Palyginimas:** Tikrinkite **timing-safe** – ne `==` / `===`, o:
   - **Node.js:** `crypto.timingSafeEqual(Buffer.from(expectedBase64url), Buffer.from(receivedToken))`  
     (prieš tai įsitikinkite, kad abu buferiai vienodo ilgio, kitaip `timingSafeEqual` meta klaidą).
   - **Python:** `hmac.compare_digest(expected_base64url, received_token)`.

Tai apsaugo nuo timing atakų ant secret.

### 3.3 Galiojimas ir reikšmių ribos

- **expires:** Jei `expires < now()` (serverio laiku sekundėmis) – atmesti (pvz. 400 arba 403) ir nerodyti turinio.
- **access_tier:** Priimti tik `3` arba `6`. Bet kuri kita reikšmė – atmesti (400).
- **token:** Jei trūksta arba netinkamas – atmesti (400).

### 3.4 HTTPS

- Tikrinti ir atidaryti prieigą tik per HTTPS. Jei esate už reverse proxy – tikėti `X-Forwarded-Proto: https` pagal savo infrastruktūrą.

### 3.5 Prieiga pagal access_tier

| access_tier | Ką atrakinti (sutarta) |
|-------------|------------------------|
| `3`         | Moduliai 1, 2, 3       |
| `6`         | Moduliai 1–6           |

---

## 4. Ko reikia sutarti

1. **Kas generuoja `ACCESS_TOKEN_SECRET`** – viena pusė sugeneruoja (pvz. `openssl rand -base64 32`), saugiai perduoda kitai; abi laiko tą pačią reikšmę env.
2. **Galiojimo laikas:** Kiek dienų nuo pirkimo galioja nuoroda (pvz. 30). Mes apskaičiuosime `expires` kaip pirkimo laikas + N dienų; jūs tik tikrinate `expires > now()`.

---

## 5. Kas padaryti jūsų pusėje (checklist)

- [ ] Gauti ir nustatyti `ACCESS_TOKEN_SECRET` (Vercel/hosting env).
- [ ] Įgyvendinti tokeno tikrinimą: payload `access_tier:expires`, HMAC-SHA256, base64url, **timing-safe compare**.
- [ ] Atmesti, jei `expires < now()` arba `access_tier` ne 3 ir ne 6.
- [ ] Pagal `access_tier` atrakinti modulius 1–3 arba 1–6.
- [ ] Veikti tik per HTTPS.

---

**Klausimai:** kreiptis į pagrindinės platformos atsakingą asmenį.

**Nuorodos:** Detalesnė spec (mūsų generavimo pusė) – [memo.md](memo.md); saugumo ir patikimumo gairės – [docs/memo-integration-security-analysis.md](docs/memo-integration-security-analysis.md).
