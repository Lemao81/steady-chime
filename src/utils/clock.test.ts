import { describe, expect, test } from 'vitest'
import { minuteOfDay, msUntilNextMinute } from './clock'

describe('minuteOfDay', () => {
  test('counts minutes since local midnight', () => {
    expect(minuteOfDay(new Date(2026, 10, 7, 0, 0, 59))).toBe(0)
    expect(minuteOfDay(new Date(2026, 10, 7, 14, 35, 20))).toBe(14 * 60 + 35)
    expect(minuteOfDay(new Date(2026, 10, 7, 23, 59))).toBe(1439)
  })
})

describe('msUntilNextMinute', () => {
  test('waits a full minute on a minute boundary', () => {
    expect(msUntilNextMinute(new Date(2026, 10, 7, 9, 0, 0, 0))).toBe(60_000)
  })

  test('waits only the rest of the current minute', () => {
    expect(msUntilNextMinute(new Date(2026, 10, 7, 9, 0, 45, 500))).toBe(14_500)
  })
})
