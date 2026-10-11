import { describe, expect, test } from 'vitest'
import { formatTime } from './time-format'

function at(hours: number, minutes = 0): number {
  return hours * 60 + minutes
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
