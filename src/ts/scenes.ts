import kaplay from "kaplay";
import "kaplay/global";

import { DIMENSION } from "./commons/constants.ts";
import { registerGameScene } from "./scenes/game.ts";
import { registerMenuScene } from "./scenes/menu.ts";
import type { Context } from "./commons/types.ts";

kaplay({
  width: DIMENSION,
  height: DIMENSION,
  scale: 3,
  background: "#000000",
  canvas: document.getElementById("canvas") as any,
});

export function register(context: Context) {
  registerGameScene(context);
  registerMenuScene(context);
}
