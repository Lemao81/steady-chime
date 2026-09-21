# 03 App shell

Status: open
Blocked by: 02

Persistent settings, two-tab navigation and localization, so feature screens have a home.

## Steps

1. **Settings persistence** 📦: one settings model (Interval, Active Window, Chime Sound, Vibrate, Active/Paused); fresh-install defaults Paused, 30 min, 08:00–22:00, soft bell, Vibrate off; local key-value storage (library chosen against the v57 docs); a React hook exposing the settings and an update function.
2. **Tab navigation** 📦: replace the starter screen with Expo Router native tabs, Home (left) and Settings (right) as placeholders; colors follow system light/dark; remove `App.tsx`.
3. **Localization** 📦: detect the device language (`expo-localization`), English fallback; English and German string catalog used by the tab titles; a helper formatting clock times in 12 or 24 h per device locale.

## Open decisions (ask the user before starting)

- Step 2: Expo Router normally uses `expo-router/entry` as `main`, which conflicts with the `CLAUDE.md` convention "entry point is `index.ts` … leave that indirection in place". Decide, then update `CLAUDE.md` accordingly.

## Acceptance

- Settings survive an app restart; unit tests cover defaults and a partial/corrupt stored value.
- The app opens on Home with a native tab bar; switching tabs works on Android.
- With the device in German, tab titles are German; time formatting has unit tests for both formats.
