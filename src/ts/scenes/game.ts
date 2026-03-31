import kaplay from "kaplay";
import "kaplay/global";

import { Cursor, LimitsBar, Ship, Timer } from "../components/index.ts";
import { LEVELS } from "../commons/constants.ts";
import { bindEvents } from "../events.ts";
import { bindIntervals } from "../intervals.ts";
import { spawnEnemy } from "../spawn.ts";
import type { Context } from "../commons/types.ts";
import { clearIntervals } from "../teardown.ts";

export function registerGameScene(context: Context) {
  scene("game", () => {
    clearIntervals(context);
    const state = context.state;
    const levelConfig = LEVELS[state.level];

    const { timer, sides } = levelConfig;

    // so people can't hang out on the menu for an hour (like me, accidentally)
    if (state.level === 0) {
      state.startTime = Date.now();
    }

    state.ship = add(Ship());
    state.limitsBar = add(LimitsBar());
    state.cursor = add(Cursor());

    state.timer = add(Timer(timer));
    state.enemies = [];
    state.tokens = [];
    state.intervals = [];

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
