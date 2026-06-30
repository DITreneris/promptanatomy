#!/usr/bin/env bash
set -euo pipefail
cd frontend && npm run build
cd ../apps/prompt-anatomy
export VITE_MVP_MODE=
export VITE_BASE_PATH=/anatomy/
export VITE_MAX_BUILD_MODULE=9
export VITE_PUBLIC_SITE_URL=https://www.promptanatomy.app
npx vite build
mkdir -p ../../frontend/dist/anatomy
cp -r dist/* ../../frontend/dist/anatomy/
