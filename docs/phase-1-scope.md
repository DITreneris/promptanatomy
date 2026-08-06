# Faze 1 apimtis – produktai ir moduliai

**Data:** 2026-03-08. Šis dokumentas apibrėžia, kas parduodama ir rodoma pirmajame etape.

---

## 0. Scope disclaimer (2026-06-30)

Šis doc aprašo **LP pricing Phase 1** (2 planai Stripe checkout'e). **Training app** produkcijoje – corporate12 bundle **M1–12** (`build:corporate12`); prieiga M7–9 per tier **9**, M10–12 per tier **12** (abu = operator grant, ne Stripe Phase 1). Žr. [golden-legacy-standard.md](golden-legacy-standard.md) §4.

---

## 1. Du produktai (Faze 1)

Pirmajame etape siūlome **tik du planus**:

| Planas | Moduliai | Kaina (pvz.) | Pastaba |
|--------|----------|--------------|--------|
| **1** (Starter) | 1–3 | 39 € | Pirmi trys moduliai |
| **2** (Core) | 1–6 | 99 € | Visi šeši moduliai (pilnas dabartinis kursas) |

- Planai **3** (1–12) ir **4** (1–15) **nėra siūlomi** Faze 1 – jie rodomi kaip užrakinti / vėliau.
- Backend gali priimti tik `plan_id` "1" ir "2" (opcionaliai 400 kitiems).

---

## 2. LP vs training (moduliai 7+)

- **LP pricing / checkout:** rodo **maks. 6** modulius (2 planai); planai 3/4 (12/15) – užrakinti / Phase 2.
- **Training produkcijoje:** M1–**12** (`VITE_MAX_BUILD_MODULE=12`, `build:corporate12`); M7–9 per tier **9**, M10–12 per tier **12** (operator grant), ne per Stripe Phase 1 checkout.
- **M13–15:** corporate15 / ne šiame cutover; LP tekste vengti „12/15 modulių“ kaip *parduodamos* apimties (Stripe vis dar max 6).
- Frontend: planų kortelėse tik 2 planai; `pricing.modulesLocked` – 7+ ne Phase 1 checkout.

---

## 3. Kur tai atspindėta

| Vieta | Pakeitimas |
|-------|------------|
| **Frontend** `Pricing.jsx` | Rodomi tik planai 1 ir 2; konstantos `PHASE1_MAX_MODULES = 6`, `PHASE1_PLANS`. |
| **Frontend** i18n | „15 modulių“ → „6 modulių“; pridėti `pricing.modulesLocked` (7+ locked). |
| **Frontend** `HomePage` / prieiga | „Jau turite“ pilnai – tikrinti `highest_plan >= 6` (ne 15). |
| **Backend** `config` | `PLAN_VALUES` gali būti `(3, 6)` Faze 1; arba palikti (3,6,12,15), bet checkout – tik 1, 2. |
| **Docs** | roadmap.md, pricing-plan.md – nuoroda į šį dokumentą; INDEX – įtraukti phase-1-scope. |

---

## 4. Vėlesnės fazes

**Iki 2027-01-01 (roadmap C2):** viešai lieka Starter/Core (max 6); M7–9 – operator upgrade / cohort / B2B (`highest_plan=9`), ne naujas Stripe „Pro“ checkout. Žr. [roadmap.md](../roadmap.md) Horizon C.

Kai (po decision gate) Stripe parduos daugiau nei Core (6): planai 3/4 (12/15), `PLAN_VALUES`, frontend planų sąrašas — arba optional C1 (Stripe → tier 9) po ADR. Training M7–12 jau egzistuoja per operator tiers 9/12; M13–15 – corporate15 cutover + content/release.

---

*Failas: `docs/phase-1-scope.md`. Susiję: [pricing-plan.md](pricing-plan.md), [roadmap.md](../roadmap.md).*
