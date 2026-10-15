/**
 * Trusted-by band logos (SOT for `TrustedBy.jsx` and `scripts/check-logo-dims.mjs`).
 *
 * One entry per line — removing a logo on owner objection is a one-line delete.
 * `w` / `h` must equal the real asset dimensions in `public/logo/` (CLS); CI checks this.
 * Wide marks are separated. Umaras keeps the full lockup; its box is only as tall as
 * needed for the wordmark to match the other wide marks, the tagline sits inside that.
 */
export const LOGOS = [
  { src: '/logo/pigu.webp', alt: 'Pigu.lt', w: 324, h: 96, size: 'h-6 sm:h-7' },
  { src: '/logo/rizikos_cesija.webp', alt: 'Rizikos Cesija', w: 229, h: 96, size: 'h-8 sm:h-9' },
  { src: '/logo/umaras.webp', alt: 'Umaras', w: 405, h: 96, size: 'h-9 sm:h-10' },
  { src: '/logo/apk.webp', alt: 'Apvalaus Kvadrato Mokykla', w: 213, h: 96, size: 'h-8 sm:h-9' },
  { src: '/logo/cgates.webp', alt: 'Cgates', w: 349, h: 96, size: 'h-6 sm:h-7' },
  { src: '/logo/senoji_baldine.webp', alt: 'Senoji Baldinė', w: 234, h: 96, size: 'h-8 sm:h-9' },
  { src: '/logo/bagfactory.svg', alt: 'Bagfactory', w: 225, h: 36, size: 'h-6 sm:h-7' },
  { src: '/logo/hitus_legal.webp', alt: 'Hitus Legal', w: 130, h: 96, size: 'h-10 sm:h-11' },
]
