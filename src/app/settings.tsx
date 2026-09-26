import { Checkbox, FieldGroup, Host, Picker, Text } from '@expo/ui';
import { useState } from 'react';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingRow } from '@/components/SettingRow';
import { ACTIVE_WINDOW_TIMES, INTERVALS, MAX_CHIME_SLOTS } from '@/constants';
import { exceedsChimeSlotLimit } from '@/domain/chime-schedule';
import { useSettings } from '@/hooks/use-settings';
import { useStrings } from '@/hooks/use-strings';
import { useTimeFormat } from '@/hooks/use-time-format';
import { formatInterval } from '@/localization/interval-format';
import type { ActiveWindow, Interval } from '@/types';

export default function SettingsScreen() {
  const { settings, updateSettings } = useSettings();
  const strings = useStrings();
  const formatTime = useTimeFormat();
  const [limitExceeded, setLimitExceeded] = useState(false);

  if (settings === null) {
    return null;
  }

  const { interval, activeWindow } = settings;

  function changeSchedule(nextInterval: Interval, nextActiveWindow: ActiveWindow): void {
    const exceeds = exceedsChimeSlotLimit(nextActiveWindow, nextInterval);

    setLimitExceeded(exceeds);

    if (!exceeds) {
      void updateSettings({ interval: nextInterval, activeWindow: nextActiveWindow });
    }
  }

  const timeItems = ACTIVE_WINDOW_TIMES.map((t) => <Picker.Item key={t} label={formatTime(t)} value={t} />);

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <Host style={{ flex: 1 }}>
        <FieldGroup>
          <FieldGroup.Section>
            <SettingRow label={strings.settings.interval}>
              <Picker selectedValue={interval} onValueChange={(i) => changeSchedule(i, activeWindow)}>
                {INTERVALS.map((i) => (
                  <Picker.Item key={i} label={formatInterval(i, strings.units)} value={i} />
                ))}
              </Picker>
            </SettingRow>
            <SettingRow label={strings.settings.activeWindowStart}>
              <Picker
                selectedValue={activeWindow.start}
                onValueChange={(s) => changeSchedule(interval, { ...activeWindow, start: s })}
              >
                {timeItems}
              </Picker>
            </SettingRow>
            <SettingRow label={strings.settings.activeWindowEnd}>
              <Picker
                selectedValue={activeWindow.end}
                onValueChange={(e) => changeSchedule(interval, { ...activeWindow, end: e })}
              >
                {timeItems}
              </Picker>
            </SettingRow>
            {limitExceeded && (
              <FieldGroup.SectionFooter>
                <Text>{strings.settings.slotLimitExceeded(MAX_CHIME_SLOTS)}</Text>
              </FieldGroup.SectionFooter>
            )}
          </FieldGroup.Section>
          {Platform.OS === 'android' && (
            <FieldGroup.Section>
              <Checkbox
                label={strings.settings.vibrate}
                value={settings.vibrate}
                onValueChange={(v) => void updateSettings({ vibrate: v })}
              />
            </FieldGroup.Section>
          )}
        </FieldGroup>
      </Host>
    </SafeAreaView>
  );
}
