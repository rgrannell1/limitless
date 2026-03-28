import kaplay from "kaplay";
import "kaplay/global";
import { BACKGROUNDS, DIMENSION } from "./commons/constants.ts";
import { loadAssets } from "./loaders.ts";
import { register } from "./scenes.ts";

function initKaplay(): void {
  kaplay({
    width: DIMENSION,
    height: DIMENSION,
    background: BACKGROUNDS.LEVEL_ONE,
    scale: 3,
    canvas: document.getElementById("canvas") as any,
  });
}

function initGame(): void {
  initKaplay();
  loadAssets();
  register();

  go("game", {});
}

initGame();
