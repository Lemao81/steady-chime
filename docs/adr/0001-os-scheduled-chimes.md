# Chimes are OS-scheduled notifications

Neither iOS nor Android lets an app run indefinitely in the background, so every Chime Slot is handed to the OS in advance as a daily-repeating local notification carrying a bundled Chime Sound, rather than timed by a live app process. This is the only approach that is reliable, battery-friendly and App Store-safe.

## Consequences

- There is no in-app volume: a Chime plays at the phones notification volume and obeys silent mode and Do Not Disturb.
- iOS caps pending notifications at 64, so an Interval and Active Window combination is rejected when it would need more than ~60 Chime Slots per day; this is why 5- and 10-minute Intervals are not offered.

## Considered Options

- **Background audio session** (app keeps itself alive to play sounds at its own volume): drains battery and risks App Store rejection.
- **iOS Critical Alerts** (bypass silent mode): requires an Apple entitlement realistically granted only to medical and safety apps.
- **Android foreground service**: would allow in-app volume on Android only, at the cost of a permanent notification and diverging platform behaviour.
