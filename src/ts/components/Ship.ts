
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
