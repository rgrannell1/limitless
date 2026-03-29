import kaplay from "kaplay";
import "kaplay/global";

import { CENTRE, DIMENSION, paletteColor } from "../commons/constants.ts";
import { MenuFirePattern } from "../components/FiringPattern.ts";
import { Context } from "../commons/types.ts";
import { clearIntervals } from "../teardown.ts";

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
      text("[ space ] then click =>    hyperjump", {
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
      clearIntervals(context);
      go("game");
    });
  });

  const spectrum = [
    paletteColor("magenta1"),
    paletteColor("yellow"),
    paletteColor("green"),
    paletteColor("cyan1"),
    paletteColor("blue1"),
  ];

  for (let idx = 0; idx < 5; idx++) {
    let offset = idx * DIMENSION / 5;
    context.state.intervals.push(MenuFirePattern([0, offset], spectrum[idx]));
  }

  for (let jdx = 0; jdx < 5; jdx++) {
    let offset = jdx * DIMENSION / 5;
    context.state.intervals.push(MenuFirePattern([offset, 0], spectrum[jdx]));
  }

  context.state.menuMusic = play("menu-song")
}
