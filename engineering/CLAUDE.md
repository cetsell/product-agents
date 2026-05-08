# Engineering Context

Codebase conventions and runtime context for your repositories. Read the file matching the repo you're working with.

## Repos Covered

| Repo | Conventions | Runtime Context | What it is |
|------|------------|-----------------|------------|
| **[your-repo]** | `fe-main-conventions.md` | `fe-main-runtime-context.md` | [Description — e.g., Angular production app] |

## When to Use

- **Before touching frontend code** — read both files to understand conventions and frozen files
- **When reviewing PRs** — check changes against coding standards
- **When onboarding** — understand the production app architecture before making changes
- **Cross-repo work** — if an agent in team-os or another repo needs to understand how the app works

## What Lives Elsewhere

| Repo | Where its CLAUDE.md lives | Notes |
|------|--------------------------|-------|
| **[your-app-repo]** | In the repo itself | Conventions live in the repo — don't duplicate here |
| **team-os** | This repo's root `CLAUDE.md` | You're already here |

Don't duplicate repo-level CLAUDE.md files here. Only add context that helps agents *outside* that repo understand the codebase.
