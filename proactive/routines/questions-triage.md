# Routine: questions-triage

Binding for `questions-triage` in `proactive/runs.yml`. Paste everything below the line as the routine prompt. Daily is enough; the skill exits immediately when no row is `open`.

---

/judge — Clear the open rows in team/decisions/questions.md.

- Read `team/decisions/principles.md` (Judge corrections first), `team/decisions/decisions.md`, and `team/decisions/questions.md`. Read `CLAUDE.md` for repo rules.
- If no row has status `open`, stop and write nothing.
- Give each open row exactly one verdict (decided / sent back / held) per the skill. Never invent a principle; never edit `principles.md` or `decisions.md`.
- Write the batch note to product/analysis/judge/verdicts-<YYYY-MM-DD>.md.
- Create a branch `claude/questions-triage-<YYYY-MM-DD>`, commit only `team/decisions/questions.md` and the batch note, push the branch, and open a draft pull request titled "questions-triage — <YYYY-MM-DD>" whose body is the count line and the Held table.
- Do not send email or chat messages, and do not create or edit tickets.
- Stop when the skill's TERMINATION condition is met.
