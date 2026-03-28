import { loadAssets } from "./loaders.ts";
import { register } from "./scenes.ts";

function initGame(): void {
  loadAssets();
  register();

  go("menu", {});
}

initGame();
