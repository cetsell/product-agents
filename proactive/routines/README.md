# Routine prompts

Claude Code routines and desktop scheduled tasks are created in the product, not from repo files, so each file here is the exact prompt to paste. One file per scheduled run in `proactive/runs.yml` with `binding: routine`.

## Create a cloud routine (recommended)

1. In Claude Code, run `/schedule` (or go to claude.ai/code/routines → New routine).
2. Repository: this repo. Connect GitHub if asked; routines clone the repo each run and need push access to open a pull request.
3. Schedule: the `when` from `runs.yml` (routines run at most hourly).
4. Connectors: add your issue tracker (and meeting-notes tool if you have one). Without them the skill still runs and says which source was missing.
5. Prompt: paste the body of the matching file below.

Routines are a research preview; behavior and limits may change.

## Or run it on a machine you keep awake

Claude Desktop → Code → Routines → New routine → Local, same prompt and schedule. Desktop tasks run only while the app is open and the computer is awake.

## Rules every prompt follows

- Writes to a dated path in the repo, on a branch named `claude/<run-id>-<date>`, and opens a draft pull request. Never pushes to the default branch.
- Sends nothing (no email, no chat post, no tracker writes).
- Stops at the skill's TERMINATION condition.
