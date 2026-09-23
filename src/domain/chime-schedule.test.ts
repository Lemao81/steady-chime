import { chimeSlotCount, chimeSlots, exceedsChimeSlotLimit } from './chime-schedule';
import type { ActiveWindow } from '@/types';

const at = (hours: number): number => hours * 60;

const between = (startHour: number, endHour: number): ActiveWindow => ({
  start: at(startHour),
  end: at(endHour),
});

describe('chimeSlots', () => {
  test('starts at the window start and repeats every whole interval', () => {
    expect(chimeSlots(between(8, 22), 180)).toEqual([at(8), at(11), at(14), at(17), at(20)]);
  });

  test('includes the end edge when the interval divides the window exactly', () => {
    expect(chimeSlots(between(8, 20), 180)).toEqual([at(8), at(11), at(14), at(17), at(20)]);
  });

  test('wraps around midnight', () => {
    expect(chimeSlots(between(22, 2), 60)).toEqual([at(22), at(23), at(0), at(1), at(2)]);
  });

  test('yields the start alone when the window has no length', () => {
    expect(chimeSlots(between(8, 8), 30)).toEqual([at(8)]);
  });
});

describe('chimeSlotCount', () => {
  test('agrees with the number of slots produced', () => {
    expect(chimeSlotCount(between(8, 22), 15)).toBe(chimeSlots(between(8, 22), 15).length);
  });
});

describe('exceedsChimeSlotLimit', () => {
  test('rejects a 15 minute interval across a 15 hour window', () => {
    expect(exceedsChimeSlotLimit(between(7, 22), 15)).toBe(true);
  });

  test('accepts a 15 minute interval across a 14 hour window', () => {
    expect(exceedsChimeSlotLimit(between(8, 22), 15)).toBe(false);
  });
});
