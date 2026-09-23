/**
 * Shared magic-link HMAC. Training forwards optional email; this module signs
 * and checks the same string.
 *
 * Non-blank email (trim + lowercase): `email:access_tier:expires`
 * Missing or blank email: `access_tier:expires`
 */
const crypto = require('crypto');

function base64url(buffer) {
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/** Match training normalizeMagicLinkEmail: trim + toLowerCase; blank → omit. */
function normalizeMagicLinkEmail(raw) {
  if (raw == null) return null;
  const normalized = String(raw).trim().toLowerCase();
  return normalized === '' ? null : normalized;
}

function magicLinkPayload(accessTier, expires, email) {
  const normalized = normalizeMagicLinkEmail(email);
  if (normalized) return `${normalized}:${accessTier}:${expires}`;
  return `${accessTier}:${expires}`;
}

function signMagicLink(accessTier, expires, secret, email) {
  const payload = magicLinkPayload(accessTier, expires, email);
  const sig = crypto.createHmac('sha256', secret).update(payload).digest();
  return base64url(sig);
}

function verifyMagicLink(accessTier, expires, token, secret, email) {
  const expected = signMagicLink(accessTier, expires, secret, email);
  if (!token || token.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(token, 'utf8'), Buffer.from(expected, 'utf8'));
}

/** Query built with URLSearchParams so `+` in an address is not read as a space. */
function buildTrainingMagicLinkUrl({ base, accessTier, expires, token, email }) {
  const params = new URLSearchParams();
  const normalized = normalizeMagicLinkEmail(email);
  if (normalized) params.set('email', normalized);
  params.set('access_tier', String(accessTier));
  params.set('expires', String(expires));
  params.set('token', token);
  const root = String(base).replace(/\/$/, '');
  return `${root}/?${params.toString()}`;
}

module.exports = {
  normalizeMagicLinkEmail,
  magicLinkPayload,
  signMagicLink,
  verifyMagicLink,
  buildTrainingMagicLinkUrl,
};
