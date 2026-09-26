import type { Language, Strings } from '@/types';

export const CATALOG: Record<Language, Strings> = {
  en: {
    tabs: { home: 'Home', settings: 'Settings' },
    settings: {
      interval: 'Interval',
      activeWindowStart: 'Active from',
      activeWindowEnd: 'Active until',
      vibrate: 'Vibrate',
      slotLimitExceeded: (maxSlots) =>
        `That would be more than ${maxSlots} Chimes a day. Choose a longer Interval or a shorter Active Window.`,
    },
    units: { minutes: 'min', hours: 'h' },
  },
  de: {
    tabs: { home: 'Start', settings: 'Einstellungen' },
    settings: {
      interval: 'Intervall',
      activeWindowStart: 'Aktiv ab',
      activeWindowEnd: 'Aktiv bis',
      vibrate: 'Vibrieren',
      slotLimitExceeded: (maxSlots) =>
        `Das wären mehr als ${maxSlots} Signale am Tag. Wähle ein längeres Intervall oder einen kürzeren aktiven Zeitraum.`,
    },
    units: { minutes: 'Min.', hours: 'Std.' },
  },
};
