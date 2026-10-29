#!/usr/bin/env bash
# Copies the product-agents template plus the Acme Notes fixture into the empty eval workspace.
exec bash "$(dirname "${BASH_SOURCE[0]}")/../../_fixture/scaffold.sh"
