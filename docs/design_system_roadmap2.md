# Frontpage Design System Audit & Premium SaaS Polish Roadmap (v2)

| Field | Value |
|-------|-------|
| **Date** | 2026-05-24 |
| **Last updated** | 2026-08-13 (v1.1 hygiene: feedback tokens, `page-heading`, icon-display, CI grep, Lighthouse a11y 92; typeface = OS sans, [ADR-0001](decisions/0001-lp-system-typeface.md); footer 4× `col-span-3`) |
| **Implemented** | 2026-05-24 (Phases 1–8); **v1.1** 2026-08-13 |
| **Status** | **v1.0 shipped** (Phases 5–8). **v1.1 hygiene shipped** — see §6 v1.1. QA: [design-system-qa.md](process/design-system-qa.md) |
| **External benchmark** | [GitHub Primer](https://primer.style/) — token layering, semantics, flow (§14) |
| **Scope** | LP in [frontend/src/pages/HomePage.jsx](../frontend/src/pages/HomePage.jsx) and [frontend/src/components/](../frontend/src/components/) |
| **Token source** | [frontend/src/index.css](../frontend/src/index.css) (`@theme`, Tailwind CSS v4 — **not** `tailwind.config.js`) |
| **Regressions** | [docs/golden-legacy-standard.md](golden-legacy-standard.md) |
| **Copy canon** | [docs/language-guidelines-en-lt.md](language-guidelines-en-lt.md) |
| **Brand colors** | [docs/design/logo-favicon.md](design/logo-favicon.md) (`#0B1320`, `#CFA73A`) |
| **Typeface** | OS sans — `--font-sans: ui-sans-serif, system-ui, sans-serif`. **Nėra webfonto** (Inter/Geist). Windows = Segoe UI; macOS = SF Pro. Kanonas: [ADR-0001](decisions/0001-lp-system-typeface.md). Footer: wordmark `font-black`; body/legal `font-medium`; labels `font-bold`. Nemaišyti 900 su 400 kūno bloke. |

**Active reference.** This document supersedes archived audits for frontpage UI polish:

- [docs/archive/audits/micro-ui-ux-audit.md](archive/audits/micro-ui-ux-audit.md) (historical; references obsolete `tailwind.config.js`)
- [docs/archive/audits/home-page-ok-fail-audit.md](archive/audits/home-page-ok-fail-audit.md)
- [docs/archive/audits/ux-premium-practices.md](archive/audits/ux-premium-practices.md)

**Constraint:** Micro-polish only. No full redesign, no new visual language, no heavy animation dependencies.

---

## 1. Executive Summary

| Question | Answer (2026-08-13) |
|----------|---------------------|
| **Is the frontpage close to premium SaaS quality?** | **Yes — v1.0 shipped; v1.1 hygiene.** Token + utility system in `index.css`. Remaining work is Won’t (no UI kit, no webfont, no dark mode). |
| **What was fixed first (Phases 1–4)?** | Dual CTA gradient → `btn-primary`; Hero CTA ↔ `#pricing`; proof copy disambiguation; stat SR readability; Methodology semantics; `mt-20` removed; local `noise.svg`. |
| **What's next?** | Nothing in-scope except optional Could (screenshots). Do not reopen Phases 5–7 as Open. |
| **Remaining trust polish?** | Proof numbers unified: **500+** library; **600+** practitioners. No verified logo wall. Desktop nav (golden-legacy 2026-08-13): What Is + Ecosystem (+ Training if `hasAccess`). **Not** Pricing / Methodology / FAQ. |
| **What must not change?** | Brand palette (dark + gold), terminal hero, Navbar Variant B, Stripe checkout flow, mobile drawer pattern, i18n architecture. |
| **What we will not adopt?** | `@primer/react`, shadcn on LP, dark mode, Figma pipeline, animation libraries — see §14.3. |

---

## 2. Current Design System Version

### Label: **v1.0 shipped — v1.1 hygiene (2026-08-13)**

*Historical labels: v0.85 audit → v0.95 Phases 1–4 → v1.0 Phases 5–8. Do not treat v0.95 as current.*

| Signal | Evidence | Implication |
|--------|----------|-------------|
| Centralized tokens | `@theme` in `index.css`: brand, feedback, gradients, named shadows | Base + functional + component layers (commented in CSS) |
| CSS utilities (not React DS) | `btn-primary*`, `section-default`, `section-heading`, `page-heading`, `focus-ring`, `card-feedback-*` | Primer-aligned **utility** approach — no `@primer/react` |
| Gradient split (resolved) | `bg-cta-gradient` = buttons; `bg-accent-gradient` = H1 clip + skip link only | Single primary button intent |
| JSX color discipline | Zero `rgba(` / `text-[NNpx]` / `shadow-[` in LP JSX; CI grep | Hex/rgba only in `@theme` |
| Typography | `text-stat` / `text-price` / `text-label-upper`; H1 `font-black`; stats `font-extrabold` | Weight contrast shipped |
| Section rhythm | `section-default` on LP sections; Ecosystem `section-dark-ecosystem` | Done |
| A11y | Focus trap, reduced motion, 44px; Lighthouse a11y **92** (2026-08-13) | Recorded; lab fails listed in QA doc |
| Living doc | This file + `index.css` `@theme` | Agent edit target — archived audits historical only |

### Strengths

- Semantic brand tokens (`brand-dark`, `brand-accent`, `ecosystem-1` … `ecosystem-4`)
- Coherent narrative: problem → definition → method → pay → hub → FAQ
- Hero terminal demo — differentiated product moment
- Navbar mobile drawer engineered correctly (sibling DOM, scroll lock, focus trap)
- i18n-complete LP; SEO/JSON-LD wired (`SeoHead.jsx`, `Faq.jsx`, `index.html`)

### Weaknesses (historical — Phases 1–4; closed in 5–8 / v1.1)

Closed: raw rgba in JSX, ad-hoc type px, inline shadows, Success/Cancel off-system buttons, undocumented icon sizes, missing Lighthouse a11y record. Desktop nav **does not** include Methodology/FAQ — that Phase 6 row is **superseded** by golden-legacy 2026-08-13 (What Is + Ecosystem + Training if access).

### LP component tree

```
HomePage
├── Navbar
├── Hero
├── WhatIsPromptAnatomy
├── Methodology
├── Pricing (+ returning-customer form inline in HomePage)
├── Ecosystem
├── Faq
└── Footer
```

### Current section order (code truth)

From [HomePage.jsx](../frontend/src/pages/HomePage.jsx) L161–288:

**Hero → WhatIs → Methodology → Pricing → Ecosystem → FAQ → Footer**

**Section order (canonical):** Hero → What Is → Methodology → **Pricing** → Ecosystem → FAQ → Footer. [golden-legacy-standard.md](golden-legacy-standard.md) §3 synced 2026-05-24.

### Components that work (systematize)

- `focus-ring` / `btn-primary` pattern (from Navbar)
- Card hover: `-translate-y-1` + `shadow-soft-lg`
- Pricing “recommended” card treatment
- Ecosystem dark section with tokenized glow
- FAQ `<details>` + JSON-LD injection

### Components normalized (2026-05-24)

- Primary CTAs → `btn-primary` utilities (Hero, Navbar, Pricing, Ecosystem, HomePage access, CancelPage)
- Section headings → `section-heading` on light sections; Methodology/Ecosystem keep display variants
- Stat/proof blocks → copy disambiguated; stats readable by SR
- Footer → Title Case brand, reduced tracking, sentence-case links
- Navbar → `focus-ring` utility (replaces inline FOCUS_RING string)

### Resolved in Phases 1–4 (historical — do not regress)

- Dual CTA gradients on buttons → `btn-primary` + single `bg-cta-gradient`
- Hero CTA label vs `#pricing` action mismatch
- Methodology heading semantics (`<p>` label + `<h2>` title)
- Stat `aria-hidden`; external noise URL → `/noise.svg`
- Footer ALL CAPS / extreme tracking
- Methodology extra `mt-20`

### Still deferred → Phases 5–7 (§6)

**Historical list — shipped.** Phases 5–7 Done 2026-05-24; v1.1 2026-08-13. Desktop nav = What Is + Ecosystem (+ Training if access), **not** Methodology/FAQ ([golden-legacy-standard.md](golden-legacy-standard.md) §1).

---

## 3. OK / FAIL Analysis

*Snapshot at v0.85 audit; **Resolved** column reflects Phases 1–4 (2026-05-24). Open items feed Phases 5–7.*

| Area | OK | Open / FAIL | Phase | Resolved (1–4)? |
|------|----|-------------|-------|-----------------|
| Hero | Strong H1, terminal, badge, bullets, reduced motion, CTA honesty | Ad-hoc label sizes (`text-[11px]`) | 5 | CTA, noise, mobile density ✓ |
| Header | Fixed nav, blur, locale, 44px targets | Desktop hides Ecosystem/Methodology/FAQ | 6 | — |
| Navigation | Anchor IDs; magic-link Training when `hasAccess` | — | — | OK |
| CTA hierarchy | `btn-primary*` unified; pricing intent | SuccessPage bespoke dark CTA | 6 | Nav/Hero/Pricing ✓ |
| Typography | Responsive H1; `section-heading` on light sections | Uniform `font-black`; ad-hoc px sizes | 5 | Partial |
| Color system | Brand + ecosystem in `@theme` | Raw rgba in Pricing/Ecosystem JSX | 5 | — |
| Section rhythm | `section-default` utility exists | Not applied everywhere | 5 | `mt-20` ✓ |
| Cards | Hover lift; tier utilities exist | Inline shadows (Methodology ring) | 5–6 | WhatIs pills ✓ |
| Icons | Lucide-only | Size drift 10–26px | 7 | — |
| Shadows | Named tokens + `shadow-tier-*` | Tier not enforced in all components | 6 | Partial |
| Borders | `border-slate-*` dominant | Mix `border` vs `border-2`; glass rgba | 5 | — |
| Mobile layout | Drawer, full-width Hero CTA, touch targets | — | — | Hero pass ✓ |
| Trust signals | Stripe, FAQ schema, disambiguated metrics | No verified logo wall | — | Copy ✓ |
| Footer | Title Case, 4× `col-span-3`, legal `text-xs` | — | — | ✓ (2026-08-13) |
| Accessibility | Skip link, focus-visible, FAQ, stat SR | Lighthouse post-deploy unchecked | 7 | Semantics ✓ |
| SEO / semantic | One H1, section IDs, hreflang | — | — | Methodology ✓ |

### Key FAIL evidence (historical — Phases 1–4)

| FAIL (v0.85) | Resolution |
|--------------|------------|
| Hero CTA label vs action | Fixed — `hero.cta` = pricing intent |
| Dual primary gradients on buttons | Fixed — `btn-primary` + `bg-cta-gradient` only |
| Proof number conflict | Fixed — mixed metrics, disambiguated labels in i18n |
| Methodology headings | Fixed — `<p>` label + `<h2>` title |
| Stat a11y | Fixed — numbers readable by SR |
| External noise URL | Fixed — `frontend/public/noise.svg` |

### Open evidence (Phases 5–7)

**Historical — closed.** JSX grep is now a CI gate. Desktop Methodology/FAQ nav was **not** the end state; golden-legacy 2026-08-13 keeps those links out of the desktop bar.

| Gap | File | Detail |
|-----|------|--------|
| Raw rgba borders/backgrounds | `Pricing.jsx` | `rgba(255,193,7,…)` badges and featured card |
| Glass card surfaces | `Ecosystem.jsx` | `rgba(255,255,255,0.04)` + inline grid |
| Ad-hoc type sizes | `WhatIsPromptAnatomy.jsx`, `Pricing.jsx` | `text-[56px]`, `text-[44px]` |
| Inline accent ring shadow | `Methodology.jsx` | `shadow-[0_0_0_4px_rgba(207,167,58,…)]` |
| Off-system buttons | `SuccessPage.jsx`, `CancelPage.jsx` | Dark/gray bespoke CTAs vs `btn-primary` |
| Nav wayfinding | `Navbar.jsx` | `secondaryNavItems` drawer-only |

---

## 4. Kiss / Marry / Kill Analysis

### KISS — keep but simplify

- **Hero terminal typing** — keep timing; optional: drop code-line hover nudge
- **Hero social proof pill** — useful; shorten or move below CTA on mobile
- **WhatIs pipeline pills** — good metaphor; replace inline shadows with one token
- **Methodology 3-step cards** — keep; remove `mt-20` and icon rotate on hover
- **Ecosystem dark hub** — keep; simplify to one texture layer
- **Pricing returning-customer block** — keep function; tighten spacing and label uppercase

### MARRY — preserve and systematize

- **`index.css` `@theme` tokens** — official source of truth
- **Navbar drawer scroll-lock + focus trap** — document as non-negotiable (golden-legacy §4)
- **Hero 2-column + `bg-hero-bg`**
- **Pricing recommended card** (amber tint + badge)
- **FAQ `<details>` + JSON-LD**
- **Locale routes** (`/lt`, `/en`) + sentence-case nav
- **Golden-legacy smoke checklist**

### KILL — remove or stop doing

- **Two primary gradients** for the same button intent
- **Hero CTA label that doesn’t match action**
- **Conflicting proof numbers** without single i18n source
- **Footer `tracking-[0.45em]` / `tracking-[0.5em]`**
- **Footer ALL CAPS brand** when Navbar is Title Case
- **External noise SVG URL** — host locally or remove
- **Unused i18n keys** (`hero.ctaSecondary`, `hero.members`, etc.) — wire or delete
- **Methodology `h2` as tiny label** — use `<p>` with class; real section title = `h2`
- **Scroll-reveal libraries** — repo rejects heavy animation deps

---

## 5. Premium SaaS Gap Analysis

*Updated post–Phase 4. **Phase** column = where remaining work lives.*

| Premium SaaS Standard | Current State | Gap | Fix | Phase |
|-----------------------|---------------|-----|-----|-------|
| First-screen clarity (2s) | Strong headline + terminal; bullets hidden `< sm` | — | Done in Phase 3 | — |
| Visual hierarchy | Good section contrast | Uniform `font-black` on stats/labels | Weight + size tokens | 5 |
| CTA confidence | `btn-primary` unified on LP | Success/Cancel off-system | Button parity | 6 |
| Trust-building | Disambiguated metrics + Stripe + FAQ | No verified logo wall | Founder decision only | — |
| Whitespace | Even section gaps | `section-default` not everywhere | Apply utility | 5 |
| Typography scale | Responsive H1 | Ad-hoc px in JSX | `--text-stat`, `--text-price`, labels | 5 |
| Materials (surfaces) | Named shadows exist | rgba glass/amber inline | Functional tokens | 5 |
| Cohesive familiarity | LP sections aligned | Checkout pages differ | `btn-primary` / `btn-secondary` | 6 |
| Wayfinding | Mobile drawer complete | Desktop omits 3 anchors | Sentence-case nav links | 6 |
| Icon language | Lucide throughout | Size drift 10–26px | 16/20/24 scale doc | 7 |
| QA / perf gate | Build + pytest green | No Lighthouse baseline | Post-deploy record | 7 |

---

## 6. Micro-Polish Roadmap

### Open decisions — **resolved 2026-05-24**

| # | Decision | Resolution |
|---|----------|------------|
| 1 | **Canonical proof numbers** | **Unified 2026-06-05.** **500+** = prompt/template library (`hero.bullet1`, `whatIs.stat1Number`, `pricing.features`); **600+** = practitioners (`hero.socialProof`). |
| 2 | **Primary button gradient** | **`bg-cta-gradient`** for all primary buttons via `btn-primary` utilities. **`bg-accent-gradient`** only for Hero H1 text clip + skip link. |

---

### Phase 1 — Immediate low-hanging fruit (P0) — **Done**

| Task | Status | Notes |
|------|--------|-------|
| Proof numbers / copy audit | Done | **500+** unified library metric; **600+** social proof |
| Hero CTA ↔ `#pricing` | Done | `hero.cta` pricing intent; removed unused `ctaSecondary`. **2026-08-13:** QW3a (Hero → `.cloud`) was a regression against Primer “one primary CTA intent to pricing”; restored — one Hero CTA → `#pricing`, same tab, no secondary. |
| Standardize primary gradient | Done | HomePage access CTAs, CancelPage |
| Remove Methodology `mt-20` | Done | |
| Fix stat `aria-hidden` | Done | |
| Localize noise SVG | Done | Blocker: external URL 404 → local `public/noise.svg` |

---

### Phase 2 — Design system normalization — **Done**

| Task | Status | Notes |
|------|--------|-------|
| `@utility btn-primary`, secondary, ghost | Done | + size variants `btn-primary-lg/md/nav` |
| `@utility section-default` | Done | `section-narrow` **deferred** (no narrow section in LP yet) |
| Refactor CTAs to utilities | Done | Navbar, Hero, Pricing, Ecosystem, HomePage, CancelPage |
| Methodology h2/h3 semantics | Done | Moved to Phase 1 |
| Shadow tiers | Partial | `shadow-tier-1/2/3` utilities added; WhatIs pills use `shadow-soft`; Pricing/Ecosystem rgba borders **deferred** (P2) |
| `focus-ring` utility | Done | Navbar `FOCUS_RING` → `focus-ring` class |

---

### Phase 3 — Premium perception polish — **Done**

| Task | Status | Notes |
|------|--------|-------|
| Footer font weights / tracking / spacing | Done | Title Case brand; 4× `lg:col-span-3`; legal `text-xs`; OS typeface (ADR-0001) |
| Hero mobile leading / proof / bullets | Done | `leading-[0.95]`; bullets `hidden sm:block`; column CTA layout |
| Unify section H2 | Partial | `section-heading` on WhatIs, Pricing, Faq; **Methodology** keeps gradient display h2; **Ecosystem** keeps white-on-dark h2 (intentional) |

---

Unified H2 utility (light sections):

```text
section-heading → text-4xl md:text-5xl font-black text-brand-dark tracking-[-0.02em] leading-[1.1]
```

### Phase 4 — Conversion & clarity — **Done**

| Task | Status | Notes |
|------|--------|-------|
| WhatIs mid-funnel link → `#pricing` | Done | `whatIs.ctaPricing` LT/EN |
| Hero subtitle funnel edit | Skipped | Subtitle already aligned; no change needed |
| golden-legacy §3 section order | Done | Pricing → Ecosystem |
| Prune unused i18n keys | Done | Removed `hero.ctaSecondary`, `members`, `community`, `valueLine`, `subtext` |

---

### Phase 5 — Token architecture (Primer functional layer) — **Done**

**Goal:** v0.95 → **v0.97**. No hex/rgba in JSX; typography sizes from `@theme`.

| Task | Priority | Files | Acceptance |
|------|----------|-------|------------|
| Add functional color tokens (amber muted, glass surface/border, accent ring) | P1 | `index.css` | `--color-accent-muted-bg`, `--color-surface-glass`, etc. |
| Add `@utility badge-accent`, `card-glass`, `border-accent-muted` | P1 | `index.css` | Pricing/Ecosystem use utilities, not raw rgba |
| Replace rgba in `Pricing.jsx` featured card + badges | P1 | `Pricing.jsx` | Grep `rgba(` → 0 in Pricing |
| Replace glass rgba in `Ecosystem.jsx` cards | P1 | `Ecosystem.jsx` | Grep `rgba(` → 0 in Ecosystem |
| Type scale: `--text-stat`, `--text-price`; utilities `text-stat`, `text-price` | P1 | `index.css`, `WhatIsPromptAnatomy.jsx`, `Pricing.jsx` | No `text-[44px]` / `text-[56px]` |
| Label utility: `text-label-upper` for badges/nav pills | P1 | `index.css`, `Hero.jsx`, `Navbar.jsx` | No `text-[10px]` / `text-[11px]` in Hero/Navbar |
| Typography weights: H1=`font-black`, stats=`font-extrabold`, body=`font-medium`, label=`font-bold` | P1 | LP components | Document in §7 |
| Apply `section-default` to all LP sections | P2 | Section components | Grep sections missing utility |
| Tokenize Methodology accent ring shadow | P2 | `index.css`, `Methodology.jsx` | `--shadow-accent-ring` replaces inline shadow |

**Agent:** frontend-agent. **Regressions:** `npm run build`, golden-legacy §3.

---

### Phase 6 — Cohesion & wayfinding — **Done**

**Goal:** v0.97 → **v0.98**. Primer “cohesive familiarity” — LP + checkout outcomes share patterns.

| Task | Priority | Files | Acceptance |
|------|----------|-------|------------|
| Desktop nav: Ecosystem, Methodology, FAQ (sentence case) | P2 | `Navbar.jsx`, i18n | **Superseded 2026-08-13.** Live canon: What Is + Ecosystem (+ Training if `hasAccess`). Pricing / Methodology / FAQ stay **out** of desktop bar. SOT: [golden-legacy-standard.md](golden-legacy-standard.md) §1 |
| SuccessPage → `btn-primary` / `btn-secondary` | P2 | `SuccessPage.jsx` | No bespoke dark block button |
| CancelPage secondary → `btn-secondary` | P2 | `CancelPage.jsx` | Parity with design system |
| Enforce shadow tiers — remove inline `shadow-[…]` | P2 | `Methodology.jsx`, grep LP | Tier 1/2/3 only |
| Border rule: default cards `border`; featured `border-2` | P2 | §7 | Documented |
| HomePage access buttons → `btn-primary` (not raw accent gradient on buttons) | P2 | `HomePage.jsx` | Buttons via `btn-primary` utility |

**Agent:** frontend-agent. **Regressions:** golden-legacy §3 Navbar + drawer smoke.

---

### Phase 7 — Scale docs & quality gates — **Done** (Lighthouse a11y recorded 2026-08-13)

**Goal:** v0.98 → **v1.0**. Primer: “shipped = fast + accessible.”

| Task | Priority | Files | Acceptance |
|------|----------|-------|------------|
| Icon scale `--size-icon-sm/md/lg` (16/20/24) + doc | P3 | `index.css`, §7 | Lucide sizes standardized on LP |
| Spacing scale on 4px grid (optional `--space-section-y`) | P3 | `index.css` | Doc in §7 appendix |
| `section-narrow` utility | P3 | `index.css` | Only if FAQ/legal needs max-width |
| Manual visual QA: 375 / 768 / 1280 | P3 | — | §10 checklist |
| Keyboard + SR smoke | P3 | — | §10 checklist |
| Lighthouse on deploy (a11y baseline) | P3 | — | **92** recorded 2026-08-13 — [design-system-qa.md](process/design-system-qa.md) |
| Screenshot baseline 375 + 1440 (optional) | P3 | archive or CI | Regression reference |

**Out of scope for v1.0:** `@primer/react`, dark mode, Figma sync, visual regression CI, unverified logo wall.

---

### Phase 8 — Hub polish + LP consistency — **Done** (2026-06-05)

**Goal:** v1.0 → **v0.98+**. Hub vizualas atitinka „core hub“ copy; card density suvienodinta per LP.

| Task | Status | Files |
|------|--------|-------|
| Hub core pill + desktop connectors | Done | `Ecosystem.jsx`, `index.css` (`hub-core-pill`, `hub-connector-line`) |
| Remove carousel-like `ConnectorRow` | Done | `Ecosystem.jsx` |
| Card density utilities | Done | `index.css` (`card-density`, `card-density-dark`) |
| Ecosystem CTA + map link | Done | `btn-ecosystem-outline` |
| Cross-section polish (Hero, WhatIs, Methodology, Pricing, FAQ, Navbar) | Done | respective components |
| Yellow tier utilities (`badge-premium`, `faq-item`) | Done | `index.css`, `Pricing.jsx`, `Faq.jsx` |
| i18n hub + FAQ labels | Done | `en.json`, `lt.json` |

**CTA funnel rule (documented):** nav/hero = „Choose a plan“; ecosystem hub = 6 card CTAs + `ecosystem.mapLink` (→ `.site`); pricing cards = `pricing.getAccess`. Hub `ctaPricing` / pill / phase legend **pašalinti 2026-08-13** — kainodara ne dubliuojama ekosistemos sekcijoje; current SOT: [golden-legacy-standard.md](golden-legacy-standard.md) §3.

**Agent:** frontend-agent. **Regressions:** `npm run build`, golden-legacy §3, [design-system-qa.md](process/design-system-qa.md) Hub/FAQ checks.

---

### v1.1 — Hygiene (2026-08-13) — **Done**

**Goal:** Close v1.0 doc/QA gates; enforce icons, feedback surfaces, legal headings. No visual redesign.

| Item | Status |
|------|--------|
| Roadmap labels v1.0 current (not v0.95); Phase 6 Methodology/FAQ nav superseded | Done |
| QA FAQ eyebrow absent; CI JSX grep | Done |
| Lighthouse a11y **92** recorded | Done |
| Lucide `icon-sm/md/lg`; Success `icon-display` (48px) | Done |
| `card-feedback-success/warning` + owned CTA; Hero terminal exempt | Done |
| `page-heading` / `page-subheading` on Privacy/Terms | Done |
| Shadow public API = `shadow-tier-1/2/3`; do not collapse Ecosystem shadows | Done (docs) |

**Won’t:** shadcn / `@primer/react` / Geist font / dark mode / Figma pipeline / OKLCH / screenshot CI / Methodology+FAQ in desktop nav / collapsing Ecosystem shadows.

---

### Roadmap dependency graph

```text
Phase 5 (functional tokens + type scale)
    → Phase 6 (nav + checkout parity + shadow enforcement)
        → Phase 7 (icon/spacing docs + QA gates → v1.0)
            → v1.1 hygiene (docs + CI grep + a11y record + feedback/legal utilities)
```

---

## 7. Design System Rules

| # | Rule | Status | Phase |
|---|------|--------|-------|
| 1 | **Section spacing** | Done — `section-default` available; apply everywhere in Phase 5 | 5 |
| 2 | **Hero layout** | Done | — |
| 3 | **CTA hierarchy** | Done on LP; Success/Cancel parity in Phase 6 | 6 |
| 4 | **Button variants** | Done — `btn-primary` / secondary / ghost | — |
| 5 | **Card anatomy** | Unchanged — hover lift + tier shadows | — |
| 6 | **Icon placement** | Done — LP 16/20/24 (`icon-sm/md/lg`); Success display 48 (`icon-display`) | 7 / v1.1 |
| 7 | **Typography hierarchy** | Done — weight + size tokens; legal `page-heading` / `page-subheading` | 5 / v1.1 |
| 8 | **Mobile layout** | Done — 44px targets | — |
| 9 | **Proof blocks** | Done — mixed metrics, disambiguated copy | — |
| 10 | **Shadows / borders** | Done — public API `shadow-tier-1/2/3`; component shadows named in `@theme` only | 5–6 / v1.1 |
| 11 | **Gradients** | Done — CTA on buttons; accent on H1 clip + skip link only | — |
| 12 | **Images / diagrams** | Done — local `noise.svg` only | — |
| 13 | **Footer density** | Done (2026-08-13) | 4× `lg:col-span-3`; legal `text-xs`; tagline be brand echo |
| 14 | **No raw color in JSX** (Primer) | Done — hex/rgba only in `@theme`; CI grep | 5 / v1.1 |
| 15 | **Semantic headings** (Primer) | Done — visual size via utility, not tag swap | — |
| 16 | **Emphasis via weight/size** (Primer) | Done — not color alone for hierarchy | 5 |
| 17 | **Focus + 44px targets** (Primer a11y) | Done — `focus-ring` on interactives | — |
| 18 | **Materials / elevation tiers** | Done — `shadow-tier-1/2/3` public API; Ecosystem names are component layer | 6 / v1.1 |
| 19 | **Encourage flow** (Primer) | Done — one primary CTA intent to pricing (QW3a `.cloud` outbound reverted 2026-08-13) | — |
| 20 | **Desktop wayfinding** | Done — What Is + Ecosystem (+ Training if access). Methodology/FAQ **not** in desktop nav (golden-legacy 2026-08-13) | 6 |

### Token reference appendix (`index.css` `@theme`)

**Layer model (Primer-inspired):**

| Layer | Purpose | Example | Rule |
|-------|---------|---------|------|
| Base | Brand primitives | `--color-brand-dark`, `--color-brand-accent` | Define in `@theme` only |
| Functional | UI patterns (text, border, surface) | `--color-accent-muted-bg`, `--color-surface-glass`, `--color-feedback-success-*` | Use in utilities + components |
| Component | Section-specific | `--background-image-hero-bg`, `--shadow-pricing-card`, Ecosystem shadows | Prefer functional when reusable. **Do not add a 24th shadow** without a v1.2 note. |

**Current tokens (shipped):**

| Token | CSS / class | Usage |
|-------|-------------|-------|
| Typeface | `--font-sans` / `font-sans` | OS stack only (`ui-sans-serif, system-ui, sans-serif`). No webfont. [ADR-0001](decisions/0001-lp-system-typeface.md) |
| Brand dark | `--color-brand-dark` / `text-brand-dark` | Headings, nav brand |
| Brand accent | `--color-brand-accent` / `text-brand-accent` | Accents, focus rings |
| CTA gradient | `bg-cta-gradient` | Primary buttons via `btn-primary*` utilities |
| Accent gradient | `bg-accent-gradient` | H1 accent text (Hero), skip link only — **verified post-impl** |
| Hero background | `bg-hero-bg` | Hero section |
| Pricing background | `bg-pricing-section` | Pricing section |
| Ecosystem colors | `bg-ecosystem-1` … `bg-ecosystem-4` | Hub card icons |
| Shadow tier 1 | `shadow-soft`, `shadow-xs` | Cards, nav |
| Shadow tier 2 | `shadow-soft-lg`, `shadow-hero-value` | Elevated cards |
| Shadow tier 3 | `shadow-pricing-card`, `shadow-cta-shadow`, `shadow-pricing-cta` | Featured pricing, CTAs |
| Shadow public API | `shadow-tier-1` / `shadow-tier-2` / `shadow-tier-3` | Elevation for new LP surfaces (`shadow-soft`, `shadow-soft-lg`, `shadow-pricing-card` aliases) |
| Shadow component | `shadow-ecosystem-*`, `shadow-cta-shadow`, `shadow-accent-ring` | Hub/CTA/methodology — reuse these names; no new `shadow-[…]` in JSX |
| Focus | `focus-ring` utility | All interactives |
| Feedback | `card-feedback-success` / `card-feedback-warning` / `btn-feedback-owned` | `#access` cards, owned CTA, Success alert. **Hero terminal chrome stays Tailwind amber/emerald.** |
| Icons | `icon-sm` / `icon-md` / `icon-lg` / `icon-display` | LP Lucide 16/20/24; Success checkout hero 48px only |
| Legal type | `page-heading` / `page-subheading` | Privacy/Terms only — not `section-heading` (too large) |

**Planned tokens (Phase 5 — shipped; listed for history):**

| Token (proposed) | Usage |
|------------------|-------|
| `--color-accent-muted-bg` | Pricing badge, featured card tint |
| `--color-accent-muted-border` | Amber pill/card borders |
| `--color-surface-glass` | Ecosystem hub cards |
| `--color-border-glass` | Ecosystem card borders |
| `--shadow-accent-ring` | Methodology icon hover ring |
| `--text-stat` | WhatIs stat numbers (~3.5rem) |
| `--text-price` | Pricing price display (~2.75rem) |
| `--size-icon-sm/md/lg` | Lucide 16 / 20 / 24px (Phase 7) |

### Gradient usage map (current repo)

| Class | Files |
|-------|-------|
| `bg-cta-gradient` | `Hero.jsx`, `Navbar.jsx`, `Pricing.jsx`, `Ecosystem.jsx` |
| `bg-accent-gradient` | `Hero.jsx` (H1 text clip), `HomePage.jsx` (skip link, access CTAs), `CancelPage.jsx` |

---

## 8. File-Level Recommendations

### Shipped (Phases 1–4) — verify, do not regress

| File | Change applied |
|------|----------------|
| `index.css` | `btn-primary*`, `section-*`, `focus-ring`, shadow tiers |
| `Hero.jsx` | CTA copy, local noise, mobile layout |
| `Navbar.jsx` | `btn-primary-nav`, `focus-ring` |
| `WhatIsPromptAnatomy.jsx` | Stat SR; `section-heading` |
| `Methodology.jsx` | Semantics; `mt-20` removed |
| `Footer.jsx` | Title Case, spacing, tracking |
| `Faq.jsx` | `section-heading` |
| `en.json` / `lt.json` | Proof disambiguation; pruned hero keys |
| `golden-legacy-standard.md` | Section order, Navbar/Hero canon |

### Planned (Phases 5–7)

| File | Problem | Micro-change | Phase |
|------|---------|--------------|-------|
| `index.css` | Missing functional + type tokens | Add Phase 5 tokens + utilities | 5 |
| `Pricing.jsx` | Raw rgba; `text-[44px]` | `badge-accent`, `text-price` | 5 |
| `Ecosystem.jsx` | Glass rgba inline | `card-glass`, `border-glass` | 5 |
| `WhatIsPromptAnatomy.jsx` | `text-[56px]` | `text-stat` | 5 |
| `Hero.jsx`, `Navbar.jsx` | Ad-hoc label px | `text-label-upper` | 5 |
| `Methodology.jsx` | Inline accent ring shadow | `--shadow-accent-ring` | 5 |
| `Navbar.jsx` | Desktop omits 3 sections | Add sentence-case anchor links | 6 |
| `SuccessPage.jsx`, `CancelPage.jsx` | Off-system buttons | `btn-primary` / `btn-secondary` | 6 |
| `HomePage.jsx` | Access CTAs may use accent gradient on buttons | Align to `btn-primary` | 6 |

---

## 9. Do Not Change List

### Brand direction

- Dark navy `#0b1320` + gold accent `#cfa73a`
- “AI/DI Operating System” positioning
- Prompt Anatomy / Promptų Anatomija naming (EN/LT)

### Core layout

- Hero 2-column with live terminal (not static screenshot swap)
- Section set: Hero → What Is → Methodology → Pricing → Ecosystem → FAQ
- Navbar Variant B (wordmark only, no tagline/version in bar)
- Pricing before Ecosystem (conversion-first; do not reorder without A/B evidence)

### Strong patterns (golden-legacy §4)

- Mobile drawer DOM sibling + scroll-lock (`Navbar.jsx`)
- Magic-link training flow when `hasAccess`
- Phase 1 two-plan pricing filter
- Skip link + `focus-visible` rings
- i18n-only copy
- Hero typing animation timing + `prefers-reduced-motion`
- Stripe + webhook contracts

### Copy blocks — micro-edits only

- Hero headlines (“Stop talking / Start building”)
- WhatIs value proposition structure
- Methodology 3-step titles
- FAQ answers (legal accuracy)

### Do not add

- New animation libraries
- Full font stack change without performance discussion — **kanonas = system sans** ([ADR-0001](decisions/0001-lp-system-typeface.md)); webfontas tik su atskiru performance PR
- Testimonial carousel or logo wall with unverified logos
- Next.js / SSR migration
- `@primer/react`, `@geist-ui/core`, or other full UI libraries (use `@theme` + `@utility` only)
- Dark mode / multi-theme until product requires it
- Style Dictionary / Figma token pipeline (overkill for LP scope)

---

## 10. Implementation Checklist for Coding Agent

### Phases 1–4 (shipped)

- [x] Read [golden-legacy-standard.md](golden-legacy-standard.md) §1–4 before any UI edit
- [x] Resolve **Open decisions** (§6) with product owner
- [x] Audit `@theme` in [frontend/src/index.css](../frontend/src/index.css) — no `tailwind.config.js`
- [x] Phases 1–4 tasks
- [x] `npm run build` — 2026-05-24 ✓
- [x] `pytest` — 2026-05-24, 24 passed ✓
- [x] Update this doc + CHANGELOG + golden-legacy where copy/stats changed

### Phases 5–7 (shipped 2026-05-24)

- [x] Read §14 (Primer benchmark) + §7 rules for target phase
- [x] Grep `rgba(`, `text-[`, `shadow-[` in `frontend/src/components/` and pages
- [x] Run `cd frontend && npm run build`
- [x] Run `cd backend && pytest` (24 passed)
- [x] Update §7 rule status + this doc phase table
- [x] golden-legacy §1–3 + CHANGELOG + [process/design-system-qa.md](process/design-system-qa.md)

### Phase 5 checklist

- [x] Functional color tokens in `@theme`
- [x] `Pricing.jsx` / `Ecosystem.jsx` — zero raw rgba
- [x] `text-stat` / `text-price` / `text-label-upper` utilities
- [x] Stats use `font-extrabold` not `font-black` (where safe)

### Phase 6 checklist

- [x] Desktop nav: What Is + Ecosystem (+ Training if access). Methodology/FAQ **not** in bar (golden-legacy 2026-08-13; Phase 6 row superseded)
- [x] SuccessPage + CancelPage button parity
- [x] No inline `shadow-[…]` on LP
- [x] golden-legacy §1 Navbar canon updated

### Phase 7 checklist (v1.0 gate)

- [x] Icon scale documented and applied (16/20/24)
- [x] Visual QA checklist — [process/design-system-qa.md](process/design-system-qa.md)
- [x] Accessibility QA checklist documented
- [x] Mobile drawer smoke (golden-legacy §3) — documented in QA doc
- [x] Lighthouse on deploy recorded — a11y **92** (2026-08-13), [design-system-qa.md](process/design-system-qa.md)
- [ ] Optional: screenshots 375 + 1440

---

## 11. Acceptance Criteria

### v0.95 (Phases 1–4) — **Met**

- [x] One primary button style; unified H2 on light sections; even section gaps
- [x] Mobile Hero + Pricing readable
- [x] CTA hierarchy: Nav + Hero + Pricing → pricing/access
- [x] Proof numbers disambiguated in i18n
- [x] `npm run build` and `pytest` pass
- [x] No new npm UI dependencies

### v0.98 (Phase 5–6 target) — **Met**

- [x] Zero `rgba(` / ad-hoc `text-[NNpx]` in LP component JSX (tokens only)
- [x] Functional token layer documented in §7 appendix
- [x] Success/Cancel pages use `btn-primary` / `btn-secondary`
- [x] Desktop nav includes Ecosystem (Methodology/FAQ **not** in desktop bar — golden-legacy 2026-08-13)
- [x] Shadow tier 1/2/3 enforced; no inline shadows

### v1.0 (Phase 7 target) — **Met**

- [x] Icon scale 16/20/24 on LP
- [x] Manual visual + a11y QA checklist (§10 → [process/design-system-qa.md](process/design-system-qa.md))
- [x] Lighthouse a11y baseline recorded post-deploy (**92**, 2026-08-13)
- [ ] Optional screenshot baseline for regression

### v1.1 (hygiene) — **Met**

- [x] Canon labels = v1.0; Phase 6 Methodology/FAQ nav superseded
- [x] CI JSX token grep
- [x] Feedback utilities + legal `page-heading`; `icon-display` on Success

---

## 12. Final Verdict

| | |
|---|---|
| **v0.85** | Pre-implementation audit (2026-05-24 AM) |
| **v0.95** | Phases 1–4 shipped (2026-05-24) |
| **v0.98** | Target after Phases 5–6 (functional tokens + cohesion) |
| **v1.0** | Phases 5–8 shipped (QA gates + hub polish) |
| **v1.1** | Hygiene 2026-08-13 — current |
| **Top 3 delivered (1–4)** | (1) `btn-primary` + single CTA gradient, (2) Hero CTA honesty + proof copy, (3) Footer + mobile Hero polish |
| **Top 3 v1.1** | (1) Canon/QA aligned to golden-legacy, (2) CI grep + a11y 92, (3) feedback + legal heading utilities |
| **Benchmark** | GitHub [Primer](https://primer.style/) — §14; adopt patterns, not `@primer/react` |
| **Mistakes to avoid** | Section reorder; animation libs; raw rgba in JSX; proof changes without i18n + golden-legacy; reading §2 as v0.95 |

---

## 13. Implementation Log (2026-05-24)

### Agent orchestration

Implemented via frontend-agent waves (2026-05-24): Wave 1 (copy + a11y + gradient, parallel) → Wave 2 (utilities then CTA refactor) → Wave 3 (Footer, Hero mobile, H2) → Wave 4 (conversion + docs). Backend untouched.

### Blockers encountered

| Blocker | Impact | Resolution |
|---------|--------|------------|
| `https://grainy-gradients.vercel.app/noise.svg` returns **DEPLOYMENT_NOT_FOUND** | Hero/Ecosystem/Cancel/Success texture broken on fresh load | Created [frontend/public/noise.svg](../frontend/public/noise.svg) (inline feTurbulence); all references → `/noise.svg` |
| Tailwind v4 nested `@utility` (`btn-primary-lg` applies `btn-primary`) | Build risk | Verified — `npm run build` passes |

### Files touched (summary)

| Area | Files |
|------|-------|
| CSS utilities | `frontend/src/index.css` |
| Components | `Hero`, `Navbar`, `Footer`, `Methodology`, `WhatIsPromptAnatomy`, `Pricing`, `Ecosystem`, `Faq` |
| Pages | `HomePage`, `CancelPage`, `SuccessPage` |
| i18n | `en.json`, `lt.json` |
| Assets | `frontend/public/noise.svg` |
| Docs | `golden-legacy-standard.md`, `CHANGELOG.md`, this file |

### Not implemented (moved to Phases 5–7)

See §6 Phase 5–7 tables. Summary: functional tokens, desktop nav, Success/Cancel parity, icon scale, automated visual regression.

---

## 14. External benchmark — GitHub Primer (2026-05-24)

Analysis of [GitHub Primer](https://primer.style/) and comparable premium SaaS systems (e.g. Vercel Geist **Materials**) mapped to this repo. **Adopt patterns, not dependencies.**

### 14.1 Principles that transfer to our LP

| Primer principle | Our interpretation | Repo status |
|------------------|-------------------|-------------|
| **Encourage flow** | One obvious next step (pricing); calm UI; no blocking animations | ✓ CTA unified |
| **Cohesive familiarity** | Same button/heading/spacing on LP + Success/Cancel | ✓ v1.0 |
| **Three-layer tokens** | Base → functional → component; never base/rgba in JSX | ✓ JSX + CI; CSS commented v1.1 |
| **Semantic markup ≠ visual design** | Heading level = meaning; size via utility class | ✓ Methodology fixed |
| **Typography via tokens** | `rem` scale, weight contrast, labels from `@theme` | ✓ Phase 5 + `page-heading` |
| **Accessibility first** | 4.5:1 contrast, focus-visible, 44px targets, reduced motion | ✓ Strong; Lighthouse a11y 92 |
| **Materials / elevation** | Surface + stroke + shadow presets (Geist “Materials”) | ✓ Public API `shadow-tier-*` |
| **Single icon language** | Lucide only; documented 16/20/24 + display 48 | ✓ v1.1 |
| **Shipped = fast + accessible** | Lighthouse + manual QA as release gate | ✓ a11y recorded; perf in pagespeed snapshot |

References: [Primer introduction](https://primer.style/product/getting-started/foundations), [color tokens](https://primer.style/foundations/color/base-scales), [typography](https://primer.style/foundations/typography), [primer/primitives](https://github.com/primer/primitives).

### 14.2 What we already match (no action)

- Centralized `@theme` in Tailwind v4 (not `tailwind.config.js`)
- CSS `@utility` layer instead of React component library — appropriate for Vite marketing LP
- `btn-primary` / `focus-ring` / `prefers-reduced-motion`
- i18n as copy canon; golden-legacy regression contracts
- Navbar drawer engineering (scroll-lock, focus trap)

### 14.3 Explicit non-adoptions

| Primer / industry pattern | Why skip for this repo |
|---------------------------|------------------------|
| `@primer/react` | Brand mismatch, bundle size, LP scope |
| Light/dark + 9 a11y themes | Single-brand LP; no product shell |
| Figma ↔ code token pipeline | No Figma workflow; `@theme` is SOT |
| Style Dictionary build | Overkill for one LP + checkout pages |
| Octicons migration | Lucide already consistent; document sizes only |
| Logo wall / testimonial carousel | Unverified assets rejected in §9 |

### 14.4 Maturity ladder

```text
v0.85  audit
v0.95  utilities + CTA + a11y fixes
v0.97  functional tokens + type scale   ← Phase 5
v0.98  nav + checkout parity            ← Phase 6
v1.0   QA gates + icon/spacing docs     ← Phase 7–8
v1.1   hygiene (CI grep, a11y record, feedback/legal utilities)  ← current
```

---

## Related documents

| Document | Role |
|----------|------|
| [docs/INDEX.md](INDEX.md) | Document index — this file listed under §2 |
| [docs/golden-legacy-standard.md](golden-legacy-standard.md) | Regression contracts — update after stat/copy/section changes |
| [docs/language-guidelines-en-lt.md](language-guidelines-en-lt.md) | Brand naming and LT/EN tone |
| [docs/design/logo-favicon.md](design/logo-favicon.md) | Logo colors and Kiss–Marry–Kill for icons |
| [AGENTS.md](../AGENTS.md) | Agent orchestration — frontpage UI polish entry point |
