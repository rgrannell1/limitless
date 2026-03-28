
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
  })
  loadSprite("ship", "./dist/assets/ship.png")
  loadSprite("level_one_background", "./dist/assets/level-one.png")
  loadSprite("bullet", "./dist/assets/bullet.png")
  loadFont("pixelpurl", "./dist/assets/fonts/pixelpurl/PixelPurl.ttf")
}
