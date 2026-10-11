import type { JSX } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useThemeColors } from '@/hooks/use-theme-colors'

export default function HomeScreen(): JSX.Element {
  const colors = useThemeColors()

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text }}>Home</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
