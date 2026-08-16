# Ecosystem KPI snapshot — 2026-08

**Scope:** First QW1b / entity-footer follow-up snapshot  
**Window:** Target window ~2026-07-29 → 2026-08-12 (14 days)  
**Date:** 2026-08-12  
**Operator:** Cursor / Tomas  
**Hub deploy SHA:** `8d4bbdc`  
**Status:** Partial — archived baseline with explicit data gaps. **Follow-up 2026-08-16:** [ecosystem-kpi-2026-08-16.md](ecosystem-kpi-2026-08-16.md) (PostHog web + Stripe 4; spoke CTR still Gap).

---

## Context

QW1b entity footer rollout status:

| Priority | Domains | Status |
|----------|---------|--------|
| P1 | `.site`, `.cloud`, `.pro` | Done |
| P2 | `.help`, `.ceo`, `.info` | Done |
| P3 | `.space`, `.blog`, `.lol` | Optional later |

Paid ads are not planned at this time. This snapshot measures whether the ecosystem is ready to produce a spoke → hub read once analytics access is available.

---

## KPI minimum

SOT: [ecosystem-governance.md](../../ecosystem-governance.md)

| KPI | Current value | Source | Status |
|-----|---------------|--------|--------|
| Outbound CTR to 6 spokes from `ecosystem_card` | Not available | PostHog event properties required | Gap |
| `.cloud` / `.pro` from `footer_network` and `navbar_mobile` | Not available | PostHog event properties required | Gap |
| `ecosystem_site_map` → `.site` | Not available | PostHog event properties required | Gap |
| `ecosystem_cta_pricing_click` | Not available | PostHog event properties required | Gap |
| Assisted conversion from `.cloud` / `.pro` → `.app` | Not available | Vercel Analytics / PostHog / Stripe required | Gap |
| LT/EN split | Not available | PostHog/Vercel locale data required | Gap |

---

## Web-index / entity proxy

This is not a replacement for event analytics, but it confirms the entity graph is visible publicly after the hub-and-spoke work.

| Query | Public result |
|-------|---------------|
| `Prompt Anatomy promptanatomy.app` | Hub `.app`, `.blog`, `.cloud`, `.pro`, GitHub sibling repo visible |
| `Prompt Anatomy ecosystem cloud info space help ceo pro` | Hub `.app`, `.cloud`, `.blog` visible; synthesis understands hub + specialized spokes |
| `Kas yra Promptų Anatomija promptanatomy.app` | LT hub `/lt`, `.app`, `.blog`, `.cloud` visible |
| `Tomas Staniulis Prompt Anatomy` | `.app`, Medium, LinkedIn, `.blog`, `.cloud` PDF visible |

---

## Read

- QW1b has shipped enough for the next measurement window: P1 + P2 are done.
- Event-level ROI cannot be calculated from this repo/session because authenticated PostHog, Vercel Analytics, and Stripe dashboards are not available to Cursor.
- The next meaningful A.6 pass should use real click / referral / checkout data, not web-search proxy signals.

## Data gaps to close

| Gap | Required source | Owner action |
|-----|-----------------|--------------|
| Event counts by placement (`ecosystem_card`, `footer_network`, `navbar_mobile`, `ecosystem_site_map`, `ecosystem_hub`) | PostHog Production | Confirm events and export last-14d counts |
| Referrals from siblings / UTMs | Vercel Analytics or PostHog | Export referrers / UTM rows for `.cloud`, `.pro`, `.site`, `.help`, `.ceo`, `.info` |
| Stripe conversions in same window | Stripe Dashboard | Count successful checkouts and match assisted source if available |

## Recommendation

Keep `[A.6]` open until one snapshot includes at least:

1. one analytics source (PostHog or Vercel),
2. Stripe purchase count for the same window,
3. spoke/entity-footer referral or UTM read.

This partial snapshot is useful as a baseline and gap list; it is not yet a full ROI read.
