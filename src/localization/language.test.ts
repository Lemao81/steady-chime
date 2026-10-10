import { resolveLanguage } from './language';

describe('resolveLanguage', () => {
  test('uses the first preferred language', () => {
    expect(resolveLanguage(['de', 'en'])).toBe('de');
  });

  test('skips preferred languages without a catalog', () => {
    expect(resolveLanguage(['pl', null, 'de'])).toBe('de');
  });

  test('falls back to English when no preferred language has a catalog', () => {
    expect(resolveLanguage(['pl', null])).toBe('en');
  });
});
