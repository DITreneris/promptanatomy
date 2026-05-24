# Public assets

Static files in this folder are copied to the build output root.

- **og-image.png** – Social sharing image (Open Graph). 1200×630 px; used as `og:image` in index.html.
- **robots.txt** – Crawler policy (classical search + 2026 AI bots). Copied to `dist/` by Vite.
- **sitemap.xml** – Indexable hub URLs only. `lastmod` refreshed by `scripts/generate-geo-static.mjs` on build.
- **llms.txt** – Short AI-readable index (ecosystem, founder, publications). Regenerated on build from [geo-manifest.js](../src/site/geo-manifest.js).
- **llms-full.txt** – Generated into `dist/` only (not in `public/`): full FAQ, hero, pricing for non-JS AI crawlers.

GEO single source: [frontend/src/site/geo-manifest.js](../src/site/geo-manifest.js).
