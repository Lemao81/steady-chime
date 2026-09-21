# 11 Permissions and activation flow

Status: open
Blocked by: 10

## Scope

- Activating for the first time requests notification permission, then (Android) leads to the exact-alarm setting.
- Exact alarm refused: stay Active, show a hint that Chimes may be a few minutes late.
- Notification permission denied or later revoked: force Paused, show why, offer a button to the system settings.
- Re-check permissions whenever the app comes to the foreground.

## Acceptance

- Denying notifications keeps the app Paused with the explanation; revoking it while Active flips to Paused on next open.
