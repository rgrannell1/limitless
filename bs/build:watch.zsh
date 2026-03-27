#! /usr/bin/env zsh

mkdir -p dist/assets
cp assets/* dist/assets/

esbuild src/ts/index.ts --bundle --outfile=dist/index.js --watch
