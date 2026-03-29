
// ok lets have effects in a single file

import kaplay from "kaplay";
import "kaplay/global";

import { GOD_MODE, paletteColor } from "./commons/constants.ts";
import type { Context } from "./commons/types.ts";

/**
 * Render a trail of visual effects between two points
 */
export function renderJumpTrail(
  currentX: number,
  currentY: number,
  targetX: number,
  targetY: number,
) {
  const xDiff = targetX - currentX;
  const yDiff = targetY - currentY;

  const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  const steps = Math.ceil(distance / 14);

  for (let ith = 0; ith < steps; ith++) {
    const progress = ith / steps;
    const x = currentX + xDiff * progress;
    const y = currentY + yDiff * progress;

    add([
      text("□", { size: 32 }),
      pos(x, y - 8),
      paletteColor("magenta"),
      lifespan(0.5, { fade: 0.3 }),
      opacity(0.8 * progress),
      "jumpEffect",
    ]);
  }
}

/**
 * Play jump animation at ship location
 */
export function playJumpAnimation(context: Context) {
  const currentX = context.state.ship.pos.x - 8;
  const currentY = context.state.ship.pos.y - 8;

  const jumper = add([
    sprite("jump"),
    pos(currentX, currentY),
    lifespan(0.5, { fade: 0.3 }),
    opacity(0.6),
  ]);
  jumper.play("jump");
}

/**
 * Play explosion effect and game over
 */
export function playExplosionEffect(context: Context) {
  if (GOD_MODE) {
    return;
  }

  const currentX = context.state.ship.pos.x - 8;
  const currentY = context.state.ship.pos.y - 8;

  context.state.ship.destroy();

  const bang = add([
    sprite("bang"),
    pos(currentX, currentY),
    lifespan(0.5, { fade: 0.3 }),
    opacity(0.6),
  ]);
  bang.play("bang");

  play("ship-dead", {
    volume: 0.5,
  });

  setTimeout(() => location.reload(), 1000);
}
