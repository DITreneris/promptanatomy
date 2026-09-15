# SEO / GEO operacijos (operator checklist)

**Paskirtis:** Rankiniai žingsniai po deploy ir periodinė GSC/GEO priežiūra hub `.app` domenui. Techninis kanonas — [ecosystem-canon.md](ecosystem-canon.md), [SEO-KISS-Marry-Kill.md](SEO-KISS-Marry-Kill.md). Citation scorecard — [templates/geo-citation-scorecard.md](templates/geo-citation-scorecard.md).

---

## A. `.app` sitemap — kas įtraukta ir kas ne

**Įtraukta** ([frontend/public/sitemap.xml](../frontend/public/sitemap.xml)): `/`, `/lt`, `/privacy`, `/terms` (4 URL). `/en` – share URL su canonical → `/`, ne sitemap.

**Neįtraukti sąmoningai:**

- Spoke domenai (`promptanatomy.info`, `.help`, `.cloud` ir kt.) — kiekvienas turi savo canonical ir savo sitemap
- Hash sekcijos (`#pricing`, `#ekosistema`, `#faq`)
- `/anatomy/` — `User-agent: *` `Disallow` [robots.txt](../frontend/public/robots.txt); share preview crawlers (`facebookexternalhit`, `Facebot`, `Twitterbot`, `LinkedInBot`, `WhatsApp`) have their own `Allow: /anatomy/` groups so Facebook Debugger is not 403. HTML stays `noindex`. Not in sitemap.
- `/success`, `/cancel` — noindex, ne sitemap
- Viešas `/glossary` ar per-term žodyno URL — **WON’T** ([ADR-0002](decisions/0002-hub-glossary-wont.md)); Žodynėlis lieka `/anatomy/`

---

## B. Google Search Console (`promptanatomy.app` property)

| Veiksmas | Kada |
|----------|------|
| Submit `https://www.promptanatomy.app/sitemap.xml` | Tik jei dar nebuvo submit'intas (vienkartinis) |
| URL Inspection → **Request indexing** `/`, `/lt` | Po reikšmingo LP / ecosystem copy deploy |
| URL Inspection `https://www.promptanatomy.app/anatomija/` | Tikėtis redirect → `/anatomy/`; jei impressions lieka — kantrybė arba Removals |
| **Queries** export (28d vs prior 28d) | CTR kritimas = intent/copy fix, ne daugiau URL sitemap'e |
| `llms.txt` 0 clicks, daug impressions | **No action** — GEO failas, ne landing |

Žr. snapshot: [archive/snapshots/gsc-2026-06-04.md](archive/snapshots/gsc-2026-06-04.md).

**GSC hygiene (pakartoti po GEO hardening):**

- [ ] Queries export 28d vs prior — jei CTR vis dar žemas, atnaujinti `meta.description` / FAQ (ne sitemap). *Last agent run: [gsc-2026-09-04.md](archive/snapshots/gsc-2026-09-04.md) — GSC paste still needed.*
- [ ] Confirm `/anatomija/` → `/anatomy/` redirect; Removals tik jei impressions lieka. *Agent 2026-09-04: live `308` → `/anatomy/`.*
- [ ] No action on `llms.txt` impressions

---

## C. Atskiri GSC property (ne šis repo)

| Domenas | Veiksmas |
|---------|----------|
| `promptanatomy.site` | Atskiras property; submit `https://promptanatomy.site/sitemap.xml` ([DITreneris/site](https://github.com/DITreneris/site)) |
| Kiekvienas spoke (`.info`, `.space`, `.help`, `.ceo`, `.cloud`, `.pro`, `.blog`, `.lol`) | Savo property + sitemap kai deploy paruoštas |

---

## D. Bing Webmaster Tools + IndexNow

1. Bing Webmaster property — **already verified; nothing to do.** Operator UI check 2026-09-15 shows the property `promptanatomy.app` live (site selector keyed on `siteUrl=https://promptanatomy.app/`, i.e. apex, while all canonicals are `www` — Bing accepts this and crawls fine, so do not "fix" it). Verification was **not** done by file or meta tag: `BingSiteAuth.xml` and `msvalidate.01` are absent from the repo, and a request for `/BingSiteAuth.xml` returns the SPA shell rather than a 404 (see §E) — so the property must have been verified by DNS or GSC import, which leave no repo artifact. **Corrects [gsc-2026-09-04.md](archive/snapshots/gsc-2026-09-04.md), which listed „Bing Webmaster: property verified + sitemap — pending“: that was already stale when written.**
2. Submit `https://www.promptanatomy.app/sitemap.xml` (tas pats kaip GSC) — **done; submitted 2026-03-15.** Operator UI 2026-09-15: known sitemaps 1, errors 0, warnings 0, **4 URLs discovered** (matches the 4-URL hub canon exactly), status `Success`, last crawl **2026-09-13**. Bing is crawling the hub on its own; no resubmit needed unless the sitemap gains or loses a URL.
3. IndexNow key — **key file added 2026-09-15, not yet deployed.** Key `19a7ca026f5a48ca8e65de6f0cab8b97`, served from [frontend/public/19a7ca026f5a48ca8e65de6f0cab8b97.txt](../frontend/public/19a7ca026f5a48ca8e65de6f0cab8b97.txt) (exactly 32 bytes, no trailing newline). Self-issued (IndexNow allows 8–128 chars of `[a-zA-Z0-9-]`); the hosted key file **is** the ownership proof, so this does not depend on step 1. Not a secret — it is public by design, so it belongs in the repo, not in env. *Open check for the operator: Bing Webmaster → IndexNow tab may already hold a key generated in the UI. A host may have several valid keys, so a pre-existing one is not a conflict — but if you prefer it, use that key and delete this file instead.*
4. After a meaningful hub deploy, POST IndexNow for the four sitemap URLs:

```bash
curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "{\"host\":\"www.promptanatomy.app\",\"key\":\"19a7ca026f5a48ca8e65de6f0cab8b97\",\"keyLocation\":\"https://www.promptanatomy.app/19a7ca026f5a48ca8e65de6f0cab8b97.txt\",\"urlList\":[\"https://www.promptanatomy.app/\",\"https://www.promptanatomy.app/lt\",\"https://www.promptanatomy.app/privacy\",\"https://www.promptanatomy.app/terms\"]}"
```

Expect `200 OK` (accepted) or `202 Accepted` (key validation pending). `403` = key file not reachable; `422` = URL not under the declared host.

No automated IndexNow serverless endpoint in this repo (manual ops first).

**`vercel.json` needs no change for the key file.** Vercel checks the filesystem before applying `rewrites`, so a real file in `frontend/public/` wins over the SPA catch-all even though it is not in that rule's negative-lookahead list — proven by `google7305663b2567346e.html`, which is also absent from the list and serves correctly. Do not add the key to the rewrite exclusions.

---

## E. Post-deploy curl smoke (`.app`)

```bash
curl -sI https://www.promptanatomy.app/sitemap.xml    # 200
curl -sI https://www.promptanatomy.app/robots.txt     # 200; body contains Sitemap:
curl -s  https://www.promptanatomy.app/robots.txt | grep -E 'facebookexternalhit|Disallow: /anatomy/'
curl -sI https://www.promptanatomy.app/llms.txt        # 200
curl -s  https://www.promptanatomy.app/llms.txt | grep -E 'promptanatomy\.(site|help)'
curl -s  https://www.promptanatomy.app/llms.txt | grep -E '^>|\[Home EN\]|## Optional'
curl -sI https://www.promptanatomy.app/llms-full.txt   # 200
```

---

## F. Rich Results Test (po JSON-LD pakeitimų)

1. [Rich Results Test](https://search.google.com/test/rich-results) — `https://www.promptanatomy.app/` ir `/lt`
2. Tikėtina: `Course`, `Offer` (×2), `ItemList` (9 items: 8 spokes + discovery), `FAQPage` (jei injektuojamas Faq komponente), `Organization` su `sameAs`
3. Kritinių klaidų neturėtų būti

---

## G. Entity graph sinchronizacija (kode)

| Šaltinis | Vartotojai |
|----------|------------|
| [frontend/src/site/geo-manifest.js](../frontend/src/site/geo-manifest.js) | `getEcosystemItemList`, `ECOSYSTEM_DISCOVERY`, `ECOSYSTEM_SPOKES`, `LAST_UPDATED` |
| [frontend/src/site/organization.js](../frontend/src/site/organization.js) | `ORG_SAME_AS`, Organization JSON-LD helpers |
| [index.html](../frontend/index.html) | First-byte Organization (+ `sameAs`) / Person / Article / WebSite |
| [SeoHead.jsx](../frontend/src/components/SeoHead.jsx) | Home JSON-LD `ItemList`; home `dateModified` ← `LAST_UPDATED` |
| [generate-geo-static.mjs](../frontend/scripts/generate-geo-static.mjs) | `llms.txt` (Answer.AI shape), `llms-full.txt`, sitemap `lastmod` |
| CI [.github/workflows/ci.yml](../.github/workflows/ci.yml) | GEO smoke: bots, `.site`/`.help`, llms blockquote + markdown links |

Keičiant spoke URL — atnaujinti `geo-manifest.js`, tada `npm run build`.

### Organization.sameAs — operator follow-up

Current `ORG_SAME_AS` (code): Telegram, Medium, `.site`, founder LinkedIn/X, GitHub repo.

1. Create LinkedIn **Company** page if missing → append URL to `ORG_SAME_AS` + `index.html`.
2. Create Wikidata item when notability allows → append `https://www.wikidata.org/wiki/Q…` (do not invent Q-IDs).
3. Re-run Rich Results Test on `/` and `/lt`.

---

## H. Freshness / release checklist (GEO content)

On meaningful LP / GEO content deploy:

1. Bump `LAST_UPDATED` in [geo-manifest.js](../frontend/src/site/geo-manifest.js).
2. `cd frontend && npm run build` — regenerates `public/llms.txt`, refreshes sitemap `<lastmod>`, writes `dist/llms-full.txt`.
3. Commit dirty `frontend/public/llms.txt` and `frontend/public/sitemap.xml` if changed.
4. Post-deploy: §E curl smoke; §F Rich Results when JSON-LD changed; §D IndexNow when key exists.

Also noted in [versioning-and-release.md](versioning-and-release.md).

---

## I. Periodinis (14 d. + monthly GEO)

- PostHog: `ecosystem_card`, `ecosystem_site_map`, `ecosystem_hub` (žr. [ecosystem-governance.md](ecosystem-governance.md))
- GSC Queries snapshot → [archive/snapshots/](archive/snapshots/)
- **Monthly:** fill [templates/geo-citation-scorecard.md](templates/geo-citation-scorecard.md); archive as `docs/archive/snapshots/geo-citations-YYYY-MM.md`. *Last fill: [geo-citations-2026-09.md](archive/snapshots/geo-citations-2026-09.md) — `[B.1]` closed 2026-09-04 (EN+LT). Next ~2026-10.*
- **LT off-site (FB / LinkedIn):** [templates/lt-geo-social-pack.md](templates/lt-geo-social-pack.md) — founder voice, bare `/lt` links, pin #2 (39/99). Does not replace monthly scorecard. Do not expand hub sitemap.

---

## J. Spoke GEO minimum (ecosystem debt — not this repo)

Each spoke / discovery domain should eventually have its own:

| Requirement | Notes |
|-------------|--------|
| Self-canonical | No 1:1 clone of hub LP |
| `robots.txt` | Allow AI retrieval bots; disallow transactional paths if any |
| `llms.txt` | Domain-specific, links back to hub `.app` for checkout |
| `sitemap.xml` | Own indexable URLs only |
| GSC property | Separate from hub |

**Priority order:** `.site` → `.blog` → remaining spokes (`.cloud`, `.info`, `.space`, `.help`, `.ceo`, `.pro`, `.lol`).

Hub sitemap must **not** list spoke URLs. See [ecosystem-governance.md](ecosystem-governance.md).
