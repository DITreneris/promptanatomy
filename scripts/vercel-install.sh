#!/usr/bin/env bash
set -euo pipefail
# Vercel cache restore can leave apps/prompt-anatomy non-empty without a submodule
# .git after a failed clone — git then refuses to clone into that path.
if [ -e apps/prompt-anatomy ] && [ ! -e apps/prompt-anatomy/.git ]; then
  rm -rf apps/prompt-anatomy
fi
git submodule update --init --recursive
npm ci
cd frontend && npm ci
cd ../apps/prompt-anatomy && HUSKY=0 npm ci
