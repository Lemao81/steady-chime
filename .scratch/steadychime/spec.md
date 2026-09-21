# SteadyChime v1 spec

Vocabulary: see `CONTEXT.md`. Decisions: see `docs/adr/`.

## Product

SteadyChime helps people at home repeat an action regularly by sounding a Chime at a fixed Interval.
Personal use first; everything must stay publishable to the App Store and Play Store later.
Platforms: iOS and Android, no web. Only Android is tested for now. No accounts, no backend.

## Chimes

- Chimes are OS-scheduled notifications: one daily-repeating notification per Chime Slot (ADR 0001).
- Chiming survives a phone restart (iOS natively, Android via `expo-notifications` boot handling).
- No in-app volume: Chimes follow the phone's notification volume, silent mode and Do Not Disturb.
- Android asks for the exact-alarm permission; if refused, Chimes may drift a few minutes and the app shows a hint.

## Rules

- Interval presets: 15, 20, 30 min; 1, 2, 3, 4 h.
- Active Window: default 08:00-22:00, set in 15-minute steps, both edges included, may cross midnight.
- Chime Slots: the Active Window start plus every whole multiple of the Interval that still falls within the window.
- An Interval / Active Window combination producing more than 60 Chime Slots per day is rejected in the control.
- Chime Sounds: 4-6 short (< 5 s) CC0 sounds shipped with the app; default is a soft bell; each can be previewed.
- Vibrate: Android-only checkbox, off by default.
- Active / Paused: single global state; a fresh install is Paused with a 30 min Interval.
- Permission prompts (notifications, Android exact alarms) appear on first activation, never earlier.
- Losing notification permission forces Paused and the app says why, with a button to the system settings.
- A Chime while the app is open plays its sound without a banner.

## Chime presentation

- All Chimes stack into one group; text is "SteadyChime · HH:MM".
- Android: no heads-up banner, only a tray entry.
- Opening the app clears delivered Chimes.

## UI

Expo Router with native tabs.

- **Home tab** (left): Active/Paused button; Next Chime (live-updating, "tomorrow" when after the window end, "—" when Paused); summary line "Every 30 min · 08:00–22:00 · Soft Bell" that jumps to Settings.
- **Settings tab** (right): Interval dropdown, Active Window start/end time pickers, Chime Sound dropdown with ▶ preview, Vibrate checkbox (Android only). Changes apply immediately.
- Light/dark follows the system; 12/24 h follows the device locale; English and German from the start.

## Testing

- jest-expo unit tests for Chime Slot calculation, the slot limit and Next Chime.
- Maestro E2E flows (ADR 0002), run locally on the Windows host with an Android emulator; EAS Workflows later.
- Development-only helpers, absent from release builds: a scheduled-slot readout and a "Chime in 10 s" action.

## Config

- Identifier `com.lemao81.steadychime` on both platforms.
- `userInterfaceStyle: "automatic"`, no web config, `supportsTablet: false`.
