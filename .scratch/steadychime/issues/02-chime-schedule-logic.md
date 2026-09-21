# 02 Chime schedule logic

Status: open
Blocked by: 01

Pure domain logic, no UI and no native APIs, fully unit-tested.

## Steps

1. **Chime Slots and slot limit**: types for Interval (the preset list) and Active Window (start/end as minutes of the day, 15-minute steps); compute the Chime Slots of a day (window start plus every whole multiple of the Interval within the window, both edges included, midnight-crossing windows supported); validate the 60-slot limit.
2. **Next Chime**: given the Chime Slots, the Active/Paused state and the current time, return the Next Chime (time and whether it is tomorrow), or none while Paused.

## Acceptance

- Chime Slot tests cover: 3 h / 08:00–22:00 gives 08, 11, 14, 17, 20; inclusive end edge; a midnight-crossing window; 15 min / 15 h rejected; 15 min / 14 h accepted.
- Next Chime tests cover: next slot today, after the last slot (tomorrow's first), exactly at a slot, Paused, a midnight-crossing window.
