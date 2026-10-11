import { useColorScheme } from 'react-native'
import { THEME_COLORS } from '@/constants'
import type { ThemeColors } from '@/types'

export function useThemeColors(): ThemeColors {
  return THEME_COLORS[useColorScheme() === 'dark' ? 'dark' : 'light']
}
