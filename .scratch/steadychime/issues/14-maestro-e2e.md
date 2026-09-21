# 14 Maestro E2E flows

Status: open
Blocked by: 13

End-to-end flows in `.maestro/` (ADR 0002), run on the Windows host against an Android emulator.

## Scope

- Activate: grants permissions via the system dialogs, Home shows Active and a Next Chime.
- Pause: Home shows Paused and "—"; scheduled-slot readout is 0.
- Settings: change Interval and Active Window, Home summary and slot readout update; an over-limit combination is rejected.
- Chime fires: "Chime in 10 s", pull the notification shade, assert "SteadyChime" is visible.
- Document how to run the flows locally in `CLAUDE.md`.

## Acceptance

- All flows pass locally on the host.
