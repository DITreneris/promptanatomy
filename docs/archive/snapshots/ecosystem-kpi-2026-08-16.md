# Ecosystem KPI snapshot — 2026-08-16

**Scope:** A.6 follow-up after PostHog EU + Stripe operator read  
**Window:** PostHog Web analytics **last 180 days** (to 2026-08-16); Stripe lifetime paying count as of 2026-08-16  
**Date:** 2026-08-16  
**Operator:** Tomas (dashboards) + Cursor (doc sync)  
**PostHog:** EU project `155249` — [Web analytics](https://eu.posthog.com/project/155249/web)  
**Prior snapshot:** [ecosystem-kpi-2026-08.md](ecosystem-kpi-2026-08.md) (2026-08-12, no dashboard access)  
**Status:** Partial — analytics + Stripe present; spoke placement CTR still Gap

---

## Hub web (PostHog, 180d)

| Metric | Value |
|--------|-------|
| Visitors | 1.12K |
| Page views | 2.89K |
| Sessions | 2.04K |
| Session duration | 3m 46s |
| Bounce rate | 42% |
| Monthly unique after April spike | ~200 / month (April peak ~500; Feb–Mar ≈ 0 = pre-key) |

### Paths (top)

| Path | Visitors | Views | Bounce |
|------|----------|-------|--------|
| `/` | 887 | ~1.99K | 40.1% |
| `/lt` | 280 | 726 | 49.3% |
| `/en` | 107 | 138 | 64.3% |
| `/cancel` | 8 | 11 | 0% |
| `/success` | 2 | 2 | 0% |
| `/privacy` | 9 | 10 | 100% |
| `/terms` | 6 | 6 | 0% |

`/anatomy/` is **not** in the top paths. Training SPA does not init PostHog; this snapshot is hub LP only.

### Channels

| Channel | Visitors | Views |
|---------|----------|-------|
| Direct | 674 | 2 061 |
| Organic Search | 222 | 439 |
| Organic Social | 210 | 281 |
| Referral | 58 | 102 |
| Display | 3 | 6 |
| Email | 1 | 2 |
| AI | 1 | 1 |

### Devices

Desktop 835 visitors / 2 418 views; mobile 281 / 482; tablet 4 / 12.

### Retention (`$pageview`, weekly)

Mean W1 **4.6%** (pulled up by Apr 5–11 first-week **28.7%** / size 87 — instrumentation + likely operator traffic). After April, typical W1 **~2–4%**. Latest full week Aug 9–15: size 47, W1 2.1%. This is LP return, not course habit.

---

## Stripe

**4 paying customers** (operator; no emails or plan IDs recorded here). SOT = Stripe Dashboard, not PostHog `/success`.

---

## KPI minimum (A.6)

SOT: [ecosystem-governance.md](../../ecosystem-governance.md)

| KPI | Current value | Source | Status |
|-----|---------------|--------|--------|
| Hub traffic + locale split | `/` 887 · `/lt` 280 · `/en` 107 (180d) | PostHog Web paths | **Have** (path proxy, not `locale` event prop) |
| Stripe purchases | **4** | Stripe Dashboard | **Have** |
| Outbound CTR `ecosystem_card` (6 spokes) | Not exported | `ecosystem_outbound_click` + `placement` | Gap |
| `.cloud` / `.pro` `footer_network` / `navbar_mobile` | Not exported | same event | Gap |
| `ecosystem_site_map` → `.site` | Not exported | same event | Gap |
| Assisted conversion spoke → `.app` checkout | Not matched | PostHog + Stripe | Gap |
| `ecosystem_cta_pricing_click` | Removed | Hub CTA is `#pricing` | N/A |

---

## Read

- `[A.3a]` hub is live; empty spoke CTR is a **query gap**, not a missing key.
- Conversion at this scale: ~1.1K hub visitors / 180d → **4** Stripe pays. Do not use `/success` (2) as purchase count.
- Paid ads stay **CONDITIONAL NO-GO** (legal, Stripe alert, Supabase F1, A.5 smoke). Soft-launch / organic **GO**.
- Next A.6 close needs one Activity/Insight export of `ecosystem_outbound_click` by `placement` (14d or 180d). Until then keep `[A.6]` open.

## Recommendation

Do not build training PostHog or paid dashboards this cycle. Focus: `[A.5]` v1.6.3 live smoke for the 4 paying customers.
