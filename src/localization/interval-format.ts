import type { Interval, Strings } from '@/types';

export function formatInterval(interval: Interval, units: Strings['units']): string {
  return interval < 60 ? `${interval} ${units.minutes}` : `${interval / 60} ${units.hours}`;
}
