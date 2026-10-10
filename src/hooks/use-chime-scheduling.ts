import { useEffect } from 'react';
import { AppState } from 'react-native';
import { useChimePermissions } from '@/hooks/use-chime-permissions';
import { useSettings } from '@/hooks/use-settings';
import { useStrings } from '@/hooks/use-strings';
import { useTimeFormat } from '@/hooks/use-time-format';
import { enforcePermissions } from '@/notifications/activation';
import { clearDeliveredChimes, configureForegroundChimes, syncChimes } from '@/notifications/chimes';

function onForeground(): void {
  void clearDeliveredChimes().catch(() => undefined);
  void enforcePermissions().catch(() => undefined);
}

export function useChimeScheduling(): void {
  const { settings } = useSettings();
  const permissions = useChimePermissions();
  const strings = useStrings();
  const formatTime = useTimeFormat();
  const exactAlarms = permissions?.exactAlarms;

  useEffect(() => {
    configureForegroundChimes();
    onForeground();

    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        onForeground();
      }
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (settings !== null && exactAlarms !== undefined) {
      void syncChimes(settings, strings, formatTime).catch(() => undefined);
    }
  }, [settings, strings, formatTime, exactAlarms]);
}
