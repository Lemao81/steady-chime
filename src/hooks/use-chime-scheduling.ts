import { useEffect } from 'react';
import { AppState } from 'react-native';
import { useSettings } from '@/hooks/use-settings';
import { useStrings } from '@/hooks/use-strings';
import { useTimeFormat } from '@/hooks/use-time-format';
import { clearDeliveredChimes, configureForegroundChimes, syncChimes } from '@/notifications/chimes';

export function useChimeScheduling(): void {
  const { settings } = useSettings();
  const strings = useStrings();
  const formatTime = useTimeFormat();

  useEffect(() => {
    configureForegroundChimes();
    void clearDeliveredChimes().catch(() => undefined);

    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        void clearDeliveredChimes().catch(() => undefined);
      }
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (settings !== null) {
      void syncChimes(settings, strings, formatTime).catch(() => undefined);
    }
  }, [settings, strings, formatTime]);
}
