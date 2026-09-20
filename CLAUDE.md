# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project state

SteadyChime is a bare Expo SDK 57 / React Native 0.86 / React 19 app, currently still the
unmodified Expo TypeScript starter (`App.tsx` renders the placeholder screen). There is no
app-specific architecture yet — when adding structure, establish it rather than looking for it.

## Package manager

**pnpm** (`pnpm-lock.yaml`). Do not run `npm install` / `yarn` — it will desync the lockfile.
pnpm is not on `PATH` in this sandbox; use `corepack pnpm <cmd>` or install it first.

`pnpm-workspace.yaml` sets `minimumReleaseAge: 10080` (7 days): pnpm refuses to install any
package version published less than a week ago. When a dependency resolve fails for this reason,
pin an older patch version (as commit `fa62a53` did) rather than lowering the threshold.

## Commands

```bash
pnpm install          # install deps
pnpm start            # Metro bundler / Expo dev server
pnpm android          # dev server + open on Android
pnpm ios              # dev server + open on iOS
pnpm web              # dev server + open in browser
```

No test runner, linter, or formatter is configured — there is nothing to run for those, and
`npx tsc --noEmit` is the only type check available.

## Conventions

- Entry point is `index.ts` (not `App.tsx`): it calls `registerRootComponent(App)`, which handles
  both Expo Go and native builds. Leave that indirection in place.
- TypeScript is `strict: true` on top of `expo/tsconfig.base`.
- `/ios` and `/android` are gitignored — this is a managed (CNG) project. Native config belongs in
  `app.json` or a config plugin; prebuild output is disposable and must not be committed.
