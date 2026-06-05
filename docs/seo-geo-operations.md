# SEO / GEO operacijos (operator checklist)

**Paskirtis:** Rankiniai žingsniai po deploy ir periodinė GSC/GEO priežiūra hub `.app` domenui. Techninis kanonas — [ecosystem-canon.md](ecosystem-canon.md), [SEO-KISS-Marry-Kill.md](SEO-KISS-Marry-Kill.md).

---

## A. `.app` sitemap — kas įtraukta ir kas ne

**Įtraukta** ([frontend/public/sitemap.xml](../frontend/public/sitemap.xml)): `/`, `/lt`, `/en`, `/privacy`, `/terms` (5 URL).

**Neįtraukti sąmoningai:**

- Spoke domenai (`promptanatomy.info`, `.help`, `.cloud` ir kt.) — kiekvienas turi savo canonical ir savo sitemap
- Hash sekcijos (`#pricing`, `#ekosistema`, `#faq`)
- `/anatomy/` — `Disallow` [robots.txt](../frontend/public/robots.txt)
- `/success`, `/cancel` — noindex, ne sitemap

---

## B. Google Search Console (`promptanatomy.app` property)

| Veiksmas | Kada |
|----------|------|
| Submit `https://www.promptanatomy.app/sitemap.xml` | Tik jei dar nebuvo submit'intas (vienkartinis) |
| URL Inspection → **Request indexing** `/`, `/lt`, `/en` | Po reikšmingo LP / ecosystem copy deploy |
| URL Inspection `https://www.promptanatomy.app/anatomija/` | Tikėtis redirect → `/anatomy/`; jei impressions lieka — kantrybė arba Removals |
| **Queries** export (28d vs prior 28d) | CTR kritimas = intent/copy fix, ne daugiau URL sitemap'e |
| `llms.txt` 0 clicks, daug impressions | **No action** — GEO failas, ne landing |

Žr. snapshot: [archive/snapshots/gsc-2026-06-04.md](archive/snapshots/gsc-2026-06-04.md).

---

## C. Atskiri GSC property (ne šis repo)

| Domenas | Veiksmas |
|---------|----------|
| `promptanatomy.site` | Atskiras property; submit `https://promptanatomy.site/sitemap.xml` ([DITreneris/site](https://github.com/DITreneris/site)) |
| Kiekvienas spoke (`.info`, `.space`, `.help`, `.ceo`, `.cloud`, `.pro`, `.blog`, `.lol`) | Savo property + sitemap kai deploy paruoštas |

---

## D. Bing Webmaster Tools

Jei naudojama — submit tas pats `https://www.promptanatomy.app/sitemap.xml`.

---

## E. Post-deploy curl smoke (`.app`)

```bash
curl -sI https://www.promptanatomy.app/sitemap.xml    # 200
curl -sI https://www.promptanatomy.app/robots.txt     # 200; body contains Sitemap:
curl -sI https://www.promptanatomy.app/llms.txt        # 200
curl -s  https://www.promptanatomy.app/llms.txt | grep -E 'promptanatomy\.(site|help)'
curl -sI https://www.promptanatomy.app/llms-full.txt   # 200
```

---

## F. Rich Results Test (po JSON-LD pakeitimų)

1. [Rich Results Test](https://search.google.com/test/rich-results) — `https://www.promptanatomy.app/` ir `/lt`
2. Tikėtina: `Course`, `Offer` (×2), `ItemList` (9 items: 8 spokes + discovery), `FAQPage` (jei injektuojamas Faq komponente)
3. Kritinių klaidų neturėtų būti

---

## G. Entity graph sinchronizacija (kode)

| Šaltinis | Vartotojai |
|----------|------------|
| [frontend/src/site/geo-manifest.js](../frontend/src/site/geo-manifest.js) | `getEcosystemItemList`, `ECOSYSTEM_DISCOVERY`, `ECOSYSTEM_SPOKES` |
| [SeoHead.jsx](../frontend/src/components/SeoHead.jsx) | Home JSON-LD `ItemList` |
| [generate-geo-static.mjs](../frontend/scripts/generate-geo-static.mjs) | `llms.txt`, `llms-full.txt` |
| CI [.github/workflows/ci.yml](../.github/workflows/ci.yml) | GEO smoke grep `.site`, `.help` |

Keičiant spoke URL — atnaujinti `geo-manifest.js`, tada `npm run build`.

---

## H. Periodinis (14 d.)

- PostHog: `ecosystem_card`, `ecosystem_site_map`, `ecosystem_hub` (žr. [ecosystem-governance.md](ecosystem-governance.md))
- GSC Queries snapshot → [archive/snapshots/](archive/snapshots/)
