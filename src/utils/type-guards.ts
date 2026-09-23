import { ACTIVE_WINDOW_STEP, MINUTES_PER_DAY } from '@/constants';

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const isOneOf = <T>(options: readonly T[], value: unknown): value is T =>
  (options as readonly unknown[]).includes(value);

export const isTimeOfDay = (value: unknown): value is number =>
  typeof value === 'number' &&
  Number.isInteger(value) &&
  value >= 0 &&
  value < MINUTES_PER_DAY &&
  value % ACTIVE_WINDOW_STEP === 0;
