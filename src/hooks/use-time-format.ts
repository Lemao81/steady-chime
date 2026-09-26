import { useCalendars } from 'expo-localization';
import { formatTime } from '@/localization/time-format';

export function useTimeFormat(): (time: number) => string {
  const uses24HourClock = useCalendars()[0].uses24hourClock ?? true;

  return (time) => formatTime(time, uses24HourClock);
}
