import { Platform } from 'react-native'
import { ensureChimeChannel } from '@/notifications/chimes'
import {
  openExactAlarmSettings,
  promptForNotificationPermission,
  refreshPermissions,
} from '@/notifications/permissions'
import { getSettings, loadSettings, updateSettings } from '@/storage/settings'
import type { Settings, Strings } from '@/types'

export async function activate(settings: Settings, strings: Strings): Promise<void> {
  if (Platform.OS === 'android') {
    await ensureChimeChannel(settings, strings)
  }

  const { permissions, prompted } = await promptForNotificationPermission()

  if (permissions.notifications !== 'granted') {
    return
  }

  await updateSettings({ activityState: 'active' })

  if (prompted && !permissions.exactAlarms) {
    void openExactAlarmSettings().catch(() => undefined)
  }
}

export function pause(): Promise<void> {
  return updateSettings({ activityState: 'paused' })
}

export async function enforcePermissions(): Promise<void> {
  const [permissions] = await Promise.all([refreshPermissions(), loadSettings()])

  if (getSettings()?.activityState === 'active' && permissions.notifications !== 'granted') {
    await pause()
  }
}
