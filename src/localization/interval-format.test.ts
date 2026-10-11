import { describe, expect, test } from 'vitest';
import { formatInterval } from './interval-format';

const units = { minutes: 'min', hours: 'h' };

describe('formatInterval', () => {
  test('shows Intervals under an hour in minutes', () => {
    expect(formatInterval(20, units)).toBe('20 min');
  });

  test('shows whole-hour Intervals in hours', () => {
    expect(formatInterval(60, units)).toBe('1 h');
    expect(formatInterval(240, units)).toBe('4 h');
  });
});
