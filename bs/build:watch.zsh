#! /usr/bin/env zsh

mkdir -p dist/assets
cp assets/* dist/assets/
cp -r assets/audio dist/assets/
cp -r assets/images dist/assets/
cp -r fonts dist/assets/

esbuild src/ts/index.ts --bundle --outfile=dist/index.js --watch
