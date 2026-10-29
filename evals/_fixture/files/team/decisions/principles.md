# Principles

*Fixture for product-agents evals: a fictional product. Not real data.*

**Last updated:** 2026-10-05
**Owner:** PM

## Status values

`active` · `proposed` · `retired`

## Scope

| # | Rule | Applies when | Source | Status |
|---|------|--------------|--------|--------|
| S1 | No new setting for behavior fewer than 10% of weekly active teams would change; pick a default. | a ticket or PRD proposes a toggle | `decisions.md` 2026-06-02 | active |
| S2 | Onboarding has at most three steps before the first note is written. | any onboarding change | Friday note 2026-08-21 | active |
| S3 | Anything that adds a step to invite flow is a bet, not a ticket. | an invite-flow change without a betting-table row | Friday note 2026-09-25 | proposed |

## Quality bar

| # | Rule | Applies when | Source | Status |
|---|------|--------------|--------|--------|
| Q1 | Nothing ships without its success metric readable from a saved warehouse query or the activation dashboard. | a bet moves to shipped | `decisions.md` 2026-07-13 | active |

## Copy and tone

| # | Rule | Applies when | Source | Status |
|---|------|--------------|--------|--------|
| C1 | No exclamation marks in product UI copy. | any user-facing string | PR review 2026-05-30 | active |
| C2 | We say "teammate", never "user" or "member", in product copy. | any user-facing string | PR review 2026-06-18 | active |

## Pricing and packaging

| # | Rule | Applies when | Source | Status |
|---|------|--------------|--------|--------|
| P1 | The free plan never loses a feature it already has; we gate new ones. | a pricing or paywall change | `decisions.md` 2026-09-28 | active |

## What we always say no to

| # | Rule | Applies when | Source | Status |
|---|------|--------------|--------|--------|
| N1 | No integration built for a single prospect before they are a paying team. | a sales-driven feature request | `decisions.md` 2026-04-11 | active |

## Judge corrections

| # | Rule | Applies when | Source | Status |
|---|------|--------------|--------|--------|
| J1 | judge said "decided by S1" on 2026-09-30 for a high-contrast toggle; the rule is: accessibility settings are exempt from S1. | S1 would otherwise apply | PM override 2026-09-30 | active |

## Retired

| # | Rule | Retired | Why |
|---|------|---------|-----|
| | | | |
