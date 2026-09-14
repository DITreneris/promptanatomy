#!/usr/bin/env bash
set -euo pipefail
# inzinerija is private. Vercel clone often warns "Failed to fetch one or more git
# submodules", then restores a cached apps/prompt-anatomy tree without .git.
# Re-cloning that path needs GitHub credentials the install step does not have
# (fatal: could not read Username). Keep a usable cached tree.
if [ -e apps/prompt-anatomy/.git ]; then
  git submodule update --init --recursive
elif [ -f apps/prompt-anatomy/package.json ]; then
  echo "vercel-install: using cached apps/prompt-anatomy (submodule clone skipped)"
else
  git submodule update --init --recursive
fi
npm ci
cd frontend && npm ci
cd ../apps/prompt-anatomy && HUSKY=0 npm ci
