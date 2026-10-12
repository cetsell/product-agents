# Routine: monday-kickoff

Binding for `monday-kickoff` in `proactive/runs.yml`. Paste everything below the line as the routine prompt.

---

/cadence — Run the Monday kickoff.

- Read `product/context.md` and `CLAUDE.md` first.
- Use the connected issue tracker and meeting-notes connectors if present. If one is missing, do not stop: note "source not connected" in the output, as the skill's degraded path says.
- Write the output to team/weekly-updates/<YYYY-MM-DD>-kickoff.md.
- Create a branch `claude/monday-kickoff-<YYYY-MM-DD>`, commit only the file(s) above, push the branch, and open a draft pull request titled "monday-kickoff — <YYYY-MM-DD>" with a three-line summary in the body.
- Do not send email or chat messages, and do not create or edit tickets.
- Stop when the skill's TERMINATION condition is met.
