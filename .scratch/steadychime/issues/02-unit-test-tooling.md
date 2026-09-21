# 02 Unit test tooling

Status: open
Blocked by: 01

Add jest-expo so domain logic can be unit-tested (ADR 0002).

## Scope

- Add `jest`, `jest-expo` and `@types/jest` to `devDependencies`, with versions matching SDK 57 and respecting `minimumReleaseAge`.
- Add the jest config and a `test` script.
- Update the "no test runner" note in `CLAUDE.md`.

## Acceptance

- The user runs `pnpm install`, then `pnpm test` on the host and it succeeds (no tests yet is fine with `--passWithNoTests`).
