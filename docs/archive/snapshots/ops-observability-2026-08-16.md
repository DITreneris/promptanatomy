# Operator close — A.3a hub PostHog + A.3d Vercel env (2026-08-16)

**Date:** 2026-08-16  
**Operator:** Tomas (Dashboard) + Cursor (doc sync)  
**Scope:** Hub `www.promptanatomy.app` Production env + PostHog EU project `155249`  
**Does not close:** `[A.5]` live smoke after v1.6.3 pin; `[A.3b]` uptime; `[A.3c]` Stripe webhook alert; `[A.4a]`/`[A.4b]` Supabase; `[A.1]` legal; training `/anatomy/` PostHog init / MON-4 widgets

---

## `[A.3d]` Vercel Production env

Source checklist: [deploy-and-webhook.md](../../deploy-and-webhook.md) §2.2. Dashboard: project **promptanatomy** → Settings → Environment Variables.

| Check | Result 2026-08-16 |
|-------|-------------------|
| `VITE_MVP_MODE` | **Absent** |
| `VITE_MAX_ACCESSIBLE_MODULE` | **Absent** |
| `ALLOW_WEBHOOK_WITHOUT_SECRET` | **Absent** |
| `TRAINING_REDIRECT_BASE` | Present (Production + Preview); operator: value in place (`…/anatomy`, no trailing `/`) |
| `ACCESS_TOKEN_SECRET` | Present (All Environments); operator: ≥32 chars |
| `FRONTEND_ORIGIN` | Present |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_ID_PLAN_1` / `_2` | Present |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Present |
| `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST` | Present (All Environments, since 2026-04-08) |
| `VITE_VERIFY_ACCESS_URL` | **Absent** — training same-origin `/api/verify-access` fallback on `.app` (MON-1 not a blocker) |

**Hygiene (not reopening A.3d):** several secrets tagged Needs Attention because they are shared **All Environments** (Preview sees live keys). `VITE_FB_PIXEL_ID` present but unused in current hub code (`VITE_X_PIXEL_ID` is the live pixel var). `VITE_API_URL` present — operator confirmed not localhost.

**Status:** `[A.3d]` **closed** (operator).

---

## `[A.3a]` PostHog (hub)

Acceptance: Production `VITE_POSTHOG_*` + snippet on hub **or** training + ≥1 real event.

| Check | Result 2026-08-16 |
|-------|-------------------|
| Vercel `VITE_POSTHOG_KEY` + `VITE_POSTHOG_HOST` | Set (All Environments) |
| Region | **EU** — [eu.posthog.com/project/155249](https://eu.posthog.com/project/155249) |
| Hub snippet | Shipped (`frontend/src/analytics/posthog.js`, idle init) |
| Live events | `$pageview` history from ~2026-04-08 (Web analytics last 180d: **1.12K** visitors, **2.89K** pageviews, **2.04K** sessions) |

Training `/anatomy/` does **not** init `window.posthog`; module funnel (`slide_view`, `pricing_click`) and MON-4 four widgets stay optional later. Custom hub events (`checkout_*`, `ecosystem_outbound_click`) are instrumented but were not exported this session.

**Status:** `[A.3a]` **closed for hub**. Training snippet ≠ A.3a blocker (`arba` in TODO).

---

## Stripe (operator, no PII)

**4 paying customers** (Stripe Dashboard SOT). PostHog `/success` path (2 visitors / 180d) undercounts because checkout often leaves the success page for `/anatomy/`.

---

## Next focus

1. `[A.5]` live smoke after pin `7e4c3bf` / v1.6.3 (Home recall, magic-link 0/6/9/12, M11 + cert).  
2. `[A.3c]` Stripe webhook failure alert; `[A.1]` legal; `[A.4a]`/`[A.4b]` if prod hardening unknown.  
3. `[A.6]` spoke CTR still open — see [ecosystem-kpi-2026-08-16.md](ecosystem-kpi-2026-08-16.md).
