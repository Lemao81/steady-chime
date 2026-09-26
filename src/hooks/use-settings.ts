import { useEffect, useSyncExternalStore } from 'react';
import { getSettings, loadSettings, subscribeToSettings, updateSettings } from '@/storage/settings';
import type { Settings } from '@/types';

type SettingsHook = {
  settings: Settings | null;
  updateSettings: (changes: Partial<Settings>) => Promise<void>;
};

export function useSettings(): SettingsHook {
  const settings = useSyncExternalStore(subscribeToSettings, getSettings);

  useEffect(() => {
    void loadSettings();
  }, []);

  return { settings, updateSettings };
}
