#!/usr/bin/env node
// Runs `claude plugin validate . --strict --json` and fails on any error or
// warning except two that are deliberate in this repo:
//   - root CLAUDE.md is not loaded for plugin installs (it serves clone users;
//     plugin users get the same routing from the team-os-guide skill)
//   - agents/ is a symlink to .claude/agents (one source for clone and plugin)
import { spawnSync } from "node:child_process";

const KNOWN = [/^CLAUDE\.md at the plugin root is not loaded/, /^This directory is a symlink/];
const run = spawnSync("claude", ["plugin", "validate", ".", "--strict", "--json"], { encoding: "utf8" });
if (run.error) {
  console.error(`validate-plugin: could not run \`claude\` (${run.error.code}). Install it with: npm i -g @anthropic-ai/claude-code`);
  process.exit(2);
}
let report;
try { report = JSON.parse(run.stdout); } catch {
  console.error(run.stdout || run.stderr);
  process.exit(2);
}
const sections = [report.manifest, ...(report.contents || [])].filter(Boolean);
const problems = [];
for (const s of sections) {
  for (const e of s.errors || []) problems.push(`ERROR ${s.file}: ${e.path}: ${e.message}`);
  for (const w of s.warnings || []) if (!KNOWN.some((k) => k.test(w.message))) problems.push(`WARN  ${s.file}: ${w.path}: ${w.message}`);
}
if (problems.length) {
  console.log(problems.join("\n"));
  process.exit(1);
}
console.log(`validate-plugin: ok (${sections.length} manifests/components checked; known warnings ignored: ${KNOWN.length})`);
