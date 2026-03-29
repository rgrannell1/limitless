import { paletteColor } from "../commons/constants.ts";

type EnemyParams = {
  type: "sprinkler" | "shooter";
  position: [number, number];
};

export function Enemy(params: EnemyParams) {
  const { position } = params;

  return [
    sprite(params.type),
    pos(...position),
    // larger collision to avoid people hiding inside the springler fire-patterns
    area({
      shape: new Rect(vec2(0, 0), 40, 40),
    }),
    "shape",
  ];
}
