import { isOneOf, isRecord, isTimeOfDay } from '@/utils/type-guards';
import { ACTIVITY_STATES, CHIME_SOUNDS, DEFAULT_SETTINGS, INTERVALS } from '@/constants';
import { exceedsChimeSlotLimit } from '@/domain/chime-schedule';
import type { ActiveWindow, Settings } from '@/types';

const parseActiveWindow = (value: unknown): ActiveWindow | null => {
  if (!isRecord(value) || !isTimeOfDay(value.start) || !isTimeOfDay(value.end)) {
    return null;
  }

  return { start: value.start, end: value.end };
};

const readJson = (raw: string | null): unknown => {
  if (raw === null) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const parseSettings = (raw: string | null): Settings => {
  const stored = readJson(raw);

  if (!isRecord(stored)) {
    return DEFAULT_SETTINGS;
  }

  const interval = isOneOf(INTERVALS, stored.interval) ? stored.interval : DEFAULT_SETTINGS.interval;
  const activeWindow = parseActiveWindow(stored.activeWindow) ?? DEFAULT_SETTINGS.activeWindow;
  const withinLimit = !exceedsChimeSlotLimit(activeWindow, interval);

  return {
    interval: withinLimit ? interval : DEFAULT_SETTINGS.interval,
    activeWindow: withinLimit ? activeWindow : DEFAULT_SETTINGS.activeWindow,
    chimeSound: isOneOf(CHIME_SOUNDS, stored.chimeSound) ? stored.chimeSound : DEFAULT_SETTINGS.chimeSound,
    vibrate: typeof stored.vibrate === 'boolean' ? stored.vibrate : DEFAULT_SETTINGS.vibrate,
    activityState: isOneOf(ACTIVITY_STATES, stored.activityState)
      ? stored.activityState
      : DEFAULT_SETTINGS.activityState,
  };
};
