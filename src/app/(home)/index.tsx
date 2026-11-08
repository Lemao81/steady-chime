import { Button, Column, Host, Text } from '@expo/ui'
import { fillMaxWidth } from '@expo/ui/jetpack-compose/modifiers'
import { frame } from '@expo/ui/swift-ui/modifiers'
import { useRouter } from 'expo-router'
import type { JSX } from 'react'
import { Platform, View } from 'react-native'
import { chimeSlots, nextChime } from '@/domain/chime-schedule'
import { permissionNotice } from '@/domain/permissions'
import { useChimePermissions } from '@/hooks/use-chime-permissions'
import { useMinuteOfDay } from '@/hooks/use-minute-of-day'
import { useSettings } from '@/hooks/use-settings'
import { useStrings } from '@/hooks/use-strings'
import { useTimeFormat } from '@/hooks/use-time-format'
import { formatSummary } from '@/localization/formatters'
import { activate, pause } from '@/notifications/activation'
import { openExactAlarmSettings, openNotificationSettings } from '@/notifications/permissions'
import type { Settings } from '@/types'

const FULL_WIDTH = Platform.OS === 'ios' ? [frame({ maxWidth: Infinity })] : [fillMaxWidth()]

const DevTools: typeof import('@/components/DevTools').DevTools | null = __DEV__
  ? require('@/components/DevTools').DevTools
  : null

export default function HomeScreen(): JSX.Element | null {
  const { settings } = useSettings()
  const permissions = useChimePermissions()
  const strings = useStrings()
  const formatTime = useTimeFormat()
  const router = useRouter()
  const now = useMinuteOfDay()

  if (settings === null) {
    return null
  }

  const active = settings.activityState === 'active'
  const next = nextChime(
    chimeSlots(settings.activeWindow, settings.interval),
    settings.activityState,
    now,
  )

  const notice = permissions === null ? null : permissionNotice(settings.activityState, permissions)

  function toggleActivity(current: Settings): void {
    const change = active ? pause() : activate(current, strings)

    void change.catch(() => undefined)
  }

  function openSystemSettings(): void {
    const opening =
      notice === 'notifications-denied' ? openNotificationSettings() : openExactAlarmSettings()

    void opening.catch(() => undefined)
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Host matchContents={{ vertical: true }}>
        <Column alignment="center" spacing={24} modifiers={FULL_WIDTH}>
          <Column alignment="center" spacing={4}>
            <Text>{strings.home.nextChime}</Text>
            <Text testID="next-chime" textStyle={{ fontSize: 48, fontWeight: 'bold' }}>
              {next === null ? strings.home.noNextChime : formatTime(next.time)}
            </Text>
            {next?.tomorrow === true && <Text>{strings.home.tomorrow}</Text>}
          </Column>
          <Button
            testID="toggle-activity"
            label={active ? strings.home.pause : strings.home.activate}
            variant={active ? 'outlined' : 'filled'}
            onPress={() => toggleActivity(settings)}
          />
          <Button
            testID="settings-summary"
            label={formatSummary(settings, strings, formatTime)}
            variant="text"
            onPress={() => router.navigate('/settings')}
          />
          {notice !== null && (
            <Column alignment="center" spacing={8}>
              <Text textStyle={{ textAlign: 'center' }}>
                {notice === 'notifications-denied'
                  ? strings.permissions.notificationsDenied
                  : strings.permissions.exactAlarmsDenied}
              </Text>
              <Button
                testID="open-system-settings"
                label={strings.permissions.openSystemSettings}
                variant="outlined"
                onPress={openSystemSettings}
              />
            </Column>
          )}
          {DevTools !== null && <DevTools settings={settings} />}
        </Column>
      </Host>
    </View>
  )
}
