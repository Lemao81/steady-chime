import { Row, Text } from '@expo/ui';
import { defaultMinSize } from '@expo/ui/jetpack-compose/modifiers';
import { frame } from '@expo/ui/swift-ui/modifiers';
import type { ReactNode } from 'react';
import { Platform } from 'react-native';
import { SETTING_LABEL_WIDTH } from '@/constants';

type SettingRowProps = {
  label: string;
  children: ReactNode;
};

export function SettingRow({ label, children }: SettingRowProps) {
  const labelModifiers =
    Platform.OS === 'ios' ? [frame({ width: SETTING_LABEL_WIDTH, alignment: 'leading' })] : [defaultMinSize({ minWidth: SETTING_LABEL_WIDTH })];

  return (
    <Row alignment="center" spacing={16}>
      <Text modifiers={labelModifiers}>{label}</Text>
      {children}
    </Row>
  );
}
