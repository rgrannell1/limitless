import { loadAssets } from "./loaders.ts";
import { register } from "./scenes.ts";
import type { Context } from "./commons/types.ts";

export const context: Context = {} as Context;
context.state = {
  hyperfocus: false,
  level: 0,
  startTime: Date.now(),
  enemies: [],
  tokens: [],
  intervals: [],
} as any;

function initGame(): void {
  const context: Context = {} as Context;
  context.state = {
    hyperfocus: false,
    level: 0,
    startTime: Date.now(),
    enemies: [],
    tokens: [],
    intervals: [],
  } as any;

  loadAssets();
  register(context);

  go("menu", {});
}

initGame();
