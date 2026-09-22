# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project state

SteadyChime is a bare Expo SDK 57 / React Native 0.86 / React 19 app, currently still the
unmodified Expo TypeScript starter (`App.tsx` renders the placeholder screen). There is no
app-specific architecture yet — when adding structure, establish it rather than looking for it.

## Expo skills

The bundled `expo:*` skills don't know this project's SDK pin — when a skill's example conflicts
with the v57 docs, `AGENTS.md` wins. Confirm any API against the versioned docs before using it.

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
pnpm test             # jest-expo unit tests
```

Unit tests are jest-expo; they live in `__tests__` directories and are named `*-test.ts(x)`.
No linter or formatter is configured — there is nothing to run for those, and `npx tsc --noEmit`
is the only type check available.

## Conventions

- Entry point is `index.ts` (not `App.tsx`): it calls `registerRootComponent(App)`, which handles
  both Expo Go and native builds. Leave that indirection in place.
- TypeScript is `strict: true` on top of `expo/tsconfig.base`.
- `/ios` and `/android` are gitignored — this is a managed (CNG) project. Native config belongs in
  `app.json` or a config plugin; prebuild output is disposable and must not be committed.

## Agent Instructions

- Never execute `pnpm install`, `pnpm add`, `pnpm remove`, or any other command that installs/mutates dependencies. Edit `package.json` directly and tell the user to run the install themselves.
- Never execute `git commit` on your own without explicit instruction. After explicit instruction, execute without asking for additional confirmation.
- Commit directly to main — this is a solo project and does not use feature branches. Do not create a branch before committing just because main is the default branch. Committing is still only on instruction.
- After executing a commit, stop. Never start the next task or planned commit automatically — wait for the user to say so.
- In this sandbox, `node_modules` was installed on Windows: `pnpm` is unavailable, `.bin` shims fail, and platform-specific binaries (e.g. Biome's Linux CLI) are missing. Never attempt `npx <tool>`, `pnpm exec <tool>`, `pnpm <script>`, or login-shell fallbacks. To verify changes, run `node node_modules/typescript/bin/tsc --noEmit` (ignore pre-existing errors in unrelated files) and skip lint/format checks — the user runs `pnpm check` on the host.
- When the entire user message is `coa`, treat it as the command `commit all`.

## Code Style
- General:
  - Insert an empty line before `return`, unless it is the first statement in its block.
  - Always brace a control-flow body and put its statement on its own line — never `if (x) return`.
  - Never add comments, except tool-control directive comments when explicitly instructed — e.g. suppression/ignore/pragma comments for linters, formatters, type-checkers, or static analyzers.
  - Preserve a file's existing line endings; write new files with CRLF.
- TypeScript:
  - Omit the braces and `return` when an arrow function body is a single expression, except in React components; keep them where the implicit return would change behaviour, such as a `useEffect` callback, or where it would return a value from a `forEach` callback, such as `Map.set` or `Array.push`.
  - Shorten an inline callback's parameter to the first letter of the last word in its name when the body is a single expression on one line. Keep the full name when the body spans multiple lines, when two parameters would collide on the same letter, when that letter is already bound in scope, or when the parameter is used as a JSX namespace.
  - Add an explicit return type to every named function, except React components; inline callbacks may rely on inference. Omit it where the annotation would only restate an unspellable inferred type.
  - Use a `type` alias for React component props, never an `interface`.
  - Always use single quotes, matching the Biome config's `quoteStyle`.
  - Import a directory's `index` module by the directory alone — `<dir>`, never `<dir>/index`.
  - Insert an empty line after a multi-line block statement (`if`, `for`, `while`, `do`/`while`, `switch`, `try`/`catch`), unless it is the last statement in its scope. Never insert one before a continuation keyword (`} else {`, `} catch {`, `} finally {`, `} while (…);`).

## Agent skills

### Issue tracker

Issues and specs live as local markdown files under `.scratch/<feature>/`. Issues are sized by
feature; a `plan.md` next to them breaks each issue into single-commit steps as checkboxes, grouped
under their issue. "Move on with the plan" does exactly one step, ticks it and stops, without
committing. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context: one root `CONTEXT.md` plus `docs/adr/`. See `docs/agents/domain.md`.

## Claude Code Status Line

On the first turn of a session, if `~/.claude/settings.json` has no `statusLine` entry, set one up
without asking — it is pre-approved. Generate a status line command script in `~/.claude/` and
register it in `settings.json` (merge; keep existing keys). The status line shows only:

- Context usage as a 20-character progress bar using `▓` (used) and `░` (free), followed by the percentage
- Bar and percentage colored by usage: green below 50%, yellow 50–79%, red 80% and above; the free part of the bar dimmed
- No padding
