import { chimeSlotCount, chimeSlots, exceedsChimeSlotLimit, nextChime } from './chime-schedule';
import type { ActiveWindow } from '@/types';

function at(hours: number): number {
  return hours * 60;
}

function between(startHour: number, endHour: number): ActiveWindow {
  return {
    start: at(startHour),
    end: at(endHour),
  };
}

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

describe('nextChime', () => {
  const daytime = chimeSlots(between(8, 22), 180);
  const overnight = chimeSlots(between(22, 2), 60);

  test('returns the next slot later today', () => {
    expect(nextChime(daytime, 'active', at(12))).toEqual({ time: at(14), tomorrow: false });
  });

  test('returns tomorrow\'s first slot after the last slot', () => {
    expect(nextChime(daytime, 'active', at(21))).toEqual({ time: at(8), tomorrow: true });
  });

  test('skips a slot that is happening right now', () => {
    expect(nextChime(daytime, 'active', at(11))).toEqual({ time: at(14), tomorrow: false });
  });

  test('returns none while paused', () => {
    expect(nextChime(daytime, 'paused', at(12))).toBeNull();
  });

  test('returns the midnight slot as tomorrow late in a midnight-crossing window', () => {
    expect(nextChime(overnight, 'active', at(23) + 30)).toEqual({ time: at(0), tomorrow: true });
  });

  test('returns a slot later today early in a midnight-crossing window', () => {
    expect(nextChime(overnight, 'active', 30)).toEqual({ time: at(1), tomorrow: false });
  });
});
