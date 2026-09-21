# 06 Tab navigation shell

Status: open
Blocked by: 01

Replace the starter screen with Expo Router native tabs: Home (left) and Settings (right), both placeholders.

## Scope

- Add `expo-router` and its peer dependencies (versions from the v57 docs), the user installs.
- Colors follow the system light/dark setting.
- Remove `App.tsx`.

## Open decisions (ask the user before starting)

- Expo Router normally uses `expo-router/entry` as `main`, which conflicts with the `CLAUDE.md` convention "entry point is `index.ts` … leave that indirection in place". Decide at this step and update `CLAUDE.md` accordingly.

## Acceptance

- The app opens on Home with a native tab bar; switching tabs works on Android.
