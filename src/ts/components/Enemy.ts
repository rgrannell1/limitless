
type EnemyParams = {
  position: [number, number];
};

export function Enemy(params: EnemyParams) {
  const { position } = params;

  return [
    rect(32, 32),
    pos(...position),
    // larger collision to avoid people hiding inside the springler fire-patterns
    area({
      shape: new Rect(vec2(0, 0), 40, 40),
    }),
    color(255, 0, 0),
    "shape",
  ];
}
