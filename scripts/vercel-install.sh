#!/usr/bin/env bash
set -euo pipefail
git submodule update --init --recursive
npm ci
cd frontend && npm ci
cd ../apps/prompt-anatomy && HUSKY=0 npm ci
