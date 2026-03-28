import { CURSOR_SIZE, paletteColor } from "../constants";

export function Cursor() {
  return [
    text("x", { size: CURSOR_SIZE }),
    pos(-100, -100),
    paletteColor("magenta"),
  ];
}
