import kaplay from "kaplay";
import "kaplay/global";

import { CENTRE } from "../commons/constants.ts";

export function registerMenuScene() {
  scene("menu", () => {
    add([
      text("LIMITLESS ∞", {
        size: 50,
        font: "pixelpurl",
      }),
      pos(120, 60),
    ]);

    add([
      text("[ enter ] => start", {
        size: 20,
        font: "pixelpurl",
      }),
      pos(100, CENTRE),
    ]);

    add([
      text("[ space ] then click =>    hyperjump. ", {
        size: 20,
        font: "pixelpurl",
      }),
      pos(100, CENTRE + 40),
    ]);

    onKeyPress("enter", () => {
      go("game");
    });
  });
}
