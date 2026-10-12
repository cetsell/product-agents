#!/usr/bin/env bash
# Builds an eval workspace: the product-agents template (context, roadmap, templates,
# playbooks) with the fictional "Acme Notes" fixture laid over it. Runs in the
# empty eval workspace (cwd) when `claude plugin eval` is invoked with --scaffold.
# Usage outside plugin eval: bash evals/_fixture/scaffold.sh  (from an empty dir)
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO="$(cd "$HERE/../.." && pwd)"
for path in CLAUDE.md product team templates engineering gtm; do
  cp -R "$REPO/$path" .
done
cp -R "$HERE/files/." .
