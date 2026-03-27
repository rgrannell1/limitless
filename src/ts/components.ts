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
    color(255, 255, 255),
  ];
}

type EnemyParams = {
  position: [number, number];
};

export function Enemy(params: EnemyParams) {
  const { position } = params;

  return [
    rect(32, 32),
    pos(...position),
    area(),
    color(255, 0, 0),
    "shape",
  ];
}

export function FiringPattern(params: EnemyParams) {
  const { position } = params;

  let angle = 0;

  setInterval(() => {
    angle += 15;

    add(Bullet({
      position,
      angle,
      speed: 100,
    }));

  }, 150);
}

type BulletParams = {
  position: [number, number];
  angle: number;
  speed: number;
}

export function Bullet(params: BulletParams) {
  const { position, angle, speed } = params;

  return [
    rect(8, 8),
    pos(...position),
    area(),
    rotate(30),
    move(angle, speed),
    color(255, 192, 203),

    offscreen({ destroy: true }),
  ];
}
