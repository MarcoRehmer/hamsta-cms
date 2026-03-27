# AGENTS Guide for `hamsta-cms`
This guide is for agentic coding tools operating in this repository.
It documents project commands and coding conventions.

## Repository Scope
- Main app: `apps/admin` (SvelteKit + TypeScript).
- Secondary app: `apps/api` (Go scaffold).
- `packages/sdk` and `packages/theme-contract` are currently empty.
- Existing agent note file: `apps/admin/AGENTS.md`.

## Cursor / Copilot Rules
Checked locations:
- `.cursorrules`
- `.cursor/rules/`
- `.github/copilot-instructions.md`
Result:
- No Cursor rule files found.
- No Copilot instructions file found.
If these files are added later, treat them as high-priority instructions.

## Stack and Tooling
- Frontend: SvelteKit 2, Svelte 5, Vite 7, TypeScript.
- Frontend package manager: pnpm.
- Linting: ESLint 10 (`@eslint/js`, `typescript-eslint`, `eslint-plugin-svelte`).
- Formatting: Prettier 3 + `prettier-plugin-svelte`.
- Tests: Vitest 4 (unit/component) + Playwright (e2e).
- API: Go `1.26.1` (`apps/api/go.mod`).

## Working Directory Rules
- Run JS/TS commands from `apps/admin`.
- Run Go commands from `apps/api`.
- Do not assume repository root has workspace-level package scripts.

## Install Commands
Frontend:
```bash
cd apps/admin && pnpm install
```
Go API:
```bash
cd apps/api && go mod tidy
```

## Build / Dev / Preview
From `apps/admin`:
- `pnpm dev` - start dev server.
- `pnpm build` - build production app.
- `pnpm preview` - preview production build.
- `pnpm prepare` - `svelte-kit sync`.
From `apps/api`:
- `go run .` - run API.
- `go build ./...` - compile all packages.

## Lint / Format / Type Checking
From `apps/admin`:
- `pnpm lint` - Prettier check + ESLint.
- `pnpm format` - apply formatting.
- `pnpm check` - Svelte/TS diagnostics.
- `pnpm check:watch` - diagnostics in watch mode.
From `apps/api` (recommended standard commands):
- `gofmt -w .`
- `go vet ./...`

## Test Commands
From `apps/admin`:
- `pnpm test:unit` - all Vitest tests.
- `pnpm test:e2e` - all Playwright tests.
- `pnpm test` - unit (`--run`) then e2e.
From `apps/api`:
- `go test ./...` - all Go tests.

## Single-Test Execution (Important)
Vitest single file:
```bash
cd apps/admin && pnpm test:unit -- src/lib/vitest-examples/greet.spec.ts
```
Vitest single test name:
```bash
cd apps/admin && pnpm test:unit -- -t "returns a greeting"
```
Vitest specific project:
```bash
cd apps/admin && pnpm test:unit -- --project server
cd apps/admin && pnpm test:unit -- --project client
```
Playwright single spec file:
```bash
cd apps/admin && pnpm test:e2e -- src/routes/demo/playwright/page.svelte.e2e.ts
```
Playwright single test title:
```bash
cd apps/admin && pnpm test:e2e -- --grep "has expected h1"
```
Go single test function:
```bash
cd apps/api && go test ./... -run '^TestMyCase$'
```
Go single package:
```bash
cd apps/api && go test ./path/to/package
```

## Code Style: Formatting
Source of truth: `apps/admin/.prettierrc`.
- Use tabs, not spaces.
- Use single quotes.
- Use `trailingComma: none`.
- Keep lines near 100 chars.
- Format `.svelte` files with `prettier-plugin-svelte`.
Practical behavior:
- Prefer small diffs.
- Avoid unrelated reformatting.
- Preserve intentional file-level style differences.

## Code Style: Imports
- Keep imports at file top.
- Use `import type` for type-only imports.
- Prefer aliases (`$app/*`, `$lib/*`) over deep relative paths.
- Keep external imports before local relative imports.
- Remove unused imports before finalizing.

## Code Style: TypeScript and Types
- TS strict mode is enabled; avoid `any`.
- Prefer explicit types on exported functions and public APIs.
- Favor narrow types/unions over broad casting.
- Use framework types (`Handle`, request/event types, etc.) when available.
- JS files are type-checked (`allowJs` + `checkJs`), keep them type-safe.

## Naming Conventions
- Variables/functions: `camelCase`.
- Types/components/classes: `PascalCase`.
- Constants: `UPPER_SNAKE_CASE` for true constants.
- Unit tests: `*.spec.ts`.
- E2E tests: `*.e2e.ts`.
- Preserve SvelteKit route file names (`+page.svelte`, `+layout.svelte`, etc.).

## Svelte / SvelteKit Conventions
- Use `<script lang="ts">` in TS Svelte components.
- Follow Svelte 5 rune-era patterns already present (`$props()`).
- Put reusable cross-route logic in `src/lib`.
- Keep route-specific behavior in route modules.
- Do not edit generated output in `.svelte-kit/`.

## Error Handling Expectations
Frontend:
- Do not silently swallow errors.
- Use SvelteKit-native error flow in load/actions/endpoints.
- Validate external input early (params, payloads, env).
- Return actionable user-facing failure messages.
Go:
- Always check returned `error` values.
- Wrap/add context when propagating errors.
- Prefer early returns on invalid state.

## Agent Workflow Notes
- Read `apps/admin/AGENTS.md` for extra Svelte-specific guidance.
- That file references MCP-oriented workflow; follow it when tools exist.
- If MCP helpers are unavailable, follow this file and local code conventions.
- Keep changes scoped; avoid broad refactors unless explicitly requested.
