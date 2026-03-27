
import { CENTRE } from "../constants";

export function Ship() {
  return [
    sprite("ship"),
    pos(CENTRE, CENTRE),
    area(),
    "shape",
  ];
}
