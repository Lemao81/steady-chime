import {
  DropdownMenuItem,
  ExposedDropdownMenu,
  ExposedDropdownMenuBox,
  Text,
  TextField,
  type TextFieldRef,
} from '@expo/ui/jetpack-compose';
import { menuAnchor, onVisibilityChanged } from '@expo/ui/jetpack-compose/modifiers';
import { useEffect, useRef, useState } from 'react';
import type { SettingPickerProps } from '@/types';

async function showLabel(textField: TextFieldRef | null, label: string): Promise<void> {
  await textField?.setText(label);
  await textField?.setSelection(0, 0);
}

// On Android, the universal Picker from @expo/ui renders a multi-line TextField, so a long label makes the field taller.
// This Compose version exists only to make that field single-line. Delete this file once Picker can pass singleLine
// through, and SettingPicker.tsx covers Android again.
export function SettingPicker<T extends string | number>({ options, selectedValue, onValueChange }: SettingPickerProps<T>) {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const textFieldRef = useRef<TextFieldRef>(null);
  const selectedLabel = options.find((o) => o.value === selectedValue)?.label ?? '';

  useEffect(() => {
    if (visible) {
      void showLabel(textFieldRef.current, selectedLabel).catch(() => undefined);
    }
  }, [selectedLabel, visible]);

  return (
    <ExposedDropdownMenuBox expanded={expanded} onExpandedChange={setExpanded}>
      <TextField ref={textFieldRef} readOnly singleLine modifiers={[menuAnchor(), onVisibilityChanged(setVisible)]} />
      <ExposedDropdownMenu expanded={expanded} onDismissRequest={() => setExpanded(false)}>
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => {
              onValueChange(option.value);
              setExpanded(false);
            }}
          >
            <DropdownMenuItem.Text>
              <Text>{option.label}</Text>
            </DropdownMenuItem.Text>
          </DropdownMenuItem>
        ))}
      </ExposedDropdownMenu>
    </ExposedDropdownMenuBox>
  );
}
