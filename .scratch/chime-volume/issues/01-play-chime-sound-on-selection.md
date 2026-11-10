# 01 Play a Chime Sound when it is picked

Status: ready-for-agent
Blocked by: None (can start immediately)

On both platforms, picking a Chime Sound in Settings saves it and plays it right away, so sounds can be compared without an extra tap ([spec](../spec.md), user stories 24-25).

## Steps

1. **Play on selection**: choosing a Chime Sound in the picker saves it and plays it once through the existing Chime Sound preview; the ▶ button stays and still plays the current Chime Sound.

## Notes

- Issue 03 later routes the Android preview through the native Chime playback at the Chime Volume; this issue keeps the current preview, so it needs no native change.

## Acceptance

- On Android and iOS, picking a different Chime Sound plays it once and the Home summary shows the new Chime Sound.
- The ▶ button still plays the current Chime Sound.
- The Maestro settings flow still passes.
