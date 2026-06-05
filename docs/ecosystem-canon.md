# Ekosistemos kanonas (hub-and-spoke)

**Vieta:** vienas sutartas 9-domenų + discovery modelis `.app` repozitorijoje. Vaiko repo [DITreneris/site](https://github.com/DITreneris/site) (`promptanatomy.site`) — pilnas žemėlapis ir quiz; čia tik kanonas, kurį sinchronizuojame su `geo-manifest.js` ir i18n.

**Susiję:** [ecosystem-governance.md](ecosystem-governance.md), [frontend/src/site/geo-manifest.js](../frontend/src/site/geo-manifest.js), [golden-legacy-standard.md](golden-legacy-standard.md).

---

## 1. Domenų rolės

| Domenas | Stadija | Fazė | Rolė |
|---------|---------|------|------|
| `promptanatomy.app` | Hub | — | Kainodara, checkout, prieiga, konversija |
| `promptanatomy.app/anatomy/` | Produktas | — | Mokymų SPA (6 moduliai) |
| `promptanatomy.site` | Discovery | — | Pilnas žemėlapis, maturity quiz, Prompt Builder |
| `promptanatomy.cloud` | 1. Enter | Adopt | Onboarding, pirmoji pamoka |
| `promptanatomy.info` | 2. Use | Adopt | Promptų biblioteka, kasdieniai workflow |
| `promptanatomy.space` | 3. Create | Apply | Rinkodaros turinys |
| `promptanatomy.help` | 4. Hire | Apply | HR, atranka, personalas |
| `promptanatomy.ceo` | 5. Manage | Scale | Vadovybė, operacijos |
| `promptanatomy.pro` | 6. Decide | Scale | B2B, enterprise skalė |
| `promptanatomy.blog` | 7. Deepen | Learn | Žinios, straipsniai, canvas |
| `promptanatomy.lol` | 8. Play | Learn | Sandbox, praktika |

**Pipeline:** Enter → Use → Create → Hire → Manage → Decide → Deepen → Play

---

## 2. Kas rodoma `.app` LP

- **6 kortelės** Ecosystem sekcijoje (`#ekosistema`): cloud, info, space, help, ceo, pro — layout **3+3** (`lg:grid-cols-3`).
- **Antrinė nuoroda** į `promptanatomy.site/#ecosystem` — pilnas 9-domenų žemėlapis + quiz.
- **blog / lol** — tik GEO (`geo-manifest`, `llms.txt`), ne LP kortelėse.

---

## 3. Sinchronizacijos taisyklės

1. Spoke URL keičiami **pirmiausia** `en.json` / `lt.json` (`ecosystem.items`), tada `geo-manifest.js` (`ECOSYSTEM_SPOKES`), tada `npm run build` (`llms.txt`, `llms-full.txt`).
2. HR kanoninis domenas: **`promptanatomy.help`** (ne `ditreneris.github.io/personalas`).
3. `ECOSYSTEM_DISCOVERY` / `ECOSYSTEM_DISCOVERY_SITE` — marketing žemėlapis, ne spoke; įtrauktas į llms ir JSON-LD `ItemList` (9-as elementas).
4. `SeoHead.jsx` — `getEcosystemItemList(routeLocale)` (8 spokes + discovery); ne hardcoded URL.
5. PostHog: `ecosystem_card` (6 spokes), `ecosystem_hub` (→ `#pricing`), `ecosystem_site_map` (→ `.site`).
6. GSC operacijos — [seo-geo-operations.md](seo-geo-operations.md).

---

## 4. Intent atskyrimas (nekonkuravimas)

- **`.app`** — pirk ir prisijunk; 6 spokes kaip routing į specializuotus produktus.
- **`.site`** — paaiškink ekosistemą, quiz, Anatomizer demo; CTA atgal į `.app`.
- Kiekvienas spoke domenas — savo canonical ir turinys; nedubliuoti LP 1:1.
