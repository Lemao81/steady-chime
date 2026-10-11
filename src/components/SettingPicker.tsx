import { Picker } from '@expo/ui'
import type { JSX } from 'react'
import type { SettingPickerProps } from '@/types'

export function SettingPicker<T extends string | number>({
  options,
  selectedValue,
  onValueChange,
}: SettingPickerProps<T>): JSX.Element {
  return (
    <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
      {options.map((o) => (
        <Picker.Item key={o.value} label={o.label} value={o.value} />
      ))}
    </Picker>
  )
}
