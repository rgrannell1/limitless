
import kaplay from "kaplay"

import "kaplay/global";
import { Context, State } from './types.ts';
import { bindEvents } from "./events.js";
import { DIMENSION } from "./constants.ts";
import { Background, Cursor, Enemy, LimitsBar, Ship, Timer } from "./components.js";
import { bindIntervals } from "./intervals.js";

const state: State = {
  ship: null,
  enemies: []
}

const context: Context = { state }

function main() {
  kaplay({
      width: DIMENSION,
      height: DIMENSION,
      background: "#d46eb3",
      scale: 2,
      canvas: document.getElementById("canvas") as any,
  });

  context.state.ship = add(Ship())
  context.state.timer = add(Timer())
  context.state.limitsBar = add(LimitsBar())
  context.state.background = add(Background())
  context.state.cursor = add(Cursor())

  context.state.enemies.push(Enemy())

  bindEvents(context)
  bindIntervals(context)
}

main()