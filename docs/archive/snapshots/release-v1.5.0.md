# Release v1.5.0 — 2026-08-12

**Tag:** `v1.5.0`  
**Branch:** `main`  
**Training submodule:** `91656fa` (upstream v1.6.1)

## Summary

Corporate12 cutover (Horizon B): production training ships M1–12 via `build:corporate12`; magic-link tiers `[3, 6, 9, 12]` with tier 12 → 12/12 LP display. Phase-1 Stripe checkout unchanged (Starter/Core, max module 6).

## Highlights

- Submodule pin `91656fa` / v1.6.1; CI and Vercel Node 24
- Hero CTA QW3a: primary `.cloud` free workflow, secondary `#pricing`
- GEO: M1–12 training summary, `LAST_UPDATED` 2026-08-12
- Pre-launch gate: [pre-launch-audit-2026-08-12.md](../analysis/pre-launch-audit-2026-08-12.md) (soft-launch GO; paid traffic conditional)
- Audit quick wins QW1–QW4 (Six-Block canon, refund trust, access return path, measurement snapshots)
- F3 Vercel rate limits; Stripe webhook 503 on missing Supabase env; SEO/GEO hardening

## Version bump

| File | Value |
|------|-------|
| `frontend/package.json` | `1.5.0` |
| `frontend/src/config.js` | `v1.5` |

## Post-release smoke (operator)

See [pre-launch-audit-2026-08-12.md](../analysis/pre-launch-audit-2026-08-12.md) §4–5: Vercel env, Stripe webhook, Supabase F1, tier 6/9/12 magic links.
