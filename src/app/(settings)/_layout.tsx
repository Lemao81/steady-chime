import { Stack } from 'expo-router'
import type { JSX } from 'react'
import { useStrings } from '@/hooks/use-strings'

export default function SettingsLayout(): JSX.Element {
  const strings = useStrings()

  return (
    <Stack screenOptions={{ headerLargeTitleEnabled: true }}>
      <Stack.Screen name="settings" options={{ title: strings.tabs.settings }} />
    </Stack>
  )
}
