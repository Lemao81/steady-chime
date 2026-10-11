import { NativeTabs } from 'expo-router/unstable-native-tabs'
import { StatusBar } from 'expo-status-bar'
import type { JSX } from 'react'
import { useChimeScheduling } from '@/hooks/use-chime-scheduling'
import { useStrings } from '@/hooks/use-strings'

export default function RootLayout(): JSX.Element {
  const strings = useStrings()
  useChimeScheduling()

  return (
    <>
      <NativeTabs>
        <NativeTabs.Trigger name="index">
          <NativeTabs.Trigger.Label>{strings.tabs.home}</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf={{ default: 'house', selected: 'house.fill' }} md="home" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="settings">
          <NativeTabs.Trigger.Label>{strings.tabs.settings}</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon
            sf={{ default: 'gearshape', selected: 'gearshape.fill' }}
            md="settings"
          />
        </NativeTabs.Trigger>
      </NativeTabs>
      <StatusBar style="auto" />
    </>
  )
}
