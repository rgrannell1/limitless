#! /usr/bin/env zsh

# Copy all assets (including fonts) to dist
mkdir -p dist/assets
cp assets/* dist/assets/
cp -r fonts dist/assets/

esbuild src/ts/index.ts --bundle --outfile=dist/index.js --watch
