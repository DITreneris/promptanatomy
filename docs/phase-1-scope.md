# Faze 1 apimtis – produktai ir moduliai

**Data:** 2026-03-08. Šis dokumentas apibrėžia, kas parduodama ir rodoma pirmajame etape.

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

## 2. Užrakinti moduliai (7–15)

- **Moduliai 7–15** laikomi neužbaigtais / būsimais – LP ir UI rodo **maks. 6 modulius**.
- Vietose, kur buvo „12 modulių“ arba „15 modulių“, naudoti **6 moduliai** arba tekstą „Moduliai 7+ – netrukus“.
- Frontend: planų kortelėse rodomi tik 2 planai; extended/full – nepasirinktini (užrakinti arba paslėpti).

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

Kai bus įvesti papildomi moduliai (7–15), bus atnaujinta: planai 3 ir 4, `PLAN_VALUES`, frontend planų sąrašas ir tekste „6“ pakeista atitinkamai.

---

*Failas: `docs/phase-1-scope.md`. Susiję: [pricing-plan.md](pricing-plan.md), [roadmap.md](../roadmap.md).*
