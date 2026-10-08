# 04 Settings

Status: resolved
Blocked by: 03

The Settings tab with every configuration control, including the bundled Chime Sounds.

## Steps

1. **Settings tab** 📦: Interval dropdown with the presets; Active Window start and end time pickers in 15-minute steps; Vibrate checkbox shown on Android only; changes persist immediately; an Interval / Active Window combination over the slot limit is rejected in the control with a localized message.
2. **Chime Sounds** 📦: bundle 4–6 short (< 5 s) CC0 `.wav` files, default a soft bell, recording each file's source and license; register them in the `expo-notifications` config plugin `sounds` array; Chime Sound dropdown with a ▶ preview (audio library per v57 docs).

## Open decisions (ask the user before starting)

- Step 2: which CC0 sound files to use: the user chooses them, or allows network access to a CC0 source.
  - **Answer (2026-09-26):** the user provides the files.
- Step 1 (raised at start): React Native core has no dropdown or time picker, so the Settings tab needs a UI library.
  - **Answer (2026-09-26):** use `@expo/ui` universal components (step 1 becomes 📦); Active Window times are picked from a list of every quarter hour in the device's 12/24 h format rather than a native clock picker, which has no minute-step option on Android.

## Notes

- From step 2 on, testing needs an Android development build, not Expo Go.

## Acceptance

- Every control persists its value across an app restart; an invalid combination cannot be saved.
- Picking a Chime Sound persists it; ▶ plays it on the device.
