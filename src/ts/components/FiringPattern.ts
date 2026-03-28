import type { Context } from "../commons/types.ts";
import type { GameObj } from "kaplay";
import { Bullet } from "./Bullet.ts";
import { PHI } from "../commons/constants.ts";
import { explode } from "../events.ts";

function bulletCollision(context: Context, obj: any) {
  if (obj === context.state.ship) {
    explode(context);
  }
}

/*
 * Spray in a rotation around a central point
 */
export function SprinklerFiringPattern(context: Context, enemy: GameObj) {
  let angle = 0;

  setInterval(() => {
    // to avoid recurring patterns, our friend phi
    angle += 10 * PHI;

    const distance = 30;
    const radians = (angle * Math.PI) / 180;
    const outwardPosition: [number, number] = [
      enemy.pos.x + distance * Math.cos(radians),
      enemy.pos.y + distance * Math.sin(radians),
    ];

    const bullet = add(Bullet({
      position: outwardPosition,
      angle,
      speed: 60,
      rotation: angle * 1.2,
    }));

    bullet.onCollide("shape", bulletCollision.bind(null, context));
  }, 100);
}

/*
 * Shoot at the player's ship
 */
export function TargetedFiringPattern(context: Context, enemy: GameObj) {
}

/*
 * THE MISSILE KNOWS WHERE IT IS AT ALL TIMES. IT KNOWS THIS BECAUSE IT
 * KNOWS WHERE IT ISN't
 */
export function MissileFiringPattern(context: Context, enemy: GameObj) {
}
