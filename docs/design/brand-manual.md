# Prompt Anatomy brand manual (spokes)

**Date:** 2026-10-06  
**Updated:** 2026-10-08 — header lockup sits on the left and returns to this spoke (§3.5).  
**Audience:** every spoke and discovery site (`cloud`, `info`, `space`, `help`, `ceo`, `pro`, `blog`, `lol`, `site`)  
**Status:** shared identity contract. Hub landing-page layout stays in [design_system_roadmap2.md](../design_system_roadmap2.md) and [golden-legacy-standard.md](../golden-legacy-standard.md). This file does not restyle the hub.

A spoke keeps its own layout, type scale, and component library. It does not invent a second brand.

---

## 1. What is shared

| Shared | Local to the spoke |
|--------|--------------------|
| Names, descriptor, category | Product layout and page sections |
| Wordmark split and lightning tile | Spacing, radii of cards, shadows |
| Header lockup on the left; click returns to this spoke (§3.5) | Right-side links, language switch, product button colors |
| Navy `#0b1320` + gold `#cfa73a` | Local design-system version number |
| Primary button: bright gold fill, navy label | How many sections, what the product sells |
| OS sans, no webfont | Illustrations and product screenshots |
| Voice rules in §6 | Spoke-only UI copy |
| Entity footer back to `.app` | CSS framework |

Domain roles stay in [ecosystem-canon.md](../ecosystem-canon.md). Do not restyle a spoke so it looks like the hub landing page, and do not restyle the lockup so the spoke looks like a different company.

---

## 2. Names

| Surface | English | Lithuanian |
|---------|---------|------------|
| Public name | **Prompt Anatomy** | **Promptų Anatomija** (capital **A**) |
| Wordmark, two words | **Prompt** + **Anatomy** | **Promptų** + **Anatomija** |
| Descriptor | AI Training System | DI mokymų sistema |
| Category | training system | mokymų sistema |

Use the English name on English pages and the Lithuanian name on Lithuanian pages, including in quotes. Do not mix them in one sentence.

Do not write: Promptu anatomija, Promptų anatomija (lowercase a), Prompts Anatomy, Prompts anatomija, Prompt anatomija.

**AI / DI.** English copy says **AI**. Lithuanian copy says **DI**.

The category is a **training system**. “Operating system” stays inside the founder’s essay titles. Do not put it in a spoke title, badge, or `og:site_name`.

Positioning line, when a spoke needs one sentence (hub hero; do not lengthen it):

- EN: Turn random AI chats into repeatable business workflows.
- LT: Paversk atsitiktinius DI pokalbius į veikiančius verslo procesus.

Hub footer tagline, if a spoke echoes the product rather than its own job: “A training system for working with AI.”

---

## 3. Logo

There is no separate wordmark file. The logo is type plus a tile.

### 3.1 Wordmark

One line. Weight 900 (`font-black`). Tracking tight. No tagline, no version, no badge on the same line.

| Word | Color |
|------|--------|
| Prompt / Promptų | `#0b1320` on a light page, `#ffffff` on a navy page |
| Anatomy / Anatomija | `#cfa73a` on both |

```html
<span style="color:#0b1320;font-weight:900">Prompt </span><span style="color:#cfa73a;font-weight:900">Anatomy</span>
```

On a navy bar the first word is white. The second word stays `#cfa73a`.

### 3.2 Mark (in the page)

Rounded square, not a circle, not a sharp square.

| Piece | Value |
|-------|--------|
| Tile fill | `#0b1320` |
| Tile size | 36px mobile, 40px from `sm` |
| Corner radius | 12px at that size (`rounded-xl`) |
| Border | 1px `rgb(255 255 255 / 0.10)` |
| Bolt | filled lightning, `#cfa73a`, optically centered |

Hub implementation: Lucide `Zap` with `fill-current` inside the tile ([Navbar.jsx](../../frontend/src/components/Navbar.jsx)). A spoke without Lucide copies the bolt path from [favicon.svg](../../frontend/public/favicon.svg) and **recolors it to `#cfa73a` on flat `#0b1320`**. Do not copy the favicon gradient or the favicon yellow. See §8.

### 3.3 Size, clear space, background

- Minimum in-page lockup: 32px tile and 16px wordmark. Below that, show the tile only.
- Clear space on every side: at least the tile height. Do not lock a tagline, flag, or domain name into that space.
- Place the lockup on solid white, solid `#f8fafc`, or solid `#0b1320`. Do not put it on a photograph, a busy gradient, or a colored marketing panel without a solid plate behind it.
- Browser-tab icons (16–32px): flat tile and bolt only. No glow, no texture, no wordmark inside the icon.
- Glow is for a large hero or social image only, never for the header mark or a favicon.

### 3.4 Do not

- Redraw the bolt, outline it, rotate it, or add a drop shadow.
- Recolor either word, or set both words in one color.
- Set the wordmark in all caps.
- Add “by Tomas”, a version number, or “6-Block” into the logo line. The 6-Block badge is hub hero copy, not part of the mark.
- Use a client logo (Pigu, Cgates, and the rest) as if it were Prompt Anatomy. Those marks live only on the hub Trusted-by band, grayscale, `opacity-70`.
- Point the header lockup at `promptanatomy.app`, place it on the right, or open it in a new tab (§3.5).

### 3.5 Header lockup

The lockup sits at the top left of the header. It is the family mark. The click returns to this spoke, in the same tab.

| Piece | Rule |
|-------|------|
| Multi-page spoke | Home of that spoke, in the current language |
| One-page spoke | `#top` or `#main-content` |
| Accessible name | Public name for the page language (§2) |
| Bar | Solid white, solid `#f8fafc`, or solid `#0b1320` |

On a navy bar the first word is white. The second word stays `#cfa73a`.

The right side is the spoke’s own work: section links, a language switch, the spoke’s CTA. A named item there may link to `https://www.promptanatomy.app/` when sending someone to training is that item’s job. Give it its own `utm_medium`. `.blog` uses `nav_training` and `nav_pricing`. The lockup does not carry that link.

The return to the hub stays the entity footer (§6, [sibling_memo.md](../sibling_memo.md)), with `utm_medium=entity_footer`.

`.lol` is a play surface. It does not take this marketing header. When a mark is needed there, the tile alone is enough.

Product button colors stay on the spoke. A violet buy button or a yellow copy control is product chrome. The primary gold button in §4.2 is a separate control. Hub ecosystem rims in §4.4 are not wordmark colors.

Live gaps on 2026-10-08, for the next spoke pass:

| Spoke | What to change |
|-------|----------------|
| `.cloud` | Lockup is on the right and opens `.app` in a new tab (`utm_medium=header`). Move it left. Link to this spoke’s home. |
| `.info` | Hero lockup opens `.app/en` in a new tab, including on `/lt/`. Link to this spoke’s home in the current language. |
| `.help` | Lockup is a hero badge to `.app` (`utm_medium=badge`). Put the lockup in a left header. Keep the hub return in the footer. |
| `.space` | Wordmark is a paragraph, not a link, and the bolt is drawn at 24px. Make it a link to `#top` or `#main-content`. Tile at least 32px. |
| `.blog`, `.pro`, `.ceo`, `.site`, `.app` | Mark already returns home. Keep it. |

---

## 4. Color

Two roles. Do not add a third yellow.

### 4.1 Brand pair (lockup, icons, large accents)

| Token | Hex | Role |
|-------|-----|------|
| `--color-brand-dark` | `#0b1320` | Navy. Headings on light pages, tile fill, dark sections, primary text on gold buttons |
| `--color-brand-accent` | `#cfa73a` | Gold. Second word of the wordmark, bolt, icons, thin accent borders |

Gold tint on a light surface, when a spoke needs a highlighted card or pill (hub recipe):

| Token | Value |
|-------|--------|
| muted fill | `rgb(207 167 58 / 0.15)` |
| muted border | `rgb(207 167 58 / 0.35)` |
| featured border | `rgb(207 167 58 / 0.50)` |

### 4.2 Primary button (brighter gold, navy label)

The button fill is **not** `#cfa73a`. A flat brand-gold button looks dull next to the hub and fails as a label color.

| Stop | Hex |
|------|-----|
| CTA gradient start | `#ffcc33` |
| CTA gradient end | `#ffb300` |
| Direction | 135deg |
| Label | `#0b1320`, weight 900 |
| Minimum height | 44px; 48px for the main action on a page |

```css
background-image: linear-gradient(135deg, #ffcc33 0%, #ffb300 100%);
color: #0b1320;
```

One primary gold button per view. The next action is white with a `#0b1320` border, or a navy fill with white text (hub uses navy for the access “Check” button only). Do not paint every button with the gradient.

Shadow under a gold button is navy elevation (`rgba(11, 19, 32, 0.12)`), not a yellow glow.

### 4.3 Contrast (measured 2026-10-06)

| Pair | Ratio | Use |
|------|-------|-----|
| `#0b1320` on white | 18.61:1 | Body, headings, first word of the wordmark |
| `#ffffff` on `#0b1320` | 18.61:1 | Text on navy bars and dark sections |
| `#cfa73a` on `#0b1320` | 8.19:1 | Gold word and bolt on navy |
| `#0b1320` on `#ffcc33` | 12.35:1 | Button labels |
| `#cfa73a` on white | **2.27:1** | Second word of the wordmark only |

`#cfa73a` on white fails WCAG AA for text (needs 4.5:1, large text 3:1). The hub still paints **Anatomy / Anatomija** in that gold at weight 900. That split is the signature. It is not permission to set links, labels, captions, or body copy in gold on white. Small text stays navy `#0b1320` or ink `#475569` on `#f8fafc` (7.24:1).

On a navy page, gold text is fine (8.19:1).

Focus: on a light page the ring is navy. On a navy page the ring is gold with a navy offset. Do not rely on gold alone to show focus on white.

### 4.4 Hub-only hues (do not adopt as spoke brand)

These are landing-page chrome. A spoke does not recolor its header, buttons, or backgrounds with them.

| Token | Hex | Hub use |
|-------|-----|---------|
| `--color-ecosystem-1` | `#2e9e7e` | Ecosystem card rim |
| `--color-ecosystem-2` | `#7c5cff` | Ecosystem card rim |
| `--color-ecosystem-3` | `#3f6fff` | Ecosystem card rim |
| `--color-ecosystem-4` | `#f38a3f` | Token kept; not a fourth phase accent |
| canvas | `#f8fafc` | Page background |
| ink muted | `#475569` | Body copy |
| success / warning greens and ambers | see `index.css` | Access and checkout feedback |

Light surfaces on the hub match Tailwind slate. A spoke may use the same neutrals. It does not have to.

### 4.5 Yellows that exist in the repo, and which one to copy

| Hex | Where | Spoke rule |
|-----|--------|------------|
| `#cfa73a` | `@theme --color-brand-accent` | **Copy.** Wordmark, bolt, icons |
| `#ffcc33` → `#ffb300` | CTA gradient inside primary buttons | **Copy** for the one primary button |
| `#fbd304` | `favicon.svg` bolt | **Do not copy.** Asset drift (§8) |
| `#f3cc30` | mentioned in `logo-favicon.md` | **Do not copy.** Not a token |

---

## 5. Type

Stack: `ui-sans-serif, system-ui, sans-serif`. No webfont. Inter, Geist, and any hosted font are out of scope ([ADR-0001](../decisions/0001-lp-system-typeface.md)). Windows renders Segoe UI. macOS renders SF Pro. That difference is accepted.

| Role | Weight |
|------|--------|
| Wordmark, primary button | 900 |
| Section titles, column titles | 700–900 |
| Body, tagline, legal | 500 |
| Labels | 700 |

Do not mix 900 and 400 in the same text block. Do not set fine print at 11px.

---

## 6. Voice

Full rules: [language-guidelines-en-lt.md](../language-guidelines-en-lt.md).

- English address is **you**. Lithuanian address is **tu**. Not *jūs*.
- Lithuanian buttons: infinitive (“Rinktis planą”, “Gauti prieigą”).
- Lithuanian headings: *tu* imperative (“Rinkis planą”).
- Short sentences. Errors start with a verb.
- Do not invent testimonials, customer counts, or a second price list.
- Training checkout prices live on `.app` (Starter 39 EUR, Core 99 EUR). A spoke that sells its own PDF keeps that price on the spoke and does not relabel it as the training plan.
- Team workshop **399 EUR** is not a Stripe plan and not a public badge. Name it only when someone asks.
- Entity footer does not include the founder’s name. Contact email, when a spoke shows one: `info@promptanatomy.app`.

### Entity footer

Copy and UTM: [sibling_memo.md](../sibling_memo.md). Required line:

- EN: `Part of Prompt Anatomy · Training & checkout → promptanatomy.app`
- LT (if the spoke has Lithuanian UI): `Promptų Anatomijos ekosistema · Mokymai ir checkout → promptanatomy.app`

Link: `https://www.promptanatomy.app/` with optional `utm_source` = the spoke (`cloud`, `pro`, `site`, `help`, `ceo`, `info`, `space`, `blog`, `lol`) and `utm_medium=entity_footer`. The line is ordinary footer text. No card, no sticky badge, no second “Buy Core” button.

---

## 7. Assets

| Asset | Path | Use |
|-------|------|-----|
| In-page lockup | built in CSS (§3) | Header and footer of every spoke |
| Bolt path | [frontend/public/favicon.svg](../../frontend/public/favicon.svg) | Geometry only; recolor to `#cfa73a` on `#0b1320` |
| Hub social card | `https://www.promptanatomy.app/og-image-v3.jpg` | Hub link previews. Not a spoke header logo |
| Hub JSON-LD image | `https://www.promptanatomy.app/og-image.png` | Organization logo URL on the hub. Not a mark to place in a spoke header |

Spoke social images are the spoke’s own, 1200×630, critical type and the lockup inside the center ~80%. Do not reuse the hub card as the spoke `og:image` unless the page is only a pointer back to `.app`.

`og:site_name`: **Prompt Anatomy** on English pages, **Promptų Anatomija** on Lithuanian pages.

---

## 8. Audit (2026-10-06) — do not copy the drift

The landing page tokens are the color source of truth: [frontend/src/index.css](../../frontend/src/index.css) `@theme`. The navbar lockup matches §3. These files do not.

| Finding | Evidence | Spoke rule |
|---------|----------|------------|
| Favicon yellow is a third gold | [favicon.svg](../../frontend/public/favicon.svg) bolt `#fbd304`. Tile is a gradient `#050d14` → `#103b5a`, radius 8 on a 32 viewBox. Contrast of `#fbd304` on white is 1.46:1. | In-page mark uses `#cfa73a` on flat `#0b1320`. Do not sample the SVG with an eyedropper. |
| Favicon name is wrong | Same file, `aria-label="Prompts anatomija"`. | Use §2 names. |
| Old logo note offered a fourth yellow | [logo-favicon.md](logo-favicon.md) used to list `#CFA73A` or `#f3cc30`, and a flat `#0B1320` tile the SVG does not have. | `#f3cc30` is not a brand color. Sizes and safe zone in that note still apply. |
| JSON-LD Lithuanian name lowercases A | [organization.js](../../frontend/src/site/organization.js) `ORG_NAME_LT = 'Promptų anatomija'`. Visible UI, `og:site_name` on `/lt`, and this manual use **Promptų Anatomija**. | Copy the capital A. Do not copy `ORG_NAME_LT` into a spoke title. |
| Gold word on white fails contrast | `#cfa73a` on white = 2.27:1. Kept on purpose for the second word at weight 900. | Do not extend gold-on-white to small text. |
| Hub ecosystem hues look like a palette | Four hexes in §4.4. | Card rims on `.app` only. |
| Spokes already have local design systems | Enter lesson v3.1, blog Design System 2.1.0, and others. | Keep the local system for layout. Point the lockup, the two golds, the names, and the footer line at this file. |

Favicon alignment (flat navy tile, `#cfa73a` bolt, correct accessible name) is a hub asset change. It is not done in this manual. Until it ships, spokes follow §3, not the SVG paint.

---

## 9. Spoke checklist

- [ ] Header lockup: top left, navy tile, gold bolt, wordmark split, no tagline in the bar
- [ ] Lockup links to this spoke’s home (or `#top` / `#main-content`) in the same tab
- [ ] Bolt and second word are `#cfa73a`, not `#fbd304` or `#f3cc30`
- [ ] One primary button uses `#ffcc33` → `#ffb300` with a navy label
- [ ] Body and links are navy or ink, not gold-on-white
- [ ] Type is the OS sans stack
- [ ] English pages say Prompt Anatomy / AI; Lithuanian pages say Promptų Anatomija / DI / tu
- [ ] Entity footer matches [sibling_memo.md](../sibling_memo.md)
- [ ] `og:site_name` matches the page language
- [ ] Spoke `og:image` is not the hub card used as a logo
- [ ] No client logos, no invented quotes, no extra brand yellow
