import { useLocales } from 'expo-localization';
import { CATALOG } from '@/localization/catalog';
import { resolveLanguage } from '@/localization/language';
import type { Strings } from '@/types';

export function useStrings(): Strings {
  return CATALOG[resolveLanguage(useLocales().map((l) => l.languageCode))];
}
