#!/usr/bin/env node
// Reactive trigger `premortem-high-stakes` (proactive/runs.yml).
// When product/roadmap/betting-table.md changes, nudge toward /premortem before
// a new high-stakes bet is committed.
//   PostToolUse (Edit|Write by Claude): additionalContext reaches Claude.
//   FileChanged (edited outside Claude): systemMessage shows the user a notice;
//   FileChanged output does not reach Claude's context.
import { readFileSync } from "node:fs";

let input = {};
try { input = JSON.parse(readFileSync(0, "utf8")); } catch {}
const event = input.hook_event_name;
const file = input.tool_input?.file_path || input.file_path || "";
if (!file.endsWith("product/roadmap/betting-table.md")) process.exit(0);

const msg =
  "betting-table.md changed. If this adds a high-stakes bet, a pricing change, or a launch plan, " +
  "run /premortem on it and attach the report before the bet is committed (PM signs off on the revised plan).";

if (event === "PostToolUse") {
  console.log(JSON.stringify({ hookSpecificOutput: { hookEventName: "PostToolUse", additionalContext: msg } }));
} else {
  console.log(JSON.stringify({ systemMessage: `[team-os] ${msg}` }));
}
