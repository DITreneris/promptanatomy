# Ekosistemos valdymas (hub-and-spoke)

## Tikslas

Išlaikyti vieną brandą su 9-domenų ekosistema + discovery svetaine taip, kad domenai vienas kitą stiprintų, o ne konkuruotų SEO, GEO ir AI atsakymuose.

**Kanonas:** [ecosystem-canon.md](ecosystem-canon.md)

## Rolės

- `promptanatomy.app` — pagrindinis hub: kainodara, checkout, prieiga, konversija; LP rodo **6 spokes** (3+3 grid).
- `promptanatomy.site` — discovery: pilnas 9-domenų žemėlapis, maturity quiz, Prompt Builder; CTA į `.app`.
- `promptanatomy.cloud` — Enter (Adopt): onboarding, pirmoji pamoka → hub.
- `promptanatomy.info` — Use (Adopt): promptų biblioteka, kasdieniai workflow → hub.
- `promptanatomy.space` — Create (Apply): rinkodaros turinys → hub.
- `promptanatomy.help` — Hire (Apply): HR, atranka → hub.
- `promptanatomy.ceo` — Manage (Scale): vadovybė, operacijos → hub.
- `promptanatomy.pro` — Decide (Scale): B2B, enterprise → hub.
- `promptanatomy.blog` — Deepen (Learn): žinios, straipsniai (GEO + `.site`).
- `promptanatomy.lol` — Play (Learn): sandbox (GEO + `.site`).

## SEO/GEO/AI taisyklės

1. Kiekvienas domenas turi savo pirminį intent ir nedubliuoja LP turinio 1:1.
2. Visi domenai naudoja nuoseklų brand identitetą (Organization faktai, kontaktas, tonas).
3. Kiekvienas domenas turi self-canonical; dubliuojami puslapiai perrašomi arba žymimi noindex.
4. Kryžminis linkinimas turi būti kryptingas: iš `.cloud/.pro` aiškus CTA atgal į `.app`.
5. Matavimas remiasi `ecosystem_outbound_click` įvykiais ir periodiniu KPI snapshot.

## KPI minimumas (14 dienų ciklas)

- Outbound CTR į 6 spokes iš `ecosystem_card` (cloud, info, space, help, ceo, pro) pagal locale (LT/EN).
- Outbound CTR į `.cloud` ir `.pro` taip pat iš `footer_network`, `navbar_mobile` (papildomi placement).
- Outbound CTR į `promptanatomy.site` iš `ecosystem_site_map` (pilnas žemėlapis).
- Hub konversijos signalas: `ecosystem_cta_pricing_click` (placement `ecosystem_hub`) — vidinis CTA iš Ekosistemos sekcijos į `#pricing`.
- Assisted conversion (srautas iš `.cloud/.pro` į `.app` ir checkout/success santykis).
- LT/EN split ir GEO split (LT vs US/EU) pagal įėjimo kanalą.

## GEO failai (hub `.app`)

Hub repozitorijoje (`059_home_page` / Vercel deploy):

| Failas | Paskirtis |
|--------|-----------|
| `frontend/src/site/geo-manifest.js` | Vienas šaltinis: ekosistemos URL, founder (Tomas Staniulis), Medium publikacijos, kainodara |
| `frontend/public/llms.txt` | Trumpas AI indeksas (atnaujinamas build metu) |
| `dist/llms-full.txt` | Pilnas indeksas: FAQ LT/EN, hero, ekosistema |
| `frontend/public/robots.txt` | AI + search bot leidimai |
| `frontend/index.html` | `Person` + Medium `Article` JSON-LD |

**Taisyklės:** llms failuose turi būti visi hub/spoke domenai, founder profiliai (LinkedIn, X, Medium), 2+ autorinės publikacijos (media diversity). Spoke domenai (.info, .cloud, .pro, .space, .ceo) — atskiras follow-up: tas pats šablonas savo deploy.

---
