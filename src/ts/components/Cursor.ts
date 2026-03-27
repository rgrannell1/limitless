import { CURSOR_SIZE } from "../constants";

export function Cursor() {
  return [
    text("x", { size: CURSOR_SIZE }),
    pos(0, 0),
    color(255, 255, 255),
  ];
}
