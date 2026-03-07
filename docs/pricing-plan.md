# Kainodaros planas – Promptų anatomija

Dokumentas apjungia repo analizę, produkto aprašymą, geriausias praktikas ir kainodaros pasiūlymą su palyginimu su ES/pasaulio rinkomis.

---

## 1. Repo ir produktas – santrauka

| Aspektas | Būsena |
|----------|--------|
| **Repo** | `059_home_page` – marketinginis landing (Vite+React) + backend (FastAPI) su Stripe Checkout. Vienas produktas, vienkartinis mokestis. |
| **Produktas** | **Promptų anatomija** – interaktyvus DI mokymas: 6 moduliai, 6 blokų sistema, žodynėlis, įrankiai, apklausa, promptų biblioteka (500+), sertifikatas (nuo 70%), bendruomenė (WhatsApp). Lifetime prieiga. |
| **Techninė kainodara** | Vienas `STRIPE_PRICE_ID` backend'e; vienas planas UI (Pricing.jsx). Kaina rodoma statiniu tekstu: 99€ (perbraukta 199€), „Liko 14 licencijų“. |

---

## 2. Dabartinė kainodara (UI ir backend)

- **Rodyti kaina:** 99€ (anchor 199€)
- **Tipas:** vienkartinis mokestis, lifetime prieiga
- **Scarcity:** „Liko 14 licencijų“ (dabar statinis tekstas – žr. TODO)
- **Backend:** tik vienas Stripe Price; kelių planų nėra

---

## 3. Geriausios praktikos (pritaikytos produktui)

| Praktika | Kaip naudojama / rekomendacija |
|----------|--------------------------------|
| **Vertės pagrįstas pricing** | Pabrėžti rezultatą: „6 blokų sistema“, „500+ Assets“, „sertifikatas“, „bendruomenė“ – jau matoma LP. |
| **Ankštas (anchor)** | 199€ → 99€ – naudojama; palaikyti tik jei nuolaida reali (laikina ar „early bird“). |
| **Scarcity** | „Liko 14 licencijų“ – veikia tik jei skaičius atnaujinamas (API/DB) arba aiškiai pažymima kaip „limited offer“. |
| **Pasitikėjimas** | Stripe, Money-Back – jau LP. Galima pridėti „Saugus mokėjimas (Stripe)“ ar atskirą refund policy puslapį. |
| **Vienas aiškus CTA** | „Gauti prieigą dabar“ → Stripe Checkout – atitinka. |
| **Kelių planų nebūtina** | MVP – vienas planas pakanka; kelių lygių (pvz. self-paced vs + mentorystė) – vėlesnis žingsnis. |

---

## 4. Pasiūlytas kainodaros planas (keli lygiai + mentorystė)

### 4.1 Modulių lygiai (prieiga pagal modulių skaičių)

Dabartinis produktas – **6 mokymo moduliai** (žr. README_SOT). Lygiai 1–12 ir 1–15 numato būsimą turinio plėtrą (papildomi moduliai).

| Lygis | Moduliai | Kaina (EU – EUR) | Kaina (Azija, JAV – USD) | Pastabos |
|-------|----------|-------------------|---------------------------|----------|
| **1** | 1–3 | **39 €** | atitikmuo USD (TBD) | Starter, įžanga |
| **2** | 1–6 | **99 €** | atitikmuo USD (TBD) | Core, pilnas dabartinis kursas |
| **3** | 1–12 | **149 €** | atitikmuo USD (TBD) | Extended (kai bus 12 modulių) |
| **4** | 1–15 | **199 €** | atitikmuo USD (TBD) | Full, maksimalus lygis |

- **1–3:** 39 € – žema įėjimo kaina.
- **1–6:** 99 € – pagrindinis pasiūlymas.
- **1–12:** 149 € – kai turinys bus.
- **1–15:** 199 € – pilna prieiga.

### 4.2 Mentorystė ir Q&A sesijos

Mentorystė ir Q&A gali figūruoti kainodaroje kaip:

- **Add-on:** prie bet kurio lygio – papildomas mokestis už N Q&A sesijų ar 1:1 konsultacijas (pvz. +49 € / sesija arba paketas).
- **Aukštesnis planas:** pvz. „Core + 3 Q&A“ – viena kaina (pvz. 149 €), kur įskaičiuota mentorystė.

Rekomenduojama: pirmiausia apibrėžti formatą (grupinis Q&A vs 1:1, N sesijų), tada įrašyti konkrečias kainas į lentelę.

### 4.3 Valiuta pagal regioną

| Regionas | Valiuta | Kur rodyti |
|----------|---------|-------------|
| **ES / Europa** | **EUR** | Landing (LT, EU) – kainos € |
| **JAV (USA)** | **USD** | Landing arba Stripe Checkout – kainos $ |
| **Azija** | **USD** | Kainos $ (arba vietinė valiuta per Stripe) |

Techniškai: atskiros Stripe kainos (Price) EUR ir USD; frontend pagal regioną / locale rodo atitinkamą kainą ir perduoda atitinkamą `price_id` į checkout. Alternatyva – viena valiuta (EUR) ir Stripe automatinis konvertavimas (priklauso nuo Stripe nustatymų).

### 4.4 Grąžinimo taisykles (refund policy)

- **Būsena:** Grąžinimo taisyklių dar **nėra** – reikia pasitarti ir nuspręsti.
- **Rekomendacija:** Mokymams dažnai taikoma 14 dienų „nebuvo patogu“ arba „neatsisiuntė / nepasiekė turinio“ grąžinimo sąlyga; arba trumpesnis terminas (7 d.). Svarbu aiškiai parašyti sąlygas ir nuorodą į jas pateikti LP (footer ar atskiras puslapis).
- **LP:** Kol sąlygos neparašytos – nuo „Money-Back Policy“ geriau nuimti arba pakeisti į „Grąžinimo sąlygos – susisiekite“ ir nuorodą į el. paštą.

---

## 5. Palyginimas su ES ir pasaulio rinkomis

| Šaltinis | Regionas | Kaina (apytiksliai) | Formatas | Pastabos |
|----------|----------|----------------------|----------|----------|
| **Swiss Cyber Institute** | CH | CHF 990 (nuo 1990) | 6 sav., 24h live + 24h self-paced | Aukštesnė segmentas, instruktorius |
| **Media Training Ltd** | UK | £449–599 + VAT | 2 dienos | Live / hybrid |
| **Amsterdam Data Academy** | NL | Nenurodyta | 3 sav. blended | Panašus į „premium“ |
| **UCD Professional Academy** | IE | nuolaida iki €400 | Diploma + Copilot | Aukštesnė kaina |
| **Udemy** (pvz. bootcamp) | Pasaulis | $19–80 | Vienkartinis, lifetime | Žema kaina, masinė rinka |
| **PCMag deal** (structured prompt eng.) | US | $100 | Lifetime | Labai arti 99€ |
| **VibeFarm** (platform) | US | $99.99 (nuo $539) | Lifetime, 10k+ prompts | Panaši pozicija |
| **Promptų anatomija** | LT/EU | **99€** | Vienkartinis, lifetime, 6 moduliai | Tarp Udemy (pigiau) ir live training (brangiau) |

**Išvada:** 99€ gerai telpa į **„premium self-paced“** segmentą ES: aukštesnė nei Udemy (kūrybinis, struktūrizuotas turinys, sertifikatas, bendruomenė), žemesnė nei live/instructor-led kursai (CH/UK). Palyginus su panašiais US pasiūlymais ($99–100), 99€ yra konkurencinga.

---

## 6. Klausimai (patikslinimui)

1. **Mentorystė / Q&A:** add-on (kiek €/sesija ar paketas) ar atskiras planas su fiksuota kaina?
2. **Refund policy:** nuspręsti sąlygas (pvz. 14 d. grąžinimas), parašyti tekstą ir nuorodą LP (footer ar atskiras puslapis). Kol ne – LP neįvardinti „Money-Back“, arba rašyti „Grąžinimo sąlygos – susisiekite“.
3. **PVM:** ar visos kainos (39 / 99 / 149 / 199 €) galutinės su PVM, ar PVM viršuje?
4. **USD sumos:** atitikmenys 39 / 99 / 149 / 199 € → $ Azijai ir JAV; nustatyti ir įrašyti į lentelę.

---

## 7. Techniniai žingsniai (keli planai + valiutos)

- **Keli planai (1–3, 1–6, 1–12, 1–15):** Stripe – atskiras Product/Price kiekvienam lygiui (arba vienas Product, kelios Price). Backend – `create-checkout-session` priima `price_id` arba `plan_id`; frontend – planų pasirinkimas ir perduoda atitinkamą `price_id`.
- **EUR vs USD:** atskiros Stripe Price (viena EUR, viena USD) arba Stripe multi-currency; frontend pagal regioną/locale rodo EUR arba USD ir siunčia atitinkamą `price_id`. Alternatyva – geolokacija arba vienas valiuta + Stripe konvertavimas.
- **Mentorystė add-on:** atskiras Price (pvz. „3 Q&A sesijos“) arba checkout su line_items: kursas + add-on.
- **„Liko X licencijų“:** jei naudojate – backend endpointas (likutis iš DB/config), frontend atnaujina; kitaip – neutralus tekstas.

---

## 8. Peržiūra – ko trūksta

Santrauka: ką reikia padaryti, kad LP ir backend atitiktų kainodaros planą (4 lygiai, EUR/USD, refund).

### 8.1 Kainodara (4 lygiai)

| Kas reikalinga | Būsena | Kur |
|----------------|--------|-----|
| 4 planai UI (39 / 99 / 149 / 199 €) | **Atlikta** | `frontend/src/components/Pricing.jsx` – 4 planų kortos |
| Pasirinktas planas perduodamas į checkout | **Atlikta** | `HomePage.jsx` → `createCheckoutSession(planId)` |
| API priima `plan_id` | **Atlikta** | `backend/main.py` – CreateCheckoutBody.plan_id, mapping į price_id |
| 4 Stripe Price (EUR) | **Rankinis** | Stripe Dashboard – sukurti 39, 99, 149, 199 EUR ir įrašyti į .env |
| Config: 4 price_id | **Atlikta** | `backend/core/config.py` – stripe_price_id_plan_1 … _4 |

### 8.2 Valiuta (EUR / USD)

| Kas reikalinga | Būsena | Pastabos |
|----------------|--------|----------|
| Rodyti kainas USD (Azija, JAV) | **Trūksta** | Frontend: locale arba regionas → USD kainos + atitinkami Stripe Price |
| 4 Stripe Price USD (arba vienas Product, kelios Price) | **Trūksta** | Stripe – atitikmenys 39/99/149/199 $ |
| Backend: priimti valiutą arba `price_id` (jau pasirinktas) | **Trūksta** | Jei frontend siunčia `price_id`, pakanka validuoti sąraše |

### 8.3 Refund policy

| Kas reikalinga | Būsena | Pastabos |
|----------------|--------|----------|
| Parašytos grąžinimo sąlygos | **Trūksta** | Pasitarti, nuspręsti (pvz. 14 d.), dokumentuoti |
| LP: nuoroda arba tekstas | **Atlikta** | Pricing.jsx – „Grąžinimo sąlygos – susisiekite“ |
| Atskiras puslapis /legal/refund (optional) | **Trūksta** | Jei norima pilnas tekstas |

### 8.4 Kitas (jau žinomi iš TODO)

| Kas reikalinga | Būsena |
|----------------|--------|
| „Liko 14 licencijų“ – dinamiška arba panaikinti | Statinis tekstas; nuspręsti |
| SuccessPage – nepažadėti el. laiško kol nėra | TODO |
| Webhook → DB + prieiga (Supabase) | Kol kas negalima |
| PVM pozicija (kainos su/be PVM) | Nuspręsti |

### 8.5 Prioritetas įgyvendinimui

1. **Backend:** `create-checkout-session` priima `price_id` (arba `plan_id` → price_id mapping); validacija, kad `price_id` iš leidžiamų sąrašo.
2. **Config:** 4 EUR price_id (env arba config); vėliau 4 USD price_id.
3. **Frontend:** Pricing – 4 planų kortos/blokai su kainomis; pasirinkus planą, `createCheckoutSession(priceId)`; rodyti EUR arba USD pagal locale/region.
4. **Stripe:** Sukurti 4 Products arba 1 Product + 4 Price (39, 99, 149, 199 EUR); pakartoti USD, jei reikia.
5. **Refund:** Nuspręsti sąlygas; LP pakeisti „Money-Back“ į neutralų tekstą arba nuorodą.

---

*Dokumentas: `docs/pricing-plan.md`. Atnaujinta: 2025-03.*
