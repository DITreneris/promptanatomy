/**
 * Sentry for Vercel api/* — fail-open when SENTRY_DSN unset.
 * Scrubs emails, tokens, and secret-looking env values from events.
 * HTTP/OTel auto-instrumentation is off so warm isolates do not breadcrumb
 * Supabase URLs that contain email=eq.
 */

let initialized = false;
let Sentry = null;

const SECRET_ENV_KEYS = [
  'SENTRY_DSN',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'STRIPE_PRICE_ID_PLAN_1',
  'STRIPE_PRICE_ID_PLAN_2',
  'STRIPE_PRICE_ID_PLAN_3',
  'STRIPE_PRICE_ID_PLAN_4',
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'ACCESS_TOKEN_SECRET',
];

function redactString(value) {
  if (typeof value !== 'string' || !value) return value;
  let out = value
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[redacted-email]')
    .replace(/\btoken=[^&\s]+/gi, 'token=[redacted]')
    .replace(/\baccess_tier=\d+/gi, 'access_tier=[n]')
    .replace(/sk_(live|test)_[A-Za-z0-9]+/g, '[redacted-stripe-key]')
    .replace(/whsec_[A-Za-z0-9]+/g, '[redacted-webhook-secret]')
    .replace(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, '[redacted-jwt]');

  for (const key of SECRET_ENV_KEYS) {
    const secret = process.env[key];
    if (secret && secret.length >= 8 && out.includes(secret)) {
      out = out.split(secret).join(`[redacted:${key}]`);
    }
  }
  return out;
}

function scrubValue(value, depth = 0) {
  if (depth > 6 || value == null) return value;
  if (typeof value === 'string') return redactString(value);
  if (typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map((v) => scrubValue(v, depth + 1));

  const out = {};
  for (const [k, v] of Object.entries(value)) {
    const keyLower = k.toLowerCase();
    if (
      keyLower.includes('email') ||
      keyLower.includes('token') ||
      keyLower.includes('secret') ||
      keyLower.includes('authorization') ||
      keyLower === 'stripe-signature' ||
      keyLower === 'password' ||
      keyLower === 'rawbody' ||
      keyLower === 'raw_body'
    ) {
      out[k] = '[redacted]';
      continue;
    }
    out[k] = scrubValue(v, depth + 1);
  }
  return out;
}

/**
 * Pure beforeSend body — no SDK. Returns the event or null if scrub throws.
 * @param {object} event
 * @returns {object|null}
 */
function scrubSentryEvent(event) {
  try {
    if (!event || typeof event !== 'object') return event;
    if (event.message) event.message = redactString(event.message);
    if (event.transaction) event.transaction = redactString(String(event.transaction));
    if (event.exception?.values) {
      for (const ex of event.exception.values) {
        if (ex.value) ex.value = redactString(ex.value);
      }
    }
    if (event.request) {
      delete event.request.cookies;
      delete event.request.data;
      if (event.request.headers) {
        const headers = { ...event.request.headers };
        for (const h of Object.keys(headers)) {
          const hl = h.toLowerCase();
          if (
            hl === 'authorization' ||
            hl === 'cookie' ||
            hl === 'stripe-signature' ||
            hl.includes('secret')
          ) {
            headers[h] = '[redacted]';
          }
        }
        event.request.headers = headers;
      }
      if (event.request.query_string) {
        event.request.query_string = redactString(String(event.request.query_string));
      }
      if (event.request.url) {
        event.request.url = redactString(String(event.request.url));
      }
    }
    if (event.extra) event.extra = scrubValue(event.extra);
    if (event.contexts) event.contexts = scrubValue(event.contexts);
    if (Array.isArray(event.breadcrumbs)) {
      event.breadcrumbs = event.breadcrumbs.map((crumb) => {
        if (!crumb || typeof crumb !== 'object') return crumb;
        const next = { ...crumb };
        if (next.message) next.message = redactString(String(next.message));
        if (next.data) next.data = scrubValue(next.data);
        return next;
      });
    }
    return event;
  } catch {
    return null;
  }
}

function disableHttpBreadcrumbs(defaults) {
  const httpOpts = { breadcrumbs: false, spans: false, tracePropagation: false };
  return defaults.map((integration) => {
    const name = integration && integration.name;
    if (name === 'Http' || name === 'Undici') {
      if (name === 'Http' && typeof Sentry.httpIntegration === 'function') {
        return Sentry.httpIntegration(httpOpts);
      }
      if (name === 'Undici' && typeof Sentry.undiciIntegration === 'function') {
        return Sentry.undiciIntegration(httpOpts);
      }
      return integration;
    }
    return integration;
  });
}

function ensureInit() {
  if (initialized) return Boolean(Sentry);
  initialized = true;
  const dsn = (process.env.SENTRY_DSN || '').trim();
  if (!dsn) return false;

  try {
    // Lazy require so missing DSN never loads SDK weight on cold paths.
    // eslint-disable-next-line global-require
    Sentry = require('@sentry/node');
    Sentry.init({
      dsn,
      environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
      tracesSampleRate: 0,
      sendDefaultPii: false,
      skipOpenTelemetrySetup: true,
      integrations: (defaults) => disableHttpBreadcrumbs(defaults),
      beforeSend(event) {
        return scrubSentryEvent(event);
      },
    });
    return true;
  } catch (e) {
    console.warn('Sentry init failed (fail-open):', e && e.message ? e.message : e);
    Sentry = null;
    return false;
  }
}

/**
 * Capture a server/5xx-class exception. No-op without DSN.
 * @param {unknown} err
 * @param {{ route: string, status?: number }} meta
 * @returns {Promise<void>}
 */
async function captureApiException(err, { route, status } = {}) {
  try {
    if (!ensureInit() || !Sentry) return;
    Sentry.withScope((scope) => {
      if (route) scope.setTag('route', route);
      if (status != null) scope.setTag('http_status', String(status));
      Sentry.captureException(err instanceof Error ? err : new Error(String(err)));
    });
    await Sentry.flush(2000);
  } catch (e) {
    console.warn('Sentry capture failed (fail-open):', e && e.message ? e.message : e);
  }
}

module.exports = {
  captureApiException,
  ensureInit,
  redactString,
  scrubValue,
  scrubSentryEvent,
};
