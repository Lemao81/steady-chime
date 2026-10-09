# SteadyChime

A phone app that sounds a Chime at a fixed Interval, so people at home are reminded to repeat an action regularly.

## Language

**Chime**:
A single sound the phone emits at a Chime Slot; it is the reminder itself.
_Avoid_: Alarm, beep, notification, tick

**Interval**:
The fixed duration between two consecutive Chimes, chosen from a preset list (15, 20, 30 minutes or 1, 2, 3, 4 hours).
_Avoid_: Period, frequency, timer

**Active Window**:
The daily span of clock time (e.g. 08:00-22:00), edges included and possibly crossing midnight, within which Chimes sound.
_Avoid_: Quiet hours, schedule, time range

**Chime Slot**:
A clock time at which a Chime sounds every day: the Active Window start plus every whole multiple of the Interval that still falls within the window.
_Avoid_: Tick, occurrence, trigger

**Chime Sound**:
The audio a Chime plays, picked from a small fixed list of short sounds shipped with the app.
_Avoid_: Ringtone, tone

**Active** / **Paused**:
The single global state of the app: while Active, Chimes sound at every Chime Slot, including after a phone restart; while Paused, none do. Losing notification permission forces the app to Paused.
_Avoid_: Enabled, running, on/off, activated

**Next Chime**:
The upcoming Chime Slot at which a Chime will sound, or none while Paused.
_Avoid_: Next alarm, upcoming notification
