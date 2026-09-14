#!/usr/bin/env bash
set -euo pipefail
# inzinerija is private. Vercel often warns "Failed to fetch one or more git
# submodules", then restores a cached apps/prompt-anatomy tree without .git.
# Prefer INZINERIJA_READ_TOKEN (same PAT as GitHub Actions) so the pin SHA
# actually updates. Without a token, keep a usable cached tree — do not rm -rf
# then reclone (that hits "could not read Username").
TOKEN="$(printf '%s' "${INZINERIJA_READ_TOKEN:-}" | tr -d '\r\n')"
if [ -n "$TOKEN" ]; then
  git config --global url."https://x-access-token:${TOKEN}@github.com/".insteadOf "https://github.com/"
  if [ -d apps/prompt-anatomy ] && [ ! -e apps/prompt-anatomy/.git ]; then
    echo "vercel-install: clearing cached apps/prompt-anatomy without .git (token present)"
    rm -rf apps/prompt-anatomy
  fi
  git submodule update --init --recursive
elif [ -e apps/prompt-anatomy/.git ]; then
  git submodule update --init --recursive
elif [ -f apps/prompt-anatomy/package.json ]; then
  echo "vercel-install: using cached apps/prompt-anatomy (set INZINERIJA_READ_TOKEN to refresh pin)"
else
  echo "vercel-install: ERROR — no INZINERIJA_READ_TOKEN and no cached apps/prompt-anatomy/package.json" >&2
  exit 1
fi
npm ci
cd frontend && npm ci
cd ../apps/prompt-anatomy && HUSKY=0 npm ci
