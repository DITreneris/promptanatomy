const test = require('node:test');
const assert = require('node:assert/strict');
const {
  normalizeMagicLinkEmail,
  magicLinkPayload,
  signMagicLink,
  verifyMagicLink,
  buildTrainingMagicLinkUrl,
  isMagicLinkRedeemed,
  metadataWithMagicLinkRedeemed,
} = require('./magic-link');

const SECRET = 'test-secret-at-least-16';

test('old payload verifies when email is absent', () => {
  const token = signMagicLink('6', '1735689600', SECRET, null);
  assert.equal(magicLinkPayload('6', '1735689600', null), '6:1735689600');
  assert.equal(verifyMagicLink('6', '1735689600', token, SECRET, null), true);
  assert.equal(verifyMagicLink('6', '1735689600', token, SECRET, undefined), true);
});

test('new payload verifies when email is present', () => {
  const token = signMagicLink('6', '1735689600', SECRET, 'learner@example.com');
  assert.equal(
    magicLinkPayload('6', '1735689600', 'learner@example.com'),
    'learner@example.com:6:1735689600'
  );
  assert.equal(
    verifyMagicLink('6', '1735689600', token, SECRET, 'learner@example.com'),
    true
  );
});

test('email present with the old token fails', () => {
  const oldToken = signMagicLink('6', '1735689600', SECRET, null);
  assert.equal(
    verifyMagicLink('6', '1735689600', oldToken, SECRET, 'learner@example.com'),
    false
  );
});

test('blank or whitespace email uses the old payload', () => {
  const oldToken = signMagicLink('12', '1735689600', SECRET, null);
  assert.equal(normalizeMagicLinkEmail('   '), null);
  assert.equal(normalizeMagicLinkEmail(''), null);
  assert.equal(magicLinkPayload('12', '1735689600', '   '), '12:1735689600');
  assert.equal(verifyMagicLink('12', '1735689600', oldToken, SECRET, '   '), true);
  assert.equal(verifyMagicLink('12', '1735689600', oldToken, SECRET, ''), true);
});

test('mixed-case email signs and verifies as lowercase', () => {
  const token = signMagicLink('9', '1735689600', SECRET, '  Learner@Example.COM ');
  assert.equal(
    verifyMagicLink('9', '1735689600', token, SECRET, 'learner@example.com'),
    true
  );
  assert.equal(
    verifyMagicLink('9', '1735689600', token, SECRET, 'Learner@Example.COM'),
    true
  );
});

test('plus in the address round-trips through the query string', () => {
  const email = 'learner+tag@example.com';
  const token = signMagicLink('3', '1735689600', SECRET, email);
  const url = buildTrainingMagicLinkUrl({
    base: 'https://www.promptanatomy.app/anatomy',
    accessTier: 3,
    expires: '1735689600',
    token,
    email,
  });
  const params = new URLSearchParams(new URL(url).search);
  assert.equal(params.get('email'), email);
  assert.equal(params.get('access_tier'), '3');
  assert.equal(
    verifyMagicLink('3', '1735689600', params.get('token'), SECRET, params.get('email')),
    true
  );
  assert.match(url, /email=learner%2Btag%40example\.com/);
});

test('success URL is redeemed once and keeps plan metadata', () => {
  assert.equal(isMagicLinkRedeemed(null), false);
  assert.equal(isMagicLinkRedeemed({ plan: '6' }), false);
  assert.equal(isMagicLinkRedeemed({ plan: '6', magic_link_redeemed: '1' }), true);
  const next = metadataWithMagicLinkRedeemed({ plan: '3' });
  assert.deepEqual(next, { plan: '3', magic_link_redeemed: '1' });
  assert.equal(isMagicLinkRedeemed(next), true);
});
