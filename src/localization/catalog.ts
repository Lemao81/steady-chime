import type { Language, Strings } from '@/types';

export const CATALOG: Record<Language, Strings> = {
  en: {
    tabs: { home: 'Home', settings: 'Settings' },
    settings: {
      interval: 'Interval',
      activeWindowStart: 'Active from',
      activeWindowEnd: 'Active until',
      chimeSound: 'Chime Sound',
      vibrate: 'Vibrate',
      slotLimitExceeded: (maxSlots) =>
        `That would be more than ${maxSlots} Chimes a day. Choose a longer Interval or a shorter Active Window.`,
    },
    chimeSounds: {
      'soft-bell': 'Soft Bell',
      'boxing-bell': 'Boxing Bell',
      'triangle-chime': 'Triangle Chime',
      'jaw-harp': 'Jaw Harp',
      'harmonic-guitar': 'Harmonic Guitar',
      'boom-piano': 'Boom Piano',
    },
    units: { minutes: 'min', hours: 'h' },
  },
  de: {
    tabs: { home: 'Start', settings: 'Einstellungen' },
    settings: {
      interval: 'Intervall',
      activeWindowStart: 'Aktiv ab',
      activeWindowEnd: 'Aktiv bis',
      chimeSound: 'Signalton',
      vibrate: 'Vibrieren',
      slotLimitExceeded: (maxSlots) =>
        `Das wären mehr als ${maxSlots} Signale am Tag. Wähle ein längeres Intervall oder einen kürzeren aktiven Zeitraum.`,
    },
    chimeSounds: {
      'soft-bell': 'Sanfte Glocke',
      'boxing-bell': 'Boxglocke',
      'triangle-chime': 'Triangel',
      'jaw-harp': 'Maulharfe',
      'harmonic-guitar': 'Gitarre Harmonisch',
      'boom-piano': 'Boom Piano',
    },
    units: { minutes: 'Min.', hours: 'Std.' },
  },
};
