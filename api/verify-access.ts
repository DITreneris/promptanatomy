/**
 * Magic link access verification – HMAC-signed token.
 * GET /api/verify-access?access_tier=3|6&expires=UNIX_TS&token=BASE64URL_HMAC
 * Phase 1: only access_tier 3 or 6 accepted. Returns 200 { access_tier } or 400/401.
 */
import crypto from 'node:crypto';

const VALID_TIERS = [3, 6] as const;

function base64UrlEncode(buffer: Buffer): string {
  return buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function verifyToken(accessTier: string, expires: string, token: string, secret: string): boolean {
  const payload = `${accessTier}:${expires}`;
  const expectedHmac = crypto.createHmac('sha256', secret).update(payload).digest();
  const expectedB64 = base64UrlEncode(expectedHmac);
  if (token.length === 0 || token.length !== expectedB64.length) return false;
  return crypto.timingSafeEqual(Buffer.from(token, 'utf8'), Buffer.from(expectedB64, 'utf8'));
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const accessTier = url.searchParams.get('access_tier');
  const expires = url.searchParams.get('expires');
  const token = url.searchParams.get('token');

  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret || secret.length < 16) {
    return new Response(JSON.stringify({ error: 'Server configuration error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!accessTier || !expires || !token) {
    return new Response(JSON.stringify({ error: 'Missing access_tier, expires, or token' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const tierNum = parseInt(accessTier, 10);
  if (!Number.isInteger(tierNum) || !VALID_TIERS.includes(tierNum as (typeof VALID_TIERS)[number])) {
    return new Response(JSON.stringify({ error: 'Invalid access_tier' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const expiresNum = parseInt(expires, 10);
  if (!Number.isInteger(expiresNum)) {
    return new Response(JSON.stringify({ error: 'Invalid expires' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const nowSec = Math.floor(Date.now() / 1000);
  if (nowSec >= expiresNum) {
    return new Response(JSON.stringify({ error: 'Link expired' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!verifyToken(accessTier, expires, token, secret)) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ access_tier: tierNum }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}
