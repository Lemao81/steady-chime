import type { INTERVALS } from '@/constants';

export type Interval = (typeof INTERVALS)[number];

export type ActiveWindow = {
  start: number;
  end: number;
};

export type ChimeSlot = number;
