# Routine: sprint-health

Binding for `sprint-health` in `proactive/runs.yml`. Paste everything below the line as the routine prompt.

---

/sprint-health — Run a sprint health sweep.

- Read `product/context.md` and `CLAUDE.md` first.
- Use the connected issue tracker and meeting-notes connectors if present. If one is missing, do not stop: note "source not connected" in the output, as the skill's degraded path says.
- Write the output to team/weekly-updates/<YYYY-MM-DD>-sprint-health.md.
- Create a branch `claude/sprint-health-<YYYY-MM-DD>`, commit only the file(s) above, push the branch, and open a draft pull request titled "sprint-health — <YYYY-MM-DD>" with a three-line summary in the body.
- Do not send email or chat messages, and do not create or edit tickets.
- Stop when the skill's TERMINATION condition is met.
