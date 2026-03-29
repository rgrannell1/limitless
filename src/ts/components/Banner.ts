import { CENTRE, DIMENSION } from "../commons/constants.ts";
import { Context } from "../commons/types.ts";

export function BannerText(context: Context) {
  const elapsedSeconds = Math.floor(
    (Date.now() - context.state.startTime) / 1000,
  );

  return [
    text(`You reached your limit after ${elapsedSeconds}s`, {
      size: 20,
      font: "pixelpurl",
    }),
    pos(CENTRE - 100, CENTRE - 25),
    z(2),
  ];
}

export function Banner(context: Context) {
  return [
    rect(DIMENSION, 100),
    pos(0, CENTRE - 50),
    color(0, 0, 0),
    z(1),
  ];
}
