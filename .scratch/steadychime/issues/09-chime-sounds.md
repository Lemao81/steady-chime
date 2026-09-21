# 09 Chime Sounds

Status: open
Blocked by: 08

## Scope

- Bundle 4–6 short (< 5 s) CC0 `.wav` Chime Sounds; default is a soft bell. Record each file's source and license.
- Register them in the `expo-notifications` config plugin `sounds` array.
- Chime Sound dropdown with a ▶ preview in the Settings tab (audio library per v57 docs).

## Open decisions (ask the user before starting)

- Which CC0 sound files to use: the user chooses them, or allows network access to a CC0 source.

## Notes

- From here on, testing needs an Android development build, not Expo Go.

## Acceptance

- Picking a sound persists it; ▶ plays it on the device.
