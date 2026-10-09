# Memo: bind the magic link to email

**Date:** 2026-09-23
**To:** Prompt Anatomy training app (`inzinerija`, route `/anatomy/`)
**From:** Hub (`promptanatomy.app`)
**Status (2026-10-09):** Superseded as the live pin. Training tag **v1.6.6** (`d1d0830`) includes the forwarder (`32eef44`, `b23f26c` on `inzinerija` main). Hub build stays `build:corporate12`.

**Status (2026-09-23):** Training forwarder is commit `7a66b71` on `inzinerija` branch `magic-link-email-forwarder` (cherry-pick of `32eef44` and `b23f26c` onto tag v1.6.4 / `b6c1a9a`; tag not moved; M13-ROI content not included). Hub pin of that SHA is `pin/magic-link-email-forwarder`. Hub signer is a later commit and must not ship in the same production deploy as that pin. Until the pin is live, hub code that signs `email:access_tier:expires` stays off `main`.
**Secret:** `ACCESS_TOKEN_SECRET` stays the same. Do not rotate it for this change.

## Why

The signed payload was `access_tier:expires`. The hub signs `email:tier:expires` when the address is present, so a new link is tied to one address. The landing-page button stays: Check, then "Go to training". The hub does not email the link.

`expires` is the link lifetime (default 30 days). It is not the end of paid access in the database. After a link expires, the learner gets a new one from the landing page with the same email.

## Live URL until the signer deploy

```
https://www.promptanatomy.app/anatomy/?access_tier=6&expires=1735689600&token=...
```

Accepted tiers: `3`, `6`, `9`, `12`. HMAC-SHA256, base64url. Verification stays on the hub.

## Target URL (signer deploy, after the forwarder pin is live)

```
https://www.promptanatomy.app/anatomy/?email=learner@example.com&access_tier=6&expires=1735689600&token=...
```

New payload, email already `trim` + lowercase:

```
learner@example.com:6:1735689600
```

Old links have no `email` query param. Their payload stays `6:1735689600`.

## Training repo

Shipped on `7a66b71` (not `inzinerija` `main`):

- [x] Read optional `email` from the magic-link query.
- [x] If `email` is present, normalize with trim + lowercase and send it on `GET /api/verify-access` as `email`.
- [x] If `email` is absent, call `verify-access` exactly as today (`access_tier`, `expires`, `token` only).
- [x] Do not reject a link that has no `email`.
- [x] Keep unlocking modules from `access_tier` (`3` / `6` / `9` / `12`).
- [ ] This pin is on a hub branch. It is live on `/anatomy/` only after that branch is on `main` and Vercel Production builds it (`INZINERIJA_READ_TOKEN` is required; Preview builds of this branch failed without that token).

## Hub — after that pin is live

Implemented in the follow-up commit. Do not merge it in the same deploy as the pin.

- [x] `generate-access-link` and `success-redirect`: add `email` to the training URL and sign `email:access_tier:expires`.
- [x] `verify-access`: if `email` is present, verify the new payload; if absent or blank, verify the old payload.
- [x] Leave Check, the training button, and Stripe checkout behavior as they are.
- [x] Do not email magic links from the hub.
- [ ] Drop the old payload only in a later change, after old links have expired (~30 days).

## Order

1. Training pin deploys. Current links behave as they do now. An old token plus an extra `email` query still verifies.
2. Hub deploys the new signature and dual verify.
3. New "Go to training" and post-checkout links include `email`. Old bookmarks still verify until `expires`.

Do not reverse 1 and 2.
