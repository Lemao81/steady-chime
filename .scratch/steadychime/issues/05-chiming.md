# 05 Chiming

Status: open
Blocked by: 04

Chimes actually sound: hand the Chime Slots to the OS (ADR 0001) and guard it with permissions.

## Steps

1. **OS scheduling** 📦: while Active, one daily-repeating notification per Chime Slot carrying the selected Chime Sound; reschedule on every settings change; cancel all when Paused. Android: one notification channel per Chime Sound × Vibrate combination (sound and vibration are channel-level), importance without heads-up banner; add the exact-alarm permission to the config. Text "SteadyChime · HH:MM", all Chimes grouped into one stack. Foreground handler plays the sound without a banner. Clear delivered Chimes when the app opens.
2. **Permissions and activation**: first activation requests notification permission, then (Android) leads to the exact-alarm setting; exact alarm refused keeps Active with a "may be a few minutes late" hint; notification permission denied or later revoked forces Paused with an explanation and a button to the system settings; permissions are re-checked whenever the app comes to the foreground.

## Acceptance

- On an Android dev build, an Active app with a near-future Chime Slot chimes with the selected sound and no heads-up banner; Pausing cancels it; it still chimes after a reboot.
- Denying notifications keeps the app Paused with the explanation; revoking it while Active flips to Paused on next open.
