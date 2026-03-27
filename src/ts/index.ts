import kaplay from "kaplay";
import "kaplay/global";
import { Context, State } from "./types.ts";
import { gameScene } from "./scenes.ts";
import { DIMENSION, PALLETE } from "./constants.ts";
import { loadAssets } from "./loaders.ts";

const state: State = {
  ship: null as any,
  enemies: [],
  tokens: [],
  background: null,
};

const context: Context = { state };
kaplay({
  width: DIMENSION,
  height: DIMENSION,
  background: PALLETE.background,
  scale: 2,
  canvas: document.getElementById("canvas") as any,
});

loadAssets();

gameScene(context);
