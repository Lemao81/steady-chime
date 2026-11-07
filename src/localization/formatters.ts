import type { Interval, Settings, Strings } from '@/types'
import { padZero } from '@/utils/helpers'

export function formatTime(time: number, uses24HourClock: boolean): string {
  const hours = Math.floor(time / 60)
  const minutes = padZero(time % 60)

  if (uses24HourClock) {
    return `${padZero(hours)}:${minutes}`
  }

  return `${hours % 12 || 12}:${minutes} ${hours < 12 ? 'AM' : 'PM'}`
}

export function formatInterval(interval: Interval, units: Strings['units']): string {
  return interval < 60 ? `${interval} ${units.minutes}` : `${interval / 60} ${units.hours}`
}

export function formatSummary(
  settings: Settings,
  strings: Strings,
  formatLocalTime: (time: number) => string,
): string {
  return strings.home.summary(
    formatInterval(settings.interval, strings.units),
    `${formatLocalTime(settings.activeWindow.start)}–${formatLocalTime(settings.activeWindow.end)}`,
    strings.chimeSounds[settings.chimeSound],
  )
}
