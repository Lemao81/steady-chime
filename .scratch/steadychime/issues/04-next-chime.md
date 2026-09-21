# 04 Next Chime calculation

Status: open
Blocked by: 03

## Scope

- Given the Chime Slots, the Active/Paused state and the current time, return the Next Chime (time and whether it is tomorrow), or none while Paused.

## Acceptance

- Unit tests cover: next slot today, after the last slot (tomorrow's first slot), exactly at a slot, Paused, midnight-crossing window.
