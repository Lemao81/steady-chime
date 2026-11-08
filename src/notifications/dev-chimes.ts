import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
import { CHIME_IDENTIFIER_PREFIX } from '@/constants'
import { chimeContent, ensureChimeChannel } from '@/notifications/chimes'
import type { Settings, Strings } from '@/types'
import { minuteOfDay } from '@/utils/clock'

export const TEST_CHIME_DELAY_S = 10

export async function scheduleTestChime(
  settings: Settings,
  strings: Strings,
  formatTime: (time: number) => string,
): Promise<void> {
  const channelId =
    Platform.OS === 'android' ? await ensureChimeChannel(settings, strings) : undefined

  const firesAt = new Date(Date.now() + TEST_CHIME_DELAY_S * 1000)

  await Notifications.scheduleNotificationAsync({
    identifier: 'test-chime',
    content: chimeContent(settings, minuteOfDay(firesAt), formatTime),
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      channelId,
      seconds: TEST_CHIME_DELAY_S,
    },
  })
}

export async function scheduledChimeCount(): Promise<number> {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync()

  return scheduled.filter((s) => s.identifier.startsWith(CHIME_IDENTIFIER_PREFIX)).length
}
