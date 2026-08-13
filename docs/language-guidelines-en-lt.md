# Kalbos gairės: LT ir EN

Trumpas vadovas rašant ir vertinant vartotojui matomą tekstą (LP, puslapiai, klaidos). Naudoti vertimų redagavimui ir naujoms frazėms.

**Taisyklė:** tas pats i18n raktas, ne tas pats sakinys. Frontpage — replace, never lengthen. Copy telpa į slotą (navbar, badge, ecosystem CTA ~12 simb., `line-clamp-2`), ne į kitos kalbos sakinio ilgį.

---

## 1. Prekės ženklas / pavadinimas

| Kalba | Pilnas pavadinimas | Navbar / logotipas (`nav.brandPromptu` + `nav.brandAnatomija`) |
|-------|--------------------|-------------------------------------------------------------------|
| **EN** | **Prompt Anatomy** – AI Training System | Title Case spalvų splitas: **Prompt** (tamsus) + **Anatomy** (accent); be tagline ir be versijos juostoje (žr. [golden-legacy-standard.md](golden-legacy-standard.md) §1). |
| **LT** | **Promptų Anatomija** – DI mokymų sistema | Tas pats principas: **Promptų** + **Anatomija** (accent); be tagline/versijos Navbar. |

- EN kontekste visada **Prompt Anatomy**, ne „Promptų Anatomija“.
- LT kontekste visada **Promptų Anatomija** (didžioji **A**), ir citatose.
- **AI / DI:** LT — **DI**; EN — **AI**. Pvz. LT: „DI mokymų sistema“, „DI agentai“; EN: „AI Training System“, „AI agents“.
- Hub kategorija (share `og:title`, `meta.title`) = **training system**, ne „operating system“. OS lieka tik founder esė metaforoje (Medium antraštės neliesti).

---

## 2. Terminai

Nesiverčiama (arba palikti kaip atributą):

- **Lifetime access** / **Lifetime prieiga** — „Lifetime“ lieka.
- **Repo**, **Stripe**, **Telegram**, **Cloud**, **Pro**.
- **AI Powered** (EN) / **DI Powered** (LT).

Versti DUK ir LP (ne palikti kalbų mišinio): hub, spoke, workflow, checkout, locale, LP, training app.

Nav/footer etiketės pagal `lt.json` / `en.json` (Metodas, Ekosistema, Kainodara ir t. t.).

---

## 3. Tonas ir UI gramatika

- **Kreipinys:** „you“ (EN) / **tu** (LT) — vienodas, tiesus. Ne „jūs“. Sutampa su [golden-legacy-standard.md](golden-legacy-standard.md) §4.
- **LT mygtukai ir CTA nuorodos:** bendratis — „Rinktis planą“, „Gauti prieigą“, „Eiti į mokymus“.
- **LT antraštės ir badge:** tu liepiamoji — „Rinkis planą“, „Pasirink, nuo ko pradėti“, „Pradėk čia“.
- **Edu / produktas:** trumpi sakiniai, aiškūs CTA, be perteklinio žargono.
- **Klaidos:** trumpi, veiksmažodžiu („Bandyk vėliau.“ / „Try again later.“).

---

## 4. Legal (SPA vs crawler)

- Canonical ir og:url lieka `/privacy` / `/terms`. Sitemap — 4 URL; nėra `/lt/privacy`.
- Crawler / direct URL / refresh → EN `privacy.html` / `terms.html` ([generate-legal-static.mjs](../frontend/scripts/generate-legal-static.mjs); Vercel rewrite). GEO dump — `privacy.md` / `terms.md` ([generate-geo-static.mjs](../frontend/scripts/generate-geo-static.mjs)). Tik iš `en.json`. Static Home nuoroda = `/` (EN).
- In-app navigacija iš LP (Footer `Link`, be refresh) → SPA `useLocale()` + `LocaleToggle`; Home/Back = `localeHomePath` (`/lt` | `/en`).
- Nauji `legal.*` raktai — abiejuose JSON; LT = tie patys faktai, tu, laconic.

---

## 5. Techninis įgyvendinimas

- Vertimai: [frontend/src/i18n/translations/lt.json](../frontend/src/i18n/translations/lt.json), [en.json](../frontend/src/i18n/translations/en.json).
- Naujas tekstas: tas pats raktas abiejuose failuose; forma pagal šias gaires, ne veidrodis.
- Raktų struktūra: `meta.*`, `nav.*`, `hero.*`, `whatIs.*`, `methodology.*`, `ecosystem.*`, `pricing.*`, `faq.*`, `footer.*`, `legal.*`, `success.*`, `cancel.*`, `common.*`, `errors.*` (žr. [documentation.md](process/documentation.md)).
- Istorinis kombinuotas auditas: [audit-language-en-lt.md](archive/audits/audit-language-en-lt.md) — ne kasdienis SOT.
