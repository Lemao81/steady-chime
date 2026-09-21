# 07 English and German localization

Status: open
Blocked by: 06

## Scope

- Detect the device language (`expo-localization`, per v57 docs); English is the fallback.
- A string catalog for English and German; tab titles use it.
- A helper that formats clock times in 12 or 24 h per device locale.

## Acceptance

- Switching the device language to German shows German tab titles; time formatting has unit tests for both formats.
