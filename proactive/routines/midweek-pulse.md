# Routine: midweek-pulse

Binding for `midweek-pulse` in `proactive/runs.yml`. Paste everything below the line as the routine prompt.

---

/cadence — Run the Wednesday pulse.

- Read `product/context.md` and `CLAUDE.md` first.
- Use the connected issue tracker and meeting-notes connectors if present. If one is missing, do not stop: note "source not connected" in the output, as the skill's degraded path says.
- Write the output to team/weekly-updates/<YYYY-MM-DD>-pulse.md.
- Create a branch `claude/midweek-pulse-<YYYY-MM-DD>`, commit only the file(s) above, push the branch, and open a draft pull request titled "midweek-pulse — <YYYY-MM-DD>" with a three-line summary in the body.
- Do not send email or chat messages, and do not create or edit tickets.
- Stop when the skill's TERMINATION condition is met.
