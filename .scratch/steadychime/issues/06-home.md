# 06 Home

Status: open
Blocked by: 05

## Steps

1. **Home tab**: Active/Paused button wired to the activation flow; Next Chime (time, "tomorrow" when after the window end, "—" when Paused) that moves on by itself after a Chime; summary line "Every 30 min · 08:00–22:00 · Soft Bell" that opens the Settings tab when tapped; permission hints from issue 05.

## Open decisions (ask the user before starting)

- Screen titles: the tabs have no header, so Settings starts below the status bar via `SafeAreaView` and has no title, unlike native settings screens. Give each tab a `Stack` layout with a native title (iOS large title, Android top app bar), replacing the `SafeAreaView` workaround? Load `expo:expo-router` for it.

## Acceptance

- Next Chime advances without reopening the app; the summary reflects settings changes immediately.
