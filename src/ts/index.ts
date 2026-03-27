import kaplay from "kaplay";
import "kaplay/global";
import { Context, State } from "./types.ts";
import { gameScene } from "./scenes.ts";
import { DIMENSION, PALLETE } from "./constants.ts";
import { loadAssets } from "./loaders.ts";

// Initialize empty game state
function initState(): State {
  return {
    ship: null as any,
    enemies: [],
    tokens: [],
    background: null,
  };
}

function initKaplay(): void {
  kaplay({
    width: DIMENSION,
    height: DIMENSION,
    background: PALLETE.background,
    scale: 2,
    canvas: document.getElementById("canvas") as any,
  });
}

function initGame(): void {
  initKaplay();
  loadAssets();

  const state = initState();
  const context: Context = { state };

  gameScene(context);
}

initGame();
