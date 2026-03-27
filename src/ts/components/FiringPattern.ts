
import { Context } from "../types.ts";
import { Bullet } from "./Bullet.ts";

function bulletCollision(context: Context, obj: any) {
  if (obj === context.state.ship) {
    location.reload();
  }
}

type EnemyParams = {
  position: [number, number];
};

export function FiringPattern(context: Context, params: EnemyParams) {
  const { position } = params;
  const [ x, y ] = position;

  let angle = 0;

  setInterval(() => {
    angle += 15;

    const distance = 30;
    const radians = (angle * Math.PI) / 180;
    const outwardPosition: [number, number] = [
      x + distance * Math.cos(radians),
      y + distance * Math.sin(radians),
    ];

    const bullet = add(Bullet({
      position: outwardPosition,
      angle,
      speed: 100,
      rotation: 60,
    }));

    bullet.onCollide("shape", bulletCollision.bind(null, context));
  }, 150);
}
