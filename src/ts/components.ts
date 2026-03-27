import {
  CURSOR_SIZE,
  DEFAULT_LIMITS,
  DIMENSION,
  LIMIT_TEXT_SIZE,
} from "./constants";

export function Ship() {
  return [
    rect(32, 32),
    pos(DIMENSION / 2, DIMENSION / 2),
    area(),
    "shape",
  ];
}

export function renderTimerText(timer: any) {
  const value = timer.value || 0;
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function Timer() {
  return [
    text(renderTimerText({ value: 60 })),
    pos(DIMENSION - 120, 30),
    { value: 60 },
  ];
}

export function Background() {
  return [];
}

type ListTokensParams = {
  position: [number, number];
};

export function LimitTokens(params: ListTokensParams) {
  const { position } = params;

  return [
    text("◈", { size: 32, styles: {} }),
    pos(...position),
    area(),
  ];
}

export function renderLimitBarText(limitsBar: any) {
  const value = limitsBar.value || 0;
  return "◈ ".repeat(value).padEnd(6, " ");
}

export function LimitsBar() {
  return [
    text(renderLimitBarText({ value: DEFAULT_LIMITS }), {
      size: LIMIT_TEXT_SIZE,
    }),
    pos(50, 25),
    { value: 3 },
  ];
}

export function Cursor() {
  return [
    text("x", { size: CURSOR_SIZE }),
    pos(0, 0),
  ];
}

export function Enemy() {
  return [
    rect(32, 32, {}),
    pos(DIMENSION / 2, DIMENSION / 2),
    "shape",
  ];
}
