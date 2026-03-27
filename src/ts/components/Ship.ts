
import { CENTRE } from "../constants";

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
