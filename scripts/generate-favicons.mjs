/**
 * Generate PNG favicon set from frontend/public/favicon.svg.
 * Output: favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png (180),
 *         android-chrome-192x192.png, android-chrome-512x512.png
 * Run from repo root: node scripts/generate-favicons.mjs
 */
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');
const publicDir = join(repoRoot, 'frontend', 'public');
const svgPath = join(publicDir, 'favicon.svg');

const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
];

const svg = readFileSync(svgPath);

await Promise.all(
  sizes.map(({ size, name }) =>
    sharp(svg)
      .resize(size, size)
      .png()
      .toFile(join(publicDir, name))
  )
);

console.log('Favicon PNGs generated:', sizes.map((s) => s.name).join(', '));
