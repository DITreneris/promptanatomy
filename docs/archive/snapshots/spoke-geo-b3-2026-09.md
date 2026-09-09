# Spoke GEO minimum — B.3 — 2026-09-04

Horizon **[B.3]** ([seo-geo-operations.md](../../seo-geo-operations.md) §J). Not hub-repo chrome. Hub sitemap unchanged: `/`, `/lt`, `/privacy`, `/terms` only.

Live curl 2026-09-04 (agent). GSC clicks = **Tomas**.

---

## `.site` — `https://promptanatomy.site/` (DITreneris/site)

| Check | Live |
|-------|------|
| Apex `/` | **200** |
| `www` `/` | **308** → `https://promptanatomy.site/` |
| Canonical | `https://promptanatomy.site/` |
| `/robots.txt` | **200** — `OAI-SearchBot`, `PerplexityBot`, `Sitemap: https://promptanatomy.site/sitemap.xml` |
| `/llms.txt` | **200** — discovery role; checkout `https://promptanatomy.app/` |
| `/sitemap.xml` | **200** — one loc `https://promptanatomy.site/` (apex only; live lastmod 2026-08-24) |
| Entity footer | QW1b copy + `utm_source=site&utm_medium=entity_footer&utm_campaign=ecosystem` in live JS bundle |
| GSC token in HTML | Absent (correct) |

No `.site` code write this session. FIRST IMPROVE share remains DONE. Do not reopen bounce / EUR / i18n / hero / 6→12.

### Tomas — GSC `.site`

1. Property `promptanatomy.site` (Domain or URL-prefix **apex**).
2. Sitemaps → submit **only** `https://promptanatomy.site/sitemap.xml`.
3. Remove `https://www.promptanatomy.site/sitemap.xml` if still listed.
4. Confirm row is fetched — not first-fetch “Could not fetch / Unknown / 0 pages”.
5. Optional once: URL Inspection → Request indexing `https://promptanatomy.site/`.

Bing / IndexNow on `.site` = follow-up, not a B.3 gate.

---

## `.blog` — `https://www.promptanatomy.blog/` (DITreneris/blog)

| Check | Live 2026-09-04 | After local patch |
|-------|-----------------|-------------------|
| www `/` | **200** | — |
| Apex `/` | **307** → `https://www.promptanatomy.blog/` | — |
| Canonical | `https://www.promptanatomy.blog/` | — |
| `/robots.txt` | **200** — `PerplexityBot` + `GPTBot`; **no** `OAI-SearchBot` / `ChatGPT-User` | **Live after deploy `1290b5e`:** `OAI-SearchBot` + `ChatGPT-User` present. |
| `/llms.txt` | **200** — knowledge hub; training `https://www.promptanatomy.app/` | No catalog rewrite |
| `/sitemap.xml` | **200** — www.promptanatomy.blog URLs only (~93) | — |
| Entity footer | Live: `utm_source=blog&utm_medium=entity_footer&utm_campaign=ecosystem` | — |

Do not mass Request Indexing. Peek ~2026-09-06 is observation, not a gate. No blog card on `.app`. No `/anatomy/` deep links.

### Tomas — GSC `.blog`

1. Property already exists (36 indexed as of 2026-08-22).
2. If Sitemaps row healthy — leave it.
3. If “Unknown / Could not fetch / 0 pages” — open the row → resubmit `https://www.promptanatomy.blog/sitemap.xml` (do not rewrite XML).
4. After blog `robots.txt` deploy: confirm live `/robots.txt` contains `OAI-SearchBot`.

---

## Hub

[frontend/public/sitemap.xml](../../frontend/public/sitemap.xml) — four `.app` URLs; **zero** spoke locs (reconfirmed 2026-09-04).
