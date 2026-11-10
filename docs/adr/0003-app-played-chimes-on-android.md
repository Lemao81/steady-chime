# Android Chimes are played by the app

On Android, a Chime's notification is silent and the app plays the Chime Sound itself from the `chime-tray` notification receiver, which already runs app code at every Chime (added for self-dismissing Chimes). This lets the user set a Chime Volume that is independent of the phone's notification volume, which ADR 0001 ruled out. Chimes are still OS-scheduled notifications (ADR 0001 stands); iOS keeps the OS-played notification sound because no app code runs when a local notification is delivered there.

## Consequences

- The Chime Volume is a share of the phone's alarm volume: an app can scale its sound within a system volume stream but cannot exceed it without changing that stream.
- Because the alarm stream ignores silent mode and, by default, Do Not Disturb, the app itself must stay silent while the phone is in silent or vibrate mode or Do Not Disturb, to keep the behaviour Chimes had when the OS played them.
- Chime Sound previews in Settings must use the same playback path, so they sound like a real Chime.
- Android and iOS now differ: Chime Volume is an Android-only setting, like Vibrate.

## Considered Options

- **Fixed absolute level** (the app sets the alarm volume for each Chime and restores it): rejected because the app would temporarily change a system setting.
- **Media volume as the reference**: rejected because music volume changes would also change Chimes.
