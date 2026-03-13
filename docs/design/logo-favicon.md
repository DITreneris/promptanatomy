# Logo ir favicon gairės

Vienas šaltinis visiems favicon ir logo išvestiniams; dydžiai, spalvos, kada naudoti efektus.

---

## Šaltinis (single source of truth)

- **Favicon / logo SVG:** [frontend/public/favicon.svg](../frontend/public/favicon.svg)
- Visos PNG ikonos generuojamos iš šio failo (scriptas: `npm run generate-favicons` iš repo root).

---

## Spalvos

| Naudojimas | Reikšmė |
|------------|---------|
| Fonas | `#0B1320` |
| Žaibas / akcentas | `#CFA73A` (galima suvienodinti su `#f3cc30` brand) |

---

## Dydžiai ir failai

| Failas | Dydis | Paskirtis |
|--------|-------|-----------|
| favicon.svg | 32×32 (viewBox) | Skirtukai, modernūs naršyklės |
| favicon-16x16.png | 16×16 | Skirtukai (standartinis) |
| favicon-32x32.png | 32×32 | Skirtukai (Retina) |
| apple-touch-icon.png | 180×180 | iOS home screen |
| android-chrome-192x192.png | 192×192 | PWA / Android |
| android-chrome-512x512.png | 512×512 | PWA splash / didesnės ikonos |

Generavimas: iš repo root vykdykite `npm run generate-favicons` (reikia `sharp` – įdiegiamas per root `npm install`).

---

## Kiss–Marry–Kill taisyklės

- **Favicon / mažos ikonos (16–32 px):** tik plokščia forma, be glow, be tekstūros. Paprastas žaibas ant fono.
- **Glow / „premium“ efektai:** tik dideliam logotipui (hero, OG image), niekada favicon ar mažoms ikonoms.
- **og-image.png:** lieka statinis failas; atnaujinti rankiniu būdu arba vienkartiniu įrankiu (pvz. atskira HTML su html2canvas – ne įtraukti į Vite build).

---

## OG image (social share)

- Esamas failas: [frontend/public/og-image.png](../frontend/public/og-image.png) – **nekeisti** formatu (.png).
- Jei reikia atnaujinti vizualą: galima naudoti atskirą HTML puslapį su snippet'o stiliaus konteineriu ir html2canvas eksportu – dokumentuoti kaip ad-hoc įrankis, ne production dalis.
