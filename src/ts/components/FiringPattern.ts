import { Context } from "../types";
import { Bullet } from "./Bullet";

type EnemyParams = {
  position: [number, number];
};

export function FiringPattern(context: Context, params: EnemyParams) {
  const { position } = params;

  let angle = 0;

  setInterval(() => {
    angle += 15;

    const distance = 30;
    const radians = (angle * Math.PI) / 180;
    const outwardPosition: [number, number] = [
      position[0] + distance * Math.cos(radians),
      position[1] + distance * Math.sin(radians),
    ];

    const bullet = add(Bullet({
      position: outwardPosition,
      angle,
      speed: 100,
      rotation: 60,
    }));

    bullet.onCollide("shape", (obj) => {
      if (obj === context.state.ship) {
        location.reload();
      }
    });
  }, 150);
}
