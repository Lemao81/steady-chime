# Chime Volume spec

Status: ready-for-agent

Vocabulary: see `GLOSSARY.md`. Decisions: see `docs/adr/`, especially ADR 0003 (Android Chimes are played by the app).

## Problem Statement

A Chime plays at the phone's notification volume, so its loudness is tied to a slider the user also uses for every other app's notifications. If the user wants Chimes quieter or louder than their other notifications, they can't do that. Choosing a Chime Sound in Settings is also silent: to hear it, the user has to pick it and then press ▶ separately.

## Solution

On Android, Settings gets a Volume slider under the Chime Sound picker. It sets the Chime Volume in 10 steps from 10 % to 100 % of the phone's alarm volume, defaulting to 70 %. Releasing the slider plays the current Chime Sound once at the new volume. Every Chime then plays at that volume, independent of the notification volume. It still stays silent whenever a Chime stayed silent before: silent mode, vibrate mode, Do Not Disturb, during a call, or when the Chime's notification is turned off in Android settings. In vibrate mode a Chime vibrates. Picking a Chime Sound plays it straight away on both platforms, and the ▶ button stays. iOS gets no Volume slider: there, Chimes keep following the notification volume.

## User Stories

1. As an Android user, I want a Volume slider in Settings, so that I can set how loud Chimes are without touching the phone's notification volume.
2. As an Android user, I want the slider directly under the Chime Sound picker, so that everything about how a Chime sounds is in one place.
3. As an Android user, I want the slider to move in 10 clear steps, so that I can choose a volume quickly and reliably.
4. As an Android user, I want the quietest step to still be audible (10 %), so that I can't silence Chimes by accident; Pause is how I silence them.
5. As an Android user, I want the Chime Volume to start at 70 %, so that Chimes are clearly audible without being jarring before I change anything.
6. As an existing Android user updating the app, I want my other settings kept and the Chime Volume set to 70 %, so that the update doesn't reset my setup.
7. As an Android user, I want to hear the current Chime Sound once when I release the slider, so that I know how loud my Chimes will be.
8. As an Android user, I want no sound while I'm still dragging the slider, so that adjusting it isn't noisy.
9. As an Android user, I want the slider preview to sound exactly like a real Chime, so that what I hear in Settings is what I get at a Chime Slot.
10. As an Android user, I want the slider preview to play even in silent mode or Do Not Disturb, so that the preview doesn't seem broken when I've just touched the control.
11. As an Android user, I want every Chime to play at my Chime Volume, so that my setting actually takes effect.
12. As an Android user, I want the Chime Volume to be a share of the phone's alarm volume, so that changing the ringer, notification or music volume doesn't change my Chimes.
13. As an Android user, I want a new Chime Volume to apply from the next Chime on, so that I don't have to pause and reactivate anything.
14. As an Android user, I want Chimes to stay silent in silent mode, so that the app respects that I've silenced my phone.
15. As an Android user, I want Chimes to vibrate in vibrate mode, even with the Vibrate setting off, so that I still get a reminder I can feel, as before.
16. As an Android user, I want Chimes to stay silent in Do Not Disturb, so that the app respects my quiet times like other notifications do.
17. As an Android user, I want Chimes to stay silent during a phone call, so that a Chime never sounds in my ear or disturbs the conversation.
18. As an Android user, I want Chimes to still vibrate during a call when the Vibrate setting is on, so that I still notice them.
19. As an Android user, I want Chimes to stay silent when I've turned off SteadyChime's notifications or the Chime notification category in Android settings, so that the system switch keeps working.
20. As an Android user listening to music or a podcast, I want it to get quieter during a Chime and then return to normal, so that I hear the Chime without my audio stopping.
21. As an Android user, I want a Chime that sounds while the app is open to play at the Chime Volume too, so that loudness doesn't depend on whether the app is in front.
22. As an Android user, I want the Vibrate setting to keep working as before, so that adding a volume doesn't change how vibration behaves outside vibrate mode.
23. As an Android user, I want Android's notification settings for the app to stay tidy after the update, so that I don't see leftover notification categories for each Chime Sound.
24. As a user on either platform, I want to hear a Chime Sound as soon as I pick it, so that I can compare sounds without an extra tap.
25. As a user on either platform, I want to keep the ▶ button, so that I can hear the current Chime Sound again without changing it.
26. As an Android user, I want both the ▶ button and picking a sound to play at my Chime Volume, so that every preview is consistent with real Chimes.
27. As an iOS user, I want no Volume slider, so that I'm not offered a control that can't work on my phone.
28. As an iOS user, I want Chimes to keep following the notification volume, silent mode and Focus as before, so that nothing changes for me.
29. As a user of any supported language, I want the slider's label translated, so that Settings reads naturally in my language.

## Implementation Decisions

- **Settings**: Settings gain a Chime Volume stored as a whole percentage, a multiple of 10 from 10 to 100, default 70. Settings parsing restores a valid stored value and falls back to the default for a missing, off-step, out-of-range or non-numeric one, keeping the other fields. The value is stored on both platforms but only used and shown on Android.
- **Carrying the volume to delivery time**: the native code that runs when a Chime fires can't read the app's stored settings. Each scheduled Chime therefore carries its Chime Volume and Chime Sound in its notification data, the same way it already carries the self-dismiss timeout. A changed Chime Volume reschedules all Chimes through the existing Chime sync, so it takes effect from the next Chime.
- **Silent Android notification**: the Android notification channel for Chimes no longer has a sound. Because a channel's sound can't change after it's created, channel identifiers no longer depend on the Chime Sound, only on Vibrate. Channels left over from earlier versions are deleted when Chimes are synced. Channel vibration keeps following the Vibrate setting.
- **Native Chime playback (Android, in the existing `chime-tray` local module)**: the custom presentation delegate that already adds the self-dismiss timeout also plays the Chime when the notification is presented, in the background and in the foreground. It decides from the phone's state at that moment:
    - When Android would not show the notification (app notifications or the Chime channel turned off), it does nothing.
    - During a call, it plays no sound. Vibration is left to the channel's Vibrate setting.
    - In silent mode or Do Not Disturb (any interruption filter other than "all"), it plays no sound.
    - In vibrate mode, it plays no sound. It vibrates with the Chime vibration pattern, unless the channel already vibrates because the Vibrate setting is on.
    - Otherwise it plays the Chime Sound with alarm audio usage, at the Chime Volume as a share of the alarm volume. It requests temporary, duck-allowed audio focus for the length of the sound and gives it back afterwards.
- **Preview interface**: the `chime-tray` module gains a JavaScript interface, following the existing pattern of the `exact-alarm` module. It exposes one operation that plays a given Chime Sound at a given Chime Volume through the same playback as a real Chime, but without the silent-mode, Do-Not-Disturb and call checks.
- **Preview hook**: on Android, the existing Chime Sound preview hook plays through the native preview operation at the current Chime Volume. On iOS it keeps using the current in-app audio player.
- **Settings screen**:
    - An Android-only Volume slider sits in the Chime Sound section, under the picker. It uses the native Material slider with 10 steps, has the label "Volume" and shows no percentage.
    - Releasing the slider saves the Chime Volume and plays the current Chime Sound at the new volume.
    - Picking a Chime Sound saves it and plays it, on both platforms. The ▶ button stays.
- **Strings**: a new "Volume" string in every catalog language.
- **iOS**: Chime scheduling and playback are unchanged, and the Chime Volume isn't shown.
- **Native change**: the Android work changes native code in a local module, so testing it needs a regenerated native project and a reinstalled dev build.

## Testing Decisions

- A good test checks behaviour you can observe from outside (what Settings restores, what the app shows, whether a Chime is delivered), never internal calls or structure.
- **Settings parsing (Vitest)**:
    - A stored Chime Volume is restored.
    - Missing, off-step, out-of-range and non-numeric values fall back to 70 % while the other fields are kept.
    - The fresh-install defaults include 70 %.
    - Prior art: the existing settings parsing tests.
- **Maestro on the Android emulator (ADR 0002)**:
    - The settings flow asserts that the Volume slider is shown under the Chime Sound picker, and that picking another Chime Sound still updates the Home summary.
    - The existing Chime flow ("Chime in 10 s", notification in the shade) stays as the regression check that a Chime is still delivered after its notification became silent.
    - Prior art: the current settings and Chime flows, and the issue 07 verification.
- **Manual checklist on a real Android phone**: these behaviours can't be observed by Vitest or Maestro, so each is checked by hand once per release of this feature:
    - loudness changes with the slider and follows the alarm volume, not the notification volume;
    - silent mode is silent;
    - vibrate mode vibrates without sound, with the Vibrate setting off;
    - Do Not Disturb is silent;
    - a Chime during a call is silent;
    - with the Chime category turned off there's no sound;
    - music gets quieter and comes back;
    - a Chime while the app is open uses the Chime Volume;
    - slider and picker previews play in silent mode;
    - no leftover per-sound channels in Android's notification settings.
- No new Kotlin unit-test seam: the project has no JVM test setup, and the native decision is a handful of checks on Android system state that tests would mostly mock.

## Out of Scope

- A warning when the phone's alarm volume is all the way down.
- A Chime Volume on iOS.
- A fixed volume that ignores the alarm volume, or changing any system volume from the app.
- A 0 % step or mute option (Pause covers silencing).
- A separate volume per Chime Sound.
- Showing the percentage next to the slider.

## Further Notes

- The v1 spec's line "No in-app volume: Chimes follow the phone's notification volume, silent mode and Do Not Disturb" now applies to iOS only. ADR 0003 records why Android changed and partly replaces that consequence of ADR 0001.
- This spec also covers the idea "in settings, selecting a chime should already play the sound" (issue 01).
- Android may not let Chimes use the alarm volume in some modes (for example, some manufacturers' "alarms only" variants of Do Not Disturb). The checks above keep Chimes silent in every Do Not Disturb mode, so this doesn't change behaviour.
