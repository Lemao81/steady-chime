import { MAX_CHIME_SLOTS, MINUTES_PER_DAY } from '@/constants';
import type { ActiveWindow, ChimeSlot, Interval } from '@/types';

export const activeWindowLength = (activeWindow: ActiveWindow): number =>
  (activeWindow.end - activeWindow.start + MINUTES_PER_DAY) % MINUTES_PER_DAY;

export const chimeSlotCount = (activeWindow: ActiveWindow, interval: Interval): number =>
  Math.floor(activeWindowLength(activeWindow) / interval) + 1;

export const exceedsChimeSlotLimit = (activeWindow: ActiveWindow, interval: Interval): boolean =>
  chimeSlotCount(activeWindow, interval) > MAX_CHIME_SLOTS;

export const chimeSlots = (activeWindow: ActiveWindow, interval: Interval): ChimeSlot[] => {
  const length = activeWindowLength(activeWindow);
  const slots: ChimeSlot[] = [];

  for (let offset = 0; offset <= length; offset += interval) {
    slots.push((activeWindow.start + offset) % MINUTES_PER_DAY);
  }

  return slots;
};
