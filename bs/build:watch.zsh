#! /usr/bin/env zsh

mkdir -p dist/assets/fonts
cp assets/* dist/assets/
cp fonts/* dist/assets/fonts/

esbuild src/ts/index.ts --bundle --outfile=dist/index.js --watch
