import { CENTRE } from "../commons/constants";

/*
 * Our player. Small hitbox because we're nice.
 */
export function Ship() {
  return [
    sprite("ship"),
    pos(CENTRE, CENTRE),
    area({
      shape: new Rect(vec2(0, 0), 12, 12),
    }),
    "shape",
  ];
}

export function ShipSparkle(position: { x: number; y: number }) {
  return [
    sprite("sparkle"),
    pos(position.x + 8, position.y + 8),
    opacity(0.2),
    lifespan(0.5, { fade: 0.5 }),
    z(-1),
  ];
}
