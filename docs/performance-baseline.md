# LP load-speed performance

Baseline, bundle budget, and phased optimization plan for the Prompt Anatomy home landing (`frontend/`).

**Scope:** LP only (`/`, `/lt`, `/en`, secondary routes). Training app `/anatomy/` is out of scope.

---

## Phase 0 baseline

**Measured:** 2026-06-04  
**Environment:** Local production build (`cd frontend && npm run build`) on Windows dev machine.  
**Lighthouse (live production):** Not run in CI — run manually on `https://www.promptanatomy.app/` after deploy and append scores below.

### Pre-optimization architecture (audit, 2026-06-04)

| Item | State |
|------|--------|
| PostHog | Sync import + `initPosthog()` before `createRoot` |
| X Pixel | `useEffect` on mount (immediate after first paint) |
| Routes | All pages statically imported in `App.jsx` |
| Home sections | All eager in `HomePage.jsx` |
| i18n | Both `lt.json` + `en.json` in main bundle |
| Vite chunks | Default (no `manualChunks`) |

Estimated pre-change critical JS: **~250–350 KB gzip** (monolithic graph including PostHog).

### Post Phase 1 build (2026-06-04)

Vite 8.0.0 output after deferral + code splitting + `manualChunks`:

| Chunk | Raw | Gzip | Home critical path |
|-------|-----|------|-------------------|
| `index-*.js` (entry) | 79.6 KB | 23.5 KB | Yes |
| `react-vendor-*.js` | 182.2 KB | 57.3 KB | Yes |
| `router-*.js` | 22.2 KB | 8.2 KB | Yes |
| `icons-*.js` (lucide) | 11.6 KB | 4.6 KB | Yes (Navbar, Hero, Pricing) |
| `rolldown-runtime-*.js` | 0.7 KB | 0.4 KB | Yes |
| `index-*.css` | 72.5 KB | 11.0 KB | Yes (CSS) |
| **Critical JS total** | — | **~91 KB** | Budget: **180 KB** |
| `analytics-*.js` (posthog-js) | 172.3 KB | 57.7 KB | **No** — dynamic import on idle |
| `Methodology-*.js` | 2.9 KB | 1.2 KB | Lazy |
| `Ecosystem-*.js` | 5.4 KB | 1.8 KB | Lazy |
| `Faq-*.js` | 1.8 KB | 0.9 KB | Lazy |
| Secondary routes | 2–3.5 KB each | ~0.8–1.3 KB | Lazy (`React.lazy`) |

**Budget check:** `node scripts/check-bundle-size.mjs` — **PASS** (critical JS **90.7 KB** gzip vs 180 KB limit).

**Analyzer:** `cd frontend && npm run analyze` → open `frontend/dist/stats.html`.

### Lighthouse placeholder (fill after deploy)

| URL | Device | Performance | LCP | FCP | TBT | CLS | INP |
|-----|--------|-------------|-----|-----|-----|-----|-----|
| `/` | Mobile | _pending_ | | | | | |
| `/lt` | Mobile | _pending_ | | | | | |

---

## Phase 1 (shipped in repo — 2026-06-04)

| PR | Change | Files |
|----|--------|-------|
| 1A | PostHog dynamic import + idle init; X Pixel idle defer | `main.jsx`, `analytics/posthog.js`, `XPixel.jsx`, `utils/idle.js` |
| 1B | Route `React.lazy` | `App.jsx` |
| 1C | Lazy `Methodology`, `Ecosystem`, `Faq` | `HomePage.jsx` |
| 1D | Defer `getAccess` on mount | `HomePage.jsx` |
| Build | `manualChunks`, visualizer, budget script | `vite.config.js`, `bundle-budget.json`, `scripts/check-bundle-size.mjs` |

### Acceptance (Phase 1)

- [x] PostHog not in critical path (`analytics-*.js` separate chunk, idle load)
- [x] X Pixel not on critical path (idle via `scheduleIdleTask`)
- [x] Critical JS gzip ≤ 180 KB (~94 KB measured)
- [x] `npm run build` passes
- [ ] Post-deploy: PostHog `$pageview` on route change
- [ ] Post-deploy: Lighthouse mobile on live `/`

### X Pixel note

`VITE_X_PIXEL_ID` is **not commercially active** (X ads not approved). Pixel loads on idle only; config preserved for future re-enable. **Marketing dependency:** confirm before treating X events as required for campaigns.

---

## Phase 2 (shipped — 2026-06-04)

| Task | Status |
|------|--------|
| Dynamic locale JSON (`lt` async, `en` via syncTranslate) | Done |
| CI bundle budget gate | Done (Phase 1) |
| Navbar prefetch on LT/EN hover/focus | Done |
| Entry chunk budget (`entryGzipKb: 18`) | Done |

**Post Phase 2 build:**

| Chunk | Gzip | Home critical path |
|-------|------|-------------------|
| `index-*.js` (entry) | **13.3 KB** | Yes (includes EN via syncTranslate) |
| `react-vendor-*.js` | 57.3 KB | Yes |
| `router-*.js` | 8.2 KB | Yes |
| `icons-*.js` | 4.6 KB | Yes |
| **Critical JS total** | **81.2 KB** | Budget: 180 KB |
| `locale-*.js` (lt.json) | 9.7 KB | Async — `/lt` only |
| `analytics-*.js` | 57.7 KB | Idle |

**Delta vs Phase 1:** entry −10.2 KB gzip; critical path −9.5 KB gzip.

### Acceptance (Phase 2)

- [x] `lt.json` in separate async chunk (not in entry with both locales)
- [x] `npm run build` + `check-bundle-size.mjs` PASS
- [ ] Post-deploy: `/lt` loads locale chunk; LT↔EN toggle; SeoHead hreflang unchanged

---

## Phase 2 (planned)

| Task | Priority | Notes |
|------|----------|-------|
| ~~Dynamic locale JSON~~ | ~~P1~~ | Shipped — see above |
| ~~CI bundle budget gate~~ | ~~P1~~ | Shipped Phase 1 |
| Defer Vercel Analytics if heavy | P2 | Measure in `stats.html` first |
| Cache-Control audit on Vercel | P2 | Only if headers missing |

**Staged target:** Keep critical JS ≤ 180 KB; entry ≤ 18 KB gzip — **met** (13.3 KB).

---

## Phase 3 (conditional on RUM)

- Hero INP pass if p75 > 200 ms
- PostHog / Vercel Speed Insights web vitals dashboard
- TrustedBy (when merged): lazy SVG, fixed dimensions, `loading="lazy"`

---

## Commands

```bash
cd frontend && npm run build
node scripts/check-bundle-size.mjs
cd frontend && npm run analyze   # opens dist/stats.html
```

---

## Do-not-break (perf PRs)

See [golden-legacy-standard.md](golden-legacy-standard.md) §3–4 plus:

- PostHog funnel events: `checkout_stripe_redirect`, `checkout_success_*`, `ecosystem_outbound_click`
- Anchor links: `#pricing`, `#ekosistema`, `#faq`
- FAQ JSON-LD injected when `Faq` mounts
- Navbar mobile drawer scroll lock unchanged
