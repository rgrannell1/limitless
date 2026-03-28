
/*
 * Pull in game assets
 */
export function loadAssets() {
  loadSprite("jump", "/assets/jump-animation.png", {
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
  loadSprite("ship", "/assets/ship.png")
  loadSprite("level_one_background", "/assets/level-one.png")
  loadSprite("bullet", "/assets/bullet.png")
  loadFont("pixelpurl", "/assets/fonts/pixelpurl/PixelPurl.ttf")
}
