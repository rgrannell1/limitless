import { CURSOR_SIZE } from "../constants";

export function Cursor() {
  return [
    text("x", { size: CURSOR_SIZE }),
    pos(-100, -100),
    color(249, 199, 255),
  ];
}
