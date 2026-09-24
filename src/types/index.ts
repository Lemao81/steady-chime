import type { ACTIVITY_STATES, CHIME_SOUNDS, INTERVALS } from '@/constants';

export type Interval = (typeof INTERVALS)[number];

export type ActiveWindow = {
  start: number;
  end: number;
};

export type ChimeSlot = number;

export type ActivityState = (typeof ACTIVITY_STATES)[number];

export type NextChime = {
  time: ChimeSlot;
  tomorrow: boolean;
};

export type ChimeSound = (typeof CHIME_SOUNDS)[number];

export type Settings = {
  interval: Interval;
  activeWindow: ActiveWindow;
  chimeSound: ChimeSound;
  vibrate: boolean;
  activityState: ActivityState;
};

export type ThemeColors = {
  background: string;
  text: string;
};
