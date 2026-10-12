#!/usr/bin/env node
// Stop hook: if any skill or agent file changed in the working tree, run the
// skill linter before Claude finishes. On failure it blocks the stop once and
// hands the linter output back to Claude; it never loops (stop_hook_active).
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

let input = {};
try { input = JSON.parse(readFileSync(0, "utf8")); } catch {}
if (input.stop_hook_active) process.exit(0);

const root = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
const sh = (cmd) => execSync(cmd, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });

let changed = "";
try { changed = sh("git status --porcelain -- .claude/skills .claude/agents"); } catch { process.exit(0); }
if (!changed.trim()) process.exit(0);

try {
  sh("node check-skills.mjs --strict");
} catch (e) {
  const report = `${e.stdout || ""}`.split("\n").filter((l) => /^(FAIL|warn)/.test(l)).join("\n");
  console.log(JSON.stringify({
    decision: "block",
    reason: `Skill files changed and \`node check-skills.mjs --strict\` fails:\n${report}\nFix these before finishing.`,
  }));
}
