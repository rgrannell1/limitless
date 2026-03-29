/*
 * Pull in game assets
 */
import { getAssetPath } from "./commons/assetPath.ts";

const BASIC_SPRITES = [
  "level-1",
  "level-2",
  "level-3",
  "level-4",
  "level-5",
  "targeted-bullet",
  "ship",
  "sparkle",
  "level_one_background",
  "bullet",
];

// or, load four crappy paint frames :)
export function loadAnimations() {
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
}

export function loadAssets() {
  loadAnimations();

  for (const spriteName of BASIC_SPRITES) {
    loadSprite(spriteName, getAssetPath(`${spriteName}.png`));
  }

  loadSound("ship-dead", getAssetPath("audio/ship-dood.flac"));
  loadSound("limitup", getAssetPath("audio/limitup.mp3"));

  loadFont("pixelpurl", getAssetPath("fonts/pixelpurl/PixelPurl.ttf"));
}
