# Archyvas

Istorinė arba pasenusi dokumentacija – **ne** kasdieniam operaciniam darbui. Aktyvus SOT → [INDEX.md](../INDEX.md) §1–5.

## Struktūra

| Katalogas | Turinys |
|-----------|---------|
| [analysis/](analysis/) | Vienkartinės analizės, audit planai, memai, diagnostika. |
| [audits/](audits/) | Uždaryti LP / UI / UX / SEO / kalbos auditai. |
| [snapshots/](snapshots/) | Laiko momentu fiksuotos ataskaitos ir ops log'ai. |

---

## analysis/

| Failas | Paskirtis |
|--------|-----------|
| [production-readiness-analysis.md](analysis/production-readiness-analysis.md) | Gili analizė prieš production (2026-03). |
| [pre-launch-audit-2026-08-12.md](analysis/pre-launch-audit-2026-08-12.md) | **Dabartinis** corporate12 paid-traffic gate; operator A.1–A.5. |
| [pre-launch-audit-2026-08.md](analysis/pre-launch-audit-2026-08.md) | M1–9 gate (superseded by 2026-08-12). |
| [anatomija-paid-content-open-analysis.md](analysis/anatomija-paid-content-open-analysis.md) | Kodėl `/anatomija/` buvo atviras. |
| [inzinerija-prieigos-vartos-memo.md](analysis/inzinerija-prieigos-vartos-memo.md) | Memo mokymų komandai: gate, verify-access. |
| [mokymu_komanda_memo.md](analysis/mokymu_komanda_memo.md) | Magic-link handoff training team (pre-integration). |
| [04_atsakymas-marketingo-komandai-memo.md](analysis/04_atsakymas-marketingo-komandai-memo.md) | 2026-03-19 atsakymas marketingo komandai (gate fix). |
| [memo-integration-security-analysis.md](analysis/memo-integration-security-analysis.md) | HMAC magic-link analizė (įgyvendinta; kanonas = access-architecture-canon). |
| [security-audit-deep.md](analysis/security-audit-deep.md) | 2026-03-08 MOSCOW saugumo auditas. |
| [supabase-hardening-plan.md](analysis/supabase-hardening-plan.md) | F0–F7 Supabase planas (dalis įgyvendinta). |
| [pricing-plan.md](analysis/pricing-plan.md) | 2025-03 kainodaros strategija (superseded by phase-1-scope). |
| [diagnostics-dep0169-vercel.md](analysis/diagnostics-dep0169-vercel.md) | Uždaryta DEP0169 `url.parse` diagnostika. |
| [deep-research-report.md](analysis/deep-research-report.md) | 2026-08 ekosistemos auditas (QW items largely done). |
| [0111_Analysis.txt](analysis/0111_Analysis.txt) | Išorinis EN audit dump (overlap; parked items in TODO). |
| [EXECUTIVE_ATASKAITA_PROGRAMOS_1_IKI_15.md](analysis/EXECUTIVE_ATASKAITA_PROGRAMOS_1_IKI_15.md) | Partnerių M1–15 programos brošiūra (2026-03-08). |

## audits/

| Failas | Paskirtis |
|--------|-----------|
| [audit-mobile-ux-user-journey.md](audits/audit-mobile-ux-user-journey.md) | Mobilus meniu, kelionė, LT/EN. |
| [audit-language-en-lt.md](audits/audit-language-en-lt.md) | Gramatika, stilius (ref: language-guidelines). |
| [copy-audit-lp.md](audits/copy-audit-lp.md) | LP copy, „6 blokų“ kartojimai. |
| [home-page-ok-fail-audit.md](audits/home-page-ok-fail-audit.md) | LP OK/FAIL lentelė. |
| [micro-ui-ux-audit.md](audits/micro-ui-ux-audit.md) | Tipografija, spalvos, micro copy. |
| [ux-premium-practices.md](audits/ux-premium-practices.md) | MUST–SHOULD–WANT UI gairės. |
| [UI_UX_SEO_MOSCOW_PLAN.md](audits/UI_UX_SEO_MOSCOW_PLAN.md) | MOSCOW planas (WON'T = no Next/SSR). |

## snapshots/

| Failas | Paskirtis |
|--------|-----------|
| [ecosystem-kpi-2026-08.md](snapshots/ecosystem-kpi-2026-08.md) | QW1b / A.6 partial KPI baseline. |
| [geo-citations-2026-08.md](snapshots/geo-citations-2026-08.md) | QW4a GEO citation scorecard. |
| [pagespeed-2026-08.md](snapshots/pagespeed-2026-08.md) | Lighthouse mobile+desktop baseline. |
| [production-analytics-14d-benchmark.md](snapshots/production-analytics-14d-benchmark.md) | ~14 d. produkcijos metrikos. |
| [gsc-2026-06-04.md](snapshots/gsc-2026-06-04.md) | GSC 28d CTR/pages. |
| [test_report-ops-log.md](snapshots/test_report-ops-log.md) | SSL + „No access found“ incident log (2026-03). |

## Šaknis (archive/)

| Failas | Paskirtis |
|--------|-----------|
| [ANALIZE_KODO_BAZE.md](ANALIZE_KODO_BAZE.md) | Analizė iš ankstyvo laikotarpio. |
| [react.txt](react.txt) | Originalus vieno failo LP snippet (pre-Vite). |
