/**
 * Pure scrubber tests — do not require('@sentry/node') or set SENTRY_DSN.
 */
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { redactString, scrubValue, scrubSentryEvent } = require('./sentry');

describe('redactString', () => {
  it('redacts email in URL / query', () => {
    const url = 'https://x.supabase.co/rest/v1/user_access?email=eq.user@x.com';
    const out = redactString(url);
    assert.equal(out.includes('user@x.com'), false);
    assert.ok(out.includes('[redacted-email]'));
  });

  it('redacts token=, access_tier=, sk_live_, whsec_, JWT', () => {
    const token = redactString('https://app.example/?token=abc123&x=1');
    assert.ok(token.includes('token=[redacted]'));
    assert.equal(token.includes('abc123'), false);

    const tier = redactString('https://app.example/?access_tier=12');
    assert.ok(tier.includes('access_tier=[n]'));

    const sk = redactString('key sk_live_abcdefghijklmnopqrstuv');
    assert.ok(sk.includes('[redacted-stripe-key]'));

    const wh = redactString('secret whsec_abcdefghijklmnopqrstuv');
    assert.ok(wh.includes('[redacted-webhook-secret]'));

    const jwt = redactString('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0In0.abc');
    assert.ok(jwt.includes('[redacted-jwt]'));
  });
});

describe('scrubValue', () => {
  it('redacts a nested extra.details string with an email', () => {
    const out = scrubValue({ details: 'failed for buyer@example.com' });
    assert.equal(out.details.includes('buyer@example.com'), false);
    assert.ok(out.details.includes('[redacted-email]'));
  });

  it('redacts a key named email', () => {
    const out = scrubValue({ email: 'user@x.com', ok: 1 });
    assert.equal(out.email, '[redacted]');
    assert.equal(out.ok, 1);
  });
});

describe('scrubSentryEvent', () => {
  it('redacts breadcrumb data.url with an email', () => {
    const event = {
      breadcrumbs: [
        {
          category: 'http',
          data: { url: 'https://x.supabase.co/rest/v1/user_access?email=eq.user@x.com' },
        },
      ],
    };
    const out = scrubSentryEvent(event);
    assert.ok(out);
    assert.equal(out.breadcrumbs[0].data.url.includes('user@x.com'), false);
    assert.ok(out.breadcrumbs[0].data.url.includes('[redacted-email]'));
  });

  it('redacts request url and extra', () => {
    const event = {
      message: 'lookup user@x.com failed',
      request: { url: '/api/access?email=user@x.com', cookies: 'sid=1' },
      extra: { details: 'buyer@example.com' },
    };
    const out = scrubSentryEvent(event);
    assert.ok(out);
    assert.equal(out.request.cookies, undefined);
    assert.ok(out.request.url.includes('[redacted-email]'));
    assert.ok(out.extra.details.includes('[redacted-email]'));
    assert.ok(out.message.includes('[redacted-email]'));
  });

  it('returns null when scrub throws', () => {
    const event = {
      get extra() {
        throw new Error('boom');
      },
    };
    assert.equal(scrubSentryEvent(event), null);
  });
});
