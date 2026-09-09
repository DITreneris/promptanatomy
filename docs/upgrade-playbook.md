# Upgrade playbook — C2 / operator / corporate (Horizon C)

**Status:** SOT for M7–12 access via operator grant (`highest_plan=9` or `12`).  
**Horizon:** `[C.1]`–`[C.5]` — [roadmap.md](../roadmap.md) Horizon C; [TODO.md](../TODO.md).  
**Not this path:** public Stripe „Pro“ / plan 12–15 checkout (Phase-1 max remains **6**).

Related: [user-access-tier-registry.md](user-access-tier-registry.md), [access-architecture-canon.md](access-architecture-canon.md), [phase-1-scope.md](phase-1-scope.md), [bulk-import-user-access.md](bulk-import-user-access.md), [payment-best-practices.md](payment-best-practices.md).

---

## 1. When to grant

| Path | Typical trigger | Target tier |
|------|-----------------|-------------|
| **Cohort** | Academy wave / cohort completion | Usually **6** via bulk import; **9/12** only with explicit whitelist |
| **B2B / team** | 399 € team training or enterprise deal | **9** or **12** per contract |
| **Individual** | VIP / loyalty / support exception | **9** or **12** per operator OK |

**Never:** blind `UPDATE user_access SET highest_plan = 9 WHERE highest_plan = 6` (or 9→12) without an email whitelist.

---

## 2. Who grants

| Role | May do |
|------|--------|
| **Operator (Tomas)** | Approve whitelist; run SQL / import; update registry §3 + CHANGELOG |
| **Agent** | Draft SQL, docs, dry-run notes — **not** apply bulk 9/12 without whitelist |

---

## 3. Tier choice

| `highest_plan` | Modules | Notes |
|----------------|---------|--------|
| **9** | M1–9 | Operator only; not a Stripe Phase-1 result |
| **12** | M1–12 | Operator / corporate12 / Agent path; prod `build:corporate12` |
| **15** | — | **Out of scope** this horizon (corporate15 later) |

Stripe plan 2 (99 €) webhook always writes **`highest_plan=6`**. Tier 9/12 is never automatic from Checkout.

---

## 4. SLA

| Step | Target |
|------|--------|
| B2B / teams request (`info@promptanatomy.app` or LP Teams CTA) | Reply within **1 business day** (same as LP `pricing.forTeamsBody`) |
| After SQL grant applied | Same day: tell user to use LP **Check access** + **new** „Go to training“ / „Eiti į mokymus“ |

Refund reply window (14 calendar days) is **not** this SLA.

---

## 5. Execute (single email)

Prefer **Supabase SQL Editor** with `greatest()` (does not lower an existing higher tier):

```sql
-- Tier 9
insert into user_access (email, highest_plan)
values (lower('user@example.com'), 9)
on conflict (email) do update set
  highest_plan = greatest(user_access.highest_plan, excluded.highest_plan),
  updated_at = now();

-- Tier 12
insert into user_access (email, highest_plan)
values (lower('user@example.com'), 12)
on conflict (email) do update set
  highest_plan = greatest(user_access.highest_plan, excluded.highest_plan),
  updated_at = now();
```

**Python** `upsert_user_access` **overwrites** `highest_plan` (no `greatest`). Read current first; write only if expected. Prefer SQL for operator grants.

Canonical copy also in [user-access-tier-registry.md](user-access-tier-registry.md) §4.

### Cohort Core (max 6) via Excel

Use [bulk-import-user-access.md](bulk-import-user-access.md) / `scripts/import_user_access.py` with `--plan 3` or `--plan 6` only. For 9/12: whitelist + SQL above — **not** default academy Excel → 12.

---

## 6. Smoke after grant

1. LP „Check access“ → **9/9** or **12/12** (`accessDisplay` / `moduleDisplayCap`).
2. Click **new** „Go to training“ — generates magic link with `access_tier=9` or `12`.
3. Open `/anatomy/` — modules unlocked for that tier.

**Gotcha:** Old `localStorage.verified_access_tier` and unexpired HMAC with lower `access_tier` stay on the old tier until a **new** link. DB grant alone does not rewrite the training SPA session.

---

## 7. Channels (C.4)

```text
.pro (Decide) ──utm_source=pro──► sales / info@ ──► whitelist ──► grant ──► new magic link
LP #pricing Teams mailto ──► pricing_for_teams_click (PostHog) ──► info@ ──► same
Cohort Excel ──► import --plan 3|6 ──► optional later 9/12 whitelist SQL
```

- Hub → `.pro`: `utm_source=app` + placement medium ([ecosystem-governance.md](ecosystem-governance.md)).
- Inbound from `.pro`: expect `utm_source=pro` on spoke → hub links ([sibling_memo.md](sibling_memo.md)).
- Assisted conversion: request email → later grant (track volume in monthly snapshot; do not invent PostHog→Stripe joins).

Hub LP event: `pricing_for_teams_click` (`placement=pricing`) on Teams mailto CTA — no PII in properties.

---

## 8. After each wave (C.2 checklist)

Use template: [templates/tier-grant-wave.md](templates/tier-grant-wave.md). Optional archive fill: `docs/archive/snapshots/tier-grants-YYYY-MM.md`.

1. Whitelist emails from operator — **never commit** `.xlsx` with PII.
2. Dry-run / SQL preview (`select` current rows for those emails).
3. Apply (`greatest` SQL or import `--plan 3|6` for Core cohort only).
4. Update [user-access-tier-registry.md](user-access-tier-registry.md) §3 tables + snapshot counts.
5. [CHANGELOG.md](../CHANGELOG.md) `[Unreleased]` → Operacijos.
6. Smoke 1–2 emails from the new tier (§6).
7. Month-end: `select highest_plan, count(*) from user_access group by highest_plan order by 1;` → snapshot for **D.5** gate.

---

## 9. C1 gate (C.5) — default WON’T

**Stripe Price → automatic `highest_plan` 9/12** stays **WON’T** until Horizon **D.5** (2027-01-01 written yes/no).

Revisit only if **all** of these are true:

- Support load: frequent manual grants that feel like product demand for a paid SKU
- Grant volume ≥ **N**/month (N set by operator after first C.2 monthly snapshot)
- Evidence from A.6 KPI + B.1 GEO does not contradict expanding public pricing

Until then: **no** new Stripe Price, **no** LP „Pro“ card, **no** ADR for C1. Decision gate doc = this section + [roadmap.md](../roadmap.md) D.5.

---

## 10. Kill list

- Public Stripe plan 12/15 as default LP checkout
- Bulk 6→9 or 9→12 without whitelist
- Python upsert without reading current tier
- Telling users an old magic link unlocks a newly granted higher tier
- Committing registration Excel / PII
- Treating Phase-1 scope (max 6) as training module ceiling

---

*Horizon C SOT. Registry remains the live grant list; this file is the process.*
