# Routine: friday-decide

Binding for `friday-decide` in `proactive/runs.yml`. Paste everything below the line as the routine prompt.

---

/cadence — Run Friday demo-and-decide.

- Read `product/context.md` and `CLAUDE.md` first. Read `team/decisions/questions.md` for rows with status `held`; the Friday note lists them for the PM and does not answer them.
- Use the connected issue tracker and meeting-notes connectors if present. If one is missing, do not stop: note "source not connected" in the output, as the skill's degraded path says.
- Write the output to team/weekly-updates/<YYYY-MM-DD>-friday.md, then draft the weekly team update to team/weekly-updates/<YYYY-MM-DD>-update.md.
- Create a branch `claude/friday-decide-<YYYY-MM-DD>`, commit only the file(s) above, push the branch, and open a draft pull request titled "friday-decide — <YYYY-MM-DD>" with a three-line summary in the body.
- Do not send email or chat messages, and do not create or edit tickets.
- Stop when the skill's TERMINATION condition is met.
