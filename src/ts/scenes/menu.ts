import kaplay from "kaplay";
import "kaplay/global";

import { CENTRE, DIMENSION, paletteColor } from "../commons/constants.ts";
import { MenuFirePattern } from "../components/FiringPattern.ts";
import { Context } from "../commons/types.ts";

export function registerMenuScene(context: Context) {
  scene("menu", () => {
    add([
      text("LIMITLESS ∞", {
        size: 50,
        font: "pixelpurl",
      }),
      pos(100, 60),
      paletteColor("cyan"),
      z(1),
    ]);

    add([
      text("[ enter ] => start", {
        size: 20,
        font: "pixelpurl",
      }),
      pos(80, CENTRE),
      z(1),
    ]);

    add([
      text("[ space ] then click =>    hyperjump. ", {
        size: 20,
        font: "pixelpurl",
      }),
      pos(80, CENTRE + 40),
      z(1),
    ]);

    add([
      text("created in a rush by Róisín", {
        size: 10,
      }),
      pos(110, DIMENSION - 50),
      z(1),
    ]);

    onKeyPress("enter", () => {
      for (const interval of context.state.intervals) {
        clearInterval(interval);
      }
      context.state.intervals = [];

      go("game");
    });
  });

  for (let idx = 0; idx < 5; idx++) {
    let offset = idx * DIMENSION / 5;
    context.state.intervals.push(MenuFirePattern([0, offset]));
  }
}
