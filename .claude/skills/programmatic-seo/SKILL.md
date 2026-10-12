---
name: programmatic-seo
description: >
  Designs SEO pages at scale from a template plus a data set: picks the playbook (templates,
  comparisons, integrations, locations, personas, and more), defines the keyword pattern,
  data model, page template, linking and indexation plan, and a sample of generated pages,
  with the organic metric the pages should move and how a staged rollout proves it.
when_to_use: >
  Use for "programmatic SEO", "pSEO", "template pages", "pages at scale", "directory pages",
  "location pages", "[keyword] + [city] pages", "comparison pages", "integration pages",
  "generate 100 pages", "data-driven pages", "templated landing pages", or any plan to
  build many similar pages targeting different keywords. Not for the copy on one page (use
  /copywriting), conversion of a single page (use /page-cro), or positioning for
  comparison pages (use /marketing-strategy-pmm).
argument-hint: "[keyword pattern or page type]"
allowed-tools: Read, Grep, Glob, Write, WebSearch, WebFetch
metadata:
  version: 2.0.0
---

# Programmatic SEO

**Role:** Programmatic SEO strategist. One job: a page template and data model that earn rankings and signups at scale without thin-content penalties.
**Outcome:** Acquisition & activation — non-brand organic sessions and the signups they produce (indexed pages x clicks per page x conversion rate). **Leaves behind:** a playbook choice, template, data model, sample pages, and rollout test plan in `gtm/pseo/`.
**Output:** `gtm/pseo/<pattern>-<YYYY-MM-DD>.md`

Read `product/context.md` first (customer, stage, North Star, baselines, tools). Ask only for what it does not cover or what is specific to this task.

## Initial assessment

1. **Business context** — product, target audience, and the conversion goal for these pages (signup, trial, demo).
2. **Opportunity** — which search patterns exist, how many potential pages, how search volume is distributed (head vs long tail).
3. **Competitive landscape** — who ranks for these terms now, what their pages look like, and whether this site can realistically compete given its authority.
4. **Data and stack** — what data the team has or can acquire, and what the site is built on.

If authority is low and incumbents own the pattern, say so and recommend a narrower pattern before designing anything.

## Core principles

1. **Unique value per page.** Every page provides value specific to that page, not swapped variables in a template. The more differentiated, the better.
2. **Proprietary data wins.** Defensibility, strongest to weakest: proprietary (you created it), product-derived (from your users), user-generated (your community), licensed (exclusive access), public (anyone can use).
3. **Subfolders, not subdomains.** Subfolders consolidate domain authority; subdomains split it. Good: `yoursite.com/templates/resume/`. Bad: `templates.yoursite.com/resume/`.
4. **Genuine search intent match.** Pages answer what people are actually searching for.
5. **Quality over quantity.** 100 great pages beat 10,000 thin ones.
6. **Avoid penalties.** No doorway pages, keyword stuffing, or duplicate content. Genuine utility for users.

## Workflow

### 1. Pick the playbook

Twelve patterns: Templates, Curation, Conversions, Comparisons, Examples, Locations, Personas, Integrations, Glossary, Translations, Directory, Profiles. Match the pattern to what the team uniquely has (proprietary data points to Directories or Profiles; integrations to Integrations; a multi-segment audience to Personas). Playbooks can layer ("best coworking spaces in San Diego"). Full pattern table and the choosing matrix: `references/playbooks.md`.

### 2. Research the keyword pattern

- Identify the repeating structure, the variables, and how many unique combinations exist.
- Validate demand: aggregate search volume, head vs long-tail distribution, trend direction.
- Drop combinations with no demand before they become pages.

### 3. Define the data model

- What data populates each page; whether it is first-party, scraped, licensed, or public; how it is updated.
- One row per page, with the fields the template needs and the conditional fields that make pages differ.

### 4. Design the template

- Header with the target keyword; a unique intro (not variables swapped); data-driven sections; related pages and internal links; CTAs that fit the search intent.
- Uniqueness: conditional content driven by the data, plus original insight or analysis per page.
- Title and meta description templates; schema type to use.

### 5. Plan internal linking

- Hub and spoke: hub is the category page, spokes are the generated pages, with cross-links between related spokes.
- No orphans: every page reachable from the main site, in the XML sitemap, with breadcrumbs carrying structured data.

### 6. Plan indexation

- Prioritize high-volume patterns; noindex very thin variations; manage crawl budget; separate sitemaps by page type.

### 7. Generate samples and check quality

Produce 3-5 sample pages from real rows, including one from the thinnest data you expect. Run the pre-launch checklist and common-mistakes scan in `references/quality-checklist.md` against them.

### 8. Plan the rollout test

Launch one batch first, not the whole set. Compare the batch against a held-back group of eligible pages (or against the prior period for the same pattern) on indexation rate, organic clicks, and signups. Design the split and read-out with /ab-test-setup and log it in `product/roadmap/experiment-roadmap.md`. Scale only if the batch clears the target.

## Output shape

```markdown
# pSEO plan — [pattern] | [date]

**Metric these pages should move:** [non-brand organic sessions / signups from the pattern] — baseline [x or `assumed`], target [y by date]
**Test that proves it:** [first batch vs held-back group, primary metric, guardrail] — design with /ab-test-setup

## Opportunity
[pattern, combinations, demand, who ranks, can we compete]

## Playbook and data model
[playbook choice and why; data sources; field list per page]

## Page template
[URL structure, title/meta templates, content outline, schema type]

## Linking and indexation
[hub/spoke map, sitemap plan, noindex rules]

## Sample pages
[3-5 generated samples, including the thinnest case]

## Rollout and monitoring
[first batch size, what to track: indexation rate, rankings, traffic, engagement, conversion; what triggers a stop]
```

## References (load on demand)

- `references/playbooks.md` — the 12 playbooks with pattern and example, and the matrix for choosing one from what the team has. Read at step 1.
- `references/quality-checklist.md` — pre-launch checklist (content, technical SEO, linking, indexation), post-launch monitoring signals, and common mistakes. Read at step 7 and when writing the monitoring plan.

## Related skills

- /copywriting — the template's headline, intro, and CTA copy
- /page-cro — conversion of the template once traffic arrives
- /ab-test-setup — the rollout split and read-out
- /data-analyst — post-launch organic and conversion read-outs from the warehouse
- /marketing-strategy-pmm — positioning for comparison and alternative pages

## TERMINATION

Stop when the plan is delivered in the output shape: playbook, data model, page template, sample pages, and the metric and rollout-test lines filled. One keyword pattern per invocation. Do not generate the full page set, publish pages, run a post-launch audit, or redesign the site architecture; name those as next steps.
