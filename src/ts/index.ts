import kaplay from "kaplay";
import "kaplay/global";
import { DIMENSION, PALLETE } from "./constants.ts";
import { loadAssets } from "./loaders.ts";
import { register } from "./scenes.ts";

// Configure Kaplay engine
function initKaplay(): void {
  kaplay({
    width: DIMENSION,
    height: DIMENSION,
    background: PALLETE.background,
    scale: 3,
    canvas: document.getElementById("canvas") as any,
  });
}

// Bootstrap the game
function initGame(): void {
  initKaplay();
  loadAssets();
  register();

  go("game", { });
}

initGame();
