# Versijų ir release valdymas

**Tikslas:** Vienas šaltinis tiesos produkto versijai, aiškūs release žingsniai ir SemVer konvencija.

**Pirmas oficialus release:** 1.3.0 (2026-03-16) – sistema stabiliai veikia po deploy, pirkimai per Stripe, magic link, mokymų app, SEO, DUK, B2B.

---

## 1. Kur laikoma versija

| Vieta | Reikšmė | Paskirtis |
|-------|---------|-----------|
| **frontend/src/config.js** | `APP_VERSION = 'v1.4'` | Vienas šaltinis: Hero terminalo etiketė (`SCRIPT_NAME`), Ecosystem „Stable“ ir kiti komponentai, kur rodoma versija. **Navbar** versijos ženkliuko nerodo (Variant B). Keičiant čia – atsinaujina visur, kur naudojama. |
| **frontend/package.json** | `"version": "1.4.6"` | NPM package versija (build, artefaktai). Siūloma sulyginti su release. |
| **CHANGELOG.md** | `## [1.4.6] - 2026-07-15` (naujausias release) | Release istorija; po release nauji pakeitimai rašomi po `[Unreleased]`. |
| **Git tag** | `v1.4.6` (planuojamas) | Fiksuoja commit, atkuriama būsena. Ankstesnis: `v1.4.5`. |

**Pastaba:** Rodomoji versija UI gali būti trumpesnė (`v1.3`) arba pilna (`1.3.0`). Abu variantai priimtini; `v1.3` – kompaktiškesnis badge.

---

## 2. SemVer (Semantic Versioning)

- **MAJOR** (x.0.0): neatsiliepimai su ankstesne versija (breaking).
- **MINOR** (1.x.0): naujos funkcijos atgal suderinamos.
- **PATCH** (1.3.x): klaidų taisymai, saugumą nekeičiantys pakeitimai.

Naujausias parent release **1.4.6** (2026-07-15) – **MINOR**: Supabase CHECK `plan=9`, webhook retry. Training upstream follow-up pin **`7ff2a4f`** (tag `v1.4.7`). Ankstesni pin: `1eaa2be` (v1.4.6 + Unreleased), `4eebf10` (1.4.5+CI). Ankstesnis parent **1.4.5** (2026-07-09) – pin `47448fc`. Bazė **1.3.0** – stabilus produktas su Stripe, magic link, mokymų app.

---

## 3. Release žingsniai

1. **Prieš release:** Regresija pagal [golden-legacy-standard.md](golden-legacy-standard.md): `backend`: `pytest`, `frontend`: `npm run build`, `apps/prompt-anatomy`: `npm run build`.
2. **CHANGELOG:** Pervadinti `[Unreleased]` į `[X.Y.Z] - YYYY-MM-DD`; po juo palikti naują `## [Unreleased]` skyrių.
3. **Versijos atnaujinimas:** `config.js` → `APP_VERSION = 'vX.Y'` (arba `vX.Y.Z`); `frontend/package.json` → `"version": "X.Y.Z"`.
4. **Commit:** pvz. `chore: release v1.3.0`.
5. **Git tag:** `git tag -a v1.3.0 -m "Release 1.3.0"`; `git push origin v1.3.0`.
6. **(Neprivaloma)** GitHub Release: aprašas iš CHANGELOG, prisegtas source zip.

---

## 4. Kada kelti versiją

- **PATCH:** Bugfix'ai, doc pataisos, nedideli UX pataisymai → 1.3.1.
- **MINOR:** Naujos funkcijos (nauji planai, puslapiai, integracijos) → 1.4.0.
- **MAJOR:** Breaking pakeitimai (API, prieigos modelis) → 2.0.0.

Po kiekvieno release – atnaujinti `config.js` ir `frontend/package.json` pagal naują versiją.

---

## 5. Planuojamas release v1.4.0 (2026-06-06)

**Versija:** `1.4.0` (MINOR, ne patch) — ekosistemos sekcija, GEO, perf ir copy apimtis viršija 1.3.x patch ribą.

**Kada tag'inti:**

| Etapas | Kada | Veiksmas |
|--------|------|----------|
| **Dabar** | CHANGELOG uždarytas | `[1.4.0] - 2026-06-06`; `[Unreleased]` tuščias |
| **Prieš tag** | Po paskutinio deploy į prod | Golden Legacy: `pytest`, `npm run build`, rankinis smoke (`/`, `/lt`, `#ekosistema`, `#faq`, magic link) |
| **Tag diena** | Deploy patvirtintas prod | `config.js` → `v1.4`; `package.json` → `1.4.0`; commit `chore: release v1.4.0`; `git tag -a v1.4.0 -m "Release 1.4.0"`; push tag |
| **Po tag** | Optional | GitHub Release iš CHANGELOG santraukos; `geo-manifest.js` `LAST_UPDATED` jau 2026-06-06 |

**Kodėl ne 1.3.2:** vienas patch numeris netinka ~2 mėn. LP darbui (ecosystem UI, Phase 8, SEO ItemList, locale lazy-load). SemVer MINOR = atgal suderinamos funkcijos / reikšmingas produkto sluoksnis be breaking changes.
