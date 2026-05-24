# Design system QA (LP v1.0)

**Scope:** Phases 5–7 from [design_system_roadmap2.md](../design_system_roadmap2.md).  
**Automated gate (pre-merge):** `cd frontend && npm run build`; `cd backend && pytest`.

## Visual QA (manual)

| Viewport | Check |
|----------|--------|
| 375px | Hero CTA column; Pricing cards; mobile drawer open/close; Footer links |
| 768px | Navbar density; section headings readable |
| 1280px | Desktop nav: What Is, Ecosystem, Training (if access) + locale + CTA; Footer 4 columns + legal bar; Ecosystem grid |

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
