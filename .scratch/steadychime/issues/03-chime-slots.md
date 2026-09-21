# 03 Chime Slot calculation and slot limit

Status: open
Blocked by: 02

Pure domain logic, no UI and no native APIs.

## Scope

- Types for Interval (the preset list) and Active Window (start/end as minutes of the day, 15-minute steps).
- Compute the Chime Slots of a day: window start plus every whole multiple of the Interval within the window, both edges included, windows crossing midnight supported.
- Validate the 60-slot limit.

## Acceptance

- Unit tests cover: the 3 h / 08:00–22:00 example (08, 11, 14, 17, 20), inclusive end edge, a midnight-crossing window, a 15 min / 15 h window rejected, a 15 min / 14 h window accepted.
