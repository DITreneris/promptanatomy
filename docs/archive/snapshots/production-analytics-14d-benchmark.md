# Production analytics benchmark — first 14 days (cleaned data)

**Scope:** Server-side analytics, production phase, post-deployment window (~14 days).  
**Purpose:** Baseline for traffic quality, geography, devices, and funnel signals before scaling acquisition.

---

## Executive summary

Traffic is **early-stage and discovery-led**: roughly **35–40%** of identifiable referrals are social, with **LinkedIn dominant**; **Google** remains a small share, so **low explicit search intent**. The **root path (`/`) absorbs ~75% of page views**, which concentrates **first-impression risk** on one surface. **Lithuania (59%)** and **USA (23%)** define a **mixed local + global** audience without deliberate US targeting.

**Commercially, the site is behaving as planned for marketing:** **4 business clients** engaged in period; **3 successful Stripe payments** are on record, with plan mix **one 3-module** and **two 6-module** (verified in Stripe — payment links / checkout history; do not paste live URLs into docs). So the LP **does convert** qualified demand even where **on-site signals stay thin** (e.g. `/success` only **2** sessions — analytics undercount post-click success).

**Engagement caveat:** **Bounce rate 71%** (↑ **+7 pts**) still means many sessions exit quickly; **improving stickiness** remains useful **alongside** revenue that already shows in Stripe.

---

## Commercial outcomes (Stripe + clients)

| Signal | Value | Note |
|--------|-------|------|
| Paying checkouts | **3** | Stripe-confirmed payments |
| Plan mix | **1× 3-module**, **2× 6-module** | As recorded against products / payment links in Stripe |
| Business clients | **4** | Broader B2B relationships (not all need to map 1:1 to the 3 payers in the same window) |
| Marketing read | **On track** | Acquisition + LP role: **discovery → conversation / checkout**, not deep multi-page browsing |

**Interpretation:** Low page depth and low `/success` hits are **poor proxies** for commercial health here; **Stripe is the source of truth** for purchases. Keep **web analytics** for **traffic quality and UX**; reconcile **conversion events** (or server webhooks) later if you want one dashboard.

---

## Core metrics

| Metric        | Value | Note                          |
|---------------|-------|-------------------------------|
| Visitors      | 458   | Unique users (cleaned)      |
| Page views    | 914   | ~2.0 views per visitor (avg.) |
| Bounce rate   | 71%   | ↑ +7% vs prior comparable window |

---

## Traffic sources (referrers / identifiable)

| Source            | Sessions (approx.) |
|-------------------|--------------------|
| LinkedIn          | 84                 |
| Google            | 25                 |
| Facebook (mobile) | 21                 |
| LinkedIn Android  | 16                 |
| Facebook          | 12                 |
| Others            | Low / long tail    |

**Interpretation:** ~**35–40%** of traffic with clear source attribution is **social**; **LinkedIn is the primary lever**. Organic/search and direct dark social remain important but **search is not yet a growth engine**.

---

## Top pages

| Path | Views | Share of views (approx.) |
|------|-------|---------------------------|
| `/`  | 343   | ~75%                      |
| `/lt`| 142   | ~16%                      |
| `/en`| 63    | ~7%                       |
| Other| —     | Negligible                |

**Interpretation:** Homepage behavior **dominates**; language routes split remainder. **Very shallow navigation** beyond these entry points.

---

## Geography

| Country     | Visitors | Share |
|-------------|----------|-------|
| Lithuania   | 270      | 59%   |
| USA         | 105      | 23%   |
| Ireland     | 19       | 4%    |
| Netherlands | 16       | 3%    |
| Other       | —        | Long tail |

**Interpretation:** Strong **LT home market** plus **meaningful US share** without US-specific campaigns — **organic global exposure** is already present.

---

## Devices

| Device  | Share | Count (approx.) |
|---------|-------|-----------------|
| Desktop | 58%   | 263             |
| Mobile  | 41%   | 186             |
| Tablet  | 2%    | 8               |

**Interpretation:** **B2B / work context** (desktop lead) with **near-parity mobile** — **LP and checkout paths must stay strong on small screens**.

---

## Operating systems

| OS      | Share |
|---------|-------|
| Windows | 44%   |
| Android | 22%   |
| iOS     | 20%   |
| macOS   | 11%   |
| Linux   | 2%    |

Aligned with desktop + mobile split; no single OS anomaly.

---

## Insights (synthesized)

1. **Discovery, not search** — Social-driven acquisition; Google modest → users are **finding** the site through networks, not high-intent queries.
2. **Single-point concentration** — **`/` ~75%** of views → **drop-off likely concentrated on the homepage**; structural **single-point failure** risk for first impression.
3. **Mixed audience** — LT majority + US minority → copy, pricing perception, and **EN/LT balance** matter for retention and trust.
4. **Balanced device mix** — Desktop-led but mobile substantial → **responsive UX and performance** are not optional.
5. **Engagement vs revenue** — **71% bounce** and **rising** still warrant **LP and mobile polish**; **revenue and clients** already validate **marketing effectiveness**, so optimize **both** depth and **checkout clarity**, not bounce alone.

---

## Tendencies and risks

| # | Tendency | Implication |
|---|----------|-------------|
| 1 | Bounce rate **trending up** as traffic arrives | Scaling current LP **without** engagement fixes **widens inefficiency**. |
| 2 | **International share** (esp. US) may grow | Opportunity + need for **EN clarity**, trust signals, and optional geo-aware messaging. |
| 3 | **Heavy LinkedIn dependency** | **Traffic volatility** with algorithm or posting cadence changes; diversify sources over time. |
| 4 | **Low depth** — few deeper page views | **Limited exploration**; internal links, secondary CTAs, and content paths underused. |
| 5 | **`/success` only 2 visits** vs **3 Stripe payments** | **Attribution gap**: treat as **measurement** priority (events, SPA, thank-you route, webhook → analytics), not as “no sales.” |

---

## Recommended next checks (operational)

- **Align analytics with Stripe** — optional server-side or GTM events from **checkout complete** / webhook so reports match **3 payments** and plan mix without relying on `/success` page views alone.
- **Segment bounce** by device, locale (`/lt` vs `/en` vs `/`), and referrer to see where +7% concentrates.
- **A/B or sequential tests** on hero clarity, primary CTA, and “next step” above the fold on `/`.
- **Gradual channel mix** (SEO content, newsletter, non-LinkedIn social) to reduce single-channel risk.

---

## Document control

| Field        | Value |
|--------------|-------|
| Data window  | ~14 days production |
| Data quality | Cleaned (deduplicated / filtered per your pipeline) |
| Last updated | 2025-03-27 |

---

## Ecosystem KPI extension (from 2026-04-29)

Track additional outbound slices for `promptanatomy.cloud` and `promptanatomy.pro`:

- Event: `ecosystem_outbound_click`
- Properties: `target`, `placement` (`routing_block`, `ecosystem_card`, `footer_network`, `navbar_mobile`), `locale`, `page_path`
- Weekly report cut:
  - CTR by placement and domain target
  - Assisted conversions to checkout/success after ecosystem click
  - LT/EN + GEO split by target domain
