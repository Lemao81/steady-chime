import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { APP_NAME, CHIME_SOUND_FILES, CHIME_VIBRATION_PATTERN } from '@/constants';
import { chimeSlots } from '@/domain/chime-schedule';
import type { ChimeSound, Settings, Strings } from '@/types';

let pending: Promise<void> = Promise.resolve();

function chimeChannelId(sound: ChimeSound, vibrate: boolean): string {
  return `chime-${sound}${vibrate ? '-vibrate' : ''}`;
}

export async function ensureChimeChannel(settings: Settings, strings: Strings): Promise<string> {
  const channelId = chimeChannelId(settings.chimeSound, settings.vibrate);
  const soundName = strings.chimeSounds[settings.chimeSound];

  await Notifications.setNotificationChannelAsync(channelId, {
    name: settings.vibrate ? `${soundName} · ${strings.settings.vibrate}` : soundName,
    importance: Notifications.AndroidImportance.DEFAULT,
    sound: CHIME_SOUND_FILES[settings.chimeSound],
    enableVibrate: settings.vibrate,
    vibrationPattern: settings.vibrate ? CHIME_VIBRATION_PATTERN : null,
  });

  return channelId;
}

async function applyChimes(settings: Settings, strings: Strings, formatTime: (time: number) => string): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();

  if (settings.activityState === 'paused') {
    return;
  }

  const channelId = Platform.OS === 'android' ? await ensureChimeChannel(settings, strings) : undefined;
  const slots = chimeSlots(settings.activeWindow, settings.interval);

  await Promise.all(
    slots.map((slot) =>
      Notifications.scheduleNotificationAsync({
        identifier: `chime-${slot}`,
        content: {
          title: `${APP_NAME} · ${formatTime(slot)}`,
          sound: CHIME_SOUND_FILES[settings.chimeSound],
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          channelId,
          hour: Math.floor(slot / 60),
          minute: slot % 60,
        },
      }),
    ),
  );
}

export function syncChimes(settings: Settings, strings: Strings, formatTime: (time: number) => string): Promise<void> {
  pending = pending.catch(() => undefined).then(() => applyChimes(settings, strings, formatTime));

  return pending;
}

export function configureForegroundChimes(): void {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldShowBanner: false,
      shouldShowList: true,
      shouldSetBadge: false,
    }),
  });
}

export function clearDeliveredChimes(): Promise<void> {
  return Notifications.dismissAllNotificationsAsync();
}
