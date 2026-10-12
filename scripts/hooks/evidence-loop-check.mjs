#!/usr/bin/env node
// One-time Stop hook registered by the evidence-loop skill (frontmatter,
// `once: true`). Before the turn ends, checks that the reply carries the two
// lines that make an evidence appraisal actionable: the flip-assumption and
// the human decision point. Blocks once with a reason if either is missing.
import { readFileSync } from "node:fs";

let input = {};
try { input = JSON.parse(readFileSync(0, "utf8")); } catch {}
if (input.stop_hook_active) process.exit(0);
const msg = String(input.last_assistant_message || "");
if (!msg) process.exit(0);

const missing = [];
if (!/would flip/i.test(msg)) missing.push("the assumption that would flip the decision");
if (!/human decides|decision (owner|point)|decides here/i.test(msg)) missing.push("the human decision point and its owner");
if (missing.length) {
  console.log(JSON.stringify({
    decision: "block",
    reason: `Evidence loop reply is missing ${missing.join(" and ")}. Add the line(s) from the evidence table, or state "none — too shallow to act on".`,
  }));
}
