# 01 Project setup

Status: open
Blocked by: none

Align the starter project with the spec's Config section and add unit test tooling (ADR 0002).

## Steps

1. **App config cleanup**: set `android.package` and `ios.bundleIdentifier` to `com.lemao81.steadychime`; `userInterfaceStyle: "automatic"`; remove the `web` block and the `web` script; `ios.supportsTablet: false`.
2. **Unit test tooling** 📦: add `jest`, `jest-expo` and `@types/jest` to `devDependencies` (versions matching SDK 57, respecting `minimumReleaseAge`); add the jest config and a `test` script; update the "no test runner" note in `CLAUDE.md`.

## Acceptance

- `app.json` has identifiers on both platforms and no web config.
- After `pnpm install` on the host, `pnpm test` succeeds.
