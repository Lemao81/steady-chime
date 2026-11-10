# 03 Volume slider

Status: ready-for-agent
Blocked by: 02

On Android, a Volume slider under the Chime Sound picker sets the Chime Volume, and every preview in Settings sounds like a real Chime at that volume ([spec](../spec.md), user stories 1-10, 26-27 and 29).

## Steps

1. **Native preview** 🔧: the `chime-tray` module gains a JavaScript interface, following the `exact-alarm` module's pattern, with one operation that plays a given Chime Sound at a given Chime Volume through the same native playback as a real Chime but without the silent-mode, Do Not Disturb and call checks. On Android the Chime Sound preview hook plays through it at the current Chime Volume, so the ▶ button and picking a Chime Sound both use it; iOS keeps the current in-app audio player.
2. **Volume slider**: an Android-only Volume slider in the Chime Sound section under the picker, using the native Material slider with 10 steps from 10 % to 100 %, labelled "Volume", no percentage shown; releasing it saves the Chime Volume and plays the current Chime Sound at the new volume, with no sound while dragging. A "Volume" string in every catalog language. The Maestro settings flow asserts the slider is shown under the Chime Sound picker.

## Notes

- Step 1 changes native code in `modules/chime-tray`: regenerate the native project and reinstall the dev build before testing.

## Acceptance

- Android: the Volume slider appears under the Chime Sound picker in 10 steps, starts at 70 % on a fresh install, and keeps its value after the app restarts.
- Releasing the slider plays the current Chime Sound once at the new volume; the next real Chime plays at that volume.
- The ▶ button and picking a Chime Sound play at the Chime Volume, also in silent mode and Do Not Disturb.
- iOS shows no Volume slider and its previews behave as before.
- The slider label is translated in every catalog language.
- The Maestro settings and Chime flows pass.
