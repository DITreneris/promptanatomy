# SEO praktikų KISS–Marry–Kill analizė

Trumpa išvada iš interneto šaltinių (GitHub repo SEO, React/Vite SPA SEO) ir pritaikymas **Promptų Anatomija** projektui (Vite + React landing, LT/EN, Stripe).

---

## Geriausios praktikos – santrauka

- **Daryti:** sitemap.xml, robots.txt, canonical, og:image meta (ir įkelti og-image.png), unikalūs title/description + noindex success ir cancel puslapiams.
- **Vėliau:** hreflang, GitHub repo description ir 5–10 topics (kai repo viešas).
- **Nedaryti:** migracija į SSR, sunkus pre-render, per daug GitHub topics.

---

## 1. KILL (neimti / atidėti)

| Praktika | Kodėl KILL |
|----------|------------|
| **Perėjimas į SSR (Next.js ir pan.)** | Per didelė permaina stack'ui; jūsų tikslas – konversija ir mokėjimai, ne tūkstantis puslapių. Google gerai indeksuoja ir SPA, jei yra bazinė techninė SEO. |
| **Pilnas pre-render (Puppeteer / vite-plugin-prerender)** | Sudėtinga konfigūracija, lėtesnis build, daug priklausomybių. Landing su keliais route'ais to neprireikia pirmajai iteracijai. |
| **20 GitHub topics** | Per daug – atrodo triukšmingai. Pakanka 5–10 tiksliai pasirinktų. |
| **Dinaminis sitemap su 100+ URL** | Projektas turi kelis statinius puslapius (/ , /success , /cancel). Paprastas statinis `sitemap.xml` užtenka. |
| **Atskiros subdomenų/kelio strategijos vien kalbai** | Dabar LT/EN per lang switcher – paprasčiau palikti vieną domeną + `hreflang` / `lang` atributai. |

---

## 2. MARRY (verta įgyvendinti – tinka projektui)

| Praktika | Kodėl MARRY | Ką daryti | Būsena |
|----------|-------------|-----------|--------|
| **sitemap.xml** | Lengva, standartas, padeda paieškos varikliams rasti puslapius. | Pridėti `public/sitemap.xml` su `/`, `/success`, `/cancel`; į build output. | Įgyvendinta |
| **robots.txt** | Valdo, ką crawleriai gali crawlinti; gali nurodyti sitemap. | Pridėti `public/robots.txt` su `Sitemap:`. | Įgyvendinta |
| **og:image** | Be nuotraukos dalijimasis socialuose atrodo silpnas. | 1200×630 px paveikslėlis, `<meta property="og:image">` + absoliutus URL. Meta įdėta; failą `og-image.png` įkelti į `frontend/public/`. | Meta įgyvendinta; paveikslas – įkelti |
| **GitHub: description + topics** | Jei repo bus viešas – geresnis atpažinamumas paieškoje. | Repo description + 5–10 topics: `react`, `vite`, `stripe`, `landing-page`, `prompt-engineering`, `i18n`. | Vėliau |
| **README pirmas blokas** | Ir žmonėms, ir paieškos varikliams – kas tai ir kam. | Pirmas paragrafas su raktažodžiais (jau gerai); gal pridėti 1–2 sakinius apie „AI mokymai“, „pardavimų puslapis“. | Opcionalu |
| **hreflang / lang** | LT/EN – sumažina dubliavimą ir pagerina tikslinimą. | `document.documentElement.lang` jau keičiamas (LocaleContext); gal pridėti `<link rel="alternate" hreflang="lt|en">`. | Vėliau |
| **Unikalūs title/description pagal route** | Success/cancel turi turėti atskirą meta. | Home – esamas; `/success` ir `/cancel` – atskiri metaTitle/metaDescription + noindex. | Įgyvendinta |

---

## 3. KISS (minimaliai, greitai – „quick wins“)

| Praktika | Veiksmas | Būsena |
|----------|----------|--------|
| **Sitemap + robots** | Statinis `public/sitemap.xml` ir `public/robots.txt`; Vite build nukopijuos. | Įgyvendinta |
| **Vienas og:image** | PNG/JPEG 1200×630 į `public/og-image.png`, meta su absoliučiu URL. | Meta įgyvendinta; failas – įkelti |
| **GitHub** | 5–7 topics; description 1–2 sakiniai su raktažodžiais (kai repo viešas). | Vėliau |
| **Canonical** | `<link rel="canonical" href="https://www.promptanatomy.app/" />` pagrindiniam puslapiui. | Įgyvendinta |
| **Meta noindex** | Success/Cancel: `<meta name="robots" content="noindex, nofollow">` + unikalūs title/description. | Įgyvendinta |

---

## Prioritetų santrauka

1. **Daryti dabar (KISS + dalis MARRY):**  
   `sitemap.xml`, `robots.txt`, `og:image`, canonical pagrindiniam, unikalūs title/description success ir cancel (arba noindex).
2. **Vėliau:**  
   hreflang tvarkingumas, README + GitHub description/topics (kai repo bus viešas).
3. **Neimti:**  
   SSR migracija, sunkus pre-render, per daug GitHub topics.

---

## Šaltiniai (santrauka)

- GitHub SEO: repo description, topics (iki 20, rekomenduojama 5–10), README struktūra ir raktažodžiai – [GitHub Docs](https://docs.github.com/articles/classifying-your-repository-with-topics), [Infrasity GitHub SEO 2025](https://infrasity.com/blog/github-seo).
- React/SPA SEO: meta tags (title, description, og:*), sitemap, robots.txt, Core Web Vitals; SPA ribotumas – crawleris mato shell, bet paprastam landing su geru meta ir sitemap pakanka – [DEV](https://dev.to/ali_dz/optimizing-seo-in-react-vite-project), [vite-plugin-sitemap](https://github.com/jbaubree/vite-plugin-sitemap).
- Og:image rekomendacijos: 1200×630, absoliutus URL – standartinė Open Graph praktika.

---

## Įgyvendinimo būsena (2025-03-08)

**Atlikta (KISS + dalis MARRY):**

- **sitemap.xml** – `frontend/public/sitemap.xml` su `/`, `/success`, `/cancel`.
- **robots.txt** – `frontend/public/robots.txt` su `Sitemap:` nuoroda.
- **Canonical ir og:image** – `frontend/index.html`: `<link rel="canonical">`, `<meta property="og:image">`, `<meta name="robots" content="index, follow">`.
- **og:image failas** – į `frontend/public/` reikia įkelti 1200×630 px paveikslėlį kaip `og-image.png` (žr. `frontend/public/README.md`). Meta nuoroda jau nurodyta.
- **Success/Cancel puslapiai** – unikalūs `metaTitle` ir `metaDescription` vertimuose (en/lt); `SuccessPage.jsx` ir `CancelPage.jsx` nustato title, description ir `noindex, nofollow` per `useEffect`, cleanup atstato home meta ir `index, follow`.

**Vėliau:** hreflang, GitHub description/topics (kai repo viešas).

---

*Dokumentas: `docs/SEO-KISS-Marry-Kill.md`. Atnaujinta pagal projekto būseną ir viešas SEO praktikas.*
