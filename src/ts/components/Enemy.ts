type EnemyParams = {
  position: [number, number];
};

export function Enemy(params: EnemyParams) {
  const { position } = params;

  return [
    rect(32, 32),
    pos(...position),
    area(),
    color(255, 0, 0),
    "shape",
  ];
}
