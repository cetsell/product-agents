# Routine: signals-triage

Binding for `signals-triage` in `proactive/runs.yml`. Paste everything below the line as the routine prompt. Daily is enough; the skill exits immediately when no file in `product/signals/` is unprocessed. Your webhook or export job must drop files there first (`product/signals/CLAUDE.md`).

---

/triage — Sort the new signals against the current bet and the betting table.

- Read `product/signals/CLAUDE.md`, `product/roadmap/current-bet.md`, `product/roadmap/betting-table.md`, `team/decisions/principles.md`, and `CLAUDE.md` for repo rules.
- Candidates are files in `product/signals/` ending in `.md` or `.csv`, not named `sample-*`, whose last line is not `<!-- processed by /triage ... -->`. If there are none, stop and write nothing.
- Place every item in exactly one of the four buckets per the skill. Taste questions the record does not settle go to `team/decisions/questions.md` as rows filed by `/triage`; never ask in chat.
- Write the note to team/active/triage-<YYYY-MM-DD>.md, then append the processed footer to every file you read.
- Create a branch `claude/signals-triage-<YYYY-MM-DD>`, commit the note, the footered signal files, and `team/decisions/questions.md` if it changed, push the branch, and open a draft pull request titled "signals-triage — <YYYY-MM-DD>" whose body is the count line and the Do now table.
- Do not send email or chat messages, do not create or edit tickets, and do not edit roadmap or decision files.
- Stop when the skill's TERMINATION condition is met.
