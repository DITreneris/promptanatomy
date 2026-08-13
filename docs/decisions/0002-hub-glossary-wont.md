# ADR-0002: Viešas hub Žodynėlis = WON’T

**Data:** 2026-08-13.

## Kontekstas

Training app (`apps/prompt-anatomy`) turi Žodynėlį (`glossary.json`, `GlossaryPage`). Archive [deep-research-report.md](../archive/analysis/deep-research-report.md) siūlė crawlable `/glossary/` (ir per-term URL) ant `promptanatomy.app`. Hub kanonas: konversija, sitemap **4 URL**, be SSR, `Disallow: /anatomy/`. Roadmap **D.3** (`VITE_GLOSSARY_URL` → Navbar „Repo“) yra kitas darbas.

## Galimybės

- A: Atidaryti visą Žodynėlį ant hub (route’ai, sitemap, arba `/anatomy/` ungating).
- B: Nedaryti viešo hub katalogo. Žodynėlis lieka mokymų produktas. D.3 lieka optional Navbar nuoroda.

## Sprendimas

Pasirinkta **B**. Hub `.app` nepriima viešo glossary dump’o: ne `/glossary` katalogas, ne 100+ URL sitemap’e, ne `glossary.json` kopija į `frontend/`, ne `/anatomy/` žodyno atidarymas crawleriams.

Žinios / long-tail: `.blog` (Horizon B.3), ne hub. GEO: esami `llms.txt` / `llms-full.txt`, ne nauji term puslapiai.

## Pasekmės

- Teigiamos: sitemap ir golden-legacy navbar lieka; nėra thin-content / intent mismatch; produktinė vertė lieka `/anatomy/`.
- Neigiamos / ribos: D.3 vis dar later (studentų UX, ne SEO). Archive `/glossary/` rekomendacija — istorinė, ne SOT.
