# Pre-launch audit — corporate12 paid-traffic gate (2026-08-12)

**Superseded evidence (2026-08-13):** istorinis gate. Pin `91656fa` / v1.6.1 ir Hero CTA `.cloud` pakeisti Unreleased: pin **`c35a1f5` / v1.6.2**, Hero primary **`#pricing`**. Verdiktų ir operatoriaus checkboxų neperrašyti.

**Operator close (2026-08-16):** `[A.3d]` Vercel env + `[A.3a]` hub PostHog — [ops-observability-2026-08-16.md](../snapshots/ops-observability-2026-08-16.md). Pin dabar **`7e4c3bf` / v1.6.3**. Paid vis dar CONDITIONAL (A.1, A.3b/c, A.4, A.5).

**Date:** 2026-08-12  
**Scope:** Hub `www.promptanatomy.app` (LP + Vercel `api/*` + training submodule corporate12 pin).  
**Current canon:** public Stripe checkout remains Starter/Core max 6; production training is M1–12 via `build:corporate12` with operator/corporate grants tier 9/12.  
**Related:** [pre-launch-audit-2026-08.md](pre-launch-audit-2026-08.md), [golden-legacy-standard.md](../../golden-legacy-standard.md), [phase-1-scope.md](../../phase-1-scope.md), [deploy-and-webhook.md](../../deploy-and-webhook.md).

---

## 1. Verdict

| Lens | Verdict |
|------|---------|
| Soft-launch / organic / cohort | **GO** — prod live, local Golden Legacy checks green, corporate12 pin `91656fa` |
| Commercial paid traffic / ads | **CONDITIONAL NO-GO** until operator evidence in §4–5 is checked off |
| Enterprise B2B procurement | **NOT READY** — Horizon C/D; outside this gate |

The in-repo corporate12 GEO drift is fixed in this gate. Paid traffic remains blocked by operator-owned legal, observability, Vercel, Stripe, Supabase, and real-email smoke evidence.

---

## 2. Evidence (code / docs, 2026-08-12)

| Area | Status | Evidence |
|------|--------|----------|
| Corporate12 submodule pin | OK | `apps/prompt-anatomy` @ `91656fa` / upstream `v1.6.1` |
| Training build profile | OK | `build:corporate12`, `VITE_MAX_BUILD_MODULE=12`, `/anatomy/` |
| Magic-link tiers | OK | `api/generate-access-link.js` / `api/verify-access.js` accept `[3, 6, 9, 12]` |
| LP display cap | OK | `frontend/src/utils/accessDisplay.js` displays 3/6/9/12 |
| Phase-1 checkout max 6 | OK intentional | `api/create-checkout-session.js` accepts only plan IDs `1`, `2`; pricing max 6 |
| GEO M1–12 copy | OK in this gate | `frontend/src/site/geo-manifest.js` `TRAINING_SUMMARY` says M1–12 + tier 9/12 grants |
| Sitemap Kill | OK | `frontend/public/sitemap.xml` has 4 hub URLs only |
| Hero CTA QW3a | OK in this gate | Primary `.cloud` workflow; secondary pricing scroll; Navbar Variant B unchanged |
| Named testimonials QW5 | **Blocked** | No owner-supplied named testimonials / before-after proof in repo; do not invent |

---

## 3. Local QA results

| Check | Result |
|-------|--------|
| `cd frontend && npm run build` | **PASS** |
| `node scripts/check-bundle-size.mjs` | **PASS** — 81.9 KB gzip / 180 KB budget |
| `cd apps/prompt-anatomy && npm run build:corporate12` | **PASS** |
| `cd backend && python -m pytest -q` | **PASS** — 27 passed |
| QA review | **PASS with conditions** — exclude raw research reports from canonical merge; operator checks still open |

Known warnings are non-blocking for this gate: training build reports missing optional `%VITE_OG_*%` replacements, stale Browserslist data, and large training chunks.

---

## 4. Operator checklist — paid-traffic blockers

Complete in order. Leave boxes open until verified with real dashboard / database / legal evidence.

### 4.1 Vercel Production env — `[A.3d]`

Source: [deploy-and-webhook.md](../../deploy-and-webhook.md) §2.2.

- [ ] `VITE_MVP_MODE` absent
- [ ] `VITE_MAX_ACCESSIBLE_MODULE` absent
- [ ] `TRAINING_REDIRECT_BASE` = `https://www.promptanatomy.app/anatomy` (no trailing `/`)
- [ ] `ACCESS_TOKEN_SECRET` ≥32 chars and identical to training app secret
- [ ] `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `FRONTEND_ORIGIN` set in Production
- [ ] Dashboard Build Command / Install Command override empty (repo `vercel.json`)
- [ ] Include Git Submodules on; latest Production build log shows submodule `91656fa` and `build:corporate12`
- [ ] `ALLOW_WEBHOOK_WITHOUT_SECRET` not set in Production

### 4.2 Stripe webhook alert + test — `[A.3c]`

- [ ] Stripe Dashboard webhook endpoint for `https://www.promptanatomy.app/api/stripe-webhook` has delivery failure notification or documented weekly check routine
- [ ] Test `checkout.session.completed` with valid `metadata.plan` (`3` or `6`) + email creates / updates Supabase `user_access`
- [ ] Vercel Function logs show upsert success; missing Supabase env returns **503**

### 4.3 Supabase F0 + F1 — `[A.4a]` / `[A.4b]`

- [ ] Prod schema smoke: email normalize path OK; CHECK allows `highest_plan` in `(0,3,6,9,12,15)`
- [ ] Confirm whether `20260603120000_user_access_hardening.sql` (RLS + REVOKE + `updated_at`) is applied on prod
- [ ] If not applied: apply via Supabase SQL editor / CLI, not Vercel deploy
- [ ] Update [supabase-project-registry.md](../../supabase-project-registry.md) operator checklist when confirmed

### 4.4 Legal — `[A.1]`

- [ ] Lawyer or owner review of Privacy + Terms + refund copy (`en.json` / `lt.json` `legal.*` + FAQ refund)
- [ ] If paid spend starts before lawyer sign-off, write date/owner waiver here

Waiver: _n/a_

### 4.5 Observability — `[A.3a]` / `[A.3b]`

- [ ] `VITE_POSTHOG_KEY` + `VITE_POSTHOG_HOST` on Vercel Production
- [ ] External uptime check on `https://www.promptanatomy.app` (+ optional critical API)

---

## 5. E2E smoke — `[A.5]`

Use real access emails; do not commit new PII beyond registry.

| # | Check | Result |
|---|-------|--------|
| 1 | LP `/`, `/lt`, `/en` load; pricing visible | **pending operator** |
| 2 | Check access known tier-0 → no-access message | **pending operator** |
| 3 | Magic link **tier 6** → `/anatomy/` modules 1–6 | **pending operator** |
| 4 | Magic link **tier 9** → 9/9 + M7–9 reachable | **pending operator** |
| 5 | Magic link **tier 12** → 12/12 + M10–12 reachable | **pending operator** |
| 6 | Spot-check M4 prompt-mode lab; M5 Apply+Gate; one M8/M9 shell; one M10–12 flow | **pending operator** |
| 7 | Static `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt` → 200 | **pending post-deploy** |

---

## 6. Paid-traffic GO criteria

All must be true:

1. [x] Vercel env audit clean (`[A.3d]`) — 2026-08-16
2. [ ] Stripe failure alert + successful test upsert (`[A.3c]`)
3. [ ] Supabase F1 status known — applied or deferred with written risk note (`[A.4a]` / `[A.4b]`)
4. [ ] Legal reviewed or written waiver (`[A.1]`)
5. [ ] Smoke A.5 green, including tier 12
6. [ ] This gate merged, deployed, and CI Golden Legacy green

Until then: soft-launch **GO**; paid traffic **CONDITIONAL NO-GO**.

---

## 7. Smoke results log

| Date | Who | Notes |
|------|-----|-------|
| 2026-08-12 | agent | In-repo corporate12 GEO drift fixed; QW3a Hero CTA shipped; local QA green. Operator §4–5 still open. |
| 2026-08-16 | operator + Cursor | `[A.3d]` + `[A.3a]` hub closed — [ops-observability-2026-08-16.md](../snapshots/ops-observability-2026-08-16.md). Stripe paying **4**. `[A.5]` / A.3b/c / A.1 / A.4 still open. |

---

## 8. Out of scope

No Next.js / SSR, no domain 301 consolidation, no new Stripe SKU for tier 9/12, no spoke URLs in hub sitemap, no invented testimonials.
