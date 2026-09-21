# 07 Verification

Status: open
Blocked by: 06

End-to-end proof that the app works, via Maestro flows (ADR 0002) run on the Windows host against an Android emulator.

## Steps

1. **Development-only helpers**: a readout of how many Chime Slots are scheduled with the OS, and a "Chime in 10 s" action using the current Chime Sound; both absent from release builds.
2. **Maestro E2E flows**: in `.maestro/`: activate (grant permissions via system dialogs, Home shows Active and a Next Chime); pause (Home shows Paused and "—", readout 0); settings (change Interval and Active Window, summary and readout update, over-limit combination rejected); Chime fires ("Chime in 10 s", pull the notification shade, assert "SteadyChime"). Document how to run them locally in `CLAUDE.md`.

## Acceptance

- The helpers work in a dev build and are absent from a release build.
- All flows pass locally on the host.
