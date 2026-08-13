# Public assets

Static files in this folder are copied to the build output root.

- **og-image-v3.jpg** – Social sharing image for Open Graph / Twitter (`og:image`, `twitter:image` in `index.html` + `SeoHead`). 1200×630 JPEG, no alpha. Tagline: AI TRAINING SYSTEM.
- **og-image.png** – JSON-LD `Organization.logo` only (not social meta). Keep both files in `public/`.
- **robots.txt** – Crawler policy (classical search + 2026 AI bots). Copied to `dist/` by Vite.
- **sitemap.xml** – Indexable hub URLs only. `lastmod` refreshed by `scripts/generate-geo-static.mjs` on build.
- **llms.txt** – Short AI-readable index (Answer.AI shape: H1, blockquote, curated markdown links). Regenerated on build from [geo-manifest.js](../src/site/geo-manifest.js).
- **llms-full.txt** – Generated into `dist/` only (not in `public/`): full FAQ, hero, pricing for non-JS AI crawlers.

GEO single source: [frontend/src/site/geo-manifest.js](../src/site/geo-manifest.js). Org entity/`sameAs`: [organization.js](../src/site/organization.js).
