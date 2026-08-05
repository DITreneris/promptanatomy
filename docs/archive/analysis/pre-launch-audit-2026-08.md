# Pre-launch audit — paid-traffic gate (2026-08)

**Date:** 2026-08-05  
**Scope:** Hub `www.promptanatomy.app` (LP + Vercel `api/*` + training submodule pin).  
**Related:** [production-readiness-analysis.md](production-readiness-analysis.md) (2026-03), [security-audit-deep.md](../../security-audit-deep.md), [TODO.md](../../../TODO.md) Horizon A, [deploy-and-webhook.md](../../deploy-and-webhook.md).

---

## 1. Verdict

| Lens | Verdict |
|------|---------|
| Soft-launch / organic / cohort | **GO** — live checkout, `user_access`, tier-9 grants, pin `fdc38de` (v1.5.0) |
| Commercial paid traffic / ads | **CONDITIONAL NO-GO** until Phase 2–3 operator items below are checked off |

Access/tier code contracts are not the blocker. Trust, env, observability, legal, and smoke are.

---

## 2. Evidence (code / docs, 2026-08-05)

| Area | Status | Evidence |
|------|--------|----------|
| Tier 9 magic link | OK | `api/generate-access-link.js` `ACCESS_TIER_VALUES = [3,6,9]`; `api/verify-access.js` `VALID_TIERS` |
| LP display cap | OK | `frontend/src/utils/accessDisplay.js` `moduleDisplayCap` → 9 |
| Phase-1 checkout max 6 | OK intentional | `api/create-checkout-session.js` `PHASE1_PLAN_IDS`; Pricing `PHASE1_MAX_MODULES = 6` |
| CORS whitelist | OK | `api/*.js` — no `*` |
| Rate limit F3 | OK | `api/lib/rate-limit.js` on access / generate-link / checkout |
| Stripe signature | OK | `api/stripe-webhook.js` `constructEvent`; missing secret → 503 |
| Webhook if Supabase missing | **Fixed in gate PR** | was 200 → **503** (Stripe retry) |
| Sitemap Kill | OK | `frontend/public/sitemap.xml` — 4 hub URLs, no spokes |
| robots AI bots | OK | `PerplexityBot`, `OAI-SearchBot` |
| GEO “6 modules” vs M1–9 | **Fixed in gate PR** | `geo-manifest.js` training blurb → M1–9 + Core checkout 1–6 |
| Cookies UI | OK | Footer → `/privacy#cookies` |
| Legal review | Open `[A.1]` | Pages exist; not lawyer-reviewed |
| Submodule pin | OK | `apps/prompt-anatomy` @ `fdc38de` / v1.5.0 |
| Cohort snapshot | Ops | Registry §3 (2026-07-30): tier 6 ≈ 88, tier 9 ≈ 9 |

**Follow-up warning (not this gate):** customer emails in committed [user-access-tier-registry.md](../../user-access-tier-registry.md) — PII hygiene if repo is widely shared. Do not strip in this gate (ops SOT).

---

## 3. Critical blockers → TODO tags

| Blocker | TODO | In-repo vs operator |
|---------|------|---------------------|
| Legal Privacy/Terms/refunds | `[A.1]` | Operator / lawyer; agent applies owner-supplied copy only |
| PostHog Production | `[A.3a]` | Operator — Vercel env + MON-4 runbook |
| Uptime alarm | `[A.3b]` | Operator — external monitor on `.app` |
| Stripe webhook failure alert | `[A.3c]` | Operator — Stripe Dashboard |
| Vercel env audit | `[A.3d]` | Operator — §2.2 deploy doc |
| Supabase F0 schema smoke | `[A.4a]` | Operator |
| Supabase F1 RLS hardening on prod | `[A.4b]` | Operator — migration `20260603120000_…` |
| E2E smoke tier 6/9 | `[A.5]` | Operator |

---

## 4. Operator checklists (Phase 2) — paid-traffic gate

Complete in order. Check boxes when done; leave open until verified (do not invent “done”).

### 4.1 Vercel Production env — `[A.3d]`

Source: [deploy-and-webhook.md](../../deploy-and-webhook.md) §2.2.

- [ ] `VITE_MVP_MODE` **absent**
- [ ] `VITE_MAX_ACCESSIBLE_MODULE` **absent**
- [ ] `TRAINING_REDIRECT_BASE` = `https://www.promptanatomy.app/anatomy` (no trailing `/`)
- [ ] `ACCESS_TOKEN_SECRET` ≥32 chars and **identical** to training app secret
- [ ] `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `FRONTEND_ORIGIN` set (Production)
- [ ] Dashboard Build Command / Install Command override **empty** (repo `vercel.json`)
- [ ] Include Git Submodules **on**; latest Production build log shows submodule `fdc38de`
- [ ] `ALLOW_WEBHOOK_WITHOUT_SECRET` **not** set in Production

### 4.2 Stripe webhook alerts — `[A.3c]`

- [ ] Stripe Dashboard → Webhooks → endpoint for `https://www.promptanatomy.app/api/stripe-webhook` → delivery failure notification **or** documented weekly check routine
- [ ] Send test event `checkout.session.completed` with valid `metadata.plan` (`3` or `6`) + email → row in Supabase `user_access`
- [ ] Vercel Function logs: upsert success; if Supabase env missing → **503** (not silent 200)

### 4.3 Supabase F0 + F1 — `[A.4a]` / `[A.4b]`

Source: [supabase-hardening-plan.md](../../supabase-hardening-plan.md), [supabase-migrations.md](../../supabase-migrations.md).

- [ ] **F0:** Prod schema smoke — email normalize path OK; CHECK allows `highest_plan` in `(0,3,6,9,12,15)`
- [ ] **F1:** Confirm whether [20260603120000_user_access_hardening.sql](../../../supabase/migrations/20260603120000_user_access_hardening.sql) (RLS + REVOKE + `updated_at`) is applied on prod
- [ ] If not applied: apply via Supabase SQL editor / CLI (**not** Vercel deploy)
- [ ] Update [supabase-project-registry.md](../../supabase-project-registry.md) operator checklist when confirmed

### 4.4 Legal — `[A.1]`

- [ ] Lawyer or owner review of Privacy + Terms + refund copy (`en.json` / `lt.json` `legal.*` + FAQ refund)
- [ ] Agent implements only owner-supplied text edits (no invented legal claims)
- [ ] Cookies UI already done — no action unless copy changes

**Waiver:** if paid spend starts before lawyer sign-off, write a one-line waiver here with date/owner; verdict stays CONDITIONAL until cleared.

- Waiver: _n/a_

### 4.5 Observability — `[A.3a]` / `[A.3b]`

- [ ] `VITE_POSTHOG_KEY` + `VITE_POSTHOG_HOST` on Vercel Production (MON-4: `apps/prompt-anatomy/docs/deployment/MON-4_POSTHOG_DEPLOY.md`)
- [ ] External uptime check on `https://www.promptanatomy.app` (+ optional critical API)

Default for GO: both required (not waived).

---

## 5. E2E smoke — `[A.5]` (Phase 3)

Use real access emails; do not commit new PII beyond registry.

| # | Check | Result (pass/fail/date) |
|---|--------|-------------------------|
| 1 | LP `/`, `/lt`, `/en` load; pricing visible | |
| 2 | Check access known tier-0 → no-access message | |
| 3 | Magic link **tier 6** → `/anatomy/` modules 1–6 | |
| 4 | Magic link **tier 9** → 9/9 + M7–9 reachable | |
| 5 | Spot-check M4 prompt-mode lab; M5 Apply+Gate; one M8/M9 shell | |
| 6 | Static `sitemap.xml` (4 URLs), `robots.txt`, `llms.txt` → 200 | **pass** 2026-08-05 (agent curl; see §7.1) |

Static GEO smoke (agent, 2026-08-05): see §7 if filled after curl.

---

## 6. Paid-traffic GO criteria

All must be true:

1. [ ] Vercel env audit clean (`[A.3d]`)
2. [ ] Stripe failure alert + successful test upsert (`[A.3c]`)
3. [ ] Supabase F1 status known — applied **or** deferred with risk note (`[A.4a]`/`[A.4b]`)
4. [ ] Legal reviewed **or** written waiver (`[A.1]`)
5. [ ] Smoke A.5 green
6. [ ] Gate PR (GEO + webhook 503 + this audit) merged + CI Golden Legacy green *(local: frontend build OK, pytest 27, GEO markers OK — merge still required)*

Until then: soft-launch **GO**; paid traffic **CONDITIONAL NO-GO**.

---

## 7. Smoke results log

| Date | Who | Notes |
|------|-----|-------|
| 2026-08-05 | agent | In-repo gate shipped (GEO M1–9 + webhook 503). Operator §4 + magic-link §5 rows still open. Static prod curl §7.1. |

### 7.1 Static production URLs (2026-08-05 agent curl)

| URL | Expected | Observed |
|-----|----------|----------|
| `https://www.promptanatomy.app/sitemap.xml` | 200, 4 `<loc>` | **200** — `/`, `/lt`, `/privacy`, `/terms` |
| `https://www.promptanatomy.app/robots.txt` | 200, PerplexityBot + OAI-SearchBot | **200** — both present |
| `https://www.promptanatomy.app/llms.txt` | 200, H1 / `>` / Home EN | **200** (prod still prior deploy copy until merge) |
| `https://www.promptanatomy.app/` | 200 | **200** |
| `https://www.promptanatomy.app/lt` | 200 | **200** |
| `https://www.promptanatomy.app/en` | 200 | **200** |

§5 rows 2–5 (access / magic link / M4–M9) require operator with real emails after deploy.

---

## 8. QA (DoD B) — in-repo gate, 2026-08-05

| Check | Result |
|-------|--------|
| Critical (secrets / CORS `*` / tier break) | **0** — no secrets; CORS unchanged; `VALID_TIERS` / `ACCESS_TIER_VALUES` still `[3,6,9]` |
| Webhook 503 when Supabase missing | Intentional; bad session still 200; pytest 3 new + suite **27 passed** |
| GEO Kill | Sitemap **4** URLs; FAQ **9** EN; no SSR; `LAST_UPDATED` 2026-08-05; `llms.txt` regenerated |
| Bundle budget | **PASS** (81.9 KB / 180 KB) |
| Frontend `npm run build` | **OK** |
| TODO A.1 / A.3 / A.4 / A.5 checkboxes | **Left open** until operator completes §4–5 (do not flip without evidence) |
| Merge-ready (code/docs) | **Yes** — paid-traffic **GO** still blocked on operator §6 |

---

## 9. Out of scope (this gate)

Horizon B (GEO citations, Sentry), C (C2 upgrade playbook), D (CLI migrations, Auth). No SSR; no Stripe→tier 9 SKU; no spokes in hub sitemap.
