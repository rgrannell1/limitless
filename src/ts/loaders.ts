
/*
 * Pull in game assets
 */
export function loadAssets() {
  loadSprite("jump", "./dist/assets/jump-animation.png", {
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

  loadSprite("bang", "./dist/assets/bang.png", {
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
  })

  loadSprite("level-1", "./dist/assets/level-1.png")
  loadSprite("ship", "./dist/assets/ship.png")
  loadSprite("sparkle", "./dist/assets/sparkle.png")
  loadSprite("level_one_background", "./dist/assets/level-one.png")
  loadSprite("bullet", "./dist/assets/bullet.png")
  loadFont("pixelpurl", "./dist/assets/fonts/pixelpurl/PixelPurl.ttf")
}
