# SteadyChime v1 plan

Spec: [spec.md](spec.md). Each step is one issue and one commit; review after each commit before starting the next.
Steps marked 📦 edit `package.json`: run `pnpm install` on the host before reviewing.
From step 09 on, testing needs an Android development build.
Before starting a step, read its issue; if it has an "Open decisions" section, ask the user those questions first and record the answers in the issue.

- [ ] 01 [App config cleanup](issues/01-app-config.md)
- [ ] 02 📦 [Unit test tooling](issues/02-unit-test-tooling.md)
- [ ] 03 [Chime Slot calculation and slot limit](issues/03-chime-slots.md)
- [ ] 04 [Next Chime calculation](issues/04-next-chime.md)
- [ ] 05 📦 [Settings persistence](issues/05-settings-persistence.md)
- [ ] 06 📦 [Tab navigation shell](issues/06-tab-navigation.md)
- [ ] 07 📦 [English and German localization](issues/07-localization.md)
- [ ] 08 [Settings tab](issues/08-settings-tab.md)
- [ ] 09 📦 [Chime Sounds](issues/09-chime-sounds.md)
- [ ] 10 📦 [Chime scheduling](issues/10-chime-scheduling.md)
- [ ] 11 [Permissions and activation flow](issues/11-permissions.md)
- [ ] 12 [Home tab](issues/12-home-tab.md)
- [ ] 13 [Development-only helpers](issues/13-dev-helpers.md)
- [ ] 14 [Maestro E2E flows](issues/14-maestro-e2e.md)
