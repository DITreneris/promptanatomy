# Ecosystem KPI snapshot — 2026-09-04

**Scope:** A.6 close — 14 d. `ecosystem_outbound_click` by placement + same-window Stripe + assisted inbound UTM  
**Window A:** 2026-08-21 → 2026-09-04 (14 days; [ecosystem-governance.md](../../ecosystem-governance.md) cycle)  
**Date:** 2026-09-04  
**Operator:** Cursor PostHog MCP (`query-trends` / `query-web-overview`) on EU `155249`; Tomas Stripe  
**PostHog (hub SOT):** EU project `155249` — [eu.posthog.com/project/155249](https://eu.posthog.com/project/155249)  
**Prior snapshot:** [ecosystem-kpi-2026-08-16.md](ecosystem-kpi-2026-08-16.md) (hub web 180d + Stripe lifetime **4**)  
**Status:** **Closed** — placement × target queried; Stripe 14 d. + lifetime; assisted queried unmatched. `[A.6]` done.

`filterTestAccounts: false` (matches Activity). Window end in PostHog = `2026-09-04 00:00:00 UTC`. No emails, person IDs, or magic-link URLs.

US sample project `373536` from earlier this session is **discarded** (demo events, not hub).

---

## Close numbers (MCP, EU `155249`)

### Hub web (14 d.)

| Metric | Value |
|--------|-------|
| Visitors | **109** |
| Pageviews | **305** |
| Sessions | **175** |
| Avg session | **171 s** |
| Bounce | **34.3%** |

`$pageview` by `$pathname`: `/` **224** · `/lt` **45** · `/en` **24** · `/terms` 9 · `/cancel` 2 · `/privacy` 1. `/success` **0**.

### Outbound — `ecosystem_outbound_click`

| | Count |
|--|-------|
| Events | **18** |
| Distinct persons | **7** (matches Activity; MCP `dau` table aggregate also 7) |
| `placement` | **all 18** = `ecosystem_card` |
| `footer_network` | **0** (queried) |
| `navbar_mobile` | **0** (queried) |
| `ecosystem_site_map` | **0** (queried) |

`placement` × `target` (card only):

| target | Clicks |
|--------|--------|
| `https://www.promptanatomy.space/en/` | **10** |
| `https://promptanatomy.cloud/` | **5** |
| `https://www.promptanatomy.info/en/` | **3** |
| `.help` / `.ceo` / `.pro` / `.site` map | **0** |

`page_path` × `locale`: `/` + `en` **13** · `/en` + `en` **5** · `/lt` **0**. Every outbound event carried `locale=en` (root `/` is EN default).

Proxy (not true CTR — repo has no impression event): 18 / 305 pageviews ≈ **5.9%**. Path proxy: `/` 13/224 ≈ 5.8%; `/en` 5/24 ≈ 20.8%; `/lt` 0/45 = 0%.

### Assisted inbound + Stripe

`$pageview` with `utm_source` set: `site` **4** · `training` **3**. Spoke slugs `cloud|pro|help|ceo|info|space|blog|lol` = **0**.

| Count | Value | Window |
|-------|-------|--------|
| Paying (14 d.) | **0** new | 2026-08-21 → 2026-09-04 |
| Paying (lifetime) | **4** | Operator 2026-09-04; same as 2026-08-16 |
| `/success` pageviews | **0** | same 14 d. |
| `/cancel` pageviews | **2** | same 14 d. |

SOT = Stripe Dashboard, not PostHog `/success`. Assisted **traffic** = `.site` UTM (4). Assisted **conversion** = unmatched (0 new pays).

---

## KPI minimum (A.6)

SOT: [ecosystem-governance.md](../../ecosystem-governance.md)

| KPI | Current value | Source | Status |
|-----|---------------|--------|--------|
| Hub traffic + locale split | 109 vis / 305 pv; `/` 224 · `/lt` 45 · `/en` 24 | MCP web overview + `$pathname` | **Have** |
| Stripe purchases | Lifetime **4**; 14 d. new **0** | Stripe Dashboard (operator) | **Have** |
| Outbound `ecosystem_card` (6 spokes) | 18 clicks: space 10, cloud 5, info 3; help/ceo/pro **0** | MCP `placement` × `target` | **Have** (counts; proxy rate only) |
| `.cloud` / `.pro` `footer_network` / `navbar_mobile` | **0** / **0** | MCP `placement` | **Have** (queried empty) |
| `ecosystem_site_map` → `.site` | **0** | MCP `placement` | **Have** (queried empty) |
| Assisted conversion spoke → `.app` checkout | `utm_source=site` ×4; other spokes 0; Stripe 14 d. **0** | MCP UTM + Stripe | **queried, unmatched** |
| `ecosystem_cta_pricing_click` | Removed | Hub CTA is `#pricing` | N/A |

True card CTR (clicks/impressions) remains **WON’T** this cycle.

---

## Property values (code, 2026-09-04)

Instrument: `captureEcosystemOutboundClick` → `ecosystem_outbound_click` `{ target, placement, locale, page_path }`. Mediums match `APP_UTM_MEDIUM`.

| placement | Where | `target` as captured |
|-----------|--------|----------------------|
| `ecosystem_card` | Ecosystem 6 cards | Full `item.url` |
| `ecosystem_site_map` | Map CTA | `https://promptanatomy.site` |
| `footer_network` | Footer Cloud / Pro | slugs `promptanatomy_cloud` / `promptanatomy_pro` |
| `navbar_mobile` | Mobile drawer Cloud / Pro | same slugs |

Hub → spoke UTM on `main` since 2026-09-02 (`9e42e4b`): `utm_source=app` + `utm_medium=<placement>`. Reverse: `utm_source=<spoke>` + `utm_medium=entity_footer`.

---

## Read

- Instrumentacija gyva ir **query gap uždarytas**. Visos 18 paspaudimų = Ecosystem kortelės. Footer / mobile Cloud–Pro / `.site` map šiame lange **0**.
- Kortelių mix: `.space` EN 10, `.cloud` 5, `.info` EN 3. `.help` / `.ceo` / `.pro` nepaspausti. LT outbound **0** (`/lt` 45 pageviews).
- Hub 14 d. realus (109 vis, 34% bounce). Funnel depth iš ankstesnio dashboard (57→19→12) lieka depth, ne checkout.
- Assisted: `.site` atveda (4 pv); pirkimo nėra. Soft-launch / organic **GO**. Paid ads lieka **CONDITIONAL** (0 naujų Stripe šiame lange).
- W1 retention 0% iš dashboard tiles = LP negrįžta — nekeičia A.6 close.

## Recommendation

`[A.6]` **closed**. Next ecosystem cycle = later dated snapshot, not this file. Do not build training PostHog, MON-4 widgets, impression events, or paid dashboards this cycle.

Query again via PostHog MCP on EU `155249` (`query-trends` + `query-web-overview`). Do not use US `373536` sample. User-level `mcp.json` must keep **both** `posthog` and `agentsmemory` — the wizard overwrite drops memory.

---

## Session trail (not the close source)

Earlier this session: US `373536` sample discarded; Activity confirmed 18 events / 7 persons without `placement` columns; dashboard `608995` referrers (Direct / Facebook / Google / `promptanatomy.site`). Those pastes are superseded by the MCP tables above.
