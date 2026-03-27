import {
  Background,
  Cursor,
  Enemy,
  LimitsBar,
  LimitTokens,
  Ship,
  Timer,
} from "./components.ts";
import { DIMENSION } from "./constants.ts";
import { bindEvents, bindTokenEvent } from "./events.ts";
import { bindIntervals } from "./intervals.ts";
import { Context } from "./types.ts";

function spawnToken(context: Context) {
  const { tokens } = context.state;

  const position: [number, number] = [
    Math.floor((Math.random() * DIMENSION) * 0.8 + 100),
    Math.floor((Math.random() * DIMENSION) * 0.8 + 100),
  ];

  const token = add(LimitTokens({ position }));
  bindTokenEvent(context, token);

  tokens.push(token);
}

export function gameScene(context: Context) {
  context.state.ship = add(Ship());
  context.state.timer = add(Timer());
  context.state.limitsBar = add(LimitsBar());
  context.state.background = add(Background());
  context.state.cursor = add(Cursor());

  context.state.enemies.push(Enemy());

  spawnToken(context);

  bindEvents(context);
  bindIntervals(context);
}
