# 02 Android Chimes played by the app

Status: ready-for-agent
Blocked by: None (can start immediately)

On Android, every Chime is played by the app at the Chime Volume instead of by the notification, while staying silent wherever a Chime was silent before (ADR 0003; [spec](../spec.md), user stories 11-23 and 28). The Chime Volume stays at its 70 % default until issue 03 adds the slider.

## Steps

1. **Chime Volume setting**: Settings gain a Chime Volume, a whole percentage in steps of 10 from 10 to 100, default 70. Settings parsing restores a valid stored value and falls back to the default for a missing, off-step, out-of-range or non-numeric one, keeping the other fields. Vitest tests in the style of the existing settings parsing tests, including the fresh-install defaults.
2. **App-played Chimes** 🔧: the Android Chime notification channel has no sound and its identifier depends only on Vibrate; channels from earlier versions are deleted when Chimes are synced. Each scheduled Chime carries its Chime Sound and Chime Volume in its notification data, next to the self-dismiss timeout, so a changed Chime Volume reschedules all Chimes through the existing Chime sync. The `chime-tray` presentation delegate plays the Chime Sound with alarm audio usage at the Chime Volume as a share of the alarm volume, in the background and in the foreground. iOS scheduling is unchanged.
3. **Respecting the phone's state** 🔧: at presentation, the delegate plays nothing when Android would not show the notification (app notifications or the Chime channel turned off); plays no sound during a call, in silent mode or in Do Not Disturb (any interruption filter other than "all"); in vibrate mode plays no sound and vibrates with the Chime vibration pattern unless the channel already vibrates because Vibrate is on; otherwise holds temporary, duck-allowed audio focus for the length of the sound and gives it back afterwards.

## Notes

- After step 2 and until step 3, Android Chimes also sound in silent mode, vibrate mode, Do Not Disturb and calls; acceptable while the app is unreleased.
- Steps 2 and 3 change native code in `modules/chime-tray`: regenerate the native project and reinstall the dev build before testing.
- No Kotlin unit tests (spec, Testing Decisions); the phone-state behaviour is verified by the manual checklist below.

## Acceptance

- Vitest: a stored Chime Volume is restored; missing, off-step, out-of-range and non-numeric values fall back to 70 % with the other fields kept; fresh-install defaults include 70 %.
- The Maestro Chime flow ("Chime in 10 s", notification in the shade) still passes.
- Manual checklist on a real Android phone:
    - A Chime sounds at the alarm volume, unaffected by the notification volume.
    - Silent mode: no sound.
    - Vibrate mode with Vibrate off: vibrates, no sound.
    - Do Not Disturb: no sound.
    - During a call: no sound.
    - Chime category turned off in Android settings: no sound.
    - Music playing: gets quieter during the Chime and comes back.
    - A Chime while the app is open sounds the same.
    - Android's notification settings for the app show no leftover per-sound channels.
