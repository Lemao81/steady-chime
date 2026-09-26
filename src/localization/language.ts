import { FALLBACK_LANGUAGE, LANGUAGES } from '@/constants';
import type { Language } from '@/types';
import { isOneOf } from '@/utils/type-guards';

export function resolveLanguage(languageCodes: (string | null)[]): Language {
  return languageCodes.find((c): c is Language => isOneOf(LANGUAGES, c)) ?? FALLBACK_LANGUAGE;
}
