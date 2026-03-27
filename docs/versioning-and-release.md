# Versijų ir release valdymas

**Tikslas:** Vienas šaltinis tiesos produkto versijai, aiškūs release žingsniai ir SemVer konvencija.

**Pirmas oficialus release:** 1.3.0 (2026-03-16) – sistema stabiliai veikia po deploy, pirkimai per Stripe, magic link, mokymų app, SEO, DUK, B2B.

---

## 1. Kur laikoma versija

| Vieta | Reikšmė | Paskirtis |
|-------|---------|-----------|
| **frontend/src/config.js** | `APP_VERSION = 'v1.3'` | Vienas šaltinis UI: Navbar badge, Hero script name (`SCRIPT_NAME`), Ecosystem „Stable“. Keičiant čia – atsinaujina visur. |
| **frontend/package.json** | `"version": "1.3.1"` | NPM package versija (build, artefaktai). Siūloma sulyginti su release. |
| **CHANGELOG.md** | `## [1.3.1] - 2026-03-24` (naujausias patch) | Release istorija; po release nauji pakeitimai rašomi po `[Unreleased]`. |
| **Git tag** | `v1.3.0` | Fiksuoja commit, atkuriama būsena. |

**Pastaba:** Rodomoji versija UI gali būti trumpesnė (`v1.3`) arba pilna (`1.3.0`). Abu variantai priimtini; `v1.3` – kompaktiškesnis badge.

---

## 2. SemVer (Semantic Versioning)

- **MAJOR** (x.0.0): neatsiliepimai su ankstesne versija (breaking).
- **MINOR** (1.x.0): naujos funkcijos atgal suderinamos.
- **PATCH** (1.3.x): klaidų taisymai, saugumą nekeičiantys pakeitimai.

Naujausias release **1.3.1** (2026-03-24) – patch (Supabase migracijos repo, doc). Bazė **1.3.0** – stabilus produktas su planais 1–2, Stripe, Supabase, magic link, mokymų app, SEO, DUK, B2B bloku.

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
