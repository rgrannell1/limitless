
import type { Context } from "../types.ts";
import type { GameObj } from "kaplay";
import { Bullet } from "./Bullet.ts";
import { PHI } from "../constants.ts";

function bulletCollision(context: Context, obj: any) {
  if (obj === context.state.ship) {
    location.reload();
  }
}

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
