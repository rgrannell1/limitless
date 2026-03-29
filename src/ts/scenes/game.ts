import kaplay from "kaplay";
import "kaplay/global";

import { Cursor, LimitsBar, Ship, Timer } from "../components/index.ts";
import { LEVELS } from "../commons/constants.ts";
import { bindEvents } from "../events.ts";
import { bindIntervals } from "../intervals.ts";
import { spawnEnemy } from "../spawn.ts";
import type { Context } from "../commons/types.ts";

export function registerGameScene(context: Context) {
  scene("game", () => {
    const levelConfig = LEVELS[context.state.level];

    const { timer, sides } = levelConfig;

    // so people can't hang out on the menu for an hour (like me, accidentally)
    if (context.state.level === 0) {
      context.state.startTime = Date.now();
    }

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
