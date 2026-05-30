import test from 'node:test';
import assert from 'node:assert/strict';

import { normalizePhone, waLink, smsLink, mailLink, insertToken } from '../src/utils/actions.js';

test('normalizePhone strips formatting but keeps a leading +', () => {
  assert.equal(normalizePhone('876-555-0142'), '8765550142');
  assert.equal(normalizePhone('+1 (876) 555-0142'), '+18765550142');
  assert.equal(normalizePhone(''), '');
  assert.equal(normalizePhone(undefined), '');
});

test('waLink builds a wa.me url with digits only and url-encoded text', () => {
  assert.equal(waLink('876-555-0142'), 'https://wa.me/8765550142');
  assert.equal(
    waLink('+1 876-555-0142', 'Hi there!'),
    'https://wa.me/18765550142?text=Hi%20there!'
  );
});

test('smsLink builds an sms: url with an encoded body', () => {
  assert.equal(smsLink('876-555-0142'), 'sms:8765550142');
  assert.equal(smsLink('876-555-0142', 'See you at 3pm'), 'sms:8765550142?&body=See%20you%20at%203pm');
});

test('mailLink builds a mailto: url with optional subject and body', () => {
  assert.equal(mailLink('a@b.com'), 'mailto:a@b.com');
  assert.equal(
    mailLink('a@b.com', 'Receipt', 'Thank you'),
    'mailto:a@b.com?subject=Receipt&body=Thank%20you'
  );
});

test('insertToken inserts at the cursor and replaces a selection', () => {
  assert.equal(insertToken('Hello ', '{name}'), 'Hello {name}');
  assert.equal(insertToken('Hi  there', '{name}', 3, 3), 'Hi {name} there');
  assert.equal(insertToken('Hi NAME there', '{name}', 3, 7), 'Hi {name} there');
});
