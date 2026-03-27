
import scene from "kaplay"

import "kaplay/global";
import { Context, State } from './types.ts';
import { gameScene } from "./scenes.ts";

const state: State = {
  ship: null,
  enemies: [],
  tokens: [],
  background: null
}

const context: Context = { state }

scene('game', gameScene.bind(null, context));
