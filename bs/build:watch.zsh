#! /usr/bin/env zsh

esbuild src/ts/index.ts --bundle --outfile=dist/index.js --watch
