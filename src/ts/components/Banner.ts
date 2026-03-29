
import { CENTRE, DIMENSION } from "../commons/constants";

export function BannerText() {
  return [
    text("You reached your limit"),
    pos(DIMENSION / 2, DIMENSION / 2),
  ];
}

export function Banner() {
  return [
    rect(DIMENSION, 100),
    pos(0, CENTRE),
    color(0, 0, 0),
    z(1),
  ];
}
