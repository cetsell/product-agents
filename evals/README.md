# evals/

Behavioral eval suites for the eight skills a new team touches first: `cadence`, `pm-super-agent`, `issue-creator`, `sprint-health`, `strategy`, `audit`, `eval-runner`, `evidence-loop`. Scored results live in `product/analysis/skill-evals/`, one dated file per run.

## Layout

```
evals/
  _fixture/
    scaffold.sh        # builds a workspace: repo template + the fixture below
    files/             # "Acme Notes", a fictional product: filled context, roadmap,
                       # a prior Friday note, and exports in inputs/ (tracker CSV,
                       # meeting notes, weekly funnel, a strategy memo, an eval set)
  <skill>/<case>/
    case.yaml          # prompt + graders, `claude plugin eval` format
    fixture.sh         # calls _fixture/scaffold.sh
```

Every skill has three cases: an in-scope task, an over-produce trap (a narrow ask the skill is tempted to expand), and an out-of-scope prompt that must not trigger it. Graders map to the five `/skill-eval` dimensions: `tool_used: Skill` for triggering, `file_exists` for the output path, and an `llm` rubric for role, shape, termination, and the evidence loop.

The fixture has no MCP servers on purpose: every case also checks the skill's degraded path (pasted exports instead of a connected tracker or warehouse).

## Run

```bash
# all suites (needs a logged-in `claude`; scaffold runs only with --scaffold)
claude plugin eval . --scaffold --allow-tools Write Edit --trust-plugin --judge-model claude-opus-5-5

# one skill
claude plugin eval . --case "cadence-*" --scaffold --allow-tools Write Edit --trust-plugin --judge-model claude-opus-5-5
```

Results land in `evals/results/<timestamp>/` (git-ignored). Summarize them into `product/analysis/skill-evals/{date}-summary.md` with `/skill-eval`.

`--judge-model` matters: the default judge is Haiku, and a judge should be at least as strong as the model the skill runs on.

## Status

The case files follow the documented `case.yaml` schema (code.claude.com/docs/en/plugin-evals) but have not yet been executed through `claude plugin eval`: the CLI was not authenticated on the machine that produced the first results. The first results (2026-10-12) used the fallback method described in `/skill-eval`. Running the command above once and committing the summary is the open follow-up.
