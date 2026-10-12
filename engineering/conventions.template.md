# {{repo}} — Context for Product Work

> Canonical conventions live in the `{{repo}}` repo's own CLAUDE.md. This is the slice product work needs.
> Last synced: {{YYYY-MM-DD}}

## Stack

{{framework + version}}, {{state management}}, {{auth provider}}, {{analytics / experimentation tool}}

## Risky areas (raise ticket risk and require staging-first)

| Area | Path(s) | Why it is risky |
|------|---------|-----------------|
| {{auth}} | `{{path}}` | {{reason}} |
| {{payments}} | `{{path}}` | {{reason}} |
| {{tracking}} | `{{path}}` | {{reason}} |

## How a change gets measured

- Feature flags: {{tool + where flags are defined}}
- Analytics events: {{where events are defined; naming convention}}
- Experiments: {{how an A/B test is wired; who owns assignment}}

## Time from merge to measured

| Step | Typical time | Notes |
|------|--------------|-------|
| Merge → production | {{e.g. same day}} | {{release train, app-store review}} |
| Production → first readable data | {{e.g. 24h}} | {{warehouse sync lag}} |

## Frozen files (never modify internals)

`{{file}}`, `{{file}}`
