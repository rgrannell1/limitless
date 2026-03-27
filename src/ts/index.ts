
import kaplay from "kaplay"

import "kaplay/global";
import { Context, State } from './types.ts';
import { bindEvents } from "./events.js";
import { DIMENSION } from "./constants.ts";
import { Ship, Timer } from "./components.js";
import { bindIntervals } from "./intervals.js";

const state: State = {
  ship: null
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

  bindEvents(context)
  bindIntervals(context)
}

main()