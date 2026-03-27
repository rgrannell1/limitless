
import kaplay from "kaplay"

import "kaplay/global";
import { Context, State } from './types.ts';
import { bindEvents } from "./events.js";
import { DIMENSION } from "./constants.ts";
import { Background, Cursor, Enemy, LimitsBar, LimitTokens, Ship, Timer } from "./components.js";
import { bindIntervals } from "./intervals.js";

const state: State = {
  ship: null,
  enemies: [],
  tokens: []
}

const context: Context = { state }

function spawnToken() {
  const position = [
    Math.floor((Math.random() * DIMENSION) * 0.8 + 100),
    Math.floor((Math.random() * DIMENSION) * 0.8 + 100)
  ]

  context.state.tokens.push(
    add(LimitTokens({ position })))
}

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
  //context.state.background = add(Background())
  context.state.cursor = add(Cursor())

  //context.state.enemies.push(Enemy())


  //spawnToken()

  bindEvents(context)
  bindIntervals(context)
}

main()
