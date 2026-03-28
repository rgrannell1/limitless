
// In string format so I can tweak 'em more easily
const COLORS_CSS = {
  cyan: "rgb(66, 255, 233)",
  pink: "rgb(255, 192, 203)",
  magenta: "rgb(249, 199, 255)",
  black: "rgb(0, 0, 0)",
  red: "rgb(255, 0, 0)",
};

export const BACKGROUNDS = {
  LEVEL_ONE: "#fff0fa"
}

export const DIMENSION = 400;
export const CENTRE = DIMENSION / 2;
export const LIMIT_TEXT_SIZE = 30;
export const TIMER_TEXT_SIZE = 30;
export const CURSOR_SIZE = 32;
export const DEFAULT_LIMITS = 3;

export const TOKEN_SPAWN_RATE = 7000; // in ms

// Positioning things
export const TIMER_X = DIMENSION - 60;
export const TIMER_Y = 10;

export const LIMIT_TEXT_X = 30;
export const LIMIT_TEXT_Y = 10;

export function parseRgbString(rgbString: string): [number, number, number] {
  const match = rgbString.match(/\d+/g);
  if (!match) {
    throw new Error(`Invalid RGB string do better: ${rgbString}`);
  }

  const [r, g, b] = match;
  return [parseInt(r), parseInt(g), parseInt(b)];
}

const COLORS = Object.fromEntries(
  Object.entries(COLORS_CSS).map(([name, rgbString]) => [
    name,
    parseRgbString(rgbString),
  ]),
);

export const PALLETE = {
  ...COLORS_CSS,
};

export function paletteColor(colorName: keyof typeof PALLETE) {
  const [r, g, b] = COLORS[colorName];
  return color(r, g, b);
}

// not a builtin?
export const PHI = 1.61803399;
