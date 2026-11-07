# 05 Chiming

Status: resolved
Blocked by: 04

Chimes actually sound: hand the Chime Slots to the OS (ADR 0001) and guard it with permissions.

## Steps

1. **OS scheduling** 📦: while Active, one daily-repeating notification per Chime Slot carrying the selected Chime Sound; reschedule on every settings change; cancel all when Paused. Android: one notification channel per Chime Sound × Vibrate combination (sound and vibration are channel-level), importance without heads-up banner; add the exact-alarm permission to the config. Text "SteadyChime · HH:MM", all Chimes grouped into one stack. Foreground handler plays the sound without a banner. Clear delivered Chimes when the app opens.
2. **Permissions and activation**: first activation requests notification permission, then (Android) leads to the exact-alarm setting; exact alarm refused keeps Active with a "may be a few minutes late" hint; notification permission denied or later revoked forces Paused with an explanation and a button to the system settings; permissions are re-checked whenever the app comes to the foreground.
3. **Research: self-dismissing Chimes**: delivered Chimes must not pile up in the tray / Notification Center when the app is never opened, but expo-notifications offers no way to remove a delivered notification after a delay (no Android `setTimeoutAfter`, and scheduled notifications don't wake JS). Use `/research` to compare the options on both platforms: a config plugin or `pnpm patch` of expo-notifications' Android notification builder, a local Expo module, an alternative notification library, and what iOS allows at all for local notifications. Capture the findings in the repo, then agree the approach with the user and add the implementation step(s) to this issue and `plan.md` before moving on.
4. **Self-dismissing Chimes (Android)**: a local Expo module `modules/chime-tray` (Android only) registers a `NotificationsService` subclass whose presentation delegate calls `setTimeoutAfter` on each built notification, with the duration taken from `content.data.timeoutAfterMs`; Chimes are scheduled with `timeoutAfterMs: 60000`. Findings and the extension point: [research/self-dismissing-chimes.md](../research/self-dismissing-chimes.md).

## Open decisions (ask the user before starting)

- Step 2 (raised at start): Expo has no JS API to read the Android exact-alarm permission (`expo-notifications` silently falls back to inexact alarms), so the app can't tell whether to show the "may be a few minutes late" hint.
  - **Answer (2026-10-09):** a local Expo module (`modules/exact-alarm`, Android only) exposes `canScheduleExactAlarms()` and opens the app's "Alarms & reminders" settings screen.
- Step 3 (raised by the research): how delivered Chimes leave the tray / Notification Center without the app being opened.
  - **Answer (2026-11-05):** Android: a new local module `modules/chime-tray` subclasses expo-notifications' `NotificationsService` (its documented extension point) and adds `setTimeoutAfter`, read per notification from `data.timeoutAfterMs`; not a `pnpm patch` and not an own alarm scheduler. Timeout 1 minute, not configurable. iOS: accept the platform limit (no API removes a delivered local notification while the app is closed); keep clearing delivered Chimes when the app opens, no background cleanup task.

## Notes

- From step 2 on, the app contains native code in `modules/exact-alarm`, and from step 4 on in `modules/chime-tray`; changing either needs a new Android dev build.
- `modules/chime-tray` has no JS API: its manifest receiver replaces expo-notifications' own `NotificationsService` (priority -1). Alarms armed by a dev build from before step 4 target the old receiver and escape `cancelAll` until they fire once; reinstall the dev build to start clean.
- The exact-alarm settings screen opens only after the activation that showed the notification prompt, so it is asked for once; afterwards the hint remains.
- Step 2 provides the activation flow, the permission re-check and the hint texts; the Home tab (issue 06) shows the Active/Paused button and the hints.
- Granting or revoking exact alarms reschedules all Chimes, since `expo-notifications` picks exact or inexact alarms at scheduling time and Android cancels exact alarms on revocation.

## Acceptance

- On an Android dev build, an Active app with a near-future Chime Slot chimes with the selected sound and no heads-up banner; Pausing cancels it; it still chimes after a reboot.
- Denying notifications keeps the app Paused with the explanation; revoking it while Active flips to Paused on next open.
- On Android 8.0+, a delivered Chime leaves the tray about 1 minute after sounding, without the app being opened. On iOS, delivered Chimes are cleared when the app opens.
