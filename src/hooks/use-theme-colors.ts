import { useColorScheme } from 'react-native';
import { THEME_COLORS } from '@/constants';
import type { ThemeColors } from '@/types';

export const useThemeColors = (): ThemeColors => THEME_COLORS[useColorScheme() === 'dark' ? 'dark' : 'light'];
