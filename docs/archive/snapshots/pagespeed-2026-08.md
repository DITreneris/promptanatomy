# PageSpeed / Lighthouse baseline — 2026-08

**Scope:** `https://www.promptanatomy.app/`  
**Date:** 2026-08-12  
**Operator:** Cursor / Tomas  
**Hub deploy SHA:** `8d4bbdc`  

---

## Tooling

| Tool | Result |
|------|--------|
| PageSpeed Insights API | 429 Too Many Requests from Cursor environment |
| Lighthouse CLI | Completed for desktop + mobile against live production |

CLI commands used:

```powershell
npx --yes lighthouse https://www.promptanatomy.app/ --only-categories=performance --preset=desktop --chrome-flags="--headless --no-sandbox" --output=json --output-path="$env:TEMP\pa-lh-desktop.json"
npx --yes lighthouse https://www.promptanatomy.app/ --only-categories=performance --form-factor=mobile --screenEmulation.mobile=true --screenEmulation.width=390 --screenEmulation.height=844 --screenEmulation.deviceScaleFactor=3 --throttling-method=simulate --chrome-flags="--headless --no-sandbox" --output=json --output-path="$env:TEMP\pa-lh-mobile.json"
```

---

## Results

| Device | Performance | LCP | FCP | Speed Index | TBT | CLS | INP |
|--------|-------------|-----|-----|-------------|-----|-----|-----|
| Mobile (simulated, 390×844) | **66** | 2.39 s | 2.10 s | 5.02 s | 1,681 ms | 0.018 | — (lab) |
| Desktop | **80** | 1.05 s | 0.57 s | 1.70 s | 362 ms | 0.003 | — (lab) |

---

## Read

- Desktop is healthy for a marketing LP baseline: LCP ~1.05 s, CLS ~0.003.
- Mobile still carries high lab TBT, similar to the 2026-06 baseline pattern. This is a lab throttling signal, not field INP.
- No performance engineering in this session. Use Vercel Speed Insights / PostHog RUM before changing Hero or layout.

## Follow-up

- Keep QW4b closed as a baseline snapshot.
- If field p75 INP > 200 ms or mobile LCP regresses above ~4 s, open a focused performance task.

## Accessibility (added 2026-08-13)

Lighthouse CLI, accessibility category only, same URL (`https://www.promptanatomy.app/`). Score **92**. Lab fails: `aria-hidden-focus`, `color-contrast`, `heading-order`. Recorded in [design-system-qa.md](../../process/design-system-qa.md) — not a performance or a11y-fix session.
