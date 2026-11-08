import { Button, Column, Text } from '@expo/ui'
import type { JSX } from 'react'
import { useScheduledChimeCount } from '@/hooks/use-scheduled-chime-count'
import { useStrings } from '@/hooks/use-strings'
import { useTimeFormat } from '@/hooks/use-time-format'
import { scheduleTestChime, TEST_CHIME_DELAY_S } from '@/notifications/dev-chimes'
import type { Settings } from '@/types'

type DevToolsProps = {
  settings: Settings
}

export function DevTools({ settings }: DevToolsProps): JSX.Element {
  const strings = useStrings()
  const formatTime = useTimeFormat()
  const count = useScheduledChimeCount()

  function chimeSoon(): void {
    void scheduleTestChime(settings, strings, formatTime).catch(() => undefined)
  }

  return (
    <Column alignment="center" spacing={8}>
      <Text testID="scheduled-chime-count">{`Scheduled Chimes: ${count ?? '…'}`}</Text>
      <Button
        testID="chime-soon"
        label={`Chime in ${TEST_CHIME_DELAY_S} s`}
        variant="outlined"
        onPress={chimeSoon}
      />
    </Column>
  )
}
