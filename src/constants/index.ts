import type { ChimeSound, Language, Settings, ThemeColors } from '@/types';

export const MINUTES_PER_DAY = 1440;

export const MAX_CHIME_SLOTS = 60;

export const ACTIVE_WINDOW_STEP = 15;

export const ACTIVE_WINDOW_TIMES = Array.from(
  { length: MINUTES_PER_DAY / ACTIVE_WINDOW_STEP },
  (_, i) => i * ACTIVE_WINDOW_STEP,
);

export const INTERVALS = [15, 20, 30, 60, 120, 180, 240] as const;

export const CHIME_SOUNDS = [
  'soft-bell',
  'boxing-bell',
  'triangle-chime',
  'jaw-harp',
  'harmonic-guitar',
  'boom-piano',
] as const;

export const CHIME_SOUND_FILES: Record<ChimeSound, string> = {
  'soft-bell': 'soft_bell.wav',
  'boxing-bell': 'boxing_bell.wav',
  'triangle-chime': 'triangle_chime.wav',
  'jaw-harp': 'jaw_harp.wav',
  'harmonic-guitar': 'harmonic_guitar.wav',
  'boom-piano': 'boom_piano.wav',
};

export const ACTIVITY_STATES = ['active', 'paused'] as const;

export const DEFAULT_SETTINGS: Settings = {
  interval: 30,
  activeWindow: { start: 8 * 60, end: 22 * 60 },
  chimeSound: 'soft-bell',
  vibrate: false,
  activityState: 'paused',
};

export const THEME_COLORS: Record<'light' | 'dark', ThemeColors> = {
  light: { background: '#ffffff', text: '#000000' },
  dark: { background: '#000000', text: '#ffffff' },
};

export const LANGUAGES = ['en', 'de'] as const;

export const FALLBACK_LANGUAGE: Language = 'en';

export const SETTING_LABEL_WIDTH = 120;
