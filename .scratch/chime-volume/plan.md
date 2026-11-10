# Chime Volume plan

Spec: [spec.md](spec.md). Each checkbox is one commit; "move on with the plan" means: do the next unticked step, tick it, stop; commit only when told.
Before the first step of an issue, read the issue; if it has an "Open decisions" section, ask the user first and record the answers in the issue.
Steps marked 🔧 change native code: regenerate the native project (`expo prebuild --clean`) and reinstall the dev build before testing.
When the last step of an issue is ticked, set the issue's `Status:` to `resolved`.

## [01 Play a Chime Sound when it is picked](issues/01-play-chime-sound-on-selection.md)

- [ ] 1.1 Play on selection

## [02 Android Chimes played by the app](issues/02-app-played-chimes-on-android.md)

- [ ] 2.1 Chime Volume setting
- [ ] 2.2 🔧 App-played Chimes
- [ ] 2.3 🔧 Respecting the phone's state

## [03 Volume slider](issues/03-volume-slider.md)

- [ ] 3.1 🔧 Native preview
- [ ] 3.2 Volume slider
