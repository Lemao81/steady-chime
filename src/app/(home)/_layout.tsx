import { Stack } from 'expo-router'
import type { JSX } from 'react'
import { useStrings } from '@/hooks/use-strings'

export default function HomeLayout(): JSX.Element {
  const strings = useStrings()

  return (
    <Stack screenOptions={{ headerLargeTitleEnabled: true }}>
      <Stack.Screen name="index" options={{ title: strings.tabs.home }} />
    </Stack>
  )
}
