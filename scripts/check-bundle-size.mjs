/**
 * Fail CI if home-route critical JS (entry + react-vendor + router) exceeds bundle-budget.json.
 * Run after: cd frontend && npm run build
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { createGzip } from 'node:zlib'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pipeline } from 'node:stream/promises'
import { createReadStream } from 'node:fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distAssets = join(__dirname, '..', 'frontend', 'dist', 'assets')
const budgetPath = join(__dirname, '..', 'frontend', 'bundle-budget.json')

function gzipSize(filePath) {
  return new Promise((resolve, reject) => {
    let size = 0
    const gzip = createGzip()
    const input = createReadStream(filePath)
    gzip.on('data', (chunk) => {
      size += chunk.length
    })
    gzip.on('end', () => resolve(size))
    gzip.on('error', reject)
    input.on('error', reject)
    pipeline(input, gzip).catch(reject)
  })
}

function pickChunk(files, prefix) {
  return files.find((f) => f.startsWith(prefix) && f.endsWith('.js'))
}

async function main() {
  if (!existsSync(distAssets)) {
    console.error('check-bundle-size: frontend/dist/assets not found. Run npm run build first.')
    process.exit(1)
  }

  const budget = JSON.parse(readFileSync(budgetPath, 'utf8'))
  const limitBytes = budget.criticalPathGzipKb * 1024
  const files = readdirSync(distAssets)

  const entry = pickChunk(files, 'index-')
  const reactVendor = pickChunk(files, 'react-vendor-')
  const router = pickChunk(files, 'router-')
  const icons = pickChunk(files, 'icons-')

  const parts = [
    ['entry', entry],
    ['react-vendor', reactVendor],
    ['router', router],
    ['icons', icons],
  ].filter(([, f]) => f)

  if (parts.length === 0) {
    console.error('check-bundle-size: no matching chunks in dist/assets')
    process.exit(1)
  }

  let totalGzip = 0
  const rows = []

  for (const [label, file] of parts) {
    const path = join(distAssets, file)
    const gz = await gzipSize(path)
    totalGzip += gz
    rows.push({ label, file, gzipKb: (gz / 1024).toFixed(1) })
  }

  console.log('Critical path bundle (home route):')
  for (const row of rows) {
    console.log(`  ${row.label}: ${row.file} — ${row.gzipKb} KB gzip`)
  }
  console.log(`  TOTAL: ${(totalGzip / 1024).toFixed(1)} KB gzip (budget: ${budget.criticalPathGzipKb} KB)`)

  if (totalGzip > limitBytes) {
    console.error(`check-bundle-size: FAIL — exceeds budget by ${((totalGzip - limitBytes) / 1024).toFixed(1)} KB gzip`)
    process.exit(1)
  }

  if (entry && budget.entryGzipKb) {
    const entryGz = await gzipSize(join(distAssets, entry))
    const entryKb = entryGz / 1024
    console.log(`  entry only: ${entryKb.toFixed(1)} KB gzip (budget: ${budget.entryGzipKb} KB)`)
    if (entryKb > budget.entryGzipKb) {
      console.error(`check-bundle-size: FAIL — entry chunk exceeds ${budget.entryGzipKb} KB gzip`)
      process.exit(1)
    }
  }

  console.log('check-bundle-size: PASS')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
