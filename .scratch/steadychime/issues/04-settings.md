# 04 Settings

Status: open
Blocked by: 03

The Settings tab with every configuration control, including the bundled Chime Sounds.

## Steps

1. **Settings tab**: Interval dropdown with the presets; Active Window start and end time pickers in 15-minute steps; Vibrate checkbox shown on Android only; changes persist immediately; an Interval / Active Window combination over the slot limit is rejected in the control with a localized message.
2. **Chime Sounds** 📦: bundle 4–6 short (< 5 s) CC0 `.wav` files, default a soft bell, recording each file's source and license; register them in the `expo-notifications` config plugin `sounds` array; Chime Sound dropdown with a ▶ preview (audio library per v57 docs).

## Open decisions (ask the user before starting)

- Step 2: which CC0 sound files to use: the user chooses them, or allows network access to a CC0 source.

## Notes

- From step 2 on, testing needs an Android development build, not Expo Go.

## Acceptance

- Every control persists its value across an app restart; an invalid combination cannot be saved.
- Picking a Chime Sound persists it; ▶ plays it on the device.
