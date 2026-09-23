import type { INTERVALS } from '@/constants';

export type Interval = (typeof INTERVALS)[number];

export type ActiveWindow = {
  start: number;
  end: number;
};

export type ChimeSlot = number;

export type ActivityState = 'active' | 'paused';

export type NextChime = {
  time: ChimeSlot;
  tomorrow: boolean;
};
