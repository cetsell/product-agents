# [Your Repo] — Runtime Context

> Exported from your frontend repo's CLAUDE.md. Contains runtime state that changes more frequently than conventions.
> Last synced: <!-- YYYY-MM-DD -->

*This file is where you document the "living" state of your frontend codebase — things that change sprint to sprint and that AI agents need to know to avoid breaking things. Update it when the stack changes, when you add frozen files, or when a key service API changes.*

## Stack

<!-- Example:
Angular 17.3.6, standalone components, NgRx 17.2.0, Bootstrap 5.3.3, AWS Cognito (custom JWT), WebSocket via WebsocketService, Sentry, Segment analytics via AnalyticsService.
-->

[Framework + version], [state management], [UI library], [auth provider], [analytics/observability tools]

## Key Conventions

<!-- List any conventions that override or extend the base conventions file. -->

- [Example: All new features go in `src/app/features/[feature]/` (Sidecar pattern)]
- [Example: Subscriptions use `takeUntilDestroyed(this.destroyRef)`]
- [Example: SCSS always imports `@import '../../../styling/variables';` first]

## Frozen Files (never modify internals)

<!-- List files that must not be modified — usually core auth, state, or legacy code with fragile dependencies. -->

`[filename]`, `[filename]`, `[filename]`

## Important Services & Return Types

<!-- Document non-obvious service APIs so agents don't guess wrong types. -->

- `[ServiceName].[method]()` → `Observable<[ReturnType]>` — [what it returns and when to use it]
- `[ServiceName].[property]$` → `BehaviorSubject<[Type]>` — [live state description]

## Active Feature Context

<!-- One section per in-flight feature that agents might need to understand. Remove when shipped. -->

### [Feature Name] (`src/app/features/[feature]/`)

[Brief description of what this feature does and its current implementation state]

- [Key component or service and what it does]
- [Any gotchas or non-obvious patterns]

## Pre-existing Errors (not our code)

<!-- Document TS errors from third-party code or legacy files so agents don't waste time trying to fix them. -->

- `[filename]`: [error description]
