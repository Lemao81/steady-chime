# SteadyChime v1 plan

Spec: [spec.md](spec.md). Each checkbox is one commit; "move on with the plan" means: do the next unticked step, tick it, stop; commit only when told.
Before the first step of an issue, read the issue; if it has an "Open decisions" section, ask the user first and record the answers in the issue.
Steps marked 📦 edit `package.json`: run `pnpm install` on the host before reviewing.
When the last step of an issue is ticked, set the issue's `Status:` to `resolved`.

## [01 Project setup](issues/01-project-setup.md)

- [x] 1.1 App config cleanup
- [ ] 1.2 📦 Unit test tooling

## [02 Chime schedule logic](issues/02-chime-schedule-logic.md)

- [ ] 2.1 Chime Slots and slot limit
- [ ] 2.2 Next Chime

## [03 App shell](issues/03-app-shell.md)

- [ ] 3.1 📦 Settings persistence
- [ ] 3.2 📦 Tab navigation
- [ ] 3.3 📦 Localization

## [04 Settings](issues/04-settings.md)

- [ ] 4.1 Settings tab
- [ ] 4.2 📦 Chime Sounds (Android dev build needed from here on)

## [05 Chiming](issues/05-chiming.md)

- [ ] 5.1 📦 OS scheduling
- [ ] 5.2 Permissions and activation

## [06 Home](issues/06-home.md)

- [ ] 6.1 Home tab

## [07 Verification](issues/07-verification.md)

- [ ] 7.1 Development-only helpers
- [ ] 7.2 Maestro E2E flows
