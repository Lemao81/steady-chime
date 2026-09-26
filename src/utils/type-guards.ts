import { ACTIVE_WINDOW_STEP, MINUTES_PER_DAY } from '@/constants';

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isOneOf<T>(options: readonly T[], value: unknown): value is T {
  return (options as readonly unknown[]).includes(value);
}

export function isTimeOfDay(value: unknown): value is number {
  return (
    typeof value === 'number' &&
    Number.isInteger(value) &&
    value >= 0 &&
    value < MINUTES_PER_DAY &&
    value % ACTIVE_WINDOW_STEP === 0
  );
}
