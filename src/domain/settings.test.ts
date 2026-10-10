import { parseSettings } from './settings';
import { DEFAULT_SETTINGS } from '@/constants';
import type { Settings } from '@/types';

const stored: Settings = {
  interval: 60,
  activeWindow: { start: 22 * 60, end: 2 * 60 },
  chimeSound: 'soft-bell',
  vibrate: true,
  activityState: 'active',
};

describe('parseSettings', () => {
  test('returns the fresh-install defaults when nothing is stored', () => {
    expect(parseSettings(null)).toEqual({
      interval: 30,
      activeWindow: { start: 8 * 60, end: 22 * 60 },
      chimeSound: 'soft-bell',
      vibrate: false,
      activityState: 'paused',
    });
  });

  test('restores complete stored settings', () => {
    expect(parseSettings(JSON.stringify(stored))).toEqual(stored);
  });

  test('returns the defaults for a value that is not valid JSON', () => {
    expect(parseSettings('{"interval": 60,')).toEqual(DEFAULT_SETTINGS);
  });

  test('returns the defaults for JSON that is not an object', () => {
    expect(parseSettings('[60]')).toEqual(DEFAULT_SETTINGS);
  });

  test('fills fields missing from a partial value with their defaults', () => {
    expect(parseSettings(JSON.stringify({ vibrate: true }))).toEqual({ ...DEFAULT_SETTINGS, vibrate: true });
  });

  test('replaces each invalid field with its default and keeps the valid ones', () => {
    const raw = JSON.stringify({
      ...stored,
      interval: 45,
      chimeSound: 'air-horn',
      activityState: 'running',
    });

    expect(parseSettings(raw)).toEqual({
      ...stored,
      interval: DEFAULT_SETTINGS.interval,
      chimeSound: DEFAULT_SETTINGS.chimeSound,
      activityState: DEFAULT_SETTINGS.activityState,
    });
  });

  test('rejects an Active Window off the 15 minute grid', () => {
    const raw = JSON.stringify({ ...stored, activeWindow: { start: 8 * 60 + 5, end: 22 * 60 } });

    expect(parseSettings(raw).activeWindow).toEqual(DEFAULT_SETTINGS.activeWindow);
  });

  test('resets the Interval and Active Window when together they exceed the slot limit', () => {
    const raw = JSON.stringify({ ...stored, interval: 15, activeWindow: { start: 7 * 60, end: 22 * 60 } });

    expect(parseSettings(raw)).toEqual({
      ...stored,
      interval: DEFAULT_SETTINGS.interval,
      activeWindow: DEFAULT_SETTINGS.activeWindow,
    });
  });
});
