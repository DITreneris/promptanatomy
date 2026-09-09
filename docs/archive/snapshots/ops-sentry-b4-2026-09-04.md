# Ops — B.4 Sentry (Vercel api/*) — 2026-09-04

**Goal:** Money/access API errors visible in Sentry without secrets in events.

**Status:** **`[B.4]` closed** 2026-09-04 — Production `SENTRY_DSN` + operator smoke confirmed (Tomas).

Related: [TODO.md](../../../TODO.md) `[B.4]`, [docs/security.md](../../security.md), [docs/deploy-and-webhook.md](../../deploy-and-webhook.md) §2.

---

## Code

| Item | Value |
|------|-------|
| Package | `@sentry/node` (root `package.json`) |
| Helper | [`api/lib/sentry.js`](../../../api/lib/sentry.js) — fail-open without `SENTRY_DSN`; scrub email/token/Stripe/Supabase; `flush(2000)` |
| Wired routes | `create-checkout-session`, `stripe-webhook`, `access`, `generate-access-link`, `success-redirect` |
| Not captured | Expected 4xx (bad email, invalid webhook signature, unpaid session, rate limit 429) |
| Env placeholder | [`backend/.env.example`](../../../backend/.env.example) `# SENTRY_DSN=` |

**B.5:** parked (LinkedIn Company paid page later) — not part of this close.

---

## Operator smoke (closed)

- [x] Create Sentry project (Node / AWS Lambda wizard → DSN only; no `@sentry/aws-serverless` NODE_OPTIONS)
- [x] Set Vercel **Production** `SENTRY_DSN`
- [x] Deploy Production with Sentry-wired code
- [x] Operator confirmed smoke OK (2026-09-04)
- [x] Tick `[B.4]` in TODO + CHANGELOG

**Note:** `GET /api/access?email=…` with `highest_plan: 0` is **200** and does **not** create a Sentry event; 5xx / DB failure paths do.

---

## Local check (dev)

```bash
node -e "require('./api/lib/sentry'); require('./api/access'); console.log('ok')"
```

Without `SENTRY_DSN`, capture is a no-op.
