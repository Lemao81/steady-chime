import * as Notifications from 'expo-notifications';
import { Linking } from 'react-native';
import ExactAlarm from '../../modules/exact-alarm/src/ExactAlarmModule';
import type { ChimePermissions, NotificationPermission } from '@/types';

type NotificationPermissionPrompt = {
  permissions: ChimePermissions;
  prompted: boolean;
};

const listeners = new Set<() => void>();

let current: ChimePermissions | null = null;

function toNotificationPermission(response: Notifications.NotificationPermissionsStatus): NotificationPermission {
  if (response.granted) {
    return 'granted';
  }

  return response.status === Notifications.PermissionStatus.UNDETERMINED ? 'undetermined' : 'denied';
}

function publish(response: Notifications.NotificationPermissionsStatus): ChimePermissions {
  current = {
    notifications: toNotificationPermission(response),
    exactAlarms: ExactAlarm?.canScheduleExactAlarms() ?? true,
  };

  listeners.forEach((l) => l());

  return current;
}

export function getPermissions(): ChimePermissions | null {
  return current;
}

export function subscribeToPermissions(listener: () => void): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export async function refreshPermissions(): Promise<ChimePermissions> {
  return publish(await Notifications.getPermissionsAsync());
}

export async function promptForNotificationPermission(): Promise<NotificationPermissionPrompt> {
  const response = await Notifications.getPermissionsAsync();

  if (response.granted || !response.canAskAgain) {
    return { permissions: publish(response), prompted: false };
  }

  const answer = await Notifications.requestPermissionsAsync({ ios: { allowAlert: true, allowSound: true } });

  return { permissions: publish(answer), prompted: true };
}

export function openNotificationSettings(): Promise<void> {
  return Linking.openSettings();
}

export function openExactAlarmSettings(): void {
  ExactAlarm?.openExactAlarmSettings();
}
