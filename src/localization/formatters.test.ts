import { describe, expect, test } from 'vitest'
import { DEFAULT_SETTINGS } from '@/constants'
import { CATALOG } from './catalog'
import { formatInterval, formatSummary, formatTime } from './formatters'

function at(hours: number, minutes = 0): number {
  return hours * 60 + minutes
}

function format24h(time: number): string {
  return formatTime(time, true)
}

describe('formatTime in 24 h', () => {
  test('pads hours and minutes to two digits', () => {
    expect(formatTime(at(8, 5), true)).toBe('08:05')
  })

  test('shows midnight as 00:00', () => {
    expect(formatTime(at(0), true)).toBe('00:00')
  })

  test('shows the last quarter of the day', () => {
    expect(formatTime(at(23, 45), true)).toBe('23:45')
  })
})

describe('formatTime in 12 h', () => {
  test('marks morning times AM without padding the hour', () => {
    expect(formatTime(at(8, 5), false)).toBe('8:05 AM')
  })

  test('marks afternoon times PM', () => {
    expect(formatTime(at(22, 30), false)).toBe('10:30 PM')
  })

  test('shows midnight as 12 AM', () => {
    expect(formatTime(at(0), false)).toBe('12:00 AM')
  })

  test('shows noon as 12 PM', () => {
    expect(formatTime(at(12), false)).toBe('12:00 PM')
  })
})

describe('formatInterval', () => {
  const units = { minutes: 'min', hours: 'h' }

  test('shows Intervals under an hour in minutes', () => {
    expect(formatInterval(20, units)).toBe('20 min')
  })

  test('shows whole-hour Intervals in hours', () => {
    expect(formatInterval(60, units)).toBe('1 h')
    expect(formatInterval(240, units)).toBe('4 h')
  })
})

describe('formatSummary', () => {
  test('joins Interval, Active Window and Chime Sound', () => {
    expect(formatSummary(DEFAULT_SETTINGS, CATALOG.en, format24h)).toBe(
      'Every 30 min · 08:00–22:00 · Soft Bell',
    )
  })

  test('uses the language of the catalog', () => {
    const settings = {
      ...DEFAULT_SETTINGS,
      interval: 120 as const,
      chimeSound: 'jaw-harp' as const,
    }

    expect(formatSummary(settings, CATALOG.de, format24h)).toBe(
      'Alle 2 Std. · 08:00–22:00 · Maulharfe',
    )
  })
})
