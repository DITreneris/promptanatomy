# Test report

Trumpi patikrinimų ir atsiliepimų įrašai (produkcija, SSL, UX ir kt.).

---

## 2026-03-18: SSL/TLS sertifikatas (www.promptanatomy.app)

### Kontekstas
- **Atsiliepimai:** Vartotojai matė klaidą „Jūsų ryšys nėra privatus“ (`NET::ERR_CERT_AUTHORITY_INVALID`). Nuoroda į svetainę siųsta per Teams; dalyviai/klientas naudojo savo tinklą (galimas įmonės proxy ar TLS inspekcija).
- **Svetainė:** https://www.promptanatomy.app (hostinuojama Vercel).

### Patikrinimas
- **Įrankis:** [SSL Labs](https://www.ssllabs.com/ssltest/analyze.html?d=www.promptanatomy.app)
- **Rezultatai:**

| IP            | Būsena | Data (UTC)              | Trukmė   | Įvertinimas |
|---------------|--------|--------------------------|----------|-------------|
| 76.76.21.61   | Ready  | Wed, 18 Mar 2026 12:54:02 | 49.55 s  | **A+**      |
| 66.33.60.130  | Ready  | Wed, 18 Mar 2026 12:54:51 | 48.487 s | **A+**      |

### Išvada
- Sertifikatas ir konfigūracija **mūsų pusėje (Vercel) teisingi** – pilna grandinė, A+ abu IP.
- Matoma vartotojų klaida greičiausiai dėl **kliento tinklo** (proxy, corporate TLS inspekcija, įrenginyje neįdiegta įmonės CA).

### Rekomendacijos vartotojams
- Bandyti kitą tinklą (pvz. mobilus internetas) arba namų Wi‑Fi.
- Jei problema kartosis – IT administratoriui tikrinti SSL inspekcijos/proxy konfigūraciją.

### Follow-up
Jei skundai vėl pasikartos – dar kartą paleisti SSL Labs ir pasiūlyti vartotojams patikrinti iš kito tinklo.

---

## 2026-03-23: LP „No access found“ po el. pašto patikros (Kainodara)

### Kontekstas
- Vartotojas po **Check** mato geltoną pranešimą **„No access found“** / „No access found for this email…“ (grįžtantieji pirkėjai, Kainodara).
- Pavyzdys (ataskaita iš palaikymo): **Vickyva@gmail.com** – ekrane rodoma, kad prieigos nėra, nors „yra Supabase“.

### Kas patikrinta kode (repo)
- **`GET /api/access`** (`api/access.js`): skaitoma tik lentelė **`user_access`**, laukeliai `email` (lyginimas su **`email.toLowerCase()`**) ir `highest_plan`. Jei eilutės nėra arba `highest_plan` neįrašytas → lieka **`highest_plan: 0`**; atsakas vis tiek **HTTP 200**.
- **Frontend** (`frontend/src/pages/HomePage.jsx`): geltonas blokas rodomas tik kai **`access && access.highest_plan === 0`** po sėkmingo `getAccess()`. Tai **ne** tinklo klaida (tinklo klaidos eitų į `accessError`, dažniausiai raudonai).
- **„Eiti į mokymus“** (`/api/generate-access-link`): grąžina **404** „No access found for this email“, jei `highest_plan <= 0` – ta pati `user_access` logika.

### Išvada
„Yra Supabase“ dažnai reiškia **kitą lentelę** (pvz. `auth.users`) arba įrašą su **kitu el. paštu** nei vartotojas įvedė. Produktinė prieiga LP ir magic link remiasi **`user_access.email` + `highest_plan > 0`**.

### Follow-up (2026-03-23): `highest_plan = 6`, bet vis dar „No access“?

**El. pašto registro neatitikimas.** `GET /api/access` ir Stripe webhook naudoja **`email.trim().toLowerCase()`** (`api/access.js`, `api/stripe-webhook.js`). PostgreSQL **`text`** lyginimas yra **case-sensitive**: jei lentelėje įrašyta **`Vickyva@gmail.com`**, o užklausa ieško **`vickyva@gmail.com`**, eilutė **nerandama** → API grąžina `highest_plan: 0` nepaisant to, kad Dashboard’e matote „teisingą“ įrašą su didžiąja raide.

**Ne RLS:** serverless naudoja **service role** raktą – RLS paprastai **apeinama**; problema čia ne politikos, o **tikslus email stringas**.

**Ką daryti:** vienkartinis pataisymas – `update user_access set email = lower(trim(email)) where email = 'Vickyva@gmail.com';` (arba masinis: `where email <> lower(trim(email))`). Nauji rankiniai įrašai – **`lower('...')` į `VALUES`**, žr. [docs/supabase-user-access.sql](supabase-user-access.sql) pabaigoje.

### Operacinis checklist (produkcija)
- [ ] Supabase (**tas pats projektas** kaip Vercel `SUPABASE_URL`): lentelė **`user_access`** – eilutė su **`email` tiksliai `vickyva@gmail.com` (mažosios)** – ne tik „panašus“ adresas UI.
- [ ] Laukas **`highest_plan`**: turi būti **3, 6, 12 arba 15** pagal įsigytą planą; **0** arba trūkstama eilutė = tas pats UI kaip ekrane.
- [ ] Jei mokėta per Stripe: webhook `checkout.session.completed` ir `metadata.plan` – žr. [docs/deploy-and-webhook.md](deploy-and-webhook.md) §3.2–3.3.
- [ ] Vercel: `SUPABASE_SERVICE_ROLE_KEY` / URL skirtų **ne** nuo staging, jei žiūrite į prod DB.

### Statusas
- [ ] Duomenų bazėje patvirtinta `user_access` eilutė ir `highest_plan` šiam el. paštui  
- [ ] Jei reikia – rankinis pataisymas ar pakartotinis įrašas per palaikymo procesą
