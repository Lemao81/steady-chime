# Maestro for end-to-end tests

End-to-end tests are Maestro YAML flows rather than Detox. Maestro drives the app as a black box, so it needs no native test code or build changes in this managed (CNG) project, and it can operate the system UI this app depends on: the notification permission prompt, the exact-alarm settings screen and the notification shade. Detox's JS-thread synchronisation is not worth its extra native setup for a two-tab settings app. Domain logic (Chime Slot calculation, the slot limit, Next Chime) is covered separately by jest-expo unit tests.
