import { describe, expect, test } from 'vitest'
import { permissionNotice } from './permissions'

describe('permissionNotice', () => {
  test('is empty when everything is allowed', () => {
    expect(permissionNotice('active', { notifications: 'granted', exactAlarms: true })).toBeNull()
  })

  test('is empty on a fresh install that has not asked yet', () => {
    expect(
      permissionNotice('paused', { notifications: 'undetermined', exactAlarms: false }),
    ).toBeNull()
  })

  test('explains denied notifications while Paused', () => {
    expect(permissionNotice('paused', { notifications: 'denied', exactAlarms: true })).toBe(
      'notifications-denied',
    )
  })

  test('prefers denied notifications over refused exact alarms', () => {
    expect(permissionNotice('active', { notifications: 'denied', exactAlarms: false })).toBe(
      'notifications-denied',
    )
  })

  test('warns about late Chimes while Active without exact alarms', () => {
    expect(permissionNotice('active', { notifications: 'granted', exactAlarms: false })).toBe(
      'exact-alarms-denied',
    )
  })

  test('ignores refused exact alarms while Paused', () => {
    expect(permissionNotice('paused', { notifications: 'granted', exactAlarms: false })).toBeNull()
  })
})
