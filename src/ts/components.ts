import {
  CENTRE,
  CURSOR_SIZE,
  DEFAULT_LIMITS,
  DIMENSION,
  LIMIT_TEXT_SIZE,
  TIMER_X,
  TIMER_Y,
} from "./constants";
import { Context } from "./types";

export function Ship() {
  return [
    rect(16, 16),
    pos(CENTRE, CENTRE),
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
    pos(TIMER_X, TIMER_Y),
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

export function FiringPattern(context: Context, params: EnemyParams) {
  const { position } = params;

  let angle = 0;

  setInterval(() => {
    angle += 15;

    const distance = 30;
    const radians = (angle * Math.PI) / 180;
    const outwardPosition: [number, number] = [
      position[0] + distance * Math.cos(radians),
      position[1] + distance * Math.sin(radians),
    ];

    const bullet = add(Bullet({
      position: outwardPosition,
      angle,
      speed: 100,
      rotation: 60,
    }));

    bullet.onCollide("shape", (obj) => {
      if (obj === context.state.ship) {
        location.reload();
      }
    });
  }, 150);
}

type BulletParams = {
  position: [number, number];
  angle: number;
  speed: number;
  rotation: number;
};

export function Bullet(params: BulletParams) {
  const { position, angle, speed, rotation } = params;

  return [
    rect(8, 8),
    pos(...position),
    area(),
    rotate(params.rotation ?? 30),
    move(angle, speed),
    color(255, 192, 203),

    offscreen({ destroy: true }),
  ];
}
