#!/usr/bin/env node
// Runs `claude plugin validate . --strict --json` and fails on any error or
// warning except two that are deliberate in this repo:
//   - root CLAUDE.md is not loaded for plugin installs (it serves clone users;
//     plugin users get the same routing from the product-agents-guide skill)
//   - agents/ is a symlink to .claude/agents (one source for clone and plugin)
import { spawnSync } from "node:child_process";

const KNOWN = [/^CLAUDE\.md at the plugin root is not loaded/, /^This directory is a symlink/];
const run = spawnSync("claude", ["plugin", "validate", ".", "--strict", "--json"], { encoding: "utf8" });
if (run.error) {
  console.error(`validate-plugin: could not run \`claude\` (${run.error.code}). Install it with: npm i -g @anthropic-ai/claude-code`);
  process.exit(2);
}
// Older or differently packaged CLIs may lack --json: fall back to the text
// report, where each finding is a "❯ path: message" line.
if (/unknown option '--json'/.test(run.stderr || "")) {
  const text = spawnSync("claude", ["plugin", "validate", ".", "--strict"], { encoding: "utf8" });
  const out = `${text.stdout}\n${text.stderr}`;
  const findings = out.split("\n").filter((l) => /^\s*❯/.test(l)).map((l) => l.replace(/^\s*❯\s*[^:]*:\s*/, ""));
  const unknown = findings.filter((m) => !KNOWN.some((k) => k.test(m)));
  if (/✘|error/i.test(out) && unknown.length === 0 && findings.length === 0) { console.log(out); process.exit(1); }
  if (unknown.length) { console.log(unknown.map((m) => `FINDING ${m}`).join("\n")); process.exit(1); }
  console.log(`validate-plugin: ok (text mode; ${findings.length} known warning(s) ignored)`);
  process.exit(0);
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
