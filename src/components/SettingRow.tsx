import { Row, Text } from '@expo/ui';
import { width } from '@expo/ui/jetpack-compose/modifiers';
import { frame } from '@expo/ui/swift-ui/modifiers';
import type { ReactNode } from 'react';
import { Platform } from 'react-native';

const LABEL_WIDTH = 120;

type SettingRowProps = {
  label: string;
  children: ReactNode;
};

export function SettingRow({ label, children }: SettingRowProps) {
  const labelModifiers =
    Platform.OS === 'ios' ? [frame({ width: LABEL_WIDTH, alignment: 'leading' })] : [width(LABEL_WIDTH)];

  return (
    <Row alignment="center" spacing={16}>
      <Text modifiers={labelModifiers}>{label}</Text>
      {children}
    </Row>
  );
}
