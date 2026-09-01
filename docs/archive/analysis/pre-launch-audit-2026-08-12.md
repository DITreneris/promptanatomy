# Pre-launch audit — corporate12 paid-traffic gate (2026-08-12)

**Superseded evidence (2026-08-13):** istorinis gate. Pin `91656fa` / v1.6.1 ir Hero CTA `.cloud` pakeisti Unreleased: pin **`c35a1f5` / v1.6.2**, Hero primary **`#pricing`**. Verdiktų ir operatoriaus checkboxų neperrašyti.

**Operator close (2026-08-16):** `[A.3d]` Vercel env + `[A.3a]` hub PostHog — [ops-observability-2026-08-16.md](../snapshots/ops-observability-2026-08-16.md). Pin dabar **`7e4c3bf` / v1.6.3**.

**Operator close (2026-09-01):** `[A.5]` live smoke 6/9/12 + naujas magic link po 9→12; `[A.3c]` Stripe webhook alert + live upsert (4 paying); `[A.4a]`/`[A.4b]` prod F0 snapshot + F1 RLS enabled ([supabase-project-registry.md](../../supabase-project-registry.md) §4). **`[A.1]` owner review** — Privacy/Terms EN+LT; 14 d. = atsakymas; prieiga hub URL + info@; IVS pagal prašymą; Supabase įvardytas; slapukų bannerio nėra. A.3b uptime = SHOULD.

**Date:** 2026-08-12  
**Scope:** Hub `www.promptanatomy.app` (LP + Vercel `api/*` + training submodule corporate12 pin).  
**Current canon:** public Stripe checkout remains Starter/Core max 6; production training is M1–12 via `build:corporate12` with operator/corporate grants tier 9/12.  
**Related:** [pre-launch-audit-2026-08.md](pre-launch-audit-2026-08.md), [golden-legacy-standard.md](../../golden-legacy-standard.md), [phase-1-scope.md](../../phase-1-scope.md), [deploy-and-webhook.md](../../deploy-and-webhook.md).

---

## 1. Verdict

| Lens | Verdict |
|------|---------|
| Soft-launch / organic / cohort | **GO** — prod live, local Golden Legacy checks green, corporate12 pin `91656fa` |
| Commercial paid traffic / ads | **GO** (MUST A.1–A.5 / A.3c/d closed 2026-09-01). A.3b uptime = SHOULD. |
| Enterprise B2B procurement | **NOT READY** — Horizon C/D; outside this gate |

The in-repo corporate12 GEO drift is fixed in this gate. After 2026-09-01 operator close of A.1 / A.3c / A.4 / A.5, paid-traffic MUST items are green. A.3b uptime remains SHOULD.

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

- [x] Stripe Dashboard webhook endpoint for `https://www.promptanatomy.app/api/stripe-webhook` has delivery failure notification or documented weekly check routine — operator 2026-09-01
- [x] Live `checkout.session.completed` upsert — Stripe paying **4** (2026-08-16)
- [x] Missing Supabase env → **503** (code + A.3d env present)

### 4.3 Supabase F0 + F1 — `[A.4a]` / `[A.4b]`

- [x] Prod schema smoke: 2026-08-25 snapshot `3`→2, `6`→86, `9`→5, `12`→21; CHECK includes 9/12
- [x] `20260603120000_user_access_hardening.sql` on prod: RLS **enabled**; Security Advisor no critical — [supabase-project-registry.md](../../supabase-project-registry.md) §4
- [x] Not a deferral — applied
- [x] Registry §4 updated 2026-09-01

### 4.4 Legal — `[A.1]`

- [x] Owner review of Privacy + Terms + refund copy (`en.json` / `lt.json` `legal.*` + FAQ refund) — 2026-09-01 Tomas
- [x] No lawyer waiver needed — owner accepted lean copy; no cookie banner (disclose-only)

Waiver: _n/a_ (owner review, not a skip)

### 4.5 Observability — `[A.3a]` / `[A.3b]`

- [x] `VITE_POSTHOG_KEY` + `VITE_POSTHOG_HOST` on Vercel Production — `[A.3a]` 2026-08-16
- [ ] External uptime check on `https://www.promptanatomy.app` (+ optional critical API) — `[A.3b]` still open

---

## 5. E2E smoke — `[A.5]`

Use real access emails; do not commit new PII beyond registry.

| # | Check | Result |
|---|-------|--------|
| 1 | LP `/`, `/lt`, `/en` load; pricing visible | **PASS** 2026-09-01 live 200 |
| 2 | Check access known tier-0 → no-access message | **PASS** (operator) |
| 3 | Magic link **tier 6** → `/anatomy/` modules 1–6 | **PASS** (operator) |
| 4 | Magic link **tier 9** → 9/9 + M7–9 reachable | **PASS** (operator) |
| 5 | Magic link **tier 12** → 12/12 + M10–12 reachable | **PASS** (operator; naujas link po 9→12) |
| 6 | Spot-check M4 prompt-mode lab; M5 Apply+Gate; one M8/M9 shell; one M10–12 flow | **PASS** (operator 2026-09-01) |
| 7 | Static `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt` → 200 | **PASS** 2026-09-01 |

---

## 6. Paid-traffic GO criteria

All must be true:

1. [x] Vercel env audit clean (`[A.3d]`) — 2026-08-16
2. [x] Stripe failure alert + successful test upsert (`[A.3c]`) — 2026-09-01
3. [x] Supabase F1 status known — applied on prod (`[A.4a]` / `[A.4b]`) — 2026-09-01
4. [x] Legal reviewed or written waiver (`[A.1]`) — owner 2026-09-01
5. [x] Smoke A.5 green, including tier 12 — 2026-09-01
6. [x] This gate merged, deployed, and CI Golden Legacy green — PR #97 / origin/main `94692da`

MUST list green: soft-launch **GO**; paid traffic **GO** (A.3b uptime remains SHOULD).

---

## 7. Smoke results log

| Date | Who | Notes |
|------|-----|-------|
| 2026-08-12 | agent | In-repo corporate12 GEO drift fixed; QW3a Hero CTA shipped; local QA green. Operator §4–5 still open. |
| 2026-08-16 | operator + Cursor | `[A.3d]` + `[A.3a]` hub closed — [ops-observability-2026-08-16.md](../snapshots/ops-observability-2026-08-16.md). Stripe paying **4**. `[A.5]` / A.3b/c / A.1 / A.4 still open. |
| 2026-09-01 | operator + Cursor | `[A.5]` / `[A.3c]` / `[A.4a]`/`[A.4b]` closed (operator confirm). Paid blocker left: **A.1**. |
| 2026-09-01 | owner + Cursor | `[A.1]` owner review: GitHub išimtas; 14 d. = atsakymas; IVS pagal prašymą; Supabase; be cookie banner. Paid MUST **GO**. |

---

## 8. Out of scope

No Next.js / SSR, no domain 301 consolidation, no new Stripe SKU for tier 9/12, no spoke URLs in hub sitemap, no invented testimonials.
