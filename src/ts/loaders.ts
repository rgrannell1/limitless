/*
 * Pull in game assets
 */
import { getAssetPath } from "./commons/assetPath.ts";

export function loadAssets() {
  loadSprite("jump", getAssetPath("jump-animation.png"), {
    sliceX: 2,
    sliceY: 2,
    anims: {
      "jump": {
        from: 0,
        to: 3,
        loop: false,
        speed: 10,
      },
    },
  });

  loadSprite("bang", getAssetPath("bang.png"), {
    sliceX: 2,
    sliceY: 2,
    anims: {
      "bang": {
        from: 0,
        to: 3,
        loop: false,
        speed: 8,
      },
    },
  });

  loadSprite("level-1", getAssetPath("level-1.png"));
  loadSprite("level-2", getAssetPath("level-2.png"));
  loadSprite("level-3", getAssetPath("level-3.png"));
  loadSprite("level-4", getAssetPath("level-4.png"));
  loadSprite("level-5", getAssetPath("level-5.png"));

  loadSprite("ship", getAssetPath("ship.png"));
  loadSprite("sparkle", getAssetPath("sparkle.png"));
  loadSprite("token-sparkle", getAssetPath("token-sparkle.png"), {
    sliceX: 2,
    sliceY: 2,
    anims: {
      "token-sparkle": {
        from: 0,
        to: 3,
        loop: false,
        speed: 15,
      },
    },
  });
  loadSprite("level_one_background", getAssetPath("level-one.png"));
  loadSprite("bullet", getAssetPath("bullet.png"));
  loadFont("pixelpurl", getAssetPath("fonts/pixelpurl/PixelPurl.ttf"));
}
