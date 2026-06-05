# Design system QA (LP v1.0)

**Scope:** Phases 5–7 from [design_system_roadmap2.md](../design_system_roadmap2.md).  
**Automated gate (pre-merge):** `cd frontend && npm run build`; `cd backend && pytest`.

## Visual QA (manual)

| Viewport | Check |
|----------|--------|
| 375px | Hero CTA column; Pricing cards; mobile drawer open/close; Footer links |
| 768px | Navbar density; section headings readable |
| 1280px | Desktop nav: What Is, Ecosystem, Training (if access) + locale + CTA; Footer 4 columns + legal bar; Ecosystem grid; **Hub core pill po kortelių**; FAQ contrast |

## Hub / Ecosystem (Phase 8 + polish)

- [ ] `ecosystem.workflowHint` virš 6 kortelių grid
- [ ] Hub core pill po grid su `ecosystem.hubCoreLabel` + phase legend; **be** connector linijų
- [ ] Anchor `#ekosistema` (Navbar/Footer): pirmos eilės kortelės ne nukirptos po sticky header (`scroll-margin-top`)
- [ ] All 6 cards: `card-density-dark-premium` (`min-h-[200px]`); phase eyebrow + `line-clamp-2` outcome + tag pills; CTA `mt-auto pt-3` — be perteklinės tuštumos virš mygtuko (375px / 1280px)
- [ ] Enter: `border-2` featured frame + `startHere` badge + full-width `btn-primary` + `shadow-ecosystem-cta`
- [ ] Secondary: `card-phase-accent-*` top rim + `btn-ecosystem-secondary` + arrow; `aria-label` su opens-in-new-tab (be matomo teksto po CTA)
- [ ] Card rest: `shadow-ecosystem-card-rest`; hover: `-translate-y-1` + `shadow-ecosystem-card-hover`
- [ ] Enter icon: gold glow; kitos — `shadow-ecosystem-icon-depth` only
- [ ] Map link uses outline button + arrow; `ecosystem.trustLine` po map link
- [ ] Default card state: neutralus border (`card-glass-ecosystem`); be geltono border default būsenoje

## FAQ (Phase 8)

- [ ] Pre-heading `faq.sectionLabel` visible
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

## Lighthouse (post-deploy)

Record on production (`https://www.promptanatomy.app/`):

| Date | URL | Accessibility | Notes |
|------|-----|---------------|-------|
| _pending deploy_ | / | — | Run Chrome Lighthouse → paste score here |

## Grep acceptance (LP JSX)

From `frontend/`:

```bash
rg "rgba\(" src/components src/pages --glob "*.jsx"
rg "text-\[\d+px\]" src/components src/pages --glob "*.jsx"
rg "shadow-\[" src/components src/pages --glob "*.jsx"
```

Expected: **no matches** (tokens only in `src/index.css`).
