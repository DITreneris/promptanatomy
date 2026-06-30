/**
 * Local dev: Vercel-style GET handlers for /api/access and /api/generate-access-link.
 * Usage: node scripts/local-api-server.mjs (port 3000, loads backend/.env)
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const require = createRequire(import.meta.url);

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (!m) continue;
    process.env[m[1]] ??= m[2].replace(/^["']|["']$/g, '');
  }
}

loadEnvFile(path.join(root, 'backend', '.env'));
process.env.FRONTEND_ORIGIN ??= 'http://localhost:5175';
process.env.TRAINING_REDIRECT_BASE ??= 'http://localhost:5173/anatomy';

const routes = {
  '/api/access': require('../api/access.js'),
  '/api/generate-access-link': require('../api/generate-access-link.js'),
  '/api/verify-access': require('../api/verify-access.js'),
};

const PORT = Number(process.env.LOCAL_API_PORT || 3000);

/** Minimal Vercel-style response shim for api/*.js handlers. */
function createVercelResponse(nodeRes) {
  let statusCode = 200;
  const res = {
    headersSent: false,
    setHeader(name, value) {
      nodeRes.setHeader(name, value);
      return this;
    },
    status(code) {
      statusCode = code;
      return this;
    },
    json(body) {
      if (!this.headersSent) {
        this.headersSent = true;
        nodeRes.writeHead(statusCode, { 'Content-Type': 'application/json' });
      }
      nodeRes.end(JSON.stringify(body));
      return this;
    },
    end(data) {
      if (!this.headersSent) {
        this.headersSent = true;
        nodeRes.writeHead(statusCode);
      }
      nodeRes.end(data);
      return this;
    },
  };
  return res;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://127.0.0.1:${PORT}`);
  const handler = routes[url.pathname];
  if (!handler) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ detail: 'Not found' }));
    return;
  }
  req.query = Object.fromEntries(url.searchParams.entries());
  req.method = req.method || 'GET';
  const vercelRes = createVercelResponse(res);
  try {
    await handler(req, vercelRes);
  } catch (err) {
    console.error(err);
    if (!vercelRes.headersSent) {
      vercelRes.status(500).json({ detail: 'Internal error' });
    }
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Local API http://127.0.0.1:${PORT} (access, generate-access-link, verify-access)`);
});
