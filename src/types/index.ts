import type { ACTIVITY_STATES, CHIME_SOUNDS, INTERVALS, LANGUAGES } from '@/constants';

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

export type NotificationPermission = 'granted' | 'denied' | 'undetermined';

export type ChimePermissions = {
  notifications: NotificationPermission;
  exactAlarms: boolean;
};

export type PermissionNotice = 'notifications-denied' | 'exact-alarms-denied';

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

export type Language = (typeof LANGUAGES)[number];

export type Strings = {
  tabs: {
    home: string;
    settings: string;
  };
  settings: {
    interval: string;
    activeWindowStart: string;
    activeWindowEnd: string;
    chimeSound: string;
    playChimeSound: string;
    vibrate: string;
    slotLimitExceeded: (maxSlots: number) => string;
  };
  permissions: {
    notificationsDenied: string;
    exactAlarmsDenied: string;
    openSystemSettings: string;
  };
  chimeSounds: Record<ChimeSound, string>;
  units: {
    minutes: string;
    hours: string;
  };
};
