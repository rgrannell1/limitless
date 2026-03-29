import type { Context, FiringPatternParameters } from "../commons/types.ts";
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
export function SprinklerFiringPattern(
  context: Context,
  params: FiringPatternParameters,
  enemy: GameObj,
): number {
  let angle = 0;

  const intervalId = setInterval(() => {
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
      speed: params.speed,
      rotation: angle * params.rotation,
    }));

    bullet.onCollide("shape", bulletCollision.bind(null, context));
  }, params.interval);

  return intervalId;
}

/*
 * Shoot at the player's ship
 */
export function ShooterFiringPattern(
  context: Context,
  rate: number,
  enemy: GameObj,
) {
  const intervalId = setInterval(() => {
    const playerX = context.state.ship.pos.x;
    const playerY = context.state.ship.pos.y;

    const enemyX = enemy.pos.x;
    const enemyY = enemy.pos.y;

    // lol ty line complete
    const angle = Math.atan2(playerY - enemyY, playerX - enemyX) *
      (180 / Math.PI);

    const bullet = add(Bullet({
      position: [enemyX, enemyY],
      angle,
      speed: 75,
      rotation: angle,
      sprite: "targeted-bullet",
    }));

    bullet.onCollide("shape", bulletCollision.bind(null, context));
  }, rate);

  return intervalId;
}
