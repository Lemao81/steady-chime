# 01 App config cleanup

Status: open
Blocked by: none

Align `app.json` and `package.json` with the spec's Config section.

## Scope

- Set `android.package` and `ios.bundleIdentifier` to `com.lemao81.steadychime`.
- `userInterfaceStyle: "automatic"`.
- Remove the `web` block and the `web` script.
- `ios.supportsTablet: false`.

## Acceptance

- `app.json` contains no web config; identifiers are set on both platforms.
- `tsc --noEmit` passes.
