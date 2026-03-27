type BulletParams = {
  position: [number, number];
  angle: number;
  speed: number;
  rotation: number;
};

export function Bullet(params: BulletParams) {
  const { position, angle, speed, rotation } = params;

  return [
    rect(8, 8),
    pos(...position),
    area(),
    rotate(params.rotation ?? 30),
    move(angle, speed),
    color(255, 192, 203),

    offscreen({ destroy: true }),
  ];
}
