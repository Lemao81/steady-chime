import { Button, FieldGroup, Host, Icon, Row, Switch, Text } from '@expo/ui'
import { weight } from '@expo/ui/jetpack-compose/modifiers'
import { type JSX, useState } from 'react'
import { Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SettingPicker } from '@/components/SettingPicker'
import { SettingRow } from '@/components/SettingRow'
import { ACTIVE_WINDOW_TIMES, CHIME_SOUNDS, INTERVALS, MAX_CHIME_SLOTS } from '@/constants'
import { exceedsChimeSlotLimit } from '@/domain/chime-schedule'
import { useChimeSoundPreview } from '@/hooks/use-chime-sound-preview'
import { useSettings } from '@/hooks/use-settings'
import { useStrings } from '@/hooks/use-strings'
import { useTimeFormat } from '@/hooks/use-time-format'
import { formatInterval } from '@/localization/interval-format'
import type { ActiveWindow, Interval } from '@/types'

const PLAY_ICON = Icon.select({
  ios: 'play.fill',
  android: import('@expo/material-symbols/play_arrow.xml'),
})

export default function SettingsScreen(): JSX.Element | null {
  const { settings, updateSettings } = useSettings()
  const strings = useStrings()
  const formatTime = useTimeFormat()
  const previewChimeSound = useChimeSoundPreview()
  const [limitExceeded, setLimitExceeded] = useState(false)

  if (settings === null) {
    return null
  }

  const { interval, activeWindow } = settings

  function changeSchedule(nextInterval: Interval, nextActiveWindow: ActiveWindow): void {
    const exceeds = exceedsChimeSlotLimit(nextActiveWindow, nextInterval)

    setLimitExceeded(exceeds)

    if (!exceeds) {
      void updateSettings({ interval: nextInterval, activeWindow: nextActiveWindow })
    }
  }

  const intervalOptions = INTERVALS.map((i) => ({
    label: formatInterval(i, strings.units),
    value: i,
  }))

  const timeOptions = ACTIVE_WINDOW_TIMES.map((t) => ({ label: formatTime(t), value: t }))
  const chimeSoundOptions = CHIME_SOUNDS.map((s) => ({ label: strings.chimeSounds[s], value: s }))

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <Host style={{ flex: 1 }}>
        <FieldGroup>
          <FieldGroup.Section>
            <SettingRow label={strings.settings.interval}>
              <SettingPicker
                options={intervalOptions}
                selectedValue={interval}
                onValueChange={(i) => changeSchedule(i, activeWindow)}
              />
            </SettingRow>
            <SettingRow label={strings.settings.activeWindowStart}>
              <SettingPicker
                options={timeOptions}
                selectedValue={activeWindow.start}
                onValueChange={(s) => changeSchedule(interval, { ...activeWindow, start: s })}
              />
            </SettingRow>
            <SettingRow label={strings.settings.activeWindowEnd}>
              <SettingPicker
                options={timeOptions}
                selectedValue={activeWindow.end}
                onValueChange={(e) => changeSchedule(interval, { ...activeWindow, end: e })}
              />
            </SettingRow>
            {limitExceeded && (
              <FieldGroup.SectionFooter>
                <Text>{strings.settings.slotLimitExceeded(MAX_CHIME_SLOTS)}</Text>
              </FieldGroup.SectionFooter>
            )}
          </FieldGroup.Section>
          <FieldGroup.Section>
            <SettingRow label={strings.settings.chimeSound}>
              <Row modifiers={Platform.OS === 'android' ? [weight(1)] : undefined}>
                <SettingPicker
                  options={chimeSoundOptions}
                  selectedValue={settings.chimeSound}
                  onValueChange={(s) => void updateSettings({ chimeSound: s })}
                />
              </Row>
              <Button
                testID="play-chime-sound"
                variant="text"
                onPress={() => previewChimeSound(settings.chimeSound)}
              >
                <Icon name={PLAY_ICON} accessibilityLabel={strings.settings.playChimeSound} />
              </Button>
            </SettingRow>
          </FieldGroup.Section>
          {Platform.OS === 'android' && (
            <FieldGroup.Section>
              <Switch
                label={strings.settings.vibrate}
                value={settings.vibrate}
                onValueChange={(v) => void updateSettings({ vibrate: v })}
              />
            </FieldGroup.Section>
          )}
        </FieldGroup>
      </Host>
    </SafeAreaView>
  )
}
