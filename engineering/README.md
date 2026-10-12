# engineering/

This folder is empty on purpose. It holds one short file per application repo, written for product work: what an agent drafting a PRD, sizing a ticket, or running a premortem must know about that codebase so its estimates and risk calls are grounded.

## What belongs here

- Stack and versions, in one line.
- Frozen or fragile areas (auth, payments, tracking) that raise the risk of any ticket touching them.
- Where feature flags, analytics events, and experiment hooks live, so a hypothesis can name how it will be measured.
- Known slow paths: migrations, release trains, app-store review, anything that adds days between "merged" and "measured".

## What does not

- The app repo's full coding conventions. Those live in that repo's own `CLAUDE.md`.
- Secrets, hostnames, or credentials.
- Anything that goes stale faster than monthly. Put a `Last synced:` date at the top and let `/check-artifacts` flag it.

## Add a repo

1. `cp engineering/conventions.template.md engineering/<repo>-conventions.md`
2. Fill it in (15 minutes; keep it under 80 lines).
3. Add a row to `engineering/CLAUDE.md`.
