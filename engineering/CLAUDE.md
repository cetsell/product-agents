# Engineering Context

Context that helps agents working *outside* an application repo (here, in product-agents) understand how that repo works. Read `README.md` for what belongs here.

## Repos Covered

| Repo | Conventions file | What it is |
|------|------------------|------------|
| <!-- your-app-repo --> | `<!-- your-app-repo -->-conventions.md` (copy `conventions.template.md`) | <!-- one line --> |

## When to read

- A PRD, ticket, or premortem needs to know what is frozen, risky, or slow to change in the codebase.
- Sizing work in `/pm-super-agent` or `/issue-creator` and you need the real architecture, not a guess.

Do not duplicate an app repo's own `CLAUDE.md` here. The canonical conventions live in that repo; this folder carries only the slice product work needs.
