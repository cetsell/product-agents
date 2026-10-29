# Principles

*Standing answers. One line per rule the team has already settled, each traced to the decision or Friday note it came from. `/judge` applies these to the questions in `questions.md` so the PM answers a question once, not weekly.*

**Last updated:** YYYY-MM-DD
**Owner:** PM

---

## How this file works

- A principle is a **decision compressed into a rule**: "we do X" or "we never do Y", with the condition that makes it apply. Not a value ("we care about quality"), not a goal.
- Every row cites its source: a row in `decisions.md`, a dated Friday note, or a PR review comment. A rule with no source is `proposed` until the PM keeps it.
- Rows arrive two ways: the PM writes one, or `/cadence` (Friday) extracts this week's taste calls and files them as `proposed`. The PM keeps or deletes `proposed` rows in the same PR.
- When `/judge` gets a verdict wrong, the correction is a new row here, not an edit to the judge. Format: `judge said {X} on {date}; the rule is {Y}`.
- Retire a rule by moving it to **Retired** with the date and why. Never delete; the judge needs to know a rule used to exist.

## Status values

`active` (apply it) · `proposed` (extracted, not yet kept by the PM) · `retired` (in the bottom table)

---

## Scope

| # | Rule | Applies when | Source | Status |
|---|------|--------------|--------|--------|
| S1 | [Example: We do not add a setting for behavior fewer than 10% of weekly actives would change. Pick a default.] | [a ticket or PRD proposes a toggle] | [`decisions.md` YYYY-MM-DD] | proposed |

## Quality bar

| # | Rule | Applies when | Source | Status |
|---|------|--------------|--------|--------|
| Q1 | [Example: Nothing ships without its success metric readable from a saved query or dashboard.] | [a bet moves to shipped] | [Friday note YYYY-MM-DD] | proposed |

## Copy and tone

| # | Rule | Applies when | Source | Status |
|---|------|--------------|--------|--------|
| C1 | [Example: No exclamation marks in product UI.] | [any user-facing string] | [PR review YYYY-MM-DD] | proposed |

## Pricing and packaging

| # | Rule | Applies when | Source | Status |
|---|------|--------------|--------|--------|
| P1 | [Example: Free tier never loses a feature it already has; we gate new ones.] | [a pricing or paywall change] | [`decisions.md` YYYY-MM-DD] | proposed |

## What we always say no to

| # | Rule | Applies when | Source | Status |
|---|------|--------------|--------|--------|
| N1 | [Example: No integrations built for one prospect before they are a customer.] | [a sales-driven feature request] | [`decisions.md` YYYY-MM-DD] | proposed |

## Judge corrections

| # | Rule | Applies when | Source | Status |
|---|------|--------------|--------|--------|
| J1 | [Example: judge said "decided by S1" on YYYY-MM-DD for an accessibility toggle; the rule is: accessibility settings are exempt from S1.] | [S1 would otherwise apply] | [PM override YYYY-MM-DD] | active |

---

## Retired

| # | Rule | Retired | Why |
|---|------|---------|-----|
| | | | |
