# Contributing to Team OS

This repo is the shared brain for your team. **Everyone contributes** — engineers, GTM, design, ops, leadership. You don't need to be technical. If you know something the team should know, it belongs here.

---

## The Simple Version

1. Create a branch (or use GitHub's web editor)
2. Edit the file or add your content
3. Open a PR with a one-line description of what changed
4. Someone reviews and merges

That's it. No code review needed — this is context, not code.

---

## What Belongs Here

| You have... | Put it in... |
|-------------|-------------|
| A decision that was made | `team/decisions/decisions.md` — add a row |
| Updated campaign info | `gtm/campaign-tracker.md` |
| Retro notes | `team/retros/YYYY-MM-DD-retro.md` (use `templates/retro.md`) |
| Sprint demo notes | Use `templates/sprint-review.md`, PR to `team/weekly-updates/` |
| A new team member joined | `team/roster.md` — add a row |
| A metric definition changed | `product/analytics/metrics-dictionary.md` |
| A data bug you found | `product/analytics/data-quality-log.md` — add a row |
| Weekly "Hello All" email | `team/weekly-updates/YYYY-MM-DD-hello-all.md` |
| Call/meeting notes | `templates/customer-call-summary.md` format, PR to relevant folder |

## What Does NOT Belong Here

- API keys, tokens, passwords (never commit credentials)
- Full Google Docs content (link to it instead)
- Notion pages (link to it instead)
- Code or prototypes (that's your application repo)
- Speculative plans nobody has committed to

---

## How to Contribute (3 Ways)

### 1. GitHub Web Editor (easiest — no git needed)

1. Go to the file on GitHub
2. Click the pencil icon (edit)
3. Make your change
4. Click "Propose changes" → "Create pull request"
5. Add a one-line title like: "Update campaign tracker — paid social paused"

### 2. Claude Code (for agent-assisted updates)

If you have Claude Code set up, open the `team-os` repo and ask:

```
"Update the decision log — we decided to use [Tool A] over [Tool B] for [feature]"
"Add retro notes for this sprint"
"Flag that the D1 retention metric in metrics-dictionary is outdated"
```

Claude Code will read the CLAUDE.md indexes, find the right file, and make the edit. You review and commit.

### 3. Git CLI (standard flow)

```bash
git checkout -b update/campaign-tracker
# make edits
git add -A && git commit -m "Update campaign tracker — paid social paused"
git push -u origin update/campaign-tracker
# open PR on GitHub
```

---

## PR Guidelines

- **Title format**: `[area] what changed` — e.g., `[gtm] pause paid-social campaign` or `[roadmap] update current bet to week 17`
- **Description**: One sentence is fine. The diff tells the story.
- **Labels** (optional): `context-update`, `decision`, `cadence`, `correction`, `stale-fix`
- **Review**: Any team member can approve. PM reviews roadmap/strategy changes.
- **Merge**: Squash merge. Keep history clean.

### Natural Language PRs

Not sure how to format something? Just describe what changed in plain English in the PR description. Example:

> "We decided in Thursday's sync that attribution tracking is blocked until [person] finishes the event-tracking migration. [Person] is pausing spend on that channel. [Person] flagged the paywall redesign needs another week."

A reviewer (or Claude Code agent) can help structure this into the right files.

---

## Freshness Rules

Every piece of data in this repo has a shelf life:

| Content type | Refresh cadence | Owner |
|-------------|----------------|-------|
| `current-bet.md` | Weekly (Friday) | PM |
| `betting-table.md` | When bet status changes | PM |
| `campaign-tracker.md` | Weekly (Monday) | GTM Lead |
| `decisions.md` | When decisions are made | Whoever decided |
| `metrics-dictionary.md` | When definitions change | Analytics owner |
| `data-quality-log.md` | When bugs found/fixed | Analytics owner |
| `roster.md` | When team changes | PM |

**If you see stale data** — a metric with a date >2 weeks old, a status that's clearly wrong — fix it or open an issue. Don't leave it for someone else.

---

## Definition of Done (for feature work)

A feature is not "shipped" until:

1. The relevant docs in team-os are updated (roadmap status, decision log, metrics if applicable)
2. If it's a bet that shipped → move it to "Shipped" in `betting-table.md`
3. If it changed how we measure something → update `metrics-dictionary.md`
4. If it required a decision → add to `decisions.md`

This is not bureaucracy. It's 5 minutes of context that saves the next person 2 hours of "wait, what happened with X?"
