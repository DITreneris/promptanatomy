# GEO citation scorecard — 2026-09

**Goal:** Measure whether AI / search answer systems cite `promptanatomy.app`, spokes, or founder-owned content for brand and category prompts.

**Scoring:** `Y` = owned URL cited (hub / spoke / founder Medium). `Partial` = brand or product named, no owned URL. `N` = generic concept, wrong entity, or competitors only. Claude is operator extra (not a template column) — notes only.

**Run note:** Web-index precheck 2026-09-04. Engine fill complete same day (operator paste). **EN #1–15 + LT #16–23 complete** (92/92 template cells + Claude extras). Do not treat web precheck as AI citation evidence.

Prior incomplete Aug fill: [geo-citations-2026-08.md](geo-citations-2026-08.md).

---

## Session meta

| Field | Value |
|-------|-------|
| Month | 2026-09 |
| Operator | Tomas / Cursor |
| Date run | 2026-09-04 (web precheck + engines EN #1–15 + LT #16–23 complete) |
| Hub deploy SHA (optional) | — |
| Scope | Horizon B.1 monthly; post A.6 / A.3b close |

---

## Web-index precheck

| Query | Result |
|-------|--------|
| `Prompt Anatomy promptanatomy.app` | Hub `promptanatomy.app` first; `.cloud`, `.blog` also surface. Synthesis: AI training hub; Six-Block canon; spokes Quick mode. |
| `Prompt Anatomy Starter Core pricing` | Hub + `/lt`; Starter **39 EUR** / Core **99 EUR**, lifetime, modules 1–3 / 1–6 accurate. Unrelated “Starter Plan” products also compete in SERP. |
| `Kas yra Promptų Anatomija promptanatomy.app` | `/lt` + hub + `.blog`; LT brand resolves. Local competitors (e.g. Promptas.LT) appear on generic DI mokymai queries. |
| `Tomas Staniulis Prompt Anatomy` | `.blog` about / LinkedIn founder path visible in prior runs; reconfirm on engine run. |
| `prompt engineering course Lithuania` | Competitive; hub may appear alongside generic LT training providers. |
| `Prompt Anatomy ecosystem cloud info space help` | Hub llms / ecosystem copy + `.cloud` / `.blog` discoverable. |

---

## Fixed prompt set (EN)

| # | Prompt | ChatGPT | Perplexity | Gemini | Google AI | URL cited | Notes |
|---|--------|---------|------------|--------|-----------|-----------|-------|
| 1 | What is Prompt Anatomy? | Partial | N | N | N | none | Generic PE anatomy; GPT names a platform, no URL |
| 2 | Prompt Anatomy AI training system | Partial | Y | Y | Y | `.app`, `.blog`, spokes | Product retrieval; 5-block / 6-module drift |
| 3 | Prompt Anatomy course pricing Starter Core | Partial | N | N | Y | Google: 39/99 on “Blog”; Claude (extra): `.app` no prices | Learn Prompting collision; 399 mixup |
| 4 | prompt engineering course Lithuania | Partial | N | Partial | N | none | Promptas.LT / NobleProg / TKA win |
| 5 | context architecture AI winners 2026 | N | N | N | N | none | Founder Medium not cited; vendors/awards win |
| 6 | Tomas Staniulis Prompt Anatomy | Partial | Y | Partial | Partial | `.blog`, `.space`; Claude extra: `.app`+`.blog` split | Founder linked; Claude splits .app vs .blog |
| 7 | Prompt Anatomy vs random ChatGPT prompting | Partial | N | N | N | none | GPT product-style; others generic PE |
| 8 | Best prompt engineering training for business workflows | Partial | N | N | N | none (GPT names PA, no URL) | Broad category; GPT #1 pick; catalogs win |
| 9 | What is context engineering for AI agents? | N | N | N | N | none | Generic; Anthropic/industry; PA uncited |
| 10 | promptanatomy.app training modules | Partial | Y | Y | Y | `.app` `/anatomy/` | P: Six-Block names right, M7–15 “later”; GPT: M1–12 no URL |
| 11 | Prompt Anatomy ecosystem cloud info space help | Partial | Y | Y | Partial | `.app` + spokes + `.site` | P/Gemini map; GPT/Google scramble spoke jobs |
| 12 | How to get access to Prompt Anatomy training magic link | Partial | Y | Y | Y | `.app` | FAQ is Check in-browser (no email); engines invent inbox |
| 13 | AI automation prompt library for HR and marketing | N | N | N | N | none | Category miss; AIHR/Klaviyo/etc. not `.help`/`.space` |
| 14 | Beyond the Chatbox Prompt Anatomy Medium | Y | N | Partial | N | GPT: founder Medium | Google cites other Medium “anatomy” posts |
| 15 | Is Prompt Anatomy a subscription or one-time purchase? | Partial | Y | Y | Partial | `.app` 39/99 lifetime | GPT correct no URL; Google $10.99 + 3D atlas mix |

---

## Fixed prompt set (LT)

| # | Prompt | ChatGPT | Perplexity | Gemini | Google AI | URL cited | Notes |
|---|--------|---------|------------|--------|-----------|-----------|-------|
| 16 | Kas yra Promptų Anatomija? | N | Y | N | Y | `.cloud` (P, Google); FB founder | Bare LT brand → Enter spoke; GPT/Claude/Gemini miss |
| 17 | Promptų Anatomija DI mokymai kaina | N | N | N | Partial | none (Google: FB) | Promptas.LT / Braight win; Google only 399 workshop |
| 18 | promptų inžinerijos kursas Lietuva | N | N | N | N | none | Promptas.LT / VCS / catalogs; zero PA |
| 19 | konteksto inžinerija DI agentai | N | N | N | N | none | Same miss as EN #5/#9; Promptas.lt in Google |
| 20 | Tomas Staniulis Promptų Anatomija | Partial | Y | Partial | Y | `.cloud` (P); `.blog` (Google) | Founder hit; Claude miss; Promptas.LT leak |
| 21 | Kaip patekti į Promptų Anatomija mokymus? | Partial | N | Y | Partial | Gemini: `.lol` + Telegram; GPT names `.app` | Braight collision; no Check/magic-link FAQ |
| 22 | Starter ar Core Promptų Anatomija | Partial | Y | Partial | N | `.cloud` (P) | Method/course levels ≠ 39/99 Stripe |
| 23 | Promptų Anatomija ekosistema Cloud biblioteka | Partial | Y | Partial | Y | `.cloud` (P, Google); `.blog` (Google) | Enter hit; `.info` Use library not named; Claude N |

---

## Engine fill notes (#1–15, EN complete)

Canon check: Six-Block = Meta, Input, Output, Reasoning, Quality, Advanced. Checkout = Starter **39 EUR** (M1–3) / Core **99 EUR** (M1–6), lifetime. Training prod = M1–12. Team **399 €** = IVS workshop, not a Stripe SKU. `promptanatomy.online` is not in ecosystem canon.

### #1 What is Prompt Anatomy?

| Engine | Score | What happened |
|--------|-------|----------------|
| ChatGPT | Partial | Names a learning platform; layers Input / Context / Reasoning / Quality / Advanced (Quick-mode-ish, missing Meta/Output). No URL. |
| Perplexity | N | Generic PE table; cites ai360xpert / theinfinity / seekvana / vogueai. |
| Gemini | N | Generic Role / Context / Task / Format / Guardrails / Examples. |
| Google AI | N | Generic five blocks; Prompt Engineering Guide + The Little AI Company Guide. |
| Claude (extra) | N | Generic PE; Anthropic docs; asks if a specific tool. |

Bare brand query does not retrieve the product except a ChatGPT Partial.

### #2 Prompt Anatomy AI training system

| Engine | Score | What happened |
|--------|-------|----------------|
| ChatGPT | Partial | Training ecosystem recognized; invents 5 “levels”; no URL. |
| Perplexity | Y | `.app` + `.blog`; 5- or 6-block; 500–600+ library; certificate ≥70%. |
| Gemini | Y | Founder; 9-domain map mostly right (`.app`–`.lol`); `.site` Anatomizer. Drift: invented 6-block labels; “6-module” course; `promptanatomy.online` not in canon. |
| Google AI | Y | Founder; 5-part Role/Context/Reasoning/Output/QC (Quick mode); Blog + App named. |
| Claude (extra) | N | Misread as fine-tuning / RLHF prompt anatomy. |

Product-framed query unlocks hub/spoke citation. Methodology labels still drift to Role/Context Quick mode.

### #3 Prompt Anatomy course pricing Starter Core

| Engine | Score | What happened |
|--------|-------|----------------|
| ChatGPT | Partial | Advises 39 / 99 / Team 399 as a third public SKU; no URL. 39/99 happen to match. |
| Perplexity | N | Wrong entity: Learn Prompting + GEO SaaS (KIME / Peec / Profound). Claims no Starter/Core course. |
| Gemini | N | Generic €150–750 / €1.2k–3.5k bands. |
| Google AI | Y | 39 / 99 EUR, M1–3 / M1–6, lifetime, Stripe, magic link. Attributes pricing to **Blog** not `.app`. |
| Claude (extra) | Y | Finds `.app`; M1–3 / M1–6, 500+, 6-block, 70%, Telegram, lifetime. Prices not extracted (JS widget). Mixes 399 € “Pilot” 15-min demo. |

Commercial facts are fragile: Google has the numbers on the wrong host; Perplexity collides with Learn Prompting; 399 leaks as a checkout tier.

### #4 prompt engineering course Lithuania

| Engine | Score | What happened |
|--------|-------|----------------|
| ChatGPT | Partial | Lists Prompt Anatomy first, then Promptas.LT / NobleProg / Vilnius Coding School / LINEŠA; no URL; then SEO keyword advice. |
| Perplexity | N | Promptas.LT (prices + contact), BKA 68h / 867 EUR, Unichrone, TKA, NobleProg. Zero PA. |
| Gemini | Partial | NobleProg first; then Promptų Anatomija as local LT interactive program; no URL. VU / DevEducation / DeepLearning.AI. |
| Google AI | N | NobleProg, VU Kaunas Faculty, The Knowledge Academy. Zero PA. |
| Claude (extra) | N | NobleProg, TKA (€2295), DevEducation, Anthropic free. Zero PA. |

Category query is a miss. Local competitor **Promptas.LT** and catalog trainers (NobleProg, TKA) own the answer. Matches Aug web precheck.

### #5 context architecture AI winners 2026

Target: founder Medium [Context Architecture Will Define AI Winners in 2026](https://medium.com/@tomas.staniulis76/context-architecture-will-define-ai-winners-in-2026-73b0dadab300) (also in hub `CREATOR_PUBLICATIONS`).

| Engine | Score | What happened |
|--------|-------|----------------|
| ChatGPT | N | Thesis-echo essay (context layer / routing / memory / governance / observability; BARC study). No Prompt Anatomy, no Tomas, no Medium URL. |
| Perplexity | N | Wrong entity: Pinnacle Awards (Veryon, Airia, Teleport) + long-context models (Llama 4 Scout, Gemini, Claude). |
| Gemini | N | Generic 5-layer stack; winners = MCP, Letta/Mem0, LangGraph, Atlan, GraphRAG. |
| Google AI | N | Wrong entity: Prizm / DQLabs, Atlan, Alation, Collibra, data.world. |
| Claude (extra) | N | Ambiguous (building awards vs AI); Substack / Rick's Cafe AI; asks for clarification. |

Zero owned citation. GPT restates the 2026 thesis without attribution. Catalog engines pick data-platform vendors or award lists.

### #6 Tomas Staniulis Prompt Anatomy

| Engine | Score | What happened |
|--------|-------|----------------|
| ChatGPT | Partial | Founder of Prompt Anatomy; trainer/consultant; invents “RCTF”. No URL. |
| Perplexity | Y | Lithuania founder; cites `promptanatomy.blog` + `.space` + LinkedIn. Also cites **promptas** for LT audit templates. |
| Gemini | Partial | Lithuanian trainer + named framework; generic Role/Context/Task/Constraints/Examples/Format. No URL. |
| Google AI | Partial | Founder of Prompt Anatomy (paste truncated). Wrong six elements: Role/Context/Goal/Constraints/Format/Evaluation. No URL. |
| Claude (extra) | Y | Cites `.blog` (founder) **and** `.app` (6-block training) but treats them as **possibly unrelated** — entity split. |

Founder query retrieves the person. Hub and blog are not one graph: Claude cannot confirm Staniulis owns `.app`. Methodology still not Six-Block.

### #7 Prompt Anatomy vs random ChatGPT prompting

| Engine | Score | What happened |
|--------|-------|----------------|
| ChatGPT | Partial | Product-style contrast; layers Input/Context/Reasoning/Quality/Advanced. No URL. |
| Perplexity | N | Lowercase “prompt anatomy”; TCOF / ROLE→GOAL; promptquorum etc. Educator template. |
| Gemini | N | Named as a method vs random chat; generic Role/Persona stack. No product/URL. |
| Google AI | N | Generic vs OpenAI Prompt Guide / Anatomy of a Prompt Guide. |
| Claude (extra) | N | Generic structured vs random; Anthropic docs. |

Without “training” or a domain, the vs-random prompt collapses to generic PE (same failure as #1).

### #8 Best prompt engineering training for business workflows

Perplexity backfilled from the #9 paste (same Coursera/Iternal list as Claude’s #8).

| Engine | Score | What happened |
|--------|-------|----------------|
| ChatGPT | Partial | **#1 pick Prompt Anatomy** (workflows not prompt lists); then Coursera. No URL. |
| Perplexity | N | SkillsBooster / Iternal / Vanderbilt / DataCamp. Zero PA. Vilnius educator angle. |
| Gemini | N | SkillsBooster / Anthropic / SSGI / DataCamp / DeepLearning.AI. Zero PA. |
| Google AI | N | LinkedIn Learning, Vanderbilt, UCD Copilot, Brain. Zero PA. |
| Claude (extra, two pastes) | N | Same catalog set; second paste Anthropic-only. Zero PA. |

Broad “best training” catalogs win except ChatGPT, which ranks the product first without a link.

### #9 What is context engineering for AI agents?

| Engine | Score | What happened |
|--------|-------|----------------|
| ChatGPT | N | Solid generic definition (memory/RAG/tools/state); cites Anthropic. No PA, no Tomas, no Medium. |
| Perplexity | N | **Answered #8** (Coursera/Iternal list), not this prompt. |
| Gemini | N | Generic RAM/RAG/memory stack; PE vs CE table. No PA. |
| Google AI | N | Generic ecosystem + Write/Select/Compress/Isolate. No PA. |
| Claude (extra) | N | Generic context-window budget; one level above PE. No PA. |

Same miss as #5: founder “context architecture / context engineering” thesis is in the air; owned URLs are not.

### #10 promptanatomy.app training modules

Canon: training prod **M1–12**; Stripe Starter **1–3** / Core **1–6**; M7–9 / M10–12 = operator grants, not “coming later.” Six-Block = Meta, Input, Output, Reasoning, Quality, Advanced.

| Engine | Score | What happened |
|--------|-------|----------------|
| ChatGPT | Partial | M1–6 / M7–9 data / M10–12 agents (directionally right). Names PromptAnatomy.app at the end. No URL. |
| Perplexity | Y | `.app` `/anatomy/`, 39/99, magic-link return path. **Six-Block labels correct.** Wrong: active catalog is only 1–6; “M7–15 coming later.” |
| Gemini | Y | `.app`; M1–12 + `.ceo`/`.space`/`.pro`. Invented module titles; 6-block labels wrong; “15+ templates.” |
| Google AI | Y | 12 modules, Six-Block Canvas, click-and-do, M1–6 / M7–9 data / M10–12 agents. |
| Claude (extra) | Y | `.app` Starter/Core 1–3/1–6, 500+, 70%, Telegram. Warns `.pro`/`.site` may be lookalikes. No M7–12. |

Domain in the prompt unlocks hub citation. Checkout max 6 still overwrites prod 12 except Google/GPT.

### #11 Prompt Anatomy ecosystem cloud info space help

Canon spokes: `.cloud` Enter, `.info` Use (library), `.space` Create, `.help` Hire, plus `.ceo`/`.pro`/`.blog`/`.lol`; `.site` discovery.

| Engine | Score | What happened |
|--------|-------|----------------|
| ChatGPT | Partial | Names five domains; **wrong jobs** (`.info` = knowledge, `.help` = FAQ, `.cloud` = library). No https. |
| Perplexity | Y | Hub + `.cloud`/`.space`/`.site`/`.info`/`.blog`; 39/99; Telegram; info@; Alameda address. Best map this run. |
| Gemini | Y | Enter/Use/Create/Hire/Manage/Deepen mostly right; `.app` as 6-module; 6-block labels invented. |
| Google AI | Partial | `.cloud`/`.blog`/`.app` named; roles scrambled (`.app` = team practice). Generic 5-part. |
| Claude (extra) | N | Did not parse the query (asked for clarification). |

Keyword dump of spoke names retrieves the graph for Perplexity/Gemini; ChatGPT/Google still mis-assign `.info`/`.help`.

### #12 How to get access to Prompt Anatomy training magic link

FAQ SOT: Pricing → checkout email → **Check** → **Go to training**. Link opens **in the browser — it is not emailed.**

| Engine | Score | What happened |
|--------|-------|----------------|
| ChatGPT | Partial | Knows email + magic link; invents inbox/spam; says no public help page (FAQ exists). No URL. |
| Perplexity | Y | Pricing → Check → Go to training → `/anatomy/`; 39/99; info@. Invents **emailed** link + 5‑minute wait. |
| Gemini | Y | Names `.app`. Invents Sign In / “Send Magic Link” / emailed single-use link. |
| Google AI | Y | Names `.app` (LT DI). Invents “Send Magic Link” email; **M7–9 tester** mail to info@ is not hub FAQ. |
| Claude (extra) | Y | Closest to FAQ: email check from Pricing, in-browser, no password, Telegram. |

Product+access query retrieves `.app`. The emailed-login myth is the accuracy failure.

### #13 AI automation prompt library for HR and marketing

Target spokes: `.help` (Hire / HR) and `.space` (Create / marketing). Not in hub sitemap by design.

| Engine | Score | What happened |
|--------|-------|----------------|
| ChatGPT | N | DIY HR prompt pack (JD, screening, interview). No PA, no spokes. |
| Perplexity | N | Catalog: AITraining2U, Klaviyo, Rippling, ValueX2, AttendanceBot, etc. Zero PA. |
| Gemini | N | Generic ROLE/CONTEXT automation templates (ATS/HRIS/campaigns). No PA. |
| Google AI | N | LT P-C-T-F templates; cites Employment Hero, AIHR, GitHub AICMO. Zero PA. |
| Claude (extra) | N | Paste truncated; started building a library, no citation. |

Same class as #4/#8: category query without the brand. Spoke GEO is not winning “HR/marketing prompt library.”

### #14 Beyond the Chatbox Prompt Anatomy Medium

Target: founder Medium [Beyond the Chatbox: Mastering the Prompt Anatomy AI Operating System](https://medium.com/@tomas.staniulis76/beyond-the-chatbox-mastering-the-prompt-anatomy-ai-operating-system-ad955724804e) (`CREATOR_PUBLICATIONS`).

| Engine | Score | What happened |
|--------|-------|----------------|
| ChatGPT | Y | Exact hit: Tomas Staniulis, 19 Mar 2026, 6-block (Meta/Input/Output/Reasoning/Quality/Advanced). “Read it on Medium.” |
| Perplexity | N | Generic “beyond the chatbox” / event-trigger prompts. No Tomas URL. |
| Gemini | Partial | Drafts a new article using “Prompt Anatomy”; 6-block labels wrong. Does not retrieve the live post. |
| Google AI | N | Other Medium posts (design-bootcamp, Hilda Voquendo, “anatomy of a prompt”). Zero founder. |
| Claude (extra) | N | Asked for clarification; did not retrieve. |

First founder-Medium **Y** this month (ChatGPT only). Title+author in the prompt is enough for GPT; Google still collides with generic Medium “prompt anatomy.”

### #15 Is Prompt Anatomy a subscription or one-time purchase?

Canon: Stripe Starter **39 EUR** / Core **99 EUR**, one-time, lifetime. Not a subscription. 399 € = IVS workshop. Spoke PDFs (`.help`/`.ceo`) are separate one-time SKUs, not hub plans.

| Engine | Score | What happened |
|--------|-------|----------------|
| ChatGPT | Partial | 39/99 one-time, Stripe one-time prices. No URL. |
| Perplexity | Y | `.app` Starter/Core, one-time, lifetime, magic-link return. Mentions other one-time kits. |
| Gemini | Y | `.app` Stripe one-time lifetime; `.blog`/`.site` free. Treats `.space`/`.ceo` as paid kits (`.ceo` PDFs yes; `.space` usually free). |
| Google AI | Partial | One-time direction right; cites `.blog`/`.space` **and** anatomy3datlas.com. Invents **$10.99** combo. Misses 39/99. |
| Claude (extra) | Y | `.app` one-time lifetime; Starter 1–3 / Core 1–6; upgrade path. No euro amounts. |

Commercial fact is retrieved when the product is named. Google still collides with unrelated “Anatomy” + spoke PDF prices.

---

## Engine fill notes (LT #16–23)

Canon (same as EN): Six-Block = Meta, Input, Output, Reasoning, Quality, Advanced. Checkout = Starter **39 EUR** / Core **99 EUR**. Training prod = M1–12. Enter spoke `.cloud` teaches Quick-mode 5-part (Role/Context/Reasoning/Output/QC) — not hub Six-Block.

### #16 Kas yra Promptų Anatomija?

| Engine | Score | What happened |
|--------|-------|----------------|
| ChatGPT | N | Generic PE anatomy (Rolė / Kontekstas / Užduotis / Apribojimai / Formatas + pavyzdžiai). No product, no URL. |
| Perplexity | Y | Generic PE first, then **LT product**: `promptanatomy.cloud`, 5-part schema, send checklist, library, quiz. |
| Gemini | N | Refusal: text-only AI, cannot help on this question. |
| Google AI | Y | Product retrieval: AI training for teams/managers; cites `promptanatomy.cloud/lt/` + Facebook founder post; 5-part + checklist + library. |
| Claude (extra) | N | Generic PE anatomy (role / background / rules / few-shot / CoT / format). No brand product, no URL. |

Bare LT brand retrieves **Enter spoke** (P/Google), not hub `/lt`. GPT/Claude stay generic (worse than EN #1 GPT Partial). Gemini hard-miss via refusal. Methodology labels = Quick mode, not Six-Block.

### #17 Promptų Anatomija DI mokymai kaina

Canon: Stripe Starter **39 EUR** / Core **99 EUR** on `.app`. **399 €** = IVS workshop (not a public Stripe SKU).

| Engine | Score | What happened |
|--------|-------|----------------|
| ChatGPT | N | **Wrong entity:** Braight „ChatGPT promptų anatomija“ at **22,50 €** (50% off 45 €). Zero PA. |
| Perplexity | N | **Wrong entity:** attributes Promptų Anatomija to **Promptas.LT**; 39–110 € bands; cites promptas.lt + phone. Zero PA. |
| Gemini | N | Generic bands only (A: 150–450 / B2B 800–1500; B: 250–450 / B2B 1200–2500+). No product, no URL, no 39/99. |
| Google AI | Partial | Names **Tomas Staniulis** Promptų anatomija LIVE **399 EUR** (workshop, not checkout); Facebook posts. Also Braight + Promptas.lt 49–99 + VCS 299. **Misses hub 39/99.** No `.app`. |
| Claude (extra) | N | **Wrong entity:** Braight product page error; Promptas.LT 39–110; generic 70–300. Suggests braight.lt. Zero PA. |

Pricing query is a hard miss vs EN #3 (where Google at least had 39/99 on wrong host). LT engines collide with **Promptas.LT** and **Braight**; Google surfaces only the 399 workshop via Facebook.

### #18 promptų inžinerijos kursas Lietuva

Same class as EN #4. Category query without brand.

| Engine | Score | What happened |
|--------|-------|----------------|
| ChatGPT | N | **#1 pick Promptas.LT** (39–110 €); then VCS 867 €; BIT 600 €; LINEŠA. Zero PA (worse than EN #4 Partial). |
| Perplexity | N | Promptas.LT / AIcademy / BKA 867 / NobleProg / AI Training Hub / VU. Zero PA. |
| Gemini | N | Catalog: VCS / CodeAcademy / Turing / Verslo žinių / KTU–VILNIUS TECH + DeepLearning.AI / LearnPrompting. Zero PA. (Same body as one Google Overview paste.) |
| Google AI | N | AI mode: Promptas.lt / AIcademy / WhyAI / VCS / BKA / AI Training Hub. Zero PA. |
| Claude (extra) | N | Promptas.LT DigComp/AI Act; VCS/BKA 68h; ChatGPTkursai.lt. Zero PA. |

LT category miss is **4×N** (all engines). Competitor **Promptas.LT** owns GPT/P/Claude; Gemini/Google lean academy catalogs. Matches Aug web precheck + EN #4 (EN at least had GPT Partial naming PA).

### #19 konteksto inžinerija DI agentai

Same class as EN #5 / #9. Target thesis lives off-hub (founder Medium / context architecture); LT query does not retrieve it.

| Engine | Score | What happened |
|--------|-------|----------------|
| ChatGPT | N | Strong generic definition (system + memory + RAG + tools + state); PE vs CE contrast. No PA, no Tomas, no Medium. |
| Perplexity | N | Generic pillars (instructions / RAG / memory / tools / MCP); JIT logistics metaphor. Mentions vague MasterClass at end — not PA. Zero owned URL. |
| Gemini | N | Deep generic essay: 4 context blocks, pruning, multi-tier memory, tool schemas, Lost-in-the-Middle. No PA. |
| Google AI | N | Generic + cites Microsoft AI-agents LT README, teise.pro, Turing, **promptas.lt** multi-agent, Integral Solutions, OpenAI. Zero PA. |
| Claude (extra) | N | Generic (Anthropic “high-signal tokens”); Sourcegraph / Towards AI / Mem0 / Metacto / AGENTS.md. No PA. |

Thought-leadership miss continues in LT. Google even surfaces **Promptas.LT** on a context-engineering query.

### #20 Tomas Staniulis Promptų Anatomija

Same class as EN #6. Founder+brand query.

| Engine | Score | What happened |
|--------|-------|----------------|
| ChatGPT | Partial | Knows founder↔product but frames as **weak brand-search audit** (~4/10); LinkedIn crumbs; names `promptanatomy.app` as SEO fix, not a cited source. Braight-term collision noted. |
| Perplexity | Y | Founder + method; cites **`promptanatomy.cloud/lt`** + LinkedIn. 5–6 block Quick mode. Wrong: teaches via **Promptas.LT**. |
| Gemini | Partial | Founder + training program; invents 6 PE elements (Role/Context/Task/Constraints/Format/Examples). No URL. |
| Google AI | Y | Founder + methodology; cites **`promptanatomy.blog/about`**, Facebook, LinkedIn. Wrong: also Promptas.lt / Countline. No `.app`. |
| Claude (extra) | N | **Not found** — asks if wrong person / needs a link. Worse than EN #6 Claude Y (entity split). |

Founder query retrieves person+product for P/Google/Gemini/GPT. Hub `.app` still absent; Enter/Deepen spokes + social win. **Promptas.LT** affiliation leak on P/Google. Claude fails entity entirely.

### #22 Starter ar Core Promptų Anatomija

Canon: Stripe **Starter 39 EUR (M1–3)** / **Core 99 EUR (M1–6)** on `.app` — commercial plans, not methodology intensity or course naming.

| Engine | Score | What happened |
|--------|-------|----------------|
| ChatGPT | Partial | Product-named course levels: Starter = beginner PE blocks; Core = iterations/reasoning/workflows. Advises Core as main module. No URL, no 39/99. |
| Perplexity | Y | Cites **`promptanatomy.cloud`**. **Wrong product:** Starter = 2–3 of 5 blocks; Core = all 5 (client/exec risk). Zero 39/99, zero `.app`. |
| Gemini | Partial | Starter vs Core as lead-magnet vs B2B flagship positioning; invents 6-block depth split. No URL, no prices. |
| Google AI | N | Misreads as generic **“Core Prompt” formula** (Role/Task/Context/Constraints/Format/Examples). No plans, no PA product. |
| Claude (extra) | N | Does not retrieve product — offers to explain starter vs core prompts or write a guide. |

Commercial plan-compare fails across the board: only Perplexity hits an owned host, and it maps Starter/Core to Quick-mode intensity. GPT/Gemini invent curriculum tiers. Same fragility as EN #3 / LT #17.

### #23 Promptų Anatomija ekosistema Cloud biblioteka

Canon: `.cloud` = Enter (lesson + copy prompts); **Use library** = `.info`. Hub maps spokes; not a Git/API SaaS vault.

| Engine | Score | What happened |
|--------|-------|----------------|
| ChatGPT | Partial | Acknowledges PA ecosystem + Cloud library; asks what to build. No URL, no spoke map. |
| Perplexity | Y | Cites **`promptanatomy.cloud/lt/`**; copy-ready library; Telegram; blog; 6-module app. Drift: invented Entry→Utility→Core→Strategy→Lab lifecycle + “9 domains”; maps “biblioteka” to `.cloud` not `.info`. |
| Gemini | Partial | Invents enterprise Cloud vault (JSON/YAML, semver, sandbox, n8n API). Product-named 6-block; no owned URL. |
| Google AI | Y | Cites **`promptanatomy.cloud`** + **`.blog/about`**; 5-part + Cloud library + quick send check. |
| Claude (extra) | N | Does not retrieve — asks if product or build brief. |

Keyword dump of brand + Cloud + biblioteka retrieves Enter spoke (P/Google). **Use `.info` never named.** Gemini hallucinates platform architecture.

### #21 Kaip patekti į Promptų Anatomija mokymus?

FAQ SOT: Pricing → checkout email → **Check** → **Go to training**. Link opens **in the browser — not emailed.**

| Engine | Score | What happened |
|--------|-------|----------------|
| ChatGPT | Partial | Names **`promptanatomy.app`** + info@. Invents free intro + **M7–9 Core tester / M10–12 tester** grants. No Check / magic-link FAQ. |
| Perplexity | N | **Not found** — suggests AIcademy / better search. Zero PA. |
| Gemini | Y | Owned paths: **`promptanatomy.lol`**, `t.me/prompt_anatomy`, LinkedIn Tomas. **Wrong host** for training (should be `.app` Check). |
| Google AI | Partial | **Braight** for self-serve + Facebook Tomas for B2B (“rašyk noriu”). No `.app`. |
| Claude (extra) | N | **Wrong entity:** Braight membership unlock only. |

Access query is fragile in LT: Braight steals Claude/Google; Perplexity blanks; Gemini sends users to **`.lol`**; GPT knows `.app` but invents tester tiers and skips Check.

---

## Summary

| Metric | Value |
|--------|-------|
| Prompts run in target AI engines | **23 / 23** (92 of 92 template cells). EN + LT complete. |
| Hub `.app` citations (Y) | 14 cells EN. LT hub Y: **0** (GPT #21/#20 name `.app` without cite → Partial) |
| Spoke / `.site` citations | LT: `.cloud` #16/#20/#22/#23; `.blog` #20/#23; **`.lol` #21 Gemini**. `.info` Use: 0 |
| Medium / LinkedIn founder content | #14 ChatGPT Y (EN). LT: LinkedIn #20; Facebook #16/#17/#20/#21. Medium 0 on LT. |
| Zero-citation prompts | LT **#18–19 4×N**; #17/#21 mostly competitor/blank. |
| Top failure pattern | LT bare brand → `.cloud` not `.app`. Pricing/category → Promptas.LT / Braight. Starter/Core ≠ 39/99. Access → Braight / `.lol`. Context eng → generic. |

**Actions (do not expand hub sitemap):**

1. **`[B.1]` closed** for 2026-09; next cadence ~2026-10.
2. Off-site / FAQ if gaps persist: product vs generic; sameAs founder+`.app`+`.blog`; **LT vs Promptas.LT / Braight**; 39/99 on `.app`; Six-Block vs Quick mode; 399 = workshop; Medium inbound; magic link not emailed; M1–12 vs checkout; spoke roles; **`.info` vs `.cloud` “biblioteka”**; access CTA Check path.
3. Keep spoke GEO on `[B.3]` (other repos).

---

## Partial LT analysis (2026-09-04)

**Scope:** 8/8 LT prompts, 32 template cells (+ Claude extras).

**What retrieves:** bare brand / founder / Cloud (#16, #20, #23) → Enter `.cloud` or `.blog`. Gemini #21 → `.lol`.

**What misses:** pricing (#17), Lithuania category (#18), context engineering (#19), commercial Starter/Core (#22 accuracy), access FAQ (#21). Hub `.app` never Y in LT.

**Do not:** expand hub sitemap. **Do:** sameAs entity graph; FAQ Check path in LT surfaces; disambiguate vs Braight/Promptas.LT; keep 39/99 on `.app`.

---

## Partial EN analysis (2026-09-04)

**Scope:** 15/23 prompts, 60 template cells. **Superseded for full-month view:** see Partial LT analysis + Summary above (23/23 complete 2026-09-04).

**What retrieves:** named product + training/domain (#2, #6, #10–12, #15). Perplexity 6 Y, Gemini 5, Google 4, ChatGPT 1 Y (Medium #14) and 11 Partial (knows the product, almost never a URL).

**What misses:** bare brand (#1, #7); Lithuania / “best course” / HR-marketing libraries (#4, #8, #13); founder thought-leadership without the article title (#5, #9). ChatGPT often *echoes* the 2026 context-architecture thesis with no byline.

**Accuracy even on Y:** Six-Block labels lose to Role/Context Quick mode; checkout 1–6 overwrites prod M1–12; 399 leaks as a third SKU; magic link invented as email (FAQ is in-browser Check); Claude splits `.app` vs `.blog`; Google collides with Learn Prompting / 3D anatomy atlas / other Medium “prompt anatomy.”

**Do not:** expand hub sitemap. **Do (after LT, if still true):** off-site sameAs so founder + `.app` + `.blog` are one entity; keep Six-Block names in `llms` / spokes; FAQ “we don’t email the link”; spoke GEO for `.help`/`.space` on [B.3].

---

## Related

- Template: [geo-citation-scorecard.md](../../templates/geo-citation-scorecard.md)
- Ops: [seo-geo-operations.md](../../seo-geo-operations.md) §I
- TODO `[B.1]` **closed** 2026-09-04; next ~2026-10
