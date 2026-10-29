#!/usr/bin/env node
// PreToolUse hook on issue-tracker write tools (Linear, Jira). Forces a human
// confirmation on every create/update, which enforces the "propose the list,
// get explicit approval, then create" rule in /pm-super-agent and
// /issue-creator. A prompt-type hook cannot see the conversation, so it could
// not verify that approval happened; asking the human can.
import { readFileSync } from "node:fs";

let input = {};
try { input = JSON.parse(readFileSync(0, "utf8")); } catch {}
const tool = input.tool_name || "";
if (!/(create|save|update|edit|delete|transition|move|assign)/i.test(tool)) process.exit(0);

const title = input.tool_input?.title || input.tool_input?.summary || "";
console.log(JSON.stringify({
  hookSpecificOutput: {
    hookEventName: "PreToolUse",
    permissionDecision: "ask",
    permissionDecisionReason:
      `product-agents: ${tool}${title ? ` ("${String(title).slice(0, 80)}")` : ""} writes to the issue tracker. ` +
      "Approve only if you already approved the proposed list (scope, count, assignment).",
  },
}));
