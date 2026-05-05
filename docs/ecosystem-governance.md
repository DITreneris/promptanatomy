# Ekosistemos valdymas (.app / .cloud / .pro)

## Tikslas

Išlaikyti vieną brandą su trimis domenais taip, kad jie vienas kitą stiprintų, o ne konkuruotų SEO, GEO ir AI atsakymuose.

## Rolės

- `promptanatomy.app` — pagrindinis hub: kainodara, checkout, prieiga, konversija.
- `promptanatomy.cloud` — edukacinis/praktinis srautas: įžanginis turinys, šablonai, nukreipimas į hub.
- `promptanatomy.pro` — profesionalus/B2B srautas: pilotai, komandos, paslaugos, nukreipimas į hub.
- `promptanatomy.info` — viešas „spin-off“ / promptų bibliotekos landing: greitas vertės demonstravimas (pvz. 8 pratimai), nukreipimas į hub.

## SEO/GEO/AI taisyklės

1. Kiekvienas domenas turi savo pirminį intent ir nedubliuoja LP turinio 1:1.
2. Visi domenai naudoja nuoseklų brand identitetą (Organization faktai, kontaktas, tonas).
3. Kiekvienas domenas turi self-canonical; dubliuojami puslapiai perrašomi arba žymimi noindex.
4. Kryžminis linkinimas turi būti kryptingas: iš `.cloud/.pro` aiškus CTA atgal į `.app`.
5. Matavimas remiasi `ecosystem_outbound_click` įvykiais ir periodiniu KPI snapshot.

## KPI minimumas (14 dienų ciklas)

- Outbound CTR į `.cloud` ir `.pro` iš `ecosystem_card`, `footer_network`, `navbar_mobile` (atskiras LP `routing_block` blokas pašalintas — Cloud/Pro pasiekiami per Navbar/Footer).
- Outbound CTR į `promptanatomy.info` iš `ecosystem_card` („Biblioteka / AI automation“) pagal locale (LT/EN).
- Hub konversijos signalas: `ecosystem_cta_pricing_click` (placement `ecosystem_hub`) — vidinis CTA iš Ekosistemos sekcijos į `#pricing`.
- Assisted conversion (srautas iš `.cloud/.pro` į `.app` ir checkout/success santykis).
- LT/EN split ir GEO split (LT vs US/EU) pagal įėjimo kanalą.
