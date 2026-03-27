
import kaplay from "kaplay"

import "kaplay/global";
import { Context, State } from './types.ts';
import { bindEvents } from "./events.js";
import { DIMENSION } from "./constants.ts";
import { Background, Cursor, Enemy, LimitsBar, LimitTokens, Ship, Timer } from "./components.js";
import { bindIntervals } from "./intervals.js";
import { gameScene } from "./scenes.ts";

const state: State = {
  ship: null,
  enemies: [],
  tokens: []
}

const context: Context = { state }

scene('game', gameScene.bind(null, context));
