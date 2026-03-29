import kaplay from "kaplay";
import "kaplay/global";

import { Cursor, LimitsBar, Ship, Timer } from "../components/index.ts";
import { DIMENSION, LEVELS } from "../commons/constants.ts";
import { bindEvents } from "../events.ts";
import { bindIntervals } from "../intervals.ts";
import { spawnEnemy } from "../spawn.ts";
import type { Context } from "../commons/types.ts";

export const context: Context = {} as Context;
context.state = {
  hyperfocus: false,
  level: 0,
  enemies: [],
  tokens: [],
  intervals: [],
} as any;

export function registerGameScene() {
  scene("game", () => {
    const levelConfig = LEVELS[context.state.level];

    const { timer, sides } = levelConfig;

    context.state.ship = add(Ship());
    context.state.limitsBar = add(LimitsBar());
    context.state.cursor = add(Cursor());

    context.state.timer = add(Timer(timer));
    context.state.enemies = [];
    context.state.tokens = [];
    context.state.intervals = [];

    add([
      sprite(levelConfig.background),
      pos(0, 0),
      z(-2),
    ]);

    spawnEnemy(context, levelConfig, levelConfig.firingParams, sides);

    bindEvents(context);
    bindIntervals(context);
  });
}
