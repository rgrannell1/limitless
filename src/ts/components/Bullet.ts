import { paletteColor } from "../commons/constants.ts";

export type BulletParams = {
  sprite?: string;
  position: [number, number];
  angle: number;
  speed: number;
  rotation: number;
};

export function Bullet(params: BulletParams) {
  const { position, angle, speed } = params;

  return [
    sprite(params.sprite ?? "bullet"),
    pos(...position),
    area({
      shape: new Rect(vec2(0, 0), 4, 4),
    }),
    rotate(angle),
    move(angle, speed),
    offscreen({ destroy: true }),
  ];
}
