# 10 Chime scheduling

Status: open
Blocked by: 09

Hand the Chime Slots to the OS (ADR 0001).

## Scope

- While Active: one daily-repeating notification per Chime Slot, carrying the selected Chime Sound; reschedule whenever settings change; cancel all when Paused.
- Android: one notification channel per Chime Sound × Vibrate combination (sound and vibration are channel-level), importance without heads-up banner.
- Notification text "SteadyChime · HH:MM"; all Chimes grouped into one stack.
- Foreground handler: play the sound, no banner.
- Clear delivered Chimes when the app opens.
- Add the Android exact-alarm permission to the config.

## Acceptance

- On an Android dev build, an Active app with a near-future Chime Slot chimes with the selected sound and no heads-up banner; Pausing cancels it; it still chimes after a reboot.
