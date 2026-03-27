
export type BulletParams = {
  position: [number, number];
  angle: number;
  speed: number;
  rotation: number;
};

export function Bullet(params: BulletParams) {
  const { position, angle, speed } = params;

  return [
    sprite("bullet"),
    pos(...position),
    area({
      shape: new Rect(vec2(0, 0), 4, 4),
    }),
    rotate(params.rotation ?? 30),
    move(angle, speed),
    color(255, 192, 203),

    offscreen({ destroy: true }),
  ];
}
