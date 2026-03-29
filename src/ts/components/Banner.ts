import { DIMENSION } from "../commons/constants";

export function Banner() {
  return [
    text("You reached your limit"),
    pos(DIMENSION / 2, DIMENSION / 2),
  ];
}
