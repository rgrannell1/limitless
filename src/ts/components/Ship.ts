
import { CENTRE } from "../constants";

export function Ship() {
  return [
    rect(16, 16),
    pos(CENTRE, CENTRE),
    area(),
    "shape",
  ];
}
