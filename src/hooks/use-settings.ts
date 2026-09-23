import { useEffect, useSyncExternalStore } from 'react';
import { getSettings, loadSettings, subscribeToSettings, updateSettings } from '@/storage/settings';
import type { Settings } from '@/types';

type SettingsHook = {
  settings: Settings | null;
  updateSettings: (changes: Partial<Settings>) => Promise<void>;
};

export const useSettings = (): SettingsHook => {
  const settings = useSyncExternalStore(subscribeToSettings, getSettings);

  useEffect(() => {
    loadSettings();
  }, []);

  return { settings, updateSettings };
};
