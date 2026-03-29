// In string format so I can tweak 'em more easily
import { parseRgbString } from "./colours.ts";
import { Level } from "./types.ts";

const COLORS_CSS = {
  cyan: "rgb(66, 255, 233)",
  pink: "rgb(255, 192, 203)",
  magenta: "rgb(249, 199, 255)",
  text: "rgb(149, 35, 255)",
  red: "rgb(255, 0, 0)",
};

export const DIMENSION = 400;
export const CENTRE = DIMENSION / 2;
export const LIMIT_TEXT_SIZE = 30;
export const TIMER_TEXT_SIZE = 30;
export const CURSOR_SIZE = 32;
export const DEFAULT_LIMITS = 3;

export const TOKEN_SPAWN_RATE = 5000;

// Testing !
export const GOD_MODE = false &&
  window.location.hostname !== "limitless.rgrannell.xyz";

// Positioning things
export const TIMER_X = DIMENSION - 60;
export const TIMER_Y = 10;

export const LIMIT_TEXT_X = 30;
export const LIMIT_TEXT_Y = 10;

const COLORS = Object.fromEntries(
  Object.entries(COLORS_CSS).map(([name, rgbString]) => [
    name,
    parseRgbString(rgbString),
  ]),
);

export const PALLETE = {
  ...COLORS_CSS,
};

/*
 *  Convert from vscode friendly strings to the kaplay datatype please
 */
export function paletteColor(colorName: keyof typeof PALLETE) {
  const [r, g, b] = COLORS[colorName];
  return color(r, g, b);
}

// not a builtin?
export const PHI = 1.61803399;

export const LEVELS: Level[] = [
  {
    sides: 2,
    timer: 20,
    background: "level-1",
    firingParams: {
      interval: 100,
      speed: 60,
      rotation: 1.2,
    },
  },
  {
    sides: 3,
    timer: 25,
    background: "level-2",
    firingParams: {
      interval: 200,
      speed: 50,
      rotation: 1.5,
    },
  },
  {
    sides: 4,
    timer: 30,
    background: "level-3",
    firingParams: {
      interval: 250,
      speed: 40,
      rotation: 1.3,
    },
  },
  {
    sides: 5,
    timer: 35,
    background: "level-4",
    firingParams: {
      interval: 120,
      speed: 30,
      rotation: 1.1,
    },
  },
  {
    sides: 6,
    timer: 40,
    background: "level-5",
    firingParams: {
      interval: 300,
      speed: 20,
      rotation: 1.0,
    },
  },
];
