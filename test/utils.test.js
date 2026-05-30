import test from 'node:test';
import assert from 'node:assert/strict';
import { clampProgress, findNextUnpaidAppointment } from '../src/utils/payments.js';
import { parseDisplayTime, validateTimeRange } from '../src/utils/scheduling.js';

test('findNextUnpaidAppointment returns the earliest unpaid booking for the requested day', () => {
  const appts = [
    { id: 'late', dayIdx: 1, start: 14, paid: false },
    { id: 'other-day', dayIdx: 2, start: 9, paid: false },
    { id: 'paid', dayIdx: 1, start: 8, paid: true },
    { id: 'early', dayIdx: 1, start: 10, paid: false },
  ];

  assert.equal(findNextUnpaidAppointment(appts, 1)?.id, 'early');
  assert.equal(findNextUnpaidAppointment(appts, 3), null);
});

test('clampProgress keeps takings progress within the visual range', () => {
  assert.equal(clampProgress(50, 100), 0.5);
  assert.equal(clampProgress(150, 100), 1);
  assert.equal(clampProgress(-20, 100), 0);
  assert.equal(clampProgress(10, 0), 0);
});

test('parseDisplayTime supports valid twelve-hour times and rejects malformed times', () => {
  assert.equal(parseDisplayTime('12:00am'), 0);
  assert.equal(parseDisplayTime(' 1:30PM '), 13.5);
  assert.equal(parseDisplayTime('12:00pm'), 12);
  assert.equal(parseDisplayTime('13:00pm'), null);
  assert.equal(parseDisplayTime('1:99pm'), null);
  assert.equal(parseDisplayTime('tomorrow'), null);
});

test('validateTimeRange rejects malformed and reversed block-off intervals', () => {
  assert.deepEqual(validateTimeRange('1:00pm', '2:30pm'), { start: 13, end: 14.5, error: null });
  assert.match(validateTimeRange('later', '2:30pm').error, /Enter times/);
  assert.match(validateTimeRange('2:30pm', '1:00pm').error, /later than/);
});
