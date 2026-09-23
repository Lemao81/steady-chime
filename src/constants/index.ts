import type { Settings } from '@/types';

export const MINUTES_PER_DAY = 1440;

export const MAX_CHIME_SLOTS = 60;

export const ACTIVE_WINDOW_STEP = 15;

export const INTERVALS = [15, 20, 30, 60, 120, 180, 240] as const;

export const CHIME_SOUNDS = ['soft-bell'] as const;

export const ACTIVITY_STATES = ['active', 'paused'] as const;

export const DEFAULT_SETTINGS: Settings = {
  interval: 30,
  activeWindow: { start: 8 * 60, end: 22 * 60 },
  chimeSound: 'soft-bell',
  vibrate: false,
  activityState: 'paused',
};
