import { padZero } from '@/utils/helpers'

export function formatTime(time: number, uses24HourClock: boolean): string {
  const hours = Math.floor(time / 60)
  const minutes = padZero(time % 60)

  if (uses24HourClock) {
    return `${padZero(hours)}:${minutes}`
  }

  return `${hours % 12 || 12}:${minutes} ${hours < 12 ? 'AM' : 'PM'}`
}
