# Design system QA (LP v1.0 / v1.1)

**Scope:** Phases 5–8 from [design_system_roadmap2.md](../design_system_roadmap2.md); v1.1 hygiene (tokens, legal headings, CI grep).  
**Automated gate (pre-merge):** `cd frontend && npm run build`; CI **Design-system token grep**; `cd backend && pytest`.

## Visual QA (manual)

| Viewport | Check |
|----------|--------|
| 375px | Hero CTA column; social-proof pill `max-w-full` + `break-words` (EN 600+ string wraps, no horizontal overflow); Pricing cards; FAQ summary `min-w-0 flex-1 break-words`; mobile drawer open/close; drawer locale LT\|EN `min-h-[44px]`; access feedback CTAs `min-h-[48px]`; Footer links |
| 768px | Navbar density; section headings readable |
| 1280px | Desktop nav: What Is, Ecosystem, Training (if access) + locale + CTA; Footer 4 equal columns (`lg:col-span-3`) + legal bar all `text-xs`; Ecosystem grid; FAQ contrast |

Run the same rows on **`/lt` and `/en`** (375 / 1280): wordmark, `nav.whatIs`, hero subtitle — LT eilutės ilgesnės; nelūžta už viewport.

## Footer

- [ ] Four equal columns at `lg` (`lg:col-span-3` each) — not 4-2-2-4
- [ ] Product first link is `footer.whatIs` (LT „Kas tai“, EN „What it is“) — does not wrap at ~1280
- [ ] `footer.tagline` does not repeat the brand name under the wordmark
- [ ] Legal bar (copyright, mailto, privacy/terms/cookies, creator, address) all `text-xs font-medium` — no `text-[11px]`, no `text-sm` on legal links
- [ ] Typeface remains OS sans — no webfont ([ADR-0001](../decisions/0001-lp-system-typeface.md))

## Hub / Ecosystem (Phase 8 + polish)

- [ ] Header tik `ecosystem.title` — be pastraipos, `ctaPricing`, `workflowHint`, hub pill, phase legend
- [ ] Anchor `#ekosistema` (Navbar/Footer): pirmos eilės kortelės ne nukirptos po sticky header (`scroll-margin-top`)
- [ ] All 6 cards: `card-density-dark-premium` (`min-h-[200px]`); `title` + `line-clamp-2` outcome + tag pills; **be** phase eyebrow; CTA `mt-auto pt-3` — be perteklinės tuštumos virš mygtuko (375px / 1280px)
- [ ] Enter: `border-2` featured frame + `startHere` badge + full-width `btn-primary` + `shadow-ecosystem-cta`
- [ ] Secondary: `card-phase-accent-*` top rim + `btn-ecosystem-secondary` + arrow; `aria-label` su opens-in-new-tab (be matomo teksto po CTA)
- [ ] Card rest: `shadow-ecosystem-card-rest`; hover: `-translate-y-1` + `shadow-ecosystem-card-hover`
- [ ] Enter icon: gold glow; kitos — `shadow-ecosystem-icon-depth` only
- [ ] Map link uses outline button + arrow (`ecosystem.mapLink`); be `trustLine`
- [ ] Default card state: neutralus border (`card-glass-ecosystem`); be geltono border default būsenoje

## FAQ (Phase 8)

- [ ] FAQ **eyebrow absent** — `faq.sectionLabel` is empty; only `h2` ([golden-legacy-standard.md](../golden-legacy-standard.md) §3)
- [ ] Closed accordion contrast (`faq-item`); open state accent left border
- [ ] Container max-width ~3xl

## Accessibility smoke

- [ ] Tab: skip link → main content
- [ ] FAQ `<details>` keyboard expand/collapse
- [ ] WhatIs stat numbers announced (not `aria-hidden`)
- [ ] Hero typing respects `prefers-reduced-motion`

## Mobile drawer (golden-legacy §3)

1. Scroll ~500px, open menu — navbar scrolled state preserved  
2. Close menu — scroll position restored  
3. Open at scrollY=0, close — page scrolls normally  
4. Overlay dark, white panel on right — visible at any scroll position  
5. Drawer locale LT|EN — `min-h-[44px] min-w-[44px]` (not `py-2` only) 

## Lighthouse (post-deploy)

Record on production (`https://www.promptanatomy.app/`):

| Date | URL | Accessibility | Notes |
|------|-----|---------------|-------|
| 2026-08-13 | / | **92** | Lighthouse CLI, a11y category only (PSI 429). Lab fails: `aria-hidden-focus`, `color-contrast`, `heading-order`. Record only at v1.1. **In-code 2026-08-13 follow-up (DS-1–5):** heading tags, gold-on-light text, drawer `inert`. **Do not invent a new score in this PR** — re-record post-deploy (DoD C). Perf baseline: [pagespeed-2026-08.md](../archive/snapshots/pagespeed-2026-08.md). |

CLI:

```powershell
npx --yes lighthouse https://www.promptanatomy.app/ --only-categories=accessibility --chrome-flags="--headless --no-sandbox" --output=json --output-path="$env:TEMP\pa-lh-a11y.json"
```

## Grep acceptance (LP JSX)

CI step **Design-system token grep** in [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) (after LP build). Uses `if grep; then fail` (not `! grep` + `set -e`). Local equivalent from `frontend/`:

```bash
grep -rE 'rgba\(' src/components src/pages --include='*.jsx'
grep -rE 'text-\[[0-9]+px\]' src/components src/pages --include='*.jsx'
grep -rE 'shadow-\[' src/components src/pages --include='*.jsx'
```

Expected: **no matches** (tokens only in `src/index.css`). Digit-only `text-[NNpx]` — does not flag `text-[length:var(--text-stat)]` in CSS.

Hero terminal chrome (`bg-amber-500/80`, `text-emerald-300`, etc.) stays Tailwind palette on purpose — not feedback tokens.
