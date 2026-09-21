# 05 Settings persistence

Status: open
Blocked by: 03

Persist the user's configuration across app restarts.

## Scope

- One settings model: Interval, Active Window, Chime Sound, Vibrate, Active/Paused.
- Fresh-install defaults: Paused, 30 min, 08:00–22:00, soft bell, Vibrate off.
- Local key-value storage (pick the library against the v57 docs; add it to `package.json`, the user installs).
- A React hook exposing the settings and an update function.

## Acceptance

- Settings survive an app restart; unit tests cover defaults and loading a partial/corrupt stored value.
